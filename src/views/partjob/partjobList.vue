<template>
  <div class="app-container">
    <el-table :data="partjobList" border highlight-current-row style="width: 100%">
      <el-table-column width="120%" align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120%" align="center" label="兼职标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120%" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.craateAt}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'PartjobList',
  data() {
    return {
      partjobList: '',
    }
  }
}
</script>

<style scoped>

</style>
