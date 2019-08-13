<template>
  <div class="titlebar titlebar-light draggable">
        <div class="titlebar-drag-region"></div>
        <div class="titlebar-title">POET - POEM Editor Transplatform version</div>
        <div class="titlebar-controls">
            <div class="titlebar-minimize" @click="changeWindowState('minimize')">
                <svg x="0px" y="0px" viewBox="0 0 10 1">
                    <rect fill="#000000" width="10" height="1"></rect>
                </svg>
            </div>
            <div class="titlebar-resize" @click="changeWindowState('resize')">
                <svg class="fullscreen-svg" x="0px" y="0px" viewBox="0 0 10 10">
                    <path fill="#000000" d="M 0 0 L 0 10 L 10 10 L 10 0 L 0 0 z M 1 1 L 9 1 L 9 9 L 1 9 L 1 1 z ">
                    </path>
                </svg>
                <svg class="maximize-svg" x="0px" y="0px" viewBox="0 0 10 10">
                    <mask id="Mask">
                        <rect fill="#FFFFFF" width="10" height="10" style="fill:#fff;"></rect>
                        <path fill="#000000" d="M 3 1 L 9 1 L 9 7 L 8 7 L 8 2 L 3 2 L 3 1 z"></path>
                        <path fill="#000000" d="M 1 3 L 7 3 L 7 9 L 1 9 L 1 3 z"></path>
                    </mask>
                    <path fill="#000000" d="M 2 0 L 10 0 L 10 8 L 8 8 L 8 10 L 0 10 L 0 2 L 2 2 L 2 0 z"
                        mask="url(#Mask)"></path>
                </svg>
            </div>
            <div class="titlebar-close" @click="changeWindowState('close')">
                <svg x="0px" y="0px" viewBox="0 0 10 10">
                    <polygon fill="#000000" points="10,1 9,0 5,4 1,0 0,1 4,5 0,9 1,10 5,6 9,10 10,9 6,5"></polygon>
                </svg>
            </div>
        </div>
        <div class="titlebar-resizer"></div>
    </div>
</template>
<script>
import {ipcRenderer} from 'electron';

export default {
  name:"TitleBar",
  methods:{
    changeWindowState(e){
      ipcRenderer.send('windowStatus', e);
    }
  }
}
</script>
<style>
.titlebar {
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 9;
  height: 32px;
  padding: 0;
  background-color: rgb(232, 232, 232);
  flex-shrink: 0;
  flex-grow: 0;
}

.titlebar svg {
  fill: rgb(109, 109, 110);
}

.titlebar.draggable {
  /* -webkit-app-region: drag; */
}

.titlebar-title {
  color: #707070;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
  line-height: 32px;
  font-size: 12px;
  padding-left: 16px;
  padding-right: 16px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe WPC, Segoe UI, HelveticaNeue-Light, Noto Sans, Microsoft YaHei, PingFang SC, Hiragino Sans GB, Source Han Sans SC, Source Han Sans CN, Source Han Sans, sans-serif;
}

.titlebar-controls {
  flex-grow: 0;
  flex-shrink: 0;
  text-align: left;
}

.titlebar:after,
.titlebar-controls:after {
  content: ' ';
  display: table;
  clear: both;
}

.titlebar-minimize,
.titlebar-resize,
.titlebar-close {
  float: left;
  width: 45px;
  height: 32px;
  margin: 0;
  text-align: center;
  line-height: 30px;

  -webkit-transition: background-color .2s;
  -moz-transition: background-color .2s;
  -ms-transition: background-color .2s;
  -o-transition: background-color .2s;
  transition: background-color .2s;
}

.titlebar.draggable .titlebar-minimize,
.titlebar.draggable .titlebar-resize,
.titlebar.draggable .titlebar-close {
  -webkit-app-region: no-drag;
}

.titlebar-minimize svg,
.titlebar-resize svg.maximize-svg,
.titlebar-resize svg.fullscreen-svg,
.titlebar-close svg {
  width: 10px;
  height: 10px;
  shape-rendering: crispEdges;
}

.titlebar-close svg polygon {
  -webkit-transition: fill .2s;
  -moz-transition: fill .2s;
  -ms-transition: fill .2s;
  -o-transition: fill .2s;
  transition: fill .2s;
}

.titlebar:not(.fullscreen) svg.maximize-svg {
  display: none;
}

.titlebar.fullscreen svg.fullscreen-svg {
  display: none;
}

.titlebar-minimize:hover,
.titlebar-resize:hover,
.titlebar-fullscreen:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.titlebar-light .titlebar-minimize:hover,
.titlebar-light .titlebar-resize:hover,
.titlebar-light .titlebar-fullscreen:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.titlebar-close:hover {
  background-color: rgba(232, 17, 35, 0.9);
}

.titlebar-close:hover svg polygon {
  fill: rgba(255, 255, 255, 1);
}

.titlebar-light .titlebar-close:hover {
  fill: rgba(0, 0, 0, 1);
}

.titlebar-light svg polygon,
.titlebar-light svg rect,
.titlebar-light svg>path {
  fill: inherit;
}

.titlebar-light .titlebar-close:hover {
  background-color: rgba(232, 17, 35, 0.9);
}
.titlebar-drag-region {
  top: 0;
  left: 0;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  -webkit-app-region: drag;
}

.titlebar-resizer {
  -webkit-app-region: no-drag;
  position: absolute;
  top: 0;
  width: 100%;
  height: 20%;
}
</style>
