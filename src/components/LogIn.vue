<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <p v-if="isConnected">Connected</p>
              <p v-if="isConnError" class="error">{{ errorMsg }}</p>
              <p v-if="isAuthError" class="error">{{ errorMsg }}</p>
              
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-account"
                    autocomplete="on"
                    name="email"
                    label="Email"
                    type="text"
                    v-model="authCmd.email"
                    @keyup.enter="login()"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="mdi-key"
                    autocomplete="on"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="authCmd.password"
                    @keyup.enter="login()"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login()">Login</v-btn>
              </v-card-actions>
              <contacts></contacts>
              <pre>{{socketMsg}}</pre>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Socket from "../socket/socket.js";
import Contacts from "./Contacts";

export default {
  name: "LogIn",
  data() {
    return {
      isConnected: false,
      isConnError: false,
      isAuthError: false,
      socketMsg: "",
      errorMsg: "",
      authCmd: {
        action: "auth",
        email: 'saratest@bicomsystems.com',
        password: 'Sara123!'
      },
    };
  },
  methods: {
    login() {
      Socket.$emit("send-msg", JSON.stringify(this.authCmd) + "\n");
    },
    setConnected() {
      this.isConnected = true;
      this.isConnError = false;
      console.log("isConnected: " + this.isConnected);
    },
    setMessage(data) {
      this.socketMsg = data;
      console.log(this.socketMsg);
    },
    handleConnError(message) {
      this.isConnError = true;
      this.errorMsg = message;
    },
    handleAuthError(message) {
      this.isAuthError = true;
      this.errorMsg = message;
    },
  },
  mounted() {
    Socket.$on("open", this.setConnected);
    Socket.$on("recv-msg", this.setMessage);
    Socket.$on("auth-err", this.handleAuthError);
    Socket.$on("conn-err", this.handleConnError);
  },
  components: {
    contacts: Contacts,
  },
};
</script>

<style></style>
