import Vue from "vue";
//import router from "../router";

const socket = new WebSocket("ws://localhost:8080/ws");

const emitter = new Vue({
  methods: {
    send(message) {
      if (1 === socket.readyState) socket.send(message);
    },
    parseResponse(data) {
      let response = JSON.parse(data);
      if (response.type === "response") {
        if (response.action === "auth") {
          if (response.success === 1) {
            let initReq = {
              action: "init",
              actionid: "glocom_web_init",
              actions: [
                {
                  action: "extensions",
                },
              ],
            };
            emitter.send(JSON.stringify(initReq) + "\n");
          } else {
            emitter.$emit("auth-err", response.message);
          }
        } else if (response.action === "init") {
          if (response.state === "end" && response.success === 1) {
            console.log("initialized");
            //router.push('/');
          }
        } else if (response.action === "extensions" && response.success === 1) {
          emitter.$emit("ext", response.extensions);
        }
      }
    },
  },
  created() {
    this.$on("send-msg", function (msg) {
      this.send(msg);
    });
  },
});

// Socket events
socket.onmessage = function (msg) {
  emitter.parseResponse(msg.data);
  emitter.$emit("recv-msg", msg.data);
};
socket.onerror = function (err) {
  emitter.$emit("conn-err", err);
};
socket.onopen = function (evt) {
  emitter.$emit("open", evt);
};

export default emitter;
