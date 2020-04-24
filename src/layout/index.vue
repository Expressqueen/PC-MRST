<template>
    <div class="Layout">
        <head-bar/>
        <router-view />
    </div>
</template>
<script>
import HeadBar from '@/layout/Headbar'
export default {
    name:"Layout",
    components:{
        HeadBar
    } 
}
</script>
