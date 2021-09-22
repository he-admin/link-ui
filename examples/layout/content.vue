<template>
  <doc-header></doc-header>
  <div>
    <nav-slider></nav-slider>
    <router-view/>
  </div>
</template>

<script>
import DocHeader from './header';
import NavSlider from './nav-slide';

export default {
  name: "content",
  components: {
    DocHeader,
    NavSlider
  }
}
</script>

<style scoped>

</style>
