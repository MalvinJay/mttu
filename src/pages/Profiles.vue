<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="flex justify-between">
          <span></span>
          <el-button type="primary" icon="el-icon-plus" circle></el-button>
        </div>
      </div>
      <div class="text item">
        <el-table
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>


            <el-table-column
              v-for="column in columns"
              show-overflow-tooltip 
              :width="column.width"
              :key="column.name"
              :property="column.dataField"
              :label="column.label"
            >
            </el-table-column>
        </el-table>
        <div class="mt-5">
          
        </div>        
      </div>
    </el-card>      
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: 'Kwame Boamah',
          address: 'No. 189, Grove St, Los Angeles',
          number: '233545515678',
          designation: "Accra",
          department: "Operations",
          registered_no: "YH47R",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city: "Accra"
        }, 
        {
          date: '2016-05-02',
          name: 'Caleb Kpabitey',
          address: 'No. 189, Grove St, Los Angeles',
          number: '233232456784',
          designation: "Accra",
          department: "Operations",
          registered_no: "YH47T",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city: "Accra"
        }, 
        {
          date: '2016-05-04',
          name: 'Malvin Arthur',
          address: 'No. 189, Grove St, Los Angeles',
          number: '233273451091',
          designation: "Accra",
          department: "Operations",
          registered_no: "JDU7S",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city: "Accra"
        }, 
        {
          date: '2016-05-01',
          name: 'Deborah Naa Bruce-GasKing ',
          address: 'No. 189, Grove St, Los Angeles',
          number: '233032405385',
          designation: "Accra",
          department: "Operations",
          registered_no: "SDF6Y7",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city: "Accra"
        }, 
        {
          date: '2016-05-08',
          name: 'Kweku Botchwey',
          address: 'No. 189, Grove St, Los Angeles',
          number: '2335532245630',
          designation: "Accra",
          department: "Operations",
          registered_no: "YH17R",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city: "Accra"
        }, 
        {
          date: '2016-05-06',
          name: 'Andy Awuku',
          address: 'No. 189, Grove St, Los Angeles',
          number: '23343989086',
          designation: "Accra",
          department: "Operations",
          registered_no: "POD83",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city: "Accra"
        }, 
        {
          date: '2016-05-07',
          name: 'Esiname Dzigbordi',
          address: 'No. 189, Grove St, Los Angeles',
          number: '2335484937',
          designation: "Accra",
          department: "Operations",
          registered_no: "37UFHY",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city: "Accra"
        }
      ],
      columns: [
        {label: 'Officer Name', dataField: 'name', width: 'auto'},
        {label: 'Address', dataField: 'address', width: 'auto'},
        {label: 'Registered No.', dataField: 'registered_no', width: '200'},
        {label: 'Department', dataField: 'department', width: 'auto'},
        {label: 'Designation', dataField: 'designation', width: 'auto'},
      ],
      multipleSelection: []      
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  } 
}
</script>

<style>

</style>