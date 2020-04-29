<template>
  <div class="headbar clearfix">
    <div class="layoutbar left">
      <i class="el-icon-menu left" @click="drawer=true"></i>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="loginuser right">
      <el-avatar :size="40" :src="circleUrl"></el-avatar>
    </div>
    <el-drawer
    :visible.sync="drawer"
    direction="ltr" :modal="false" size="280px" :withHeader="false">
        <div class="drawerhead">
            <i class="el-icon-menu left" @click="drawer=false"></i>
            <span class="companyname left">
                乐播新瑞(北京)文化传媒有限公司
            </span>
        </div>
        <ul class="menulist">
            <li>
                <img src="@/assets/menuicon/Organstru.png" alt="" />
                <p>组织架构</p>
            </li>
            <li>
                <img src="@/assets/menuicon/Role.png" alt="" />
                <p>权限组</p>
            </li>
            <li>
                <img src="@/assets/menuicon/permissions.png" alt="" />
                <p>权限</p>
            </li>
        </ul>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: "Headbar",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        drawer:true
    };
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
        .drawerhead{
            height: 56px;
            line-height: 56px;
            i.el-icon-menu{
                color:#409EFF;
                margin-right: 10px;
                font-size:25px;
            }
            .companyname{
                width: calc(100% - 42px);
                overflow: hidden; 
                text-overflow: ellipsis; 
                -o-text-overflow: ellipsis;
                white-space:nowrap;
                color: #333333;
            }
        }
        .menulist{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-content: space-between;
            li{
                text-align: center;
                img{
                    width: 44px;
                    height: 44px;
                }
            }
        }
      }
  }
}
</style>