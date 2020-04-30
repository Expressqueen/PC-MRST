<template>
  <div class="PermissionGroup">
    <div class="pergroup">
      <div class="psghead clearfix">
        <span class="mark left">
          <i class="el-icon-key"></i>
          权限组
        </span>
        <div class="setname right el-dropdown"></div>
      </div>
      <div class="persstable">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="describe" label="描述"></el-table-column>
          <el-table-column prop="address" label="操作" width="260">
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
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="CreateSetpres()">创建并配置</el-button>
      </span>
    </el-dialog>
    <!-- 权限设置 -->
    <SetPermission @CloseSet="CloseSetpresion" ref='Setpermisson' :isvibleSet="Setpresion"></SetPermission>
    <!-- <el-dialog title="权限设置" :visible.sync="Setpresion" width="960px" class="setpresion">
      
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="CreateSetpres()">创建并配置</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>
<script>
import SetPermission from "@/views/PermissionGroup/SetPermission";
export default {
  name: "PermissionGroup",
  components: { SetPermission },
  data() {
    return {
      tableData: [
        {
          name: "乐播新瑞(北京)文化传媒有限公司",
          describe: "超级管理员"
        },
        {
          name: "研发部",
          describe: "王小虎"
        },
        {
          name: "后台",
          describe: "王小虎"
        },
        {
          name: "后端成员",
          describe: "王小虎"
        }
      ],
      Createpresion: false,
      persionform: {
        name: "",
        identity: "",
        DepartHead:""
      },
      Setpresion: true
    };
  },
  methods: {
    CreateSetpres() {
      this.$refs["persionform"].validate(valid => {
        if (valid) {
          var newpresion = {};
          newpresion.name = this.persionform.name;
          newpresion.describe = this.persionform.identity;
          this.tableData.push(newpresion);
          this.Createpresion = false;
          this.$message({
            message: "创建权限组成功",
            type: "success"
          });
        } else {
          return false;
        }
      });
    },
    Createper(row){
        this.Createpresion=true;
    },
    Setper(row) {
      this.Setpresion = true;
      this.$refs['Setpermisson'].getpersionform.name=row.name;
      this.$refs['Setpermisson'].getpersionform.identity=row.describe;
    },
    //关闭权限设置页面
    CloseSetpresion() {
      this.Setpresion = false;
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
  .pergroup {
    height: 100%;
    padding: 20px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(9, 109, 217, 0.1);
    border-radius: 4px;
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