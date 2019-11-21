<template>
  <div class="offenses">
    <el-card class="box-card h-full" shadow="never">
      <div slot="header" class="clearfix">
        <div class="flex justify-between items-center">
          <el-input 
            v-model="search" 
            @click.native.enter="searchOffenders" 
            clearable 
            placeholder="Search Offenders..." 
            class="w-5/12">
              <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <div class="flex items-center">
            <el-button @click.prevent="fetchOffenders" icon="el-icon-refresh icon" class="text-xl mr-4" type="text"></el-button>
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
          <div v-if="offenders">
            <el-table
                ref="multipleTable"
                v-loading="loading"
                :data="filteredOffenders"
                style="width: 100%"

                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>

                <el-table-column
                  show-overflow-tooltip 
                  prop="full_name"
                >
                  <template slot-scope="scope">
                    <avatar :username="scope.row.full_name" color="white" class="ml-4" ></avatar>
                  </template>
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

                <el-table-column fixed="right" label="" width="120" prop="id">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="update(scope.row.id)" icon="el-icon-edit" circle></el-button>
                    <el-button size="mini" @click="handleDelete(scope.row.id)" icon="el-icon-delete" circle></el-button>
                  </template>
                </el-table-column>            
            </el-table>            
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
    <el-dialog top="1vh" title="Add Offense" :visible.sync="dialogFormVisible" custom-class="new-profile">
      <el-form :model="form" size="mini" label-width="200px" class="bg-gray-100 py-4 px-8">
        <el-form-item label="Offense">
          <el-select v-model="form.user.offense" placeholder="Select Offense" class="w-full">
            <el-option label="Over-speeding" value=1></el-option>
            <el-option label="Expired License" value=2></el-option>
            <el-option label="Driving through red light" value=3></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="form.user.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Moto Vehicle Number">
          <el-input v-model="form.user.vehicle_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Moto Vehicle Type/Model">
          <el-select v-model="form.user.vehicle_model" placeholder="Model" class="w-full">
            <el-option label="Toyota Corolla" value=1></el-option>
            <el-option label="Benzo" value=2></el-option>
            <el-option label="Ford" value=3></el-option>
          </el-select>            
        </el-form-item>
        <el-form-item label="Driver License Number">
          <el-input v-model="form.user.license_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Date Of Issue">
          <el-input type="textarea" v-model="form.user.date_of_issue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Date Of Expiry">
          <el-input type="textarea" v-model="form.user.date_of_expiry" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone Number">
          <el-input v-model="form.user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input type="email" v-model="form.user.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Number of Ppeople in Vehicle">
          <el-input type="number" v-model="form.user.people" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="City/Town">
          <el-input v-model="form.user.city_town" autocomplete="off"></el-input>
        </el-form-item>  
        <el-form-item label="Injured Parties?">
          <el-switch v-model="form.user.injured"></el-switch>
        </el-form-item>
        <el-form-item label="Toll Track Needed?">
          <el-switch v-model="form.user.toll"></el-switch>
        </el-form-item>
        <el-form-item label="Ambulance Needed?">
          <el-switch v-model="form.user.ambulance"></el-switch>
        </el-form-item>                                
      </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="createOffender()" :loading="creating">Create</el-button>
        </span>
      
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
        user: {

        }
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
        {label: 'Name', dataField: 'name', width: 'auto'},
        {label: "Drivers License", dataField: 'address', width: 'auto'},
        {label: 'Vehicle Number', dataField: 'registered_no', width: '200'},
        {label: 'Offense Type', dataField: 'department', width: 'auto'},
        {label: 'Designation', dataField: 'designation', width: 'auto'},
      ],
      multipleSelection: []      
    }
  },
  mounted() {
    console.log('State', this.state)
    console.log('loading', this.loading)
    this.$store.dispatch('getOffenders', { cache: false })
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
    fetchOffenders() {
      this.$store.dispatch('getOffenders', { cache: false })
    },
    searchOffenders() {
      this.$store.dispatch('getOffenders', { cache: false, search: search })
    },
    createOffender() {
      this.creating = true;
      this.$store.dispatch('createOffender', this.form)
      .then(response => {                          
        console.log('Response', response)
        this.$message({
          message: 'Offender Created',
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
      offenders: 'offenders',
      state: 'offendersState',
      Meta: 'offendersMeta'
    }),
    filteredOffenders () {
      return this.offenders
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