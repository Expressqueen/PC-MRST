<template>
  <div class="organizational">
    <div class="leftbar left">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="search"
        clearable
        @keyup.enter.native="doSearch"
        @clear="clearSearch"
      ></el-input>
      <div class="title clearfix">
        <p class="titlename left" @click="collaspe()">
          乐播新瑞(北京)文化传媒有限公司
          <i :class="[collas==true?'el-icon-caret-top':'el-icon-caret-bottom']"></i>
        </p>
        <el-dropdown class="setname right" @command="Department" v-show="childlist.isMembers">
          <span class="el-dropdown-link">
            <i class="el-icon-s-tools"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Add">创建部门</el-dropdown-item>
            <el-dropdown-item command="Edit">编辑部门</el-dropdown-item>
            <el-dropdown-item command="Del">删除部门</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <ul class="departlist clearfix" v-if="collas==true" v-show="childlist.isMembers">
        <li
          v-for="(item,index) in departlist"
          :key="index"
          @click="selectedbar($event,index)"
          :class="{selectedli:index==copycurrent}"
        >{{item.depname}}</li>
      </ul>
      <ul class="departlist clearfix" v-show="!childlist.isMembers">
        <li class="selectedli realion">相关成员</li>
      </ul>
    </div>
    <div class="rightbar right">
      <RightShowpage :rightchild="childlist" ref="rightshowpage"></RightShowpage>
    </div>
    <el-dialog :title="Departmenttitle" :visible.sync="AddDepartment" width="800px">
      <el-form
        :model="AddDepart"
        :rules="AddDepartrules"
        ref="AddDepart"
        style="width:300px;margin:0 auto;"
      >
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="AddDepart.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
          <el-select v-model="AddDepart.roleval" placeholder="请选择角色" filterable>
            <el-option
              v-for="(item,index) in AddDepart.role"
              :key="index"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="AddAddDepartment('AddDepart')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import RightShowpage from "./rightshowpage";
