<template>
    <div align="left">
        <div align="right" >
            <div @click="open1" class="contact-my">客户经理</div>
        </div>
        <el-dialog
                :visible.sync="centerDialogVisible"
                width="500px"
                center>
            <div class="displayImg" align="center">
                <img src="./../../../static/img/1.gif" alt="连线中...">
                <p>已通知客户经理，请稍候...</p>
            </div>
        </el-dialog>
        
        <div class="waitBtn">
            <button v-if="isWait" @click="dialogVisible = true">排队</button>
            <myButton/>
        </div>

        <div>
            <img class="openImg"  :src="myDetails" alt="">
        </div>

        <!-- 排号module -->
        <div class="model" v-show="dialogVisible">
            <div class="dialog">
                <div>
                    <div class="myTitle">78</div>
                </div>
                <div class="line"></div>
                <div class="wait">
                    <p>等待人数：<span>20</span> </p>
                    <p>办理窗口：<span> 1、4、9</span> </p>
                </div>
                 <div class="close" @click="dialogVisible = false">
                    X
                </div>
                <div class="sure">
                    <button @click="dialogVisible = false">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import myButton from './../common/MyButton'
export default {
    data (){
        return {
            centerDialogVisible: false,
            textContent: '',
            dialogVisible: false,
            id: '',
            myDetails: '',
            customID: '',
            isWait: true
        }
    },
    components:{
        myButton
    },
    methods: {
        speak ( text ){
            fwVoiceMonitor.speak(text);
        },

        //通知消息
        open1() {

            this.centerDialogVisible = true;
            this.$axios.get(this.$api.contactManager,{
                params: {
                    customID: this.customID,
                    ID: this.id
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

            this.speak('已通知客户经理，请稍候...');
        },
        getDetails(){
            this.$axios.get( this.$api.getDetails,{
                params: {
                    id: this.id
                }
            } ).then(
                res => {
                    console.log(res);
                    this.myDetails = this.$url + res.data.Data.GuidImageUrl;
                    this.textContent = res.data.Data.GuidText;
                    this.speak(this.textContent);

                    if ( res.data.Data.QueueScript == '' ){
                        this.isWait = false;
                    }
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        }
       
    },
    created() {
        this.id = this.$route.params.id;
        this.customID = this.$route.params.customID;

        this.getDetails();
    }
}
</script>
<style scoped>
    .displayImg{
        margin: 0;
    }
    .displayImg p{
        color: #999;
        font-size: 26px;
        padding-bottom: 30px;
    }

    .waitBtn{
        margin-top: 30px;
    }
    .contact-my{
        position: relative;
        right: -60px;
        cursor: pointer;
        text-align: center;
        width: 150px;
        color: white;
        font-size: 20px;
        height: 50px;
        line-height: 50px;
        background-color: #ec3b3c;
        border-radius: 50px 0 0 50px;
    }

.model{
    width: 100%;
    height: 1920px;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .3);
}

.close{
    font-size: 24px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

    .sure>button{
        cursor: pointer;
        position: absolute;
        bottom: 0;
        border-radius: 0 0 10px 10px;
        width: 100%;
        height: 82px;
        line-height: 82px;
        background: #c52627;
        font-size: 28px;
        color: white;
    }

/* 排队dialog */
.dialog{
    width: 400px;
    height: 360px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -180px;
}

.dialog>div:first-child{
    
    text-align: center;
   
}
.myTitle{
    margin: 30px auto;
    font-size: 30px;
    background-color: #c0a264;
    color: #fff;
    width: 60px;
    height: 60px;
    line-height: 60px;
    border-radius: 50%;
}
.line{
    width: 100%;
    height: 1px;
    background-color: #c0a264;
}

.wait{
    margin-top: 40px; 
    margin-left: 30px;
}
.wait p{
    font-size: 20px;
    color: #666;
    margin: 10px 0;
}
.wait span{
    font-size: 24px;
     color: #333;
}


.openImg{
    margin-top: 70px;
    width: 591px;
    height: auto;
}

figure{
    margin-top: 70px;
    margin-bottom: 41px;
}

.content{
    color: #666;
    font-size: 18px;
}
h5{
    font-weight: normal;
    font-size: 30px;
    color: #333;
    text-align: center;
    margin-top: 140px;
    margin-bottom: 50px;
}

/*.waitBtn button:hover{*/
    /*transition: all 0.3s linear;*/
    /*background-color: #c52627;*/
    /*color: #fff;*/
/*}*/


.waitBtn button{
    cursor: pointer;
    width: 240px;
    height: 68px;
    border: 1px solid #c52627;
    color: #c52627;;
    border-radius: 10px;
    font-size: 24px;
}
.waitBtn button:last-child{
    margin-left: 80px;
}


</style>
<style>
    .el-dialog__wrapper{
        padding-top: 20vh;
    }
     .el-dialog{
        border: none;
    }
     .el-dialog__body{
     }
     .el-icon{
         color: white;
     }
     .el-icon-close{
         color: white;
     }
    .el-dialog__close{
        color: white;
    }
    .el-dialog__body>div{
        margin-top: 0;
    }
</style>
