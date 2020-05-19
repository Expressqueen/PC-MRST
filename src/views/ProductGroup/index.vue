<template>
  <div class="ProductGroup">
    <p class="callback">
      <i class="el-icon-arrow-left" @click="goBack"></i>
      集团业态产品
    </p>
    <div class="Productlist clearfix">
      <ul class="Productmenu left">
        <li
          v-for="(item,index) in formatlist"
          :key="index"
          :class="{activemenu:activemenu==index}"
          @click="TabPromenu(item.id,index)"
        >{{item.name}}</li>
      </ul>
      <div class="Productres left">
        <div class="reshead clearfix">
          <ul class="left">
            <li
              name="Pruclist"
              :class="{active:activeName=='Pruclist'}"
              @click="ResPruList('Pruclist')"
            >产品列表</li>
            <li name="zone" :class="{active:activeName=='zone'}" @click="ResPruList('zone')">分区</li>
          </ul>
          <span class="right" v-show="activeName=='Pruclist'" @click="set()">
            <i class="el-icon-s-tools"></i>业态产品设置
          </span>
          <span class="right" v-show="activeName=='zone'" @click="CFlevel=true">
            <i class="el-icon-circle-plus"></i>创建一级分区
          </span>
        </div>
        <!-- 产品列表 -->
        <div v-show="activeName=='Pruclist'">
          <ul class="resprulist" v-show="goodlist.length>0">
            <li
              v-for="(item,index) in goodlist"
              :key="index"
              @mouseenter="enter(index)"
              @mouseleave="leave()"
              @click="OpenStore(item)"
            >
              <div class="listbox">
                <el-image :src="item.image"></el-image>
                <div class="mask" v-show="imgseen&&index==imgcurrent">
                  <button type="button" class="maskbutton">WebRadio</button>
                  <button type="button" class="maskbutton">{{item.intro}}</button>
                </div>
                <p class="title">
                  <span>{{item.name}}</span>
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      <i class="el-icon-more" style="transform: rotate(90deg);"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-user-solid">合同</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-s-comment">信息</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </p>
              </div>
            </li>
          </ul>
          <div class="NullPruc" v-show="goodlist.length<1">
              <img src="../../assets/images/slice.png" alt="">
              <p>暂未绑定产品</p>
          </div>
        </div>
        <!-- 分区 -->
        <ProductZone v-show="activeName=='zone'"></ProductZone>
        <!-- <div class="rezonelist" v-show="activeName=='zone'">
          <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          >
            <el-table-column prop="date" label="分区名称"></el-table-column>
            <el-table-column prop="address" label="操作" width="320">
                <template slot-scope="scope">
                    <el-link type="primary" :underline="false" @click="CreateClevel(scope.row)">创建下级</el-link>
                    <el-link type="primary" :underline="false" @click="Setzone(scope.rowe)">设置</el-link>
                    <el-link type="danger" :underline="false" @click="Delevel(scope.row)">删除</el-link>
                </template>
            </el-table-column>
          </el-table>
        </div> -->

      </div>
    </div>
    
    <!-- 业态产品设置 -->
    <SetFormat ref="setFormat"></SetFormat>
  </div>
