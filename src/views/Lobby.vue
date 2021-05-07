<template>
  <div class="lobby">
    <div class="container">
      <h1>{{ user.username }}</h1>
      <a :href="user.spotifyProfileLink" target="_blank">Go to profile</a>
      <br />
      <p>{{ roomId }}</p>
      <br />
      <div class="row" v-if="isJoinedRoom">
        <button class="col-lg-6 col-12" @click.prevent="enterRoom">
          Enter room
        </button>
      </div>
      <div v-else>
        <button class="col-lg-6 col-12" @click.prevent="createRoom">
          create a room
        </button>
        <button class="col-lg-6 col-12">Join a room</button>
      </div>
    </div>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Testing</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">{{ error }}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "Lobby",
  components: {},
  data() {
    return {
      user: null,
      roomId: "",
      error: "",
    };
  },
  created: function () {
    this.user = this.$store.state.user;
  },
  computed: {
    isJoinedRoom: function () {
      return this.$store.state.joinedRoom != null;
    },
    getJoinedRoomId: function () {
      return this.$store.state.joinedRoom;
    },
  },
  methods: {
    enterRoom: function () {
      this.$router.push({
        name: "Room",
        params: { roomId: this.getJoinedRoomId },
      });
    },
    createRoom: function () {
      console.log("creating room");

      var username = this.user.username;

      console.log(username);

      var vue = this;

      window.$.ajax({
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
            vue.$store.commit("joinRoom", response.roomId);
            vue.$router.push({
              name: "Room",
              params: { roomId: response.roomId },
            });
          } else {
            vue.error = response.message;
            console.log(vue.error);
            window.$("#exampleModal").modal("show");
          }
        },
      });
    },
  },
};
</script>
