<template>
    <div class="p-4 w-1/2 mx-auto h-screen">
        <div class="flex justify-center items-center my-8">
            <h2>WELCOME TO MTTU </h2>
            <img src="@/assets/images/logo.jpeg" class="w-16" alt="">
        </div>
        <div class="w-full max-w-md mx-auto">
            <el-form :model="form" :rules="rules" ref="ruleForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <el-form-item label="Officer Name/Number">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>

                <el-form-item class="flex justify-center">
                    <el-button type="primary" @click="submitForm('ruleForm')">LOG IN</el-button>
                    <p class="mt-2">
                        <router-link to="/resetEmail">Forgot Password?</router-link>
                    </p>
                </el-form-item>
            </el-form>
            <p class="text-center text-gray-500 text-xs">
                &copy;2019 Motto and Transport Unit
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                password: '',
            },
            rules: {
                name: [
                    { required: true, message: 'Please input Name or Number', trigger: 'blur' },
                    { min: 5, message: "Length should'nt be less than 5", trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Please provide password', trigger: 'blur' }
                ],
            }            
        }
    },
    methods: {
        submitForm(formName) {
            setTimeout(() => {
                this.$router.push('/home')
            this.$message({
                message: 'Login Success',
                type: 'success'
            });                
            }, 2000);
        }
    }
}
</script>

<style>

</style>