<template>
  <div class="home">
    <div v-if="!isAuthenticated">
      <button @click.prevent="verifyUser">Log In to Spotify</button>
    </div>
    <div v-else>
      <button @click.prevent="enterApp">Enter</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {},
  created: function () {
    // console.log("user=" + JSON.stringify(this.$store.state.user));
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
    enterApp: function () {
      this.$router.push("Lobby");
    },
  },
};
</script>
