<template>
  <div class="reports">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <div class="flex justify-between">
          <span>Reports</span>
          <span></span>
        </div>
      </div>
      <div class="h-full">
        <div class="flex justify-around items-center">

    <span class="demonstration">Date Range</span>
    <el-date-picker
      v-model="form"
      type="daterange"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date">
    </el-date-picker>

    <el-button type="primary">Generate Report</el-button>
     
        </div>     
      </div>
    </el-card>        
  </div>
</template>

<script>
export default {
   data() {
    return {
       form: {
         from: '',
         to: ''
       }
    }
   }
}
</script>

<style lang="scss" scoped>

</style>