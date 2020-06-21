<template>
  <div class="demo">
    <div class="mblog">
      <h3>{{ blog.title }}</h3>
      <i>{{ blog.description }}</i>
      <div class="content" v-html="mdResult" />
    </div>
  </div>
</template>
<script>
// import MarkdownIt from 'markdown-it'
import { getBlogInfoById } from '../../api/blog'
const hljs = require('highlight.js') // https://highlightjs.org/
const md = require('markdown-it')({
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        // eslint-disable-next-line no-empty
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})

export default {
  name: 'MarkdownBlogs',
  data() {
    return {
      id: '',
      mdResult: '',
      blog: {
        title: 'ddd',
        description: 'ddd',
        content: ''
      }
    }
  },
  created() {
    // eslint-disable-next-line no-unused-vars
    this.id = this.$route.params && this.$route.params.id
    this.getBlog()
  },
  methods: {
    getBlog() {
      getBlogInfoById(this.id).then(response => {
        console.log(response)
        if (response.code === '500') {
          this.$message({
            message: '系统错误',
            type: 'fail'
          })
        } else {
          this.blog.content = response.data.content
          this.mdResult = md.render(this.blog.content)
          this.blog.title = response.data.title
          this.blog.description = response.data.description
        }
      })
    }
  }
  // mounted() {
  //   // const md = new MarkdownIt()
  //   this.mdResult = md.render(`
  //     `)
  // }

}
</script>
