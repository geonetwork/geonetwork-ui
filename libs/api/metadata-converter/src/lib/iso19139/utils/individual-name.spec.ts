import { fullNameToParts, namePartsToFull } from './individual-name'

describe('individual name utils', () => {
  it('fullNameToParts', () => {
    expect(fullNameToParts('John Doe')).toEqual(['John', 'Doe'])
    expect(fullNameToParts('John')).toEqual(['John', null])
    expect(fullNameToParts('  John   Jim  Doe Blah  ')).toEqual([
      'John',
      'Jim Doe Blah',
    ])
  })
  it('namePartsToFull', () => {
    expect(namePartsToFull('John', 'Doe')).toEqual('John Doe')
    expect(namePartsToFull('John', null)).toEqual('John')
    expect(namePartsToFull(null, 'Doe')).toEqual('Doe')
    expect(namePartsToFull(null, null)).toEqual(null)
    expect(namePartsToFull('', '  ')).toEqual(null)
    expect(namePartsToFull('John', 'Doe Blah')).toEqual('John Doe Blah')
    expect(namePartsToFull(' John Jim ', '  Doe Blah ')).toEqual(
      'John Jim Doe Blah'
    )
  })
})
