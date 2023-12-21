<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="updateTeamData.name"
          name="name"
          label="队伍名称"
          placeholder="请输入队伍名称"
          :rules="[{ required: true, message: '请填写队伍名称' }]"
      />
      <van-field
          v-model="updateTeamData.description"
          rows="1"
          autosize
          label="队伍描述"
          type="textarea"
          placeholder="请输入队伍描述"
      />
      <van-field
          v-model="updateTeamData.expireTime"
          is-link
          readonly
          name="datePicker"
          label="过期时间"
          placeholder="点击选择过期时间"
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" :min-date="minDate"/>
      </van-popup>
      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="updateTeamData.status" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
          v-if="Number(updateTeamData.status) === 2"
          v-model="updateTeamData.password"
          name="password"
          label="密码"
          placeholder="请输入队伍密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {useRoute, useRouter} from "vue-router";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
const route = useRoute();
const minDate = new Date();

const updateTeamData = ref({});

const showPicker = ref(false);

onMounted(async () => {
  const {id} = route.query;
  if (id <= 0) {
    showFailToast("加载数据失败");
    return;
  }
  const res = await myAxios.get("/team/get", {
    params: {
      id
    }
  });
  if (res?.code == 0) {
    updateTeamData.value = res.data;
  } else {
    showFailToast("数据获取失败");
  }
})

const onConfirm = ({selectedValues}) => {
  updateTeamData.value.expireTime = selectedValues.join('/');
  showPicker.value = false;
}
const onSubmit = async () => {
  const postData = {
    ...updateTeamData.value,
    status: Number(updateTeamData.value.status),
    expireTime: new Date(updateTeamData.value.expireTime)
  }
  const res = await myAxios.post("/team/update", postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast("更新成功");
    router.push({
      path: "/team",
      replace: true
    });
  } else {
    showFailToast("更新失败");
  }

}

</script>

<style scoped>

</style>