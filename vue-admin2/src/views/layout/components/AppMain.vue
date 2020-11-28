<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view/>
    </transition>
	<el-backtop target=".app-main"></el-backtop>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>

<style scoped>
.app-main {
  padding: 8px 9px 60px;
  /*50 = navbar  */
  height: calc(100vh - 104px);
  position: relative;
  overflow-x: hidden;
  background: #ffffff;
  margin: 8px;
}
</style>
