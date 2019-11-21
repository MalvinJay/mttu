<template>
  <div class="profiles">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <div class="flex justify-between items-center">
          <el-input 
            v-model="search" 
            @click.native.enter="fetchProfiles" 
            clearable 
            placeholder="Search Officer..." 
            class="w-5/12">
              <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <div class="flex items-center">
            <el-button @click.prevent="fetchProfiles" icon="el-icon-refresh icon" class="text-xl mr-4" type="text"></el-button>
            <el-popover
              placement="left"
              trigger="hover"
              content="Add New Profile">
              <el-button type="primary" @click="open" icon="el-icon-plus" circle slot="reference"></el-button>
            </el-popover>          
          </div>
        </div>
      </div>
      
      <div class="h-full" v-if="error">
        <div class="flex flex-col justify-center items-center h-full">
          <p class="m-0 p-0">Unable to load this page</p>
          <el-button @click.prevent="fetchProfiles" icon="el-icon-refresh-right icon" size="medium" type="text">Retry</el-button>
        </div>
      </div>      
      <div v-else class="h-full">
        <div class="profiles-history flex">
          <el-table
              ref="multipleTable"
              v-loading="loading"
              :data="filteredProfiles"
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

              <el-table-column fixed="right" label="" width="120" prop="id">
                <template slot-scope="scope">
                  <el-button size="mini" @click="update(scope.row.id)" icon="el-icon-edit" circle></el-button>
                  <el-button size="mini" @click="handleDelete(scope.row.id)" icon="el-icon-delete" circle></el-button>
                </template>
              </el-table-column>            
          </el-table>
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

    <!-- Add and Edit Profile  -->
    <el-dialog top="7vh" :title="formTitle" :visible.sync="dialogFormVisible" custom-class="new-profile">
      <el-form :model="form" size="mini" label-width="200px" class="bg-gray-100 py-4 px-8">
        <el-form-item label="Officer Name">
          <el-input v-model="form.user.full_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Officer Registered Number">
          <el-input v-model="form.user.registered_no" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Designation">
          <el-input v-model="form.user.designation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Department">
          <el-select v-model="form.user.department_id" placeholder="Select a department" class="w-full">
            <el-option label="Accounts" value=1></el-option>
            <el-option label="Field" value=2></el-option>
            <el-option label="Corporate" value=3></el-option>
          </el-select>            
        </el-form-item>
        <el-form-item label="Phone Number">
          <el-input v-model="form.user.phone_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input type="textarea" v-model="form.user.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input type="email" v-model="form.user.email" autocomplete="off"></el-input>
        </el-form-item>        
        <el-form-item label="Region">
          <el-select v-model="form.user.region_id" placeholder="Please select a region" class="w-full">
            <el-option label="Greater Accra Region" value=1></el-option>
            <el-option label="Central Region" value=2></el-option>
            <el-option label="Volta Region" value=3></el-option>
            <el-option label="Eastern Region" value=4></el-option>
            <el-option label="Western Region" value="western"></el-option>
            <el-option label="Ashanti Region" value="ashanti"></el-option>
            <el-option label="Brong Ahafo Region" value="brong_ahafo"></el-option>
            <el-option label="Northern Region" value="northern"></el-option>
            <el-option label="Upper-East Region" value="upper_east"></el-option>
            <el-option label="Upper-West Region" value="uppwr_west"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="City/Town">
          <el-input v-model="form.user.city_town" autocomplete="off"></el-input>
        </el-form-item>          
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createProfile()" :loading="creating">{{create_update}}</el-button>
      </span>
    </el-dialog>   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      create_update: 'Create',
      search: "",
      dialogFormVisible: false,
      editedIndex: '-1',
      creating: false,
      form: {
        user: {
          full_name: "",
          registered_no: "",
          designation: "",
          department_id: "",
          phone_number: "",
          address: "",
          email: "",
          region_id: "",
          city_town: "",
          password: "password"
        }
      },
      formLabelWidth: '120px',       
      tableData: [
        {
          id: '1',
          date: '2016-05-03',
          officer_name: 'Kwame Boamah',
          address: 'No. 189, Grove St, Los Angeles',
          phone_number: '233545515678',
          designation: "Accra",
          department: "Operations",
          officer_registered_no: "YH47R",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city_town: "Accra"
        }, 
        {
          id: '2',
          date: '2016-05-02',
          officer_name: 'Caleb Kpabitey',
          address: 'No. 189, Grove St, Los Angeles',
          phone_number: '233232456784',
          designation: "Accra",
          department: "Operations",
          officer_registered_no: "YH47T",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city_town: "Accra"
        }, 
        {
          id: '3',
          date: '2016-05-04',
          officer_name: 'Malvin Arthur',
          address: 'No. 189, Grove St, Los Angeles',
          phone_number: '233273451091',
          designation: "Accra",
          department: "Operations",
          officer_registered_no: "JDU7S",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city_town: "Accra"
        }, 
        {
          id: '4',
          date: '2016-05-01',
          officer_name: 'Deborah Naa Bruce-GasKing ',
          address: 'No. 189, Grove St, Los Angeles',
          phone_number: '233032405385',
          designation: "Accra",
          department: "Operations",
          officer_registered_no: "SDF6Y7",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city_town: "Accra"
        }, 
        {
          id: '5',
          date: '2016-05-08',
          officer_name: 'Kweku Botchwey',
          address: 'No. 189, Grove St, Los Angeles',
          phone_number: '2335532245630',
          designation: "Accra",
          department: "Operations",
          officer_registered_no: "YH17R",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city_town: "Accra"
        }, 
        {
          id: '6',
          date: '2016-05-02',
          officer_name: 'Caleb Kpabitey',
          address: 'No. 189, Grove St, Los Angeles',
          phone_number: '233232456784',
          designation: "Accra",
          department: "Operations",
          officer_registered_no: "YH47T",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city_town: "Accra"
        }, 
        {
          id: '7',
          date: '2016-05-04',
          officer_name: 'Malvin Arthur',
          address: 'No. 189, Grove St, Los Angeles',
          phone_number: '233273451091',
          designation: "Accra",
          department: "Operations",
          officer_registered_no: "JDU7S",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city_town: "Accra"
        }, 
        {
          id: '8',
          date: '2016-05-02',
          officer_name: 'Caleb Kpabitey',
          address: 'No. 189, Grove St, Los Angeles',
          phone_number: '233232456784',
          designation: "Accra",
          department: "Operations",
          officer_registered_no: "YH47T",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city_town: "Accra"
        }, 
        {
          id: '9',
          date: '2016-05-04',
          officer_name: 'Malvin Arthur',
          address: 'No. 189, Grove St, Los Angeles',
          phone_number: '233273451091',
          designation: "Accra",
          department: "Operations",
          officer_registered_no: "JDU7S",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city_town: "Accra"
        },                 
        {
          id: '10',
          date: '2016-05-06',
          officer_name: 'Andy Awuku',
          address: 'No. 189, Grove St, Los Angeles',
          phone_number: '23343989086',
          designation: "Accra",
          department: "Operations",
          officer_registered_no: "POD83",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city_town: "Accra"
        }, 
        {
          id: '11',
          date: '2016-05-07',
          officer_name: 'Esiname Dzigbordi',
          address: 'No. 189, Grove St, Los Angeles',
          phone_number: '2335484937',
          designation: "Accra",
          department: "Operations",
          officer_registered_no: "37UFHY",
          address: "Accra",
          email: "junk@email.com",
          region: "Greater Accra",
          city_town: "Accra"
        }
      ],
      columns: [
        {label: 'Officer Name', dataField: 'full_name', width: 'auto'},
        {label: 'Address', dataField: 'address', width: 'auto'},
        {label: 'Registered No.', dataField: 'registered_no', width: '200'},
        {label: 'Department', dataField: 'department.name', width: 'auto'},
        {label: 'Region', dataField: 'region.name', width: 'auto'},
      ],
      multipleSelection: []      
    }
  },
  mounted() {
    console.log('State', this.state)
    console.log('loading', this.loading)
    this.$store.dispatch('getProfiles')
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
    open() {
      this.editedIndex = 1
      this.dialogFormVisible = true
    },
    createProfile() {
      this.creating = true;
      console.log('Mode: ', this.editedIndex)
      if(this.editedIndex == -1) {
        this.handleCreate()
      } else {
        this.handleEdit()
      }
    },
    close() {
      this.dialogFormVisible = false
      this.create_update = 'Create'
      this.editedIndex = -1
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    update(id) {
      this.editedIndex = 1
      this.create_update = 'Update'
      this.filteredProfiles.map(el => {
        if(el.id == id) this.form.user = el
        this.form.user.password = "password"
        this.form.user.department_id = el.department.id
        this.form.user.region_id = el.region.id
        delete this.form.user.region
        delete this.form.user.department
      })      
      this.dialogFormVisible = true
    },
    handleCreate() {
      this.$store.dispatch('createProfile', this.form)
      .then(response => {                          
        console.log('Response', response)
        this.$message({
          message: 'Officer Profile Created Successfully',
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
    },
    handleEdit() {
      this.$store.dispatch('updateProfile', this.form)
      .then(response => {                          
        console.log('Response', response)
        this.$message({
          message: 'Officer Profile was Updated Successfully',
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
    },
    handleDelete(id) {
      console.log(id)
      this.$confirm('Are you sure you want to delete this profile. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then((response) => {
        this.$store.dispatch('deleteProfile', id)
        .then(response => {                          
          console.log('Response', response)
          this.$message({
            message: 'Officer Profile was Deleted Successfully',
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        });          
      });      
    },    
    searchOfficer() {
      this.$store.dispatch('getProfiles', {cache: false, search: search})
    },   
    fetchProfiles() {
      this.$store.dispatch('getProfiles', {cache: false})
    }    
  },
  computed: {
    ...mapGetters({
      profiles: 'profiles',
      state: 'profilesState',
      Meta: 'profilesMeta'
    }),
    filteredProfiles () {
      return this.profiles
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
    formTitle() {
      return this.editedIndex == -1 ? 'New Profile' : 'Edit Profile'
    }    
  }
}
</script>

<style lang="scss" scoped>
  .profiles-history {
    height: 85%;
    overflow-x: hidden;
  }
</style>