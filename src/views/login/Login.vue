<template>
  <div class="login">
    <div class="main">
      <div class="logoContainer">
        <div class="name">文件管理平台</div>
      </div>
      <div
          class="mainBox"
          :class="activeName == 'log' ? '' : 'mainBoxRegistered'"
      >
        <el-tabs
            v-model="activeName"
            type="card"




            @tab-click="handleClick"
            stretch
        >
          <el-tab-pane label="登录" name="log">
            <div class="loginInput">
              <el-form ref="form" :model="login" label-width="80px">
                <el-form-item>
                  <el-input
                      v-model="login.mobile"
                      placeholder="请输入手机号码"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input
                      v-model="login.password"
                      type="password"
                      placeholder="请输入密码"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="注册" name="reg">
            <div class="registeredInput">
              <el-form ref="form" :model="login" label-width="80px">
                <el-form-item>
                  <el-input
                      v-model="registered.nickname"
                      placeholder="请输入昵称"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input
                      v-model="registered.mobile"
                      placeholder="请输入手机号码"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input
                      v-model="registered.password"
                      placeholder="请输入密码"
                      type="password"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input
                      v-model="registered.password"
                      placeholder="请再次输入密码"
                      type="password"
                  ></el-input>
                </el-form-item>


                <el-form-item>
                  <el-button type="primary" @click="clickRegistered"
                  >注册
                  </el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "Login",
  data() {
    return {
      login: {
        mobile: "",
        password: "",
      },
      registered: {
        mobile: "",
        password: "",
        code: "123",
        nickname: "",
        avatar: null,
      },
      activeName: "log",

    };
  },
  methods: {
    // 点击登录发送请求
    async onSubmit() {
      let res = await this.$request(
          "/educenter/member/login",
          this.login,
          "post",
          "params"
      );
      console.log(res);
      if (res.status == 200 && res.data.success) {

        this.$store.commit("updateUserInfo", res.data.data.mem);

        // 将返回的用户信息保存至localstorage中
        window.localStorage.setItem(
            "userInfo",
            JSON.stringify(res.data.data.mem)
        );


        window.localStorage.setItem("token", res.data.data.token);

        //   跳转至主界面
        this.$router.push("/index");
      } else if (res.status == 200 && !res.data.success) {
        this.$message.warning("账号或密码错误!");
      }
    },

    handleClick(e) {
      console.log(e.name);
    },

    // 获取验证码
    async getCode() {
      this.isCountDownShow = true;
      let res = await this.$request(
          `/edumsm/msm/send/${this.registered.mobile}`
      );
      console.log(res);
      if (res.data.success) {
        this.startCountDown();
      }
    },


    // 点击注册的回调
    async clickRegistered() {
      let res = await this.$request(
          "/educenter/member/register",
          this.registered,
          "post",
          "params"
      );
      console.log(res);
      // 如果注册成功，清空所有数据并跳转至登录界面，自动填写手机号码
      if (res.data.success) {
        this.$message.success("注册成功!");
        this.login.mobile = this.registered.mobile;
        this.activeName = "log";
        this.registered = {
          mobile: "",
          password: "",
          code: "123",
          nickname: "",
          avatar: null,
        };
      } else {
        this.$message.error("注册失败,请稍后重试!");
      }
    },
  },
};
</script>

<style scoped>
.login {
  background-color: #D0DFE6;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main {

  height: 400px;
  margin-bottom: 200px;
}

.logoContainer {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: center;
}

.logo {
  width: 50px;
}

.logo img {
  width: 100%;
}

.name {
  color: #25262b;
  font-size: 25px;
  letter-spacing: 4px;
  font-weight: bold;
  margin-left: 7px;
}


.mainBox {
  margin-top: 25px;
  width: 600px;
  background-color: #fff;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
}

.mainBoxRegistered {
  height: 430px;
}

.el-form /deep/ .el-form-item__content {
  margin: 0 !important;
  padding: 0 20px;
}

.el-input /deep/ input {
  border-radius: 10px;
}

.loginInput {
  margin-top: 20px;
}

.el-tabs /deep/ .is-active,
.el-tabs /deep/ div:hover {
  color: #158BB8;
}

.el-tabs /deep/ .is-active {
  background-color: #fff;
}

.el-tabs /deep/ .el-tabs__item {
  border: none !important;
  font-size: 18px;
  height: 50px;
  line-height: 50px;
}

.el-tabs /deep/ .el-tabs__nav {
  border: none;
}

.el-tabs /deep/ .el-tabs__nav-scroll {
  background-color: #f5f5f6;
}

.el-input /deep/ .el-input__inner {
  height: 48px;
  font-size: 15px;
}


.el-button {
  width: 100%;
  background-color: #66A9C9;
  border: none;
  border-radius: 10px;
  margin-top: 10px;
  height: 45px;
  font-size: 15px;
}

.el-button:hover {
  background-color: #2F90B9;
}

.codeContainer {
  position: relative;
}

.codeButtonContainer {
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
}
</style>
