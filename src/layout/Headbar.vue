<template>
  <div class="headbar clearfix">
    <div class="layoutbar left">
      <i class="el-icon-menu left" @click="openlayout" style="cursor:pointer"></i>
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="loginuser right">
      <el-avatar :size="40" :src="circleUrl"></el-avatar>
    </div>
    <LayoutMenu ref="Layoutmenu"></LayoutMenu>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb/index'
import LayoutMenu from '@/layout/Layoutmenu'
export default {
  name: "Headbar",
  components:{Breadcrumb,LayoutMenu},
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  watch:{
    //监听路由发生变化关闭左侧菜单栏
    $route:{
      handler:function(val,olval){
        this.$refs['Layoutmenu'].showtype=false;
      }
    }
  },
  methods:{
    openlayout(){
      this.$refs['Layoutmenu'].showtype=true;
    }
  }
};
</script>

<style lang="scss">
.headbar {
  background: #ffffff;
  width: 100%;
  height: 56px;
  padding: 0 20px;
  i.el-icon-menu {
      font-size: 32px;
      color: #d0d9df;
      padding-top: 10px;
      margin-right: 20px;
    }
  .layoutbar {
    min-width: 50%;
    
    .el-breadcrumb{
        line-height: 56px;
    }
  }
  .loginuser {
    margin: 8px 0;
  }
  .el-drawer.ltr{
      .el-drawer__body{
        padding:0 20px;
       
      }
  }
}
</style>