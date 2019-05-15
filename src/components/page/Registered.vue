<template>
    <div>
        <div>
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
</style>
