<template>
  <div class="BlocGroup">
    <header>集团管理</header>
    <div class="Blocbody">
      <div class="Searchhead clearfix">
        <el-input
          placeholder="输入门店名称搜索"
          prefix-icon="el-icon-search"
          v-model="SearchBloc"
          class="Searchinput"
        ></el-input>
        <el-row class="right">
          <el-button type="primary" class="blue">
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
        <li v-for="(item,index) in BlocGrouplist" :key="index">
          <!-- <span>{{item.cy_img}}</span> -->
          <span>
            <img
              src="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
            />
          </span>
          <span>{{item.cy_name}}</span>
          <span>{{item.create_time}}</span>
          <span>
            <i class="el-icon-s-tools"></i>
          </span>
        </li>
      </ul>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalpage"
        :current-page.sync="currentPage"
        @current-change="CurrentChange"
        align="center"
        style="margin-top:50px"
      ></el-pagination>
    </div>
    <AddBlocGroup ref="BlocTarget"></AddBlocGroup>
  </div>
</template>
<script>
import AddBlocGroup from '@/views/BlocGroup/AddBlocGroup'
import { BlocList } from "@/api/index";
export default {
  name: "BlocGroup",
  components:{AddBlocGroup},
  data() {
    return {
      SearchBloc: "",
      BlocGrouplist: [],
      currentPage: 1,
      totalpage: 0
    };
  },
  mounted() {
      this.getBlocList(1);
  },
  methods: {
    //获取集团列表数据
    getBlocList(page) {
      let params = {
        page: page,
        pagesize: 8,
        name: "",
        field: "",
        order: 1
      };
      //获取集团列表数据
      BlocList(params).then(res => {
        this.BlocGrouplist = res.data.data.data;
        this.totalpage = res.data.data.total;
      });
    },
    //点击下一页
    CurrentChange(val) {
        this.getBlocList(val);
    },
    //创建集团
    CreateGroup(){
        this.$refs['BlocTarget'].Addblocdialog=true;
    }   
  }
};
</script>
<style lang="scss" scope>
#app {
  height: auto;
  min-height: 100vh;
  .headbar {
    position: fixed;
    z-index: 222;
  }
}
.BlocGroup {
  width: 960px;
  margin: 0 auto;
  min-height: calc(100% - 110px);
  padding: 100px 0 40px 0;
  header {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
  }
  .Searchhead {
    height: 80px;
    background: #ffffff;
    margin-top: 20px;
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
    li {
      height: 80px;
      line-height: 80px;
      background: #ffffff;
      margin-bottom: 10px;
      display: flex;
      span {
        flex: 1;
        text-align: center;
        img {
          width: 112px;
          height: 56px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>