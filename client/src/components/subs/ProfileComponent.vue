<template>
  <v-container fluid>
    <!--
      This section requires user login
    -->
    <v-card v-if="!getUser" flat color="transparent">
      <v-row justify="center">
        <v-col cols="6">
          <v-alert color="primary" outlined class="mb-3 font-weight-bold">
            Let's login to add comments!
          </v-alert>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="6">
          <v-skeleton-loader
            type="list-item-avatar, article"
            class="mb-3"
            elevation="1"
          ></v-skeleton-loader>
        </v-col>
      </v-row>

      <v-card-actions>
        <v-row>
          <v-col>
            <v-btn color="primary" dark @click="dialog = !dialog">
              <v-icon left>
                mdi-login-variant
              </v-icon>
              Login/Register
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>

    <!--
      this section shows logged in user details
    -->
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
    <AuthModal @turn-false="dialog = false" :dialog="dialog" />
  </v-container>
</template>

<script>
import AuthModal from "./auth/AuthModal.vue";
import { mapGetters } from "vuex";
import rules from "@/mixins/rules";

export default {
  components: { AuthModal },
  name: "ProfileComponent",
  mixins: [rules],
  computed: {
    ...mapGetters(["getUser"])
  },
  data() {
    return {
      dialog: false,
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
    }
  }
};
</script>
<style lang="scss" scoped></style>
