<template>
  <el-upload
    class="avatar-uploader"
    ref="uploadImg"
    action="string"
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :http-request="UploadImg"
    v-loading="loading"
  >
    <img v-if="Imgurl" :src="Imgurl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
import {Filetool} from '@/api/index'
export default {
  props: {
    Imgurl: {
      type: String
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    //上传图片之前进行验证
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG ,jpeg,phg,gif格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //上传图片
    UploadImg(param) {
      this.loading = true;
      let params = new FormData();
      params.append("Cy", param.file);
      Filetool(params)
        .then(res => {
          this.$message.success("图片上传成功");
          this.loading = false;
          this.$emit('update:Imgurl',res.data.data);
          this.$emit('callvalid');
          param.onSuccess(); // 上传成功的图片会显示绿色的对勾
        })
        .catch(err => {
          param.onError();
        });
    }
  }
};
</script>
