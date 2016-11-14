<style>

a[disabled="disabled"] {
    pointer-events: none;
}

</style>

<template>

<div>
    <div class="widget-header">
        <h6><i class="fa fa-share-square-o text-warning" aria-hidden="true"></i> Social Media</h6>
    </div>
    <div style="text-align: center;padding-top:25px" class="widget-content">
        <a href="{{dataL.facebook}}" :disabled="dataL.facebook">
            <h1>
              <i class="fa fa-facebook-square" style="color:#3b5998;" aria-hidden="true"></i>
            </h1>
        </a>
        <hr>
        <a href="{{dataL.gplus}}" :disabled="dataL.gplus">
            <h1>
              <i class="fa fa-google-plus-square" style="color:#d34836;" aria-hidden="true"></i>
            </h1>
        </a>
        <hr>
        <div>
            <a href="{{dataL.twitter}}" :disabled="dataL.twitter">
              <h1>
                <i class="fa fa-twitter-square" style="color:#1dcaff;" aria-hidden="true"></i>
              </h1>
            </a>
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
            twitter: '',
            gplus: '',
            facebook: ''
        }
    },
    watch: {
        'dataL.meta': function() {
            if (this.dataL.meta.twitter) {
                this.dataL.twitter = dataL.meta.twitter;
            }
            if (this.dataL.meta.gplus) {
                this.dataL.gplus = dataL.meta.gplus;
            }
            if (this.dataL.meta.facebook) {
                this.dataL.facebook = dataL.meta.facebook;
            }
        }
    }
}

</script>
