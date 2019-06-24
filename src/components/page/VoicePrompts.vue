<template>
    <div>
        <div class="btn">
            <button @click="voiceStart">
                <img src="./../../../static/img/icon-voice.png" alt="">
                再次咨询
            </button>
            <myButton/>
        </div>

        <div class="dialogue" align="left">
            <p class="message">请说出您要咨询的问题</p>
            <div class="triangle"></div>
        </div>

        <div class="voiceList">
            <div class="ol" v-for="(item,index) in questionsList" :key="index">
                <div @click="speakText(item.Stage)" class="li">{{index+1}}.{{item.Stage}}</div>
            </div>
        </div>

        <el-dialog
                :visible.sync="centerDialogVisible"
                width="800px"
                center>
            <div class="displayImg" align="center">
                <img :src="resImg" alt="答案缺失">
            </div>
            <span slot="footer" class="dialog-footer">

            </span>
        </el-dialog>

    </div>
</template>
<script>

import myButton from './../common/MyButton'
export default {
    data (){
        return {
            resImg: '',
            questionsList:[ ],
            sysConfig: '',
            sceneID: 123,
            centerDialogVisible: false,
            isSpeech: false
        }
    },
    components: {
        myButton
    },
    mounted(){
        window.listenCallBack =  ( msg )=> {
            this.listenCallBack(msg);
        };
        window.speakOver =  ( )=> {
            this.speechOver();
        }
    },
    methods: {
        voiceStop(){
            fwVoiceMonitor.stopListen();
        },
        listenCallBack( msg ){
            console.log('问题',msg);
            this.voiceStop();
            this.speakText(msg);
        },
        voiceStart(){
            console.log(111);
            fwVoiceMonitor.startListen("listenCallBack");
        },
        getsceneID(){
            this.$axios.get( this.$api.getSceneID,{
                params: {
                    orgID: this.sysConfig.OrgID,
                    subject: '语音咨询'
                }
            } ).then(
                res => {
                    console.log(res);
                    this.sceneID = res.data.Data.SceneID;
                    this.getQuestionsList();
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        },

        speakText( text ){
            this.centerDialogVisible = true;
            console.log(text);
            this.isShow = !this.isShow;
            this.$axios.get( this.$api.speakText,{
                params: {
                    sceneID: this.sceneID,
                    words: text
                }
            } ).then(
                res =>{
                    console.log(res);
                    this.resImg = this.$url + res.data.Data.CtxUrl;
                    fwVoiceMonitor.speak(res.data.Data.Response);
                }
            ).catch(
                err =>{
                    console.log(err);
                }
            )
        },

        getQuestionsList (){
            this.$axios.get( this.$api.getQuestionsList,{
                params: {
                    sceneID: this.sceneID,
                    orgID: this.sysConfig.OrgID
                }
            } ).then(
                res =>{
                    console.log(res);
                    this.questionsList = res.data.Data;
                }
            ).catch(
                err =>{
                    console.log(err);
                }
            )
        },

        //读取配置
        readConfig() {
            this.sysConfig = eval("(" + fwConfigReader.read() + ")");
        },

        speechOver( ){
            this.voiceStart();
        },
        //语音询问
        speak ( text ){
            let time = fwVoiceMonitor.speak(text,'speakOver');
            console.log('time',time);
        },
    },
    created() {
        this.readConfig();
        this.getsceneID();
        fwVoiceMonitor.speakWithCallBack('请说出您要咨询的问题','speakOver');
    },
    beforeDestroy(){
        this.voiceStop();
    },
}
</script>
<style>

</style>
<style scoped>
    .dialogue>p{

        display: inline-block;
        margin-top: 30px;
        background-color: #c92727;
        /*width: 420px;*/
        color: #fff;
        text-align: left;
        font-size: 20px;
        padding: 20px 30px 20px 50px;
        border-radius:5px;
        box-shadow: 0 3px 6px rgba(201,39,39,.2);
    }

    .triangle{
        position: relative;
        top: -32.5px;
        left: -15px;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-right: 15px solid #c92727;
        border-bottom: 5px solid transparent;
    }


    .displayImg{
        margin-top: 60px;
    }
    .sure{
        margin-top: 150px;
    }
    h3{
        color: #000;
    }
    .voiceList{
        margin: 0 auto;
        text-align: center;
        width: 500px;
        margin-top: 60px;
        box-sizing: border-box;
        padding: 20px 30px;
        background-color: #fff;
        border-radius:  15px;
    }
    .voiceList .ol{
        text-align: left;
        color: #000;
        margin: 0 auto;
        width: 80%;
    }
    .voiceList .li{
        transition: all .3s linear;
        margin: 20px;
        cursor: pointer;
    }
    .voiceList .li:hover{
        text-decoration: underline;
        color: #c52627;
    }
    /*.btn button:hover{*/
        /*transition: all 0.3s linear;*/
        /*background-color: #c52627;*/
        /*color: #fff;*/
    /*}*/


    .btn button{
        cursor: pointer;
        width: 240px;
        height: 68px;
        border: 1px solid #c52627;
        color: #c52627;;
        border-radius: 10px;
        font-size: 24px;
    }
    .btn button:last-child{
        margin-left: 80px;
    }
</style>
