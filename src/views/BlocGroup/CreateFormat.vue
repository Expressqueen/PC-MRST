<template>
    <div class="formatMask">
        <el-dialog title="业态信息" center :visible.sync="dialogFormVisible">
            <el-form :model="form" class="form">
                <el-form-item class="formItem" v-for="(item,index) in formatArr" :key="index">
                    <el-input v-model="item.name" @blur="inputBlur(item.name,item.id)"></el-input> <i @click="deleteItem(item.id)" class="el-icon-circle-close" style="float:right"></i>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-form>
                    <el-form-item>
                        <el-input v-model="createName" placeholder="输入业态名称创建"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="create()">立即创建</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { FormatList,InState,deleteInState } from "@/api/index";
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
                this.formatArr=res.data.data;
            })
        },
        //失焦编辑业态信息
        inputBlur(name,id){
            console.log(name)
            InState({
                name:name,
                id:id
            }).then(res=>{
                console.log('res1',res)
                this.getData();
            })
        },
        //删除
        deleteItem(id){
             this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    deleteInState({
                        id:id
                        }).then(res=>{
                        this.getData()
                    })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
            
        },
        //创建
        create(){
            this.dialogFormVisible=true;
            InState({
                name:this.createName
            }).then(res=>{
                this.getData();
                this.createName='';
            })
        }
    }
}
</script>
<style lang="scss" scope>
.formatMask{
    width:100%;
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
                    &:hover{
                        background:#F5F7FA;
                        cursor: pointer;
                    }
                    
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
        .delButton{
            width:0;
            height: 0;
            padding:0;
            
        }
}
}

    
</style>