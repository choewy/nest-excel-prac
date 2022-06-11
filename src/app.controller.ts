import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('create')
  async createExcelFile(@Res() res: Response): Promise<void> {
    const filePath = await this.appService.createExcelFile();
    return res.download(filePath);
  }

  @Get('files')
  async getExcelFileNames(): Promise<string[]> {
    return await this.appService.getExcelFileNames();
  }

  @Get('files/:fileName')
  async getExcelFileData(@Param('fileName') fileName: string) {
    return await this.appService.getExcelFileData(fileName);
  }
}
