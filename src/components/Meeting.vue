<template>
  <div class="meeting">
    <div class="container-zoom">
      <ZoomFrame :nickname="nickname" :meetingId="meetingId" :password="password" :host="host"/>
    </div>
  </div>
</template>

<script>
import ZoomFrame from "./ZoomFrame.vue";

export default {
  name: "app",
  data: function () {
      return {
          nickname: '',
          meetingId: '',
          password: '',
          host: ''
      }
  },
  components: {
    ZoomFrame,
  },
  created : function (){
      this.nickname = this.$attrs.nickname;
      this.meetingId = this.$attrs.meetingId;
      this.password = this.$attrs.password;
      this.host = this.$attrs.host;
  }
};
</script>

<style>
.container-zoom {
  width: 70%;
  height: 100%;
}
</style>