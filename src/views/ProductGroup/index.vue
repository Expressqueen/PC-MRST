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
        <div class="rezonelist" v-show="activeName=='zone'">
          <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            @row-click="OpenStore"
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
        </div>
      </div>
    </div>
    <!-- 创建一级分区 -->
    <el-dialog
        :title="leveltitle"
        :visible.sync="CFlevel"
        width="420px"
        class="createFlevel"
        :close-on-click-modal="false">
        <span>分区名称</span>
        <el-input v-model="Flevel" placeholder="请输入一级分区名称"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="CFlevel = false">取 消</el-button>
            <el-button type="primary" @click="CFlevel = false">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 设置分区 -->
    <el-dialog
        title="设置"
        :visible.sync="Setleveldialog"
        width="420px"
        class="createFlevel">
        <el-form label-position="top" label-width="80px" :model="SetLevel" ref="SetLevel" :rules="SetLevelrule">
          <el-form-item label="修改分区名称" prop="zonename">
            <el-input v-model="SetLevel.zonename"></el-input>
          </el-form-item>
          <el-form-item label="移动到其他分区" prop="movezone">
            <!-- <el-input v-model="SetLevel.movezonelist"></el-input> -->
            <el-select v-model="SetLevel.movezone" placeholder="请选择">
              <el-option
                v-for="item in SetLevel.movezonelist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="Setleveldialog = false">取 消</el-button>
            <el-button type="primary" @click="SetOkzone">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 业态产品设置 -->
    <!-- <SetFormat ref="setFormat"></SetFormat> -->
  </div>
</template>
<script>
import { FormatList, GoodsList,BlocInfo,GoodIns } from "@/api/index";
import SetFormat from '@/views/ProductGroup/setFormat.vue';
export default {
  name: "ProductGroup",
  components:{SetFormat},
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
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
              children: [
                {
                  id: 39,
                  date: "2016-05-01",
                  name: "王小虎",
                  address: "上海市普陀区金沙江路 1519 弄"
                }
              ]
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      CFlevel:false,
      leveltitle:'创建一级分区',
      Flevel:'',
      Setleveldialog:false,
      SetLevel:{
        zonename:"",
        movezone:"",
        movezonelist:[
          {
            value: 'beijing',
            label: '北京'
          }
        ]
      },
      SetLevelrule:{
        zonename:[{ required: true, message: '请输入分区名称', trigger: 'blur' }],
        movezone:[{ required: true, message: '请选择修改的分区', trigger: 'change'}]
      }

    };
  },
  mounted() {
    this.GroupId=this.$route.query.id;
    //获取业态列表
    BlocInfo({id:this.GroupId}).then(res=>{
        this.formatlist=res.data.data.instates;
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
    //设置分区
    Setlevel(row){
      this.Setleveldialog=true;
    },
    //设置修改分区保存
    SetOkzone(){
      this.$confirm('是否重新设置分区?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs['SetLevel'].validate((valid) => {
          if (valid) {
            this.$message.success("分区设置成功！")
            this.Setleveldialog=false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        }).catch(() => {
          this.$message.info("已取消设置该分区！")
        });
    },
    Setzone(row){
      this.Setlevel=true;
    },
    //跳转门店
    OpenStore(row,event,column){
      this.$router.push({
        name: 'Storeshop',
        query: {
            id: row.id
        }
      });
    },
    // 业态产品设置
    set(){
      this.$refs['setFormat'].mask=true;
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
  .createFlevel{
    .el-dialog{
        margin-top: 30vh!important;
        height: auto;
        .el-dialog__body{
            padding: 20px;
            span{
                margin-bottom: 10px;
                color: #666666;
                display: inline-block;
            }
            .el-form-item__label{
              line-height: inherit;
            }
        }
    }
    .el-form-item__label{
      line-height: inherit;
    }
  }
}
</style>