import {
  AJuDeps,
  apiAddress,
  SAJuDeps,
  AJuDepC,
  getAJuDepC,
  EditAJuDepCUp,
  DeleteAJuDepC
} from "@/api/index";
export default {
  name: "organizational",
  components: { RightShowpage },
  data() {
    return {
      search: "",
      copycurrent: 0,
      AddDepartment: false,
      collas: true,
      Departmenttitle: "创建部门",
      righttitle: "第一事业部",
      departlist: [],
      AddDepart: {
        //创建部门字段
        name: "",
        role: [],
        roleval: ""
      },
      formLabelWidth: "60px",
      AddDepartrules: {
        name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
        role: [{ required: true, message: "请选择角色", trigger: "change" }]
      },
      // isMembers:true,
      childlist: {
        righttitle: "",
        isMembers: true,
        searchres: true
      },
      childselectid: null //二级组织架构选中的id
    };
  },
  mounted() {
    //获取组织架构数据
    this.getAJuDeps();
  },
  methods: {
    //获取组织架构数据
    getAJuDeps() {
      AJuDeps().then(res => {
        this.setdata = res.data.data;
        this.AtendDepid();
      });
    },
    //根据id进行数据搜索
    AtendDepid() {
      this.departlist = this.setdata.FirstList; //获取当前部门菜单
      let showchildlistid = this.setdata.FirstList[this.copycurrent].id; //获取当前选中部门的id
      this.childlist.righttitle = this.setdata.FirstList[
        this.copycurrent
      ].depname; //设置显示菜单的父级部门
      this.$refs["rightshowpage"].rightmenulist = this.setdata.TwoList[
        showchildlistid
      ]; //获取当前部门id对应的子部门
      this.getSAJuDeps(this.setdata.TwoList[showchildlistid]);
    },
    //根据部门ID渲染右侧table数据
    getSAJuDeps(data) {
      data.forEach(item => {
        if (item.pid == 0) {
          this.SeachViewDep(item.id);
        }
      });
    },
    //搜索查看组织部门(渲染右侧table数据)
    SeachViewDep(id, name) {
      let params = {
        dep_id: id,
        nickname: name
      };
      SAJuDeps(params)
        .then(res => {
          this.childlist.searchres = true;
          if (name != undefined) {
            this.childlist.isMembers = false;
            this.$refs["rightshowpage"].showselecttitle =
              "相关成员（" + res.data.data.length + "）";
            if (res.data.data.length < 1) {
              this.childlist.searchres = false;
            }
          }
          this.$refs["rightshowpage"].restableData = res.data.data;
        })
        .catch(err => {
          this.childlist.searchres = false;
        });
    },
    //菜单切换更改右侧部门菜单和数据
    selectedbar(obj, index) {
      this.copycurrent = index;
      this.childlist.righttitle = this.departlist[index].depname; //根据选中部门设置右侧title
      let selectdepyid = this.departlist[index].id;
      this.$refs["rightshowpage"].rightmenulist = this.setdata.TwoList[
        selectdepyid
      ]; //根据选中部门显示右侧title
      this.$refs["rightshowpage"].menucurrent = 0;
      this.getSAJuDeps(this.setdata.TwoList[selectdepyid]);
    },
    //标题展开折叠
    collaspe() {
      this.collas = !this.collas;
    },
    //组织部门操作
    Department(commond, depid) {
      debugger;
      //this.$refs['AddDepart'].resetFields();
      if (typeof depid == "number") this.childselectid = depid;
      else this.childselectid = 0;
      //获取部门角色列表
      getAJuDepC({ dep_id: this.childselectid }).then(res => {
          this.AddDepart.role = res.data.data;
      });
      if (commond == "Add") {
        this.AddDepartment = true;
        this.Departmenttitle = "创建部门";
      } else if (commond == "Edit") {
        this.AddDepartment = true;
        this.Departmenttitle = "编辑部门";
        let selectdept = this.departlist[this.copycurrent];
        this.AddDepart.name = selectdept.depname;
        this.AddDepart.roleval = selectdept.role_id;
        
      } else if (commond == "Del") {
        this.$confirm("此操作将永久删除该部门, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let selectdepid = this.setdata.FirstList[this.copycurrent].id;
            if (typeof depid == "number") {
              selectdepid = depid;
            }
            let params = {
              dep_id: selectdepid
            };
            DeleteAJuDepC(params).then(res => {
              this.departlist.splice(this.copycurrent, 1);
              this.getAJuDeps();
              Object.assign(
                this.$refs["rightshowpage"].$data,
                this.$refs["rightshowpage"].$options.data()
              );
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除该部门"
            });
          });
      }
    },
    //部门操作
    AddAddDepartment(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.Departmenttitle == "创建部门") {
            var params = {
              dep_id: _this.childselectid,
              depname: _this.AddDepart.name,
              role_id: _this.AddDepart.roleval
            };
            //创建部门
            AJuDepC(params).then(res => {
              this.getAJuDeps();
              this.AddDepartment = false;
              this.$refs["AddDepart"].resetFields();
            });
          } else if (_this.Departmenttitle == "编辑部门") {
            debugger
            let selectdepid = this.setdata.FirstList[this.copycurrent].id;
            if (typeof depid == "number") {
              selectdepid = depid;
            }
            var params = {
              dep_id: selectdepid,
              depname: _this.AddDepart.name,
              role_id: _this.AddDepart.roleval
            };
            EditAJuDepCUp(params).then(res => {
              debugger;
              this.getAJuDeps();
              this.AddDepartment = false;
              this.$refs["AddDepart"].resetFields();
            });

            // let selectdept = _this.departlist[_this.copycurrent];
            // selectdept.depname = _this.AddDepart.name;
            // selectdept.id = _this.AddDepart.value;
          }
        } else {
          this.$message.error("请输入必填项!");
          return false;
        }
      });
    },
    //搜索成员
    doSearch() {
      this.SeachViewDep(0, this.search);
    },
    //去除搜索
    clearSearch() {
      this.childlist.isMembers = true;
      this.$refs["rightshowpage"].showselecttitle = "全部";
      this.childlist.searchres = true;
      this.AtendDepid();
    }
  }
};
</script>
<style lang="sass">
@import './organizational.scss'
</style>
