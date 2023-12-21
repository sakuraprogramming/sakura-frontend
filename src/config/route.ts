import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import WxLoginPage from "../pages/WxLoginPage.vue";

const routes = [
    {path: "/", title: "樱花交友", component: Index},
    {path: "/team", title: "找队伍", component: Team},
    {path: "/team/add", title: "创建队伍", component: TeamAddPage},
    {path: "/team/update", title: "队伍更新", component: TeamUpdatePage},
    {path: "/user", title: "当前用户", component: UserPage},
    {path: "/search", title: "搜索好友", component: SearchPage},
    {path: "/user/edit", title: "用户信息修改", component: UserEditPage},
    {path: "/user/list", title: "搜索结果", component: SearchResultPage},
    {path: "/user/login", title: "用户登录", component: UserLoginPage},
    {path: "/user/login/wx", title: "微信登录", component: WxLoginPage},
    {path: "/user/update", title: "用户更新", component: UserUpdatePage},
    {path: "/user/team/create", title: "创建的队伍", component: UserTeamCreatePage},
    {path: "/user/team/join", title: "加入的队伍", component: UserTeamJoinPage},
];

export default routes;