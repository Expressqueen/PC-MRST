<template>
  <div class="ProductZone">
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :show-header="false"
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
    <!-- 创建一级分区 -->
    <el-dialog
      :title="leveltitle"
      :visible.sync="CFlevel"
      width="420px"
      class="createFlevel"
      :close-on-click-modal="false"
    >
      <span>分区名称</span>
      <el-input v-model="Flevel" placeholder="请输入一级分区名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="CFlevel = false">取 消</el-button>
        <el-button type="primary" @click="CFlevel = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置分区 -->
    <el-dialog title="设置" :visible.sync="Setleveldialog" width="420px" class="createFlevel">
      <el-form
        label-position="top"
        label-width="80px"
        :model="SetLevel"
        ref="SetLevel"
        :rules="SetLevelrule"
      >
        <el-form-item label="修改分区名称" prop="zonename">
          <el-input v-model="SetLevel.zonename"></el-input>
        </el-form-item>
        <el-form-item label="移动到其他分区" prop="movezone">
          <el-select v-model="SetLevel.movezone" placeholder="请选择">
            <el-option
              v-for="item in SetLevel.movezonelist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Setleveldialog = false">取 消</el-button>
        <el-button type="primary" @click="SetOkzone">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      CFlevel: false,
      leveltitle: "创建一级分区",
      Flevel: "",
      Setleveldialog: false,
      SetLevel: {
        zonename: "",
        movezone: "",
        movezonelist: [
          {
            value: "beijing",
            label: "北京"
          }
        ]
      },
      SetLevelrule: {
        zonename: [
          { required: true, message: "请输入分区名称", trigger: "blur" }
        ],
        movezone: [
          { required: true, message: "请选择修改的分区", trigger: "change" }
        ]
      },
      tableData: [
        {
          id: 123,
          date: "百灵分区",
          children: [
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
          ]
        }
      ]
    };
  },
  methods: {
    //创建下级分区
    CreateClevel(row) {
      this.CFlevel = true;
    },
    //设置分区
    Setzone(row) {
      debugger;
      this.Setleveldialog = true;
    },
    //设置修改分区保存
    SetOkzone() {
      this.$confirm("是否重新设置分区?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs["SetLevel"].validate(valid => {
            if (valid) {
              this.$message.success("分区设置成功！");
              this.Setleveldialog = false;
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消设置该分区！");
        });
    },
    Setzone(row) {
      this.Setleveldialog = true;
    }
  }
};
</script>
<style lang="scss" scope>
.ProductZone {
  .el-link {
    padding: 0 25px;
  }
  .el-table [class*=el-table__row--level] .el-table__expand-icon{
      margin-right: 0;
  }
}
.createFlevel {
  .el-dialog {
    margin-top: 30vh !important;
    height: auto;
    .el-dialog__body {
      padding: 20px;
      padding-top: 68px;
      span {
        margin-bottom: 10px;
        color: #666666;
        display: inline-block;
      }
      .el-form-item__label {
        line-height: inherit;
      }
    }
  }
  .el-form-item__label {
    line-height: inherit;
  }
}
</style>