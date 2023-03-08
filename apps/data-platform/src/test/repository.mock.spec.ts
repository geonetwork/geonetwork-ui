import { Repository } from 'typeorm'

type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>
}

function mockRepo() {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn((entity) => entity),
    update: jest.fn(),
    delete: jest.fn(),
  }
}

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => mockRepo()
)
