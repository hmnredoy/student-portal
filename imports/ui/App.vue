<template>
    <router-view/>
</template>

<script>
import Navbar from "./layouts/Navbar";

export default {
  components: {
    Navbar
  },
  data() {
    return {};
  },
  methods: {

  },
  mounted() {
    $(document).ready(() => {
      $('.sidenav').sidenav()
    });

  }
};
</script>
