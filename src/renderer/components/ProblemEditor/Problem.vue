<template>
  <div class="problem-set">
    <div class="problem-list">
      <div 
        v-for="(item,index) in problems"
        :key="index"
        data-id="index" 
        :class="{active:index === selectedIndex}"
      >{{item.title}}</div>
      <div data-id="-1" onclick="newProb()"><i class="MDI plus-circle"></i> Add New Problem</div>
    </div>
    <div class="problem-editor">
      <div data-id="0">
          <div class="form-group">
              <label for="problem_title_0">Title</label>
              <input type="text" class="form-control" id="problem_title_0" :value="problems[selectedIndex].title">
              <span class="bmd-help">The title of this problem, should be brief.</span>
          </div>
          <div class="form-group">
              <label for="problem_type_0">Type</label>
              <input type="text" class="form-control" id="problem_type_0" :value="problems[selectedIndex].type">
              <span class="bmd-help">Type, could be OnlineJudge or VirtualJudge.</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Problem',
  data(){
    return{
      selectedIndex:0,
    }
  },
  computed:{
    problems(){
      return this.$store.state.Problem.problems;
    }
  }
}
</script>


<style>
.problem-set {
    display: flex;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    overflow: hidden;
    min-height: 70vh;
}

.problem-set .problem-list {
    display: block;
    background: #f6f6f6;
    width: 15rem;
    border-right: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 30px;
    flex-shrink: 0;
    flex-grow: 0;
}

.problem-set .problem-list > div {
    padding:1rem;
    transition: .2s ease-out .0s;
    border-left: 2px solid #03a9f4;
    cursor: pointer;
}

.problem-set .problem-list > div[data-id="-1"] {
    opacity: 0.5;
}

.problem-set .problem-list > div[data-id="-1"]:hover {
    opacity: 1;
}

.problem-set .problem-list > div.active {
    background: rgba(3, 169, 244, 0.1);
    border-left: 4px solid #03a9f4;
}

.problem-set .problem-editor {
    display: block;
    padding:1rem;
    flex-shrink: 1;
    flex-grow: 1;
}

.problem-set .problem-editor > div {
    /* display: none; */
}

.problem-set .problem-editor > div.active {
    display: block;
}
</style>
