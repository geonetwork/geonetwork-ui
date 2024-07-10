import { EditorFieldState, EditorFieldValue } from './models/'

export type ExpressionEvaluator = (field: EditorFieldState) => EditorFieldValue

export function evaluate(expression: string): ExpressionEvaluator {
  if (expression.match(/^\${.*}$/)) {
    return evaluate(expression.slice(2, -1))
  }
  const operator = expression.split('(')[0]
  switch (operator) {
    case 'dateNow':
      return () => new Date()
    default:
      throw new Error(`Unknown operator: ${operator}`)
  }
}
