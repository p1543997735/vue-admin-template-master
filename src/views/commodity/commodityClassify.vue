<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="商品分类" width="800px">
        <template slot-scope="scope">
          <span>{{ scope.row.kindName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="471px" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="onHandSubmitForm"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="种类名称" style="margin-top: 20px">
        <el-input v-model="form.foodsKind" />
      </el-form-item>
      <button
        style="margin-left: 10px;width: 100%"
        type="button"
        align="center"
        class="el-button el-button--primary"
        @click="onHandSubmitForm"
      ><span>提交</span></button>
    </el-form>
  </div>
</template>
<script>
import { submitCommodityClass } from '@/api/api'
import { querycommodityitemlistbypage } from '@/api/api'

export default {
  name: 'AvatarUploadDemo',
  data() {
    return {
      list: null,
      listLoading: true,
      form: {
        list: [],
        foodsKind: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      querycommodityitemlistbypage({ page: 1, limit: 100 }).then(response => {
        console.log(response.data)
        this.list = response.data
        this.listLoading = false
      })
    },
    onHandSubmitForm() {
      const foodsKind = this.form.foodsKind
      if (foodsKind === '') {
        this.$message({
          message: '输入不可以为空!',
          type: 'warning'
        })
      } else {
        var param = {
          kindName: foodsKind
        }
        submitCommodityClass(param).then(response => {
          if (response.code === 200) {
            this.$message({
              message: '提交成功!',
              type: 'success'
            })
            this.form.foodsKind = ''
          } else {
            this.$message({
              message: '提交失败!',
              type: 'warning'
            })
          }
        })
      }
    }
  }

}
</script>
