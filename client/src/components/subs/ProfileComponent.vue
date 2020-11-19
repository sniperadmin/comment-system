<template>
  <v-container fluid>
    <!-- This section for user login  -->
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

    <!-- this section if user is already logged in -->
    <v-card v-else>
      <!-- Avatar will be in this column -->
      <v-row tag="v-card-text">
        <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 3">
          <v-avatar>
            <v-img v-if="getUser.image" :src="getUser.image" />
            <v-icon x-large v-text="`mdi-account-circle`"></v-icon>
          </v-avatar>
        </v-col>

        <v-divider v-if="!$vuetify.breakpoint.smAndDown" vertical />

        <!-- update user form -->
        <v-col>
          <v-form v-model="valid" lazy-validation ref="edit">
            <v-row>
              <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 6">
                <v-text-field
                  v-model="username"
                  label="Username"
                  :rules="usernameRules"
                  outlined
                  dense
                />
              </v-col>
              <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 6">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  outlined
                  dense
                />
              </v-col>
              <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 6">
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="Change Password"
                  outlined
                  dense
                />
              </v-col>
              <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 6">
                <v-text-field
                  v-model="confirmPassword"
                  :rules="passwordRules.concat(confirmPasswordRules)"
                  label="Confirm Password"
                  outlined
                  dense
                />
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-card>

    <!-- this dialog shows if login/register clicked -->
    <v-dialog v-model="dialog" max-width="290">
      <!-- dialog tabs -->
      <v-tabs v-model="tab" align-with-title background-color="indigo darken-2">
        <v-tabs-slider color="indigo"></v-tabs-slider>

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
import rules from "@/mixins/rules";

export default {
  name: "ProfileComponent",
  components: {
    RegisterComponent,
    LoginComponent
  },
  mixins: [rules],
  computed: {
    ...mapGetters(["getUser"])
  },
  data() {
    return {
      tab: null,
      dialog: false,
      authComponents: [
        { name: "Register", component: "register-component" },
        { name: "Login", component: "login-component" }
      ],
      loginResponse: null,
      registerResponse: null,
      // form values
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      // ./end form values
      valid: true
    };
  },
  mounted() {
    if (this.getUser) {
      this.username = this.getUser.username;
      this.email = this.getUser.email;
    }
  },
  watch: {
    confirmPassword: "validateField"
  },
  methods: {
    validateField() {
      this.$refs.edit.validate();
    },
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
            this.tab = 0;
          }
        })
        .catch(error => (this.registerResponse = error.response.data));
    }
  }
};
</script>

<style lang="scss" scoped></style>
