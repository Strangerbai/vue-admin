<template>
  <div class="components-container">
    <!--    <aside>Markdown is based on-->
    <!--      <a href="https://github.com/nhnent/tui.editor" target="_blank">tui.editor</a> ，simply wrapped with Vue.-->
    <!--      <a-->
    <!--        target="_blank"-->
    <!--        href="https://panjiachen.github.io/vue-element-admin-site/feature/component/markdown-editor.html"-->
    <!--      >-->
    <!--        Documentation </a>-->
    <!--    </aside>-->

    <!--    <div class="editor-container">-->
    <!--      <el-tag class="tag-title">-->
    <!--        Basic:-->
    <!--      </el-tag>-->
    <!--      <markdown-editor v-model="content1" height="300px" />-->
    <!--    </div>-->

    <!--    <div class="editor-container">-->
    <!--      <el-tag class="tag-title">-->
    <!--        Markdown Mode:-->
    <!--      </el-tag>-->
    <!--      <markdown-editor ref="markdownEditor" v-model="content2" :options="{hideModeSwitch:true,previewStyle:'tab'}" height="200px" />-->
    <!--    </div>-->

    <!--    <div class="editor-container">-->
    <!--      <el-tag class="tag-title">-->
    <!--        Customize Toolbar:-->
    <!--      </el-tag>-->
    <!--      <markdown-editor v-model="content3" :options="{ toolbarItems: ['heading','bold','italic']}" />-->
    <!--    </div>-->

    <div class="editor-container">
      <el-form ref="markdowForm" :model="markdownForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
        <!--      <el-tag class="tag-title">-->
        <!--        I18n:-->
        <!--      </el-tag>-->
        <!--      <el-alert-->
        <!--        :closable="false"-->
        <!--        title="You can change the language of the admin system to see the effect"-->
        <!--        type="success"-->
        <!--      />-->
        <el-form-item label="标题" prop="title">
          <el-input v-model="markdownForm.title" />
        </el-form-item>
        <el-form-item label="摘要" prop="desc">
          <el-input v-model="markdownForm.description" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <markdown-editor ref="markdownEditor" v-model="markdownForm.content" :language="language" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">创建/更新</el-button>
          <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="getHtml">
            预览
          </el-button>
          <el-button type="primary" @click="getList">查看历史博客</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="ID" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="300px" label="Title">
          <template slot-scope="{row}">
            <router-link :to="'/components/blog/'+row.id" class="link-type">
              <span>{{ row.title }}</span>
            </router-link>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" min-width="300px">
          <template slot-scope="{row}">
            <el-button v-if="true" type="success" size="small" icon="el-icon-circle-check-outline" @click="updateForm(row)">
              更新
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div v-html="html" />
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import { createBlog, getBlogInfoByToken } from '../../api/blog'
import { getToken } from '../../utils/auth'

const content = `
**This is test**

* vue
* element
* webpack

`
export default {
  name: 'MarkdownDemo',
  components: { MarkdownEditor },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      markdownForm: {
        id: '',
        title: '',
        description: '',
        content: content,
        token: ''
      },
      loginRules: {
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        // password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      // content1: content,
      // content2: content,
      // content3: content,
      // content4: content,
      html: '',
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
    getHtml() {
      this.html = this.$refs.markdownEditor.getHtml()
      console.log(this.html)
    },
    submitForm() {
      console.log(this.markdownForm.content)
      // eslint-disable-next-line no-undef
      this.markdownForm.token = getToken()
      createBlog(this.markdownForm).then(response => {
        if (response.code === '500') {
          this.$message({
            message: '系统错误',
            type: 'fail'
          })
        } else {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
        }
      })
    },
    getList() {
      this.listLoading = true
      getBlogInfoByToken(getToken()).then(response => {
        this.list = response.data
        console.log(this.list)
        this.listLoading = false
      })
    },
    updateForm(row) {
      console.log(this.markdownForm.content)
      // eslint-disable-next-line no-undef
      this.markdownForm.token = getToken()
      this.markdownForm.id = row.id
      this.markdownForm.content = row.content
      this.markdownForm.title = row.title
      this.markdownForm.description = row.description
    }
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
