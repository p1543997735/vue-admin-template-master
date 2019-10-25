<template>
  <el-table
    :data="partjoblist"
    style="width: 100%"
  >
    <el-table-column
      prop="jobName"
      label="工作名称"
      width="180"
    />
    <el-table-column
      prop="jobPay"
      label="薪资"
      width="180"
    />
    <el-table-column
      prop="startAt"
      label="开始时间"
      width="180"
    />
    <el-table-column
      prop="endAt"
      label="结束时间"
      width="180"
    />
    <el-table-column
      label="岗位责任说明"
      width="180"
    >
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.jobDescription }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" align="center">查看</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      prop="jobDays"
      label="结薪类型"
      width="180"
    /><el-table-column
      prop="jobProvider"
      label="工作提供者"
      width="180"
    /><el-table-column
      prop="jobKind"
      label="工作种类"
      width="180"
    /><el-table-column
      prop="isPass"
      label="是否通过"
      width="180"
    /><el-table-column
      prop="createAt"
      label="创建日期"
      width="180"
    /><el-table-column
      prop="jobNeedPeople"
      label="需要人数"
      width="180"
    />
    <el-table-column
      prop="workCity"
      label="工作城市"
      width="180"
    /><el-table-column
      prop="signUpCount"
      label="注册计数"
      width="180"
    /><el-table-column
      prop="jobAddress"
      label="工作地址"
      width="180"
    /><el-table-column
      prop="jobShop"
      label="工作地点"
      width="180"
    /><el-table-column
      prop="payUnit"
      label="付款单位"
      width="180"
    /><el-table-column
      prop="workLocal"
      label="工作区"
      width="180"
    /> <el-table-column label="操作" width="180">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"
        >编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click=""
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { queryjoblist } from '@/api/api'
export default {
  data() {
    return {
      partjoblist: []
    }
  },
  created() {
    queryjoblist({ page: 1, limit: 10 }).then(res => {
      this.partjoblist = res.data
      console.log(res.data)
    })
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    }
  }
}
</script>

