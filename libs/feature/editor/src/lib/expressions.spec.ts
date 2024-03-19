import { evaluate, ExpressionEvaluator } from './expressions'
import { EditorFieldConfig } from './models/fields.model'

const SAMPLE_CONFIG: EditorFieldConfig = {
  formFieldConfig: {
    labelKey: 'Metadata title',
    type: 'text',
  },
  model: 'myModel',
}

describe('expressions', () => {
  let evaluator: ExpressionEvaluator
  describe('operators', () => {
    describe('dateNow', () => {
      beforeEach(() => {
        evaluator = evaluate('${dateNow()}')
      })
      it('returns the current time at evaluation', () => {
        expect(evaluator({ config: SAMPLE_CONFIG, value: 'bla' })).toEqual(
          new Date()
        )
      })
    })
  })
})
