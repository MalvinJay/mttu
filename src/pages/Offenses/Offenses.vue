<template>
  <div class="offenses">
    <el-card class="box-card h-full" shadow="never">
      <div slot="header" class="clearfix">
        <div class="flex justify-between items-center">
          <el-input 
            v-model="search" 
            @click.native.enter="searchOffenses" 
            clearable 
            placeholder="Search Offense..." 
            class="w-5/12">
              <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <div class="flex items-center">
            <el-button @click.prevent="fetchOffenses" icon="el-icon-refresh icon" class="text-xl mr-4" type="text"></el-button>
            <el-popover
              placement="left"
              trigger="hover"
              content="Book Offense">
              <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-plus" circle slot="reference"></el-button>
            </el-popover>           
          </div>
        </div>

      </div>
      <div class="h-full" v-loading="loading">
        <div class="offenses-history">
          <div v-if="offenses">
            <el-card shadow="hover" v-for="(offense, index) in filteredOffenses" :key="index" class="my-4 text-gray-800 mr-2 hover:text-gray-900 hover:bg-gray-100">
              <div class="flex items-center w-full">
                <el-checkbox></el-checkbox>
                <avatar :username="offense.created_by.full_name" color="white" class="ml-4" ></avatar>
                <div class="flex flex-col ml-4 w-4/5">
                  <p class="text-base font-bold">{{offense.title}}</p>
                  <div class="flex justify-between">
                    <p class="text-sm">{{offense.description}}</p>
                    <p class="text-xs">Created by {{offense.created_by.full_name}} | {{ offense.created_at | moment("from", "now") }}</p>
                  </div>
                </div>
              </div>
            </el-card>
          </div>

          <el-card shadow="hover" v-else>
            <h3 class="text-center ">No Offenses</h3>
          </el-card>
        </div>

        <div class="flex justify-between py-4 border-t border-gray-200">
          <div></div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total">
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
          <el-button type="primary" @click="createOffense()" :loading="creating">Create</el-button>
        </span>
      <!-- </transition>    -->
    </el-dialog>   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from "@/components/Avatar.vue"
export default {
  components: {
    'avatar': Avatar
  },
  data() {
    return {
      search: '',
      checked: true,
      creating: false,
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
        // {
        //   title: "Running Through Red Light",
        //   description: "Man flying with wings downtown Madina",
        //   date: "11-08-2019",
        //   created_by: "George"
        // }, 
        // {
        //   title: "Expired Drivers License",
        //   description: "Driving license expired",
        //   date: "11-06-2019",
        //   created_by: "Arthur"
        // }, 
        // {
        //   title: "Driving Without a License",
        //   description: "Driver has been driving for months without a license",
        //   date: "11-05-2019",
        //   created_by: "Kwame"
        // }
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
  mounted() {
    console.log('State', this.state)
    console.log('loading', this.loading)
    this.$store.dispatch('getOffenses', { cache: false })
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

    },
    close() {
      this.dialogFormVisible = false
      // this.editedIndex = -1
    },    
    fetchOffenses() {
      this.$store.dispatch('getOffenses', { cache: false })
    },
    searchOffenses() {
      this.$store.dispatch('getOffenses', { cache: false, search: search })
    },
    createOffense() {
      this.creating = true;
      this.$store.dispatch('createOffense', this.form)
      .then(response => {                          
        console.log('Response', response)
        this.$message({
          message: 'Offense Created',
          type: 'success'
        });       

        this.close()
      })
      .catch(error => {
        this.$message({
          message: error,
          type: 'error'
        });                  
        console.log(error)
      })
      .finally(() => {
        this.creating = false;
      })      
    }
  },
  computed: {
    ...mapGetters({
      offenses: 'offenses',
      state: 'offensesState',
      Meta: 'offensesMeta'
    }),
    filteredOffenses () {
      return this.offenses
    },    
    error() {
      return this.state === 'ERROR' && this.state !== 'LOADING'
    },
    total() {
      return this.Meta.total_filtered
    },
    loading() {
      return this.state === 'LOADING'
    },    
  }
}
</script>

<style lang="scss" scoped>
  .offenses-history {   
    height: 88%;
    overflow-x: hidden;
  }
</style>