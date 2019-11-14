<template>
    <el-container>
        <navigation></navigation>
        <el-container>
            <el-header style="height: auto;" class="pb-4">
                <top></top>
            </el-header>
            <el-main class="py-0">
                <el-card class="rounded-sm main_height box-card">
                    <router-view></router-view>
                </el-card>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Navigation from '@/components/Navigation'
import TopNav from '@/components/TopNav'
export default {
    components: {
        'top': TopNav,
        'navigation': Navigation,
    }

}
</script>

<style lang="scss" scoped>
    .main_height {
        height: calc(100vh - 8rem);
    }
</style>