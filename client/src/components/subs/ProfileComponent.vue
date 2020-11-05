<template>
  <v-container>
    <v-card v-if="!getUser">
      <h3 class="mb-3">Let's login to comment</h3>
      <v-skeleton-loader
        type="article, actions"
        class="mb-3"
      ></v-skeleton-loader>

      <v-btn color="indigo" dark @click="dialog = true">
        Login/Register here
      </v-btn>
    </v-card>

    <v-card v-else>
      <v-avatar>
        <v-img src="" />
      </v-avatar>
    </v-card>

    <v-dialog v-model="dialog" max-width="290">
      <v-tabs v-model="tab" align-with-title background-color="indigo darken-2">
        <v-tabs-slider color="indigo"></v-tabs-slider>

        <v-tab v-for="(item, i) in authComponents" :key="i">
          {{ item.name }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, i) in authComponents" :key="i">
          <v-card flat light>
            <component
              :is="item.component"
              :loginResponse="loginResponse"
              :registerResponse="registerResponse"
              @start-login="login"
              @start-register="register"
            />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import RegisterComponent from "@/components/subs/RegisterComponent";
import LoginComponent from "@/components/subs/LoginComponent";

export default {
  name: "ProfileComponent",
  components: {
    RegisterComponent,
    LoginComponent
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  data() {
    return {
      tab: null,
      dialog: false,
      authComponents: [
        {
          name: "Register",
          component: "register-component"
        },
        { name: "Login", component: "login-component" }
      ],
      loginResponse: null,
      registerResponse: null
    };
  },
  methods: {
    async login(payload) {
      await axios
        .post("http://localhost:9000/api/login", payload)
        .then(res => {
          this.loginResponse = res.data;
          if (!res.data.success) {
            // open notification
          } else {
            this.$store.dispatch("loginUser", res.data.token);
            this.dialog = false;
          }
        })
        .catch(error => {
          this.loginResponse = error.response.data;
        });
    },
    async register(payload) {
      await axios
        .post("http://localhost:9000/api/register", payload)
        .then(res => {
          this.registerResponse = res.data;
          if (!res.data.success) {
            // open notification
          } else {
            this.dialog = false;
          }
        })
        .catch(error => (this.registerResponse = error.response.data));
    }
  }
};
</script>

<style lang="scss" scoped></style>
