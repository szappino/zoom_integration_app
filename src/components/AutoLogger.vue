<template>
    <div></div>
</template>

<script>

export default {
    name: 'AutoLogger',    

    data: function() {
        return {
            host: 0,            
            zoomData: {
                username: null,
                password: null,
                meeting_id: null
            },
        }
    },

    created: function() {
        this.zoomData.username = this.$route.query.username;
        this.zoomData.password = this.$route.query.password;
        this.zoomData.meeting_id = this.$route.query.meeting_id;

        this.$router.push({ name: 'meeting', params: { host: true, nickname: this.zoomData.username, password: this.zoomData.password, meetingId: this.zoomData.meeting_id } })
    },

    computed:  {
        isHost: function () {
            return this.host == 1
        }
    },

    methods: {
        hostMeeting: function() {
            this.$router.push({ name: 'meeting', params: { host: true, nickname: this.zoomData.username, password: this.zoomData.password, meetingId: this.zoomData.meeting_id } })
        },

        joinMeeting: function() {
            this.$router.push({ name: 'meeting', params: { host: false, nickname: this.zoomData.username, password: this.zoomData.password, meetingId: this.zoomData.meeting_id } })            
        },
    }

}

</script>

<style>

</style>