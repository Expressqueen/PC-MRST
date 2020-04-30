<template>
    <div class="Layoutmenu">
        <div class="drawerhead">
            <i class="el-icon-menu left" @click="drawer=false"></i>
            <span class="companyname left">
                乐播新瑞(北京)文化传媒有限公司
            </span>
        </div>
        <ul class="menulist">
            <li>
                <router-link to="/origanizational">
                    <img src="@/assets/menuicon/Organstru.png" alt="" />
                    <p>组织架构</p>
                </router-link>
            </li>
            <li>
                <router-link to="/PermissionGroup">
                    <img src="@/assets/menuicon/Role.png" alt="" />
                    <p>权限组</p>
                </router-link>
            </li>
            <li>
                <img src="@/assets/menuicon/permissions.png" alt="" />
                <p>权限</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"Layoutmenu",
    data(){
        return{

        }
    }
}
</script>
<style lang="scss" scoped>
.Layoutmenu{
     .drawerhead{
            height: 56px;
            line-height: 56px;
            i.el-icon-menu{
                color:#409EFF;
                margin-right: 10px;
                font-size:25px;
                padding-top: 15px;
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
                p{
                    color: #666666;
                    margin-top: 10px;
                }
            }
        }
}
</style>