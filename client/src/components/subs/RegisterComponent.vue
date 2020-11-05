<template>
  <v-container fluid>
    <v-card-title class="headline">
      Register
    </v-card-title>
    <v-card-text>
      <v-form ref="register">
        <v-text-field
          v-model="registerForm.username"
          label="Username"
          :rules="usernameRules"
        />
        <v-text-field
          v-model="registerForm.email"
          label="Email"
          :rules="emailRules"
        />
        <v-text-field
          v-model="registerForm.password"
          label="Password"
          :rules="passwordRules"
        />
      </v-form>
    </v-card-text>

    <v-alert
      v-if="registerResponse"
      dense
      outlined
      :type="!registerResponse.success ? 'error' : 'success'"
    >
      {{ registerResponse.message }}
    </v-alert>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="indigo darken-1" dark @click="handleRegister">
        register
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
    registerResponse: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      registerForm: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    handleRegister() {
      if (this.$refs.register.validate()) {
        this.$emit("start-register", this.registerForm);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
