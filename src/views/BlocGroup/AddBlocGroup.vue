<template>
  <el-dialog title="创建集团" :visible.sync="Addblocdialog" width="960px" :close-on-click-modal="false" @close="CloseBloc">
    <el-form
      :model="createBloc"
      label-position="right"
      label-width="115px"
      class="permisform"
      ref="createBloc"
      :rules="Blocformrule"
    >
      <el-form-item label="集团logo" prop="grouplogourl">
        <!-- <el-upload
            class="avatar-uploader"
            ref="uploadImg"
            action="string"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="UploadImg"
            :on-success="handleAvatarSuccess"
            v-loading="loading"
          >
          <img v-if="createBloc.grouplogourl" :src="createBloc.grouplogourl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
        <up-img :Imgurl.sync="createBloc.grouplogourl" @callvalidImg="handleAvatarSuccess"></up-img>
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
                @close="Closetag(tag)"
                size="mini">
                {{tag.name}}
                </el-tag>
                <i slot="suffix" class="el-icon-arrow-down right"></i>
            </div>
        </el-popover>
      </el-form-item>
      <el-form-item label style="margin-top:30px">
        <el-button type="primary" @click="CreatGroup">立即创建</el-button>
        <el-button @click="RestGroup">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { FormatList,AddBloc,Filetool } from "@/api/index";
import {validTellpone} from '@/utils/validate'
import { _debounce } from '@/utils/index'
import UpImg from '@/views/BlocGroup/UploadImg'
export default {
  components:{UpImg},
  data() {
    let validformats=(rule, value, callback)=>{
      if (value.length==0) {
        callback(new Error("请至少选择一个业态"));
      } else {
        callback();
      }
    };
    let validGroup=(rule, value, callback)=>{
      if (value.length==0) {
        callback(new Error("请至少选择一个集团运营部门"));
      } else {
        callback();
      }
    }
    return {
      Addblocdialog: false,
      createBloc: {
        grouplogourl: "",
        Groupname: "",
        contact: "",
        contactpone: "",
        note: "",
        formats: [],
        formatsList: []
      },
      Blocformrule: {
        grouplogourl: [
             { required: true, message: "请上传集团logo",trigger:"blur"},
        ],
        Groupname: [
          { required: true, message: "请输入集团名称", trigger: "blur" }
        ],
        contactpone:[{validator:validTellpone}],
        formats: [
          { validator: validformats, trigger: "blur",required: true }
        ]
      },
      loading: false,
      selectformatlist:[]
    };
  },
  methods: {
    //获取业态列表
    GetFormas(){
      FormatList().then(res => {
        this.createBloc.formatsList = res.data.data;
      });
    },
    //图片上传成功的回调
    handleAvatarSuccess() {
      this.$refs.createBloc.validateField('grouplogourl');
    },
    //选择业态/集团运营部门
    Selectformat(item){
        item.selectli=!item.selectli;
        this.$forceUpdate();
        this.getChecklist(item);
    },
    //判断点击选中后增加到业态选中
    getChecklist(item){
      if(JSON.stringify(this.selectformatlist).indexOf(JSON.stringify(item.name)) === -1){
        this.selectformatlist.push(item);
      }else{
        this.selectformatlist=this.selectformatlist.filter(t=>t.id!=item.id);
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
          const newArr=JSON.parse(JSON.stringify(this.selectformatlist));
          this.createBloc.formats=newArr;
          if(this.createBloc.formats.length<1){
            this.$message.error("请至少选择一个业态")
          }else{
            this.$message.success('选择业态成功!');
            this.$refs.createBloc.validateField('formats');
          }
          this.$refs[`popover`].doClose();
        }).catch(() => {
          this.$message.info("已取消修改选择业态");
          //获取当前文本框已有数据赋值给下拉数据
          this.selectformatlist=JSON.parse(JSON.stringify(this.createBloc.formats.filter(item=>item.selectli=true)));
          this.createBloc.formatsList.forEach(elem=>{
            elem.selectli=true;
          })
          //当前当前所有数据和已经选择的数据的差集
          let removelist=[...this.createBloc.formatsList].filter(item=>[...this.selectformatlist].every(elem=>elem.id!==item.id));
          //给当前下拉选中但是取消选中的选中状态设为false
          removelist.forEach(elem=>{
            elem.selectli=false;
          })
          this.$forceUpdate();
        });
    },
    //取消选择的业态
    cancleformat(){
        this.$confirm('是否取消选择这些业态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
            this.createBloc.formats=[];
            this.selectformatlist=[];
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
    },
    //取消tags业态选中
    Closetag(item){
      this.$confirm('是否取消选择当前业态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
      }).then(()=>{
        this.createBloc.formats.splice(this.createBloc.formats.indexOf(item),1);
        this.selectformatlist=JSON.parse(JSON.stringify(this.createBloc.formats));
        //当前当前所有数据和已经选择的数据的差集
        let removelist=[...this.createBloc.formatsList].filter(item=>[...this.selectformatlist].every(elem=>elem.id!==item.id));
        //给当前下拉选中但是取消选中的选中状态设为false
        removelist.forEach(elem=>{
          elem.selectli=false;
        })
        this.$message.success("已取消选择"+item.name);
      }).catch(()=>{
        this.$message.info("您已取消删除当前选择业态!");
      })
    },
    //创建集团，立即创建
    CreatGroup:_debounce(function(_type, index, item){
      this.$refs['createBloc'].validate((valid) => {
          if (valid) {
            let instate=this.createBloc.formats.map(item=>{return item.id});
            let params={
              name:this.createBloc.Groupname,
              cy_img:this.createBloc.grouplogourl,
              instate:instate,
              person:this.createBloc.contact,
              phone:this.createBloc.contactpone,
              intro:this.createBloc.note
            }
            AddBloc(params).then(res=>{
              this.$message.success("集团创建成功");
              this.Addblocdialog=false;
              this.$parent.getBlocList(1);
              this.$refs['createBloc'].resetFields();
            }).catch(err=>{
              this.$message.error("集团创建失败")
            })
          } else {
            this.$message.info("请输入必填项")
            return false;
          }
      });
    }),
    //重置
    RestGroup(){
      this.$refs['createBloc'].resetFields();
      if(this.createBloc.GroupdivisonList!=undefined){
        this.createBloc.GroupdivisonList.forEach(ele=>{
          ele.selectli=false;
        });
      }
      this.createBloc.formatsList.forEach(ele=>{
        ele.selectli=false;
      })
    },
    //集团弹出层关闭清空表单
    CloseBloc(){
      this.RestGroup()
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
    width: 505px;
    margin: 0 auto;
	   // padding-top:40px;
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
