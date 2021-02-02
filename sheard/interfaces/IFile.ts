export interface IFile {
    _id: string,
    length: number,
    chunkSize: number,
    uploadDate: string
    md5: string,
    filename: string,
    contentType: string,
    aliases: string[],
    metadata: any,
}
