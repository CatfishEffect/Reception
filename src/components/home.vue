<template>
    <div class="bg">
        <header>
            <div class="modalImg" v-if="isModalImg">
                <img :src="dynamicImg" alt="">
            </div>
            <div class="ad" v-if="adOrVideo">
                <h3>{{res.Title}}</h3>
                <p>{{res.Content}}</p>
            </div>
            <div v-if="videoPlay" class="videoPlay">
                <video id="myVideo" @click="isPlayVideo" :src="videoSrc" width="1080px" height="460px" autoplay :muted="MutedAds"></video>
            </div>
        </header>
        <main class="main">
            <div>
                <img src="./../../static/img/girl.png" alt="girl">
            </div>
            <div>
                <router-view></router-view>
            </div>
        </main>
        <el-dialog
                :visible.sync="centerDialogVisible"
                width="580px"
                align="center">
            <div class="birth">
               <img src="./../../static/img/dogxiao.gif" alt="">
             </div>
        </el-dialog>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex'
        import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                MutedAds: true,
                isModalImg: false,
                dynamicImg: '',
                loginToken: '',
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
                idCard: '',
                timer: '',
                today: '',
                centerDialogVisible: false
            }
        },
        mounted(){
            window.monitorCallBack =  ( event,template64,portrait64 )=> {
                this.monitorCallBack(event,template64,portrait64);
            };
            window.ultrasonicCallBack =  ( event )=> {
                this.ultrasonicCallBack(event);
            }
        },
        methods: {

            //视频播放
            videoPlayNow(){
                let myVideo = document.getElementById('myVideo');
                myVideo.play();
            },

            ...mapMutations( ['changeLogin'] ),
            ...mapActions( [ 'isMenuShow','isMenuHidden' ] ),

            //语音询问
            speak ( text ){
                fwVoiceMonitor.speak(text);
            },
            //离开时间
            leaveTimeToCollect(){
                this.$axios.get( this.$api.leaveTime,{
                    params:{
                        isOut: true
                    }
                }).then(
                    res => {
                        console.log('离开时间',res);
                        let myVideo = document.getElementById('myVideo');
                        myVideo.play();
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
            },

            //设备登陆
            termLogin(){

                let a = new Date().toLocaleString();
                this.$axios.get( this.$api.termLogin,{
                    params: {
                        TermID: this.sysConfig.TerminalID,
                        OrgID: this.sysConfig.OrgID,
                        tempID: a
                    }
                } ).then(
                    res => {
                        console.log('设备登陆',res);
                        this.loginToken = 'Basic ' + res.data.Data;
                        this.changeLogin( { Authorization: this.loginToken } );

                        this.startMonitor();
                        this.getVideoSrc();
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
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

            //获取视频列表
            getVideoSrc(){
                this.$axios.get( this.$api.getVideoSrc,{
                    params: {
                        orgID: this.sysConfig.OrgID,
                        termID: this.sysConfig.TerminalID
                    }
                } ).then(
                    res => {
                        console.log('广告',res);
                        this.videoList = res.data.Data;
                        this.videoSrc = this.$url + res.data.Data[0].Url;
                        console.log(this.videoSrc);
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
            },

            //获取公告
            getADData( PeopleKind,ID='') {
                this.$axios.get(this.$api.getADDataDetails, {
                    params: {
                        customID: ID,
                        orgID: this.sysConfig.OrgID,
                        PeopleKind: PeopleKind,
                        branchID: this.sysConfig.BranchID
                    }
                }).then(
                    res => {
                        console.log('公告',res);
                        if( res.data.Data === null ){
                            this.res = { Title: '欢迎来到华西', Content: '欢迎来到华西' }
                        }else {
                            this.res = res.data.Data;
                        }

                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
            },

            //人脸识别
            faceRecognition(template64) {
                this.readConfig();
                this.readTemplate();
                // console.log('人脸特征',this.faceTemplate);
                if (this.faceTemplate === null){
                    //this.readTemplate();
                } else {
                    this.$axios.get(this.$api.faceRecognition, {
                        params: {
                            orgID: this.sysConfig.OrgID,
                            branchNo: this.sysConfig.BranchNo,
                            faceTemplate: template64
                        }
                    }).then(
                        res => {
                            console.log('人脸识别',res);


                            if (res.data.Code === 404 || res.data.Code === 403 ) {
                                this.getADData('');
                                this.$router.push({
                                    path: '/registered'
                                });
                                console.log('陌生人进入');
                            }else if( res.data.Code === 200 ){
                                let birth = res.data.Data.Birth.slice(6,10);

                                console.log('生日',birth);
                                if ( res.data.Result == true ){
                                    this.centerDialogVisible = true;
                                }




                                if ( res.data.Message==='访客' ) {
                                    localStorage.setItem('customerID', res.data.Data.CustID);

                                    this.getGreetings(res.data.Data.CustID);
                                    this.getADData(res.data.Message,res.data.Data.CustID);

                                    this.isMenuShow();  //vuex状态改变，作用控制菜单是否显示

                                    console.log('访客进入');
                                }else if ( res.data.Message==='员工'){
                                    console.log('员工进入');
                                    this.getADData('员工');
                                    this.getStaffGreetings(res.data.Data.CustID);

                                }


                                this.$router.push({
                                    path: '/business'
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
                }

            },

            //获取员工问候语
            getStaffGreetings(id){
                this.$axios.get( this.$api.getStaffGreetings,{
                    params: {
                        empID: id
                    }
                } ).then(
                    res => {
                        console.log(res);
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
            },

            //获取客户问候语
            getGreetings (customID){
                this.$axios.get( this.$api.getGreetings,{
                    params: {
                        customID: customID
                    }
                } ).then(
                    res => {
                        console.log('问候语',res);
                        this.speak(res.data.Message );

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
            monitorCallBack(event,template64,portrait64) {
                console.log('人走还是留',event);

                if (event === 'enter') {
                    this.isModalImg = true;
                    this.adOrVideo = true;
                    this.videoPlay = false;
                    this.isMenuHidden(); //vuex状态改变，作用控制菜单是否显示
                }else if (event === 'leave') {
                    this.isMenuHidden(); //vuex状态改变，作用控制菜单是否显示
                    this.leaveTimeToCollect();
                    localStorage.setItem('customerID', '');
                    console.log('离开');
                    this.$router.push({
                        path: '/business'
                    });

                    this.adOrVideo = false;
                    this.videoPlay = true;
                    this.getVideoSrc();
                }else if (event === 'confirm'){

                    this.isModalImg = false;
                    this.adOrVideo = true;
                    this.videoPlay = false;
                    console.log('即将开始识别人脸');
                    this.faceRecognition(template64);
                    localStorage.setItem('template64',portrait64);
                }else if (event === 'change'){
                    this.isModalImg = false;
                    this.leaveTimeToCollect();
                    localStorage.setItem('customerID', '');

                    this.timer = setTimeout(
                        ()=> {
                            this.faceRecognition(template64);
                        },500
                    )
                }else if (event === 'move'){
                    this.dynamicImg = "data:image/png;base64," + portrait64;
                    console.log('dynamicImg',this.dynamicImg);
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
            },

            //取当前年月日
            getNowDate(){
                let nowDate = new Date();
                let month = nowDate.getMonth() + 1;
                let  day = nowDate.getDate();
                this.today = month+'-'+day;
                console.log('today',this.today);
            }

        },
        created() {
            localStorage.setItem('customerID', '');
            this.readConfig();
            this.termLogin();
            this.MutedAds = this.sysConfig.MutedAds;
            //console.log(this.MutedAds);
            this.getNowDate()
        },

        beforeDestroy() {
            this.stopMonitor();
            clearTimeout(this.timer);
        }
    }
</script>
<style scoped>
    .birth{
        width: 540px;
    }
    .birth img{
        width:  100%;
    }

    .videoPlay{
        width: 100%;
        height: 460px;
        /*height: 608px;*/
    }

    .ad{
        color: white;
        width: 1080px;
        height: 460px;
        /*height: 608px;*/
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
    .ad h3{
        color: #c92727;
        font-size: 28px;
    }
    .ad p{
        color: #666;
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
    .modalImg{
        z-index: 999;
        width: 610px;
        height: 460px;
        position: fixed;
        top: 0;
        left: 235px;
    }
    .modalImg img{
        width: 100%;
        height: 100%;
    }


</style>
