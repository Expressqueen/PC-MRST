<template>
    <div class="ProductGroup">
        <p @click="goBack" class="callback">
            <i class="el-icon-arrow-left"></i>
            集团业态产品
        </p>
        <div class="Productlist clearfix">
            <ul calss="Productmenu left">
                <li>大卖场</li>
                <li>标超</li>
                <li>便利店</li>
            </ul>
            <div class="Productres right">
                这是我的集团业态产品页面
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"ProductGroup",
    data(){
        return{

        }
    },
    methods:{
        goBack(){
           this.$router.back(-1)
        }
    }
}
</script>
<style lang="scss" scope>
.ProductGroup{
    width: 1200px;
    margin: 0 auto;
    padding: 40px 0;
    // margin-top: 56px;
    .callback{
        font-weight: bold;
        font-size: 16px;
        i{
            font-weight: bold;
            margin-right: 5px;
        }
    }
}
</style>