</template>
<script>
import { FormatList, GoodsList,BlocInfo,GoodIns } from "@/api/index";
import SetFormat from '@/views/ProductGroup/setFormat.vue';
import ProductZone from '@/views/ProductGroup/ProductZone'
export default {
  name: "ProductGroup",
  components:{SetFormat,ProductZone},
  data() {
    return {
      activeName: "Pruclist",
      GroupId:"",
      src:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      goodlist: [],
      formatlist: [],
      activemenu: 0,
      imgcurrent: 0,
      imgseen: false,
      maskDialog:true

    };
  },
  mounted() {
    this.GroupId=this.$route.query.id;
    //获取业态列表
    BlocInfo({id:this.GroupId}).then(res=>{
        this.formatlist=res.data.data.instates;
        // if(this.formatlis.length>0)
        //获取业态产品列表
        this.getBlocList(this.GroupId,this.formatlist[this.activemenu].id);
    })
    
  },
  methods: {
    //获取当前业态下的产品列表
    getBlocList(cyid,insid){
      GoodIns({cyid:cyid,insid:insid}).then(res=>{
        this.goodlist = res.data.data;
      })
    },
    //返回集团列表
    goBack() {
      this.$router.back(-1);
    },
    //业态产品切换
    TabPromenu(id, index) {
      this.activemenu = index;
      this.getBlocList(this.GroupId,id);
    },
    //产品分区切换
    ResPruList(name) {
      this.activeName = name;
    },
    //图片鼠标移入移除功能
    enter(index) {
      this.imgseen = true;
      this.imgcurrent = index;
    },
    leave() {
      this.imgcurrent = false;
      this.imgcurrent = null;
    },
    //跳转门店
    OpenStore(item){
      this.$router.push({
        name: 'Storeshop',
        query: {
            id: item.id
        }
      });
    },
    // 业态产品设置
    set(){
      this.$refs['setFormat'].maskDialog=true;
    }
  }
};
</script>
<style lang="scss">
.ProductGroup {
  width: 1420px;
  margin: 0 auto;
  padding: 40px 0;
  // margin-top: 56px;
  .callback {
    font-weight: 400;
    font-size: 16px;
    i {
      font-weight: 400;
      cursor: pointer;
      margin-right: 5px;
    }
  }
  .NullPruc{
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    color: #999999;
    margin-top: -120px;
    // margin-left: -120px;
    p{
        margin-top: 20px;
    }
    
  }
  .Productlist {
    margin-top: 30px;
    .Productmenu {
      width: 160px;
      background: #ffffff;
      margin: 0 60px 0 0;
      li {
        height: 56px;
        line-height: 56px;
        text-align: center;
        color: #999999;
        cursor: pointer;
      }
      & .activemenu {
        background: #f5f7fa;
        color: #000000;
      }
    }
    .Productres {
      width: 1200px;
      .reshead {
        ul {
          margin: 0 0 30px 0;
          li {
            padding: 0 20px;
            display: inline-block;
            list-style: none;
            cursor: pointer;
            font-size: 12px;
            color: #666666;
          }
          & li:first-child {
            padding-left: 0;
          }
          & li.active {
            font-size: 14px;
            color: #333333;
          }
        }
      }
      .resprulist {
        display: flex;
        flex-wrap: wrap;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -ms-flex-line-pack: justify;
        align-items: center;
        margin: 0;
        li {
          // margin-left: 40px;
          display: inline-block;
          list-style: none;
          width: 33%;
          height: 320px;
          border-radius: 4px;
          position: relative;
          margin-bottom: 20px;
          div.listbox{
            width: 320px;
            height: 320px;
            background: #ffffff;
            img {
            height: 240px;
            border-radius: 4px 4px 0 0;
          }
          .mask {
            width: 320px;
            height: 240px;
            line-height: 240px;
            background: #000000;
            opacity: 0.5;
            position: absolute;
            border-radius: 4px;
            top: 0;
            left: 0;
            text-align: center;
            .maskbutton {
              min-width: 96px;
              height: 40px;
              border: 1px solid rgba(245, 245, 245, 1);
              border-radius: 4px;
              background: none;
              margin: 0 20px 0 20px;
              color: #ffffff;
            }
          }
          .title {
            text-align: center;
            padding-top: 30px;
            .el-dropdown {
              float: right;
              margin-right: 20px;
            }
          }
          }
        }
        & li:first-child {
          margin-left: 0;
        }
      }
      .rezonelist{
          .has-gutter{
              th{
                  background: #F5F7FA;
              }
          }
          .cell{
              .el-link{
                  margin: 0 20px;
              }
          }
      }
      .right {
        color: #666666;
        cursor: pointer;
        i {
          color: #333333;
          margin-right: 3px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>