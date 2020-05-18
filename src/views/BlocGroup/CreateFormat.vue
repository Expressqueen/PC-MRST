<template>
    <div class="formatMask">
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form" class="form">
                <el-form-item class="formItem" v-for="(item,index) in formatArr" :key="index">
                    <el-input v-model="item.name"></el-input><i class="el-icon-circle-close" style="float:right"></i>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-form>
                    <el-form-item>
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="dialogFormVisible = false">立即创建</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {FormatList} from "@/api/index";
export default {
    data(){
        return{
            dialogFormVisible:false,
            formatArr:[],
            createName:'',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
                },
            formLabelWidth: ''
        }
    },
    props:{
        value:{}
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            FormatList().then(res=>{
                console.log('er',res.data.data)
                this.formatArr=res.data.data;
            })
        }
    }
}
</script>
<style lang="scss" scope>
.formatMask{
    // width:100%;
    // height: 100%;
    .el-dialog{
        margin-top:280px!important;
        height: auto;
        width:320px;
        .el-dialog__body{
            padding:10px;
            height:220px;
            .form{
                height:100%;
                overflow: auto;
                .formItem{
                position: relative;
                margin-bottom:0;
                .el-input__inner{
                    border:0;
                    outline: none;
                    background:#F5F7FA;
                }
                i{
                    position: absolute;
                    right:10px;
                    top:14px;
                }
        }
        }
            .el-dialog__footer{
                padding:0 20px 10px;
                
            }
        }
        .el-button{
            background:#096DD9;
        }
        
}
}

    
</style>