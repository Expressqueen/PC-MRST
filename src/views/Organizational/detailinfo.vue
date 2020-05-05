<template>
    <div class="detailinfo">
        <!-- 这是我的详细信息页面 -->
        <div class="dinfotitle">
            <div class="avar left">
                <el-avatar :size="62" :src="propdetail.img"></el-avatar>
            </div>
            <div class="infomation left">
                <p class="weight">{{propdetail.nickname}}</p>
                <p class="noweight">{{propdetail.position}}</p>
                
            </div>
            <div class="infomation right">
                <p class="noweight"><i class="el-icon-phone"></i>{{propdetail.phone}}</p>
                <p class="noweight"><i class="el-icon-s-promotion"></i>{{propdetail.email}}</p>
            </div>
        </div>
        <hr class="clhr">
        <div class="moreinfo">
            <p class="weight">详细资料</p>
            <div class="flex">
                <div class="avgflex">
                    <span class="noweight">姓名</span>
                    <span class="weight">{{propdetail.nickname}}</span>
                </div>
                <div class="avgflex">
                    <span class="noweight">手机</span>
                    <span class="weight">{{propdetail.phone}}</span>
                </div>
                <div class="avgflex textright">
                    <span class="noweight">邮箱</span>
                    <span class="weight">{{propdetail.email}}</span>
                </div>
                <div class="avgflex">
                    <span class="noweight">部门</span>
                    <span class="weight">{{propdetail.depname}}</span>
                </div>
                <div class="avgflex">
                    <span class="noweight">职位</span>
                    <span class="weight">{{propdetail.position}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        propdetail:{
            type:Object
        }
    },
    data(){
        return{
            detailinfo:{
                name:"杨璐",
                averurl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                position:"活动运营",
                tellpone:"18512341568",
                email:"1254578@qq.com",
                department:"第一事业部-运营部"
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.detailinfo{
    .dinfotitle{
        // padding:40px 0;
        overflow: hidden;
        padding-top: 10px;
        .infomation.right{
            text-align: right;
        }
    }
    .infomation{
        margin-left:27px;
        padding-top:5px;
        p{
            padding:5px 0;
        }
    }
    .clhr{
        border: 0;
        height:1px;
        background:rgba(0,0,0,1);
        opacity:0.1;
        margin: 40px 0;
    }
    .moreinfo{
        .flex{
            margin-top:30px;
            display: flex;
            flex-flow: row wrap;
            align-content: flex-start;
            .avgflex{
                margin-bottom: 45px;
                flex: 0 0 33%;
                .noweight{
                    margin-right:10px;
                }
                .weight{
                    font-weight: 400;
                }
            }
        }
    }
    .weight{
        color:#3A454B;
        font-weight: bold;
    }
    .noweight{
        color: #999999;
    }

}
</style>