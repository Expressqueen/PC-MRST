<template>
  <div class="Storeshop">
    <div class="storehead">
      <ul>
        <li class="selectcaster">
          <img :src="Blocimg" alt class="blocimg" />
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
                @check-change="handleClick"
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
      <div class="clearfix">
        <el-input
          placeholder="输入名称/编码搜索"
          prefix-icon="el-icon-search"
          v-model="SearchStore"
          class="SearchStore"
        ></el-input>
      </div>
      <el-table :data="tableData" style="width: 100%" :max-height="tableheight">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Storeshop",
  components: { Treeselect },
  data() {
    return {
      Blocimg:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      value: null,
      // define options
      options: [
        {
          id: "a",
          label: "a",
          children: [
            {
              id: "aa",
              label: "aa"
            },
            {
              id: "ab",
              label: "ab",
              children: [
                {
                  id: "abc",
                  label: "abc"
                }
              ]
            }
          ]
        },
        {
          id: "b",
          label: "b"
        },
        {
          id: "c",
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
  mounted() {
    this.tableheight =
      document.getElementsByClassName("storebody")[0].clientHeight - 90;
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
    Selectnode(data, node, obj) {
    },
    handleClick(data, checked, node) {
      this.showareatitle = "";
      // this.i++;
      // if (this.i % 2 === 0) {
      //   if (checked) {
      //     this.$refs.areatree.setCheckedNodes([]);
      //     this.$refs.areatree.setCheckedNodes([data]);
      //     //交叉点击节点
      //   } else {
      //     this.$refs.areatree.setCheckedNodes([]);
      //     //点击已经选中的节点，置空
      //   }
      // }

      //获取当前选中的父级+子集数据
      // let getnodes = this.$refs.areatree
      //   .getHalfCheckedNodes()
      //   .concat(this.$refs.areatree.getCheckedNodes());
      // getnodes.forEach(ele => {
      //   this.showareatitle += ele.label + "/";
      // });
      // console.log(this.getParentTag(event.currentTarget));
    },
    //获取所有的父元素

    getParentTag(startTag, parentTagList = []) {
      // 传入标签是否是DOM对象
      if (!(startTag instanceof HTMLElement)) return console.error('receive only HTMLElement');
      // 父级标签是否是body,是着停止返回集合,反之继续
      if ('BODY' !== startTag.parentElement.nodeName) {
        // 放入集合
        parentTagList.push(startTag.parentElement.innerText)
        // 再上一层寻找
        return this.getParentTag(startTag.parentElement, parentTagList)
      }
      // 返回集合,结束
      else return parentTagList;
 
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
  .storebody {
    background: #fff;
    height: calc(100% - 100px);
    margin-top: 20px;
    padding: 30px 30px 0 30px;
    .clearfix {
      margin-bottom: 20px;
      .SearchStore {
        width: 320px;
      }
    }
  }
}
.droparea {
  // padding: 15px;
  .el-input {
    margin-bottom: 10px;
  }
  .el-tree-node__content {
    height: 40px;
  }
}
</style>