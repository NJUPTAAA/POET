<template>
  <div class="side-bar animated fadeInLeft">
      <div class="logo-container">POET</div>
      <div>
          <div class="menu-item"><i class="MDI plus-circle"></i> New</div>
          <div class="menu-item" @click="handleOpen"><i class="MDI open-in-new"></i> Open</div>
          <div class="menu-item" :disabled="disabled.save" ><i class="MDI content-save"></i> Save</div>
          <div class="menu-item" :disabled="disabled.save" ><i class="MDI content-save-all"></i> Save as</div>
      </div>
      <div>
          <div class="menu-item" :disabled="disabled.export" ><i class="MDI export"></i> Export as Poetry</div>
          <div class="menu-item" :disabled="disabled.publish"><i class="MDI package-up"></i> Publish Wizard</div>
      </div>
      <div>
          <div class="menu-item"><i class="MDI settings"></i> Settings</div>
          <div class="menu-item"><i class="MDI information"></i> About</div>
      </div>
  </div>
</template>
<script>

import {ipcRenderer} from 'electron';

export default {
  name:'SideMenu',
  data(){
    return{
      disabled:{
        save:true,
        export:true,
        publish:true
      }
    }
  },
  methods:{
    handleOpen(){
      ipcRenderer.send('parse');
      ipcRenderer.on("parseComplete", (event, message) => {
        this.$store.dispatch('changeState',message);
        this.$router.push({name:'problemEditor'});
        this.disabled.save = false;
      });
    },
    handleSave(){
      
    }
  }
}
</script>
<style>
.logo-container {
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  line-height: 1;
  font-family: Raleway;
  color: rgba(0, 0, 0, 0.63);
  letter-spacing: 1rem;
}
.side-bar {
  padding-top: 20px;
  display: block;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 30px;
  border-radius: 0;
  transition: .2s ease-out .0s;
  color: #7a8e97;
  background: #fff;
  /* background: #f1f3f4; */
  /* padding: 1rem; */
  position: relative;
  border-right: 1px solid rgba(0, 0, 0, 0.15);
  /* margin-bottom: 2rem; */
  max-width: 100%;
  width: 25rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  user-select: none;
  height: 100vh;
}
.side-bar:hover {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 40px;
}
.side-bar div {
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 0.5rem 0;
  padding-left: 10px;
}
.side-bar div:last-of-type {
  border-bottom: none;
}
.menu-item {
  display: flex;
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.63);
  align-items: center;
  cursor: pointer;
}

.menu-item i {
  display: inline-block;
  transform: scale(1.5);
  color: rgba(0, 0, 0, 0.63);
  padding-right:0.5rem;
  line-height: 1;
}

.menu-item[disabled] {
  opacity: 0.5;
  cursor: default;
}
</style>