<template>
    <div
        class="iframe-container"
        style="max-width: 500px !important; max-height: 500px !important"
    >
        <meta charset="utf-8" />
        <link
            type="text/css"
            rel="stylesheet"
            href="https://source.zoom.us/1.8.1/css/bootstrap.css"
        />
        <link
            type="text/css"
            rel="stylesheet"
            href="https://source.zoom.us/1.8.1/css/react-select.css"
        />

        <meta name="format-detection" content="telephone=no" />

        <modal name="test">
            <form @submit.prevent="create_voting" style="margin: 25px">
                <div class="form-group">
                    <label for="username">Titolo votazione</label>
                    <input
                        v-model="voting.title"
                        type="text"
                        class="form-control"
                        id="username"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1"
                        >Descrizione votazione</label
                    >
                    <input
                        v-model="voting.description"
                        type="text"
                        class="form-control"
                        required
                    />
                </div>

                <button type="submit" class="btn btn-primary">
                    Crea votazione
                </button>
            </form>
        </modal>

        <div class="test col justify-content-center">
            <button
                class="mt-4 btn btn-ls btn-success"
                @click="show_voting_modal"
            >
                Crea Votazione
            </button>

            <button
                class="mt-4 btn btn-ls btn-success"
                @click="view_last_voting"
            >
                Vedi Votazioni
            </button>

            <button
                class="mt-4 btn btn-ls btn-success"
                @click="view_voting_results"
            >
                Vedi Risultato votazione
            </button>
        </div>
    </div>
</template>
<script>
import { ZoomMtg } from "@zoomus/websdk";
import axios from "axios";

ZoomMtg.setZoomJSLib("https://dmogdx0jrul3u.cloudfront.net/1.8.1/lib", "/av");

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

//Not the most secure way to store Api keys, must change in production
var API_KEY = process.env.VUE_APP_ZOOM_SDK_KEY;
var API_SECRET = process.env.VUE_APP_ZOOM_SDK_SECRET;

export default {
    name: "ZoomFrame",

    data: function () {
        return {
            meetConfig: {},
            signature: "",
            voting: {
                title: "",
                description: "",
            },
        };
    },
    props: {
        nickname: String,
        meetingId: String,
        password: String,
        host: Boolean,
    },
    created: function () {
        if (this.host == true) {
            this.meetConfig = {
                apiKey: API_KEY,
                apiSecret: API_SECRET,
                meetingNumber: this.meetingId,
                userName: this.nickname,
                passWord: this.password,
                leaveUrl: "/",
                role: 1,
            };
        } else {
            this.meetConfig = {
                apiKey: API_KEY,
                apiSecret: API_SECRET,
                meetingNumber: this.meetingId,
                userName: this.nickname,
                passWord: this.password,
                leaveUrl: "/",
                role: 0,
            };
        }
        /*

    For production / security reason it's better to use an external signature server

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'https://www.testsignature.netsons.org/?mID='+ this.meetConfig.meetingNumber +'&role=' + this.meetConfig.role, false ); // false for synchronous request
    xmlHttp.send( null );    
    var sig = xmlHttp.responseText    
    this.signature=  sig.substring(1, sig.length -1);
    */

        //Generate a signature
        this.signature = ZoomMtg.generateSignature({
            meetingNumber: this.meetConfig.meetingNumber,
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            role: this.meetConfig.role,
            success: function (res) {
                console.log(API_KEY);
                console.log(API_SECRET);
                console.log("signature : " + res.result);
            },
        });

        //Init the Zoom SDK interface
        ZoomMtg.init({
            leaveUrl: this.meetConfig.leaveUrl,
            isSupportAV: true,
            success: (res) => {
                console.log(res);
            },
            error: (res) => {
                console.log(res);
            },
        });

        //Join the meeting
        ZoomMtg.join({
            debug: true,
            signature: this.signature,
            meetingNumber: this.meetConfig.meetingNumber,
            userName: this.meetConfig.userName,
            apiKey: this.meetConfig.apiKey,
            userEmail: "email@gmail.com",
            passWord: this.meetConfig.passWord,
            success: function (res) {
                console.log("join meeting success" + res);
            },
            error: function (res) {
                //TODO: better error managemet
                alert(res.errorMessage);
            },
        });
    },

    methods: {
        show_voting_modal: function () {
            this.$modal.show("test");
        },
        create_voting: async function () {
            await axios.post("http://localhost:3000/votings", {
                title: this.voting.title,
                description: this.voting.description,
            });
            this.voting = { title: "", description: "" };
        },
        view_last_voting: function() {
            let routeData = this.$router.resolve({name: 'voting', query: {username: this.nickname}});
            window.open(routeData.href, '_blank');
        },

        view_voting_results: function() {
            let routeData = this.$router.resolve({name: 'results'});
            window.open(routeData.href, '_blank');
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test {
    position: fixed;
    bottom: 0;
    left: 0px;
    /*background-color:red;*/
    width: 10%;
    height: 100%;
    z-index: 9999;
}
</style>
