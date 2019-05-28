<template>
    <div>
        <div>
            <!--<div class="select" v-show="selectCustomer">-->
                <!--<el-form :label-position="labelPosition" size="mini" label-width="200px" :model="registered">-->
                    <!--<el-form-item label="请勾选您的属性（必选）"  align="left">-->
                        <!--<el-radio-group v-model="registered.sex" @change="nextStep" >-->
                            <!--<el-radio label="客户"></el-radio>-->
                            <!--<el-radio label="非客户"></el-radio>-->
                        <!--</el-radio-group>-->
                    <!--</el-form-item>-->
                <!--</el-form>-->
            <!--</div>-->
            <div class="dialogue">
                <div>您好，小西现在还不认识您，请问您贵姓</div>
                <p>您可以在屏幕下方刷身份证直接显示您的信息</p>
                123{{idCard}}
            </div>
        </div>

        <div v-show="isRegistered" class="isRegistered">
            <div>
                <el-form :label-position="labelPosition" size="mini" label-width="80px" :model="registered">
                    <el-form-item label="姓名">
                        <el-input v-model="registered.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别"  align="left">
                        <el-radio-group v-model="registered.sex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="registered.phone"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <h3>产品关注</h3>
                <el-form :label-position="labelPosition" size="mini" label-width="80px" :model="productAttention">
                    <el-form-item prop="type">
                        <el-checkbox-group align="left" v-model="productAttention.attention" @change="look">
                            <el-col :span="8">
                                <el-checkbox label="股票" name="type"></el-checkbox>
                            </el-col>
                             <el-col :span="8">
                                <el-checkbox label="基金" name="type"></el-checkbox>
                            </el-col>
                             <el-col :span="8">
                                <el-checkbox label="理财" name="type"></el-checkbox>
                            </el-col>
                             <el-col :span="8">
                                <el-checkbox label="债券" name="type"></el-checkbox>
                            </el-col>
                             <el-col :span="8">
                                <el-checkbox label="期货" name="type"></el-checkbox>
                            </el-col>
                             <el-col :span="8">
                                <el-checkbox label="双融" name="type"></el-checkbox>
                            </el-col>
                        </el-checkbox-group>
                    </el-form-item>

                </el-form>
                <div class="send">
                    <el-button @click="returnHome">暂不提交</el-button>
                    <el-button type="info" @click="putRegistered">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import qs from 'qs'
export default {
    data (){
        return {
            idCard: '',
            imgFile: '',
            Base64tmp: '',
            sysConfig: '',
            selectCustomer: true,
            isRegistered: true,
            labelPosition: 'right',
            registered: {
                name: '',
                sex: '',
                phone: ''
            },
            productAttention: {
                attention: []
            }
        }
    },
    methods: {

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
            })
        },
        nextStep(){
            console.log(this.registered.sex);
            this.selectCustomer = !this.selectCustomer;
            this.isRegistered = !this.isRegistered;
        },
        putRegistered (){
            this.getPortrait();

            let arr = this.productAttention.attention.map(item => item).join('|');
            console.log(arr);

            let obj = {};

            obj.OrgID =  this.sysConfig.OrgID;
            obj.BranchID = this.sysConfig.BranchID;
            obj.Name = this.registered.name;
            obj.Sex = this.registered.sex;
            obj.Phone = this.registered.phone;
            obj.FeatureImg = this.Base64tmp;
            obj.InterIDs = '3|4';
            obj.BranchNo = this.sysConfig.BranchNo;
            obj.IDCardNo = '';

            console.log('obj',obj);
            this.$axios.post( this.$api.registeredData, qs.stringify( obj ) ).then(
                res => {
                        console.log(res);
                        if ( res.data.Code == 200 ){
                            this.returnHome();
                        }else if ( res.data.Code == 403 ){
                            this.successMessgae( '注册失败，请重新注册','error' );
                        }else if ( res.data.Code == 404 ){
                            this.successMessgae( '人脸数据不正确，请重新提交','warning' );
                        }
                    }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        },

        //截图
        getPortrait(){
            this.imgFile = fwFaceMonitor.getPortrait();
            this.Base64tmp = fwFaceMonitor.getBase64Portrait();
        },

        //读取配置
        readConfig(){
            this.sysConfig =  eval("(" + fwConfigReader.read() + ")");
        },

        //获取兴趣
        getInteres(){
            this.$axios.get( this.$api.getInteresList ).then(
                res => {
                    console.log(res);
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        },

        //读取身份证
        readIDCard(){
            this.idCard = fwIDCardReader.read();
            this.registered.name = this.idCard.name;
            this.registered.sex = this.idCard.sex;
        }
    },
    created() {
        this.getInteres();
        this.readConfig();
        this.readIDCard();
        this.speak( '尊敬的客户，为方便为您服务，请登记身份信息' );

    }
}
</script>
<style scoped>
    .isRegistered,.send{
        margin-top: 150px;
    }

    h3{
        margin: 30px;
    }

    .dialogue p{
        margin-top: 30px;
        color: #777;
    }
    .dialogue >div:nth-child(odd){
        width: 400px;
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
<style>
.select .el-form-item--mini{
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
</style>
