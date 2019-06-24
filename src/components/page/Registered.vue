<template>
    <div class="registered">
        <div>
            <div class="dialogue">
                <p class="message">尊敬的客户，为方便为您服务，请登记身份信息</p>
                <div class="triangle"></div>
                <img  v-show="isShowPrompt"  src="./../../../static/img/img.png" alt="">
            </div>
        </div>
        <div v-show="isRegistered" class="customerInfo">
            <div>
                <img :src="registered.avatar" alt="证件照">
            </div>
            <div class="textInfo" align="left">
                <div>
                    <span>姓名：</span>
                    {{registered.name}}
                </div>
                <div>
                    <span>性别：</span>
                    {{registered.sex}}
                </div>
            </div>
        </div>
        <div class="re">
            <button @click="waitCard" :class="{red:isActive}" :disabled="isDisabled">请重刷身份证<span v-if="isShowTimeCount">({{timeCount}}s)</span></button>
        </div>


        <div class="isRegistered">
            <div>
                <h3>产品关注</h3>
                <div class="line">
                    <div></div>
                    <i>PRODUCT CONCERNS</i>
                    <div></div> 
                </div>
                <el-form :label-position="labelPosition" size="mini" label-width="80px" :model="productAttention">
                    <el-form-item prop="type">
                        <el-checkbox-group align="left" v-model="productAttention.attention" @change="look" true-label="string">
                            <el-col :span="8" v-for="(item,index) in likesList" :key="index">
                                <el-checkbox  size="medium" :label="item.ID" :value="item.ID">{{item.Title}}</el-checkbox>
                            </el-col>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
                <div class="send">
                    <div align="right">
                        <img src="./../../../static/img/cha.png" alt="" @click="returnHome">
                    </div>
                    <div align="left">
                        <img src="./../../../static/img/gou.png" alt=""  @click="putRegistered">
                    </div>
                </div>
            </div>
        </div>
        <div class="prompt">
            <img src="./../../../static/img/zhiyin.gif" alt="请刷身份证">
            <p>请在下方刷身份证</p>
        </div>

        <el-dialog
                :visible.sync="centerDialogVisible"
                width="580px"
                align="center">
            <div class="open">
                <img src="./../../../static/img/welcome.gif" alt="">
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import qs from 'qs'
export default {
    data (){
        return {
            centerDialogVisible: false,
            isActive: false,
            isShowTimeCount: true,
            isDisabled:true,
            timer: '',
            timer2: '',
            timeCount: 60,
            classNameRed:'chang-red',
            idCard: '',
            imgFile: '',
            Base64tmp: '',
            sysConfig: '',
            isShowPrompt: true,
            isRegistered: false,
            labelPosition: 'right',
            registered: {
                avatar: '',
                name: '',
                sex: '',
                phone: ''
            },
            productAttention: {
                attention: []
            },
            likesList: []
        }
    },
    mounted() {
        window.idCardCallBack = () => {
            this.readIDCard();
        };
    },
    methods: {


        //获取关注点
        getLikes(){
            this.$axios.get( this.$api.getLikes,{
                params: {
                    orgID: this.sysConfig.OrgID
                }
            } ).then(
                res => {
                    console.log('兴趣',res);
                    this.likesList = res.data.Data;
                }
            ).catch(
                err => {
                    console.log(err);
                }
            );
        },

        //语音询问
        speak ( text ){
            fwVoiceMonitor.speak(text);
        },

        successMessgae( message,type ) {
            this.$message({
                showClose: true,
                message: message,
                type: type
            });
        },

        look(){
            console.log(this.productAttention.attention);
            let arr = this.productAttention.attention.map( item => item).join('|');
            console.log('arr',arr);
        },

        returnHome(){
            this.$router.push({
                path: '/business'
            });
        },


        //注册
        putRegistered(){
            let arr = this.productAttention.attention.map(item => item).join('|');
            console.log(arr);

            let obj = {};
            // console.log('Base64tmp2',this.Base64tmp);
            obj.IDCardNo = this.idCard.number;
            obj.OrgID =  this.sysConfig.OrgID;
            obj.BranchID = this.sysConfig.BranchID;
            obj.Name = this.registered.name;
            obj.Sex = this.registered.sex;
            obj.Phone = this.registered.phone;
            obj.FeatureImg = this.Base64tmp;
            obj.InterIDs = arr;
            obj.BranchNo = this.sysConfig.BranchNo;

            console.log('obj',obj);
            this.$axios.post( this.$api.registeredData, qs.stringify( obj ) ).then(
                res => {
                    console.log(res);
                    if ( res.data.Code === 200 ){
                        this.speak( '尊敬的客户'+ this.registered.name +'您好,屏幕上方有您可能关注的内容、请查阅及选择您的来访意图，如有需要请点击、我的客户经理' );

                        this.centerDialogVisible = true;

                        this.timer2 = setTimeout(
                            ()=> {
                                this.centerDialogVisible = false;
                                this.returnHome();
                            },5000
                        )

                    }else if ( res.data.Code === 403 ){
                        this.successMessgae( '注册失败，请重新注册','error' );
                    }else if ( res.data.Code === 404 ){
                        this.successMessgae( '人脸数据不正确，请重新提交','warning' );
                    }
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        },

        //读取配置
        readConfig(){
            this.sysConfig =  eval("(" + fwConfigReader.read() + ")");
        },

        //获取兴趣
        // getPointsOfInterest(){
        //     this.$axios.get( this.$api.getPointsOfInterestList ).then(
        //         res => {
        //             console.log(res);
        //         }
        //     ).catch(
        //         err => {
        //             console.log(err);
        //         }
        //     )
        // },

        //读取身份证
        waitCard(){
            fwIDCardReader.waitCard(60,"idCardCallBack");//等客户放卡60秒钟

        },

        readIDCard(){
            let config = fwIDCardReader.read();
            console.log(config);
            this.idCard = eval("(" + config + ")");

            let r = fwFaceMonitor.faceImageCompare(this.Base64tmp,this.idCard.picture);
            if (r) {
                this.registered.avatar =  "data:image/png;base64,"+this.idCard.picture;
                this.registered.name = this.idCard.name;
                this.registered.sex = this.idCard.sex;
                this.speak( '请选择您的关注点、并提交' );

                this.isShowPrompt = false;
                this.isRegistered =  !this.isRegistered;
            }
            else {
                alert("对比失败");
            }


        },


        myTime(){
            this.timer = setInterval( ()=>{
                this.timeCount--;
                if ( this.timeCount === 0 ) {
                    clearInterval(this.timer);
                    this.waitCard();
                    this.isDisabled = false;
                    this.isShowTimeCount = false;
                    this.isActive =true;
                }
            },1000 );

        }
    },
    beforeDestroy () { //清除定时器
        if (this.timer){
            console.log('清除定时1');
            clearInterval(this.timer);  //在Vue实例销毁前，清除定时器
        }
        if (this.timer2) {
            console.log('清除定时2');
            clearInterval(this.timer2);
        }

    },
    created() {
        // this.getPointsOfInterest();
        this.readConfig();
        this.waitCard();
        this.speak( '尊敬的客户，为方便为您服务，请登记身份信息' );
        this.Base64tmp = localStorage.getItem('template64');
        this.getLikes();
        this.myTime();

        //console.log('Base64tmp',this.Base64tmp);
    }
}
</script>
<style scoped>
    .open{
        width: 540px;
    }
    .open img{
        width: 100%;
    }
    .prompt{
        position: relative;
        bottom: -250px;
        left: -200px;
    }
    .prompt p{
        margin-top: -55px;
        color: #666;
    }
    .textInfo{
        font-weight: bold;
    }

    .customerInfo{
        margin: 30px 0;
        width: 500px;
        border-radius: 10px;
        padding: 30px 0;
        display: flex;
        flex-flow: row nowrap;
        background-color: #fff;
        box-shadow: 0 3px 6px rgba(205,205,205,.3);
    }
    .customerInfo>div:first-child{
        width: 110px;
        height: auto;
        margin-left: 80px;
    }
    .customerInfo>div:last-child{
        margin-left: 60px;
    }

    .customerInfo>div:last-child>div{
        margin-top: 30px;
    }

    .customerInfo img{
        width: 100%;
        height: 100%;
        border: 2px solid rgba(200,174,120,.5);
        border-radius: 10px;
    }


    .red{
        color: #c92727 !important;
    }
    .re button{
        cursor: pointer;
        width: 240px;
        height: 68px;
        /*border: 1px solid grey;*/
        background-color: #fff;
        color: grey;
        border-radius: 10px;
        font-size: 24px;
        box-shadow: 0 5px 5px rgba(128,128,128,.2);
    }
    .re span{
        color: grey;
        font-size: 14px;
    }
    .dialogue img{
        margin: 30px 0;
    }

    .dialogue>p{
        margin-top: 30px;
        background-color: #c92727;
        width: 420px;
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

    .send>div{
        cursor: pointer;
    }
    .send{
        margin-top: 50px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
    }
    i{
        font-size: 14px;
        font-family: Arial;
    }
    .line{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        margin: 20px;
    }
    .line>div:first-child{
        position: relative;
        left: 30px;
    }
    .line>div:last-child{
        position: relative;
        right: 30px;
    }
    .line>div{
        width: 80px;
        height: 1px;
        background: #be9f5f;
        position: relative;
        top: 8px;
    }
    .registered{
        background-color: #f5f5f5;
    }
    .isRegistered>div:last-child{
        border-radius: 10px;
        padding: 50px 0;
        background-color: #fff;
        box-shadow: 0 3px 6px rgba(205,205,205,.3);
    }
    .isRegistered{
        margin-top: 50px;
    }

    h3{
        margin: 30px;
        font-size: 28px;
        color: #c92727;
    }
</style>
<style>
    .el-dialog__body{

    }
    .el-radio__input.is-checked .el-radio__inner{
        border:1px solid #c52627;
        background-color: #c52627;
    }
    .el-radio__input.is-checked+.el-radio__label{
        color: #c52627;
    }
    .el-input.is-active .el-input__inner, .el-input__inner:focus{
        border:1px solid #c52627;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner{
        background-color: #c52627;
        border: #c52627;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label{
        color: #c52627;
    }
    .el-input__inner{
        background-color: transparent;
    }
    .el-form-item__label{
       font-size: 22px;
        color: #333;
    }
.select{
    padding: 5px 0;
    background-color: #c0a264;
    color: #fff;
}
.select .el-form-item__label{
    color: #fff;
}
.select .el-radio{
    color: #fff;
}
    .el-checkbox__inner{
        /*width: 25px;*/
        /*height: 25px;*/
    }
    .el-checkbox__inner::after{
        /*width: 10px;*/
        /*height: 18px;*/
    }
</style>
