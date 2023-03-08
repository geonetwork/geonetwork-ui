import { Test, TestingModule } from '@nestjs/testing'
import { DatavizController } from './dataviz.controller'
import { DatavizService } from './dataviz.service'

class DatavizServiceMock {}

describe('DatavizController', () => {
  let controller: DatavizController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatavizController],
      providers: [{ provide: DatavizService, useClass: DatavizServiceMock }],
    }).compile()

    controller = module.get<DatavizController>(DatavizController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
