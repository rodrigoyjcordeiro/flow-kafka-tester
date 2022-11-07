<template>
    <div class="q-pa-sm">
        <q-stepper v-model="step" ref="stepper" color="primary" animated>
            <q-step :name="1" title="Topico" icon="settings" :done="step > 1">
                Schema e Tópico
                <q-select option-label="name" outlined v-model="topico" :options="topicos" label="Selecione um tópico" />
                <q-select class="q-mt-md" v-if="topico !== null && topico !== undefined" outlined v-model="schemaName" :options="topico.schemas" label="Selecione um schema" />
            </q-step>
            <q-step :name="2" title="Mensagem" icon="message" :done="step > 2">
                <GenericFormVue :topic="'topico'" :schema="fields" :message="message" />
            </q-step>
            <template v-slot:navigation>
              <q-stepper-navigation>
                <q-btn @click="next()" color="primary" :label="step === 2 ? 'Enviar' : 'Próximo'" />
                <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Voltar" class="q-ml-sm" />
              </q-stepper-navigation>
              </template>
      </q-stepper>
    </div>
  </template>

<script>
import FileService from '../utils/file'
import { SCHEMAS_FOLDER } from '../utils/folders'
import * as avro from 'avro-js'
import GenericFormVue from '../components/GenericForm.vue'

export default {
    components:{
      GenericFormVue
    },
    data() {
        return {
            step: 1,
            fileName: 'topicos',
            topicos: [],
            topico: null,
            schemaName: '',
            schema: {},
            jsonSchema: {},
            fields: {},
            message: {},
            fileService: new FileService()
        }
    },
    methods: {
        findSchemas() {
            const file = this.fileService.readAvro(SCHEMAS_FOLDER, this.schemaName)
            this.jsonSchema = JSON.parse(file)
            this.fields = this.jsonSchema.fields[0].type
            console.log('fields', this.fields)
            console.log("lendo arquivo", avro.parse(file))
            this.schema = avro.parse(file)

            this.message = this.schema.random()
            console.log("valores aleatórios", this.message)


        },

        next(){
          if(this.step < 2)
            this.$refs.stepper.next()
          
          this.findSchemas()
          //caso contrário enviar
        },  

        readFile() {
            const file = this.fileService.readFile(SCHEMAS_FOLDER, this.fileName)
            console.log("lendo arquivo", file)
            this.topicos.push(...JSON.parse(file))
            console.log("topicos cadastrados: ", this.topicos)
        }

    },

    created() {
        this.readFile()
    }
}
</script>