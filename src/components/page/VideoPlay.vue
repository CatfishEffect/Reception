<template>
    <div class="video">
        <div align="left">
            <video id="myVideo" @click="isPlayVideo" :src="videoSrc" width="1080px" height="608px" autoplay muted></video>
        </div>
        <div class="btn">
            <button @click="returnHome">返回</button>
        </div>
        <div class="playList">
            <div v-for="(item,index) in videoList" :key="index">
                <div @click="playNowVideo(item.CtxUrl)">
                    <img class="cover" src="./../../../static/img/video-one.png" alt="">
                    <img class="videoIcon" src="./../../../static/img/icon-video-small.png" alt="">
                </div>
                <div class="figure" align="left">
                    <h4>{{item.Stage}}</h4>
                    <p>{{item.Description}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VideoPlay",
        data (){    
            return {
                isPlay: true,
                scenesID: '',
                sysConfig: '',
                myVideo: '',
                videoList: [ ],
                videoSrc: ''
            }
        },
        methods: {

            returnHome (){
                this.$router.push({
                    path:'/'
                })
            },

            //暂停与播放
            isPlayVideo(){
                this.isPlay = !this.isPlay;
                let myVideo = document.getElementById('myVideo');
                if ( !this.isPlay ) {
                    myVideo.pause();
                }else {
                    myVideo.play();
                }
            },

            //playNowVideo
            playNowVideo ( videoSrc ){
                this.videoSrc = 'http://www.reception.com/'+ videoSrc;
            },

            //请求视频资源
            getVideoList(){
                this.$axios.get( this.$api.getQuestionsList,{
                    params: {
                        orgID: this.sysConfig.OrgID,
                        sceneID: this.scenesID
                    }
                } ).then(
                    res => {
                        console.log(res);
                        this.videoList = res.data.Data;
                        this.videoSrc = 'http://www.reception.com/'+ res.data.Data[0].CtxUrl;
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
            },

            //获取场景ID
            getScenesID (){
                this.$axios.get( this.$api.getSceneID,{
                    params: {
                        orgID: this.sysConfig.OrgID,
                        subject: '走进华西'
                    }
                } ).then(
                    res => {
                        console.log(res);
                        this.scenesID = res.data.Data.SceneID;
                        console.log(this.scenesID);
                        this.getVideoList();
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
            },

            //读取配置
            readConfig() {
                this.sysConfig = eval("(" + fwConfigReader.read() + ")");
            },
            //@mouseenter="playMyVideo" @mouseleave="pauseMyVideo"
            // playMyVideo (){
            //     let myVideo = document.getElementById('myVideo');
            //     myVideo.play();
            // },
            // pauseMyVideo (){
            //     let myVideo = document.getElementById('myVideo');
            //     myVideo.pause();
            // }
        },
        created (){
            this.readConfig();
            this.getScenesID();
        }
    }
</script>

<style scoped>

    .btn button:hover{
        transition: all 0.3s linear;
        background-color: #c52627;
        color: #fff;
    }


    .btn button{
        margin: 30px 0;
        cursor: pointer;
        width: 240px;
        height: 68px;
        background-color: #fff;
        color: #c52627;;
        border-radius: 10px;
        font-size: 24px;
        box-shadow: 0 3px 3px rgba(186, 28, 29, .25)
    }

    .video{
        width: 1080px;
        height: 1920px;
        background-color: #f3f3f3;
    }
    .playList{
        display: flex;
        flex-flow: row wrap;
        padding: 30px 50px;

    }
    .cover{
        transition: all .3s linear;
    }
    .playList>div:hover .cover{
        transform: scale(1.2);
    }

    .playList>div{
        background-color: #fff;
        margin: 20px;
        cursor: pointer;
        overflow: hidden;
        transition: all .8s linear;
        box-shadow:0 5px 5px rgba(128,128,128,.2);
    }
    .playList>div>div{
        position: relative;
    }
    .videoIcon{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -26.5px;
        margin-top: -26.5px;
    }
    .figure{
        width: 193px;
        box-sizing: border-box;
        padding: 10px 5px;
        background-color: #fff;
    }
    .figure>h4{
        color: #c52627;
        font-size: 22px;
    }
    .figure>p{
        margin-top: 5px;
        color: #999;
        font-size: 14px;
    }
</style>