<template>
    <h6> Schemas Cadastrados</h6>   
    <q-select option-label="name" outlined v-model="topico" :options="topicos" label="Selecione um tópico" />
    <q-select @update:model-value="value => findSchemas(value)"  class="q-mt-md" v-if="topico !== null && topico !== undefined" outlined v-model="schemaName" :options="topico.schemas" label="Selecione um schema" />
    <q-list bordered class="rounded-borders q-mt-md">
        <q-expansion-item switch-toggle-side expand-separator :label="schemaName">
            <vue-json-pretty :height="800" :data="schema" />
        </q-expansion-item>
    </q-list>
</template>

<script setup lang="ts">


import { onMounted, reactive, ref, computed} from 'vue'
import FileService from '../utils/file'
import { SCHEMAS_FOLDER } from '../utils/folders'
import * as avro from '@avro/types'
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

const fileName = 'topicos'
var topicos: Array < any > = reactive([])
var topico: any = ref(null)
var schemaName: any = ref(null)
var schema: any = ref('')
const fileService = new FileService()


function readFile() {

    const file = fileService.readFile(SCHEMAS_FOLDER, fileName)
    console.log("lendo arquivo", file)
    topicos.push(...JSON.parse(file))
    console.log("topicos cadastrados: ", topicos)
}

function findSchemas(name) {
    console.log("name", name)
    const file = fileService.readAvro(SCHEMAS_FOLDER, name)
    console.log("lendo arquivo", file)
    schema.value = file
}

onMounted(() => {
    readFile()
})
</script>

<style>

</style>