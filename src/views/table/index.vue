<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :http-request="uploadAvatar"
      :before-upload="beforeAvatarUpload"
      :file-list="fileList"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { uploadfileinoss } from '@/api/api'
import Client from '../../utils/ali-oss'

export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      picList: [],
      fileList: []
    }
  },
  methods: {
    uploadAvatar(item) {
      var oss = require('ali-oss')
      var file = item.file
      const client = new oss({
        accessKeyId: 'LTAIrucI0zt6hsPe',
        accessKeySecret: 'tW3BmS6mZRobC1RgBqrcKVoqtwXiQe',
        bucket: 'mango-snack-picture',
        region: 'oss-cn-hangzhou.aliyuncs.com'
      })

      // object表示上传到OSS的Object名称，localfile表示本地文件或者文件路径
      client.put('object', 'localfile').then(function(r1) {
        console.log('put success: %j', r1)
        return client.get('object')
      }).then(function(r2) {
        console.log('get success: %j', r2)
      }).catch(function(err) {
        console.error('error: %j', err)
      })
      // const formData = new FormData()
      // formData.append('file', item.file)
      // const uid = item.file.uid
      // uploadfileinoss(formData).then(res => {
      //   console.log(uid)
      //   this.item.file = res
      //   this.picList.push({ img: item.file })
      //   this.emptyUpload()
      // }).catch(() => {
      //   this.$message.error('上传失败，请重新上传')
      //   this.emptyUpload()
      // })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPng) {
        this.$message.error('上传图片只能是 JPG或png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return (isJPG || isPng) && isLt2M
    },
    handleRemove(file, fileList) {
      for (const i in this.picList) {
        if (this.picList[i].key === file.uid) {
          this.picList.splice(i, 1)
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    /**
       * 清空上传组件
       */
    emptyUpload() {
      const mainImg = this.$refs.upload
      if (mainImg) {
        if (mainImg.length) {
          mainImg.forEach(item => {
            item.clearFiles()
          })
        } else {
          this.$refs.upload.clearFiles()
        }
      }
    }
  }
}

</script>
