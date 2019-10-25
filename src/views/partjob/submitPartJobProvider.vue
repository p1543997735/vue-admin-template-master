<template>
  <el-form ref="form" :model="form" label-width="80px">
    <div class="container">
      <el-form-item label="姓名">
        <el-input
          v-model="username"
          placeholder="请输入姓名"
          clearable
        />
      </el-form-item>
    </div>
    <div class="container">

      <el-form-item label="头像">
        <div class="divcss5-3">
          <el-upload
            class="avatar-uploader"
            action="http://47.98.122.133/JustLikeThis/public/index.php/api/admin/uploadfileinossfile"
            accept="image/jpeg,image/jpg,image/png"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-change="onPickChange"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon avatar-uploader" />
          </el-upload>
        </div>

      </el-form-item>
    </div>

    <div class="container">
      <el-form-item label="联系方式">
        <el-input
          v-model="usertel"
          placeholder="请输入联系方式"
          clearable
        />
      </el-form-item>
    </div>
    <div class="container">
      <el-form-item label="生日">
        <el-date-picker
          v-model="birh"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
    </div>
    <div class="container">
      <el-form-item label="身份">
        <el-select v-model="useridentity" placeholder="请选择身份">
          <el-option label="学生" value="学生" />
          <el-option label="老师" value="老师" />
          <el-option label="公司人员" value="公司人员" />
          <el-option label="社会人员" value="社会人员" />
          <el-option label="其他" value="其他" />
        </el-select>
        <!--        <el-input-->
        <!--          placeholder="请输入身份"-->
        <!--          v-model="useridentity"-->
        <!--          clearable>-->
        <!--        </el-input>-->
      </el-form-item>
    </div>
    <div class="container">
      <el-form-item label="联系地址">
        <el-input
          v-model="location"
          placeholder="请联系地址"
          clearable
        />
      </el-form-item>
    </div>
    <div class="container">
      <el-form-item label="微信">
        <el-input
          v-model="wechat"
          placeholder="请输入微信"
          clearable
        />
      </el-form-item>
    </div>
    <div class="container">
      <el-form-item label="邮箱">
        <el-input
          v-model="email"
          placeholder="请输入邮箱"
          clearable
        />
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { uploadJobProvider } from '@/api/api'

export default {
  name: 'SubmitJob',
  data() {
    return {
      username: '',
      usertel: '',
      useridentity: '',
      form: {},
      imageUrl: '',
      location: '',
      identity: '',
      wechat: '',
      birh: '',
      email: ''
    }
  },
  methods: {
    onSubmit() {
      var formData = new FormData()
      formData.append('provider', this.username)
      formData.append('telPhone', this.usertel)
      formData.append('identity', this.useridentity)
      formData.append('location', this.location)
      formData.append('wx', this.wechat)
      formData.append('birth', this.birh)
      formData.append('avatar', this.imageUrl)
      formData.append('email', this.email)
      console.log(this.email)
      uploadJobProvider({
        'provider': this.username,
        'telPhone': this.usertel,
        'identity': this.useridentity,
        'location': this.location,
        'wx': this.wechat,
        'age': this.birh,
        'avatar': this.imageUrl,
        'email': this.email
      }).then(response => {
        console.log(response)
        // this.list = response.data.data
        // this.total = response.data.count
      })
    },
    handleAvatarSuccess(res, file) {
      console.log(res.data)
      this.imageUrl = res.data
    },
    onPickChange(file) {

    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 15px;
    width: 500px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #8c939d;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }

  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }

  .demo-block .avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }

  .divcss5-3 {
    border: 1px dashed #8c939d;
    height: 128px;
    width: 128px
  }
</style>
