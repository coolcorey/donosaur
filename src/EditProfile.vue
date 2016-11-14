<template>
  <div>

    {{ein}}
    {{key}}

  </div>
</template>

<script>
export default {
  data: function(){
    var ein = this.$route.params.ein;
    if (ein.length != 9) {
        alert('Invalid EIN');
        return;
    }

    console.log(ein.hashCode());

    var key = this.$route.params.key;
    return {
      ein: ein,
      key: key
    }
  }
}

</script>
