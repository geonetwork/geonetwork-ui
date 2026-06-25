import { EditorFieldValue } from './models'
import { evaluate, EvaluationContext } from './expressions'

const originalDate = window.Date
window.Date = function () {
  return new originalDate('12345')
} as any

interface TestCase {
  name: string
  expression: string
  context: EvaluationContext
  result: EditorFieldValue
  errors?: string[]
}

const TEST_CASES: TestCase[] = [
  {
    name: 'number literal',
    expression: ' 1234 ',
    context: {
      globals: {},
    },
    result: 1234,
  },
  {
    name: 'string literal',
    expression: ' "hello world" ',
    context: {
      globals: {},
    },
    result: 'hello world',
  },
  {
    name: 'equals',
    expression: ' 11 == "11" ',
    context: {
      globals: {},
    },
    result: true,
  },
  {
    name: 'equals (2)',
    expression: '"34"=="35"',
    context: {
      globals: {},
    },
    result: false,
  },
  {
    name: 'different',
    expression: " 11 != '12' ",
    context: {
      globals: {},
    },
    result: true,
  },
  {
    name: 'different (2)',
    expression: '"34" != 34',
    context: {
      globals: {},
    },
    result: false,
  },
  {
    name: 'global property access',
    expression: '  myObj.hello',
    context: {
      globals: {
        myObj: {
          hello: 'world',
        },
      },
    },
    result: 'world',
  },
  {
    name: 'global property access (2)',
    expression: 'myObj.hello   ==   "world"',
    context: {
      globals: {
        myObj: {
          hello: 'world',
        },
      },
    },
    result: true,
  },
  {
    name: 'global property access (3)',
    expression: 'abc.def==123',
    context: {
      globals: {
        abc: {
          def: '1234',
        },
      },
    },
    result: false,
  },
  {
    name: 'global property access (4)',
    expression: '123 != abc.def ',
    context: {
      globals: {
        abc: {
          def: '1234',
        },
      },
    },
    result: true,
  },
  {
    name: 'dateNow()',
    expression: '${dateNow()}',
    context: {
      globals: {},
    },
    result: new Date(),
  },
  {
    name: 'ternary expression',
    expression: '1 ? 2 : 3',
    context: {
      globals: {},
    },
    result: 2,
  },

  // ERRORS

  {
    name: 'unknown function',
    expression: 'unknownFunc()',
    context: {
      globals: {},
    },
    result: undefined,
    errors: ['Unknown function: unknownFunc'],
  },
  {
    name: 'unexpected character',
    expression: '@value',
    context: {
      globals: {},
    },
    result: undefined,
    errors: ["Unexpected character '@' at position 0"],
  },
  {
    name: 'unclosed string literal',
    expression: '"hello world',
    context: {
      globals: {},
    },
    result: undefined,
    errors: [
      'Reached end of expression before finding corresponding closing token " for string literal',
    ],
  },
  {
    name: 'ternary missing colon separator',
    expression: '1 ? 2',
    context: {
      globals: {},
    },
    result: 1,
    errors: ["Reached end of expression before finding expected token ':'"],
  },
  {
    name: 'symbol followed by unexpected character',
    expression: 'myObj + 1',
    context: {
      globals: {},
    },
    result: undefined,
    errors: [
      "Expected a function call or property access after symbol 'myObj' at position 6, got '+' instead",
    ],
  },
  {
    name: 'function call with unsupported arguments',
    expression: 'dateNow(abc)',
    context: {
      globals: {},
    },
    result: undefined,
    errors: ["Expected token ')' at position 8, got 'a' instead"],
  },
  {
    name: 'property access with missing property name',
    expression: 'myObj. ',
    context: {
      globals: {},
    },
    result: undefined,
    errors: [
      "Expected a property name after '.' at position 6, got ' ' instead",
    ],
  },
]

describe('expressions', () => {
  it.each(TEST_CASES)('$name', (testCase) => {
    const { expression, context, result, errors: expectedErrors } = testCase
    const { evaluator, errors: errors } = evaluate(expression)
    expect(errors).toEqual(expectedErrors ?? [])
    expect(evaluator(context)).toStrictEqual(result)
  })

  it('throws when accessing an unknown global variable at runtime', () => {
    const { evaluator } = evaluate('myObj.hello')
    expect(() => evaluator({ globals: {} })).toThrow(
      "Unknown global variable 'myObj'"
    )
  })

  it('throws when accessing an unknown property on a global variable at runtime', () => {
    const { evaluator } = evaluate('myObj.missing')
    expect(() => evaluator({ globals: { myObj: { hello: 'world' } } })).toThrow(
      "Unknown property 'missing' in global variable 'myObj'"
    )
  })
})
