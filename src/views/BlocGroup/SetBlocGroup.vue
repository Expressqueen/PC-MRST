<template>
  <el-dialog
    title="集团设置"
    :visible.sync="SetBlocdialog"
    width="960px"
    :close-on-click-modal="false"
    class="setblocgroup"
    @close='closeSetBloc'
  >
    <el-tabs tab-position="left" style="height: 100%;" v-model="activeName">
      <el-tab-pane label="基础信息" name="Basicinfo">
        <el-form
          :model="Basicinfo"
          label-position="right"
          label-width="100px"
          class="permisform"
          ref="Basicinfo"
          :rules="Basicinforule"
        >
          <el-form-item label="集团logo" prop="cy_img">
            <up-img :Imgurl.sync="Basicinfo.cy_img" @callvalidImg="UpImgSuccess"></up-img>
          </el-form-item>
          <el-form-item label="集团名称" prop="cy_name">
            <el-input v-model="Basicinfo.cy_name" autocomplete="off" placeholder="集团名称"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="person">
            <el-input v-model="Basicinfo.person" autocomplete="off" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="cy_phone">
            <el-input v-model="Basicinfo.cy_phone" autocomplete="off" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="intro">
            <el-input v-model="Basicinfo.intro" autocomplete="off" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item label>
            <el-button type="primary" @click="SaveBasicInfo">保存</el-button>
            <el-button @click="Restform('Basicinfo')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="重要信息" name="Imporinfo">
        <el-form
          :model="ImpotantInfo"
          label-position="right"
          label-width="100px"
          class="permisform"
          ref="ImpotantInfo"
          :rules="ImpotantInforule"
        >
          <el-form-item label="选择业态" prop="formats">
            <el-popover placement="bottom-start" width="390" trigger="click" :ref="`popover`">
              <div class="droplist">
                <ul class="el-scrollbar__view el-select-dropdown__list">
                  <li
                    v-for="(item,index) in ImpotantInfo.formatsList"
                    :key="index"
                    :class="[{selected:item.selectli},'el-select-dropdown__item']"
                    @click="Selectformat(item,'formats')"
                  >
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
                  v-for="(tag,index) in ImpotantInfo.formats"
                  :key="tag.id"
                  closable
                  size="mini"
                  @close="Deltags(tag,index)"
                >{{tag.name}}</el-tag>
                <i slot="suffix" class="el-icon-arrow-down right"></i>
              </div>
            </el-popover>
          </el-form-item>
          <el-form-item label>
            <el-button type="primary" @click="SaveImportantInfo">保存</el-button>
            <el-button @click="Restform('ImpotantInfo')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="集团操作" name="Blocreg">
          <el-form label-position="right" label-width="100px" class="permisform" style="width:580px">
              <el-form-item>
                  <p slot="label"><span class="mark">*</span> 集团操作</p>
                一旦将集团移到回收站，所有与集团有关的信息将会被移到回收站，其中的内容也不会被统计和搜索收录，需要去回收站恢复后才能继续使用。
              </el-form-item>
              <el-form-item label="">
                  <el-button type="danger" plain @click="DelHode">删除集团</el-button>
                  <el-button type="warning" plain @click="PageHode">归档</el-button>
              </el-form-item>
          </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>
