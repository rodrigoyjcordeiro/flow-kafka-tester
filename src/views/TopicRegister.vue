<template>
    <div class="q-pa-md">
        <q-table v-model:selected="topicSelected"  class="q-mt-md" title="Tópicos Cadastrados" :rows="topics" :columns="columns" row-key="name" no-data-label="Não há tópicos Cadastrados" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import type { Ref } from 'vue'
import { Notify } from 'quasar'
import FileService from '../utils/file'
import { SCHEMAS_FOLDER } from '../utils/folders'
import vue from '@vitejs/plugin-vue';

interface Topic {
    name: string
    schemas?: []
}


const fileService = new FileService()
const fileName = 'topicos'
var index = ref(-1)
var topics: Array<Topic> = reactive([])
var topic: Topic = reactive(<Topic>{name: "", schemas: []})
const topicSelected: Ref<Array<Topic>> = ref([])

const rules: Array < any > = [ (val: any) => (!!val) || 'Campo obrigatório']
const columns: Array < any > = reactive([{
    name: "name",
    required: true,
    label: 'Nome do Tópico',
    align: 'left',
    field: (row: any) => row.name,
    sortable: true
}])

const saveUpdateBtn = computed < string > (() => {
    if (index.value == -1) 
        return 'Salvar'
    return 'Atualizar'
})

function onSelect(event: any) {

    console.log("evento:",event)
    index.value = topics.map(t => t.name).indexOf(event.keys[0])
    topic = Object.assign({}, topics[index.value])

    console.log(topic.name)
}  

function onSubmit() {
    if(index.value > -1){
        console.log("Atualizacao do ", topicSelected)
    }else{
        console.log("Salvando item")
        topics.push(topic)
        fileService.saveFile(SCHEMAS_FOLDER, fileName, topics)
    
    }

    onReset()
}

function onReset() {
    index.value = -1

}

function notify(message: string, isSuccess: boolean){
    //success = 'green-4'

    Notify.create({
            color: isSuccess ? 'green-4' : 'red-3',
            message,
            textColor: 'white',
            icon: isSuccess? 'cloud_done' : 'warning',
        })
}

function readFile(){
    const file = fileService.readFile(SCHEMAS_FOLDER, fileName)
    console.log("lendo arquivo", file)
    topics.push(...< Topic[] > JSON.parse(file))
    console.log("topicos cadastrados: ", topics)
}

onMounted(() => {
    readFile()
})

</script>

<style lang="sass">

.q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #1565C0
    color: #FFFFFF
</style>