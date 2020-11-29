<template>
    <div class="container" style="padding-top: 50px;">
        <div class="row">
             <div class="col">
             </div>
            <div class="col">
                <div class="row justify-content-center">
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button @click="host=1" type="button" class="btn" :class="{'btn-primary': isHost === true, 'btn-secondary': isHost === false }">I'm the host</button>
                        <button @click="host=0" type="button" class="btn" :class="{'btn-primary': isHost === false, 'btn-secondary': isHost === true }">Join a meeting</button>
                    </div>
                </div>
             </div>
             <div class="col">

             </div>
        </div>

        <div class="row" style="margin-top: 50px;">
            <div class="col"></div>
            
            <div class="col">
                <form v-if="host==1" @submit.prevent="hostMeeting">
                    <div class="form-group">
                        <label for="username">Your Zoom Email</label>
                        <input v-model="zoomData.username" type="text" class="form-control" id="username" required>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Meeting ID</label>
                        <input v-model="zoomData.meeting_id" type="text" class="form-control" required>>
                    </div>              
                    <div class="form-group">
                        <label for="exampleInputPassword1">Meeting Password</label>
                        <input v-model="zoomData.password" type="password" class="form-control" id="exampleInputPassword1" required>
                    </div>      
                    <button type="submit" class="btn btn-primary">Start Meeting</button>
                </form>

                <form v-if="host==0" @submit.prevent="joinMeeting">
                   <div class="form-group">
                        <label for="username">Username</label>
                        <input v-model="zoomData.username" type="text" class="form-control" id="username" required>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Meeting ID</label>
                        <input v-model="zoomData.meeting_id" type="text" class="form-control" required>>
                    </div>                      
                    <div class="form-group">
                        <label for="password1">Meeting Password</label>
                        <input v-model="zoomData.password" type="password" class="form-control" id="exampleInputPassword1" required>
                    </div>      
                    <button type="submit" class="btn btn-primary">Join Meeting</button>
                </form>
            </div>
            
            <div class="col"></div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'JoinMeeting',

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
        }
    }

}

</script>

<style>

</style>