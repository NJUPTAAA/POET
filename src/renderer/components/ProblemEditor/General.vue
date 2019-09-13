<template>
  <div class="tab-pane fade show active" id="nav-general" role="tabpanel" aria-labelledby="nav-general-tab">
      <div class="paper-card">
          <div class="form-group">
              <label for="general_standard">Standard</label>
              <input type="text" class="form-control" id="general_standard" v-model="standard"  >
              <!-- <span class="bmd-help">The standard this POEM use.</span> -->
          </div>
          <div class="form-group">
              <label for="general_generator">Generator</label>
              <input type="text" class="form-control" id="general_generator" v-model="generator" >
              <!-- <span class="bmd-help">The generator of this POEM.</span> -->
          </div>
          <div class="form-group">
              <label for="general_url">URL</label>
              <input type="text" class="form-control" id="general_url" v-model="url" >
              <!-- <span class="bmd-help">The url of the generator.</span> -->
          </div>
          <div class="form-group">
              <label for="general_description">Description</label>
              <markdown-editor v-model="description" />
              <!-- <input type="text" class="form-control" id="general_description" v-model="description" > -->
              <!-- <span class="bmd-help">The description of this POEM.</span> -->
          </div>
      </div>
  </div>
</template>

<script>
import MarkdownEditor from '../common/MarkdownEditor';

export default {
  name:'General',
  components:{
    MarkdownEditor
  },
  computed:{
    standard:{
      get(){
        return this.$store.state.Problem.standard;
      },
      set(value){
        this.$store.dispatch('changeState',{key:'standard',value})
      }
    },
    generator:{
      get(){
        return this.$store.state.Problem.generator;
      },
      set(value){
        this.$store.dispatch('changeState',{key:'generator',value})        
      }
    },
    url:{
      get(){
        return this.$store.state.Problem.url;
      },
      set(value){
        this.$store.dispatch('changeState',{key:'url',value})
      }
    },
    description:{ 
      get(){
        return this.$store.state.Problem.description;        
      },
      set(value){
        this.$store.dispatch('changeState',{key:'description',value})
      }
    }
  },
  methods:{
    handleChange(type,value){
      console.log(arguments)
    }
  }
}
</script>


<style>
.paper-card{
  display: block;
  padding: 20px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  /* margin-bottom: 1rem; */
}
.bmd-help {
  display: block !important;
}
.form-group{
  margin-top: 2rem;
  margin-bottom: 2rem !important;
}
.form-group>label{
  margin: 0;
  padding: 0;
}
</style>
