<template lang="html">
  <div>
    <form>
      <h3>Task</h3>
      <input type="text" v-model="task" placeholder="Task">
      <h4>Points</h4>
      <input type="text" v-model="points" placeholder="Points">
      <h3>Assinged To</h3>
      <select v-model="status">
        <option disabled value="">Select Category</option>
        <option>back-log</option>
        <option>to-do</option>
        <option>doing</option>
        <option>done</option>
      </select>
      <br><br>
      <button type="button" @click="addTask(status)">Add Task</button>
    </form>
    <br>
<div class="container">
	<div class="row item-job-list">
      <div class="col-sm-3 col-md-3 block-col block-col-1" >
        <div class="back-log" v-for="t in tasks">
          <p class="block-creator block-hdr">{{t.creator}}</p>
  		    <p class="block-task block-hdr">{{t.name}}</p>
  		    <p class="block-points block-hdr">{{t.points}}</p>
  		    <p class="block-status block-hdr">{{t.status}}</p>
          <button type="button" class="btn btn-primary" @click="details(t._id)">Details</button>	
          <hr style="height:30px">
        </div>		    
  		</div>		
		
		<div class="col-sm-3 col-md-3 block-col block-col-2">	    
		    <p class="block-organization block-hdr">_core_</p>	    
		        <ul class="block-do-action">
		            <li class="item-block-application-id">_core_ <a href=""><i class="glyphicon glyphicon-edit"></i></a></li>
		            <li class="item-block-module-id">admin <a href=""><i class="glyphicon glyphicon-edit"></i></a></li>
		            <li class="item-block-class-id">user <a href=""><i class="glyphicon glyphicon-edit"></i></a></li>
		            <li class="item-block-action-id">send_signup_emails <a href=""><i class="glyphicon glyphicon-edit"></i></a> </li>
		        </ul>	    
		</div>	
		<div class="col-sm-3 col-md-3 block-col block-col-3">
		    <p class="block-last-execution block-hdr">
		        2016-11-28 14:15
		    </p
		    <p class="block-next-execution block-hdr">
		        2016-11-29 14:15
		        <a href=""><i class="glyphicon glyphicon-edit"></i></a>	        
		    </p>	    
		    <p class="block-recurring block-hdr">
		        each 2 minutes
		        <a href=""><i class="glyphicon glyphicon-edit"></i></a>
		    </p>
		</div>	
		<div class="col-sm-3 col-md-3 block-col block-col-4">
      <ul class="block-do-action">
          <li class="item-block-application-id">_core_ <a href=""><i class="glyphicon glyphicon-edit"></i></a></li>
          <li class="item-block-module-id">admin <a href=""><i class="glyphicon glyphicon-edit"></i></a></li>
          <li class="item-block-class-id">user <a href=""><i class="glyphicon glyphicon-edit"></i></a></li>
          <li class="item-block-action-id">send_signup_emails <a href=""><i class="glyphicon glyphicon-edit"></i></a> </li>
      </ul>	  
		</div>	
	</div>
</div>  
  </div>
</template>

<script>
export default {
  data(){
    return{
      tasks: [],
      task: "",
      points:0,
      status: "",
      id: ""
    }
  },
  methods:{
    addTask(category){
      let self = this;
      let user = localStorage.getItem('token')
      self.$db.ref(`${category}-tasks`).push({
        otong:'tumbal'
      })
      self.$db.ref(`${category}-tasks`).orderByChild('otong').equalTo(`tumbal`).on("child_added",function(data){
        self.id = data.key
      })
      self.$db.ref(`${category}-tasks`).child(`${self.id}`).set({
        _id: self.id,
        name: self.task,
        points: self.points,
        status: self.status,
        creator: user
      })        
      alert(`${this.task} Added!`);
    },
    listTask(){
      let self = this;
      self.$db.ref('back-log-tasks').on("child_added",function(data){
        self.tasks.push(data.val())
      })
    }
  },
  created:function(){
    this.listTask()
  },
  computed:{
    user(){
      let user = localStorage.getItem('token')
      return user
    }
  }
}
</script>

<style lang="css">


.back-log-line{
  color:black;
  background-color: black;
}

.item-job-list {
    font-family: 'Cabin';
    padding: 10px;
    border: solid 1px silver;
}


.block-task::before {
    content:"Task: ";
}


.block-points::before {
    content:"Points: ";
}

.block-creator::before {
    content:"Creator: ";
}


.block-status::before {
    content:"Status: ";
}


.block-organization::before {
    content: "Org: ";
}

.block-do-action {
        list-style-type: none;
        margin-left: 0px;
        padding-left:0px;
}

.block-do-action li::before {
        color: gray;
}

.item-block-application-id::before { content:"App: "; }
.item-block-module-id::before { content: "Mod: "; }
.item-block-class-id::before { content: "Class: "; }
.item-block-action-id::before { content: "Action: "; }


.block-hdr::before {
    color: gray;
}


.block-hdr {
    color: black;

}



.block-last-execution::before {
    content: "Last....: ";
}


.block-next-execution::before {
    content: "Next....: ";
}


.block-recurring::before {
    content: "Interval: ";
}

.block-toolbar li {
    min-width: 150px;
    margin-top: 5px;
}


.block-col::before {
   border: 1px solid #888;
    display: block;    
    padding: 2px;
    
}


.block-col-1::before {
    content: "Back-Log";
    background-color: #fbb;
}



.block-col-2::before {
    content: "To-Do";
    background-color: #bfb;
}



.block-col-3::before {
    content: "Doing";
    background-color: #bbf;
}


.block-col-4::before {
    content: "Done";
    background-color: #bbb;
}



.block-col {
    margin-bottom:20px;
    padding: 20px;
}

.block-hdr {
    margin-top: 10px;
}



.block-toolbar {
    margin-top: 10px;
}

.block-hdr A {
    position: absolute;
    right: 10px;
}

.block-do-action  {
    width: 100%;
    
}

.block-do-action  A {
    position: absolute;
    right: 10px;
} 


</style>
