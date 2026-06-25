import { EditorFieldValue } from './models/'

export interface EvaluationContext {
  globals: Record<string, object>
}

export type ExpressionEvaluator = (
  context: EvaluationContext
) => EditorFieldValue

const TOKEN_FUNCTION_CALL_START = '('
const TOKEN_FUNCTION_CALL_END = ')'
const TOKEN_TERNARY_FIRST = '?'
const TOKEN_TERNARY_SECOND = ':'
const TOKEN_PROPERTY_ACCESS = '.'
const TOKEN_OPERATOR_LOGICAL = ['==', '==', '!=', '!=']
const TOKEN_STRING_LITERAL = ["'", '"']

export interface CompilationContext {
  errors: string[]
}

export function isExpression(input: unknown): boolean {
  return typeof input === 'string' && /^\${.*}$/.test(input)
}

function readNextExpression(input: string, start: number): string {
  let pos = start
  let result = ''
  while (pos < input.length) {
    result += input[pos]
    pos++
  }
  return result
}

function readUntil(input: string, start: number, char: string): string | null {
  const pos = input.indexOf(char, start)
  return pos >= 0 ? input.substring(start, pos) : null
}

function readNext(input: string, start: number, length = 1): string {
  return input.substring(start, start + length)
}

function getFunctionEvaluator(
  functionName: string,
  context: CompilationContext
): ExpressionEvaluator {
  switch (functionName) {
    case 'dateNow':
      return () => new Date()
    default:
      context.errors.push(`Unknown function: ${functionName}`)
      return () => undefined
  }
}

