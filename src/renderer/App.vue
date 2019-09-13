<template>
  <div id="app">
    <title-bar />
    <div style="display:flex">
      <side-menu />
      <router-view />
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu';
import TitleBar from './components/TitleBar';

export default {
  name: 'poet',
  components:{
    SideMenu,
    TitleBar,
  },
  mounted(){
    window.store=this.$store;
  }
};
</script>

<style>
*{
  user-select: none;
}
#app{
  height: 100vh;
}
::-webkit-scrollbar{
  display: none;
}
</style>
