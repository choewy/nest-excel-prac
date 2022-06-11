import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import * as uuid from 'uuid';

@Injectable()
export class ExcelHelper {
  async getFileNames(): Promise<string[]> {
    return fs.readdirSync('storage');
  }

  async createFile(): Promise<string> {
    // 워크북 생성
    const workBook: xlsx.WorkBook = xlsx.utils.book_new();

    // 케이블 시트 생성(@breif aoa_to_sheet 방식)
    const sheetA: xlsx.WorkSheet = xlsx.utils.aoa_to_sheet([
      ['seq', 'type', 'count'],
      [1, 'A', 402],
      [2, 'B', 304],
      [3, 'C', 888],
      [4, 'D', 123],
      [5, 'E', 952],
      [6, 'F', 596],
      [7, 'G', 659],
      [8, 'H', 333],
      [9, 'I', 442],
      [10, 'J', 654],
    ]);

    // 두 번째 시트 생성(JSON 형식)
    const sheetB: xlsx.WorkSheet = xlsx.utils.json_to_sheet([
      { seq: 1, type: 'A', count: 402 },
      { seq: 2, type: 'B', count: 304 },
      { seq: 3, type: 'C', count: 888 },
      { seq: 4, type: 'D', count: 123 },
      { seq: 5, type: 'E', count: 952 },
      { seq: 6, type: 'F', count: 596 },
      { seq: 7, type: 'G', count: 659 },
      { seq: 8, type: 'H', count: 333 },
      { seq: 9, type: 'I', count: 442 },
      { seq: 10, type: 'J', count: 654 },
    ]);

    // 열 너비 조정
    sheetA['!cols'] = [{ wpx: 130 }, { wpx: 100 }, { wpx: 80 }];
    sheetB['!cols'] = [{ wpx: 130 }, { wpx: 100 }, { wpx: 80 }];

    // 데이터 시트 등록
    xlsx.utils.book_append_sheet(workBook, sheetA, 'SheetA');
    xlsx.utils.book_append_sheet(workBook, sheetB, 'SheetB');

    // 파일명 생성
    const fileName = `storage/${uuid.v1()}.xlsx`;

    // 엑셀 파일 저장
    xlsx.writeFile(workBook, fileName);

    return fileName;
  }

  async readFile(fileName: string) {
    // 엑셀 파일 읽기
    const filePath = `storage/${fileName}.xlsx`;
    const excelFile: xlsx.WorkBook = xlsx.readFile(filePath);

    // 엑셀 파일의 모든 시트 이름 추출
    const sheetNames: string[] = excelFile.SheetNames;

    // 엑셀 파일의 모든 시트 데이터 추출
    const sheetDatas = sheetNames.map(
      (sheetName): { [sheetName: string]: any[] } => {
        const sheetData = excelFile.Sheets[sheetName];
        const sheetRows = xlsx.utils.sheet_to_json(sheetData, { defval: '' });
        return { [sheetName]: sheetRows };
      },
    );

    return {
      sheetNames,
      sheetDatas,
    };
  }
}
