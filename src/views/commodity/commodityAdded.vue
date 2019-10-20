<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="零食名称">
        <el-input v-model="form.foodName" />
      </el-form-item>
      <el-form-item label="零食最低价格">
        <el-input v-model="form.foodPrice" />
      </el-form-item>
      <el-form-item label="起售数量">
        <el-input v-model="form.startCount " />
      </el-form-item>
      <el-form-item label="商品原价">
        <el-input v-model="form.originalPrice " />
      </el-form-item>
      <el-form-item label="商品规格">
        <el-input v-model="form.foodsSize " />
      </el-form-item>
      <el-form-item label="商品种类">
        <el-select v-model="form.foodKind" placeholder="请选择你的商品种类">
          <el-option
            v-for="item in commodityType"
            :key="item.id"
            :label=" item.kindName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品店家">
        <el-select v-model="form.commoditySelf" placeholder="请选择你的商品店家">
          <el-option
            v-for="item in shopName"
            :key="item.id"
            :label="item.snackShopName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="零食图片">
        <!--        <el-input v-model="form.name" />-->
        <pan-thumb :image="image" />

        <el-button
          type="primary"
          icon="el-icon-upload"
          style="position: absolute;bottom: 15px;margin-left: 40px;"
          @click="imagecropperShow=true"
        >
          上传图片
        </el-button>

        <image-cropper
          v-show="imagecropperShow"
          :key="imagecropperKey"
          :width="300"
          :height="300"
          url="http://47.98.122.133/JustLikeThis/public/index.php/api/admin/uploadfileinoss"
          lang-type="zh"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
      <el-form-item label="零食口味参数">
        <div class="display:block">
          <el-input v-model="taste" style="width: 20%;margin-right: 30px" placeholder="零食口味名称" />
          <el-input v-model="tastePrice" style="width: 20%;margin-right: 30px" placeholder="零食口味价格" />
          <el-input v-model="inPrice" style="width: 20%;margin-right: 30px" placeholder="零食口味进价" />
          <el-input v-model="storeCount" style="width: 20%" placeholder="零食口味存货量" />
        </div>
      </el-form-item>
      <!--      <button @click="handleBtnClick" class="el-button&#45;&#45;primary">添加</button>-->
      <button style="margin-left: 50px" type="button" class="el-button el-button--primary" @click="handleBtnClick">
        <span>添加</span></button>
      <ul>
        <el-table :data="entry" border highlight-current-row style="width: 100%">
          <el-table-column align="center" label="零食口味" width="250%">
            <template slot-scope="scope">
              <span>{{ scope.row.taste }}</span>
            </template>
          </el-table-column>
          <el-table-column width="250%" align="center" label="零食价格">
            <template slot-scope="scope">
              <span>{{ scope.row.tastePrice }}</span>
            </template>
          </el-table-column>
          <el-table-column width="250%" align="center" label="零食进价">
            <template slot-scope="scope">
              <span>{{ scope.row.inPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column width="250%" align="center" label="零食存货量">
            <template slot-scope="scope">
              <span>{{ scope.row.storeCount }}</span>
            </template>
          </el-table-column>
          <el-table-column width="232%" align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="remove( scope.row.index )"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </ul>
      <button
        style="margin-left: 10px;width: 100%"
        type="button"
        class="el-button el-button--primary"
        @click="onHandSubmitForm"
      ><span>提交</span></button>
    </el-form>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import { queryCommodityShopList, queryCommodityKind, submitCommodity } from '@/api/api'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      entry: [],
      taste: '',
      tastePrice: '',
      inPrice: '',
      storeCount: '',
      noRotate: false,
      noCircle: true,
      noSquare: false,
      imagecropperShow: false,
      imagecropperKey: 0,
      commodityType: [],
      shopName: [],
      image: require('../../img/upload_img.png'),
      form: {
        name: '',
        foodsSize: '',
        foodPrice: '',
        foodName: '',
        foodKind: '',
        startCount: '',
        foodPic: '',
        commoditySelf: '',
        originalPrice: '',
        region1: '',
        region2: '',
        region3: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  created: function() {
    queryCommodityKind().then(response => {
      this.commodityType = response
    })
    queryCommodityShopList().then(response => {
      this.shopName = response
    })
  },
  methods: {
    remove: function(index) {
      console.log(index)
      this.entry.splice(index, 1)
    },
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData
      console.log(resData)
    },
    close() {
      this.imagecropperShow = false
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleBtnClick() {
      this.entry.push({
        'taste': this.taste,
        'tastePrice': this.tastePrice,
        'inPrice': this.inPrice,
        'storeCount': this.storeCount,
        'index': this.entry.length - 1
      })
      this.taste = ''
      this.tastePrice = ''
      this.inPrice = ''
      this.storeCount = ''
    },
    onHandSubmitForm() {
      var reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
      console.log(this.form.startCount)
      var param = {
        foodName: this.form.foodName,
        foodsSize: this.form.foodsSize,
        foodPrice: this.form.foodPrice,
        foodKind: this.form.foodKind,
        startCount: this.form.startCount,
        foodPic: this.image,
        commoditySelf: this.form.commoditySelf,
        originalPrice: this.form.originalPrice,
        commodityJson: JSON.stringify(this.entry)
      }
      if (!isNaN(this.form.startCount)) {
        if (reg.test(this.form.foodPrice)) {
          if (reg.test(this.form.originalPrice)) {
            this.entry.forEach(function(value, index) {
              if (!reg.test(value.inPrice)) {
                this.message({
                  message: '你输入的商品口味进价价格格式非法!',
                  type: 'warning'
                })
                return
              }
              if (!reg.test(value.tastePrice)) {
                this.$message({
                  message: '你输入的商品口味价格格式非法!',
                  type: 'warning'
                })
                return
              }
              if (isNaN(value.storeCount)) {
                this.$message({
                  message: '你输入的商品口味存货量格式非法!',
                  type: 'warning'
                })
                return
              }

              submitCommodity(param).then(response => {
                console.log(response)
                // this.list = response.data.items
                // this.total = response.data.total
              })
            })
          } else {
            this.$message({
              message: '你输入的商品原价格式非法!',
              type: 'warning'
            })
            return
          }
        } else {
          this.$message({
            message: '你输入的商品最低价格格式非法!',
            type: 'warning'
          })
          return
        }
      } else {
        this.$message({
          message: '你输入的商品起售数量格式非法!',
          type: 'warning'
        })
        return
      }
    }
  }

}
</script>

