<template>
  <el-table
    :data="school_activity"
    style="width: 100%"
  >
    <el-table-column
      prop="activityName"
      label="活动名称"
      width="300"
    />
    <el-table-column
      label="活动图片"
      width="300"
    >
      <template slot-scope="scope">
        <img v-image-preview :src="scope.row.activityPictureUrl" width="60" height="60" class="head_pic">
      </template>
    </el-table-column>
    <el-table-column
      prop="createAt"
      label="创建时间"
      width="200"
    />
    <el-table-column
      prop="webUrl"
      label="网址"
      width="300"
    />

  </el-table>
</template>

<script>

import { queryappactivitylist } from '@/api/api'
export default {
  data() {
    return {
      school_activity: []
    }
  },
  created() {
    queryappactivitylist({ page: 1, limit: 10 }).then(res => {
      this.school_activity = res.data
      console.log(res.data)
    })
  }

}
</script>
