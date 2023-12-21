<template>
  <UserCardList :user-list="userList"/>
  <van-empty v-if="!userList || userList.length<1" description="暂无符合要求的用户"/>

</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import qs from 'qs'
import myAxios from "../plugins/myAxios.ts";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const {tags} = route.query;
const userList = ref([]);

onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
      .then(function (response) {
        // 处理成功情况
        console.log('/user/search/tags success', response);
        showSuccessToast("请求成功");
        return response?.data;
      })
      .catch(function (error) {
        // 处理错误情况
        console.log('/user/search/tags error', error);
        showFailToast("请求失败");
      })
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})


const fakeUser = {
  id: 1,
  username: "sakura",
  userAccount: "sakura",
  avatarUrl: "https://img1.imgtp.com/2023/10/03/9UN0GkdU.jpg",
  gender: 0,
  phone: "123456798",
  email: "211545455@163.com",
  userStatus: 0,
  tags: ["java", "emo"],
  profile: "平平无奇,啊咋咋咋咋咋咋咋咋咋咋咋咋咋咋咋咋咋咋咋aaaaaa",
  createTime: new Date()
}


</script>

<style scoped>

</style>