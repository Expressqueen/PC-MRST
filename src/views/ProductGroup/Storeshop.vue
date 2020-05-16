<template>
  <div class="Storeshop">
    <div class="storehead">
      <ul>
        <li class="selectcaster">
          <img :src="Blocimg" alt class="blocimg" />
          <i class="el-icon-arrow-right"></i>
          <treeselect
            :options="options"
            :value="value"
            :searchable="false"
          />
        </li>
        <li class="line"></li>
        <li class="storelist">
          <ul>
             <li v-for="(item,index) in storelist" :key="index" 
             :class="{activestore:activestore==index}"
             @click="selectstorelable(index)">{{item.label}}</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="storebody">
        <div class="clearfix">
            <el-input
                placeholder="输入名称/编码搜索"
                prefix-icon="el-icon-search"
                v-model="SearchStore"
                class="SearchStore">
            </el-input>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          :max-height="tableheight">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>
<script>
// import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: "Storeshop",
  components: { Treeselect },
  data() {
    return {
      Blocimg:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      value: null,
        // define options
        options: [ {
          id: 'a',
          label: 'a',
          children: [ {
            id: 'aa',
            label: 'aa',
          }, {
            id: 'ab',
            label: 'ab',
          } ],
        }, {
          id: 'b',
          label: 'b',
        }, {
          id: 'c',
          label: 'c',
        } ],
      storelist:[
        {label:"门店"},
        {label:"节目"},
        {label:"监控"},
        {label:"统计"},
        {label:"开闭店"}
      ],
      activestore:0,
      SearchStore:"",
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableheight:""
    };
  },
  mounted(){
    this.tableheight=document.getElementsByClassName('storebody')[0].clientHeight-90
  },
  methods:{
    selectstorelable(index){
      this.activestore=index;
    }
  }
};
</script>
<style lang="scss">
.Storeshop {
  width: 1320px;
  margin: 0 auto;
  height: 500px;
  height: calc(100vh - 136px);
  margin-top: 40px;
  .storehead {
    background: #fff;
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    ul {
      li {
        display: inline-block;
      }
      .selectcaster {
        .blocimg {
          width: 40px;
          height: 30px;
          vertical-align: middle;
        }
        i.el-icon-arrow-right {
          margin: 0 5px;
          color: #999999;
        }
        .vue-treeselect{
          display: inline-block;
          width: 150px;
          margin-bottom: -12px;
        }
        .el-cascader {
          .el-input__inner {
            border: none;
            // padding: 0;
            color: #000000;
          }
          .el-icon-arrow-down {
            color: #333333;
          }
          .el-icon-arrow-down:before {
            content: "\e78f";
          }
        }
      }
      .line {
        width: 1px;
        height: 24px;
        background: rgba(192, 196, 204, 1);
        vertical-align: middle;
        margin: 0 20px;
      }
      .storelist{
          ul{
              background:#F5F7FA;
              border:1px solid rgba(234, 238, 247, 1);
              border-radius:4px;
              line-height: initial;
              li{
                padding: 10px 20px;
                color: #999999;
                cursor: pointer;
              }
              li.activestore{
                background: #fff;
                color: #333333;
              }
          }
      }
    }
  }
  .storebody {
    background: #fff;
    height: calc(100% - 100px);
    margin-top: 20px;
    padding: 30px 30px 0 30px;
    .clearfix{
      margin-bottom: 20px;
      .SearchStore{
        width: 320px;
      }
    }
  }
}
</style>