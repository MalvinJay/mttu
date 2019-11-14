<template>
  <div class="offenses">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <div class="flex justify-between">
          <span></span>
  <el-popover
    placement="left"
    trigger="hover"
    content="Add Offense">
    <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-plus" circle slot="reference"></el-button>
  </el-popover>            
        </div>
      </div>
      <div class="h-full">
        <div class="offenses-history">
          <el-card shadow="hover" v-for="(offense, index) in Offenses" :key="index" class="my-4 text-gray-800 hover:text-gray-900 hover:bg-gray-100">
            <div class="flex items-center w-full">
              <el-checkbox></el-checkbox>
              <avatar :username="offense.created_by" color="white" class="ml-4" ></avatar>
              <div class="flex flex-col ml-4 w-4/5">
                <p class="text-base font-bold">{{offense.title}}</p>
                <div class="flex justify-between">
                  <p class="text-sm">{{offense.description}}</p>
                  <p class="text-xs">Created by {{offense.created_by}} | {{ offense.date | moment("from", "now") }}</p>
                </div>
              </div>
            </div>
          </el-card>
        </div>

        <div class="flex justify-between py-4">
          <div></div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="11">
          </el-pagination>          
        </div>        
      </div>
    </el-card>  

    <!-- Add and Edit Offense  -->
    <el-dialog title="Add Offense" :visible.sync="dialogFormVisible" custom-class="new-profile">
      <!-- <transition name="el-zoom-in-top"> -->
        <el-form :model="form" size="mini" label-width="200px" class="bg-gray-100 py-4 px-8">
          <el-form-item label="Offense">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Description (Optional)">
            <el-input type="textarea" v-model="form.description"  :autosize="{ minRows: 5}" autocomplete="off"></el-input>
          </el-form-item>        
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">Create</el-button>
        </span>
      <!-- </transition>    -->
    </el-dialog>   
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue"
export default {
  components: {
    'avatar': Avatar
  },
  data() {
    return {
      checked: true,
      dialogFormVisible: false,
      form: {
        title: "",
        description: ""
      },
      formLabelWidth: '120px',       
      Offenses: [
        {
          title: "Road Vehicle Accident",
          description: "Driver involved in an accident at Abeka lapaz.",
          date: "11-09-2019",
          created_by: "Malvin"
        }, 
        {
          title: "Running Through Red Light",
          description: "Man flying with wings downtown Madina",
          date: "11-08-2019",
          created_by: "George"
        }, 
        {
          title: "Expired Drivers License",
          description: "Driving license expired",
          date: "11-06-2019",
          created_by: "Arthur"
        }, 
        {
          title: "Driving Without a License",
          description: "Driver has been driving for months without a license",
          date: "11-05-2019",
          created_by: "Kwame"
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
    },
    handleClick() {

    }
  } 
}
</script>

<style lang="scss" scoped>
  .profiles-history {
    height: 90%;
    overflow-y: scroll;
  }
  .pagination {
      
  }
</style>