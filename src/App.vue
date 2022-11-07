<template>
  <q-layout view="hHh Lpr lff" container style="height:100vh;" >
    <q-header elevated class="bg-orange-8">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Flow <small>Kafka tester</small></q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      :width="200"
      :breakpoint="500"
      show-if-above
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list>

          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="menuItem.label == $route.name" v-ripple :to="menuItem.to">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page>
        <div class="q-ml-md" >
          <router-view />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref } from 'vue'

const menuList = [
{
icon: 'send',
label: 'Produzir Mensagens',
separator: true,
to: '/'
},
{
icon: 'list',
label: 'Tópicos Cadastrados',
separator: false,
to: '/topic-register'
},
{
icon: 'book',
label: 'Cadastrar Schema',
separator: false,
to: '/schema-register'
},

{
icon: 'settings',
label: 'Configurações',
separator: false,
to: '/test3'

},

{
icon: 'help',
iconColor: 'primary',
label: 'Dúvidas',
separator: false,
to: '/teste4'

}
]

export default {
setup () {
return {
  drawer: ref(true),
  menuList
}
}
}
</script>