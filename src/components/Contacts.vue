<template>
  <div>
    <pre>{{$data}}</pre>
  </div>
</template>

<script>
import Socket from '../socket/socket.js'

export default {
    // eslint-disable-next-line
  name: 'Contacts',
  data () {
    return {
      extensions: {}
    }
  },
  methods: {
    loadExtensions (data) {
      this.extensions = data;
    }
  },
  created () {
    Socket.$on("ext", this.loadExtensions);
  }
} 
</script>