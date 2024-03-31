<template>
  <v-container>
    <v-label>Brasserie Alteration </v-label>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    name: 'Home',

    methods: {
      ...mapActions([]),

      t() {
        
      }
    },

    computed: {
      ...mapGetters([])
    },

    data: () => ({
    }),

    mounted() {

    },
    beforeDestroy() {

    }, 
  }
</script>
