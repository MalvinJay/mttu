<template>
    <el-aside width="200px">
        <el-menu router>
            <el-menu-item route="/home" index="Home">
                <template slot="title">
                    <div class="flex">
                        <img src="@/assets/images/home.svg" class="w-6 mr-4" alt="">
                        <span>
                            Home
                        </span>
                    </div>
                </template>
            </el-menu-item>
            <el-menu-item route="/profiles" index="Profiles">
                <template slot="title">
                    <div class="flex">
                        <img src="@/assets/images/profiles.svg" class="w-6 mr-4" alt="">
                        <span>
                            Profiles
                        </span>
                    </div>
                </template>
            </el-menu-item>
            <el-menu-item route="/offenses" index="Offenses">
                <template slot="title">
                    <div class="flex">
                        <img src="@/assets/images/offense.svg" class="w-6 mr-4" alt="">
                        <span>
                            Offenses
                        </span>
                    </div>
                </template>
            </el-menu-item>
            <el-menu-item route="/reports" index="Reports">
                <template slot="title">
                    <div class="flex">
                        <img src="@/assets/images/reports.svg" class="w-6 mr-4" alt="">
                        <span>
                            Reports
                        </span>
                    </div>
                </template>
            </el-menu-item>
        </el-menu>
    </el-aside>  
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .el-menu {
        border: 0px;
    }
</style>