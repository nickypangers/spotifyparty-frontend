<template>
  <div class="lobby">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Lobby",
  components: {
  },
  created: function () {
    console.log("user=" + JSON.stringify(this.$store.state.user));
  },
};
</script>