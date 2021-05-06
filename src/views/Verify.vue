<template>
  <div class="verify">
    <p>Loading User...</p>
    <p v-show="isLoading">ajax running</p>
    <p>{{ status }}</p>

    <button @click="viewUser">View User State</button>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "Verify",
  components: {},
  data() {
    return {
      isLoading: true,
      status: false,
    };
  },
  created: function () {
    console.log("user=" + JSON.stringify(this.$store.state.user));

    var code = this.$route.query.code;

    var vue = this;

    $.ajax({
      type: "post",
      url: "http://localhost:3030/api/addSpotifyUser",
      data: {
        code: code,
      },
      error: function (response) {
        console.log(response);
      },
      success: function (response) {
        if (response.success) {
          console.log(response);
          vue.status = true;
          vue.$store.commit("addUser", response);
        }
      },
    });

    $(document).ajaxStop(function () {
      vue.isLoading = false;
    });
  },
  methods: {
    viewUser: function () {
      console.log("user=" + JSON.stringify(this.$store.state.user));
    },
  },
};
</script>
