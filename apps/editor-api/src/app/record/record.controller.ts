import { Controller, Get } from '@nestjs/common'

import { RecordService } from './record.service'

@Controller()
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get()
  getData() {}
}
