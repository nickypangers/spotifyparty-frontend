<template>
  <div class="verify">
    <p>Loading User...</p>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "Verify",
  components: {},
  created: function () {
    var code = this.$route.query.code;

    console.log(code);
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
        console.log(response);
      },
    });
  },
};
</script>
