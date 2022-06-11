import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExcelHelper } from './utils/excel.helper';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ExcelHelper],
})
export class AppModule {}
