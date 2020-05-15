<template>
  <div class="Storeshop">
    <div class="storehead">
      <ul>
        <li class="selectcaster">
          <img :src="Blocimg" alt class="blocimg" />
          <i class="el-icon-arrow-right"></i>
          <el-cascader :options="options">
            <template slot-scope="{ node, data }">
              <span>{{ data.label }}</span>
              <span v-if="!node.isLeaf">({{ data.children.length }})</span>
            </template>
          </el-cascader>
        </li>
        <li class="line"></li>
        <li class="storelist">
          <ul>
              <li>门店</li>
              <li>节目</li>
              <li>监控</li>
              <li>统计</li>
              <li>开闭店</li>
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
                class="SearchStore left">
            </el-input>
            <el-button type="primary" icon="el-icon-circle-plus-outline" class="right">主要按钮</el-button>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Storeshop",
  data() {
    return {
      Blocimg:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      SearchStore:""
    };
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
    // line-height: 80px;
    padding: 20px 20px 0 20px;
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
              li{
                padding: 10px 20px;
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
    .SearchStore{
        width: 320px;
    }
  }
}
</style>