export function evaluate(
  expression: string,
  context?: CompilationContext
): { evaluator: ExpressionEvaluator; errors: string[] } {
  const currentContext = context ?? {
    errors: [],
  }

  // full expression embedded in ${...}: parse what's inside
  if (/^\${.*}$/.test(expression)) {
    return evaluate(expression.slice(2, -1), currentContext)
  }

  let pos = 0
  let currentSymbol = null
  let currentEvaluator: ExpressionEvaluator = () => undefined
  while (pos < expression.length) {
    const isWhitespace = /\s/.test(readNext(expression, pos))
    if (isWhitespace) {
      pos++
      continue
    }

    // SYMBOL (NAME)
    const isSymbol = /[a-zA-Z]/.test(readNext(expression, pos))
    if (isSymbol) {
      currentSymbol = ''
      while (pos < expression.length) {
        if (!/[a-zA-Z]/.test(readNext(expression, pos))) {
          break
        }
        currentSymbol += readNext(expression, pos)
        pos++
      }
      continue
    }

    // FUNCTION CALL
    const isFunctionCall =
      currentSymbol && readNext(expression, pos) === TOKEN_FUNCTION_CALL_START
    if (isFunctionCall) {
      pos++
      // no support for arguments for now (not needed)
      if (readNext(expression, pos) !== TOKEN_FUNCTION_CALL_END) {
        currentContext.errors.push(
          `Expected token '${TOKEN_FUNCTION_CALL_END}' at position ${pos}, got '${readNext(expression, pos)}' instead`
        )
        break
      }
      pos++
      currentEvaluator = getFunctionEvaluator(currentSymbol, currentContext)
      currentSymbol = null
      continue
    }

    // PROPERTY ACCESS (single level)
    const isPropertyAccess =
      currentSymbol && readNext(expression, pos) === TOKEN_PROPERTY_ACCESS
    if (isPropertyAccess) {
      pos++
      if (!/[a-zA-Z]/.test(readNext(expression, pos))) {
        currentContext.errors.push(
          `Expected a property name after '${TOKEN_PROPERTY_ACCESS}' at position ${pos}, got '${readNext(expression, pos)}' instead`
        )
        break
      }
      let propertyName = ''
      while (pos < expression.length) {
        if (!/[a-zA-Z]/.test(readNext(expression, pos))) {
          break
        }
        propertyName += readNext(expression, pos)
        pos++
      }
      const variableName = currentSymbol
      currentEvaluator = (context) => {
        if (!(variableName in context.globals)) {
          throw new Error(`Unknown global variable '${variableName}'`)
        }
        if (!(propertyName in context.globals[variableName])) {
          throw new Error(
            `Unknown property '${propertyName}' in global variable '${variableName}'`
          )
        }
        return context.globals[variableName][propertyName]
      }
      currentSymbol = null
      continue
    }

    // we have a symbol but did not do either function call or property access => error
    if (currentSymbol) {
      currentContext.errors.push(
        `Expected a function call or property access after symbol '${currentSymbol}' at position ${pos}, got '${readNext(expression, pos)}' instead`
      )
      break
    }

    // TERNARY OPERATOR
    const isTernary = readNext(expression, pos) === TOKEN_TERNARY_FIRST
    if (isTernary) {
      if (!currentEvaluator) {
        currentContext.errors.push(
          `Expected an expression before '${TOKEN_TERNARY_FIRST}' at position ${pos} but could not find any`
        )
        break
      }
      pos++
      const ifTrueExpression = readUntil(expression, pos, TOKEN_TERNARY_SECOND)
      if (ifTrueExpression === null) {
        currentContext.errors.push(
          `Reached end of expression before finding expected token '${TOKEN_TERNARY_SECOND}'`
        )
        break
      }
      pos += ifTrueExpression.length + 1

      const ifFalseExpression = readNextExpression(expression, pos)
      pos += ifFalseExpression.length

      const conditionEvaluator = currentEvaluator
      const ifTrueEvaluator = evaluate(
        ifTrueExpression,
        currentContext
      ).evaluator
      const ifFalseEvaluator = evaluate(
        ifFalseExpression,
        currentContext
      ).evaluator
      currentEvaluator = (context) => {
        if (conditionEvaluator(context)) {
          return ifTrueEvaluator(context)
        }
        return ifFalseEvaluator(context)
      }
      continue
    }

    // LOGICAL OPERATORS
    const isLogicalOperator = TOKEN_OPERATOR_LOGICAL.some(
      (token) => readNext(expression, pos, token.length) === token
    )
    if (isLogicalOperator) {
      const matchingOperator = TOKEN_OPERATOR_LOGICAL.find(
        (token) => readNext(expression, pos, token.length) === token
      )
      const isEqual = matchingOperator.startsWith('=')
      pos += matchingOperator.length
      const comparedEvaluator = currentEvaluator
      const comparedToExpression = readNextExpression(expression, pos)
      pos += comparedToExpression.length
      const comparedToEvaluator = evaluate(
        comparedToExpression,
        currentContext
      ).evaluator

      currentEvaluator = (context) => {
        return (
          (comparedEvaluator(context) == comparedToEvaluator(context)) ===
          isEqual
        )
      }
      continue
    }

    // STRING LITERAL
    const isStringLiteral = TOKEN_STRING_LITERAL.some(
      (token) => readNext(expression, pos) === token
    )
    if (isStringLiteral) {
      const openingToken = readNext(expression, pos)
      pos++
      const literal = readUntil(expression, pos, openingToken)
      if (literal === null) {
        currentContext.errors.push(
          `Reached end of expression before finding corresponding closing token ${openingToken} for string literal`
        )
        break
      }
      pos += literal.length + 1
      currentEvaluator = () => literal
      continue
    }

    // NUMBER LITERAL
    const isNumberLiteral = /[0-9]/.test(readNext(expression, pos))
    if (isNumberLiteral) {
      let literal = ''
      while (pos < expression.length) {
        if (!/[0-9]/.test(readNext(expression, pos))) {
          break
        }
        literal += readNext(expression, pos)
        pos++
      }
      const numberLiteral = parseInt(literal, 10)
      currentEvaluator = () => numberLiteral
      continue
    }

    // could not figure out what that was: leave
    currentContext.errors.push(
      `Unexpected character '${readNext(expression, pos)}' at position ${pos}`
    )
    break
  }

  return {
    evaluator: currentEvaluator,
    errors: currentContext.errors,
  }
}
