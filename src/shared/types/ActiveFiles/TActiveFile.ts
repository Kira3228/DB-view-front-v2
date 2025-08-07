type TActiveFile = {
    id: number,
    inode: number,
    filePath: string,
    fileSize: number,
    maxChainDepth: number,
    minChainDepth: number,
    status: string
}

export type { TActiveFile as default }
