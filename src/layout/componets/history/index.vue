<template>
    <div class="history-nav">
        <el-tabs
            type="card"
            :closable="!(history.length == 1 && this.$route.name == 'dashboard')"
            @tab-click="changeTab"
            @tab-remove="removeTab"
            @contextmenu.prevent.native="openContextMenu($event)"
            v-model="active"
        >
            <el-tab-pane
                :key="item.name"
                :label="item.meta.title"
                :name="item.name"
                v-for="item in history"
            >
                <slot name="view"></slot>
            </el-tab-pane>
        </el-tabs>

        <!-- 自定义右键菜单 -->
        <ul
            :style="{left:left+'px',top:top+'px'}"
            class="contextmenu"
            v-show="contextMenuVisible"
        >
            <li @click="closeAll">关闭所有</li>
            <li @click="closeLeft">关闭左侧</li>
            <li @click="closeRight">关闭右侧</li>
            <li @click="closeOther">关闭其他</li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'history',
    data() {
        return {
            history: [],
            active: 'dashboard',
            contextMenuVisible: false,
            left: 0,
            top: 0,
            rightActive: ''
        };
    },
    computed: {
        ...mapGetters({
            menu: 'menu'
        })
    },
    created() {
        const initHistorys = [
            {
                name: 'dashboard',
                meta: {
                    title: '仪表盘'
                }
            }
        ];
        this.history = JSON.parse(sessionStorage.getItem('history')) || initHistorys;
        this.setTab(this.$route);
    },
    methods: {
        /**历史标签右键点击事件 */
        openContextMenu(e) {
            if (this.history.length == 1 && this.$route.name == 'dashboard') {
                return false;
            }
            if (e.srcElement.id) {
                this.contextMenuVisible = true;
                let width;
                if (this.menu.open) {
                    width = 54;
                } else {
                    width = 220;
                }
                this.left = e.clientX - width;
                this.top = e.clientY + 10;
                this.rightActive = e.srcElement.id.split('-')[1];
            }
        },
        /**添加历史标签 */
        setTab(route) {
            if (!this.history.some((item) => item.name == route.name)) {
                const obj = {};
                obj.name = route.name;
                obj.meta = route.meta;
                this.history.push(obj);
            }
            this.active = this.$route.name;
        },
        /**切换历史标签 */
        changeTab(tab) {
            this.$router.push({ name: tab.name });
        },
        /**关闭历史标签 */
        removeTab(tab) {
            const index = this.history.findIndex((item) => item.name == tab);
            if (this.$route.name == tab) {
                if (this.history.length == 1) {
                    this.$router.push({ name: 'dashboard' });
                } else {
                    if (index < this.history.length - 1) {
                        this.$router.push({ name: this.history[index + 1].name });
                    } else {
                        this.$router.push({ name: this.history[index - 1].name });
                    }
                }
            }
            this.history.splice(index, 1);
        },
        /**关闭全部 */
        closeAll() {
            this.history = [
                {
                    name: 'dashboard',
                    meta: {
                        title: '仪表盘'
                    }
                }
            ];
            this.$router.push({ name: 'dashboard' });
            this.contextMenuVisible = false;
            sessionStorage.setItem('history', JSON.stringify(this.history));
        },
        /**关闭左侧 */
        closeLeft() {
            const rightIndex = this.history.findIndex((item) => item.name == this.rightActive);
            const activeIndex = this.history.findIndex((item) => item.name == this.activeValue);
            this.history.splice(0, rightIndex);
            if (rightIndex > activeIndex) {
                this.$router.push({ name: this.rightActive });
            }
            sessionStorage.setItem('history', JSON.stringify(this.history));
        },
        /**关闭右侧 */
        closeRight() {
            const leftIndex = this.history.findIndex((item) => item.name == this.rightActive);
            const activeIndex = this.history.findIndex((item) => item.name == this.activeValue);
            this.history.splice(leftIndex + 1, this.history.length);
            if (leftIndex < activeIndex) {
                this.$router.push({ name: this.rightActive });
            }
            sessionStorage.setItem('history', JSON.stringify(this.history));
        },
        /**关闭右侧 */
        closeOther() {
            this.history = this.history.filter((item) => item.name == this.rightActive);
            this.$router.push({ name: this.rightActive });
            sessionStorage.setItem('history', JSON.stringify(this.history));
        }
    },
    watch: {
        contextMenuVisible() {
            if (this.contextMenuVisible) {
                document.body.addEventListener('click', () => {
                    this.contextMenuVisible = false;
                });
            } else {
                document.body.removeEventListener('click', () => {
                    this.contextMenuVisible = false;
                });
            }
        },
        $route(to) {
            this.history = this.history.filter((item) => !item.meta.hidden);
            this.setTab(to);
            sessionStorage.setItem('history', JSON.stringify(this.history));
        }
    }
};
</script>

<style lang="less" scoped>
.history-nav {
    padding: 5px 20px;
    -webkit-box-shadow: inset 0 1px 4px rgba(0, 21, 41, 0.08),
        inset 0 -1px 4px rgba(0, 21, 41, 0.08);
    box-shadow: inset 0 1px 4px rgba(0, 21, 41, 0.08), inset 0 -1px 4px rgba(0, 21, 41, 0.08);
    background: transparent;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    background-color: #e9eef3;

    & /deep/ .el-tabs--card > .el-tabs__header {
        border-bottom: none;
        margin-bottom: 0;

        .el-tabs__nav {
            background-color: #ffffff;
            border-bottom: 1px solid #e4e7ed;
        }
    }
}
.contextmenu {
    width: 100px;
    margin: 0;
    border: 1px solid #ccc;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);

    li {
        margin: 0;
        padding: 7px 16px;

        &:hover {
            background: #fff;
            padding: 0 6px;
            border-top: 1px solid #dcdcdc;
        }
    }
}
</style>