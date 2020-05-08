<template>
  <div class="setpermission">
    <el-dialog title="权限设置" :visible.sync="Setpresion" width="960px" class="setpresion" :close-on-click-modal="false"> 
      <el-form label-position="top" label-width="80px" :model="getpersionform" ref="getpersionform">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="权限组名称" prop="name">
              <el-input v-model="getpersionform.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="权限组身份" prop="identity">
              <el-input v-model="getpersionform.identity"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否为部门负责人" prop="DepartHead">
              <el-select v-model="getpersionform.DepartHead">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="delgroup">
        <el-button type="primary" @click="SavePermis()" class="save">保存</el-button>
        <el-button type="danger" plain @click="delPression()">删除权限组</el-button>
        <span class="alertinfo">*删除该权限组后，拥有该权限组的项目成员将自动更改为「默认权限组」。</span>
      </p>
      <div class="permisgroup">
        <el-collapse>
          <el-collapse-item v-for="(item,index) in SetPermissionlist" :key="index" :name="index">
            <template slot="title">
              <el-checkbox v-model="item.checkAll" :indeterminate="item.isIndeterminate" @change="checkAllper($event,index)">{{item.conname}}</el-checkbox>
            </template>
            <el-checkbox-group v-model="item.checkedroles" @change="checkper($event,index)">
                <el-checkbox v-for="role in item.child" :label="role.id" :key="role.id" :value="role.id">{{role.conname}}</el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {ARoRuLi,PostARoRuLi} from '@/api/index'
export default {
  name: "setpermission",
  props: {
    isvibleSet: {
      type: Boolean
    }
  },
  data() {
    return {
      getpersionform: {
        name: "",
        identity: "",
        DepartHead:""
      },
      Setpresion:false,
      selectPid:0,
      SetPermissionlist: [
      ]
    };
  },
  mounted(){
  },
  methods: {
    //全选权限组操作
    checkAllper(val,index){
        this.SetPermissionlist[index].checkedroles=val?this.getCheckid(index):[];
        this.SetPermissionlist[index].isIndeterminate=false;
    },
    //权限选择
    checkper(value,index){
      let checkedCount = value.length;
      this.SetPermissionlist[index].checkAll=checkedCount==this.getCheckid(index).length;
      this.SetPermissionlist[index].isIndeterminate=checkedCount>0 && checkedCount < this.getCheckid(index).length;
    },
    //获取当前点击全选所有的数据
    getCheckid(index){
      let child=this.SetPermissionlist[index].child;
      let selectid=[]
      child.forEach(item => {
        selectid.push(item.id);
      });
      return selectid;
    },
    //获取当前所有选择的id
    getCheckAllid(){
      let Allid=[];
      this.SetPermissionlist.forEach(item=>{
        Allid=Allid.concat(item.checkedroles);
      })
      return Allid;
    },
    //删除权限组
    delPression() {
      var _this = this;
      this.$confirm("此操作将永久删除该权限组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.Setpresion=false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //保存权限组
    SavePermis(){
      let params={
        rolename:this.getpersionform.name,
        ident:this.getpersionform.identity,
        is_admin:this.getpersionform.DepartHead,
        pid:this.selectPid,
        rule_id:this.getCheckAllid()
      }
      PostARoRuLi(params).then(res=>{
        this.Setpresion=false;
        this.$parent.Createpresion=false;
      })
      
    }
  }
};
</script>
<style lang="scss">
.setpermission {
  .el-dialog__body {
    padding: 15px;
    height: calc(100% - 50px);
    overflow-y: scroll;
  }
  .el-dialog__footer {
    padding: 10px 30px 0;
  }
  .delgroup {
    margin: 10px 0;
    .alertinfo {
      margin-left: 10px;
    }
  }
  .permisgroup {
    .el-collapse-item {
      margin-top: 20px;
      border: 1px solid rgba(228, 231, 237, 1);
      border-bottom: none;
      border-radius: 4px;
      .el-collapse-item__header {
        padding: 0 20px;
        background: rgba(250, 250, 250, 1);
        border-radius: 4px;
        border-bottom: 1px solid rgba(228, 231, 237, 1);
      }
      .el-collapse-item__wrap {
        border-bottom: 0;
      }
      .el-collapse-item__content {
        padding: 20px;
      }
    }
    .el-collapse-item.is-active {
      border-bottom: 1px solid rgba(228, 231, 237, 1);
    }
  }
}
</style>