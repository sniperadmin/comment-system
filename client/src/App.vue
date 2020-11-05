<template>
  <v-app>
    <v-main>
      <div id="nav">
        <v-btn text link to="/">Home</v-btn> |
        <v-btn text link to="/about">About</v-btn>
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#nav {
  padding: 30px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.theme--dark.v-application {
  background: rgb(8, 56, 100) !important;
  background: linear-gradient(
    180deg,
    rgb(49, 30, 102) 0%,
    rgb(94, 48, 99) 100%
  );
}
</style>
