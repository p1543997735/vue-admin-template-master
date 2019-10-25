<template>
  <div class="components-container">
    <div class="editor-container">
      <markdown-editor ref="markdownEditor" v-model="content" :options="{hideModeSwitch:true,previewStyle:'tab'}" height="200px" />
    </div>
  </div>
</template>

<script>
    import MarkdownEditor from '@/components/MarkdownEditor'
    const content = `请输入详细地址`
    export default {
        name: 'MarkdownDemo',
        components: { MarkdownEditor },
        data() {
            return {
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
        methods: {

        }
    }
</script>

<style scoped>
  .editor-container{
    margin-bottom: 30px;
  }
  .tag-title{
    margin-bottom: 5px;
  }
</style>
