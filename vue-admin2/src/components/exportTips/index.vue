<template>
  <div class="tips-show-component">
    <transition name="el-zoom-in-top">
      <div v-show="tipShow" class="transition-box">
        <el-progress :text-inside="true" :stroke-width="16" :percentage="step" :status="stepType"></el-progress>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      tipShow: {
        type: [String, Boolean],
        default: false,
      },
      step: {
        type: Number,
        default: 0,
      },
      stepType:{
        type:String,
        default:'success'
      }
    }
  }
</script>

<style scoped>
  .tips-show-component {
    position: fixed;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
  }

  .transition-box {
    width: 400px;
  }
</style>
