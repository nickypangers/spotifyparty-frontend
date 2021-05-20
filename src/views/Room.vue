<template>
  <div class="room">
    <p>Room {{ $route.params.roomId }}</p>
    <button @click.prevent="joinRoom" v-show="connection == null">
      Join Room
    </button>
    <button @click.prevent="sendMessage('Hi sup')" v-show="connection != null">
      Send to Server
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Room",
  components: {},
  data() {
    return {
      connection: null,
    };
  },
  computed: {
    isJoinedRoom: function () {
      return this.$store.state.joinedRoom != null;
    },
  },
  methods: {
    sendMessage: function (message) {
      this.connection.send(message);
    },
    joinRoom: function () {
      console.log("Starting connection to WebSocket Server");

      this.connection = new WebSocket(
        "ws://localhost:3030/ws/" + this.$route.params.roomId
      );
      console.log("Attempting Websocket Connection");

      this.connection.onopen = function (event) {
        console.log(event);
        console.log("Successfully connected to the websocket Server");
      };

      this.connection.onmessage = function (event) {
        console.log(event);
      };
    },
  },
};
</script>
