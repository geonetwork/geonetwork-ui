import fetch from 'fetch-mock-jest'
import '../../../../jest.setup'

global.fetch = fetch as never
