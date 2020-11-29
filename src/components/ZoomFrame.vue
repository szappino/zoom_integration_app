<template>
  <div class="iframe-container">
    <meta charset="utf-8">
    <link type="text/css" rel="stylesheet" href="https://source.zoom.us/1.8.1/css/bootstrap.css" />
    <link type="text/css" rel="stylesheet" href="https://source.zoom.us/1.8.1/css/react-select.css" />

    <meta name="format-detection" content="telephone=no">

    
    
  </div>
</template>
<script>
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.8.1/lib', '/av');  

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

//Not the most secure way to store Api keys, must change in production 
var API_KEY = process.env.VUE_APP_ZOOM_SDK_KEY;
var API_SECRET = process.env.VUE_APP_ZOOM_SDK_SECRET;


export default {
  name: "ZoomFrame",

  data: function() {
    return {
      meetConfig: {},
      signature: '',
    };
  },
  props: {
    nickname: String,
    meetingId: String,
    password: String,
    host: Boolean,    
  },
  created: function() {

    if(this.host == true) {
      this.meetConfig = {
        apiKey: API_KEY,
        apiSecret: API_SECRET,
        meetingNumber: this.meetingId,
        userName: this.nickname,
        passWord: this.password,
        leaveUrl: "/",
        role: 1
      };
    } else {
      this.meetConfig = {
        apiKey: API_KEY,
        apiSecret: API_SECRET,
        meetingNumber: this.meetingId,
        userName: this.nickname,
        passWord: this.password,
        leaveUrl: "/",
        role: 0
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
          success: function(res){
            console.log(API_KEY);
            console.log(API_SECRET);
            console.log('signature : ' + res.result);
          }
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
      }
    });    

    //Join the meeting  NOTE: if the user is not the actual host, he will be placed in the waiting room 
    ZoomMtg.join({
      debug: true,
      signature: this.signature,
      meetingNumber: this.meetConfig.meetingNumber,
      userName: this.meetConfig.userName,
      apiKey: this.meetConfig.apiKey,
      userEmail: 'email@gmail.com',
      passWord: this.meetConfig.passWord,
      success: function(res) {           
        console.log("join meeting success" + res);
      },
      error: function(res) {            
        console.log(res);
      }          
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
