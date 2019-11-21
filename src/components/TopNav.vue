<template>
    <div class="flex flex-col items-center pt-4">
        <h1> ADMINISTRATOR PORTAL </h1>

        <div class="flex justify-between w-full py-2">
            <!-- <img src="@/assets/images/logo.png" class="w-10" alt=""> -->
            <div></div>
            
            <div></div>
            
            <div class="flex items-center ml-20">
                <span class="pr-1">Welcome |</span>
                <h2 class="font-bold text-xl">{{officer.full_name}}</h2>
            </div>
            <div></div>

            <div class="flex items-center cursor-pointer" @click="logout">
                <span class="pr-2">logout</span>
                <el-button type="text" icon="el-icon-s-promotion"></el-button>
            </div>
        </div>


    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            search: ""
        }
    },
    methods: {
        logout() {
            localStorage.clear()
            this.$router.push('login')         
        }
    },
    computed: {
        ...mapGetters({
            user: 'user'
        }),
        officer() {
            return JSON.parse(this.user);
        }
    }
}
</script>

<style>

</style>