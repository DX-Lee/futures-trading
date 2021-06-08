<template>
  <section class="app-main">
    <transition>
    <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.app-main {
  height: calc(100vh - 60px);
  min-width: 1080px;
  position: relative;
  overflow: hidden;
  background-color: #f7f7f7;
}

</style>
