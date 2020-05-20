<template>
    <div class="Shoplist">
        <div class="clearfix">
            <el-input
            placeholder="输入名称/编码搜索"
            prefix-icon="el-icon-search"
            v-model="SearchStore"
            class="SearchStore"
            ></el-input>
        </div>
        <el-table :data="shoplistdata" style="width: 100%">
            <el-table-column type="selection" width="55" v-if="show"></el-table-column>
            <el-table-column prop="name" label="名称" width="180"></el-table-column>
            <el-table-column prop="code" label="编码" width="180"></el-table-column>
            <el-table-column prop="create_time" label="开网日期"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="reg" label="操作" width="150" v-if="show">
                <template slot-scope="scope">
                    <el-link type="primary" :underline="false" @click="SetStore(scope.row)">设置</el-link>
                    <el-link type="danger" :underline="false" @click="Delevel(scope.row)">删除</el-link>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
          title="门店设置"
          :visible.sync="SetStoredialog"

          width="960">
           <el-tabs tab-position="left" style="height: 200px;">
              <el-tab-pane label="基础信息">
                <el-form
                  :model="BasicShop"
                  label-position="right"
                  label-width="100px"
                  class="permisform"
                  ref="BasicShop"
                  :rules="BasicShoprule"
                >
                  <el-form-item label="门店名称" prop="name">
                    <el-input v-model="BasicShop.name" autocomplete="off" placeholder="请输入门店名称"></el-input>
                  </el-form-item>
                  <el-form-item label="门店编码" prop="code">
                    <el-input v-model="BasicShop.code" autocomplete="off" placeholder="请输入门店编码"></el-input>
                  </el-form-item>
                  <el-form-item label="开网日期" prop="create_time">
                    <el-date-picker
                      v-model="BasicShop.create_time"
                        type="date"
                        placeholder="请选择开网日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="店长" prop="person">
                    <el-input v-model="BasicShop.person" autocomplete="off" placeholder="请输入店长姓名"></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="BasicShop.phone" autocomplete="off" placeholder="请输入联系电话"></el-input>
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
                    <el-input v-model="BasicShop.address" autocomplete="off" placeholder="请输入详细地址"></el-input>
                  </el-form-item>
                  <el-form-item label="备注" prop="mark">
                    <el-input v-model="BasicShop.mark" type="textarea" autocomplete="off" placeholder="请输入备注"></el-input>
                  </el-form-item>
                  <el-form-item label>
                    <el-button type="primary" @click="SaveStoreshop">保存</el-button>
                    <el-button>重置</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="高级设置">配置管理</el-tab-pane>
              <el-tab-pane label="开闭店设置">角色管理</el-tab-pane>
              <el-tab-pane label="设备入库">定时任务补偿</el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>
<script>
  import {GetAreaData} from '@/api/Area.js'
  import {Storeinfo,StoreAddEdit} from '@/api/index'
export default {
    props:{
        show:{
            type:Boolean
        }
    },
    data(){
        return{
            SearchStore: "",
            shoplistdata: [],
            SetStoredialog:false,
            Region:[],
            Regionvalue:[],
            propsShop:{
              label:'label',
              value:'label',
              children:'children'
            },
            BasicShop:{
              name:"",
              code:"",
              create_time:"",
              person:"",
              phone:"",
              province:"",  //省市()
              city:"",      //市
              district:"",  //区
              address:"",
              mark:""
            },
            BasicShoprule:{
              name:[{required:true,message:"请输入门店名称",trigger:'blur'}],
              code:[{required:true,message:"请输入门店编码",trigger:'blur'}],
              person:[{required:true,message:"请输入店长姓名",trigger:'blur'}],
              phone:[{required:true,message:"请输入联系电话",trigger:'blur'}]
            }
        }
    },
    mounted() {
      this.getarea()
    },
    methods:{
      SetStore(row){
        this.SetStoredialog=true;
        this.BasicShop=row;
        this.Regionvalue=[this.BasicShop.province,this.BasicShop.city,this.BasicShop.district];
      },
      //获取所有的省市区
      getarea(){
        this.Region=GetAreaData().data;
      },
      //地区选择
      RegionChange(value){
        let selectArea=this.$refs.BasicShopRegion.getCheckedNodes()[0].pathLabels;
        this.BasicShop.province=selectArea[0];
        this.BasicShop.city=selectArea[1];
        this.BasicShop.district=selectArea[2];
      },
      //保存门店信息
      SaveStoreshop(are_id){
        let params={
          id:this.BasicShop.id,
          cyid:this.BasicShop.cy_id,
          instateid:this.BasicShop.instate_id,
          areid:this.BasicShop.are_id,
          name:this.BasicShop.name,
          code:this.BasicShop.code,
          startdate:this.BasicShop.create_time,
          person:this.BasicShop.person,
          phone:this.BasicShop.phone,
          province:this.BasicShop.province,
          city:this.BasicShop.city,
          district:this.BasicShop.district,
          mark:this.BasicShop.mark
        }
        StoreAddEdit(params).then(res=>{
          this.$message.success("门店设置成功");
          this.SetStoredialog=false;
        })
      }
    }
}
</script>
<style lang="scss" scope>
.Shoplist{
    background: #fff;
    height: calc(100vh - 230px);
    padding: 30px 30px 0 30px;
    .clearfix {
      margin-bottom: 20px;
      .SearchStore {
        width: 320px;
      }
    }
    .el-table{
        height:calc(100% - 90px);
        .el-table__body-wrapper{
            height: calc(100% - 48px);
            overflow-y: auto;
        }
    }
    .el-table tr{
        th{
            background: #F5F7FA;
        }
    }
    .el-link{
        margin-right:30px;
    }
    .el-dialog{
      margin-top: 10vh!important;
      .el-tabs{
        height: -webkit-fill-available!important;
      }
      .el-tabs--left .el-tabs__item.is-left {
        text-align: center;
      }
      .el-dialog__body {
        padding: 0;
        .el-tabs--left .el-tabs__header.is-left {
          width: 180px;
        }
        .el-tabs__item {
          height: 56px;
          line-height: 56px;
          border-bottom: 1px solid #e4e7ed;
        }
        .el-tabs__content{
          height: inherit;
        }
      }
      .permisform{
        width: 505px;
        margin: 0 auto;
        margin-top: 40px;
        .el-form-item__label {
            color: #666666;
            font-weight: 400;
            padding: 0 20px 0 0;
        }
        .el-cascader{
          width: 100%;
        }
      }
    }
}
</style>
