<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="请输入店铺名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button type="primary" @click="dialogTableVisible = true">
        店铺上传
      </el-button>
    </div>
    <el-table :data="providerArray" border highlight-current-row style="margin-top:10px;width: 100%">
      <el-table-column width="210%" align="center" label="提供者名称">
        <template slot-scope="scope">
          <span>{{ scope.row.provider }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180%" align="center" label="提供者头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" width="40" height="40">
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="提供者电话">
        <template slot-scope="scope">
          <span>{{ scope.row.telPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="提供兼职数量">
        <template slot-scope="scope">
          <span>{{ scope.row.provideCount }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="身份">
        <template slot-scope="scope">
          <span>{{ scope.row.identity }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="联系地址">
        <template slot-scope="scope">
          <span>{{ scope.row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="年龄">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="微信">
        <template slot-scope="scope">
          <span>{{ scope.row.wx }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="商户描述">
        <template slot-scope="scope">
          <span>{{ scope.row.isVerify }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
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
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { queryPartTimeJobProvider } from '@/api/api'
import Pagination from '@/components/Pagination'

export default {
  name: 'PartjobProvider',
  components: { Pagination },
  data() {
    return {
      providerArray: [],
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  }, created() {
    this.getProviderData()
  }, methods: {
    getProviderData() {
      queryPartTimeJobProvider({ page: 1, limit: 10 }).then(response => {
        // console.log(1)
        console.log(response)
        this.providerArray = response.data
        // console.log(file)
        //   // console.log(2)
      })
    }
  }
}
</script>

<style scoped>

</style>
