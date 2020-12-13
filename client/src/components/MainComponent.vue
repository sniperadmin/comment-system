<template>
  <v-container fluid>
    <h1>{{ msg }}</h1>
    <v-card light>
      <v-row no-gutters>
        <v-col>
          <!-- Vuetify Top card tabs -->
          <v-tabs v-model="tab" headline>
            <!-- customize slider color -->
            <v-tabs-slider color="indigo"></v-tabs-slider>

            <v-tab v-for="(item, i) in links" :key="i">
              {{ item.name }}
            </v-tab>
          </v-tabs>
        </v-col>

        <v-col align-self="center">
          <v-btn v-if="getUser" outlined color="error" @click="logout">
            <v-icon class="mr-3">mdi-power-standby</v-icon>
            logout
          </v-btn>
        </v-col>
      </v-row>

      <!-- Vuetify tabs content -->
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, i) in links" :key="i">
          <v-card flat light color="blue-grey lighten-3">
            <!--
              dynamic Vuejs component rendering
              it picks up component name and renders
              the corresponding component
            -->
            <component :is="item.component" />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import ProfileComponent from "./subs/ProfileComponent";
import PostsComponent from "./subs/PostsComponent";
import { mapGetters } from "vuex";

export default {
  name: "MainComponent",
  components: {
    ProfileComponent,
    PostsComponent
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tab: null,
      links: [
        { name: "Profile", component: "profile-component" },
        { name: "Posts", component: "posts-component" }
      ]
    };
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logoutUser").then(() => {
        window.localStorage.removeItem("vuex");
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 10px 0 0;
}
</style>
