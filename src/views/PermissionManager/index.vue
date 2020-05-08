<template>
  <div class="PermissionManager">
    <div class="pergroup">
      <div class="psghead clearfix">
        <span class="mark left">权限管理</span>
        <a href="javascript:void(0)" class="temscope right" @click="dialogCreatepermis=true">
          <i class="el-icon-circle-plus-outline"></i>
          创建权限
        </a>
      </div>
      <div class="psbody">
        <el-card class="box-card" v-for="(item,index) in AroList" :key="index">
          <div slot="header" class="clearfix">
            <span>{{item.conname}}</span>
            <p class="regicon right">
              <i class="el-icon-edit blue" @click="EditRole(index)"></i>
              <i class="el-icon-delete red" @click="DelRole(index)"></i>
            </p>
          </div>
          <el-tag
            :key="Tindex"
            v-for="(tag,Tindex) in item.child"
            closable
            :disable-transitions="false"
            @close="CloseTags(tag.id,index,Tindex)"
          >{{tag.conname}}</el-tag>
        </el-card>
      </div>
    </div>

    <!-- 创建权限 -->
    <el-dialog title="创建权限" :visible.sync="dialogCreatepermis" :close-on-click-modal="false">
      <el-form
        :model="Createpermisform"
        label-position="right"
        label-width="80px"
        class="permisform"
        ref="Createpermisform"
      >
        <el-form-item label="父级" prop="Plevel">
          <el-select v-model="Createpermisform.Plevel" placeholder="请选择父级节点">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
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
            <el-option label="导航" value="导航"></el-option>
            <el-option label="操作" value="操作"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="ICON" prop="ICON" style="margin-bottom:10px;">
          <el-checkbox-group v-model="Createpermisform.ICON" @change="SelectICON">
            <el-checkbox label="Image" name="ICONtype" value="Image">图片</el-checkbox>
            <el-checkbox label="Icon" name="ICONtype" value="Icon">font</el-checkbox>
            <el-checkbox label="hasnone" name="ICONtype" value="hasnone">无</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label v-if="showIconType=='Image'">
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
        <el-form-item label="" v-else-if="showIconType=='Icon'">
          <el-input v-model="Createpermisform.iconclass" autocomplete="off" placeholder="选择图标"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="Createpermisform.note" autocomplete="off" placeholder="输入备注"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="Createpermisform.sort" controls-position="right" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click="dialogCreatepermis = false">立即创建</el-button>
          <el-button @click="resetpermis('Createpermisform')">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { ARoRuLi } from "@/api/index";
export default {
  name: "PermissionManager",
  data() {
    return {
      AroList: [],
      dialogCreatepermis: false,
      showIconType:null,
      Createpermisform: {
        Plevel: "",
        name: "",
        path: "",
        showtype: "",
        ICON: [],
        note: "",
        sort: "",
        iconclass:""
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  mounted() {
    this.getAroList();
  },
  methods: {
    //获取当前权限组列表
    getAroList() {
      ARoRuLi().then(res => {
        this.AroList = res.data.data;
      });
    },
    //删除当前权限组下的权限
    CloseTags(tag, pindex, index) {
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.AroList[pindex].child.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //判断当前选择是iCON方式
    SelectICON(value) {
      if (this.Createpermisform.ICON.length > 1)
        this.Createpermisform.ICON.splice(0, 1);
    
      let val=value.join(',');
      this.showIconType=val;
    },
    //点击文件image已上传文件的钩子
    UpReady(file, fileList){
    },
    //上传的Image移除方法
    RemoveImage(file){
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
      padding: 10px 0;
      .mark {
        font-size: 16px;
        font-weight: bold;
        color: #333333;
        i {
          font-weight: bold;
        }
      }
    }
    .psbody {
      margin-top: 15px;
      .el-card {
        margin-bottom: 20px;
        & .el-card.is-always-shadow {
          -webkit-box-shadow: none;
          box-shadow: none;
        }
        .el-card__header {
          padding: 15px;
          background: #fafafa;
        }
      }
      .regicon {
        i {
          // font-weight: bold;
          font-size: 16px;
          cursor: pointer;
        }
        & i:first-child {
          margin-right: 10px;
        }
      }
      .el-tag + .el-tag {
        margin-left: 10px;
      }
    }
  }
  .el-dialog {
    margin-top: 10vh !important;
    height: 80%;
    overflow: auto;
    .permisform {
      width: 490px;
      margin: 0 auto;
      .el-form-item__label {
        color: #666666;
        font-weight: 400;
        padding: 0 20px 0 0;
      }
      .el-input-number {
        width: 100%;
        .el-input__inner{
            text-align: left;
        }
      }
      .upload-demo{
          .el-upload__tip{
              margin: 0;
              line-height: 24px;
          }
      }
    }
  }
}
</style>