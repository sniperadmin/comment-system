export default {
  data() {
    return {
      emailRules: [
        v => !!v || "email is required",
        v => /.+@.+/.test(v) || "email format is not correct"
      ],
      passwordRules: [
        v => !!v || "password required",
        v => v.length >= 6 || "password should contain min 6 characters",
        v => v.length <= 25 || "password should not exceed 25 characters"
      ],
      usernameRules: [
        v => !!v || "username is required",
        v =>
          v.length <= 25 ||
          this.$vuetify.lang.t("username cannot exceed 25 characters")
      ],
      confirmPasswordRules: [
        v => v === this.password || "confirm password must match the password"
      ]
    };
  }
};
