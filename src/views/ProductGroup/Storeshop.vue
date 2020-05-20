<template>
  <div class="Storeshop">
    <div class="storehead">
      <ul>
        <li class="selectcaster">
          <img :src="Blocimg" alt class="blocimg" />
          <i class="el-icon-arrow-right"></i>
          <span>大卖场</span>
          <i class="el-icon-arrow-right"></i>
          <el-popover placement="bottom-start" width="400" trigger="click">
            <div class="droparea">
              <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="Slevelarea"></el-input>
              <el-tree
                :data="options"
                node-key="id"
                default-expand-all
                draggable
                :expand-on-click-node="false"
                :filter-node-method="filetrArea"
                :check-on-click-node="true"
                ref="areatree"
                check-strictly
                show-checkbox
                @node-click="Selectnode"
              ></el-tree>
            </div>
            <p slot="reference" class="levelarea">
              <span>{{showareatitle}}</span>
              <i class="el-icon-caret-bottom"></i>
            </p>
          </el-popover>
        </li>
        <li class="line"></li>
        <li class="storelist">
          <ul>
            <li
              v-for="(item,index) in storelist"
              :key="index"
              :class="{activestore:activestore==index}"
              @click="selectstorelable(index)"
            >{{item.label}}</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="storebody">
      <ShopList :show="false"></ShopList>
    </div>
  </div>
</template>
<script>
import ShopList from '@/views/ProductGroup/Shoplist'
export default {
  name: "Storeshop",
  components:{ShopList},
  data() {
    return {
      Blocimg:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      value: null,
      options: [
        {
          id: "1",
          label: "a",
          children: [
            {
              id: "1-1",
              label: "aa"
            },
            {
              id: "1-2",
              label: "ab",
              children: [
                {
                  id: "1-2-1",
                  label: "abc"
                }
              ]
            }
          ]
        },
        {
          id: "2",
          label: "b"
        },
        {
          id: "3",
          label: "c"
        }
      ],
      storelist: [
        { label: "门店" },
        { label: "节目" },
        { label: "监控" },
        { label: "统计" },
        { label: "开闭店" }
      ],
      activestore: 0,
      SearchStore: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      tableheight: "",
      Slevelarea: "",
      showareatitle: "",
      i:0
    };
  },
  watch: {
    Slevelarea(val) {
      this.$refs.areatree.filter(val);
    }
  },
  methods: {
    selectstorelable(index) {
      this.activestore = index;
    },
    filetrArea(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //节点选中事件
    Selectnode(data,node,ele){
      this.$refs.areatree.setCheckedNodes([]);
      this.$refs.areatree.setCheckedNodes([data]);
      this.showareatitle=this.findPnodeId(this.options,data.id);
    },
    findPnodeId(array, id){
        let stack = [];
            let going = true;
            let walker = (array, id) => {
                array.forEach(item => {
                    if (!going) return;
                    stack.push(item['label']);
                    if (item['id'] === id) {
                        going = false;
                    } else if (item['children']) {
                        walker(item['children'], id);
                    } else {
                        stack.pop();
                    }
                });
                if (going) stack.pop();
            }
            walker(array, id);
            return stack.join('/');

    }
    
  }
};
</script>
<style lang="scss" scope>
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

        .levelarea {
          display: inline-block;
          line-height: 0;
          span {
            display: inline-block;
            width: 140px;
            margin-right: 5px;
            line-height: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        & .levelarea {
          outline: none;
        }
        .el-cascader {
          .el-input__inner {
            border: none;
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
      .storelist {
        ul {
          background: #f5f7fa;
          border: 1px solid rgba(234, 238, 247, 1);
          border-radius: 4px;
          line-height: initial;
          li {
            padding: 10px 20px;
            color: #999999;
            cursor: pointer;
          }
          li.activestore {
            background: #fff;
            color: #333333;
          }
        }
      }
    }
  }
  .storebody{
    margin-top: 20px;
  }
}
.droparea {
  // padding: 15px;
  .el-input {
    margin-bottom: 10px;
  }
  .el-tree-node__content {
    height: 40px;
    position: relative;
    .el-checkbox{
      position: absolute;
      right: 0;
      .el-checkbox__input .el-checkbox__inner{
        background: none;
        border: none;
      }
      .el-checkbox__inner::after{
        width: 7px;
        height: 11px;
        border-color: #096DD9;
        top: -2px;
      }
    }
  }
  .el-tree-node.is-expanded.is-current.is-focusable.is-checked>.el-tree-node__content{
    background: #F5F7FA;
  }
}
</style>
