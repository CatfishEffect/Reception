<template>
    <div>
        <div class="voiceList">
            <h3>您好，请问您想了解什么</h3>
            <div class="ol" v-for="(item,index) in questionsList" :key="index">
                <div @click="speakText(item.Stage)" class="li">{{item.ID}}.{{item.Stage}}</div>
            </div>
        </div>
        <div>
            <img :src="resImg" alt="">
        </div>
        <router-link to="/business" class="sure" tag="div">
            <el-button type="info">确认</el-button>
        </router-link>
    </div>
</template>
<script>
export default {
    data (){
        return {
            resImg: '',
            questionsList:[ ],
            sysConfig: '',
            sceneID: 123
        }
    },
    methods: {
        getsceneID(){
            console.log(this.sysConfig.OrgID);
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
            console.log(text);
            this.$axios.get( this.$api.speakText,{
                params: {
                    sceneID: this.sceneID,
                    words: text
                }
            } ).then(
                res =>{
                    console.log(res);
                    this.resImg = 'http://www.reception.com/'+res.data.Data.CtxUrl;
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
    },
    created() {
        this.readConfig();
        this.getsceneID();

    }
}
</script>
<style scoped>
    .sure{
        margin-top: 150px;
    }
    h3{
        color: #fff;
    }
    .voiceList{
        box-sizing: border-box;
        padding: 20px 30px;
        background-color: #d98e75;
        border-radius:  50px 20px 20px 0;
    }
    .voiceList .ol{
        text-align: left;
        color: #fff;
        margin: 0 auto;
        width: 80%;
    }
    .voiceList .li{
        transition: all 1s linear;
        margin: 20px;
        cursor: pointer;
    }
    .voiceList .li:hover{
        text-decoration: underline;
    }
</style>
