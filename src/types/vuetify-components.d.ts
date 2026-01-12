// src/types/vuetify-components.d.ts
declare module "vuetify-components" {
  import { PluginObject } from "vue";

  const plugin: PluginObject<any>;
  export default plugin;

  export const DataTable: any;
  export const MyComponent: any;
  export const TestComponent: any;
}
