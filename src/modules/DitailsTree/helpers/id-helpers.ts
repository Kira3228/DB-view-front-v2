import { TreeNode } from "../types";

const generateNodeId = (fileId: string, parentNodeId: string = `root`) => {
  return `${parentNodeId}-${fileId}`
}

export const mapToNode = (file: any, parentUuid: string = `root`) => {
  const uniqueId = generateNodeId(file.id, parentUuid)

  return {
    id: uniqueId,
    realId: file.id,
    name: file.name,
    hasChildren: file.hasChildren,
    children: file.hasChildren ? [] : undefined
  };

}