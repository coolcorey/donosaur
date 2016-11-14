<style scoped>
.navbar-brand {
  margin-right: 0px !important;
}

.nav-item-active {
    color: white !important;
}

.bg-faded {
    //background: rgba(80, 125, 121, 0.5) !important;
    background: rgba(66, 154, 146, 0.87) !important;
}

.navbar-light .navbar-nav .nav-link {
    color: rgba(255, 255, 255, 0.3);
}

</style>

<template>

<div>
    <nav class="navbar navbar-light navbar-fixed-top bg-faded">
      <div class="container">
        <a class="navbar-brand" href="#">
            <img style="height:48px;" src="logo.png" />
        </a>
        <form class="form-inline float-xs-right" style="padding-top: 14px;"  v-if="!profile">
          <a class="nav-item nav-link" style="margin-right:10px;" v-link="{ path: '/search', activeClass: 'nav-item-active'}">Search <span class="sr-only">(current)</span></a>
          <a class="nav-item nav-link" v-link="{ path: '/about' , activeClass: 'nav-item-active'}">About</a>
        </form>
        
      </div>
    </nav>
</div>

</template>

<script>

import images from './images.js'
export default {
    data: function() {

        return {
            profile: false
        }
    },
    methods: {

    },
    ready: function() {
        console.log();
        if (this.$route.path.indexOf('profile') !== -1) {
            this.profile = true;
        }
    }
}

</script>
