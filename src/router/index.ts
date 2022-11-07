import { createWebHistory, createRouter } from "vue-router";
import ProducerView from "../views/Producer.vue";
import TopicRegisterView from "../views/TopicRegister.vue";
import SchemaRegisterView from "../views/SchemaRegister.vue";


const routes = [
  {
    path: "/",
    name: "Produzir Mensagens",
    component: ProducerView,
  },
  {
    path: "/topic-register",
    name: "Tópicos Cadastrados",
    component: TopicRegisterView
  },
  {
    path: "/schema-register",
    name: "Cadastrar Schema",
    component: SchemaRegisterView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;