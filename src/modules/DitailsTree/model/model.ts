import { storeToRefs } from "pinia"
import { useDetailsTreeStore } from "./store"
import { ref } from "vue"
import { fetchRoots } from "../api/fetch-roots"

export const useDetailsTreeModel = () => {
  // const { loadRoots } = useDetailsTreeStore()
  const { files, formatNodes } = storeToRefs(useDetailsTreeStore())
  const treeData = ref<any[]>([])

  const loadRoots = async () => {
    const res = await fetchRoots({ id: 'all' })

    treeData.value = res.roots.map(f => ({
      id: f.id,
      name: f.name,
      children: f.hasChildren ? [] : undefined
    }))
  }




  return { loadRoots, files, formatNodes, treeData }
}