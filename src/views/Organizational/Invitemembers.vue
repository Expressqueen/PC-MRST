<template>
  <div class="Invitemembers">
    <p class="alertinfo">将链接发给小伙伴就可以啦</p>
    <div class="copylink">
      <input type="text" class="copyinput" :value="CopyUrl" />
      <button
        type="button"
        class="copybtn"
        v-clipboard:copy="CopyUrl"
        v-clipboard:success="onCopyUrl"
        v-clipboard:error="onErrorUrl"
      >复制链接</button>
    </div>
    <p class="footerinfo">邀请有效期为14天，过期后项目成员仍可打开</p>
  </div>
</template>
<script>
export default {
  name: "Invitemembers",
  data() {
    return {
      CopyUrl: "https://leboxinrui.com/url/BCMFD-CKc6h"
    };
  },
  methods: {
    onCopyUrl: function(e) {
      this.$message.success("复制成功！");
    },
    onErrorUrl: function(e) {
      this.$message.success("复制失败！");
    }
  }
};
</script>
<style lang="scss" scoped>
.Invitemembers {
  .alertinfo {
    margin-bottom: 30px;
  }
  .copyinput {
    width: 654px;
    height: 40px;
    background: rgba(244, 247, 253, 1);
    margin-right: 10px;
    border: none;
    padding: 0 20px;
    outline: none;
    color: #565f64;
  }
  & .copyinput:click {
    border: none;
  }
  .copybtn {
    width: 90px;
    height: 40px;
    background: rgba(9, 109, 217, 1);
    border: 1px solid rgba(9, 109, 217, 1);
    border-radius: 4px;
    color: #ffffff;
  }
  .footerinfo {
    color: #999999;
    font-size: 14px;
    margin: 20px 0 70px 0;
  }
}
</style>