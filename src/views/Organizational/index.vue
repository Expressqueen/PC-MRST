<template>
  <div class="organizational">
    <div class="leftbar left">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search"></el-input>
      <div class="title">
        <p class="titlename left">
          乐播新瑞(北京)文化传媒有限公司
          <i
            :class="[collas==true?'el-icon-caret-top':'el-icon-caret-bottom']"
            @click="collaspe()"
          ></i>
        </p>
        <span class="setname right">
          <i class="el-icon-setting"></i>
        </span>
      </div>
      <ul class="departlist clearfix" v-if="collas==true">
        <li
          v-for="(item,index) in departlist"
          :key="index"
          @click="selectedbar($event,index)"
          :class="{selectedli:index==copycurrent}"
        >{{item.title}}</li>
      </ul>
    </div>
    <div class="rightbar right">
      <div class="rightmenu left">
        <p class="menutitle">第一事业部</p>
        <ul class="departlist clearfix">
          <li
            v-for="(item,index) in rightmenulist"
            :key="index"
            @click="selectedmenubar($event,index)"
            :class="{selectedli:index==menucurrent}"
          >
            <p>
                {{item.title}}
                （{{item.num}}）
                <i
                :class="[index==menucurrent?'el-icon-caret-top':'el-icon-caret-bottom','right']"
                v-if="item.child!=undefined"
                ></i>
            </p>
            <ul class="childmunulist" v-if="item.child!=undefined" v-show="index==menucurrent">
                <li>
                    活动运营（2）
                </li>
                <li>
                    市场运营（3）
                </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="rightres right">
        <div class="rightrestitle">
          <span class="mark left">全部</span>
          <el-dropdown class="setname right" @command="AddCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-setting"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="AddOrganization">创建组织</el-dropdown-item>
              <el-dropdown-item>添加成员</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="restable">
          <el-table :data="restableData" style="width: 100%">
            <el-table-column prop="date" label="姓名" width="120"></el-table-column>
            <el-table-column prop="name" label="部门" width="180"></el-table-column>
            <el-table-column prop="address" label="角色"></el-table-column>
            <el-table-column prop="address" label="操作" align="right" width="80">
              <template slot-scope="scope">
                <i class="el-icon-edit-outline" @click="handleClick(scope.row)"></i>
                <i
                  class="el-icon-delete"
                  style="margin-left:10px"
                  @click="deleteline(scope.$index,scope.row)"
                ></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog title="添加组织架构" :visible.sync="AddOrganization">
      <el-form :model="AddOrgan" style="width:300px;margin:0 auto;">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="AddOrgan.name" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="AddOrgan.role" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="AddOrganization = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "organizational",
  data() {
    return {
      search: "",
      copycurrent: 0,
      menucurrent: 0,
      collas: true,
      departlist: [
        { title: "第一事业部", value: "1" },
        { title: "第二事业部", value: "2" },
        { title: "门店部", value: "3" },
        { title: "研发部", value: "4" }
      ],
      rightmenulist: [
        { title: "全部", value: "1", num: 12 },
        { title: "总经理", value: "2", num: 1 },
        { title: "运营", value: "3", num: 5, child: [] },
        { title: "音乐合作拓展", value: "4", num: 3 },
        { title: "商务渠道拓展", value: "5", num: 3 }
      ],
      restableData: [
        {
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎3",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      selectdepartlist: "",
      AddOrganization: false,
      formLabelWidth: "60px",
      AddOrgan: {
        name: "",
        role: ""
      }
    };
  },
  methods: {
    selectedbar(obj, index) {
      this.copycurrent = index;
    },
    collaspe() {
      this.collas = !this.collas;
    },
    selectedmenubar(obj, index) {
        if(this.menucurrent==index){
            obj.target.parentNode.querySelector('ul').style.display==""?obj.target.parentNode.querySelector('ul').style.display="none"
            :obj.target.parentNode.querySelector('ul').style.display="";
            obj.target.parentNode.querySelector('i').className.indexOf("el-icon-caret-top")==-1?obj.target.parentNode.querySelector('i').setAttribute("class",'el-icon-caret-top right')
            :obj.target.parentNode.querySelector('i').setAttribute("class",'el-icon-caret-bottom right')
       }
      this.menucurrent = index;
    },
    deleteline(index, data) {
      this.restableData.splice(index, 1);
    },
    AddCommand(command) {
      this[command] = true;
    }
  }
};
</script>
<style lang="sass">
@import './organizational.scss'
</style>
