<template>
  <v-container>
    <h1>{{ msg }}</h1>
    <v-card light>
      <v-tabs v-model="tab" align-with-title>
        <v-tabs-slider color="indigo"></v-tabs-slider>

        <v-tab v-for="(item, i) in links" :key="i">
          {{ item.name }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, i) in links" :key="i">
          <v-card flat light color="cyan">
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

export default {
  name: "ChatComponent",
  components: {
    ProfileComponent,
    PostsComponent
  },
  props: {
    msg: String
  },
  data() {
    return {
      tab: null,
      links: [
        { name: "Home", component: "profile-component" },
        { name: "Posts", component: "posts-component" }
        // { name: "Comments", component: "comments-component" }
      ],
      text: "meow"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 10px 0 0;
}
</style>
