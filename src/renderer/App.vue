<template>
  <div id="app">
    <title-bar />
    <side-menu />
  </div>
</template>

<script>
import SideMenu from './views/SideMenu';
import TitleBar from './views/TitleBar';

export default {
  name: 'poet',
  components:{
    SideMenu,
    TitleBar
  }
};
</script>

<style>
  /* CSS */
</style>
