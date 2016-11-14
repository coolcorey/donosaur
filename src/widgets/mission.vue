<style>



</style>

<template>

<div>
    <div class="widget-header">
        <h6><i class="fa fa-file-text-o text-warning" aria-hidden="true"></i>  Mission</h6>
    </div>
    <div class="widget-content" style="padding-top:25px;">
        <div v-if="dataL.meta && dataL.meta.mission">
            <h6 style="color:#115c54">
        {{dataL.meta.mission}}
      </h6>
        </div>
        <div v-else>
            <div>
                <h6 style="color:#115c54; text-align:center;">
          No Mission Statement added.
        </h6>
            </div>
        </div>
    </div>
</div>

</template>

<script>

export default {
    props: ['data'],
    data: function() {
        return {
            dataL: this.data
        }
    },
    ready: function() {

    }
}

</script>
