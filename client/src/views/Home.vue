<template>
  <v-container fluid>
    <!-- Logo -->
    <img alt="Vue logo" src="../assets/mevn.jpg" width="250" />
    <v-row>
      <!-- render main component -->
      <MainComponent msg="Comment system" />
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import MainComponent from "@/components/MainComponent.vue";

export default {
  name: "home",
  components: {
    MainComponent
  }
};
</script>
