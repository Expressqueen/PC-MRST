<template>
  <div class="BlocGroup">
    <header>集团管理</header>
    <div class="Blocbody">
      <div class="Searchhead clearfix">
        <el-input
          placeholder="输入集团名称搜索"
          prefix-icon="el-icon-search"
          v-model="SearchBloc"
          class="Searchinput"
          clearable
          @keyup.enter.native="searchBlocgroup"
          @clear="clearSearch"
        ></el-input>
        <el-row class="right">
          <el-button type="primary" class="blue" @click="createFormat">
            <i class="el-icon-circle-plus-outline"></i>
            创建业态
          </el-button>
          <el-button type="primary" class="blue" @click="CreateGroup">
            <i class="el-icon-circle-plus-outline"></i>
            创建集团
          </el-button>
        </el-row>
      </div>
      <ul class="showGrouplist">
        <li v-for="(item,index) in BlocGrouplist" :key="index" @click="openProduct(item.id)">
          <span>
            <el-image :src="item.cy_img"></el-image>
          </span>
          <span>{{item.cy_name}}</span>
          <span>{{item.create_time}}</span>
          <span @click.stop="SetGroup(item,)">
            <i class="el-icon-s-tools"></i>
          </span>
        </li>
      </ul>
      <div class="NullPruc" v-show="searchres"><img src="../../assets/images/slice.png" alt=""><p>未找到该集团</p></div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalpage"
        :page-size="8"
        :current-page.sync="currentPage"
        @current-change="CurrentChange"
        align="center"
        style="margin-top:50px"
        v-show="!searchres"
      ></el-pagination>
    </div>
    <!-- 创建集团 -->
    <AddBlocGroup ref="BlocTarget"></AddBlocGroup> 
    <!-- 设置集团 -->
    <SetBlocGroup ref="SetBlocgroup"></SetBlocGroup>
    <!-- 创建业态 -->
    <CreateFormat ref="createTarget"></CreateFormat>
  </div>
</template>
<script>
import AddBlocGroup from '@/views/BlocGroup/AddBlocGroup'
import SetBlocGroup from '@/views/BlocGroup/SetBlocGroup'
import CreateFormat from '@/views/BlocGroup/CreateFormat'
import { BlocList,BlocInfo } from "@/api/index";
export default {
  name: "BlocGroup",
  components:{AddBlocGroup,SetBlocGroup,CreateFormat},
  data() {
    return {
      SearchBloc: "",
      BlocGrouplist: [],
      currentPage: 1,
      totalpage: 0,
      searchres:false
    };
  },
  watch:{

  },
  mounted() {
      this.getBlocList(1);
  },
  methods: {
    //获取集团列表数据
    getBlocList(page,name) {
      let params = {
        page: page,
        pagesize: 8,
        name: name, 
        field: "",
        order: 0
      };
      //获取集团列表数据
      BlocList(params).then(res => {
        if(res.data.data.data==0) this.searchres=true;
        else  this.searchres=false;
        this.BlocGrouplist = res.data.data.data;
        this.totalpage = res.data.data.total;
      });
    },
    //集团搜索
    searchBlocgroup(){
      this.getBlocList(1,this.SearchBloc);
    },
    //清空搜索
    clearSearch(){
      this.getBlocList(1);
    },
    //点击下一页
    CurrentChange(val) {
      this.currentPage=val;
      this.getBlocList(val);
    },
    //创建集团
    CreateGroup(){
        this.$refs['BlocTarget'].Addblocdialog=true;
        //获取业态列表
        this.$refs['BlocTarget'].GetFormas();
    },  
    //设置集团
    SetGroup(item){
      this.$refs['SetBlocgroup'].SetBlocdialog=true;
      this.GetBlocInfo(item.id);
      this.$refs['SetBlocgroup'].Nowpage=this.currentPage;
    },
    //集团详情
    GetBlocInfo(itemId){
      BlocInfo({id:itemId}).then(res=>{
        this.$refs['SetBlocgroup'].Resetform=JSON.parse(JSON.stringify(res.data.data));
        /**赋值基本信息 */
        this.$refs['SetBlocgroup'].Basicinfo=JSON.parse(JSON.stringify(res.data.data));
        //赋值选中的业态
        this.$refs['SetBlocgroup'].ImpotantInfo.formats=JSON.parse(JSON.stringify(res.data.data)).instates;
        this.$refs['SetBlocgroup'].Initformats()
      })
    },
     //创建业态
    createFormat(){
      this.$refs['createTarget'].dialogFormVisible=true;
    },  
    //打开产品列表
    openProduct(id){
      this.$router.push({
        name: 'ProductGroup',
        query: {
            id: id
        }
      });
    }
  }
};
</script>
<style lang="scss" scope>
.BlocGroup {
  width: 960px;
  margin: 0 auto;
  height: calc(100vh - 110px);
  padding: 40px 0;
  header {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
  }
    .Blocbody{
      height: 100%;
      position: relative;
      .Searchhead {
      height: 80px;
      background: #ffffff;
      margin: 20px 0;
      line-height: 80px;
      padding: 0 20px;
      .Searchinput {
        width: 320px;
      }
      button {
        color: #ffffff;
      }
    }
    .showGrouplist {
      overflow: auto;
      height: calc(100% - 120px);
      li {
        height: 80px;
        line-height: 80px;
        background: #ffffff;
        margin-bottom: 10px;
        display: flex;
        span {
          flex: 1;
          text-align: center;
          
          .el-image{
            // img {
              width: 112px;
              height: 56px;
              vertical-align: middle;
            // }
          }
        }
      }
      & li:last-child{
        margin-bottom: 0;
      }
    }
    .NullPruc{
      position: absolute;
      top: 50%;
      left: 50%;
      text-align: center;
      margin-left: -60px;
      margin-top: -72px;
      p{
        margin-top: 10px;
      }
    }
    & .showGrouplist::-webkit-scrollbar-track-piece{
      background: #EAEEF7;
    }
    .el-pagination{
      margin: 20px 0!important;
    }
  }
  
}
</style>