<template>
  <van-nav-bar
      :title="title"
      left-arrow
      @click-right="onClickRight"
      @click-left="onClickLeft"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view/>
  </div>

  <van-tabbar route>
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from "vue-router";
import routes from "../config/route.ts";

const DEFAULT_TITLE = "樱花交友";
const router = useRouter();
const title = ref(DEFAULT_TITLE);

router.beforeEach((to) => {
  const result = routes.find((item) => item.path === to.path);
  if (!result?.title) {
    title.value = DEFAULT_TITLE;
  }
  // @ts-ignore
  title.value = result?.title;
})

const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push("/search");
};

</script>
<style scoped>
#content {
  padding-bottom: 50px;
}
</style>