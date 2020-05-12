<template>
  <el-dialog title="创建集团" :visible.sync="Addblocdialog" width="960px" :close-on-click-modal="false">
    <el-form
      :model="createBloc"
      label-position="right"
      label-width="110px"
      class="permisform"
      ref="createBloc"
      :rules="Blocformrule"
    >
      <el-form-item label="集团logo" prop="grouplogourl">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          v-loading="loading"
        >
          <img v-if="createBloc.grouplogourl" :src="createBloc.grouplogourl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="集团名称" prop="Groupname">
        <el-input v-model="createBloc.Groupname" autocomplete="off" placeholder="集团名称"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input v-model="createBloc.contact" autocomplete="off" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="contactpone">
        <el-input v-model="createBloc.contactpone" autocomplete="off" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="createBloc.note" autocomplete="off" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="选择业态" prop="formats">
        <el-popover placement="bottom-start" width="390" trigger="click" :ref="`popover`">
            <div class="droplist">
                <ul class="el-scrollbar__view el-select-dropdown__list">
                    <li v-for="(item,index) in createBloc.formatsList" :key="index" 
                    :class="[{selected:item.selectli},'el-select-dropdown__item']"
                    @click="Selectformat(item)">
                        {{item.name}}
                        <i class="el-icon-check right" v-show="item.selectli"></i>
                    </li>
                </ul>
                <el-row style="padding:0 10px;text-align:right">
                    <el-button type="primary" size="small" @click="showformat">确定</el-button>
                    <el-button size="small" @click="cancleformat">取消</el-button>
                </el-row>
            </div>
            <div slot="reference" class="likeinput clearfix">
                <el-tag
                v-for="tag in createBloc.formats"
                :key="tag.id"
                closable
                size="mini">
                {{tag.name}}
                </el-tag>
                <i slot="suffix" class="el-icon-arrow-down right"></i>
            </div>
        </el-popover>
      </el-form-item>
      <el-form-item label="集团运营部门" prop="Groupdivison">
        <el-select v-model="createBloc.Groupdivison">
          <el-option value>测试</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label style="margin-top:30px">
        <el-button type="primary" @click="Addblocdialog = false">立即创建</el-button>
        <el-button @click="Addblocdialog = false">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { FormatList } from "@/api/index";
export default {
  data() {
    return {
      Addblocdialog: true,
      createBloc: {
        grouplogourl: "",
        Groupname: "",
        contact: "",
        contactpone: "",
        note: "",
        formats: [],
        formatsList: [],
        Groupdivison: "",
        GroupdivisonList: []
      },
      Blocformrule: {
        grouplogourl: [
          { required: true, message: "请上传集团logo", trigger: "blur" }
        ],
        Groupname: [
          { required: true, message: "请输入集团名称", trigger: "blur" }
        ],
        formats: [
        //   { required: true, message: "请至少选择一个业态", trigger: "blur" }
        ]
      },
      // Blocformrule:{
      //     grouplogourl:[{required:true,message}]
      // },
      loading: false,
      selectlist:[]
    };
  },
  mounted() {
    FormatList().then(res => {
      this.createBloc.formatsList = res.data.data;
    });
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.createBloc.grouplogourl = URL.createObjectURL(file.raw);
      this.loading = false;
    },
    beforeAvatarUpload(file) {
      this.loading = true;
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    },
    //选择业态
    Selectformat(item){
        item.selectli=!item.selectli;
        this.$forceUpdate();
        this.getChecklist(item);
    },
    //判断点击选中后增加到业态选中
    getChecklist(item){
        if(JSON.stringify(this.selectlist).indexOf(JSON.stringify(item)) === -1){
            this.selectlist.push(item);
        }else{
            this.selectlist=this.selectlist.filter(t=>t.id!=item.id);
        }
    },
    //点击确定将选择的业态加入展示框中
    showformat(){
        this.$confirm('是否确定选择这些业态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.createBloc.formats=this.selectlist;
          this.$message({
            type: 'success',
            message: '选择业态成功!'
          });
          this.$refs[`popover`].doClose();
          this.$forceUpdate();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改选择业态'
          });
          //获取上次选择的数据
          this.selectlist=this.createBloc.formats.filter(item=>item.selectli=true);
          this.$forceUpdate();
        });
    },
    cancleformat(){
        this.$confirm('是否选择这些业态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
            this.createBloc.formats=[];
            this.selectlist=[];
            this.createBloc.formatsList.forEach(ele=>{
                ele.selectli=null;
            })
            this.$forceUpdate();
          this.$message({
            type: 'success',
            message: '已取消业态选择!'
          });
          this.$refs[`popover`].doClose();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改选择业态'
          });
        });
        
    }
  }
};
</script>
<style lang="scss" scope>
.el-popover.el-popper{
      padding: 0;
      .droplist{
          ul{
            padding: 0;
            height: 200px;
            overflow-y: auto;
            li{
                i{
                    line-height: 34px;
                }
            }
        }
        .el-row{
            margin: 10px 0;
            padding: 0 10px;
            text-align: right;
        }
    }
  }
.el-dialog {
  margin-top: 7.5vh !important;
  height: 85%;
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
    .likeinput{
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        padding: 0 10px;
        i.el-icon-arrow-down{
            line-height: 40px;
        }
        .el-tag{
            margin-right: 10px;
        }
    }
  }
  
  .el-dialog__body {
    overflow: auto;
    height: calc(100% - 50px);
  }
  .el-dialog__footer {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>