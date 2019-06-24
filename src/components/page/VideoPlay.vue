<template>
    <div class="video">
        <div align="left">
            <video id="myVideo" @click="isPlayVideo" :src="videoSrc" width="1080px" height="608px" controls autoplay></video>
        </div>
        <div class="btn">
            <myButton/>
        </div>
        <div class="playList">
            <div v-for="(item,index) in videoList" :key="index">
                <div @click="playNowVideo(item.CtxUrl)">
                    <img class="cover" :src="$url+item.Response" alt="">
                    <img class="videoIcon" src="./../../../static/img/icon-video-small.png" alt="">
                </div>
                <div class="figure" align="left">
                    <h4>{{item.Stage}}</h4>
                    <p>{{item.Description}}</p>
                </div>
            </div>
        </div>
        <div class="Isolation-zone"></div>
        <div class="info" align="left">
            <h3>
                <span class="cylinder"></span>
                公司简介
            </h3>
            <div class="line"></div>
            <div>
                <h4>公司概况</h4>
                <p>
                    公司前身四川省证券股份有限公司和四川证券交易中心分别成立于1988年和1991年，
                    是国内最早成立的专业证券公司之一和全国首家区域性交易场所。
                    非上市国有企业10家，其他19家；其中，泸州老窖股份有限公司持股比例为24.99%，
                    是公司的第一大股东和实际控制人。其他大股东还包括四川华能太平驿水电有限责任公司、剑南春集团、
                    都江堰电力公司、剑南春融信投资有限公司、五粮液酒厂、涪陵投资集团和四川明星电力股份有限公司等。
                    华西证券在全国拥有近70家证券营业部家，遍布四川、北京、上海、天津、重庆、南京、广州、武汉、深圳、大连和杭州等地。
                    其中，成都高升桥营业部市场占有率排名稳居四川省第一，北京营业部在北京地区市场占有率排名前五，深圳营业部在深圳的市场占有率中排名前十。
                </p>
                <div class="line small"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import myButton from './../common/MyButton'
    export default {
        name: "VideoPlay",
        data (){    
            return {
                isPlay: true,
                scenesID: '',
                sysConfig: '',
                myVideo: '',
                videoList: [ ],
                videoSrc: '',

            }
        },
        components: {
            myButton
        },
        mounted() {
            window.monitorCallBack =  ( event,template64,portrait64 )=> {
                this.monitorCallBack(event,template64,portrait64);
            };
        },
        methods: {

            //启动人脸
            startMonitor() {
                console.log('开启人脸');
                fwFaceMonitor.startMonitor('monitorCallBack');
            },

            //是否进入
            monitorCallBack(event,template64,portrait64) {
                console.log('人走还是留',event);
                if (event) {
                    this.$router.push({
                        path: '/business'
                    });
                }
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
                this.videoSrc = this.$url + videoSrc;
            },

            //请求视频资源
            getVideoList(){
                this.$axios.get( this.$api.getQuestionsList,{
                    params: {
                        orgID: this.sysConfig.OrgID,
                        sceneID: this.scenesID,
                        pageIndex: 1,
                        pageSize: 10
                    }
                } ).then(
                    res => {
                        console.log(res);
                        this.videoList = res.data.Data;
                        this.videoSrc = this.$url + res.data.Data[0].CtxUrl;
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
            //停止人脸
            stopMonitor() {
                fwFaceMonitor.stopMonitor();
            }
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
            this.startMonitor();
        },
        beforeDestroy() {
            this.stopMonitor();
        }
    }
</script>

<style scoped>
    .cylinder{
        display: inline-block;
        width: 5px;
        height: 38px;
        background-color: #be9f5f;
        vertical-align:middle;
    }
    .Isolation-zone{
        width: 100%;
        height: 10px;
        background-color: #e9e9e9;
    }
    .info{
        padding: 70px;
    }
    .info h3{
        margin: 20px 0;
        font-size: 30px;
        color: #333;
        height: 38px;
        line-height: 38px;
    }
    .info h4{
        font-size: 26px;
        margin: 40px 0;
    }

    .info p{
        text-indent: 2em;
        font-size: 20px;
        color: #3d3d3d;
        letter-spacing: 1px;
        word-break: break-all;
        line-height: 30px;
    }

    .line{
        margin-left: -50px;
        width: 1080px;
        height: 2px;
        background-color: #be9f5f;
    }
    .small{
        margin-top: 40px;
        height: 1px;
        background-color: #bababa;
    }

    .btn{
        margin: 60px;
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