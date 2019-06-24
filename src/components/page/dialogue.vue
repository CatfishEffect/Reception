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
            <p v-for="(item,index) in questionsData" :key="index">
                {{item}}
            </p>
            <div class="triangle"></div>

        </div>
        <!-- line -->
        <div class="line"></div>

        <!--客户经理列表-->
        <div class="headPhoto">
            <div v-for="(item,index) in managerList" :key="index">
                <img :src="$url+item.ImageUrl" alt="" @click="selectManager(item)">
                <h5>{{item.Name}}</h5>
            </div>
        </div>

        <el-dialog
            :visible.sync="centerDialogVisible"
            width="500px"
            align="center"
            >
            <div class="customer-photo">
                <img :src="managerImg" alt="">
            </div>
            <div class="w-line"></div>
            <div class="customer">
                <div>
                    <img src="./../../../static/img/shenfen.png" alt="">
                    <span>{{managerName}}</span>
                </div>
                <div>
                    <img src="./../../../static/img/zhiwu.png" alt="">
                    <span>{{myPosition}}</span>
                </div>
            </div>
            <div class="btn-sure" @click="sendMessage">确认</div>
        </el-dialog>

    </div>
</template>
<script>
    import myButton from './../common/MyButton'
export default {
    data (){
        return {
            myPosition: '',
            centerDialogVisible: false,
            isShow: false,
            sysConfig: '',
            customerName: '',
            questionsData: [ '请说出您要找的人姓名' ],
            answeredData: [ ],
            managerList: [ ],
            managerImg: '',
            managerName: '',
            customID: '',
            empID: '',
            isSpeech: true
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
        sendMessage(){

            this.$axios.get(this.$api.voiceFindManager,{
                params: {
                    empID : this.empID,
                    customID : this.customID
                }
            }).then(
                res => {
                    console.log(res);
                }
            ).catch(
                err => {
                    console.log(err);
                }
            );
            this.$message({
                showClose: true,
                message: '已通知'+this.managerName+'，请在休息区等候'
            });
            this.isShow = false;
        },
        selectManager ( item ){
            console.log(item);
            this.managerImg = this.$url + item.ImageUrl;
            this.managerName = item.Name;
            this.myPosition = item.Title;
            this.empID = item.EmpID;
            this.isShow = true;
            this.centerDialogVisible = true;
        },

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
                    this.managerList = res.data.Data;
                    if ( res.data.Code === 404 ) {
                        //this.questionsData.push(res.data.Message);
                        this.speak( res.data.Message );
                    }else if ( res.data.Result === true ) {
                        // this.isShow = true;
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
            let time = fwVoiceMonitor.speak(text);
            console.log('time',time);
        },

        listenCallBack( msg ){
            console.log('问题',msg);
            this.customerName = msg;
            this.voiceStop();
            // this.questionsData.push(this.customerName);
            this.findPeople();
        },

        voiceStart(){
            console.log(111);
            fwVoiceMonitor.startListen("listenCallBack");
        },

        voiceStop(){
            fwVoiceMonitor.stopListen();
        },

        speechOver( ){
            this.voiceStart();
        },


        //读取配置
        readConfig() {
            this.sysConfig = eval("(" + fwConfigReader.read() + ")");
        },

    },
    beforeDestroy(){
        this.voiceStop();
    },
    created () {
        this.readConfig();
        fwVoiceMonitor.speakWithCallBack('请说出您要找的人姓名','speakOver');

        this.customID = localStorage.getItem('customerID');
    }
}
</script>
<style scoped>
    .dialogue>p{
        display: inline-block;
        margin-top: 30px;
        background-color: #c92727;
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


    .info>span{
        color: white;
        cursor: pointer;
        position: absolute;
        right: 15px;
        top: 15px;
    }
    .headPhoto{

        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
    }
    .headPhoto img{
        /*//margin-left: 190px;*/

    }
    .headPhoto>div{
        margin: 20px 30px;
    }
    .customer-photo{
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
    }
    .customer-photo img,.headPhoto img{
        width: 120px;
        height: 120px;
        border-radius: 50%;
        cursor: pointer;
    }
    .headPhoto h5{
        margin-top: 20px;
    }

    .dialogue{
        margin-top: 60px;
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
.btn-sure{
    cursor: pointer;
    /*position: absolute;*/
    /*left: 0;*/
    /*bottom: 0;*/
    width: 100%;
    height: 80px;
    line-height: 80px;
    background: #c52627;
    color: #fff;
    font-size: 24px;
    border-radius: 0 0 10px 10px;
}
.customer>div span{
    margin-left: 20px;
}
.customer {
    margin-left: 132px;
    margin-top: 60px;
    margin-bottom: 60px;
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
    color: #333;
    font-size: 20px;
    text-align: left;
}
.customer-photo > img{
    margin: 20px 0;
}
.w-line{
    margin: 30px 0;
    width: 460px;
    height: 1px;
    background: rgba(200,174,120,.5);
}

.info{
    position: relative;
    padding: 0 10px;
    margin: 0 auto;
    width: 276px;
    height: 339px;
    margin-top: 60px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
}
.line{
        margin-top: 74px;
        width: 100%;
        height: 1px;
        background: rgba(206, 180, 128, .3);
    }

</style>
<style>
    .el-dialog{
        border-radius: 10px!important;
    }
    .el-dialog__body{
        padding: 0!important;
    }
</style>