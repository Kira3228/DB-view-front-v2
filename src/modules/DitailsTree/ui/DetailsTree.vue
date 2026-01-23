<template>
  <div class="tw-h-full tw-flex tw-overflow-hidden">
    <v-treeview
      open-on-click
      :load-children="handleUpdate"
      :items="treeData"
    ></v-treeview>
    <div>
      <div>dsad</div>
      <div>dsad</div>
      <div>dsad</div>
      <div>dsad</div>
      <div>dsad</div>
      <div>dsad</div>
      <div>dsad</div>
      <div>dsad</div>
      <div>dsad</div>
      <div>dsad</div>
      <div>dsad</div>
      <div>dsad</div>
      <div>dsad</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useDetailsTreeModel } from "../model";
import { fetchRoots } from "../api/fetch-roots";

const { files, loadRoots, formatNodes, treeData } = useDetailsTreeModel();

const handleUpdate = async (item: any) => {
  const res = await fetchRoots({ id: item.id });
  const children = res.roots.map((f) => ({
    id: f.id,
    name: f.name,
    children: f.hasChildren ? [] : undefined,
  }));
  item.children.push(...children); // Мутируем реактивный ref
  console.log(item);
};

onMounted(() => {
  loadRoots();
});
</script>
