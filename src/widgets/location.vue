<style>

#gmap_display .text-marker {
    max-width: none!important;
    background: none!important;
}

img {
    max-width: none;
}

</style>

<template>

<div>
    <div class="widget-header">
        <h6><i class="fa fa-map-marker text-warning" aria-hidden="true"></i> Location</h6>
    </div>
    <div class="widget-content" style="padding:0;">
        <div id="gmap_display" style="height:100%; width:100%;max-width:100%;" v-if="mapsurl">
            <iframe style="height:100%;width:100%;border:0;" frameborder="0" :src="mapsurl"></iframe>
        </div>
    </div>
</div>

</template>

<script>

export default {
    props: ['data'],
    data: function() {
        return {
            dataL: this.data,
            mapsurl: ''
        }
    },
    watch: {
        'dataL.meta': function() {
            this.mapsurl = 'https://www.google.com/maps/embed/v1/place?q=' + this.dataL.meta.STREET + ',+' + this.dataL.meta.CITY + ',+' + this.dataL.meta.STATE + '&key=AIzaSyAN0om9mFmy1QN6Wf54tXAowK4eT0ZUPrU'
        }
    }
}

</script>
