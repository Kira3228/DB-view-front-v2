import { useQuery } from "@tanstack/vue-query";
import { computed, ref } from "vue"
import { EventService } from "../api/event.service";

export const useEventDetails = () => {
  const selectedIds = ref<{ fileId: number; procVerId: number } | null>(null)

  const query = useQuery({
    queryKey: computed(() => ["fileDetails", selectedIds.value]),
    queryFn: () => EventService.getFilesDetails({
      fileId: selectedIds.value!.fileId,
      processVersionId: selectedIds.value!.procVerId
    }),
    enabled: computed(() => selectedIds.value !== null),
    keepPreviousData: true
  })

  const load = (fileId: number, procVerId: number) => {
    selectedIds.value = { fileId, procVerId }
  }

  return { ...query, load }
}