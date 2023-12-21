<template>
  <div>
    <button @click="getQrCode" style="width: 100px;height: 50px;">生成微信二维码</button>
    <img :src="qrCodeImg" v-show="isShow" id="qrCodeImgId" style="width: 300px; height: 300px"/>
  </div>
</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {useRouter} from "vue-router";
import {showFailToast} from "vant";

const qrCodeImg = ref<string>();
const isShow = ref<boolean>(false);
const router = useRouter();
let socket = {};
const path = "ws://localhost:8080/api/websocket/123";
const open = () => {
  console.log("socket 连接建立成功")
}
const error = () => {

}
const getMessage = async (msg) => {
  console.log(msg)
  if (msg?.data) {
    let temp = msg.data;
    if (temp.charAt(0) == '@') {
      const list = temp.split(",");
      const userAccount = list[1];
      const userPassword = list[2];
      const res = await myAxios.post("/user/login", {
        userAccount,
        userPassword
      });
      if (res.code == 0) {
        router.replace("/");
      } else {
        showFailToast("请重新刷新二维码");
      }
    }
  }
}
// const close = () => {
//
// }
const initWebsocket = () => {
  if (typeof (WebSocket) === "undefined") {
    alert("您的浏览器不支持socket")
  } else {
    // 实例化socket
    socket = new WebSocket(path)
    // 监听socket连接
    socket.onopen = open;
    // 监听socket错误信息
    socket.onerror = error;
    // 监听socket消息
    socket.onmessage = getMessage;
  }
}

onMounted(() => {
  initWebsocket();
})
const getQrCode = async () => {
  const res = await myAxios.get('qrCodeFirstLogin/getQrCode');
  console.log(res);
  if (res.data) {
    qrCodeImg.value = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + res.data?.ticket;
    isShow.value = true;
  }
}
</script>


<style scoped>

</style>