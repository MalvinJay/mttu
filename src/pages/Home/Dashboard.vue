<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="clearfix">
      <p class="text-center py-2 text-xl">Quick Summary</p>
    </div>
    <div class="text-center">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover">
            <h1 class="font-bold text-5xl">1</h1>
            <span class="">Registered Officers</span>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <h1 class="font-bold text-5xl">5</h1>
            <span class="">Offenders</span>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <h1 class="font-bold text-5xl">100</h1>
            <span class="">Offenses</span>
          </el-card>
        </el-col>
      </el-row>      
    </div>
  </el-card>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>