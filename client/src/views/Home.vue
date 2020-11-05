<template>
  <v-container>
    <img alt="Vue logo" src="../assets/mevn.jpg" width="250" />
    <ChatComponent msg="Comment system" />
  </v-container>
</template>

<script>
// @ is an alias to /src
import ChatComponent from "@/components/ChatComponent.vue";

export default {
  name: "home",
  components: {
    ChatComponent
  }
};
</script>
