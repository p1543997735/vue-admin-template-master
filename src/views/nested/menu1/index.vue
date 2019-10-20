
<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="零食名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="零食价格">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="零食进价">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="零食规格">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="零食起步件">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="商品种类">
        <el-select v-model="form.region1" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品店家">
        <el-select v-model="form.region2" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="零食图片">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="商品活动">
        <el-select v-model="form.region3" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="零食口味">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
      <el-form-item label="零食口味">
        <el-input v-model="taste" />
      </el-form-item>
      <el-form-item label="零食价格">
        <el-input v-model="tastePrice" />
      </el-form-item>
      <el-form-item label="零食进价">
        <el-input v-model="inPrice" />
      </el-form-item>
      <el-form-item label="零食存货量">
        <el-input v-model="storeCount" />
      </el-form-item>
      <!--      <button @click="handleBtnClick" class="el-button&#45;&#45;primary">添加</button>-->
      <button style="margin-left: 50px" type="button" class="el-button el-button--primary" @click="handleBtnClick"><span>添加</span></button>
      <ul>
        <el-table :data="list" border highlight-current-row :row-class-name="tableRowClassName" style="width: 100%">
          <el-table-column align="center" label="零食口味" width="250%">
            <template slot-scope="scope">
              <span>{{ scope.row.taste }}</span>
            </template>
          </el-table-column>
          <el-table-column width="250%" align="center" label="零食价格">
            <template slot-scope="scope">
              <span>{{ scope.row.tastePrice }}</span>
            </template>
          </el-table-column><el-table-column width="250%" align="center" label="零食进价">
            <template slot-scope="scope">
              <span>{{ scope.row.inPrice }}</span>
            </template>
          </el-table-column><el-table-column width="250%" align="center" label="零食存货量">
            <template slot-scope="scope">
              <span>{{ scope.row.storeCount }}</span>
            </template>
          </el-table-column>
          <el-table-column width="232%" align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </ul>
    </el-form>
  </div>
</template>

<script>
import { fetchList } from '@/api/api'
export default {
  data() {
    return { list: [],
      taste: '',
      tastePrice: '',
      inPrice: '',
      storeCount: '',
      listQuery: {
        page: 1,
        limit: 20
      },
      form: {
        name: '',
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
  created() {
    this.getList()
  },
  methods: {
    // handleSizeChange1: function(pageSize) { // 每页条数切换
    //   this.pageSize = pageSize
    //   this.handleCurrentChange1(this.currentPage1)
    // },
    // handleCurrentChange1: function(currentPage) { // 页码切换
    //   this.currentPage1 = currentPage
    //   this.currentChangePage(this.bondsAllList, currentPage)
    // },
    // // 分页方法（重点）
    // currentChangePage(list, currentPage) {
    //   let from = (currentPage - 1) * this.pageSize
    //   const to = currentPage * this.pageSize
    //   this.tempList = []
    //   for (; from < to; from++) {
    //     if (list[from]) {
    //       this.tempList.push(list[from])
    //     }
    //   }
    // },
    getList() {
      fetchList(this.listQuery).then(response => {
        console.log(response.data())
        // this.list = response.data.items
        // this.total = response.data.total
      })
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
      this.list.push({
        'taste': this.taste,
        'tastePrice': this.tastePrice,
        'inPrice': this.inPrice,
        'storeCount': this.storeCount
      })
      this.taste = ''
      this.tastePrice = ''
      this.inPrice = ''
      this.storeCount = ''
    }
  }

}

</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>
