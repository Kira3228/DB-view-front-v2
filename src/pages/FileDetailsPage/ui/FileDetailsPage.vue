<template>
  <div class="tw-h-full tw-flex tw-overflow-hidden">
    <div class="tw-h-full">
      <DetailsTree />
    </div>
    <div class="tw-flex-1">
      Тут что то будет
      <DetailsReport />
      <Button
        :height="32"
        @click="
          () => {
            modalIsOpen = true;
          }
        "
        outlined
        >Экспорт</Button
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Button } from "@/common-components/src/components/Button";
import { useDetailsReportModel } from "@/modules/DetailsReport/model/model";
import { DetailsReport } from "@/modules/DetailsReport/ui";
import { DetailsTree } from "@/modules/DitailsTree/ui";
import { ref } from "vue";

const { endDate, modalIsOpen, startDate } = useDetailsReportModel();
</script>