<script>
import { FormatList,pagehole,EditBlocBase,EditBlocImpor,BlocInfo,DelBloc } from "@/api/index";
import { _debounce } from '@/utils/index'
import UpImg from '@/views/BlocGroup/UploadImg'
export default {
  components:{UpImg},
  data() {
    let validformats = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error("请至少选择一个业态"));
      } else {
        callback();
      }
    };
    return {
      SetBlocdialog: false,
      GroupId:"",
      Nowpage:'', //当前设置的是第几页的数据
      activeName:"Basicinfo", //记录当前tab默认选中那个标签
      Resetform:{}, //记录当前选中form，重置时使用
      Basicinfo: {
      },
      Basicinforule: {
        cy_img: [
          { required: true, message: "请上传集团logo", trigger: "blur" }
        ],
        cy_name: [
          { required: true, message: "请输入集团名称", trigger: "blur" }
        ]
      },
      ImpotantInfo: {
        formats: [],
        formatsList: []
      },
      ImpotantInforule: {
        formats: [{ validator: validformats, trigger: "blur", required: true }]
      },
      loading: false,
      selectformatlist: []
    };
  },
  mounted() {
    FormatList().then(res => {
      this.ImpotantInfo.formatsList = res.data.data;
    });
  },
  methods: {
    //页面初始化选中的业态
    Initformats(){
      const newArr = JSON.parse(JSON.stringify(this.ImpotantInfo.formats));
      this.selectformatlist = newArr;
      this.FormatsIselect();
    },
    UpImgSuccess(){
      this.$refs.Basicinfo.validateField('cy_img');
    },
    //保存基本信息
    SaveBasicInfo:_debounce(function(_type, index, item){
      this.$refs["Basicinfo"].validate(valid => {
        if (valid) {
            let params={
                id:this.Basicinfo.id,
                name:this.Basicinfo.cy_name,
                cy_img:this.Basicinfo.cy_img,
                person:this.Basicinfo.person,
                phone:this.Basicinfo.cy_phone,
                intro:this.Basicinfo.intro
            }
            EditBlocBase(params).then(res=>{
                this.$message.success("基本信息保存成功!");
            })
        } else {
          this.$message.error("必填项验证失败!");
          return false;
        }
      });
    }),
    //重置基本信息
    Restform:_debounce(function(_type, index, item){
      this.$refs[_type].resetFields();
      if(_type == "Basicinfo"){
        this.Basicinfo=JSON.parse(JSON.stringify(this.Resetform));
      }
      else if (_type == "ImpotantInfo") {
        this.ImpotantInfo.formats=JSON.parse(JSON.stringify(this.Resetform)).instates;
        this.Initformats();
      }
      this.$message.success("已重置为当前默认信息!")
    }),
    /**重要信息操作 */
    //选择业态/集团运营部门
    Selectformat(item, datalist) {
      item.selectli = !item.selectli;
      this.$forceUpdate();
      this.getChecklist(item, datalist);
    },
    //判断点击选中后增加到业态选中
    getChecklist(item, type) {
      if (
          JSON.stringify(this.selectformatlist).indexOf(
            JSON.stringify(item.name)
          ) === -1
        ) {
          this.selectformatlist.push(item);
        } else {
          this.selectformatlist = this.selectformatlist.filter(
            t => t.id != item.id
          );
        }
    },
    showformat() {
      this.$confirm("是否确定选择这些业态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          const newArr = JSON.parse(JSON.stringify(this.selectformatlist));
          this.ImpotantInfo.formats = newArr;
          if (this.ImpotantInfo.formats.length < 1) {
            this.$message.error("请至少选择一个业态");
          } else {
            this.$message.success("选择业态成功!");
          }
          this.$refs[`popover`].doClose();
        })
        .catch(() => {
          this.$message.info("已取消修改选择业态");
          //获取当前文本框已有数据赋值给下拉数据
          this.selectformatlist = JSON.parse(
            JSON.stringify(
              this.ImpotantInfo.formats.filter(item => (item.selectli = true))
            )
          );
          this.FormatsIselect();
        });
    },
    //获取下拉列表选中设置为true,未选中为false
    FormatsIselect(){
      this.ImpotantInfo.formatsList.forEach(elem => {
            elem.selectli = true;
          });
          //当前当前所有数据和已经选择的数据的差集
          let removelist = [...this.ImpotantInfo.formatsList].filter(item =>
            [...this.selectformatlist].every(elem => elem.id !== item.id)
          );
          //给当前下拉选中但是取消选中的选中状态设为false
          removelist.forEach(elem => {
            elem.selectli = false;
          });
          this.$forceUpdate();
    },
    //取消选择的业态
    cancleformat() {
      this.$confirm("是否取消选择这些业态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.ImpotantInfo.formats = [];
          this.selectformatlist = [];
          this.ImpotantInfo.formatsList.forEach(ele => {
            ele.selectli = null;
          });
          this.$forceUpdate();
          this.$message({
            type: "success",
            message: "已取消业态选择!"
          });
          this.$refs[`popover`].doClose();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改选择业态"
          });
        });
    },
    //删除tags当前业态选择
    Deltags(tag,index){
      this.$confirm("是否取消选择当前业态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(()=>{
        this.selectformatlist.splice(index, 1);
        const newArr = JSON.parse(JSON.stringify(this.selectformatlist));
        this.ImpotantInfo.formats = newArr;
        this.FormatsIselect();
        this.$message.success("您已删除当前选择业态")
      }).catch(()=>{
        this.$message.info("您已取消删除当前选择业态")
      })
    },
    //保存重要信息
    SaveImportantInfo:_debounce(function(_type, index, item){
      this.$refs["ImpotantInfo"].validate(valid => {
        if (valid) {
            let instate=this.ImpotantInfo.formats.map(item=>{return item.id});
            let params={
                id:this.Basicinfo.id,
                instate:instate
            }
            EditBlocImpor(params).then(res=>{
                this.$message.success("重要信息信息保存成功!");
            })
        } else {
          this.$message.error("重要信息必填项验证失败!");
          return false;
        }
      });
    }),
    /**集团操作 */
    //归档
    PageHode:_debounce(function(_type, index, item){
      this.$confirm("是否归档当前集团?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        pagehole({id:this.Basicinfo.id}).then(res=>{
          this.SetBlocdialog=false;
          this.$parent.getBlocList(1);
          this.$message.success("集团归档成功!")
        }).catch(err=>{
          this.$message.error("集团归档失败!")
        })
      }).catch(()=>{
        this.$message.info("已取消归档该集团!")
      })
    }),
    //删除集团
    DelHode(){
      this.$confirm("是否删除当前集团?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          DelBloc({id:this.Basicinfo.id}).then(res=>{
            this.SetBlocdialog=false;
            this.$parent.getBlocList(1);
            this.$message.success("集团归档成功!");
          });
        })
        .catch(() => {
          this.$message.info("您已取消删除当前集团!");
        });
    },
    //关闭弹出层清空所有表单信息
    closeSetBloc(){
      this.$refs['Basicinfo'].resetFields();
      this.$refs['ImpotantInfo'].resetFields();
      this.activeName="Basicinfo";
      this.$parent.getBlocList(this.Nowpage);
    }
  }
};
</script>
<style lang="scss" scope>
.setblocgroup {
  .el-tabs--left .el-tabs__item.is-left {
    text-align: center;
  }
  .el-dialog__body {
    padding: 0;
    .el-tabs--left .el-tabs__header.is-left {
      width: 180px;
    }
    .el-tabs__item {
      height: 56px;
      line-height: 56px;
      border-bottom: 1px solid #e4e7ed;
    }
    .permisform {
      margin-top: 40px;
    }
  }
  .mark{
        color: #F56C6C;
        margin-right: 4px;
  }
}
</style>
