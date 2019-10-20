<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="请输入店铺名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button type="primary" @click="dialogTableVisible = true">
        店铺上传
      </el-button>
      <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="店铺上传" @dragDialog="handleDrag">
        <div class="app-container">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="商户名称">
              <el-input v-model="form.businessName" />
            </el-form-item>
            <el-form-item label="商户地址">
              <el-input v-model="form.businessAddress" />
            </el-form-item>
            <el-form-item label="商户联系方式">
              <el-input v-model="form.businessTel" />
            </el-form-item>
            <el-form-item label="管理人">
              <el-input v-model="form.chargeMan" />
            </el-form-item>
            <el-form-item label="管理人联系方式">
              <el-input v-model="form.chargeTel" />
            </el-form-item>
            <el-form-item label="商户图片">
              <el-upload
                action="#"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :http-request="handlePost"
                :file-list="fileList"
                list-type="picture"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <button
              style="margin-left: 10px;width: 100%"
              type="button"
              class="el-button el-button--primary"
              @click="onHandSubmitForm"
            ><span>提交</span></button>
          </el-form>
        </div>
      </el-dialog>
    </div>
    <el-table :data="entry" border highlight-current-row style="margin-top:10px;width: 100%">
      <el-table-column width="210%" align="center" label="商户名称">
        <template slot-scope="scope">
          <span>{{ scope.row.businessName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180%" align="center" label="商户图片">
        <template slot-scope="scope">
          <img :src="scope.row.businessPicture" width="60" height="60" class="head_pic">
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="商户地址">
        <template slot-scope="scope">
          <span>{{ scope.row.businessAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="商户联系方式">
        <template slot-scope="scope">
          <span>{{ scope.row.businessTel }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="管理人">
        <template slot-scope="scope">
          <span>{{ scope.row.chargeMan }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="管理人联系方式">
        <template slot-scope="scope">
          <span>{{ scope.row.chargeTel }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="商户类型">
        <template slot-scope="scope">
          <span>{{ scope.row.shopType }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="商户描述">
        <template slot-scope="scope">
          <span>{{ scope.row.businessDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="折扣">
        <template slot-scope="scope">
          <span>{{ scope.row.purseTag }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="商户标签">
        <template slot-scope="scope">
          <span>{{ scope.row.shopTag }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100%" align="center" label="是否上架">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.show" @change="changeSwitch(scope.row, scope.row.index, scope.row.id)" />
        </template>
      </el-table-column>
      <el-table-column width="186%" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="remove( scope.row.index )"
          >编辑
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="remove( scope.row.index, scope.row.id)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { querybusinesslist, deletetablebyId, querybusinessbysearch, updatetabledatabyid, updatebusinesspicture, uploadfileinoss } from '@/api/api'
// import request from '@/utils/request'
import Pagination from '@/components/Pagination'
import { Message } from 'element-ui'
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

export default {
  components: { Pagination },
  directives: { elDragDialog },
  data() {
    return {
      fileList: [],
      form: {
        businessName: '',
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
      },
      dialogTableVisible: false,
      total: 0,
      entry: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: '',
        type: undefined,
        sort: '+id'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handlePost(file) {
      // // action="/docmanager/external/upload"
      // var data = document.getElementById('upload')
      // const fd = new window.FormData(data)
      // fd.append('categoryId', 1)
      // fd.append('tag', 2)
      // fd.append('description', 3)
      // fd.append('prefix', 4)
      // fd.append('file', file)

      // 配置post请求的参数。参数名file,后面跟要传的文件，参数名fileType，值为category（看后端的具体要求）
      // fd.append('file', file)
      uploadfileinoss({ img: file }).then(response => {
        // console.log(1)
        console.log(this.fileList)
        console.log(response)
        // console.log(file)
      //   // console.log(2)
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    onHandSubmitForm() {
      var param = {
        businessName: this.form.businessName,
        businessAddress: this.form.businessAddress,
        businessTel: this.form.businessTel,
        chargeMan: this.form.chargeMan,
        chargeTel: this.form.chargeTel,
        foodPic: this.image
      }
      updatebusinesspicture(param).then(response => {
        console.log(response)
        // this.list = response.data.items
        // this.total = response.data.total
      })
    },
    changeSwitch({ data, id }) {
      var results = data ? '1' : '0'
      updatetabledatabyid({ id: id, tableName: 'business_infor', data: results, filed: 'isShow' }).then(response => {
        if (response.code === 200) {
          // row.isShow = results
          // this.list[index] = row
          // this.list[index].isShow = results
        } else {
          Message.warning('上架失败！')
        }
        console.log(response)
      })
    },
    handleDrag() {
      this.$refs.select.blur()
    },
    handleFilter() {
      var searchList = this.listQuery.title
      querybusinessbysearch({ page: 1, limit: 10, query: searchList }).then(response => {
        this.entry = response.data
      })
    },
    getList() {
      this.listLoading = true
      console.log(this.listQuery)
      querybusinesslist(this.listQuery).then(response => {
        this.entry = response.data
        this.total = response.count
      })
    },
    remove: function(index, id) {
      deletetablebyId({ tableName: 'snack_shop', id: id }).then(response => {
        if (response.code === 200) {
          this.entry.splice(index, 1)
          this.total = this.total - 1
        } else {
          Message.warning('删除失败！')
        }
      })
      console.log(index)
    }
  }
}
</script>

<style scoped>

</style>
