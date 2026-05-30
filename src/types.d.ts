export type GetAsciiTextConfigType = {
    fontKey?: string;
};

export type AsciiFontConfigType = {
    fontName: string;
    fontPath: string;
};

export type AsciiFontRecordType = Record<string, AsciiFontConfigType>;

export type TaskLogConfigType = {
    stamp?: string;
    promise?: Promise<unknown>;
    separator?: string;
    icon?: string;
    progressPendingIcon?: string;
    progressDoneIcon?: string;
    successIcon?: string;
};
