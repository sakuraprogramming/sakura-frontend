<template>
  <div id="teamCardList">
    <van-card v-for="team in props.teamList"
              :title="team?.name"
              :thumb="sakura"
    >
      <template #desc>
        <div>
          {{ team?.description }}
        </div>
      </template>
      <template #tags>
        <van-tag plain type="primary" style="margin-left: 8px;margin-top: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数：${team.hasJoinNum}/${team.maxNum}` }}
        </div>
        <div v-if="team.expireTime">
          过期时间：{{ team.expireTime }}}
        </div>
        <div>
          创建时间：{{ team.createTime }}}
        </div>
      </template>
      <template #footer>
        <van-button v-if="team.userId!==currentUser?.id && !team.hasJoin" size="small" plain type="primary"
                    @click="preJoinTeam(team)">
          加入队伍
        </van-button>
        <van-button v-if="team.userId==currentUser?.id" size="small" plain type="primary"
                    @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
        <van-button v-if="team.hasJoin && team.userId!==currentUser?.id" size="small" plain type="primary"
                    @click="doQuitTeam(team.id)">退出队伍
        </van-button>
        <van-button v-if="team.userId==currentUser?.id" size="small" plain type="danger"
                    @click="doDeleteTeam(team.id)">解散队伍
        </van-button>
      </template>
    </van-card>
    <van-empty v-if="!props.teamList || props.teamList.length<1" description="数据为空"/>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @cancel="doCancel"
                @confirm="doJoinTeam">
      <van-field type="password" v-model="password" placeholder="请输入密码"></van-field>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">


import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import sakura from "../assets/logo.jpg";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList: TeamType[]
}

const props = defineProps<TeamCardListProps>();
const router = useRouter();
const showPasswordDialog = ref(false);
const password = ref("");
const joinTeamId = ref();

const currentUser = ref({});
onMounted(async () => {
  currentUser.value = await getCurrentUser();
});

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam();
  } else {
    showPasswordDialog.value = true;
  }
}
const doCancel = () => {
  password.value = "";
  joinTeamId.value = 0;
}

const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post("/team/join", {
    teamId: joinTeamId.value,
    password: password.value
  });
  if (res?.code == 0) {
    showSuccessToast("加入成功");
    doCancel();
    console.log("成功");
  } else {
    showFailToast("操作失败");
    console.log("失败");
  }
}

const doUpdateTeam = (id: number) => {
  router.push({
    path: "/team/update",
    query: {
      id
    }
  })
}

const doQuitTeam = async (id: number) => {
  const res = await myAxios.post("/team/quit", {
    teamId: id
  });
  if (res?.code == 0) {
    showSuccessToast("操作成功");
    console.log("成功");
  } else {
    showFailToast("操作失败");
    console.log("失败");
  }
}

const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post("/team/delete", {
    teamId: id
  });
  if (res?.code == 0) {
    showSuccessToast("操作成功");
  } else {
    showFailToast("操作失败");
  }
}


</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}


</style>