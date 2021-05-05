<template>
  <div class="home">
    <button @click.prevent="verifyUser">Log In to Spotify</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
  methods: {
    verifyUser: function () {
      location.href =
        "https://accounts.spotify.com/authorize?client_id=9fc05552fff74f828d684944657872de&response_type=code&redirect_uri=http://localhost:8080/verify&scope=user-read-email+user-read-private";
    },
  },
};
</script>
