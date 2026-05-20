export type GetAsciiTextConfigType = {
    fontKey?: string;
};

export type AsciiFontConfigType = {
    fontName: string;
    fontPath: string;
};

export type AsciiFontRecordType = Record<string, AsciiFontConfigType>;
