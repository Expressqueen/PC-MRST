<template>
  <div class="setpermission">
    <el-dialog title="权限设置" :visible.sync="Setpresion" width="960px" class="setpresion" @close="CreateSetpres()"> 
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
            <el-button type="primary" @click="CreateSetpres()" class="save">保存</el-button>
          </el-col>
        </el-row>
      </el-form>
      <p class="delgroup">
        <button type="button" class="danger" @click="delPression()">删除权限组</button>
        <span class="alertinfo">*删除该权限组后，拥有该权限组的项目成员将自动更改为「默认权限组」。</span>
      </p>
      <div class="permisgroup">
        <el-collapse>
          <el-collapse-item v-for="(item,index) in SetPermissionlist" :key="index" :name="index">
            <template slot="title">
              <el-checkbox
                :indeterminate="item.isIndeterminate"
                v-model="item.checkAll"
                @change="handleCheckAllChange($event,index)"
              >{{item.Persionname}}</el-checkbox>
            </template>
            <el-checkbox-group v-model="item.checkedroles" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="role in item.roles" :label="role" :key="role">{{role}}</el-checkbox>
              </el-checkbox-group>
          </el-collapse-item>
        </el-collapse>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="CreateSetpres()">创建并配置</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
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
        identity: ""
      },
      Setpresion:false,
    //   checkAll: false,
    //   checkedCities: ["上海", "北京"],
    //   cities: ["上海", "北京", "广州", "深圳"],
    //   isIndeterminate: true,
      SetPermissionlist: [
        {
          Persionname: "组织架构",
          checkAll: false,
          checkedroles: ["上海", "北京"],
          roles: ["上海", "北京", "广州", "深圳"],
          isIndeterminate: true
        },
        {
          Persionname: "节目列表",
          checkAll: false,
          checkedroles: ["管理员"],
          roles: ["管理员", "成员", "部门经理", "人事经理"],
          isIndeterminate: true
        }
      ]
    };
  },
  methods: {
    handleCheckAllChange(val,index) {
        debugger
      this.SetPermissionlist[index].checkedroles=val?this.SetPermissionlist[index].roles:[];
      this.SetPermissionlist[index].isIndeterminate=false;
    //   this.checkedCities = val ? this.cities : [];
    //   this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
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
          _this.$emit("CloseSet");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    CreateSetpres(){
      this.Setpresion=false;
    }
  }
};
</script>
<style lang="scss">
.setpermission {
  .el-dialog__body {
    padding: 15px;
    height: calc(100% - 120px);
    overflow-y: scroll;
  }
  .el-dialog__footer {
    padding: 10px 30px 0;
  }
  .save {
    margin-top: 32px;
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