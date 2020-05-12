<template>
  <div class="Layoutmenu">
    <el-drawer
      :visible.sync="showtype"
      direction="ltr"
      :modal="false"
      size="280px"
      :withHeader="false"
    >
      <div class="drawerhead">
        <i class="el-icon-menu left" @click.stop="CloseMenu"></i>
        <span class="companyname left" title="乐播新瑞(北京)文化传媒有限公司">乐播新瑞(北京)文化传媒有限公司</span>
      </div>
      <ul class="menulist">
        <li>
          <router-link to="/origanizational">
            <img src="@/assets/menuicon/Organstru.png" alt />
            <p>组织架构</p>
          </router-link>
        </li>
        <li>
          <router-link to="/PermissionGroup">
            <img src="@/assets/menuicon/Role.png" alt />
            <p>权限组</p>
          </router-link>
        </li>
        <li>
          <router-link to="/PermissionManager">
            <img src="@/assets/menuicon/permissions.png" alt />
            <p>权限</p>
          </router-link>
        </li>
        <li>
          <router-link to="/BlocGroup">
            <img src="@/assets/menuicon/BlocGroup.png" alt />
            <p>集团</p>
          </router-link>
        </li>
      </ul>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: "Layoutmenu",
  // props: {
  //   showtype: {
  //     type: Boolean
  //   }
  // },
  data() {
    return {
      showtype:false
    };
  },
  methods: {
    CloseMenu() {
      this.showtype=false;
    }
  }
};
</script>
<style lang="scss" scoped>
.Layoutmenu {
  .drawerhead {
    height: 56px;
    line-height: 56px;
    i.el-icon-menu {
      color: #409eff;
      margin-right: 10px;
      font-size: 25px;
      padding-top: 15px;
    }
    .companyname {
      width: calc(100% - 42px);
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      white-space: nowrap;
      color: #333333;
    }
  }
  .menulist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    margin: 0;
    li {
      text-align: center;
      width: 33.33%;
      margin-top: 20px;
      img {
        width: 44px;
        height: 44px;
      }
      p {
        color: #666666;
        margin-top: 10px;
      }
    }
  }
}
</style>