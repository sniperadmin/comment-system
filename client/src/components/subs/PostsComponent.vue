<template>
  <v-container>
    <v-row v-if="!posts.length" no-gutters justify="center">
      <v-col cols="6">
        <v-col cols="12">
          <v-skeleton-loader
            type="list-item-avatar, article"
            class="mb-3"
            elevation="1"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="12">
          <v-skeleton-loader
            type="list-item-avatar, article"
            class="mb-3"
            elevation="1"
          ></v-skeleton-loader>
        </v-col>
        <!-- <v-col cols="12">
          <v-skeleton-loader
            type="list-item-avatar, article"
            class="mb-3"
            elevation="1"
          ></v-skeleton-loader>
        </v-col> -->
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="6" v-for="post in posts" :key="post.id">
        <v-card>
          <v-card-text>
            <v-card flat>
              <div class="d-flex flex-no-wrap">
                <v-avatar size="50" color="grey">
                  AA
                </v-avatar>
                <v-card-title>
                  {{ post.description }}
                </v-card-title>
              </div>

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
                  <v-btn color="secondary" icon>
                    <v-icon small>mdi-comment</v-icon>
                  </v-btn>
                </v-badge>
              </v-card-actions>
            </v-card>

            <!-- <v-row justify="center" style="border: 1px solid #ddd">
              <v-col
                cols="10"
                v-for="comment in post.comments"
                :key="comment.id"
                class="d-flex flex-no-wrap justify-start pa-3"
              >
                <v-avatar size="30" color="grey" class="mr-3">
                  AA
                </v-avatar>
                <div class="mt-auto">
                  {{ comment.body }}
                </div>
                <v-divider :key="comment.id" />
              </v-col>
            </v-row> -->

            <v-list>
              <template v-for="(comment, index) in post.comments">
                <v-list-item :key="comment.id">
                  <v-list-item-avatar color="grey">
                    <v-img v-if="comment.image" :src="comment.image"></v-img>
                    <v-subheader v-else>
                      {{ comment.user.username.substring(0, 2).toUpperCase() }}
                    </v-subheader>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <!-- <v-list-item-title v-html="item.title"></v-list-item-title> -->
                    <v-list-item-title
                      v-text="comment.body"
                    ></v-list-item-title>

                    <v-list-item-subtitle>
                      {{ comment.createdAt | moment("calendar") }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider :key="index"></v-divider>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

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
      percentCompleted: null
    };
  },
  async mounted() {
    try {
      const reqPosts = await axios.get("http://localhost:9000/api/posts", {
        // timeout: 5000,
        loading: true,
        onUploadProgress: progressEvent => {
          if (progressEvent) {
            // const total = parseFloat(
            //   progressEvent.currentTarget.responseHeaders["Content-Length"]
            // );
            const current = progressEvent.currentTarget.response.length;

            // let percentCompleted = Math.floor((current / total) * 100);
            this.percentCompleted = current;
          }
        }
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
