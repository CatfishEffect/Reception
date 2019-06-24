<template>
    <button @click="returnHome">
        <img src="./../../../static/img/icon-return.png" alt="">
        返回
    </button>
</template>

<script>
    export default {
        name: "MyButton",
        data (){
            return {

            }
        },
        methods: {
            returnHome (){
                this.stopSpeek();
                this.$router.push({
                    path:'/'
                })
            },
            stopSpeek(){
                fwVoiceMonitor.stopSpeak();
            }
        }
    }
</script>

<style scoped>

    /*button:hover{*/
        /*transition: all 0.3s linear;*/
        /*background-color: #c52627;*/
        /*color: #fff;*/
    /*}*/


    button{
        cursor: pointer;
        width: 240px;
        height: 68px;
        border: 1px solid #c52627;
        color: #c52627;;
        border-radius: 10px;
        font-size: 24px;
    }
    button:last-child{
        margin-left: 80px;
    }
</style>