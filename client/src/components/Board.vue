<template lang="html">
  <div>
    <br><br><br>
    <button type="button" class="btn btn-success" @click="add()">Add Task</button>
    <form v-if="Add === true">
      <br>
      <button type="button" class="btn btn-danger" @click="canceladd()">X</button>
      <h3>Task</h3>
      <input type="text" v-model="task" placeholder="Task">
      <h4>Points</h4>
      <input type="text" v-model="points" placeholder="Points">
      <h3>Assinged To</h3>
      <input type="text" v-model="assign" placeholder="Assinged to..">
      <h4>Status</h4>
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
    <br><br><br>
<div class="container">
	<div class="row item-job-list">
      <div class="col-sm-3 col-md-3 block-col block-col-1" >
        <div class="back-log" v-for="(bl,index) in BackLogTasks">
          <p class="block-creator block-hdr">{{bl.creator}}</p>
  		    <p class="block-task block-hdr">{{bl.name}}</p>
          <p class="block-assign block-hdr">{{bl.assign}}</p>
  		    <p class="block-points block-hdr">{{bl.points}}</p>
  		    <p class="block-status block-hdr">{{bl.status}}</p>
          <button type="button" class="btn btn-primary" @click="details(bl._id,bl.points,bl.status)">Details</button>
          <form v-if="isEdit === bl._id">
            <h3>Points</h3>
            <input type="text" v-model="points" placeholder="points"><br><br>
            <select v-model="status" v-if="isEdit === bl._id">
              <option disabled value="">Select Category</option>
              <option>back-log</option>
              <option>to-do</option>
              <option>doing</option>
              <option>done</option>
            </select><br><br>
            <button type="button" class="btn btn-danger" v-if="bl.creator === user" @click="ConfirmDeleteTask('back-log-tasks',bl._id,index,'BackLogTasks')"><span class="glyphicon glyphicon-trash"></span></button>
            <button type="button" class="btn btn-danger" @click="cancelEdit()">X</button>
            <button type="button" class ="btn btn-primary" @click="editTask('back-log-tasks',bl._id,bl.creator,bl.name,bl.assign,bl.points,bl.status,index,'BackLogTasks')">Proceed</button>
          </form>	
          <hr style="height:30px">
        </div>		    
  		</div>			
		<div class="col-sm-3 col-md-3 block-col block-col-2">	    
      <div class="back-log" v-for="(td,index) in ToDoTasks">
        <p class="block-creator block-hdr">{{td.creator}}</p>
        <p class="block-task block-hdr">{{td.name}}</p>
        <p class="block-assign block-hdr">{{td.assign}}</p>
        <p class="block-points block-hdr">{{td.points}}</p>
        <p class="block-status block-hdr">{{td.status}}</p>
        <button type="button" class="btn btn-primary" @click="details(td._id,td.points,td.status)">Details</button>
        <form v-if="isEdit === td._id">
          <h3>Points</h3>
          <input type="text" v-model="points" placeholder="points"><br><br>
          <select v-model="status" v-if="isEdit === td._id">
            <option disabled value="">Select Category</option>
            <option>back-log</option>
            <option>to-do</option>
            <option>doing</option>
            <option>done</option>
          </select><br><br>
          <button type="button" class="btn btn-danger" v-if="td.creator === user" @click="ConfirmDeleteTask('to-do-tasks',td._id,index,'ToDoTasks')"><span class="glyphicon glyphicon-trash"></span></button>
          <button type="button" class="btn btn-danger" @click="cancelEdit()">X</button>
          <button type="button" class ="btn btn-primary" @click="editTask('to-do-tasks',td._id,td.creator,td.name,td.assign,td.points,td.status,index,'ToDoTasks')">Proceed</button>
        </form>		
        <hr style="height:30px">
      </div>		
		</div>	
		<div class="col-sm-3 col-md-3 block-col block-col-3">
      <div class="back-log" v-for="(doing,index) in DoingTasks">
        <p class="block-creator block-hdr">{{doing.creator}}</p>
        <p class="block-task block-hdr">{{doing.name}}</p>
        <p class="block-assign block-hdr">{{doing.assign}}</p>
        <p class="block-points block-hdr">{{doing.points}}</p>
        <p class="block-status block-hdr">{{doing.status}}</p>
        <button type="button" class="btn btn-primary" @click="details(doing._id,doing.points,doing.status)">Details</button>
        <form v-if="isEdit === doing._id">
          <h3>Points</h3>
          <input type="text" v-model="points" placeholder="points"><br><br>
          <select v-model="status">
            <option disabled value="">Select Category</option>
            <option>back-log</option>
            <option>to-do</option>
            <option>doing</option>
            <option>done</option>
          </select><br><br>
          <button type="button" class="btn btn-danger" v-if="doing.creator === user" @click="ConfirmDeleteTask('doing-tasks',doing._id,index,'DoingTasks')"><span class="glyphicon glyphicon-trash"></span></button>
          <button type="button" class="btn btn-danger" @click="cancelEdit()">X</button>
          <button type="button" class ="btn btn-primary" @click="editTask('doing-tasks',doing._id,doing.creator,doing.name,doing.assign,doing.points,doing.status,index,'DoingTasks')">Proceed</button>
        </form>		
        <hr style="height:30px">
      </div>		
		</div>	
		<div class="col-sm-3 col-md-3 block-col block-col-4">
      <div class="back-log" v-for="(done,index) in DoneTasks">
        <p class="block-creator block-hdr">{{done.creator}}</p>
        <p class="block-task block-hdr">{{done.name}}</p>
        <p class="block-assign block-hdr">{{done.assign}}</p>
        <p class="block-points block-hdr">{{done.points}}</p>
        <p class="block-status block-hdr">{{done.status}}</p>
        <button type="button" class="btn btn-primary" @click="details(done._id,done.points,done.status)">Details</button>
        <form v-if="isEdit === done._id">
          <h3>Points</h3>
          <input type="text" v-model="points" placeholder="points"><br><br>
          <select v-model="status" v-if="isEdit === done._id">
            <option disabled value="">Select Category</option>
            <option>back-log</option>
            <option>to-do</option>
            <option>doing</option>
            <option>done</option>
          </select><br><br>
          <button type="button" class="btn btn-danger" v-if="done.creator === user" @click="ConfirmDeleteTask('done-tasks',done._id,index,'DoneTasks')"><span class="glyphicon glyphicon-trash"></span></button>
          <button type="button" class="btn btn-danger" @click="cancelEdit()">X</button>
          <button type="button" class ="btn btn-primary" @click="editTask('done-tasks',done._id,done.creator,done.name,done.assign,done.points,done.status,index,'DoneTasks')">Proceed</button>
        </form>		
        <hr style="height:30px">
      </div>		 
		</div>	
	</div>
