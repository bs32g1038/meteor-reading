
<template>
    <div class="login-wrap app" id="app">
        <header class="header" @click="$router.push('/')">
            <h2>星点阅读登录</h2>
            <p>Welcome to xingdian</p>
        </header>
        <div class="account-login-wrap">
            <div class="login-form">
                <van-cell-group>
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
                </van-cell-group>
            </div>
            <div class="reg-wrap">
                <a href="javascript:;">忘记密码</a>
                <router-link to="/register">用户注册</router-link>
            </div>
            <div class="btn-wrap">
                <van-button class="login-button" type="default" @click="login">登录</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/user';
import config from '@/config';
import { Toast, Field, CellGroup, Button } from 'vant';

export default {
    components: {
        VanField: Field,
        VanCellGroup: CellGroup,
        VanButton: Button
    },
    data() {
        return {
            account: '',
            password: ''
        };
    },
    methods: {
        login() {
            if (!this.account) {
                return Toast('请输入邮箱账号');
            } else if (!this.password) {
                return Toast('请输入密码');
            }
            api.login({
                email: this.account,
                password: this.password
            })
                .then(res => {
                    const data = res.data;
                    if (data.code === 20000) {
                        Toast('登陆成功！');
                        try {
                            window.localStorage.setItem(
                                config.tokenKey,
                                JSON.stringify({
                                    expire: data.data.expire,
                                    id: data.data.id
                                })
                            );
                        } catch (error) {
                            Toast(error);
                        }
                        return this.$router.push('/');
                    } else {
                        Toast(data.message);
                    }
                })
                .catch(error => {
                    Toast(error.response.data.message);
                });
        }
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
    border-radius: 10px 10px 0 0;
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
    justify-content: space-between;
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
