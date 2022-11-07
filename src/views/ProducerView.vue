<template>
    <v-container>
        <v-card-title>
            Produzir Mensagem
        </v-card-title>
        <v-card-subtitle>
            Aqui você consegue produzir mensagens de teste para as aplicações. Para isso, siga os passos abaixo:
        </v-card-subtitle>
        <v-stepper v-model="e1" color="orange darken-2">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1" color="orange darken-2">
                    Schema e Tópico
                    <q-select option-label="name" outlined v-model="topico" :options="topicos" label="Selecione um tópico" />
                    <q-select class="q-mt-md" v-if="topico !== null && topico !== undefined" outlined v-model="schemaName" :options="topico.schemas" label="Selecione um schema" />

                </v-stepper-step>
    
                <v-divider></v-divider>
    
                <v-stepper-step :complete="e1 > 2" step="2" color="orange darken-2">
                    Mensagem
                </v-stepper-step>
    
                <v-divider></v-divider>
    
            </v-stepper-header>
    
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card class="mb-12" height="300px">
                        <v-card-text>
                            <v-row align="center" justify="center" no-gutters>
                                <v-col class="mt-0">
                                    <strong>Selecione o tópico desejado: </strong>
                                    <v-autocomplete class="mt-2" outlined label="Tópicos"></v-autocomplete>
                                </v-col>
                            </v-row>
                            <v-row align="center" justify="center" no-gutters>
                                <v-col class="mt-0">
                                    <strong>Selecione o Schema: </strong>
                                    <v-autocomplete class="mt-2" outlined label="Schemas"></v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-btn color="primary" @click="e1 = 2">
                        Continuar
                    </v-btn>
    
                    <v-btn text>
                        Cancelar
                    </v-btn>
                </v-stepper-content>
    
                <v-stepper-content step="2">
                    <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>
    
                    <v-btn color="primary" @click="e1 = 3">
                        Continuar
                    </v-btn>
    
                    <v-btn text @click="e1 = 1">
                        Voltar
                    </v-btn>
                </v-stepper-content>
    
            </v-stepper-items>
        </v-stepper>
    </v-container>
</template>

<script>
import { onMounted, reactive, ref, computed} from 'vue'
import FileService from '../utils/file'
import { SCHEMAS_FOLDER } from '../utils/folders'

var fileService = new FileService()

export default {
    data() {
        return {
            e1: 1,
            fileName: 'topicos',
            schemaName: "",
            topicos: [] = [],
            topico: {
                name: "",
                schemas:[]
            }
        }
    },

    methods:{
         readFile() {
            const file = fileService.readFile(SCHEMAS_FOLDER, this.fileName)
            console.log("lendo arquivo", file)
            const json = JSON.parse(file)
            this.topicos.push(...json)
            console.log("topicos cadastrados: ", this.topicos)
        }
    },
    created(){
        this.readFile()
    }
}
</script>