<template>
  <div class="verify">
    <p>Loading User...</p>
    <p>{{status}}</p>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "Verify",
  components: {},
  data() {
    return {
      status: false
    }
  },
  created: function () {
    var code = this.$route.query.code;

    var vue = this

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
          vue.status = true
        }
      },
    });
  },
};
</script>
