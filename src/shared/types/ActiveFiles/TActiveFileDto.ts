import TActiveFile from "./TActiveFile"

export type ActiveFileDto = {
    files: TActiveFile[]
    totalCount: number,
    page: number,
    totalPages: number
    limit: number
}



