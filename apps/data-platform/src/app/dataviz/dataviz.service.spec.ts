import { Test, TestingModule } from '@nestjs/testing'
import { DatavizService } from './dataviz.service'

describe('DatavizService', () => {
  let service: DatavizService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatavizService],
    }).compile()

    service = module.get<DatavizService>(DatavizService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
