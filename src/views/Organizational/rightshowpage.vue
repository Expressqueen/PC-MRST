<template>
  <div class="rightshowpage">
    <div class="rightmenu left" v-show="rightchild.isMembers">
      <p class="menutitle">{{rightchild.righttitle}}</p>
      <ul class="departlist clearfix">
        <li
          v-for="(item,index) in rightmenulist"
          :key="index"
          @click="openchildlist($event,item,index)"
          :class="[{selectedli:index==menucurrent},index!=0?ishide:'show',{isCshow:item.child.length>0}]"
        >
          <p class="Fshowtitle">
             <span class="showrightitle">{{item.depname}}</span>
            （{{item.udep_count}}）

            <i
              :class="[ishide=='show'?'el-icon-caret-top':'el-icon-caret-bottom','right']"
              v-if="item.pid==0"
            ></i>
            <i
              :class="[isCshowpage?'el-icon-caret-top':'el-icon-caret-bottom','right']"
             v-else-if="item.child.length>0"
            ></i>
            <ul class="childmunulist" v-show="item.child.length>0&&isCshowpage">
              <li v-for="(Citem,Cindex) in item.child" :key="Cindex" @click.stop="Cselectlist($event,Citem,Cindex)"
                :class="{iscselect:Cindex==Cselectindex}">
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
          <el-table-column prop="ident" label="操作" align="right" width="100">
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
                        <el-dropdown-item :command="{type:'admin',scope}">管理员</el-dropdown-item>
                        <el-dropdown-item :command="{type:'Members',scope}">成员</el-dropdown-item>
                        <el-dropdown-item :command="{type:'disaccount',scope}" class="disable">停用账号</el-dropdown-item>
                        <el-dropdown-item :command="{type:'del',scope}" class="del">删除账号</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="resnull" v-else>
        <i class="el-icon-user-solid"></i>
        <p>暂无成员</p>
      </div>
    </div>
    <el-dialog :title="setDioTitle" :visible.sync="AddOrganization" width="800px" :close-on-click-modal="false">
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
    <el-dialog title="邀请成员" :visible.sync="invitemembers" width="800px" height="300px" :close-on-click-modal="false">
        <InviteMembers></InviteMembers>
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
import {hasClass} from '@/utils/index'
import {SAJuDeps} from '@/api/index'
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
      ishide:'show',
      menucurrent: 0,
      isCshowpage:false,
      Cselectindex: null,
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
    SAJuDeps().then(res=>{
      this.restableData=res.data.data;
    })
  },

  methods: {
    //设置全部展开折叠功能
    openchildlist(obj,item,index){
      if(item.pid==0&&this.menucurrent==index)
      this.ishide=="hide"?this.ishide='show':this.ishide='hide';
      if(hasClass(obj.currentTarget,'isCshow')){
        this.isCshowpage=!this.isCshowpage;
      }else{
        this.isCshowpage=false;
      }
      this.menucurrent = index;
      this.showselecttitle=item.depname;
      this.Cselectindex=null;
    },
    //设置三级自己选中事件
    Cselectlist(obj,item,index){
      this.showselecttitle=item.depname;
      this.Cselectindex=index;
    },
    deleteline(index, data) {
      this.restableData.splice(index, 1);
    },
    Secondary(command) {
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
                this.invitemembers=true;
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
      switch(command.type){
        case 'admin':
            command.scope.row.operation="管理员"
          break;
        case 'Members':
            command.scope.row.operation="成员"
            break;
        case 'disaccount':
            command.scope.row.operation="停用"
            break;
        case 'del':
            this.restableData.splice(command.scope.$index, 1);
            break;
      }
    },
    //table行双击事件
    showdetailinfo(row,column,event){
      this.detailedinfo=true;
      this.propdetailinfo=row;
    }
  }
};
</script>