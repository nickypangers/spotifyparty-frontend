<template>
  <div class="home">
    <button @click.prevent="verifyUser">Log In to Spotify</button>
    <!-- <button @click="enterRoomPressed = !enterRoomPressed">Enter Room</button> -->
    <button @click="addGuestUserPressed = !addGuestUserPressed">
      Join As Guest
    </button>
    <div v-show="addGuestUserPressed">
      <input type="text" placeholder="Enter Username" v-model="username" />
      <button @click="addGuestUser">Enter</button>
    </div>
    <div v-show="enterRoomPressed">
      <input type="text" placeholder="Enter Room ID" v-model="roomId" />
      <button @click="enterRoom">Enter</button>
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

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      enterRoomPressed: false,
      addGuestUserPressed: false,
      roomId: null,
      username: null,
    };
  },
  computed: {
    isAuthenticated: function () {
      return this.$store.state.user != null;
    },
  },
  methods: {
    verifyUser: function () {
      location.href =
        "https://accounts.spotify.com/authorize?client_id=9fc05552fff74f828d684944657872de&response_type=code&redirect_uri=http://localhost:8080/verify&scope=user-read-email+user-read-private";
    },
    addGuestUser: function () {
      var username = this.username;

      var vue = this;

      window.$.ajax({
        type: "post",
        url: "http://localhost:3030/api/addGuestUser",
        data: {
          username: username,
        },
        error: function (response) {
          console.log(response);
        },
        success: function (response) {
          console.log(response);
          vue.$store.commit("addUser", response);
          vue.$router.push({
            name: "Lobby",
          });
        },
      });
    },
    enterRoom: function () {
      if (!this.roomId || this.roomId === "") {
        return;
      }
      var roomId = this.roomId;

      var vue = this;

      window.$.ajax({
        type: "post",
        url: "http://localhost:3030/api/enterRoom",
        data: {
          roomId: roomId,
        },
        error: function (response) {
          console.log(response);
        },
        success: function (response) {
          console.log(response);
          vue.$router.push({
            name: "Room",
            params: { roomId: roomId },
          });
        },
      });
    },
  },
};
</script>
