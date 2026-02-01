export type ImageOptionsTypes = {
    upload?: (file: File) => Promise<string>;
    maxSize?: number;
    defaultInline?: boolean;
    enableAlt?: boolean;
    aspect?: number;
}