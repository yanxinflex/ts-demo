<template>
  <a-layout>
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <sidebar></sidebar>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content class="base-content">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }"> Ant Design ©2018 Created by Ant UED </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "./sidebar/index.vue";
export default defineComponent({
  setup() {
    return {};
  },
  components: {
    Sidebar,
  },
});
</script>
<style lang="scss" scoped>
.base-content {
  margin: 24px 16px 0;
  padding: 24px;
  background: #fff;
  min-height: calc(100vh - 158px);
}
</style>
