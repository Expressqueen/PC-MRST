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
            v-model="showPerims"
          >
            <template slot="title">
              {{item.conname}}<i class="el-icon-edit  blue" style="margin:0 5px 0 10px" @click.stop="EditRole(item.id)"></i>
              <i class="el-icon-delete red" style="margin:0 5px" @click.stop="DelRole(item.id)"></i>
            </template>
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
    <el-dialog :title="Pretitle" :visible.sync="dialogCreatepermis" :close-on-click-modal="false" width="960" @close="resitpermis">
      <el-form
        :model="Createpermisform"
        label-position="right"
        label-width="90px"
        class="permisform"
        ref="Createpermisform"
        :rules="permisformrule"
      >
        <el-form-item label="父级" prop="pid">
          <el-select v-model="Createpermisform.pid" placeholder="请选择父级节点" :disabled="isEdit">
            <el-option
              v-for="(item,index) in Createpermisform.PlevelList"
              :key="index"
              :label="item.conname"
              :value="item.pid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="conname">
          <el-input v-model="Createpermisform.conname" autocomplete="off" placeholder="中文名称"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="route">
          <el-input
            v-model="Createpermisform.route"
            autocomplete="off"
            placeholder="输入模块/控制器/方法即可 例如 admin/Rule/index"
          ></el-input>
        </el-form-item>
        <el-form-item label="展示方式" prop="dis">
          <el-select v-model="Createpermisform.dis" placeholder="请选择展示方式">
            <el-option label="操作" value="1"></el-option>
            <el-option label="导航" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="ICON" prop="icon">
          <el-checkbox-group v-model="Createpermisform.icon" @change="SelectICON">
            <el-checkbox label="1" name="ICONtype" value="1">图片</el-checkbox>
            <el-checkbox label="2" name="ICONtype" value="2">font</el-checkbox>
            <el-checkbox label="3" name="ICONtype" value="3">无</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 选择图片时显示 -->
        <el-form-item label v-if="showIconType=='1'">
          <el-upload
            class="upload-demo"
            ref="uploadImg"
            action="string"
            :file-list="fileList"
            :http-request="UploadImg"
            :on-success="fileSuccess"
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
              v-model="Createpermisform.font"
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
              <GetIcon :Seticonclass.sync="Createpermisform.font"></GetIcon>
            </div>
          </el-popover>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="Createpermisform.remark" autocomplete="off" placeholder="输入备注"></el-input>
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
  SearchARuCrUp,
  Filetool
} from "@/api/index";
import { _debounce } from '@/utils/index'
import GetIcon from "@/components/SetIcon";
export default {
  name: "PermissionManager",
  components: { GetIcon },
  data() {
    //路径限制
    let routePass=(rule, value, callback)=>{
      if (value === "") {
        callback(new Error("请输入路径"));
      }
      else {
        if (value !== '') {
          var reg=/^[A-Za-z0-9/?=]+$/;
          if(!reg.test(value)){
            callback(new Error('请输入正确的路径'));
          }
        }
        callback();
      }
    };
    //排序限制
    let sortPass=(rule, value, callback)=>{
      if (value === "") {
        callback(new Error("请输入排序"));
      }
      else {
        if (value !== '') {
          var reg=/^[0-9]{1,4}$/;
          if(!reg.test(value)){
            callback(new Error('最大输入位数为4位'));
          }
        }
        callback();
      }
    };
    return {
      AroList: [],
      showPerims: "", //当前操作的权限面板
      dialogCreatepermis: false,
      showIconType: null,
      // selecticonclass: "",
      Pretitle: "创建权限",
      ButtonroleId: "",
      isEdit:false,
      Createpermisform: {
        pid: "",
        PlevelList: [],
        conname: "",
        route: "",
        dis: "",
        icon: [],
        img:"",
        font:"",
        remark: "",
        sort: ""
      },
      permisformrule: {
        pid: [{ required: true, message: "请选择父级", trigger: "change" }],
        conname: [{ required: true, message: "请填写权限名称", trigger: "blur" }],
        route: [{ validator: routePass, trigger: "blur",required:true }],
        dis: [{ required: true, message: "请选择展示方式", trigger: "change" }],
        icon: [{required: true, message: "请至少选择一个图标", trigger: "change"}],
        sort: [{ required: true, validator:sortPass, trigger: "blur" }]
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
      this.isEdit=false;
    },
    //修改权限
    EditRole:_debounce(function(_type, index, item){
      this.Pretitle = "编辑权限";
      this.isEdit=true;
      let pid=_type;
      if(_type instanceof Object){
        pid=this.ButtonroleId;
        if (this.ButtonroleId == "") {
          this.$message.warning("请选择要编辑的权限");
          return
        }
      }else{
        this.ButtonroleId=pid;
      }
      this.dialogCreatepermis = true;
      this.getDancleInfo(this.ButtonroleId);
    }),
    // },
    //获取单个权限信息
    getDancleInfo(pid) {
      let rule_id=this.ButtonroleId;
      SearchARuCrUp({ rule_id:rule_id }).then(res => {
        let PlevelList=this.Createpermisform.PlevelList;
        this.Createpermisform=res.data.data[0];
        this.Createpermisform.PlevelList=PlevelList;
        this.fileList.url=res.data.data[0].img;
        this.Createpermisform.icon=[this.Createpermisform.icon+''];
        this.SelectICON(this.Createpermisform.icon);
      }).catch(err=>{
        this.$message.error("权限列表获取失败");
      });
    },
    //删除当前权限组下的权限
    DelRole:_debounce(function(_type, index, item){
      let rule_id=_type;
      if(_type instanceof Object){
        if (this.ButtonroleId == "") {
          this.$message.warning("请选择要操作的权限");
          return;
        }else{
          rule_id=this.ButtonroleId;
        }
      }
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DelARuDe({ rule_id: rule_id }).then(res => {
            this.$message.success("权限删除成功");
            this.getAroList();
            this.ButtonroleId = "";
          }).catch(err=>{
            this.$message.error("权限删除失败");
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    }),
    //获取当前选中的SelectRole
    SelectRole(tagid, pindex, index) {
      this.showPerims = pindex;
      this.ButtonroleId = tagid;
    },
    //判断当前选择是iCON方式
    SelectICON(value) {
      if (value.length > 1)
        value.splice(0, 1);
      let val = value.join(",");
      this.showIconType = val;
      if(val!="2")
      this.Createpermisform.font="";
      if(val!="1")
      this.Createpermisform.img="";
    },
    //上传文件
    UploadImg(param){
      let params = new FormData()
      params.append('JuRule', param.file)
      Filetool(params).then(res => {
        this.$message.success(res.data.msg);
        this.Createpermisform.img=res.data.data;
        param.onSuccess()  // 上传成功的图片会显示绿色的对勾
      }).catch(err=>{
        param.onError()
      })
    },
    //上传成功修改fileList
    fileSuccess(response, file, fileList){
      this.$refs.uploadImg.clearFiles() //清除文件对象
      this.fileList = [{name: file.name, url: file.url}] // 重新手动赋值filstList， 免得自定义上传成功了, 而fileList并没有动态改变， 这样每次都是上传一个对象
    },
    //权限添加
    Primsmannage() {
      this.$refs["Createpermisform"].validate(valid => {
        if (valid) {
          let params=this.Createpermisform;
          params.icon=this.Createpermisform.icon.join(",")
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
              this.$refs.Createpermisform.resetFields();
            }).catch(err=>{
              this.$message.error("权限编辑失败!");
            });
          }
        } else {
          this.$message.error("权限页面验证失败");
          return false;
        }
      });
    },
    //弹出层右上角关闭清空表单
    resitpermis(){
      this.$refs['Createpermisform'].resetFields();
    },
    //重置表单
    resetpermis(formName) {
      this.$refs[formName].resetFields();
      if (this.Pretitle == "编辑权限") {
        this.getDancleInfo();
      }else{
        this.showIconType=null;
      }
    }
  }
};
</script>
<style lang="scss" scoped="">
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
  .el-collapse{
    border: none;
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
