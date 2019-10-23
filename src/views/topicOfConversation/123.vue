<template>
  <div class="custom-tree-container">
    <div class="block">
      <el-tree
        :data="data"
        node-key="id"
        accordion
        :expand-on-click-node="false">
        <span slot-scope="{ children, data }" class="custom-tree-node">
<!--          <h2>{{data.topicName}}</h2>-->
          <span>{{data.topicName}}</span>
          <span>
            <el-button
              type="primary"
              size="mini"
              @click="() => append(data)"
            >
              Append
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>
<script>
    import {queryuserposttopic} from '@/api/api'

    let id = 1000
export default {
  data() {
    return {
      data: ''
    }
  },
  created() {
    queryuserposttopic().then(response => {
      this.data = JSON.parse(JSON.stringify(response.data))
      console.log(response.data)
    })
  },

  methods: {
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    }
  }

}
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
