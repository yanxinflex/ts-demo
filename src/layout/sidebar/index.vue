<template>
  <a-menu mode="inline" theme="dark" :inline-collapsed="collapsed" :default-open-keys="openKeys" :default-selected-keys="selectedKeys">
    <template v-for="item in parseRoutes" :key="item.path">
      <template v-if="!item.children">
        <a-menu-item :key="item.path">
          <router-link :to="item.path">
            <span>{{ item.meta.title }}</span>
          </router-link>
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.path" />
      </template>
    </template>
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import routes from "@/router/routes";
const SubMenu = {
  name: "SubMenu",
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  template: `
    <a-sub-menu :key="menuInfo.path" v-bind="$attrs">
      <template #title>
        <span>
          <span>{{ menuInfo.meta.title }}</span>
        </span>
      </template>
      <template v-for="item in menuInfo.children" :key="item.path">
        <template v-if="!item.children">
          <a-menu-item :key="item.path">
              <router-link :to="item.path">
                <span>{{ item.meta.title }}</span>
              </router-link>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.path" />
        </template>
      </template>
    </a-sub-menu>
  `,
  components: {},
};
export default defineComponent({
  setup() {
    const collapsed = ref<boolean>(false);

    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value;
    };

    const parseTree: any = function (source: any) {
      let target: any[] = [];
      for (let item of source) {
        //节点隐藏
        if (item.meta.hidden) break;

        //获取没有隐藏的子节点
        let noHideChild = [];
        if (item.children) {
          noHideChild = item.children.filter((citem: any) => {
            return !citem.meta.hidden;
          });
        }
        //如果只有一个子节点且当前节点不是总是显示，则用子节点替换
        let isOneChild = noHideChild.length == 1;
        if (isOneChild && !item.meta.alwaysShow) {
          item = noHideChild[0];
        }
        //有子节点
        if (item.children && item.children.length > 0) {
          item.children = parseTree(item.children);
        }
        target.push(item);
      }
      return target;
    };
    let parseRoutes = parseTree(routes);
    return {
      collapsed,
      toggleCollapsed,
      parseRoutes,
    };
  },
  components: {
    "sub-menu": SubMenu,
  },
  computed: {
    selectedKeys() {
      return [this.$route.path];
    },
    openKeys() {
      return this.$route.matched.reduce((acc: string[], item: any) => {
        return [...acc, item.path];
      }, []);
    },
  },
});
</script>
