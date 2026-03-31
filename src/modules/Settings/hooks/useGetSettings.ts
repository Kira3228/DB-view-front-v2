import { useQueries, useQuery } from "@tanstack/vue-query"
import { computed } from "vue"
import { SettingsService } from "../settings.service"

export const useGetSettings = () => {
  const query = useQuery({
    queryKey: computed(() => ["settings"]),
    queryFn: () => SettingsService.get(),
    keepPreviousData: true
  })

  return { ...query }
}