</div>  
  </div>
</template>

<script>
export default {
  data(){
    return{
      BackLogTasks: [],
      ToDoTasks: [],
      DoingTasks:[],
      DoneTasks: [],
      task: "",
      assign:"",
      points:0,
      status: "",
      id: "",
      isEdit: "",
      Add: false
    }
  },
  methods:{
    addTask(category){
      let self = this;
      let user = localStorage.getItem('token')
      let tumbal = {
        creator: user,
        name: self.task,
        assign: self.assign,
        points: self.points,
        status: self.status,
        otong:'tumbal'
      }
      self.$db.ref(`${category}-tasks`).push(tumbal)
      self.$db.ref(`${category}-tasks`).orderByChild('otong').equalTo(`tumbal`).on("child_added",function(data){
        self.id = data.key
      })
      self.$db.ref(`${category}-tasks`).child(`${self.id}`).set({
        _id: self.id,
        name: self.task,
        assign: self.assign,
        points: self.points,
        status: self.status,
        creator: user
      })    
      self.Add = false
      alert(`${self.task} Added!`)
      location.reload()        
    },
    add(){
      this.Add = true
    },
    canceladd(){
      this.Add = false
    },
    listBackLog(){
      let self = this;
      self.$db.ref('back-log-tasks').on("child_added",function(data){
        self.BackLogTasks.push(data.val())
      })
    },
    listToDo(){
      let self = this;
      self.$db.ref('to-do-tasks').on("child_added",function(data){
        self.ToDoTasks.push(data.val())
      })
    },
    listDoing(){
      let self = this;
      self.$db.ref('doing-tasks').on("child_added",function(data){
        self.DoingTasks.push(data.val())
      })
    },
    listDone(){
      let self = this;
      self.$db.ref('done-tasks').on("child_added",function(data){
        self.DoneTasks.push(data.val())
      })
    },
    details(id,points,status){
      this.isEdit = id
      this.points = points
      this.status = status
    },
    editTask(table,id,creator,name,assign,points,status,index,state){
      let self = this;
      self.$db.ref(table).child(id).remove()
      self.$db.ref(`${self.status}-tasks`).push({
        _id: id,
        creator: creator,
        name: name,
        assign: assign,
        points: self.points,
        status: self.status,
        bang:'toyib'
      })
      self.$db.ref(`${self.status}-tasks`).orderByChild('bang').equalTo(`toyib`).on("child_added",function(data){
        self.id = data.key
      })
      let newData = {  
        _id: self.id,
        creator: creator,
        name: name,
        assign: assign,
        points: self.points,
        status: self.status
      }   
      self.$db.ref(`${self.status}-tasks`).child(self.id).set(newData)

      self.$db.ref(`${self.status}-tasks`).orderByChild('_id').equalTo(`${self.id}`).on("child_added",function(dataa){
        self.id = dataa.key
      })
      if(state === "DoneTasks"){
        this.DoneTasks.splice(index,1)
      }
      else if (state === "DoingTasks"){
        this.DoingTasks.splice(index,1)
      }    
      else if (state === "ToDoTasks"){
        this.ToDoTasks.splice(index,1)
      }
      else if (state === "BackLogTasks"){
        this.BackLogTasks.splice(index,1)
      }
        this.points = ""
        this.status = ""
        this.isEdit = ""
    },
    cancelEdit(){
      this.points = ""
      this.status = ""
      this.isEdit = ""
    },
    ConfirmDeleteTask(table,id,index,state){
      if(confirm(`Are You Sure You Want to Delete This Task?`)){
        this.deleteTask(table,id,index,state)
      }
      else{
        return false
      }
    },
    deleteTask(table,id,index,state){
      this.$db.ref(table).child(id).remove()
      if(state === "DoneTasks"){
        this.DoneTasks.splice(index,1)
      }
      else if (state === "DoingTasks"){
        this.DoingTasks.splice(index,1)
      }    
      else if (state === "ToDoTasks"){
        this.ToDoTasks.splice(index,1)
      }
      else if (state === "BackLogTasks"){
        this.BackLogTasks.splice(index,1)
      }
      this.points = ""
      this.status = ""
      this.isEdit = ""
    }
  },
  created:function(){
    this.listBackLog()
    this.listToDo()
    this.listDoing()
    this.listDone()
  },
  computed:{
    user(){
      let user = localStorage.getItem('token')
      if(user){
        return user
      }
      else{
        window.location = "/"
      }
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


.block-assign::before {
    content: "Assigned To: ";
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
