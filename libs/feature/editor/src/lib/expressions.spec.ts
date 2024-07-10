import { evaluate, ExpressionEvaluator } from './expressions'

const originalDate = window.Date
window.Date = function () {
  return new originalDate('12345')
} as any

describe('expressions', () => {
  let evaluator: ExpressionEvaluator
  describe('operators', () => {
    describe('dateNow', () => {
      beforeEach(() => {
        evaluator = evaluate('${dateNow()}')
      })
      it('returns the current time at evaluation', () => {
        expect(evaluator({ model: 'keywords', value: 'bla' })).toEqual(
          new Date()
        )
      })
    })
  })
})
