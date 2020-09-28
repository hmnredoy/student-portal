<template>
  <div>
    <Navbar/>
    <slot></slot>
  </div>
</template>

<script>
import Navbar from "./Navbar";
export default {
  name: "Master",
  components: [
    Navbar
  ]
}
</script>

<style scoped>

</style>