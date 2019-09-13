<template>
  <div class="problemEditor">
    <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist" style="flex-shrink:0;flex-grow:0;">
            <a
              v-for="(item,index) in tabs"
              :key="index"
              class="nav-item nav-link"
              :class="{active:item.isSelected}"
              :id="item.id"
              data-toggle="tab"
              :href="item.href"
              role="tab"
              :aria-controls="item.controls"
              :aria-selected="item.isSelected"
              @click="handleClick(index)"
            >{{item.text}}</a>
        </div>
    </nav>
    <component
      :is="currentPane"
    />
  </div>
</template>
<style>
.problemEditor{
  margin-top: 32px;
  width: 58%;
  margin-left: auto;
  margin-right: auto;
  overflow: scroll;
  height: calc(100vh - 40px);
  /* height: 100vh; */
}
.nav-pills .nav-link, .nav-tabs .nav-link{
  margin: 1.4286em .8575em !important;
  padding: 0.3rem 0.3rem !important;
}
</style>

<script>
import General from '../components/ProblemEditor/General'
import Problem from '../components/ProblemEditor/Problem'
import Advanced from '../components/ProblemEditor/Advanced'

export default {
  name:'ProblemEditor',
  components:{
    General,
    Problem,
    Advanced
  },
  computed:{
    currentPane(){
      for(const tab of this.tabs){
        if(tab.isSelected){
          return tab.components;
        }
      }
    }
  },
  methods:{
    handleClick(index){
      this.tabs.forEach(item => item.isSelected = false);
      this.tabs[index].isSelected = true;
    }
  },
  data(){
    return{
      data:{
        general:{
          standard:undefined,
          generator:undefined,
          url:undefined,
          description:undefined
        },
        problem:{
          list:[],
          new:{
            title:undefined,
            type:undefined
          }
        },
        advanced:{
          isOverride:undefined
        }
      },
      tabs:[
        {
          text:'General',
          isSelected:true,
          controls:'nav-general',
          href:'#nav-general',
          id:'nav-general-tab',
          components:General
        },
        {
          text:'Problem Sets',
          isSelected:false,
          controls:'nav-problems',
          href:'#nav-problems',
          id:'nav-problems-tab',
          components:Problem
        },
        {
          text:'Advanced',
          isSelected:false,
          controls:'nav-advanced',
          href:'#nav-advanced',
          id:'nav-advanced-tab',
          components:Advanced
        }
      ]
    }
  }
}
</script>
