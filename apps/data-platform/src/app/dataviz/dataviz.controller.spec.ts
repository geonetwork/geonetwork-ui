import { Test, TestingModule } from '@nestjs/testing'
import { DatavizController } from './dataviz.controller.js'
import { DatavizService } from './dataviz.service.js'

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
