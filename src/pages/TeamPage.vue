<template>
  <div id="teamPage">
    <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        input-align="center"
        @search="onSearch"
    />
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="private"/>
    </van-tabs>
    <div style="margin-bottom: 16px"></div>
    <van-button class="add-button" icon="plus" type="primary" @click="doJoinTeam"></van-button>
    <TeamCardList :teamList="teamList"/>
    <van-empty v-if="teamList?.length<1" description="数据为空"/>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";

const router = useRouter();
const teamList = ref([]);
const searchText = ref("");
const active = ref("public");

const onTabChange = (name:any) => {
  if (name === "public") {
    listTeam(searchText.value, 0);
  } else {
    listTeam(searchText.value, 2);
  }
}

const listTeam = async (val = "", status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      status
    }
  });
  if (res?.code == 0) {
    console.log("aaa");
    console.log(res.data);
    teamList.value = res.data;
  } else {
    showFailToast("加载数据失败，请刷新重试");
  }
}


// 页面加载时触发一次

onMounted(() => {
  listTeam();
})
const onSearch = (val = "") => {
  listTeam(val);
}

const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  })
}

</script>


<style scoped>

</style>