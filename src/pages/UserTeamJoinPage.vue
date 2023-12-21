<template>
  <div id="teamPage">
    <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        input-align="center"
        @search="onSearch"
    />
    <TeamCardList :teamList="teamList"/>
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


const listTeam = async (val = "") => {
  const res = await myAxios.get("/team/list/my/join", {
    params: {
      searchText: val,
    }
  });
  if (res?.code == 0) {
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