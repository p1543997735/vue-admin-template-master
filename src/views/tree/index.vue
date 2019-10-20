<template>
  <div>
    <el-upload
      ref="upload"
      class="upload-demo"
      drag
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :http-request="handleHttpRequest"
      :headers="uploadHeaders"
      :limit="files"
      :disabled="disabled"
      multiple
      action=""
      :file-list="fileList"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">上传文件大小不能超过 1G</div>
    </el-upload>
  </div>
</template>

<script>
import Client from '../../utils/ali-oss'
import { uploadfileinoss } from '@/api/api'
export default {
  components: {},

  data() {
    return {
      region: 'oss-cn-hangzhou.aliyuncs.com',
      bucket: 'mango-snack-picture', // 这里选择OSS容器
      percentage: 0,
      url: '', // 后台获取token地址
      ClientObj: null,
      dataObj: {},
      expiration: '',
      fileList: [],
      files: 10,
      uploadHeaders: {
        authorization: '*'
      },
      disabled: false
    }
  },
  computed: {},
  watch: {
    url(val) {
      if (val) {
        this.urls.push(val)
      }
    }
  },
  // created() {
  //   this.getAliToken()
  // },
  mounted() {
  },
  methods: {
    getDate() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
      const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
      const hh = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
      const mm = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
      return `${year}${month}${day}${hh}${mm}`
    },
    // getAliToken() { // 获取Token
    //   return new Promise((resolve, reject) => {
    //     uploadfileinoss({
    //       img: this.url
    //     }).then(res => {
    //       if (res.success) {
    //         const { expiration, tempAk, tempSk } = res.data
    //         this.expiration = expiration
    //         this.dataObj = {
    //           region: this.region,
    //           bucket: this.bucket,
    //           accessKeyId: tempAk,
    //           accessKeySecret: tempSk
    //         }
    //         resolve(true)
    //       } else {
    //         reject(false)
    //       }
    //     }).catch(err => {
    //       console.log(err)
    //       reject(false)
    //     })
    //   })
    // },
    // beforeUpload(file) {
    //   return new Promise((resolve, reject) => {
    //     this.getAliToken().then(response => {
    //       if (response) {
    //         resolve(response)
    //       } else {
    //         reject(response)
    //       }
    //     }).catch(err => {
    //       console.log(err)
    //       reject(err)
    //     })
    //   })
    // },
    async handleHttpRequest(option) { // 上传OSS
      try {
        const vm = this
        vm.disabled = true
        const client = Client(this.dataObj); const file = option.file
        // 随机命名
        const random_name = this.random_string(6) + '_' + new Date().getTime() + '.' + file.name.split('.').pop()
        // 分片上传文件
        await client.uploadfileinoss(random_name, file, {
          progress: async function(p) {
            const e = {}
            e.percent = p * 100
            option.onProgress(e)
          }
        }).then(({ res }) => {
          console.log(res)
          if (res.statusCode === 200) {
            // option.onSuccess(ret)
            return res.requestUrls
          } else {
            vm.disabled = false
            option.onError('上传失败')
          }
        }).catch(() => {
          vm.disabled = false
          option.onError('上传失败')
        })
      } catch (error) {
        console.error(error)
        this.disabled = false
        option.onError('上传失败')
      }
    },
    handleSuccess(response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
    },
    // 随机生成文件名
    random_string(len) {
      len = len || 32
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz12345678'; const maxPos = chars.length; let pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    }
  }

}
</script>

