<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchModel"/>
    </template>
  </van-cell>
  <UserCardList :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length<1" description="数据为空"/>
</template>

<script setup lang="ts">
import {ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.ts";
import UserCardList from "../components/UserCardList.vue";


const userList = ref([]);
const isMatchModel = ref<boolean>(false);
const loading = ref(true);

// onMounted(async () => {
//   await loadData();
// })

const loadData = async () => {
  let userListData;
  loading.value = true;
  if (isMatchModel.value) {
    const num = 5;
    userListData = await myAxios.get('/user/match', {
      params: {
        num
      }
    })
        .then(function (response) {
          return response?.data;
        })
        .catch(function (error) {
          console.log('/user/search/tags error', error);
        })
  } else {
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1
      }
    })
        .then(function (response) {
          return response?.data?.records;
        })
        .catch(function (error) {
          console.log('/user/search/tags error', error);
        })
  }

  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}


watchEffect(() => {
  loadData();
})

</script>

<style scoped>

</style>