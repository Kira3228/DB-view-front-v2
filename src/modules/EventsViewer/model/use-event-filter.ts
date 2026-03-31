import { computed, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router/composables"
import { EventDto } from "../types/message-event.dto"

export const useEventFilter = (onClose?: (val: boolean) => void) => {
  const router = useRouter()
  const route = useRoute()

  const filters = computed<EventDto>(() => ({
    filesystemId: route.query.filesystemId as string | undefined,
    osUserId: route.query.osUserId as string | undefined,
    process: route.query.process as string | undefined,
    operationType: route.query.operationType as string | undefined,
    versionNumber: route.query.versionNumber
      ? Number(route.query.versionNumber)
      : undefined,
    trackingStartedAt: route.query.trackingStartedAt as string | undefined,
    birthTime: route.query.birthTime as string | undefined,
    firstAt: route.query.firstAt as string | undefined,
    page: Number(route.query.page) || 1,
    limit: Number(route.query.limit) || 100,
  }))

  const localFilters = ref({ ...filters.value })

  const setFilter = (patch: Partial<typeof filters.value>) => {
    const query = { ...route.query }

    for (const [key, val] of Object.entries(patch)) {
      if (val === undefined || val === "" || val === null) {
        delete query[key]
      } else {
        query[key] = String(val)
      }
    }

    query.page = "1"

    router.push({ query })
  }

  watch(filters, (newVal) => {
    localFilters.value = { ...newVal }
  })

  const applyFilters = () => {
    setFilter(localFilters.value)
    onClose?.(false)
  }
  const resetFilters = () => {
    router.push({ query: { page: "1" } })
    onClose?.(false)
  }
  return { filters, localFilters, setFilter, applyFilters, resetFilters }

}