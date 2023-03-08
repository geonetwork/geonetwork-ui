import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { repositoryMockFactory } from '../../test/repository.mock.spec'
import { DatavizService } from './dataviz.service'
import { Dataviz } from './entities/dataviz.entity'

describe('DatavizService', () => {
  let service: DatavizService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatavizService,
        {
          provide: getRepositoryToken(Dataviz),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile()

    service = module.get<DatavizService>(DatavizService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
