import { storeToRefs } from "pinia"
import { useActiveFileFilterStore } from "./store"

export const useActiveFileFiltersModel = () => {
  const { inode } = storeToRefs(useActiveFileFilterStore())
  return { inode }

}