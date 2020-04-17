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
    <el-carousel trigger="click" :height="bannerHeight">
      <el-carousel-item v-for="item in carouselImages" :key="item">
        <img :src="item ">
      </el-carousel-item>
    </el-carousel>
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
      bannerHeight: '150px',
      screen: '0px'
    }
  },

  mounted() {
    this.getUserPicture()
    this.screen = window.innerWidth
    this.getSize()
    window.onresize = () => {
      this.screen = window.innerWidth
      this.getSize()
    }
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
      getPictureName().then(response => {
        if (response.code === '500') {
          this.$message({
            message: '系统错误',
            type: 'fail'
          })
        } else {
          if (response.data.length !== 0) {
            this.carouselImages = response.data
          }
        }
      })
    },
    getSize() {
      if (this.screen > 480) {
        this.bannerHeight = 300 + 'px'
      } else {
        this.bannerHeight = 150 + 'px'
      }
    }
  }
}
</script>

<style>
  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

