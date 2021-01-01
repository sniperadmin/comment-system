<template>
  <v-dialog
    v-model="isOpen"
    max-width="290"
    @click:outside="$emit('turn-false', $event)"
  >
    <!-- dialog tabs -->
    <v-tabs v-model="tab" align-with-title background-color="indigo darken-2">
      <v-tabs-slider color="warning"></v-tabs-slider>

      <v-tab v-for="(item, i) in authComponents" :key="i">
        {{ item.name }}
      </v-tab>
    </v-tabs>

    <!-- dialog tab contents -->
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, i) in authComponents" :key="i">
        <v-card flat light>
          <component
            :is="item.component"
            :loginResponse="loginResponse"
            :registerResponse="registerResponse"
            :loading="loading"
            @start-login="login"
            @start-register="register"
          />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-dialog>
</template>

<script>
import axios from "axios";
import RegisterComponent from "./auth-subs/RegisterComponent";
import LoginComponent from "./auth-subs/LoginComponent";

export default {
  name: "AuthModal",
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  components: {
    RegisterComponent,
    LoginComponent
  },
  computed: {
    isOpen: {
      get() {
        return this.dialog;
      },
      set() {
        return (this.dialog = !this.dialog);
      }
    }
  },
  data() {
    return {
      tab: null,
      // isOpen: this.dialog,
      authComponents: [
        { name: "Login", component: "login-component" },
        { name: "Register", component: "register-component" }
      ],
      loginResponse: null,
      registerResponse: null,
      loading: false
    };
  },
  methods: {
    async login(payload) {
      this.loading = true;
      await axios
        .post("http://localhost:9000/api/login", payload)
        .then(res => {
          this.loginResponse = res.data;
          if (!res.data.success) {
            // open notification
            this.loading = false;
          } else {
            this.$store.dispatch("loginUser", res.data.token);
            this.loading = false;
            // tell parent to close modal
            this.$emit("turn-false");
          }
        })
        .catch(error => {
          this.loginResponse = error.response.data;
          this.loading = false;
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
            this.tab = 0;
          }
        })
        .catch(error => (this.registerResponse = error.response.data));
    }
  }
};
</script>

<style lang="scss" scoped></style>
