<template>
  <div>
    {{ posts }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostsComponent",
  data() {
    return {
      posts: []
    };
  },
  async mounted() {
    this.posts = await axios.get("http://localhost:9000/api/posts")
      .then(d => d.data)
      .catch(e => console.log(e));
  }
};
</script>

<style lang="scss" scoped></style>
