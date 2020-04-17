<template>
  <div class="components-container">
    <aside>
      上传图片
    </aside>
    <div class="editor-container">
      <dropzone id="myVueDropzone" url="/dev-api/vue-element-admin/user/uploadImg" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
    </div>
    <br>
    <br>
    <br>
    <div class="post">
      <el-carousel id="el-carousel" :interval="2000" indicator-position="none">
        <el-carousel-item v-for="item in carouselImages" :key="item">
          <img :src="item ">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>

import Dropzone from '@/components/Dropzone'
import { getPictureName } from '../../api/user'
const avatarPrefix = '?imageView2/1/w/80/h/80'
const carouselPrefix = '?imageView2/2/h/440'
export default {
  name: 'DropzoneDemo',
  components: { Dropzone },
  data() {
    return {
      carouselImages: [
        'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
        'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
        'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
        'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
      ],
      avatarPrefix,
      carouselPrefix,
      bannerHeight: 700,
      screenWidth: 1920
    }
  },

  mounted() {
    this.getUserPicture()
    this.setSize1()
    const that = this

    window.addEventListener('resize', function() {
      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      that.screenWidth = width
      that.setSize()
    }, false)
  },
  methods: {
    dropzoneS(file) {
      console.log(file)
      this.$message({ message: 'Upload success', type: 'success' })
    },
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: 'Delete success', type: 'success' })
    },
    getUserPicture() {
      // eslint-disable-next-line no-undef
      getPictureName().then(response => {
        if (response.code === '500') {
          this.$message({
            message: '系统错误',
            type: 'fail'
          })
        } else {
          if (response.data !== []) {
            this.carouselImages = response.data
          }
        }
      })
    },

    setSize1: function() {
      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      this.screenWidth = width
      this.bannerHeight = 700 / 1920 * this.screenWidth - 50
      document.getElementById('el-carousel').style.height = this.bannerHeight + 'px'
    },
    setSize: function() {
      this.bannerHeight = 700 / 1920 * this.screenWidth - 50
      document.getElementById('el-carousel').style.height = this.bannerHeight + 'px'
    }
  }
}
</script>

<style>
  .el-carousel__container {
    height: 100% !important;
  }

  img {
    display: inline-block;
    height: auto;
    max-width: 100%;
  }
</style>

