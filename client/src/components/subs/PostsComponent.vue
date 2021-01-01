<template>
  <v-container>
    <v-row v-if="!posts.length" justify="center">
      <v-col cols="6">
        <v-skeleton-loader
          type="list-item-avatar, article"
          class="mb-3"
          elevation="1"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="6">
        <v-skeleton-loader
          type="list-item-avatar, article"
          class="mb-3"
          elevation="1"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="6" v-for="post in posts" :key="post.id">
        <v-card>
          <v-card flat>
            <v-card-title>
              <v-avatar size="50" color="grey" class="mr-4 text-capitalize">
                {{ post.user.username.substring(0, 1) }}
              </v-avatar>
              <span>
                {{ post.user.username }}
              </span>
            </v-card-title>

            <v-card-text>
              {{ post.description }}
            </v-card-text>

            <v-card-actions>
              <v-badge overlap content="122" class="mr-5">
                <v-btn color="secondary" icon>
                  <v-icon small>mdi-thumb-up</v-icon>
                </v-btn>
              </v-badge>

              <v-badge
                :value="post.comments.length"
                overlap
                :content="post.comments.length"
                class="mr-5"
              >
                <v-btn color="secondary" icon @click="postDialog = true">
                  <v-icon small>mdi-comment</v-icon>
                </v-btn>
              </v-badge>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
    </v-row>

    <!--
      TODO: add post dialog to show post details
    -->
    <!-- <v-dialog scrollable v-model="postDialog">
      content
    </v-dialog> -->

    <v-snackbar
      :value="!!errorMsg"
      :timeout="-1"
      absolute
      bottom
      color="error"
      outlined
      right
    >
      {{ errorMsg }}
    </v-snackbar>
    {{ percentCompleted }}
  </v-container>
</template>

<script>
import Vue from "vue";
import axios from "axios";

Vue.use(require("vue-moment"));

export default {
  name: "PostsComponent",
  data() {
    return {
      posts: [],
      errorMsg: null,
      percentCompleted: null,
      postDialog: false
    };
  },
  async mounted() {
    try {
      const reqPosts = await axios.get("http://localhost:9000/api/posts", {
        timeout: 5000,
        loading: true
      });
      this.posts = reqPosts.data;
    } catch (error) {
      console.log(error);
      this.errorMsg =
        "Failed to get posts, you may be disconnected! Let's refresh page";
    }
  }
};
</script>

<style lang="scss" scoped></style>
