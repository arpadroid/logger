export type GetAsciiTextConfigType = {
    fontKey?: string;
};

export type AsciiFontConfigType = {
    fontName: string;
    fontPath: string;
};

export type AsciiFontRecordType = Record<string, AsciiFontConfigType>;

export type TaskLogConfigType = {
    promise?: Promise<unknown>;
    separator?: string;
    icon?: string;
    progressIcon?: string;
    progressDoneIcon?: string;
    successIcon?: string;
    doneMessage?: string | (() => string);
    startTime?: number;
    runTime?: number;
    showProgress?: boolean;
    timingThresHolds?: [number, number, number, number];
};
