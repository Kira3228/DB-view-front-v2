<template>
  <div class="tw-h-full tw-flex tw-overflow-hidden">
    <div class="tw-h-full tw-overflow-y-auto tw-shrink-0 tw-border-r tw-p-2">
      <v-treeview
        open-on-click
        :load-children="handleUpdate"
        :items="treeData"
      ></v-treeview>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useDetailsTreeModel } from "../model";
import { fetchRoots } from "../api/fetch-roots";
import { mapToNode } from "../helpers";
import { TreeNode } from "../types";

const { files, loadRoots, formatNodes, treeData } = useDetailsTreeModel();

const handleUpdate = async (item: TreeNode) => {
  const res = await fetchRoots({ id: item.realId });
  console.log(item.realId);
  const children = res.roots.map((f) => mapToNode(f, `root`));
  item.children?.push(...children);
};

onMounted(() => {
  loadRoots();
});
</script>
