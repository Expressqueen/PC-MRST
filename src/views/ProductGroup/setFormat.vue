<template>
        <el-dialog title="业态产品设置" :visible.sync="maskDialog" class="dialog">
            <el-form :model="form">
                <ul>
                    <li v-for="(item,index) in goodData" :key="index">
                        <p><img :src="item.image" alt=""> <span>{{item.name}}</span></p>
                        <div class="formatSet">
                            <div class="series" v-for="(itm,ind) in item.children" :key="ind">
                                <el-checkbox
                                    v-model="itm.checked"
                                    name="type"
                                    :value="itm.id"
                                    @change="getChecked(itm,$event)"
                                >{{itm.intro}}</el-checkbox>
                                <el-form-item label="集团运营部门">
                                    <el-popover placement="bottom-start" width="390" trigger="click" :ref="`popover`" @show="showDown(itm)">
                                        <div slot="reference" class="likeinput clearfix">
                                            <el-tag
                                                v-for="tag in itm.tagArr"
                                                :key="tag.id"
                                                closable
                                                size="mini"
                                                @close="tagClose(tag,itm)">
                                                {{tag.depname}}
                                            </el-tag>
                                            <i slot="suffix" class="el-icon-caret-top right"></i>
                                        </div>
                                        <div class="droplist">
                                            <ul class="el-scrollbar__view el-select-dropdown__list">
                                                <li v-for="(e,i) in divisionArr" :key="i" 
                                                :class="[{selected:e.checked},'el-select-dropdown__item']"
                                                @click="Selectformat(e)">
                                                    {{e.depname}}
                                                    <i class="el-icon-check right" v-show="e.checked"></i>
                                                </li>
                                            </ul>
                                            <el-row style="padding:0 10px;text-align:right">
                                                <el-button type="primary" size="small" @click="showformat(itm)">确定</el-button>
                                                <el-button size="small" @click="cancleformat(itm)">取消</el-button>
                                            </el-row>
                                        </div>  
                                    </el-popover>
                                </el-form-item>
                            </div>
                        </div>
                    </li>
                    <el-form-item>
                        <el-button type="primary"  @click="preserve" class="button">保存</el-button>
                    </el-form-item>
                </ul>
                
            </el-form>
            
        </el-dialog>
