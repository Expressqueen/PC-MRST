<template>
    <div class="CreateStore">
        <el-dialog title="创建门店" :visible.sync="storemask">
            <el-form
                :model="BasicShop"
                label-position="right"
                label-width="100px"
                class="storeform"
                >
                <el-form-item label="门店名称" prop="name">
                    <el-input v-model="BasicShop.name" autocomplete="off" placeholder="中文名称"></el-input>
                </el-form-item>
                <el-form-item label="门店编码" prop="code">
                    <el-input v-model="BasicShop.code" autocomplete="off" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="开网日期" prop="startdate">
                    <el-date-picker
                        v-model="BasicShop.startdate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="店长" prop="person">
                    <el-input v-model="BasicShop.person" autocomplete="off" placeholder="输入联系人姓名"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="BasicShop.phone" autocomplete="off" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="所属地区" prop="Regionvalue">
                    <el-cascader
                        v-model="Regionvalue"
                        :options="Region"
                        ref="BasicShopRegion"
                        :props="propsShop"
                        @change="RegionChange"></el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
                    <el-input v-model="BasicShop.address" autocomplete="off" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="选择分区" prop="areid">
                    <el-input v-model="BasicShop.areid" autocomplete="off" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="mark">
                    <el-input v-model="BasicShop.mark" type="textarea" autocomplete="off" placeholder="请输入备注"></el-input>
                  </el-form-item>
                <el-form-item label>
                    <el-button type="primary" @click="CreateStoreshop">立即创建</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import {GetAreaData} from '@/api/Area'
import {StoreAddEdit} from '@/api/index'
export default {
    name:'createStore',
    data(){
        return{
            storemask:true,
            value1:"",
            Region:[],
            Regionvalue:[],
            cyid:"",  //集团id
            instateid:"",  //业态id
            propsShop:{
              label:'label',
              value:'label',
              children:'children'
            },
            BasicShop:{
              name:"",
              areid:"",
              code:"",
              startdate:"",
              person:"",
              phone:"",
              province:"",  //省市()
              city:"",      //市
              district:"",  //区
              address:"",
              mark:""
            },
            
        }
    },
    mounted(){
      //获取所有省市区
      this.Region=GetAreaData().data;
    },
    methods:{
      //地区选择
      RegionChange(value){
        let selectArea=this.$refs.BasicShopRegion.getCheckedNodes()[0].pathLabels;
        this.BasicShop.province=selectArea[0];
        this.BasicShop.city=selectArea[1];
        this.BasicShop.district=selectArea[2];
      },
      //创建门店
      CreateStoreshop(are_id){
        debugger
        let params=this.BasicShop;
        params.cyid=Number(this.cyid);
        params.instateid=this.instateid;
        StoreAddEdit(params).then(res=>{
          debugger
          this.$message.success("门店创建成功");
          this.SetStoredialog=false;
        }).catch(err=>{
          debugger
        })
      }
    }
}
</script>
<style lang="scss" scope>
.CreateStore{
  .el-dialog{
    margin-top: 10vh!important;
  }
  .storeform {
    width: 505px;
    margin: 0 auto;
    margin-top: 40px;
    .el-cascader{
      width: 100%;
    }
  }
}
    
</style>