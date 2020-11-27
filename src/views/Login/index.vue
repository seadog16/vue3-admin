<template lang="pug">
    .login
        .login-card.clearfix
            .login-bg
                .fly
                .fly
                .flash
            .login-form
                //-h1
                    img.logo(src="~@/assets/images/yitiji_logo.svg")
                    span 广东政务服务一体机
                h2 开放平台
                el-tabs
                    el-tab-pane(label="密码登录")
                        el-form(
                            :model="passLogin"
                            @submit.native.prevent="login"
                            hide-required-asterisk)
                            el-form-item(label="用户名")
                                el-input(v-model.trim="passLogin.user")
                            el-form-item(label="密码")
                                el-input(show-password v-model.trim="passLogin.pass")
                            el-form-item.formItem
                                el-checkbox.floatLeft(v-model="savePass") 记住密码
                                a.register.floatRight(@click="$router.push('/register')") 注册开发者
                            el-form-item
                                el-button.btn(
                                    type="primary"
                                    native-type="submit"
                                    :loading="submitLoad") 登录
                                span.red(v-if="passErrorShow") {{ passErrorMsg }}
                    el-tab-pane(label="短信登录")
                        el-form(
                            :model="smsLogin"
                            @submit.native.prevent="smsSignUp"
                            ref="smsForm"
                            hide-required-asterisk)
                            el-form-item(label="手机号" prop="phone" :rules="{validator:checkPhone}")
                                el-input(v-model.trim="smsLogin.phone")
                            el-form-item(label="验证码" prop="code" :rules="codeRule")
                                el-input.input(v-model.trim="smsLogin.code")
                                    template(#append)
                                        .disabled(v-if="!phoneValid||timeSet>0")
                                        el-button(@click="queryValidCode") {{ timeSet ? timeSet + "秒后重新获取" : "获取验证码" }}
                            el-form-item.formItem
                                a.register.floatRight(@click="$router.push('/register')") 注册开发者
                            el-form-item
                                el-button.btn(
                                    type="primary"
                                    native-type="submit"
                                    :loading="submitLoad") 登录
                                span.red(v-if="smsErrorShow") {{ smsErrorMsg }}
</template>

<script lang="ts">
import { Vue, Component, Watch, Ref } from "vue-property-decorator";
import { getToken, sendCode, getTokenSms, sendLoginCode} from "@/http/api/auth";
import AES from "crypto-js/aes";
import ENC from "crypto-js/enc-utf8";
import { getModule } from "vuex-module-decorators";
import Sys from "@/store/sys";
import { checkPhone, regPhone } from "@/utils/validator";

@Component
export default class Login extends Vue {
    @Ref("smsForm") refSmsForm: any;
    store = getModule(Sys, this.$store);
    checkPhone = checkPhone;
    passLogin = {
        user: "",
        pass: ""
    };
    smsLogin = {
        phone: "",
        code: ""
    };
    passErrorShow = false;
    passErrorMsg = "";
    smsErrorShow = false;
    smsErrorMsg = "";
    submitLoad = false;
    savePass = Boolean(window.localStorage.getItem("login"));
    timeSet = 0;
    codeRule = { required: true, message: "请填写验证码" };

    @Watch("timeSet")
    timeSetWatch(val: number) {
        if (val > 0) {
            setTimeout(() => {
                this.timeSet--;
            }, 1000);
        }
    }

    get phoneValid() {
        return Boolean(this.smsLogin.phone.match(regPhone));
    }

    private created() {
        this.loadCache();
    }

    private login(): void {
        if (!this.passLogin.user || !this.passLogin.pass) {
            this.passErrorShow = true;
            this.passErrorMsg = "用户名或密码不能为空";
        } else {
            this.passErrorShow = false;
            this.submitLoad = true;
            if (this.savePass) {
                const { user, pass } = this.passLogin;
                const jsonStr = JSON.stringify({ user, pass });
                const cache = AES.encrypt(jsonStr, "ytj").toString();
                window.localStorage.setItem("login", cache);
            } else {
                window.localStorage.removeItem("login");
            }
            getToken({
                username: this.passLogin.user,
                password: this.passLogin.pass
            })
                .then(res => {
                    window.sessionStorage.setItem("token", String(res));
                    this.passErrorShow = false;
                    this.$router.push("/center");
                })
                .catch(() => {
                    this.passErrorShow = true;
                    this.passErrorMsg = "用户名或密码错误";
                })
                .finally(() => {
                    this.submitLoad = false;
                });
        }
    }
    private smsSignUp(): void {
        this.refSmsForm.validate().then(() => {
            this.smsErrorShow = false;
            this.submitLoad = true;
            if (this.savePass) {
                const { phone, code } = this.smsLogin;
                const jsonStr = JSON.stringify({ phone, code });
                const cache = AES.encrypt(jsonStr, "ytj").toString();
                window.localStorage.setItem("login", cache);
            } else {
                window.localStorage.removeItem("login");
            }
            getTokenSms({
                phone: this.smsLogin.phone,
                code: this.smsLogin.code
            })
                .then(res => {
                    window.sessionStorage.setItem("token", String(res));
                    this.smsErrorShow = false;
                    this.$router.push("/center");
                })
                .catch(() => {
                    this.smsErrorShow = true;
                    this.smsErrorMsg = "验证码错误";
                })
                .finally(() => {
                    this.submitLoad = false;
                });
        });
    }
    private loadCache() {
        const cache = window.localStorage.getItem("login");
        if (cache) {
            const jsonStr = AES.decrypt(cache, "ytj").toString(ENC);
            const obj = JSON.parse(jsonStr);
            this.passLogin.user = obj?.user;
            this.passLogin.pass = obj?.pass;
        }
    }
    private queryValidCode() {
        sendLoginCode(this.smsLogin.phone).then(() => {
            this.timeSet = 60;
        });
    }
}
</script>

<style scoped lang="stylus">
.login
    background url("~@/assets/images/loginBG.svg")
    background-size cover
    background-position center
    width 100%
    height calc(100vh - 80px)
    position relative

    h1
        font-weight 200
        font-size 28px
        text-align center

        & > *
            vertical-align middle

        .logo
            width 40px
            height @width

    h2
        color $color-primary
        font-weight 400
        margin-bottom 10px
        margin-top 15px
        text-align center

    &-card
        $width = 640px
        $height = 400px
        $left = 260px
        width $width
        height $height
        position absolute
        top 40%
        left 50%
        transform translate(-50%, -50%)
        box-sizing border-box
        box-shadow 0 2px 12px 0 rgba(0, 0, 0, .1)
        border-radius 6px
        background #fff
        overflow hidden

        .login-bg
            width $left
            position absolute
            left 0
            top 0
            height 100%
            background url("~@/assets/images/bannerPic.svg"),
                linear-gradient(to right, #000f89, #2d3368)
            background-size contain
            background-position center
            background-repeat no-repeat
            overflow hidden

            .flash
                background url("~@/assets/images/ellipse.svg")
                position absolute
                top 80px
                left -160px
                width 600px
                height 330px
                background-size 140%
                background-repeat no-repeat
                background-position center
                backdrop-filter filter(20px)
                opacity 0.3
                transform rotate(-40deg)

            .fly
                position absolute
                width 160px
                height 6px
                border-radius 20px
                transform rotate(-20deg)
                background linear-gradient(90deg, rgba(0, 255, 255, .45), rgba(0, 255, 255, 0))

            .fly:nth-child(1)
                top 280px
                right -130px

            .fly:nth-child(2)
                top 120px
                left -80px

        .login-form
            margin-left $left
            padding 0 40px

        .red
            margin-left 20px
            color $color-error

        .btn
            width 100%

.register
    font-weight 500
    margin-left 20px

.input
    .disabled
        position absolute
        width 100%
        height @width
        top 0
        left 0
        cursor not-allowed
        background rgba(255, 255, 255, .5)
</style>
