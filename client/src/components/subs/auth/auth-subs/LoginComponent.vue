<template>
  <v-container fluid>
    <v-card-title class="headline">
      Login
    </v-card-title>
    <v-card-text>
      <v-form ref="login" :valid="valid">
        <v-text-field
          v-model="loginForm.username"
          label="Username"
          :rules="usernameRules"
          @input="$emit('input', $event)"
        />
        <v-text-field
          v-model="loginForm.password"
          label="Password"
          :rules="passwordRules"
          @input="$emit('input', $event)"
          @keydown.native.enter="handleLogin"
        />
      </v-form>
    </v-card-text>

    <v-alert
      v-if="loginResponse"
      dense
      outlined
      :type="!loginResponse.success ? 'error' : 'success'"
    >
      {{ loginResponse && loginResponse.message }}
    </v-alert>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="indigo darken-1"
        dark
        :loading="loading"
        @click="handleLogin"
      >
        login
      </v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
import AuthMixin from "@/mixins/rules";

export default {
  name: "LoginComponent",
  mixins: [AuthMixin],
  props: {
    loginResponse: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valid: true,
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    handleLogin() {
      if (this.$refs.login.validate()) {
        this.$emit("start-login", this.loginForm);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
