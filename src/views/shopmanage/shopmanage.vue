<template>
  <div class="app-container">
    <el-table :data="list" border highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="50%">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="店铺名称">
        <template slot-scope="scope">
          <span>{{ scope.row.snackShopName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="商家城市">
        <template slot-scope="scope">
          <span>{{ scope.row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="店铺实名">
        <template slot-scope="scope">
          <span>{{ scope.row.shopBossName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="联系方式">
        <template slot-scope="scope">
          <span>{{ scope.row.shopTel }}</span>
        </template>
      </el-table-column>
      <el-table-column width="210%" align="center" label="店铺创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createAt }}</span>
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
import { querycommodityshoptable, deletetablebyId } from '@/api/api'
// import request from '@/utils/request'
import Pagination from '@/components/Pagination'
import { Message } from 'element-ui'

export default {
  components: { Pagination },
  data() {
    return {
      total: 0,
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      console.log(this.listQuery)
      querycommodityshoptable(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.count
      })
    },
    remove: function(index, id) {
      deletetablebyId({ tableName: 'snack_shop', id: id }).then(response => {
        if (response.code === 200) {
          this.list.splice(index, 1)
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
