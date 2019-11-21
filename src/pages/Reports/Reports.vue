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

          <!-- <el-button type="primary">Generate Report</el-button> -->
          <el-link class="bg-gray-700 py-2 px-4 rounded" 
          :href="url" 
          :underline="false" target="_blank">Generate Report</el-link>
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
  },
  computed: {
    url() {
      if(this.form.from != '' && this.form.to != ''){
        console.log('Current Form:', this.form)
        return `https://mttu-api.herokuapp.com/v1/reports?from=${this.form.from}&to=${this.form.to}`
      }
      else {

        return `https://mttu-api.herokuapp.com/v1/reports`
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>