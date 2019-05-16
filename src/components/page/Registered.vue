<template>
    <div>
        <div>
            <div class="select">
                <el-form :label-position="labelPosition" size="mini" label-width="200px" :model="registered">
                    <el-form-item label="请勾选您的属性（必选）"  align="left">
                        <el-radio-group v-model="registered.sex">
                        <el-radio label="客户"></el-radio>
                        <el-radio label="非客户"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </div>
            <div class="dialogue">
                <div>您好，小西现在还不认识您，请问您贵姓</div>
                <p>您可以在屏幕下方刷身份证直接显示您的信息</p>
            </div>
        </div>

        <div v-show="isRegistered">
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
                        <el-checkbox-group align="left" v-model="productAttention.attention">
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
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {
            isRegistered: false,
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
    }
}
</script>
<style scoped>
    h3{
        margin: 30px;
    }
    .dialogue{
        margin-top: 150px;
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
