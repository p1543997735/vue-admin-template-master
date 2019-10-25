<template>
  <div>

    <el-form ref="form" :model="form" label-width="120px">
      <div class="container">
        <el-form-item label="兼职名称" placeholder="请输入兼职名称">
          <el-input v-model="form.jobName"/>
        </el-form-item>
        <el-form-item label="兼职工资" placeholder="请输入兼职工资">
          <el-input v-model="form.jobPay"/>
        </el-form-item>
        <el-form-item label="开始时间" placeholder="请输入开始时间">
          <el-input v-model="form.startAt "/>
        </el-form-item>
        <el-form-item label="结束时间" placeholder="请输入结束时间">
          <el-input v-model="form.endAt "/>
        </el-form-item>
        <el-form-item label="兼职描述" placeholder="请输入兼职描述">
          <el-input v-model="form.jobDescription "/>
        </el-form-item>
        <el-form-item label="兼职天数" placeholder="请输入兼职天数">
          <el-input v-model="form.jobDays "/>
        </el-form-item>
        <el-form-item label="兼职提供者">
          <el-select v-model="form.jobProvider" placeholder="请选择兼职提供者">
            <el-option
              v-for="item in partjobType"
              :key="item.id"
              :value="item.id"
              :label="item.provider"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="兼职种类">
          <el-select v-model="form.jobKind" placeholder="请选择兼职种类">
            <el-option
              v-for="item in partjobkindType"
              :key="item.id"
              :value="item.id"
              :label="item.title"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="兼职需要人数" placeholder="请输入人数">
          <el-input v-model="form.jobNeedPeople "/>
        </el-form-item>
      </div>
      <el-form-item label="兼职城市">
        <div class="linkage">
          <el-select
            v-model="province"
            placeholder="省级地区"
            @change="choseProvince"
          >
            <el-option
              v-for="item in provincearr"
              :key="item.id"
              :label="item.provinceName"
              :value="item.id"
            />
          </el-select>
          <el-select
            v-model="city"
            placeholder="市级地区"
            @change="choseCity"
          >
            <el-option
              v-for="item in cityarr"
              :key="item.id"
              :label="item.cityName"
              :value="item.id"
            />
          </el-select>
          <el-select
            v-model="block"
            placeholder="区级地区"
            @change="choseBlock"
          >
            <el-option
              v-for="item in blockarr"
              :key="item.id"
              :label="item.cityName"
              :value="item.id"
            />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="详细地址">
        <markdown-editor ref="markdownEditor" v-model="form.details"
                         :options="{hideModeSwitch:true,previewStyle:'tab'}" height="200px"/>
      </el-form-item>
      <button
        style="margin-left: 10px;width: 200px;align: center"
        type="button"
        class="el-button el-button--primary"
        @click="onHandSubmitForm"
      ><span>提交</span></button>
    </el-form>
  </div>

</template>

<script>
    import {submitjob, queryjobprovider, queryjobkindbyid, queryjobprovincebyid} from '@/api/api'
    import MarkdownEditor from '@/components/MarkdownEditor'

    const content = `请输入详细地址`
    export default {
        name: 'SubmitJob',
        components: {MarkdownEditor},
        data() {
            return {
                partjobType: [],
                provincearr: [],
                cityarr: [],
                blockarr: [],
                city: '',
                province: '',
                block: '',
                partjobkindType: [],
                form: {
                    jobName: '',
                    details: '',
                    jobPay: '',
                    startAt: '',
                    endAt: '',
                    jobDescription: '',
                    jobDays: '',
                    jobProvider: '',
                    jobKind: '',
                    jobNeedPeople: '',
                    workCity: '',
                    jobAddress: ''
                },
                content: content,
                languageTypeList: {
                    'en': 'en_US',
                    'zh': 'zh_CN',
                    'es': 'es_ES'
                }
            }
        },
        computed: {
            language() {
                return this.languageTypeList['en']
            }
        },
        created: function () {
            queryjobprovider({page: 1, limit: 100}).then(response => {
                this.partjobType = response.data
            })
            queryjobkindbyid().then(response => {
                this.partjobkindType = response
            })
            queryjobprovincebyid({pid: 0}).then(re => {
                console.log(re[0].province)
                this.provincearr = re
            })
        },
        methods: {
            onHandSubmitForm() {
                var address = this.province + this.city + this.block + this.form.jobAddress;
                var local = this.block;
                console.log(this.form.details)
                // submitjob().then(res => {
                //     this.
                //     console.log(res)
                // })
            },
            choseProvince(id) {
                console.log(id)

                queryjobprovincebyid({pid: id}).then(re => {
                    console.log(re[0])
                    this.cityarr = re
                    this.city = re[0].cityName
                })
            },
            choseCity(id) {
                queryjobprovincebyid({pid: id}).then(re => {
                    console.log(re)
                    this.blockarr = re
                    this.block = re[0].cityName
                })
            },
            choseBlock() {

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
