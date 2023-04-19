import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView, name: "home" },
    {
      path: "/session",
      component: () => import("../views/SessionView.vue"),
      children: [
        { path: "/session", components:{
          default: () => import("../views/LoginView.vue"),
          register: () => import("../views/RegisterView.vue")
        }}
      ],
      name: "session",
    },
    {
      path: "/about",
      component: () => import("../views/AboutView.vue"),
      name: "about",
    },
    {
      path: "/chats",
      component: () => import("../views/ChatsView.vue"),
      children: [
        {
          path: ":chatId",
          component: () => import("../views/ChatView.vue"),
        },
      ],
    },
  ],
});

export default router