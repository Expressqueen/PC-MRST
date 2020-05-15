<template>
  <div class="PermissionManager">
    <div class="pergroup">
      <div class="psghead clearfix">
        <span class="mark left">权限管理</span>
        <el-row class="right">
          <el-button type="primary" @click="AddRole">
            <i class="el-icon-circle-plus-outline"></i>创建权限
          </el-button>
          <el-button type="warning" @click="EditRole">
            <i class="el-icon-edit"></i>编辑权限
          </el-button>
          <el-button type="danger" @click="DelRole">
            <i class="el-icon-delete"></i>删除
          </el-button>
        </el-row>
      </div>
      <div class="psbody">
        <el-collapse>
          <el-collapse-item
            v-for="(item,index) in AroList"
            :key="index"
            :name="index"
            :title="item.conname"
            v-model="showPerims"
          >
            <el-row>
              <el-button
                type="primary"
                plain
                :key="Tindex"
                size="small"
                v-for="(tag,Tindex) in item.child"
                @click="SelectRole(tag.id,index,Tindex)"
                :class="{Sbtn:ButtonroleId==tag.id}"
              >{{tag.conname}}</el-button>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <!-- 创建权限 -->
    <el-dialog :title="Pretitle" :visible.sync="dialogCreatepermis" :close-on-click-modal="false" width="960">
      <el-form
        :model="Createpermisform"
        label-position="right"
        label-width="90px"
        class="permisform"
        ref="Createpermisform"
        :rules="permisformrule"
      >
        <el-form-item label="父级" prop="Plevel">
          <el-select v-model="Createpermisform.Plevel" placeholder="请选择父级节点" :disabled="isEditplevel">
            <el-option
              v-for="(item,index) in Createpermisform.PlevelList"
              :key="index"
              :label="item.conname"
              :value="item.pid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="Createpermisform.name" autocomplete="off" placeholder="中文名称"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input
            v-model="Createpermisform.path"
            autocomplete="off"
            placeholder="输入模块/控制器/方法即可 例如 admin/Rule/index"
          ></el-input>
        </el-form-item>
        <el-form-item label="展示方式" prop="showtype">
          <el-select v-model="Createpermisform.showtype" placeholder="请选择展示方式">
            <el-option label="操作" value="1"></el-option>
            <el-option label="导航" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="ICON" prop="ICON">
          <el-checkbox-group v-model="Createpermisform.ICON" @change="SelectICON">
            <el-checkbox label="1" name="ICONtype" value="1">图片</el-checkbox>
            <el-checkbox label="2" name="ICONtype" value="2">font</el-checkbox>
            <el-checkbox label="3" name="ICONtype" value="3">无</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 选择图片时显示 -->
        <el-form-item label v-if="showIconType=='1'">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="UpReady"
            :on-remove="RemoveImage"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary" plain>点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
        </el-form-item>
        <!-- 选择Icon时显示 -->
        <el-form-item label v-else-if="showIconType=='2'">
          <el-popover placement="bottom-end" width="450" trigger="click" :ref="`popover`">
            <el-input
              slot="reference"
              v-model="selecticonclass"
              autocomplete="off"
              placeholder="选择图标"
            ></el-input>
            <div class="SetIcon">
              <div class="Iconhead clearfix">
                <p class="left">选择图标</p>
                <p class="right" @click="$refs[`popover`].doClose()">
                  <i class="el-icon-close"></i>
                </p>
              </div>
              <GetIcon :Seticonclass.sync="selecticonclass"></GetIcon>
            </div>
          </el-popover>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="Createpermisform.note" autocomplete="off" placeholder="输入备注"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="Createpermisform.sort" controls-position="right" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click="Primsmannage">立即创建</el-button>
          <el-button @click="resetpermis('Createpermisform')">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  getPerlist,
  SARuCrLi,
  AddARuCrLi,
  EditARuCrUp,
  DelARuDe,
  SearchARuCrUp
} from "@/api/index";
import GetIcon from "@/components/SetIcon";
export default {
  name: "PermissionManager",
  components: { GetIcon },
  data() {
    return {
      AroList: [],
      showPerims: "", //当前操作的权限面板
      dialogCreatepermis: false,
      showIconType: null,
      selecticonclass: "",
      Pretitle: "创建权限",
      ButtonroleId: "",
      Createpermisform: {
        Plevel: "",
        PlevelList: [],
        name: "",
        path: "",
        showtype: "",
        ICON: [],
        note: "",
        sort: ""
      },
      permisformrule: {
        Plevel: [{ required: true, message: "请选择父级", trigger: "change" }],
        name: [{ required: true, message: "请填写权限名称", trigger: "blur" }],
        path: [{ required: true, message: "请填写路径", trigger: "blur" }],
        showtype: [
          { required: true, message: "请选择展示方式", trigger: "change" }
        ],
        ICON: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个图标",
            trigger: "change"
          }
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }]
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      isEditplevel:false
    };
  },
  mounted() {
    this.getAroList();
    this.getParentNode();
  },
  methods: {
    //获取当前权限列表
    getAroList() {
      getPerlist().then(res => {
        this.AroList = res.data.data;
      });
    },
    //获取父级节点列表
    getParentNode() {
      SARuCrLi().then(res => {
        this.Createpermisform.PlevelList = res.data.data;
      });
    },
    //创建权限
    AddRole(){
      this.Pretitle = "创建权限";
      this.dialogCreatepermis=true;
      this.isEditplevel=false;
    },
    //修改权限
    EditRole() {
      this.Pretitle = "编辑权限";
      this.isEditplevel=true;
      if (this.ButtonroleId == "") {
        this.$message.warning("请选择要编辑的权限");
      } else {
        this.dialogCreatepermis = true;
        this.getDancleInfo();
      }
    },
    //获取单个权限信息
    getDancleInfo() {
      SearchARuCrUp({ rule_id: this.ButtonroleId }).then(res => {
        let resdata = res.data.data[0];
        this.Createpermisform.Plevel = resdata.pid;
        this.Createpermisform.name = resdata.conname;
        this.Createpermisform.path = resdata.route;
        this.Createpermisform.showtype = resdata.dis + "";
        this.Createpermisform.ICON.push(resdata.icon + "");
        this.SelectICON(this.Createpermisform.ICON);
        // this.fileList.url=resdata.img;
        this.selecticonclass = resdata.font;
        this.Createpermisform.note = resdata.remark;
        this.Createpermisform.sort = resdata.sort;
      });
    },
    //删除当前权限组下的权限
    DelRole() {
      if (this.ButtonroleId == "") {
        this.$message.warning("请选择要操作的权限");
      } else {
        this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            DelARuDe({ rule_id: this.ButtonroleId }).then(res => {
              this.$message.success("权限删除成功");
              this.getAroList();
              this.ButtonroleId = "";
            });
          })
          .catch(() => {
            this.$message.info("已取消删除");
          });
      }
    },
    //获取当前选中的SelectRole
    SelectRole(tagid, pindex, index) {
      this.showPerims = pindex;
      this.ButtonroleId = tagid;
    },
    //判断当前选择是iCON方式
    SelectICON(value) {
      if (this.Createpermisform.ICON.length > 1)
        this.Createpermisform.ICON.splice(0, 1);
      let val = value.join(",");
      this.showIconType = val;
    },
    //点击文件image已上传文件的钩子
    UpReady(file, fileList) {},
    //上传的Image移除方法
    RemoveImage(file) {},
    //权限添加
    Primsmannage() {
      this.$refs["Createpermisform"].validate(valid => {
        if (valid) {
          let icon = this.Createpermisform.ICON.join(",");
          let params = {
              pid: this.Createpermisform.Plevel,
              conname: this.Createpermisform.name,
              route: this.Createpermisform.path,
              dis: this.Createpermisform.showtype,
              icon: icon,
              img: this.fileList[0].url,
              font: this.selecticonclass,
              remark: this.Createpermisform.note,
              sort: this.Createpermisform.sort
          };
          if (this.Pretitle == "创建权限") {
            AddARuCrLi(params).then(res => {
              this.$message.success("权限增加成功");
              this.dialogCreatepermis = false;
              this.getAroList();
              this.resetpermis("Createpermisform");
            });
          } else {
            params.rule_id=this.ButtonroleId;
            EditARuCrUp(params).then(res => {
              this.$message.success("权限编辑成功");
              this.dialogCreatepermis = false;
              this.getAroList();
              this.resetpermis("Createpermisform");
            });
          }
        } else {
          this.$message.error("权限页面验证失败");
          return false;
        }
      });
    },
    //重置表单
    resetpermis(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss">
.PermissionManager {
  width: 960px;
  margin: 0 auto;
  padding: 40px 0;
  height: calc(100vh - 56px);
  .temscope {
    color: #333333;
    i {
      font-size: 16px;
    }
  }
  .pergroup {
    height: 100%;
    padding: 20px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(9, 109, 217, 0.1);
    border-radius: 4px;
    overflow-y: scroll;
    .psghead {
      line-height: 40px;
      .mark {
        font-size: 16px;
        font-weight: bold;
        color: #333333;
      }
      button {
        i {
          margin-right: 5px;
        }
      }
    }
    .psbody {
      margin-top: 15px;
      button {
        border: none;
      }
      button.Sbtn {
        background: #409eff;
        color: #fff;
      }
    }
  }
  .el-dialog {
    margin-top: 10vh !important;
    height: 80%;
    overflow: auto;
    .permisform {
      width: 500px;
      margin: 0 auto;
      .el-form-item__label {
        color: #666666;
        font-weight: 400;
        padding: 0 20px 0 0;
      }
      .el-input-number {
        width: 100%;
        .el-input__inner {
          text-align: left;
        }
      }
      .upload-demo {
        .el-upload__tip {
          margin: 0;
          line-height: 24px;
        }
      }
    }
  }
}
</style>