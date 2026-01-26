export type FileDetail = {
  id: number
  name: string
  hasChildren: boolean
  fileData: any
}

export type FilDetailResponse = {
  roots: FileDetail[]
}

export type TreeNode = {
  id: string
  realId: number
  name: string
  children?: TreeNode[]
  hasChildren: boolean
}