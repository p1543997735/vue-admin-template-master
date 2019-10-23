<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="兼职名称" placeholder="请输入兼职名称">
        <el-input v-model="form.jobName" />
      </el-form-item>
      <el-form-item label="兼职工资" placeholder="请输入兼职工资">
        <el-input v-model="form.jobPay" />
      </el-form-item>
      <el-form-item label="开始时间" placeholder="请输入开始时间">
        <el-input v-model="form.startAt " />
      </el-form-item>
      <el-form-item label="结束时间" placeholder="请输入结束时间">
        <el-input v-model="form.endAt " />
      </el-form-item>
      <el-form-item label="兼职描述" placeholder="请输入兼职描述">
        <el-input v-model="form.jobDescription " />
      </el-form-item>
      <el-form-item label="兼职天数" placeholder="请输入兼职天数">
        <el-input v-model="form.jobDays " />
      </el-form-item>
      <el-form-item label="兼职提供者">
        <el-select v-model="form.jobProvider" placeholder="请选择兼职提供者">
          <el-option
            v-for="item in partjobType"
            :key="item.id"
            :value="item.id"
          />
          <!--          :label=" item.kindName"-->
        </el-select>
      </el-form-item>
      <el-form-item label="兼职种类">
        <el-select v-model="form.jobKind" placeholder="请选择兼职种类">
          <el-option
            v-for="item in partjobkindType"
            :key="item.id"
            :value="item.id"
          />
        <!--          :label=" item.kindName"-->
        </el-select>
      </el-form-item>
      <el-form-item label="兼职需要人数" placeholder="请输入人数">
        <el-input v-model="form.jobNeedPeople " />
      </el-form-item>
      <el-form-item label="兼职城市">
        <el-select v-model="form.workCity" placeholder="请选择城市">
          <el-option
            v-for="item in citySelect"
            :key="item.id"
            :value="item.id"
          />
        <!--          :label=" item.kindName"-->
        </el-select>
      </el-form-item>
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
import { submitjob, queryjobprovider } from '@/api/api'
export default {
  name: 'SubmitJob',
  data() {
    return {
      partjobType: [],
      citySelect: [],
      partjobkindType: [],
      form: {
        jobName: '',
        jobPay: '',
        startAt: '',
        endAt: '',
        jobDescription: '',
        jobDays: '',
        jobProvider: '',
        jobKind: '',
        jobNeedPeople: '',
        workCity: ''
      }
    }
  },
  created() {
    queryjobprovider().then(res => {
      console.log(res.data)
    })
  },
  methods: {
    onHandSubmitForm() {
      submitjob().then(res => {
        console.log(res)
      })
    }
  }
}

</script>

<style scoped>
  .container {
    margin: 15px;
    width: 500px;
  }
</style>
