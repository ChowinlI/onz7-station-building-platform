<template>
    <component :is="menuItemComponent"
               :routerInfo="routerInfo"
               v-if="!routerInfo.hidden">
        <template v-if="menuItemComponent === 'subMenuItem'">
            <!-- 如果当前菜单有二级菜单甚至更多级子菜单，则递归调用组件 -->
            <menuListItem v-for="item in routerInfo.children"
                          :routerInfo="item"
                          :key="item.name" />
        </template>
    </component>
</template>

<script>
import menuItem from './menuItem';
import subMenuItem from './subMenuItem';

export default {
    name: 'menuListItem',
    props: {
        routerInfo: {
            type: Object,
            default() {
                return null;
            }
        }
    },
    components: {
        menuItem,
        subMenuItem
    },
    computed: {
        menuItemComponent() {
            if (
                this.routerInfo.children &&
                this.routerInfo.children.filter(item => !item.hidden).length
            ) {
                return 'subMenuItem';
            } else {
                return 'menuItem';
            }
        }
    }
};
</script>

<style>
</style>
