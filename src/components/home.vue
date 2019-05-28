<template>
    <div class="bg">
        <div class="ad" v-if="adOrVideo">
            <h3>{{res.Title}}</h3>
            <p>{{res.Content}}</p>
        </div>
        <div v-if="videoPlay" class="videoPlay">
            <video id="myVideo" @click="isPlayVideo" :src="videoSrc" width="1080px" height="460px" autoplay muted></video>
        </div>
        <main class="main">
            <div>
                <img src="./../../static/img/girl.png" alt="girl">
            </div>
            <div>
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                videoSrc: '',
                isPlay: true,
                adOrVideo: false,
                videoPlay: true,
                videoList: '',
                res: '',
                state: '',
                faceTemplate: '',
                imgFile: '',
                Base64tmp: '',
                sysConfig: '',
                idCard: ''
            }
        },
        mounted(){
            window.monitorCallBack =  ( event )=> {
                this.monitorCallBack(event);
            }
        },
        methods: {

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

            //获取视频列表
            getVideoSrc(){
                this.$axios.get( this.$api.getVideoSrc,{
                    params: {
                        orgID: this.sysConfig.OrgID,
                        termID: this.sysConfig.TerminalID
                    }
                } ).then(
                    res => {
                        console.log(res);
                        this.videoList = res.data.Data;
                        this.videoSrc = 'http://www.reception.com/'+ res.data.Data[0].Url;
                        console.log(this.videoSrc);
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
            },

            //获取公告
            getADData() {
                this.$axios.get(this.$api.getADDataDetails, {
                    params: {
                        customID: 123,
                        orgID: this.sysConfig.OrgID,
                        branchID: this.sysConfig.BranchID
                    }
                }).then(
                    res => {
                        console.log(res);
                        this.res = res.data.Data;
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
            },

            //人脸识别
            faceRecognition() {
                this.readConfig();
                this.readTemplate();
                this.$axios.get(this.$api.faceRecognition, {
                    params: {
                        orgID: this.sysConfig.OrgID,
                        branchNo: this.sysConfig.BranchNo,
                        faceTemplate: this.faceTemplate
                    }
                }).then(
                    res => {
                        console.log(res);
                        if (res.data.Message == "人脸不存在！") {

                            this.$router.push({
                                path: '/registered'
                            })
                        }else {
                            this.$router.push({
                                path: '/business'
                            })
                        }
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
            },

            //启动人脸
            startMonitor() {
                fwFaceMonitor.startMonitor('monitorCallBack');
            },

            //是否进入
            monitorCallBack(event) {
                this.state = event;
                if (event == 'enter') {
                    this.adOrVideo = true;
                    this.videoPlay = false;
                    this.getADData();
                    this.faceRecognition()
                }else if (event == 'leave') {
                    this.adOrVideo = false;
                    this.videoPlay = true;
                    this.getVideoSrc();
                }
            },

            //停止人脸
            stopMonitor() {
                fwFaceMonitor.stopMonitor();
            },

            //获取人脸特征
            readTemplate() {
                this.faceTemplate = fwFaceMonitor.readTemplate();
            },

            //截图
            getPortrait() {
                this.imgFile = fwFaceMonitor.getPortrait();
                this.Base64tmp = fwFaceMonitor.getBase64Portrait();
            },

            //读取配置
            readConfig() {
                this.sysConfig = eval("(" + fwConfigReader.read() + ")");
            },

            //读取身份证
            readIDCard(){
                this.idCard = fwIDCardReader.read();
            }

        },
        created() {

            this.readConfig();
            this.startMonitor();
            this.getVideoSrc();
            console.log(this.sysConfig);

        },

        beforeDestroy() {
            this.stopMonitor();
        }
    }
</script>
<style scoped>

    .videoPlay{
        width: 100%;
        height: 460px;
    }

    .ad{
        color: white;
        width: 1080px;
        height: 460px;
        background-image: url('./../../static/img/hxlogo.png');
        padding: 0 100px;
        padding-top: 150px;
        box-sizing: border-box;
        font-size: 36px;
    }

    .ad p{
        text-indent: 2em;
        margin-top: 30px;
        height: 160px;
        overflow: hidden;
        font-size: 18px;
        text-align: left;
        word-break: break-all;
        letter-spacing: 1px;
        line-height: 24px;
    }

    /* 主体样式 */
    .bg {
        width: 1080px;
        height: 1920px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .main {
        display: flex;
        flex-flow: row nowrap;
        margin: 60px 60px 0 60px;
    }

    .main > div:first-child {
        width: 309px;
    }

    .main > div:last-child {
        margin-left: 60px;
        width: calc(100% - 369px);
    }


</style>
