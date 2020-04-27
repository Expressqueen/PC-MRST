<template>
    <div class="Invitemembers">
        <p class="alertinfo">将链接发给小伙伴就可以啦</p>
        <div class="copylink">
            <input type="text" class="copyinput" />
            <button type="button" class="copybtn">复制链接</button>
        </div>
    </div>
</template>
<script>
export default {
    name:"Invitemembers",
    data(){
        return{

        }
    }
}
</script>
<style lang="scss" scoped>
.Invitemembers{
    .alertinfo{
        margin-bottom: 30px;
    }
    .copyinput{
        width:654px;
        height:40px;
        background:rgba(244,247,253,1);
        margin-right: 10px;
        border: none;
        padding:0 20px;
        outline:none
    }
    & .copyinput:click{
        border: none;
    }
    .copybtn{
        width:90px;
        height:40px;
        background:rgba(9,109,217,1);
        border:1px solid rgba(9, 109, 217, 1);
        border-radius:4px;
        color: #ffffff;
    }
}
</style>