import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone'
import '../../../../jest.setup'
import fetchMock from '@fetch-mock/jest'

fetchMock.mockGlobal()
setupZoneTestEnv({ teardown: { destroyAfterEach: false } })
