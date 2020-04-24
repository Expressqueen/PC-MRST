<template>
    <div class="organizational">
        <div class='leftbar left'>
            <el-input
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="search">
            </el-input>
            <div class="title">
                <p class="titlename left">乐播新瑞(北京)文化传媒有限公司
                    <i class="el-icon-caret-bottom"></i>
                </p>
                <span class="setname right">
                    <i class="el-icon-setting"></i>
                </span>
            </div>
            <ul class="departlist clearfix">
                <li v-for="(item,index) in departlist" :key="index" @click="selectedbar($event,index)" :class="{selectedli:index==current}">
                    {{item.title}}
                </li>
            </ul>
        </div>
        <div class='rightbar right'>这是我右侧的菜单

        </div>
    </div>
</template>
<script>
export default {
    name:"organizational",
    data(){
        return{
            search:"",
            current:0,
            departlist:[
                {title:"第一事业部",value:"1"},
                {title:"第二事业部",value:"2"},
                {title:"门店部",value:"3"},
                {title:"研发部",value:"4"}
            ],
            selectdepartlist:''
        }
    },
    methods:{
        selectedbar(obj,index){
            debugger
            this.current=index
            
        }
    }
}
</script>
<style lang="sass">
  @import './organizational.scss'
</style>
