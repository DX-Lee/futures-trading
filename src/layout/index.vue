<template>
  <div class="app-wrapper">
    <div>
      <navbar />
    </div>
    <app-main/>
  </div>
</template>

<script>
import { AppMain, Navbar } from './components'
export default {
  name: 'layout',
  components: {
    AppMain,
    Navbar
  }
}
</script>

<style lang="scss" scoped>

</style>