</template>
<script>
import {GoodsList,AJuDeps,GoodsIns} from '@/api/index';
export default {
    name:"setFormat",
    data(){
        return{
            maskDialog:false,
            goodData:[],
            goods: [],
            divisionArr:[],
            tagArrs:[],
            arr:[],
            checkedNames: [],
            form: {
            name: '',
            region: '',
            type:'',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
            },
            formLabelWidth: '120px',
            GroupId:0,
            productId:0,
            goodlist:[],
            defaultList:[],
            defaultDepidList:[],
            defaultDepList:[]
        }
    },
    mounted(){
       console.log(this.goodlist)
    },
    methods:{
        getGood(){  
            this.$parent.goodlist.map(i=>{
                if(i.children.length){
                    i.children.map(j=>{
                        this.defaultList.push(j.id);
                        this.defaultDepidList=j.depid.split(",")
                    })
                }
                    
            })

            //获取部门数据
            AJuDeps().then(res=>{
                res.data.data.FirstList.map(v=>{
                    v.checked = false
                })
                res.data.data.FirstList.map((v,i)=>{
                    var arr = this.defaultDepidList.filter(e=> parseInt(e) == v.id);
                    if(arr.length){
                        this.defaultDepList.push(v)
                    }
                })
                this.divisionArr=res.data.data.FirstList;
            })
            
            //获取产品数据
            GoodsList().then(res=>{
                res.data.data.map(v=>{
                    v.children.map(e=>{
                        e.checked = this.defaultList.indexOf(e.id) == -1 ? false : true;
                        e.tagArr = this.defaultList.indexOf(e.id) == -1 ? [] : this.defaultDepList
                    })
                })
                this.goodData=res.data.data;
            })
            
        },
        getDivision(){
            
        },
        //便签去重
        unique(arr){            
            for(var i=0; i<arr.length; i++){
                for(var j=i+1; j<arr.length; j++){
                    if(arr[i].id==arr[j].id){         //第一个等同于第二个，splice方法删除第二个
                        arr.splice(j,1);
                        j--;
                    }
                }
            }
            return arr;
        },
        //选择集团部门
        Selectformat(e){
            e.checked = !e.checked
            if(e.checked){
                this.tagArrs.push(e)
                this.unique(this.tagArrs)
            } else {
                this.tagArrs.map((v,i)=>{
                    if(v.id === e.id){
                        this.tagArrs.splice(i,1) 
                    }
                })
            }
        },
        //删除标签
        tagClose(tag,itm){
            itm.tagArr.map((v,i)=>{
                if(v.id === tag.id){
                    itm.tagArr.splice(i,1) 
                }
            })
        },
        //展示被选中的
        showDown(itm){
            this.divisionArr.map(v=>v.checked = false)
            this.divisionArr.map(v=>{
                itm.tagArr.map(e=>{
                    if(e.id == v.id){
                        v.checked = true
                    }
                })
            })
        },
        //确定添加
        showformat(itm){
            this.$confirm('是否确定选择这些业态?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(()=>{
                    itm.tagArr = []
                    this.divisionArr.map(v=>{
                        if(v.checked){
                            itm.tagArr.push(v)
                        }
                    })
                }).catch(()=>{

                })
        },
        //取消添加
        cancleformat(itm){
            this.$confirm('是否取消选择这些业态?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                // itm.tagArr= []
                // this.tagArrs.map(v=>v.checked = false)
                itm.tagArr = []
                this.divisionArr.map(v=>{
                    if(v.checked){
                        itm.tagArr.push(v)
                    }
                })
                this.$message({
                    type: 'success',
                    message: '已取消业态选择!'
                });
                this.$refs[`popover`].doClose();
            }).catch(() => {
                itm.tagArr = []
                this.$message({
                    type: 'info',
                    message: '已取消修改选择业态'
                });
            });
        },
        getChecked(itm,value){
            itm.checked = value;
        },
        preserve(){
            this.goodData.map((v,i)=>{
                if(v.children.length){
                    v.children.map((it,ind)=>{
                        if(it.checked){
                            var obj = {
                                goodsid: it.id,
                                depid: [],
                            } 
                            it.tagArr.map((item,index)=>{
                                obj.depid.push(item.id)
                            })
                            this.goods.push(obj)
                        }
                    })
                }
            })
            GoodsIns({
                instateid: this.productId,
                goods: this.goods,
                cyid:this.GroupId
            }).then(res=>{
                this.maskDialog = false;
            })
            console.log(this.goods,this.productId)
        }
    }
}
</script>
<style lang="scss" scope>
    .el-dialog{
        width: 960px;
        height: 80%;
        .el-dialog__body{
            padding:0 20px;
            height: calc(100% - 50px);
        }
        .el-form{
            width: 100%;
            height:100%;
            ul{
                margin-left:20px;  
                overflow: auto;  
                height: calc(100% - 50px);
                position: relative;
                li{
                    border-bottom: solid 1px rgba(0,0,0,.1);
                    display: flex;
                    padding-bottom: 40px;
                    margin-top:40px;
                    p{
                        width:160px;
                        height:120px;
                        border:solid 1px #ccc;
                        position: relative;
                        img{
                            width:100%;
                            height: 100%;
                        }
                        span{
                            display: block;
                            width:100%;
                            height: 32px;
                            position: absolute;
                            bottom:0;
                            left:0;
                            background: rgba(0,0,0,.5);
                            text-align: center;
                            line-height: 32px;
                            color: #F5F5F5;
                        }
                    }
                    .formatSet{
                        height: 100%;
                        flex:1;
                        margin-left:40px;
                        .series{
                            .el-popover.el-popper{
                                padding: 0;
                                .droplist{
                                    ul{
                                        padding: 0;
                                        height: 200px;
                                        overflow-y: auto;
                                        li{
                                            i{
                                                line-height: 34px;
                                            }
                                        }
                                    }
                                    .el-row{
                                        margin: 10px 0;
                                        padding: 0 10px;
                                        text-align: right;
                                    }
                                }
                            }
                            .el-form-item__content{
                                margin-top:40px;
                            }
                        }
                        .likeinput{
                            border: 1px solid #DCDFE6;
                            border-radius: 4px;
                            padding: 0 10px;
                            width:390px;
                            height: auto;
                            line-height: 40px;
                            overflow: hidden;
                            i.el-icon-caret-top{
                                line-height: 40px;
                            }
                            .el-tag{
                                margin-right: 10px;
                            }
                        }
                    }
                    &:last-child{
                        border-bottom: 0;
                    }
                }
               
                .button{
                    position:absolute;
                    top:50px;
                    left:50%;
                    transform: translateX(-50%);
                    padding:10px 30px;
                } 
            }
            
        }
    }


    
</style>