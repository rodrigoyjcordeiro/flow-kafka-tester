<template>
    <q-form>
      <h6>{{schema.name}}</h6>
      <div  class="q-mt-md q-mb-md" v-for="(field, i) in fields" :key="i">
        <q-select filled v-if="field.type == 'enum' || field.type.type == 'enum'" v-model="objMessage[field.name]"  :options="field.type.symbols" :label="field.name" />
        <q-input v-model="objMessage[field.name]"  v-else-if="field.type == 'string'" filled  :label="field.name" />
        <div v-else-if="field.type == 'record' || field.type.type == 'record'">  
          <div v-for="(subfield,i) in field.type.fields" :key="i">
            <q-select  filled  v-if="subfield.type == 'enum' || subfield.type.type == 'enum'" v-model="objMessage[field.name][subfield.name]" :options="subfield.comment" :label="field.name" />
            <q-input  v-else-if="subfield.type == 'string' " v-model="objMessage[field.name][subfield.name]" filled :label="field.name" />
          </div>
        </div>
      </div>
    </q-form>
</template>

<script>

export default {
  props:['schema', 'topic', 'message'],
  data(){
    return{
      fields: {},
      objMessage: {}
    }
  },  
  methods:{
    load(){
      this.fields = this.schema.fields
      this.objMessage = this.message.data
      console.log("########## SCHEMA ############", this.schema)
      console.log("########## FIELDS ############", this.fields)
      console.log("########## MESSAGE ###########", this.objMessage)
      console.log(this.fields[0].name)
    }
  },

  created(){
    this.load()
  }
}

</script>

<style>

</style>