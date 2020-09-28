<template>
  <div>
    <nav class="navbar">
      <div class="nav-wrapper">
        <router-link to="/" class="brand-logo">Student Portal</router-link>

        <a href="#" class="sidenav-trigger" data-target="mobile-nav">
          <i class="material-icons">menu</i>
        </a>

        <ul class="right hide-on-med-and-down" style="margin-right: 50px;">
          <li>
          <router-link to="/">Students</router-link>
          </li>
          <li>
            <router-link to="/subjects">Subjects</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <ul class="sidenav" id="mobile-nav">
      <li><a href="#">Students</a></li>
      <li><a href="#">Subjects</a></li>
      <li><a href="#">Service</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </div>

</template>

<script>

export default {
  name: "Navbar",
  components: {

  },
  mounted() {
    /*window.onscroll = function () {
      scrollFunction()
    }

    function scrollFunction() {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navbar").style.padding = "10px 10px";
        document.getElementById("brand-logo").style.fontSize = "15px";
      } else {
        document.getElementById("navbar").style.padding = "30px 10px";
        document.getElementById("brand-logo").style.fontSize = "25px";
      }
    }*/

  }
}
</script>


<style scoped>
.navbar{
  min-height: 100px;
}

.brand-logo {
  margin-left: 1.2rem;
}

.sidenav-trigger, .brand-logo, .right{
  margin-top: 1.2rem;
}
</style>