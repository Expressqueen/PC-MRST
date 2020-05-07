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
        <el-button type="primary" @click="CreateSetpres()" class="save">保存</el-button>
        <el-button type="danger" plain @click="delPression()">删除权限组</el-button>
        <!-- <button type="button" class="danger" @click="delPression()">删除权限组</button> -->
        <span class="alertinfo">*删除该权限组后，拥有该权限组的项目成员将自动更改为「默认权限组」。</span>
      </p>
      <!-- <div class="permisgroup">
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
      </div> -->
      <div class="permisgroup">
        <el-collapse>
          <el-collapse-item v-for="(item,index) in SetPermissionlist" :key="index" :name="index">
            <template slot="title">
              <el-checkbox v-model="item.checkAll" :indeterminate="item.isIndeterminate" @change="checkAllper($event,index)">{{item.conname}}</el-checkbox>
            </template>
            <el-checkbox-group v-model="item.checkedroles">
                <el-checkbox v-for="role in item.child" :label="role.id" :key="role.id" :value="role.id">{{role.conname}}</el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {ARoRuLi} from '@/api/index'
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
        // {
        //   Persionname: "组织架构",
        //   checkAll: false,
        //   checkedroles: ["上海", "北京"],
        //   roles: ["上海", "北京", "广州", "深圳"],
        //   isIndeterminate: true
        // },
        // {
        //   Persionname: "节目列表",
        //   checkAll: false,
        //   checkedroles: ["管理员"],
        //   roles: ["管理员", "成员", "部门经理", "人事经理"],
        //   isIndeterminate: true
        // }
      ],
      realdata:[
        {
            "id": 1,
            "conname": "组织架构",
            "pid": 0,
            checkedroles:[3,5], //选中的权限id
            checkAll: false, //是否全选
            isIndeterminate:false, //记录选中状态（如果有一个选中就为true）
            "child": [
                {
                    "id": 3,
                    "conname": "组织创建",
                    "pid": 1
                },
                {
                    "id": 4,
                    "conname": "组织成员列表+搜索",
                    "pid": 1
                },
                {
                    "id": 5,
                    "conname": "组织成员邀请码",
                    "pid": 1
                },
                {
                    "id": 2,
                    "conname": "组织架构查询",
                    "pid": 1
                }
            ]
        },
        {
            "id": 6,
            "conname": "角色",
            "pid": 0,
            checkedroles:[],
            checkAll: false,
            isIndeterminate:false,
            "child": [
                {
                    "id": 7,
                    "conname": "角色列表",
                    "pid": 6
                },
                {
                    "id": 8,
                    "conname": "角色创建",
                    "pid": 6
                }
            ]
        },
        {
            "id": 9,
            "conname": "百灵音频库",
            "pid": 0,
            checkedroles:[],
            checkAll: false,
            isIndeterminate:false,
            "child": [
                {
                    "id": 12,
                    "conname": "音频库删除",
                    "pid": 9
                },
                {
                    "id": 13,
                    "conname": "音频库查看",
                    "pid": 9
                },
                {
                    "id": 10,
                    "conname": "音频库添加",
                    "pid": 9
                },
                {
                    "id": 11,
                    "conname": "音频库修改",
                    "pid": 9
                }
            ]
        }
      ]
    };
  },
  mounted(){
    this.getARoRuLi();
  },
  methods: {
    //获取权限组列表
    getARoRuLi(){
      ARoRuLi().then(res=>{
        this.SetPermissionlist=res.data.data
      })
    },
    handleCheckAllChange(val,index) {
      this.SetPermissionlist[index].checkedroles=val?this.SetPermissionlist[index].roles:[];
      this.SetPermissionlist[index].isIndeterminate=false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    //全选权限组操作
    checkAllper(val,index){
      debugger
      if(val)
      // this.SetPermissionlist[index].checkedroles=val?this.SetPermissionlist[index].roles:[];
      this.SetPermissionlist[index].isIndeterminate=true;
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
  // .save {
  //   // margin-top: 32px;
  // }
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