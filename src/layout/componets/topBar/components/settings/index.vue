<template>
    <div class="settings"
         @contextmenu.prevent>
        <el-dropdown>
            <div class="avatar">
                <el-avatar class="avatar-img"
                           :src="avatar"
                           shape="circle"
                           fit="cover"></el-avatar>
                <span class="nickname">{{userInfo.nickname}}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-s-custom">个人信息</el-dropdown-item>
                <el-dropdown-item icon="el-icon-warning"
                                  @click.native="logout()">退出系统</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'settings',
    data() {
        return {
            avatar: require('@/assets/github.png')
        };
    },
    computed: {
        ...mapGetters({
            userInfo: 'userInfo'
        })
    },
    methods: {
        ...mapActions({
            logout: 'user/logout'
        })
    }
};
</script>

<style lang="less" scoped>
.settings {
    margin-left: 16px;
    cursor: pointer;

    .el-dropdown-selfdefine:focus,
    .el-dropdown-selfdefine:focus:active,
    .el-dropdown-selfdefine:focus:not(.focusing) {
        outline: none;
        box-shadow: none;
    }

    .avatar {
        display: flex;
        align-items: center;

        .avatar-img {
            width: 48px;
            height: 48px;
            margin-right: 10px;
        }

        .nickname {
            font-size: 12px;
            color: #606266;
            font-weight: 400;
        }
    }
}
</style>