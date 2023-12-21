<template>
  <template v-if="user">
    <van-cell title="昵称" to="/user/edit" is-link :value="user.username"
              @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="账号" :value="user.userAccount"/>
    <van-cell title="头像" to="/user/edit" :value="user.avatarUrl">
      <img style="height:48px" :src="user.avatarUrl" alt=""/>
    </van-cell>
    <van-cell title="性别" to="/user/edit" is-link :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="电话" to="/user/edit" is-link :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" to="/user/edit" is-link :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="编号" :value="user.planetCode"/>
    <van-cell title="注册时间" :value="user.createTime"/>
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";


const user = ref();
const router = useRouter();
onMounted(async () => {
  user.value = await getCurrentUser();
})
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      currentValue,
      editName
    }
  })
}

</script>


<style scoped>

</style>