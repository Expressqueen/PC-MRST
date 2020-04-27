<template>
  <div class="rightshowpage">
    <div class="rightmenu left">
      <p class="menutitle">{{themetitle}}</p>
      <ul class="departlist clearfix">
        <li
          v-for="(item,index) in rightmenulist"
          :key="index"
          @click="openchildlist($event,index)"
          :class="{selectedli:index==menucurrent}"
        >
          <p class="Fshowtitle">
             <span class="showrightitle">{{item.title}}</span>
            （{{item.num}}）
            <i
              :class="[isopenchild?'el-icon-caret-top':'el-icon-caret-bottom','right']"
              v-if="item.child!=undefined"
            ></i>
          </p>
          <ul class="childmunulist" v-if="item.child!=undefined" v-show="isopenchild">
            <li
              v-for="(Citem,Cindex) in item.child"
              :key="Cindex"
              @click.stop="Cselectedlist($event,Cindex,Citem.child!=undefined)"
              :class="{selectedli:Cindex==Cselectindex}"
            >
              <p class="Cshowtitle">
                  <span class="showrightitle">{{Citem.title}}</span>
                （{{Citem.num}}）
                <i
                  :class="[isopenShild?'el-icon-caret-top':'el-icon-caret-bottom','right']"
                  v-if="Citem.child!=undefined"
                ></i>
              </p>
              <ul class="childmunulist" v-if="Citem.child!=undefined" v-show="isopenShild">
                <li
                  v-for="(Sitem,Sindex) in Citem.child"
                  :key="Sindex"
                  @click.stop="Sselectedlist($event,Sindex)"
                >
                  <p class="Sshowtitle">
                     <span class="showrightitle">{{Sitem.title}}</span>
                    （{{Sitem.num}}）
                    <i
                      :class="[Sindex==Sselectindex?'el-icon-caret-top':'el-icon-caret-bottom','right']"
                      v-if="Sitem.child!=undefined"
                    ></i>
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="rightres right">
      <div class="rightrestitle">
        <span class="mark left">{{showselecttitle}}</span>
        <el-dropdown class="setname right" @command="Secondary">
          <span class="el-dropdown-link">
            <i class="el-icon-s-tools"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Add">创建部门</el-dropdown-item>
            <el-dropdown-item command="Edit">编辑部门</el-dropdown-item>
            <el-dropdown-item command="Del">删除部门</el-dropdown-item>
            <el-dropdown-item command="Inmembers">邀请成员</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="restable">
        <el-table :data="restableData" style="width: 100%" :show-header="false">
          <el-table-column prop="date" label="姓名" width="120"></el-table-column>
          <el-table-column prop="name" label="部门" width="180"></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
          <el-table-column prop="operation" label="操作" align="right" width="100">
            <template slot-scope="scope">
                <el-dropdown @command="Setrole">
                    <span class="el-dropdown-link">
                        <span :class="{red:scope.row.operation=='待审核'}">
                            {{scope.row.operation}}
                        </span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>管理员</el-dropdown-item>
                        <el-dropdown-item>成员</el-dropdown-item>
                        <el-dropdown-item command="disaccount" class="disable">停用账号</el-dropdown-item>
                        <el-dropdown-item class="del">删除账号</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="setDioTitle" :visible.sync="AddOrganization" width="800px">
      <el-form :model="AddOrgan" style="width:300px;margin:0 auto;">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="AddOrgan.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" filterable>
          <el-select v-model="AddOrgan.role" placeholder="请选择活动区域">
            <el-option label="活动运营" value="shanghai"></el-option>
            <el-option label="市场运营" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setDiorgan()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { removeClass } from "@/utils/index";
// import { formatTime } from "../../utils";
export default {
  name: "rightshowpage",
  props:{
      themetitle:{
          type: String,
          default: '第一事业部'
      }
  },
  data() {
    return {
      menucurrent: 0,
      Cselectindex: null,
      Sselectindex: null,
      isopenchild: true,
      isopenShild: false,
      showselecttitle:"全部",
      setDioTitle:"创建部门",
      rightmenulist: [
        {
          title: "全部",
          value: "1",
          num: 12,
          child: [
            { title: "总经理", value: "2", num: 1 },
            {
              title: "运营",
              value: "3",
              num: 5,
              child: [
                { title: "部门运营", value: "3-1",num:1 },
                { title: "市场运营", value: "3-2" ,num:4}
              ]
            },
            { title: "音乐合作拓展", value: "4", num: 3 },
            { title: "商务渠道拓展", value: "5", num: 3 }
          ]
        }
      ],
      restableData: [
        {
          date: "2016-05-02",
          name: "王小虎1",
          role: "上海市普陀区金沙江路 1518 弄",
          operation:"待审核"
        },
        {
          date: "2016-05-04",
          name: "王小虎2",
          role: "上海市普陀区金沙江路 1517 弄",
          operation:"管理员"
        },
        {
          date: "2016-05-01",
          name: "王小虎3",
          role: "上海市普陀区金沙江路 1519 弄",
          operation:"管理员"
        },
        {
          date: "2016-05-03",
          name: "王小虎4",
          role: "上海市普陀区金沙江路 1516 弄",
          operation:"成员"
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
    openchildlist(obj, index) {
      if (this.menucurrent == index) this.isopenchild = !this.isopenchild;
      this.menucurrent = index;
      this.Cselectindex = null;
      this.isopenShild=false;
      this.showselecttitle=obj.currentTarget.querySelector("p span.showrightitle").innerText;
    },
    Cselectedlist(obj, Cindex,isse) {
      if(!isse)
      this.isopenShild=false;
      if(this.Cselectindex == Cindex||isse)
      this.isopenShild=!this.isopenShild;
      this.Cselectindex = Cindex;
      this.menucurrent++;
      this.showselecttitle=obj.currentTarget.querySelector("p span.showrightitle").innerText;
    },
    Sselectedlist(obj,Sindex){
        this.Sselectindex = Sindex;
        this.Cselectindex=null;
        this.showselecttitle=obj.currentTarget.querySelector("p span.showrightitle").innerText;
    },
    deleteline(index, data) {
      this.restableData.splice(index, 1);
    },
    Secondary(command) {
        debugger
        switch(command){
            case 'Add':
                this.AddOrganization=true;
                break;
            case 'Edit':
                this.AddOrganization=true;
                this.setDioTitle="编辑部门"
                break;
            case 'Del':
                break;
            case 'Inmembers':
                break;
        }
    },
    //增加修改确定方法
    setDiorgan(){
        if(this.setDioTitle="创建部门"){
            this.$message("创建部门成功")
        }else if(this.setDioTitle="编辑部门"){
             this.$message("编辑部门成功")
        }

    },
    //显示列表权限修改
    Setrole(command){
        if(command=="disaccount"){

        }
    },
    
  }
};
</script>