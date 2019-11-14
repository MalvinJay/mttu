<template>
    <div class="flex flex-col items-center pt-4">
        <h1> ADMINISTRATOR PORTAL </h1>

        <div class="flex justify-between w-full py-2">
            <!-- <img src="@/assets/images/logo.png" class="w-10" alt=""> -->
            <div></div>
            
            <div></div>
            
            <div class="flex items-center">
                <span class="pr-1">Welcome |</span>
                <h2 class="font-bold text-xl">Kwame Boama</h2>
            </div>

            <div class="flex items-center">
                <span class="pr-4">Search</span>
                <el-input v-model="search" placeholder="Search..."></el-input>
            </div>
        </div>


    </div>
</template>

<script>
export default {
    data() {
        return {
            search: ""
        }
    }
}
</script>

<style>

</style>