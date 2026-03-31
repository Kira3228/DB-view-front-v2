import { computed, onMounted, ref } from "vue"
import { FileReadsTableBody } from "../types/table-body.type";
import { useEventFilter } from "./use-event-filter";
import { useQuery } from "@tanstack/vue-query";
import { EventService } from "../api/event.service";
import { useEventPanelStore } from "./use-event-panel-store";
import { useEventDetails } from "./use-event-details";

//TODO: СДЕЛАТЬ ТАНСТАК КВЕРИ

export const useEventPanel = () => {
  const { filters } = useEventFilter()
  const eventDetails = useEventDetails()

  const { data, isLoading, error } = useQuery({
    queryKey: computed(() => ["events", filters.value]),
    queryFn: () => EventService.get(filters.value),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  })

  const drawerIsOpen = ref<boolean>(false)
  const filterDrawerIsOpen = ref<boolean>(false)

  const handleRowClick = (data: FileReadsTableBody) => {
    eventDetails.load(Number(data.fileId), Number(data.processVersionId))
    drawerIsOpen.value = true
  };

  const openFiltersClick = () => {
    filterDrawerIsOpen.value = true
  };


  return {
    drawerIsOpen,
    filterDrawerIsOpen,
    handleRowClick,
    openFiltersClick: () => { filterDrawerIsOpen.value = true },
    files: computed(() => data.value?.data ?? []),
    totalPages: computed(() => data.value?.totalPages ?? 1),
    total: computed(() => data.value?.total ?? 0),
    isLoading,
    error,
    fileDetails: computed(() => eventDetails.data.value),
    fileDetailsLoading: eventDetails.isLoading,
  }
}