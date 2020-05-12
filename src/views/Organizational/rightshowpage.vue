<template>
  <div class="rightshowpage">
    <div class="rightmenu left" v-show="rightchild.isMembers">
      <p class="menutitle">{{rightchild.righttitle}}</p>
      <ul class="departlist clearfix">
        <li v-for="(item,index) in rightmenulist" :key="index" @click="checkchild($event,item,index)"
        :class="[{selectedli:index==menucurrent}]" v-show="!item.isshowChild||item.pid==0"> 
          <p class="Fshowtitle">
            <span class="showrightitle">{{item.depname}}</span>
            （{{item.udep_count}}）
            <i
              :class="[item.showchild?'el-icon-caret-bottom':'el-icon-caret-top','right']"
              v-if="item.pid==0"
            ></i>
            <i
              :class="[!item.showchild?'el-icon-caret-bottom':'el-icon-caret-top','right']"
             v-else-if="item.child.length>0"
            ></i>
            <ul class="childmunulist" v-show="item.showchild">
              <li v-for="(Citem,Cindex) in item.child" :key="Cindex"
                :class="Cindex==Cselectindex&&parentindex==index?'selectedli':''" @click.stop="Cselectlist($event,Citem,Cindex,index)">
                <p class="Cshowtitle">
                    <span class="showrightitle">{{Citem.depname}}</span>
                  （{{Citem.udep_count}}）
                </p>
              </li>
            </ul>
          </p>
        </li>
      </ul>
    </div>
    <div class="rightres right">
      <div class="rightrestitle">
        <span class="mark left">{{showselecttitle}}</span>
        <el-dropdown class="setname right" @command="Secondary" v-show="rightchild.isMembers">
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
      <!-- 右侧table显示 -->
      <div class="restable" v-if="rightchild.searchres">
        <el-table :data="restableData" style="width: 100%" :show-header="false" @row-dblclick="showdetailinfo">
          <el-table-column prop="nickname" label="姓名" width="120">
            <template slot-scope="scope">
               <el-avatar size="medium" :src="scope.row.img" class="left"></el-avatar>
               <span class="left avafont">{{scope.row.nickname}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="depname" label="部门" width="180"></el-table-column>
          <el-table-column prop="position" label="角色"></el-table-column>
          <el-table-column prop="role" label="操作" align="right" width="120">
            <template slot-scope="scope">
                <!-- {{scope.row.ident}} -->
                <el-dropdown @command="Setrole">
                    <span class="el-dropdown-link">
                        <span :class="{red:scope.row.ident=='待审核'}">
                            {{scope.row.ident}}
                        </span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,index) in scope.row.role" :key="index" 
                          :class="[{disable:item.type==2},{del:item.type==3}]"
                          :command="{item:item,scope}">
                          {{item.ident}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 没有查询到数据显示 -->
      <div class="resnull" v-else>
        <i class="el-icon-user-solid"></i>
        <p>暂无成员</p>
      </div>
    </div>
    <el-dialog title="邀请成员" :visible.sync="invitemembers" width="800px" height="300px" :close-on-click-modal="false">
        <InviteMembers ref="InviteMember"></InviteMembers>
    </el-dialog>
    <el-dialog title="" :visible.sync="detailedinfo"
    width="800px" :close-on-click-modal="false" ref="DetailInfo" >
      <DetailInfo :propdetail="propdetailinfo"></DetailInfo>
    </el-dialog>
  </div>
</template>
<script>
import InviteMembers from '@/views/Organizational/Invitemembers'
import DetailInfo from '@/views/Organizational/detailinfo'
// import {hasClass} from '@/utils/index'
import {SAJuDeps,AUsRegs,EditRolesType} from '@/api/index'
export default {
  name: "rightshowpage",
  props:{
    rightchild:{
      type:Object,
      default:function(){
        return {righttitle:'第一事业部'}
      }
    },
  },
  components:{
      InviteMembers,DetailInfo
  },
  data() {
    return {
      menucurrent: 0, //当前一级菜单选中状态
      parentindex:0, //父级选中状态
      Cselectindex: null, //当前二级选中状态
      detailedinfo:false,
      showselecttitle:"全部",
      setDioTitle:"创建部门",
      rightmenulist: [],
      restableData: [
        
      ],
      propdetailinfo:"",
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      selectdepartlist: "",
      AddOrganization: false,
      formLabelWidth: "60px",
      AddOrgan: {
        name: "",
        role: ""
      },
      invitemembers:false
    };
  },
  mounted(){
    // this.getSAJuDeps();
  },

  methods: {
    //设置全部展开折叠功能
    checkchild(obj,item,index){
      if(item.pid==0&&this.menucurrent==index){
        item.showchild=!item.showchild;
        this.rightmenulist.forEach(res=>{
          if(res.pid==item.id){
            res.isshowChild=!res.isshowChild;
          }
        })
      }else if(item.child.length>0){
        item.showchild=!item.showchild;
      }
      this.$forceUpdate();
      this.menucurrent=index;
      this.parentindex=index;
      this.Cselectindex=null;
      this.showselecttitle=item.depname;
      this.$parent.SeachViewDep(item.id);
    },
    //设置三级自己选中事件
    Cselectlist(obj,item,index,pindex){
      item.isshowChild=!item.isshowChild;
      this.showselecttitle=item.depname;
      this.Cselectindex=index;
      this.parentindex=pindex;
      this.menucurrent=null;
      this.$forceUpdate();
      this.$parent.SeachViewDep(item.id);
    },
    deleteline(index, data) {
      this.restableData.splice(index, 1);
    },
    //对部门进行增删改操作
    Secondary(command) {
      //邀请成员
      if(command=="Inmembers"){
        let selectdepid=this.getdepid();
                AUsRegs({dep_id:selectdepid}).then(res=>{
                  if(res.data.code==0){
                    this.$refs['InviteMember'].CopyUrl=res.data.data;
                  }else{
                    this.$message({
                      type:'error',
                      message:res.data.msg
                    })
                  }
                })
                this.invitemembers=true;
      }else{ //增删改操作调用父级页面方法
        this.$parent.Department(command,this.getdepid());
      }
    },
    //获取当前选中右侧的部门父级id
    getdepid(){
      let selectdepid;
      if(this.Cselectindex==null){
        selectdepid=this.rightmenulist[this.parentindex].id
      }else{
        selectdepid=this.rightmenulist[this.parentindex].child[this.Cselectindex].id;
      }
      return selectdepid;
    },
    //显示列表权限修改
    Setrole(command){
      let params={
        user_id:command.scope.row.user_id,
        old_role_id:command.scope.row.old_role_id,
        dep_id:command.scope.row.dep_id,
        role_id:command.item.role_id,
        type:command.item.type
      }
      EditRolesType(params).then(res=>{
        this.$parent.SeachViewDep(this.getdepid());
      })
    },
    //table行双击事件
    showdetailinfo(row,column,event){
      this.detailedinfo=true;
      this.propdetailinfo=row;
    }
  }
};
</script>