<template>
  <div class="tab-pane" id="nav-advanced" role="tabpanel" aria-labelledby="nav-advanced-tab">
      <p>HTML Override</p>
      <div class="radio">
          <label>
          </label>
              <input type="radio" name="defaultDisplay" id="forceHTMLRadio" value="0" checked>
              No Override (Default)
      </div>
      <div class="radio">
          <label>
          </label>
              <input type="radio" name="defaultDisplay" id="forceHTMLRadio" value="1">
              Declear this problem uses raw & purified HTML (NOT Recommend)
      </div>
  </div>
</template>

<script>
export default {
  name:"Advanced",
  computed:{
    isOverride:{
      get(){
        return this.$store.state.Problem.isOverride;
      },
      set(value){
        this.$store.dispatch('changeState',{key:'isOverride',value})
      }
    }
  }
}
</script>


<style>
.tab-pane{
    display: block !important;
    opacity: 1 !important;
}
</style>
