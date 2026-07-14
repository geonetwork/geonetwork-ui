import { EditorFieldValue } from './models/'

export interface EvaluationContext {
  globals: Record<string, object>
}

export type ExpressionEvaluator = (
  context: EvaluationContext
) => EditorFieldValue

const TOKEN_FUNCTION_CALL_START = '('
const TOKEN_FUNCTION_CALL_END = ')'
const TOKEN_PROPERTY_ACCESS = '.'
const TOKEN_OPERATOR_TERNARY_FIRST = '?'
const TOKEN_OPERATOR_TERNARY_SECOND = ':'
const TOKEN_OPERATOR_LOGICAL = ['==', '!=']
const TOKEN_STRING_LITERAL = ["'", '"']
const TOKEN_GROUP_START = '('
const TOKEN_GROUP_END = ')'

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence
const OPERATORS_BY_PRECEDENCE: string[][] = [
  [TOKEN_OPERATOR_TERNARY_FIRST, TOKEN_OPERATOR_TERNARY_SECOND],
  TOKEN_OPERATOR_LOGICAL,
]
const ALL_OPERATORS = OPERATORS_BY_PRECEDENCE.flat()

export interface CompilationContext {
  errors: string[]
}

export function isExpression(input: unknown): boolean {
  return typeof input === 'string' && /^\${.*}$/.test(input)
}

function readNext(input: string, start: number, length = 1): string {
  return input.substring(start, start + length)
}

/**
 * Will continue looking until an operator is found at the same depth level
 */
function readUntilNextOperator(
  input: string,
  start: number,
  currentOperator: string
): string {
  let pos = start
  let result = ''
  let depth = 0
  while (pos < input.length) {
    const isOperator = ALL_OPERATORS.some(
      (token) => readNext(input, pos, token.length) === token
    )
    if (isOperator && depth === 0) {
      const operatorPrecedence = OPERATORS_BY_PRECEDENCE.findIndex((tokens) =>
        tokens.some((token) => readNext(input, pos, token.length) === token)
      )
      const currentPrecedence =
        OPERATORS_BY_PRECEDENCE.findIndex((tokens) =>
          tokens.some((token) => currentOperator === token)
        ) ?? -1
      // the new operator has a lower precedence than the current one: we stop here
      if (operatorPrecedence < currentPrecedence) {
        return result
      }
    }
    if (input[pos] === TOKEN_GROUP_START) {
      depth++
    } else if (input[pos] === TOKEN_GROUP_END) {
      depth--
    }
    if (depth < 0) {
      return result
    }
    result += input[pos]
    pos++
  }
  return result
}

/**
 * Will look for a specific character or string situated at the same depth level!
 * Returns null if nothing found
 */
function readUntil(input: string, start: number, char: string): string | null {
  let pos = start
  let result = ''
  let depth = 0
  while (pos < input.length) {
    if (depth === 0 && readNext(input, pos, char.length) === char) {
      return result
    }
    if (input[pos] === TOKEN_GROUP_START) {
      depth++
    } else if (input[pos] === TOKEN_GROUP_END) {
      depth--
    }
    if (depth < 0) {
      return null
    }
    result += input[pos]
    pos++
  }
  return null
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

/**
 * This evaluates an expression using a very light subset of Javascript.
 *
 * Things allowed in expressions are:
 * - comparing values with == and !=
 * - ternary comparisons with a ? b : c
 * - grouping with (...)
 * - functions: for now only dateNow() is supported and returns a timestamp
 * - access to globals such as record.type
 *
 * Expressions are turned into an evaluator that can be called with a context containing the globals.
 * Expressions can return any primitive Javascript type
 * Valid expressions should always be enclosed in ${...}
 */
export function evaluate(expression: string): {
  evaluator: ExpressionEvaluator
  errors: string[]
} {
  if (!/^\${.*}$/.test(expression)) {
    throw new Error('Malformed expression: missing ${} enclosure')
  }
  const context = {
    errors: [],
  }
  const trimmedExpression = expression.slice(2, -1)
  return evaluateInternal(trimmedExpression, context)
}

function evaluateInternal(
  expression: string,
  currentContext: CompilationContext
): { evaluator: ExpressionEvaluator; errors: string[] } {
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
        if (
          !Object.prototype.hasOwnProperty.call(context.globals, variableName)
        ) {
          return undefined
        }
        if (
          !Object.prototype.hasOwnProperty.call(
            context.globals[variableName],
            propertyName
          )
        ) {
          return undefined
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

    // GROUP OPERATOR
    const isGroupStart = readNext(expression, pos) === TOKEN_GROUP_START
    if (isGroupStart) {
      pos++
      const groupExpression = readUntil(expression, pos, TOKEN_GROUP_END)
      if (groupExpression === null) {
        currentContext.errors.push(
          `Reached end of expression before finding expected token '${TOKEN_GROUP_END}'`
        )
        break
      }
      pos += groupExpression.length + 1
      currentEvaluator = evaluateInternal(
        groupExpression,
        currentContext
      ).evaluator
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
      const comparedToExpression = readUntilNextOperator(
        expression,
        pos,
        matchingOperator
      )
      pos += comparedToExpression.length
      const comparedToEvaluator = evaluateInternal(
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

    // TERNARY OPERATOR
    const isTernary = readNext(expression, pos) === TOKEN_OPERATOR_TERNARY_FIRST
    if (isTernary) {
      if (!currentEvaluator) {
        currentContext.errors.push(
          `Expected an expression before '${TOKEN_OPERATOR_TERNARY_FIRST}' at position ${pos} but could not find any`
        )
        break
      }
      pos++
      const ifTrueExpression = readUntil(
        expression,
        pos,
        TOKEN_OPERATOR_TERNARY_SECOND
      )
      if (ifTrueExpression === null) {
        currentContext.errors.push(
          `Reached end of expression before finding expected token '${TOKEN_OPERATOR_TERNARY_SECOND}'`
        )
        break
      }
      pos += ifTrueExpression.length + 1

      const ifFalseExpression = readUntilNextOperator(
        expression,
        pos,
        TOKEN_OPERATOR_TERNARY_FIRST
      )
      pos += ifFalseExpression.length

      const conditionEvaluator = currentEvaluator
      const ifTrueEvaluator = evaluateInternal(
        ifTrueExpression,
        currentContext
      ).evaluator
      const ifFalseEvaluator = evaluateInternal(
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
