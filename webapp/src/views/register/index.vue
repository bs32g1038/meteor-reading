
<template>
    <div class="login-wrap app" id="app">
        <header class="header" @click="$router.push('/')">
            <h2>星点阅读注册</h2>
            <p>Welcome to xingdian</p>
        </header>
        <div class="account-login-wrap">
            <div class="login-form">
                <van-cell-group>
                    <van-field type="password" style="position: absolute;z-index: 0;"/>
                    <van-field
                        v-model="account"
                        required
                        clearable
                        label="用户名"
                        right-icon="question-o"
                        left-icon="contact"
                        placeholder="请输入用户名"
                        @click-right-icon="$toast('目前仅支持邮箱登录')"
                    />
                    <van-field
                        v-model="password"
                        type="password"
                        label="密码"
                        left-icon="bag-o"
                        placeholder="请输入密码"
                        required
                    />
                    <van-field
                        v-model="retypePassword"
                        type="password"
                        label="确认密码"
                        left-icon="bag-o"
                        placeholder="请再次输入密码"
                        required
                    />
                    <van-field
                        v-model="sms"
                        center
                        clearable
                        label="验证码"
                        placeholder="请输入图片验证码"
                        left-icon="photo-o"
                        @change="verifyCaptcha"
                    >
                        <img
                            style="width: 1rem;height: 0.44rem;"
                            slot="button"
                            :src="captcha"
                            alt
                            @click="getCaptcha"
                        >
                    </van-field>
                </van-cell-group>
            </div>
            <div class="reg-wrap">
                <router-link to="/login">用户登录</router-link>
            </div>
            <div class="btn-wrap">
                <button class="login-button" type="button" @click="register">点击注册</button>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/user';
import captchaApi from '@/api/captcha';
import { CellGroup, Field, Toast } from 'vant';

export default {
    components: {
        VanCellGroup: CellGroup,
        VanField: Field
    },
    data() {
        return {
            account: '',
            password: '',
            retypePassword: '',
            sms: '',
            captcha: '/v1/api/captcha',
            captchaId: ''
        };
    },
    methods: {
        register() {
            if (!this.account) {
                return Toast('请输入邮箱账号');
            } else if (!this.password) {
                return Toast('请输入密码');
            } else if (this.password !== this.retypePassword) {
                return Toast('两次输入密码不一样！');
            }
            api.register({
                email: this.account,
                password: this.password
            }).then(res => {
                if (res.data.code === 20000) {
                    Toast('注册账号成功！');
                    return this.$router.push('/login');
                } else {
                    Toast('账号已存在！');
                }
            });
        },
        getCaptcha() {
            // captchaApi.getCaptcha().then(res => {
            //     this.captcha = res.data.data.captcha
            //     this.captchaId = res.data.data.captchaId
            // })
            this.captcha = this.captcha + '?' + new Date().getTime();
        },
        verifyCaptcha() {
            captchaApi.verifyCaptcha(this.captchaId, this.sms).then(res => {
                console.log(res.data);
            });
        }
    },
    mounted() {
        this.getCaptcha();
    }
};
</script>

<style lang="scss" scoped>
.login-wrap {
    background-color: #fff;
    height: 100%;
}

.header {
    padding: 0.36rem 0.4rem;
    margin-bottom: 0.2rem;
    h2,
    p {
        margin: 10px 5px 5px;
        font-size: 12px;
    }
    h2 {
        font-size: 14px;
    }
}

.login-bg {
    background-size: cover;
    width: 100%;
}

.account-login-wrap {
    border-radius: 5px 5px 0 0;
    background-color: #fff;
    position: relative;
    z-index: 100;
    margin-top: -0.4rem;
    padding-top: 0.6rem;
}

.login-form {
    padding: 0 0.64rem;
    margin-bottom: 0.4rem;
    /deep/ .van-field__label {
        max-width: 70px;
    }
    /deep/ .van-field__control:-webkit-autofill {
        box-shadow: inset 0 0 0 1000px #fff;
    }
}

.reg-wrap {
    display: flex;
    justify-content: flex-end;
    padding: 0 0.64rem;
    margin-bottom: 0.4rem;
    a {
        color: #0091de;
        font-size: 13px;
    }
}

.btn-wrap {
    padding: 0.6rem 0.64rem;
    .login-button {
        color: #fff;
        border: none;
        width: 100%;
        height: 0.74rem;
        border-radius: 0.5rem;
        line-height: 0.74rem;
        font-size: 14px;
        background: #ee434c;
        background: linear-gradient(to right, #ee434c, #f14b4e);
        opacity: 0.7;
    }
}
</style>
