export type TNode = {
  id: number,
  fileSystemId: string,
  inode: number,
  filePath: string,
  fileName: string,
  fileSize: number,
  createdAt: string,
  modifiedAt: string,
  isOriginalMarked: boolean,
  maxChainDepth: number,
  minChainDepth: number,
  status: string,
  extendedAttributes: string
}
export type TEdge = {
  type: string
  fromId: number
  toId: number
  createdAt: string
}

export type TFlattenGraph = {
  nodes: TNode[],
  edges: TEdge[],
  roots: number[];
}