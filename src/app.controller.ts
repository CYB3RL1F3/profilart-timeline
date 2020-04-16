import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Res() res) {
      return res.status(HttpStatus.OK).json({
        status: "OK"
      });
  }
}
