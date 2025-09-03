export type TNode = {
  id: number
  fileName: string
  status: string
  filePath: string
  [k: string]: any
}
export type TEdge = {
  type: string,
  fromId: number,
  toId: number,
  createdAt: string
  [k: string]: any
}
export type TGraph = {
  nodes: TNode[]
  edges: TEdge[]
  roots: number[]
}

export type TreeItem = {
  id: string
  name: string
  children?: TreeItem[]
  raw?: TNode
}

const indexGraph = (g: TGraph) => {
  const nodeById = new Map<number, TNode>()
  for (const n of g.nodes) {
    nodeById.set(n.id, n)
  }
  const out = new Map<number, TEdge[]>()
  for (const e of g.edges) {
    if (!out.has(e.fromId)) {
      out.set(e.fromId, [])
    }
    out.get(e.fromId)!.push(e)
  }
  return { nodeById, out }
}

const hasCycleFrom = (
  id: number,
  out: Map<number, TEdge[]>,
  stack = new Set<number>(),
  seen = new Set<number>()
) => {
  if (stack.has(id)) {
    return true
  }
  if (seen.has(id)) {
    return false
  }
  seen.add(id)
  stack.add(id)

  for (const e of out.get(id) ?? []) {
    if (hasCycleFrom(e.toId, out, stack, seen)) {
      return true
    }
  }
  stack.delete(id)
  return false
}

const buildTree = (rootId: number, nodeById: Map<number, TNode>, out: Map<number, TEdge[]>) => {
  const path = new Set<number>()
  const dfs = (id: number) => {
    const n = nodeById.get(id)
    if (!n) {
      return null
    }
    const item: TreeItem = {
      id: `${id}-${Math.random().toString(36).slice(2, 8)}`,
      name: `${n.fileName}-${n.status}`,
      raw: n,
      children: []
    }
    if (path.has(id)) {
      item.name = `${n.fileName} - ${n.status} (ref)`
      delete item.children
      return item
    }
    path.add(id)
    for (const e of out.get(id) ?? []) {
      const child = dfs(e.toId)
      if (child) {
        child.name = `${child.raw?.fileName ?? child.name} - ${child.raw?.status ?? ''}[${e.type}]`.trim()
        item.children!.push(child)
      }
    }
    path.delete(id)

    if (!item.children!.length) {
      delete item.children
    }
    return item
  }
  return dfs(rootId)
}

export const graphToTreeItems = (g: TGraph): TreeItem[] => {
  const { nodeById, out } = indexGraph(g)
  for (const r of g.roots) {
    if (hasCycleFrom(r, out)) {
      break
    }
  }

  const forest: TreeItem[] = []

  for (const r of g.roots) {
    const t = buildTree(r, nodeById, out)

    if (t) {
      forest.push(t)
    }
  }

  const inForestIds = new Set<number>()

  const collectIds = (it: TreeItem) => {
    const rawId = it.raw?.id
    if (rawId != null) {
      inForestIds.add(rawId)
    }
    for (const c of it.children ?? []) {
      collectIds(c)
    }
  }

  for (const t of forest) {
    collectIds(t)
  }

  for (const n of g.nodes) {
    if (!inForestIds.has(n.id)) {
      forest.push({
        id: `${n.id}-solo`,
        name: `${n.fileName} - ${n.status}`,
        raw: n
      })
    }
  }

  return forest
}


