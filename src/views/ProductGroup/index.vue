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
            >
              <span>产品列表</span>
            </li>
            <li name="zone" :class="{active:activeName=='zone'}" @click="ResPruList('zone')">
              <span>分区</span>
            </li>
            <li name="Store" :class="{active:activeName=='Store'}" @click="ResPruList('Store')">
              <span>门店</span>
            </li>
          </ul>
          <!-- 业态产品操作 -->
          <span class="right" v-show="activeName=='Pruclist'" @click="set()">
            <i class="el-icon-s-tools"></i>业态产品设置
          </span>
          <!-- 分区操作 -->
          <span class="right" v-show="activeName=='zone'" @click="CFlevel=true">
            <i class="el-icon-circle-plus"></i>创建一级分区
          </span>
          <!-- 门店操作 -->
          <el-row class="right Storereg" v-show="activeName=='Store'">
            <span @click="Createstore()">
              <i class="el-icon-circle-plus"></i>创建门店
            </span>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                筛选
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="dropdialog">
                <el-form label-position="top" label-width="80px" :model="Screenform" class="Screenform">
                  <el-form-item label="名称">
                    <el-input v-model="Screenform.name"></el-input>
                  </el-form-item>
                  <el-form-item label="编码">
                    <el-input v-model="Screenform.code"></el-input>
                  </el-form-item>
                  <el-form-item label="分区">
                    <el-input v-model="Screenform.zone"></el-input>
                  </el-form-item>
                </el-form>
                <el-row style="text-align: right;">
                  <el-button>取消</el-button>
                  <el-button type="primary">确定</el-button>
                </el-row>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                设置
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-row>
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
                  <button type="button" class="maskbutton" v-for="(Citem,Cindex) in item.children">
                    {{Citem.intro}}
                  </button>
                </div>
                <p class="title">
                  <span>{{item.name}}</span>
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link" :popper-append-to-body="false">
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
            <img src="../../assets/images/slice.png" alt />
            <p>暂未绑定产品</p>
          </div>
        </div>
        <!-- 分区 -->
        <ProductZone v-show="activeName=='zone'"></ProductZone>
        <!-- 门店 -->
        <ShopList v-show="activeName=='Store'" :show="true" ref="Shoplist"></ShopList>
      </div>
    </div>

    <!-- 业态产品设置 -->
    <SetFormat ref="setFormat"></SetFormat>
    <CreateStore ref="createStore"></CreateStore>
  </div>
</template>
<script>
import { FormatList, GoodsList, BlocInfo, GoodIns,Storelist } from "@/api/index";
import SetFormat from "@/views/ProductGroup/setFormat.vue";
import ProductZone from "@/views/ProductGroup/ProductZone";
import ShopList from "@/views/ProductGroup/Shoplist";
import CreateStore from "@/views/ProductGroup/createStore";
export default {
  name: "ProductGroup",
  components: { SetFormat, ProductZone, ShopList, CreateStore },
  data() {
    return {
      activeName: "Store",
      GroupId: "",
      instate_id:"",
      src:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      goodlist: [],
      formatlist: [],
      activemenu: 0,
      imgcurrent: 0,
      imgseen: false,
      maskDialog: true,
      storemask:true,
      Screenform:{ //筛选门店
        name:"",
        code:"",
        zone:""
      },
      productId:0,
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
      },
      maskDialog:true
    };
  },
  mounted() {
    this.GroupId = this.$route.query.id;
    //获取业态列表
    BlocInfo({id:this.GroupId}).then(res=>{
        this.formatlist=res.data.data.instates;
        this.productId = res.data.data.instates[0].id;
        // if(this.formatlis.length>0)
        //获取业态产品列表
        this.TabPromenu(this.formatlist[this.activemenu].id,0)
        // this.getBlocList(this.GroupId,this.formatlist[this.activemenu].id);
    })

  },
  methods: {
    //获取当前业态下的产品列表
    getBlocList(cyid, insid) {
      GoodIns({ cyid: cyid, insid: insid }).then(res => {
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
      this.instate_id=id;
      this.productId=id;
      switch (this.activeName){
        case 'Pruclist':
          this.getBlocList(this.GroupId, id);
        break;
        case 'zone':
        break;
        case 'Store':
           this.getStorelist(this.GroupId,id);
        break
      }
      // this.getBlocList(this.GroupId, id);
    },
    //产品分区切换
    ResPruList(name) {
      this.activeName = name;
      switch (this.activeName){
        case 'Pruclist':
          this.getBlocList(this.GroupId, this.formatlist[this.activemenu].id);
        break;
        case 'zone':
        break;
        case 'Store':
           this.getStorelist(this.GroupId, this.formatlist[this.activemenu].id);
        break
      }
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
    OpenStore(item) {
      this.$router.push({
        name: "Storeshop",
        query: {
          id: item.id
        }
      });
    },
    // 业态产品设置
    set() {
      this.$refs["setFormat"].maskDialog = true;
    },
    //获取门店列表
    getStorelist(cyid,instateid,areid){
      let params={
        cyid:Number(cyid),
        instateid:instateid,
        areid:Number(areid)
      }
      Storelist(params).then(res=>{
        this.$refs['Shoplist'].shoplistdata=res.data.data;
      })
    },
    set(){
      this.$refs['setFormat'].maskDialog=true;
      this.$refs['setFormat'].getGood();
      this.$refs['setFormat'].getDivision();
      this.$refs['setFormat'].productId=this.productId;
      this.$refs['setFormat'].GroupId=this.GroupId;
      this.$refs['setFormat'].goodlist=this.goodlist;
    },
    //创建门店
    Createstore(){
      this.$refs['createStore'].storemask=true;
      this.$refs['createStore'].cyid=this.GroupId;
      this.$refs['createStore'].instateid=this.formatlist[this.activemenu].id;
    }
  }
};
</script>
<style lang="scss" scope>
.dropdialog{
  padding:20px;
  .el-form-item__label{
    line-height: inherit;
    color: #666;
    font-weight: 400;
  }
}
.Screenform{
  width: 290px;
}
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
  .NullPruc {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    color: #999999;
    margin-top: -120px;
    // margin-left: -120px;
    p {
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
            span {
              border-bottom: 4px solid #096dd9;
              padding-bottom: 6px;
            }
          }
        }
        .Storereg{
          .el-dropdown{
            margin-left: 30px;
          }
        }
      }
      .resprulist {
        display: flex;
        flex-wrap: wrap;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        // justify-content: space-between;
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
          div.listbox {
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
      .rezonelist {
        .has-gutter {
          th {
            background: #f5f7fa;
          }
        }
        .cell {
          .el-link {
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
