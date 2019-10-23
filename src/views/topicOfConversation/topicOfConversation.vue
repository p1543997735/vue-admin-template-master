<!--<template>-->
<!--  <div class="fillcontain">-->
<!--    <head-top></head-top>-->
<!--    <div class="table-container">-->
<!--      <el-table-->
<!--        :data="tableData"-->
<!--        :expand-row-keys="expendRow"-->
<!--        :row-key="row => row.index"-->
<!--        style="width: 100%"-->
<!--        @expand="expand"-->
<!--      >-->
<!--        <el-table-column type="expand">-->
<!--          <template slot-scope="props">-->
<!--            <el-form label-position="left" inline class="demo-table-expand">-->
<!--              <el-form-item label="ID">-->
<!--                <span>{{ props.row.postPid }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="话题名称">-->
<!--                <span>{{ props.row.topicName }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="帖子数量">-->
<!--                <span>{{ props.row.postCount }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="帖子图标">-->
<!--                <span>{{ props.row.topicPicUrl }}</span>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          label="话题名称"-->
<!--          prop="topicPid"-->
<!--        />-->
<!--        <el-table-column-->
<!--          label="帖子数量"-->
<!--          prop="postCount"-->
<!--        />-->
<!--        <el-table-column label="操作" width="160">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button-->
<!--              size="small"-->
<!--              @click="handleEdit(scope.row)"-->
<!--            >编辑</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--      &lt;!&ndash;      <el-dialog v-model="dialogFormVisible" title="修改帖子信息">&ndash;&gt;-->
<!--      &lt;!&ndash;        <el-form :model="selectTable">&ndash;&gt;-->
<!--      &lt;!&ndash;          <el-form-item label="帖子名称" label-width="100px">&ndash;&gt;-->
<!--      &lt;!&ndash;            <el-input v-model="selectTable.postPid" auto-complete="off" />&ndash;&gt;-->
<!--      &lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--      &lt;!&ndash;          <el-form-item label="父级话题" label-width="100px">&ndash;&gt;-->
<!--      &lt;!&ndash;            <el-select v-model="selectIndex" :placeholder="selectMenu.label" @change="handleSelect">&ndash;&gt;-->
<!--      &lt;!&ndash;              <el-option&ndash;&gt;-->
<!--      &lt;!&ndash;                v-for="item in menuOptions"&ndash;&gt;-->
<!--      &lt;!&ndash;                :key="item.value"&ndash;&gt;-->
<!--      &lt;!&ndash;                :label="item.label"&ndash;&gt;-->
<!--      &lt;!&ndash;                :value="item.index"&ndash;&gt;-->
<!--      &lt;!&ndash;              />&ndash;&gt;-->
<!--      &lt;!&ndash;            </el-select>&ndash;&gt;-->
<!--      &lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--      &lt;!&ndash;          <el-form-item label="帖子图标" label-width="100px">&ndash;&gt;-->
<!--      &lt;!&ndash;            <el-upload&ndash;&gt;-->
<!--      &lt;!&ndash;              class="avatar-uploader"&ndash;&gt;-->
<!--      &lt;!&ndash;              :action="baseUrl + '/v1/addimg/food'"&ndash;&gt;-->
<!--      &lt;!&ndash;              :show-file-list="false"&ndash;&gt;-->
<!--      &lt;!&ndash;              :on-success="handleServiceAvatarScucess"&ndash;&gt;-->
<!--      &lt;!&ndash;              :before-upload="beforeAvatarUpload"&ndash;&gt;-->
<!--      &lt;!&ndash;            >&ndash;&gt;-->
<!--      &lt;!&ndash;              <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar">&ndash;&gt;-->
<!--      &lt;!&ndash;              <i v-else class="el-icon-plus avatar-uploader-icon" />&ndash;&gt;-->
<!--      &lt;!&ndash;            </el-upload>&ndash;&gt;-->
<!--      &lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--      &lt;!&ndash;        </el-form>&ndash;&gt;-->
<!--      &lt;!&ndash;      </el-dialog>&ndash;&gt;-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import { queryuserposttopic } from '@/api/api'-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      tableData: [],-->
<!--      expendRow: [],-->
<!--      selectTable: {},-->
<!--      dialogFormVisible: false,-->
<!--      selectMenu: {},-->
<!--      selectIndex: null,-->
<!--      menuOptions: [],-->
<!--      pidTopic: [],-->
<!--      total: 0,-->
<!--      listQuery: {-->
<!--        page: 1,-->
<!--        limit: 5,-->
<!--        importance: undefined,-->
<!--        title: '',-->
<!--        type: undefined,-->
<!--        sort: '+id'-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--  },-->
<!--  methods: {-->
<!--    expand(row, status) {-->
<!--      if (status) {-->
<!--        this.getSelectItemData(row)-->
<!--      } else {-->
<!--        const index = this.expendRow.indexOf(row.index)-->
<!--        this.expendRow.splice(index, 1)-->
<!--      }-->
<!--    },-->
<!--    async getSelectItemData(row, type) {-->
<!--      const topic = await queryuserposttopic(row.pid)-->
<!--      this.selectTable = { ...row, ...{ topicName: topic.topicName, postCount: topic.postCount, topicPicUrl: topic.topicPicUrl }}-->

<!--      // this.selectMenu = { label: category.name, value: row.category_id }-->
<!--      this.tableData.splice(row.index, 1, { ...this.selectTable })-->
<!--      this.$nextTick(() => {-->
<!--        this.expendRow.push(row.index)-->
<!--      })-->
<!--      if (type === 'edit' && this.pid !== row.pid) {-->
<!--        this.getMenu()-->
<!--      }-->
<!--    },-->
<!--    async getMenu() {-->
<!--      this.menuOptions = []-->
<!--      try {-->
<!--        const menu = await queryuserposttopic({ pid: this.selectTable.id })-->
<!--        menu.forEach((item, index) => {-->
<!--          this.menuOptions.push({-->
<!--            label: item.name,-->
<!--            value: item.id,-->
<!--            index-->
<!--          })-->
<!--        })-->
<!--      } catch (err) {-->
<!--        console.log('获取父级话题失败', err)-->
<!--      }-->
<!--    }-->
<!--    // handleSelect(index) {-->
<!--    //   this.selectIndex = index-->
<!--    //   this.selectMenu = this.menuOptions[index]-->
<!--    // }-->
<!--  }-->
<!--}-->
<!--</script>-->





<!--<template>-->
<!--  <el-tree-->
<!--    empty-text="暂无数据"-->
<!--    :expand-on-click-node="false"-->
<!--    :props="defaultProps"-->
<!--    :load="loadNode"-->
<!--    node-key="id"-->
<!--    lazy-->
<!--  >-->
<!--    <div slot-scope="{ node, data }" class="custom-tree-node">-->
<!--      <div class="fl"><i class="el-icon-menu" />{{ node.label }}</div>-->
<!--      <div class="fr">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          size="mini"-->
<!--          @click="() => addDialogShow(node, data, 0)"-->
<!--        >-->
<!--          新增-->
<!--        </el-button>-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          size="mini"-->
<!--          @click="() => addDialogShow(node, data, 1)"-->
<!--        >-->
<!--          更新-->
<!--        </el-button>-->
<!--        &lt;!&ndash; <el-button-->
<!--          disabled-->
<!--          type="danger"-->
<!--          size="mini"-->
<!--          @click="() => remove(node, data)">-->
<!--          删除-->
<!--        </el-button> &ndash;&gt;-->
<!--      </div>-->
<!--    </div>-->
<!--  </el-tree>-->
<!--</template>-->
<!--<script>-->
<!--import { queryuserposttopic } from '@/api/api'-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      defaultProps: {-->
<!--        id: 'Id',-->
<!--        label: 'Name',-->
<!--        children: 'children'-->
<!--      },-->
<!--      // 新增相关-->
<!--      addDialog: false,-->
<!--      addForm: {},-->
<!--      addRules: {-->
<!--        name: [{ required: true, message: '请输入基础类型名', trigger: 'blur' }]-->
<!--      },-->
<!--      pid: null, // 基础类型得父级id-->
<!--      flag: null, // 操作标志位-->
<!--      node: {}, // tree 节点对象-->
<!--      nodedata: {}-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--  },-->
<!--  methods: {-->
<!--    // 加载树结点-->
<!--    loadNode(node, resolve) {-->
<!--      // 如果是顶级的父节点-->
<!--      if (node.level === 0) {-->
<!--        // 查找顶级对象-->
<!--        queryuserposttopic(node.level).then(res => {-->
<!--          if (res.Data) {-->
<!--            return resolve(res.Data)-->
<!--          } else {-->
<!--            this.$message.error(res.Msg)-->
<!--          }-->
<!--        }).catch(() => {-->
<!--          const data = []-->
<!--          return resolve(data)-->
<!--        })-->
<!--      } else {-->
<!--        // 根据父节点id找寻下一级的所有节点-->
<!--        queryuserposttopic(node.data.Id).then(res => {-->
<!--          if (res.Data) {-->
<!--            return resolve(res.Data)-->
<!--          } else {-->
<!--            this.$message.error(res.Msg)-->
<!--          }-->
<!--        }).catch(() => {-->
<!--          const data = []-->
<!--          return resolve(data)-->
<!--        })-->
<!--      }-->
<!--    },-->
<!--    remove(node, data) {-->
<!--      console.log(node, data)-->
<!--      // const parent = node.parent;-->
<!--      // const children = parent.data.children || parent.data;-->
<!--      // const index = children.findIndex(d => d.id === data.id);-->
<!--      // children.splice(index, 1);-->
<!--    },-->
<!--    // 新增-->
<!--    addDialogShow(node, data, flag) {-->
<!--      this.node = node //-->
<!--      this.nodedata = data-->
<!--      if (flag === 0) {-->
<!--        this.addDialog = true-->
<!--        this.pid = data.Id-->
<!--        this.flag = 0-->
<!--      }-->
<!--      if (flag === 1) {-->
<!--        this.addDialog = true-->
<!--        this.pid = data.Id-->
<!--        this.addForm.name = data.Name-->
<!--        this.flag = 1-->
<!--      }-->
<!--    },-->
<!--    addSubmit(flag) {-->
<!--      this.$refs.addForm.validate((valid) => {-->
<!--        if (valid) {-->
<!--          this.listLoading = true-->
<!--          const arr = Object.assign({}, this.addForm)-->
<!--          console.log(flag)-->
<!--          if (flag === 0) {-->
<!--            const data = {-->
<!--              pid: this.pid,-->
<!--              name: arr.name-->
<!--            }-->
<!--            // 新增 api-->
<!--            queryuserposttopic(data.pid).then(res => {-->
<!--              const id = res.Data[0].Id-->
<!--              const newChild = { id: id, label: arr.name, children: [] }-->
<!--              if (!this.nodedata.children) {-->
<!--                this.$set(nodedata, 'children', [])-->
<!--              }-->
<!--              this.nodedata.children.push(newChild)-->
<!--              this.addDialog = false-->
<!--              this.$notify.success({-->
<!--                message: '新增成功',-->
<!--                duration: 2000-->
<!--              })-->
<!--            })-->
<!--          }-->
<!--          if (flag === 1) {-->
<!--            const data = {-->
<!--              name: arr.name-->
<!--            }-->
<!--            updatetype(this.pid, data).then(res => {-->
<!--              this.$set(this.node.data, 'Name', arr.name)-->
<!--              this.addDialog = false-->
<!--              this.$notify.success({-->
<!--                message: '更新成功',-->
<!--                duration: 2000-->
<!--              })-->
<!--            }).catch(() => {-->
<!--              this.addDialog = false-->
<!--            })-->
<!--          }-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

