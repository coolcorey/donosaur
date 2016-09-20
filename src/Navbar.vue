<style scoped>

.nav-item-active {
    color: white !important;
}

.bg-faded {
    background: rgba(80, 125, 121, 0.5) !important;
}

.navbar-light .navbar-nav .nav-link {
    color: rgba(255, 255, 255, 0.3);
}

@media screen and (min-width:768px) {
    .navbar-brand-centered {
        position: absolute;
        left: 50%;
        display: block;
        width: 160px;
        text-align: center;
        background-color: #eee;
    }
    .navbar>.container .navbar-brand-centered,
    .navbar>.container-fluid .navbar-brand-centered {
        margin-left: -80px;
    }
}

</style>

<template>

<div>
    <nav class="navbar navbar-light navbar-fixed-top bg-faded">
        <a class="navbar-brand" href="#">
            <img style="height:48px;" src="logo.png" />
        </a>
        <div class="nav navbar-nav pull-xs-right" style="padding-top: 14px;padding-right:10px" v-if="!profile">
            <a class="nav-item nav-link" style="margin-right:10px;" v-link="{ path: '/search', activeClass: 'nav-item-active'}">Search <span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link" v-link="{ path: '/about' , activeClass: 'nav-item-active'}">About</a>
        </div>
        <div class="nav navbar-nav pull-xs-right" style="padding-top:15px;padding-right:10px" v-else>
            <img src="https://envul.com/img/donate.png" style="height: 36px;" />
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
        if (this.$route.path.indexOf('profile') !== -1) {
            this.profile = true;
        }
    }
}

</script>
