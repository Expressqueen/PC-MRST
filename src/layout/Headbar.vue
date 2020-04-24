<template>
    <div class="headbar">

        zheshi我的外部框架
        <div class="loginuser">

        </div>
    </div>
</template>
<script>
export default {
    name:"Headbar"
}
</script>

<style lang="scss" scoped>
.headbar{
    background: #ffffff;
    width: 100%;
    height: 56px;
    line-height: 56px;
    padding:0 20px;
    .loginuser{
        width:40px;
        height:40px;
        background:rgba(0,0,0,1);
        border-radius:50%;
        float: right;
        vertical-align: center;
        margin:8px 0;
    }
}
</style>