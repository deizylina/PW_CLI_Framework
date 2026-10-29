/*
Create a new file named DataReader.ts in the existing folder utils.

Use the existing dependencies:

fs
csv-parse
xlsx
Create and export a class named DataProvider.

Implement exactly these three static methods:

4.1 readJson(filePath: string)
Read the JSON file using fs.readFileSync(filePath, 'utf8').
Parse the file contents using JSON.parse().
Return the parsed data.
4.2 readCsv(filePath: string)
Read the CSV file using fs.readFileSync(filePath).
Parse the CSV using parse() from csv-parse/sync.
Use these parsing options:
columns: true
skip_empty_lines: true
Return the parsed data.
4.3 readExcel(filePath: string)
Read the Excel workbook using XLSX.readFile(filePath).
Select the first worksheet using workbook.SheetNames[0].
Get that worksheet from workbook.Sheets[sheetName].
Convert the worksheet to JSON data using XLSX.utils.sheet_to_json(worksheet, { header: 1 }).
Return the resulting data.
Do not add support for additional file formats.

Do not add sheet-name parameters.

Do not add additional methods, classes, interfaces, types, constants, validation, logging, error handling, or functionality.

Expected Result
A utils/DataReader.ts file exporting the DataProvider class with three static methods for reading JSON, CSV, and Excel test data files.
*/
import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import * as XLSX from 'xlsx';

export class DataProvider {
    static readJson(filePath: string) {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    }

    static readCsv(filePath: string) {
        //const fs = require('fs');
        //const { parse } = require('csv-parse/sync');
        const data = fs.readFileSync(filePath);
        return parse(data, {
            columns: true,
            skip_empty_lines: true
        });
    }

    static readExcel(filePath: string) {
       // const XLSX = require('xlsx');
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    }
}