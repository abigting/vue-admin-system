<!-- 自定义弹窗 -->
<template>
  <transition name="el-fade-in-linear">
    <div class="dialog-cover" v-show="visible" @click.self="handCancel">
      <div class="dialog-content" v-drag>
        <div class="drag-title-header">
          <div class="has-left-border">{{title}}</div>
          <i class="el-icon-close" @click="handCancel"></i>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "index",
    props: ['visible', 'title'],
    methods: {
      handCancel() {
        this.$emit('handCancel')
      },
      submit(){

      }
    },
    data(){
      return{}
    },
    directives: {
      drag: {
        inserted: function (el, binding, vnode) {
          vnode = vnode.elm
          el.onmousedown = ((event) => {
            if (event.target.className !== "drag-title-header") {
              return
            }
            let mouseX = event.clientX - vnode.offsetLeft
            let mouseY = event.clientY - vnode.offsetTop
            document.onmousemove = ((event) => {
              let left, top
              left = event.clientX - mouseX
              top = event.clientY - mouseY
              let minX = -vnode.offsetWidth / 2 + 100
              let maxX = window.innerWidth + vnode.offsetWidth / 2 - 100
              if (left <= minX) {
                left = minX
              } else if (left >= maxX) {
                left = maxX
              }
              let minY = 30
              let maxY = window.innerHeight + vnode.offsetHeight / 2 - 100
              if (top <= minY) {
                top = minY
              } else if (top >= maxY) {
                top = maxY
              }
              vnode.style.left = left + 'px'
              vnode.style.top = top + 'px'
            })
            document.onmouseup = (() => {
              document.onmousemove = document.onmouseup = null
            })
          })
          window.onresize = (() => {
            vnode.style.left = "50%"
            vnode.style.top = "50%"
          })
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  .content{
    padding: 30px 40px;
  }
  // 弹窗
  .dialog-cover{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,.6);
    z-index: 999;
    .dialog-content{

      border-radius: 6px;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background: #fff;
      /*width: 420px;*/
      min-height: 300px;
      z-index: 9999;
      box-shadow: 0px 5px 13px 0px rgba(219, 219, 219, 0.5);
    }
    .el-form-item__label{
      font-weight: 600;
      color: #3A3D49;
    }
    .drag-title-header{
      padding: 16px 16px;
      cursor: move;
      background: #FFFFFF;
      box-shadow: 0px 5px 13px 0px rgba(219, 219, 219, 0.5);
      border-radius: 6px 6px 0px 0px;

      font-weight: 600;
      color: #4A7BED;
    }
    //用户信息区域
    .user-info-block{
      padding: 0 30px 30px;
    }
    // 基本信息块
    .basic-info{
      padding: 20px 0;
      .block{
        height: 60px;
        border-radius: 4px;
        border: 1px solid #D6DBE2;
        padding: 9px 14px;
        box-sizing: border-box;
        background-size: 100% 100%!important;
        float: left;
        margin-right: 20px;
        background-color: rgba(245,247,251,1);
        span{
          font-size: 14px;
          font-weight: 400;
          color: rgba(58, 61, 73, .5);
          line-height: 20px;
        }
        p{
          font-size: 14px;
          font-weight: 600;
          color: rgba(58, 61, 73, 1);
          line-height: 20px;
          margin: 0!important;
        }
      }
    }
    //详细信息-效能/自查块
    .detailed-info-block{
      .top-title-block{
        width: 100%;
        height: 36px;
        margin-bottom: 8px;
        .title{
          height: 36px;
          background: rgba(196, 211, 242, 1);
          float: left;
          line-height: 36px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          color: #1C479E;
          padding: 0 16px;
        }
        .triangle{
          width: 1px;
          border-right: 20px solid transparent;
          border-top: 36px solid;
          color: rgba(196, 211, 242, 1);
          float: left;
        }
      }
    }
    //职位信息块
    .position-info-block{
      .title{
        font-size: 14px;
        font-weight: 600;
        color: #3A3D49;
        margin-bottom: 20px;
      }
      .info-list{
        margin-bottom: 20px;
        p{
          font-size: 14px;
          font-weight: 400;
          color: #3A3D49;
          margin: 0;
          display: inline-block;
          margin-right: 40px;
          span{
            font-size: 14px;
            font-weight: 400;
            color:rgba(58, 61, 73, .5);
            display: inline-block;
          }
        }
      }
      //执业范围
      .range-block{
        font-size: 14px;
        font-weight: 400;
        color: #3A3D49;
        float: left;
        margin: 0;
        margin-top: 12px;
        span{
          font-size: 14px;
          font-weight: 400;
          color:rgba(58, 61, 73, .5);
          display: inline-block;
          text-align: right;
        }
      }
    }
    .el-icon-close{
      float: right;
      cursor: pointer;
      padding-left: 20px;
      color: #4e5472;
      font-size: 20px;
    }
    //带有蓝色左边框的标题
    .has-left-border {
      font-size: 16px;
      font-weight: 500;
      color: #3A3D49;
      padding-left: 8px;
      position: relative;
      display: inline-block;
    }
    .has-left-border::after {
      content: '';
      display: block;
      width: 4px;
      height: 16px;
      background: linear-gradient(180deg, #358FFF 1%, #105AD2 100%);
      border-radius: 2px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
