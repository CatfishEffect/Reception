<template>
    <div>
        <div>

                <!-- 联系客户经理 -->
                <!-- <div  class="contact">
                    <img src="./../../static/img/lianxikehujingli.png" alt="">
                    <span>联系客户经理</span>
                </div> -->

                <!-- 开卡选项 -->
                <div class="bar">
                    <div>
                       <div class="open openAccount">
                            <div>
                                <img src="./../../../static/img/yanjing.png" alt="">
                                <span>办理开户</span>
                            </div>
                            <h5>ACCOUNT OPENING</h5>
                       </div>
                       <div class="open consultation">
                            <div>
                                <img src="./../../../static/img/yanjing.png" alt="">
                                <span>投顾咨询</span>
                            </div>
                            <h5>CONSULTATION</h5>
                       </div>
                    </div>
                    <div>
                       <div class="open business">
                            <div>
                                <img src="./../../../static/img/yanjing.png" alt="">
                                <span>办理业务</span>
                            </div>
                            <h5>HANDLE BUSINESS</h5>
                       </div>
                       <div class="open visit">
                            <div>
                                <img src="./../../../static/img/yanjing.png" alt="">
                                <span>来访办事</span>
                            </div>
                            <h5>VISIT SERVICE</h5>
                       </div>
                    </div>
                </div>

                <!-- line -->
                <div class="line"></div>

                <!-- 更多 -->
                <div class="more">
                    <div>
                        <span>语音咨询</span>
                       <img src="./../../../static/img/yanjing.png" alt="">
                    </div>
                    <div>
                        <span>语音咨询</span>
                        <img src="./../../../static/img/yanjing.png" alt="">
                    </div>
                    <div>
                        <span>语音咨询</span>
                        <img src="./../../../static/img/yanjing.png" alt="">
                    </div>
                </div>

                <!-- 联系客户经理 -->
                <div align="center" >
                    <div class="contact-my">
                        <img src="./../../../static/img/lianxikehujingli2.png" alt="">
                        <h5>联系客户经理</h5>
                    </div>
                </div>
                
            </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .line{
        margin-top: 74px;
        width: 100%;
        height: 1px;
        background: rgba(206, 180, 128, .3);
    }
    .contact-my{
        margin-top: 120px;
        width: 165px;
        height: 110px;
        border: 1px solid #ceb480;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, .15);
    }
     .contact-my img{
         margin-top: 15px;
     }
    .contact-my h5{
        font-size: 16px;
        margin-top: 10px;
        color: #ceb480;
        font-weight: normal;
    }


   
    .contact{
        position: absolute;
        right: 0;
        width: 185px;
        height: 57px;
        line-height: 57px;
        background-color: #84b4b9;
        color: #fff;
        border-radius: 3px;
        font-size: 20px;
    }
    .open >div{
        padding: 25px 0 10px 0;
    }
    .open{
        margin-top: 25px;
        width: 289px;
        height: 130px;
        cursor: pointer;
    }
    .openAccount{
        background-image: url('./../../../static/img/banlikaihu.png');
    }
    .consultation{
        background-image: url('./../../../static/img/touguzixun.png');
    }
    .business{
        background-image: url('./../../../static/img/banliyewu.png');
    }
    .visit{
        background-image: url('./../../../static/img/laifangbanshi2.png');
    }
    .open span{
        margin-left: 20px;
        font-size: 30px;
        vertical-align: middle;
    }
    .open h5{
        font-family: Arial;
        font-size: 16px;
        font-weight: normal;    
        letter-spacing: 2px;
    }
    .bar{
        margin-top: 73px;
        color: #fff;
    }
    .bar>div{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }
    .more {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-top: 74px;
    }
    .more > div{
        width: 185px;
        height: 57px;
        line-height: 57px;
        color: #fff;
        font-size: 20px;
        background-color: #84b4b9;
        border-radius: 3px;
        cursor: pointer;
    }
</style>
