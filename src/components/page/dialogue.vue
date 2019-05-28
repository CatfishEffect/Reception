<template>
    <div>
        <div class="dialogue">
            <div v-for="(item,index) in questionsData" :key="index">
                {{item}}
            </div>

        </div>
        <!-- line -->
        <div class="line"></div>

        <div class="btn">
            <el-button @click="voiceStart" >点击询问</el-button>
            <router-link to="/business" tag="span">
                <el-button >回到首页</el-button>
            </router-link>
        </div>

        <div v-show="isShow" class="info">
            <div class="customer-photo">
                <img src="./../../../static/img/kehu.png" alt="">
            </div>
            <div class="w-line"></div>
            <div class="customer">
                <div>
                    <img src="./../../../static/img/shenfen.png" alt="">
                    <span>胡歌</span>
                </div>
                <div>
                    <img src="./../../../static/img/zhiwu.png" alt="">
                    <span>投顾经理</span>
                </div>
            </div>
            <router-link class="btn-sure" to="/business" tag="div">确认</router-link>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {
            isShow: false,
            sysConfig: '',
            customerName: '',
            questionsData: [ '请问您找谁' ],
            answeredData: [ ]
        }
    },
    mounted(){
        window.listenCallBack =  ( msg )=> {
            this.listenCallBack(msg);
        }
    },
    methods: {

        //语音找人
        findPeople(){
            this.$axios.get( this.$api.findPeopleData,{
                params: {
                    orgID: this.sysConfig.OrgID,
                    branchID: this.sysConfig.BranchID,
                    name: this.customerName
                }
            } ).then(
                res => {
                    console.log(res);
                    if ( res.data.Result === false ) {
                        this.questionsData.push(res.data.Message);
                        this.speak( res.data.Message );
                    }else if ( res.data.Result === true ) {
                        this.isShow = true;
                    }
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        },

        //语音询问
        speak ( text ){
            fwVoiceMonitor.speak(text);
        },

        listenCallBack( msg ){
            console.log(msg);
            this.customerName = msg;
            this.voiceStop();
            this.questionsData.push(this.customerName);
            this.findPeople();
        },

        voiceStart(){
            fwVoiceMonitor.startListen("listenCallBack");
        },

        voiceStop(){
            fwVoiceMonitor.stopListen();
        },

        //语音转文字
        hear (){
            this.customerName = fwVoiceMonitor.hear();
            this.questionsData.push(this.customerName);
            this.findPeople();
            console.log(this.questionsData);
        },

        //读取配置
        readConfig() {
            this.sysConfig = eval("(" + fwConfigReader.read() + ")");
        },

    },
    created () {
        this.readConfig();
        this.speak( '请说出您要找的人姓名' );
    },
    destroyed() {
        this.voiceStop();
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

.btn-sure{
    cursor: pointer;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #c0a264;
    color: #fff;
    font-size: 24px;
    border-radius: 0 0 10px 10px;
}
.customer>div span{
    margin-left: 20px;
}
.customer>div{
    margin-left: 60px;
}
.customer>div:first-child{
    margin-top: 30px;
}
.customer>div:last-child{
    margin-top: 20px;
    
}
.customer div span{
    vertical-align: middle;
}

.customer{
    color: white;
    font-size: 20px;
    text-align: left;
}
.customer-photo > img{
    margin: 20px 0;
}
.w-line{
    width: 100%;
    height: 1px;
    background: #fff;
}

.info{
    position: relative;
    padding: 0 10px;
    margin: 0 auto;
    width: 276px;
    height: 339px;
    margin-top: 60px;
    background: #d1c3a2;
    border-radius: 10px;
    box-sizing: border-box;
}
.line{
        margin-top: 74px;
        width: 100%;
        height: 1px;
        background: rgba(206, 180, 128, .3);
    }
.dialogue >div:nth-child(odd){
    width: 200px;
    background-color: #d98e75;
    color: #fff;
    text-align: left;
    font-size: 20px;
    padding: 20px 30px 20px 50px;
    border-radius: 100px 30px 30px 0;
}
.dialogue >div:nth-child(even){
    margin-left: 320px;
    width: 180px;
    background-color: #c0a264;
    color: #fff;
    text-align: right;
    font-size: 20px;
    padding: 20px 50px 20px 40px;
    border-radius: 30px 100px 0 30px ;
}
</style>
