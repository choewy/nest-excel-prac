import { Injectable } from '@nestjs/common';
import { ExcelHelper } from './utils/excel.helper';

@Injectable()
export class AppService {
  constructor(private readonly excelHelper: ExcelHelper) {}

  async createExcelFile() {
    return await this.excelHelper.createFile();
  }

  async getExcelFileNames() {
    return await this.excelHelper.getFileNames();
  }

  async getExcelFileData(fileName: string) {
    return await this.excelHelper.readFile(fileName);
  }
}
