<template>
  <div class="lobby">
    <div class="container">
      <h1>{{ user.username }}</h1>
      <a :href="user.spotifyProfileLink" target="_blank">Go to profile</a>
      <br />
      <p>{{ roomId }}</p>
      <br />
      <div class="row">
        <button class="col-lg-6 col-12" @click.prevent="createRoom">
          create a room
        </button>
        <button class="col-lg-6 col-12">Join a room</button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "Lobby",
  components: {},
  data() {
    return {
      user: null,
      roomId: "",
    };
  },
  created: function () {
    // console.log("user=" + JSON.stringify(this.$store.state.user));
    this.user = this.$store.state.user;
  },
  methods: {
    createRoom: function () {
      console.log("creating room");

      var username = this.user.username;

      console.log(username);

      var vue = this;

      $.ajax({
        type: "post",
        url: "http://localhost:3030/api/createNewRoom",
        data: {
          username: username,
        },
        error: function (response) {
          console.log(response);
        },
        success: function (response) {
          console.log(response);
          if (response.success) {
            vue.$router.push({
              name: "Room",
              params: { roomId: response.roomId },
            });
          }
        },
      });
    },
  },
};
</script>
