import * as ts from 'typescript';
import { RuleFailure } from 'tslint';
import { CLIEngine } from 'eslint';
export interface DataShape {
    source?: ts.SourceFile;
    linted: boolean;
    tslints: RuleFailure[];
    eslints: CLIEngine.LintReport[];
}
export declare class FilesRegister {
    private dataFactory;
    private files;
    constructor(dataFactory: (_data?: DataShape) => DataShape);
    keys(): string[];
    add(filePath: string): void;
    remove(filePath: string): void;
    has(filePath: string): boolean;
    get(filePath: string): {
        mtime?: number | undefined;
        data: DataShape;
    };
    ensure(filePath: string): void;
    getData(filePath: string): DataShape;
    mutateData(filePath: string, mutator: (data: DataShape) => void): void;
    getMtime(filePath: string): number | undefined;
    setMtime(filePath: string, mtime: number): void;
}
