<template>
  <div class="PermissionGroup">
    <div class="pergroup">
      <div class="psghead clearfix">
        <span class="mark left">
          <i class="el-icon-key"></i>
          权限组
        </span>
      </div>
      <div class="persstable">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="id" v-if="show"></el-table-column>
          <el-table-column prop="rolename" label="名称"></el-table-column>
          <el-table-column prop="iden" label="身份"></el-table-column>
          <el-table-column prop="pid" label="pid" v-if="show"></el-table-column>
          <el-table-column prop="" label="操作" width="220">
            <template slot-scope="scope">
              <a href="javascript:void(0)" @click="Createper(scope.row)" class="temscope">
                    <i class="el-icon-s-tools"></i>
                    创建
              </a>
              <a href="javascript:void(0)" @click="Setper(scope.row)" class="temscope">
                <i class="el-icon-s-tools"></i>
                设置
              </a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 创建权限组 -->
    <el-dialog title="创建权限组" :visible.sync="Createpresion" width="420px" center>
      <el-form label-position="top" label-width="80px" :model="persionform" ref="persionform">
        <el-form-item
          label="权限组名称"
          prop="name"
          :rules="{required:true,message:'请输入权限组名称',trigger:'blur'}"
        >
          <el-input v-model="persionform.name"></el-input>
        </el-form-item>
        <el-form-item
          label="权限组身份"
          prop="identity"
          :rules="{required:true,message:'请输入权限组身份',trigger:'blur'}"
        >
          <el-input v-model="persionform.identity"></el-input>
        </el-form-item>
        <el-form-item
          label="是否为部门负责人"
          prop="DepartHead"
          :rules="{required:true,message:'请选择是否为部门负责人',trigger:'blur'}"
        >
          <el-select v-model="persionform.DepartHead" placeholder="请选择是否为部门负责人">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="CreateSetpres()">创建并配置</el-button>
      </span>
    </el-dialog>
    <!-- 权限设置 -->
    <SetPermission ref='Setpermisson'></SetPermission>
  </div>
</template>
<script>
import SetPermission from "@/views/PermissionGroup/SetPermission";
import {ARoLi,ARoRuLi,PostARoRuLi} from '@/api/index'
export default {
  name: "PermissionGroup",
  components: { SetPermission },
  data() {
    return {
      tableData: [],
      Createpresion: false,
      selectPid:0,
      persionform: {
        name: "",
        identity: "",
        DepartHead:""
      },
      Setpresion: true,
      show:false
    };
  },
  mounted(){
    this.getRolelist();
  },
  methods: {
    //获取权限组列表
    getRolelist(){
      ARoLi().then(res=>{
        if(res.data.code==0){
          this.tableData=res.data.data;
        }else{
          this.$message({
            type:"error",
            message:res.data.msg
          })
        }
      })
    },
    //创建权限组
    CreateSetpres() {
      this.$refs["persionform"].validate(valid => {
        if (valid) {
          debugger
          // let params = {};
          // params.rolename = this.persionform.name;
          // params.ident = this.persionform.identity;
          // params.is_admin=this.persionform.DepartHead;
          // params.pid=this.selectPid;
          
          this.$refs["Setpermisson"].getpersionform.name=this.persionform.name;
          this.$refs["Setpermisson"].getpersionform.identity=this.persionform.identity;
          this.$refs["Setpermisson"].getpersionform.DepartHead=this.persionform.DepartHead;
          this.$refs["Setpermisson"].getpersionform.selectPid=this.selectPid;
          //获取权限
          ARoRuLi({role_id:this.selectPid}).then(res=>{
            this.$refs["Setpermisson"].Setpresion=true;
            debugger
          })
          // this.tableData.push(newpresion);
          // this.Createpresion = false;
          // this.$message({
          //   message: "创建权限组成功",
          //   type: "success"
          // });
        } else {
          return false;
        }
      });
    },
    //创建权限组
    Createper(row){
        this.Createpresion=true;
        this.selectPid=row.id;
    },
    //设置权限组
    Setper(row) {
      this.$refs['Setpermisson'].Setpresion = true;
      this.$refs['Setpermisson'].getpersionform.name=row.rolename;
      this.$refs['Setpermisson'].getpersionform.identity=row.iden;
    },
    //关闭权限设置页面
    CloseSetpresion(setvalue) {
      this.Setpresion = setvalue;
    }
  }
};
</script>
<style lang="scss">
.PermissionGroup {
  width: 960px;
  margin: 0 auto;
  padding: 40px 0;
  height: calc(100vh - 56px);
  .temscope{
    color: #096DD9;
  }
  .pergroup {
    height: 100%;
    padding: 20px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(9, 109, 217, 0.1);
    border-radius: 4px;
    overflow-y: scroll;
    .psghead {
      border-bottom: 1px solid #f4f5f7;
      padding: 10px;
      .mark {
        font-size: 16px;
        font-weight: bold;
        color: #333333;
        i {
          font-weight: bold;
        }
      }
    }
    .persstable {
      margin-top: 10px;
      .temscope{
          color: #096DD9;
          margin-right: 40px;
      }
      .el-table__row.el-table__row--striped td{
          background-color:#F8FBFF;
      }
    }
  }
  .el-dialog--center .el-dialog__body {
    padding: 20px 15px;
  }
  .el-button.el-button--primary {
    background-color: #096dd9;
  }
  .el-form--label-top .el-form-item__label {
    padding: 0;
    line-height: 32px;
    color: #666666;
    font-weight: 400;
  }
  .setpresion {
    .el-dialog {
      height: 80%;
      margin-top: 8% !important;
    }
  }
}
</style>