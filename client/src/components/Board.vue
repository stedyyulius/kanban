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
        <div class="back-log" v-for="bl in BackLogTasks">
          <p class="block-creator block-hdr">{{bl.creator}}</p>
  		    <p class="block-task block-hdr">{{bl.name}}</p>
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
            <button type="button" class="btn btn-danger" v-if="bl.creator === user" @click="ConfirmDeleteTask('back-log-tasks',bl._id)"><span class="glyphicon glyphicon-trash"></span></button>
            <button type="button" class="btn btn-danger" @click="cancelEdit()">X</button>
            <button type="button" class ="btn btn-primary" @click="editTask('back-log-tasks',bl._id,bl.creator,bl.name,bl.points,bl.status)">Proceed</button>
          </form>	
          <hr style="height:30px">
        </div>		    
  		</div>			
		<div class="col-sm-3 col-md-3 block-col block-col-2">	    
      <div class="back-log" v-for="td in ToDoTasks">
        <p class="block-creator block-hdr">{{td.creator}}</p>
        <p class="block-task block-hdr">{{td.name}}</p>
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
          <button type="button" class="btn btn-danger" v-if="td.creator === user" @click="ConfirmDeleteTask('to-do-tasks',td._id)"><span class="glyphicon glyphicon-trash"></span></button>
          <button type="button" class="btn btn-danger" @click="cancelEdit()">X</button>
          <button type="button" class ="btn btn-primary" @click="editTask('to-do-tasks',td._id,td.creator,td.name,td.points,td.status)">Proceed</button>
        </form>		
        <hr style="height:30px">
      </div>		
		</div>	
		<div class="col-sm-3 col-md-3 block-col block-col-3">
      <div class="back-log" v-for="doing in DoingTasks">
        <p class="block-creator block-hdr">{{doing.creator}}</p>
        <p class="block-task block-hdr">{{doing.name}}</p>
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
          <button type="button" class="btn btn-danger" v-if="doing.creator === user" @click="ConfirmDeleteTask('doing-tasks',doing._id)"><span class="glyphicon glyphicon-trash"></span></button>
          <button type="button" class="btn btn-danger" @click="cancelEdit()">X</button>
          <button type="button" class ="btn btn-primary" @click="editTask('doing-tasks',doing._id,doing.creator,doing.name,doing.points,doing.status)">Proceed</button>
        </form>		
        <hr style="height:30px">
      </div>		
		</div>	
		<div class="col-sm-3 col-md-3 block-col block-col-4">
      <div class="back-log" v-for="done in DoneTasks">
        <p class="block-creator block-hdr">{{done.creator}}</p>
        <p class="block-task block-hdr">{{done.name}}</p>
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
          <button type="button" class="btn btn-danger" v-if="done.creator === user" @click="ConfirmDeleteTask('done-tasks',done._id)"><span class="glyphicon glyphicon-trash"></span></button>
          <button type="button" class="btn btn-danger" @click="cancelEdit()">X</button>
          <button type="button" class ="btn btn-primary" @click="editTask('done-tasks',done._id,done.creator,done.name,done.points,done.status)">Proceed</button>
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
      points:0,
      status: "",
      id: "",
      isEdit: ""
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
    editTask(table,id,creator,name,points,status){
      let self = this;
      console.log(table);
      self.$db.ref(`${self.status}-tasks`).push({
        bang:'toyib'
      })
      self.$db.ref(`${self.status}-tasks`).orderByChild('bang').equalTo(`toyib`).on("child_added",function(data){
        self.id = data.key
      })
      self.$db.ref(`${self.status}-tasks`).child(self.id).set({
        _id: self.id,
        creator: creator,
        name: name,
        points: self.points,
        status: self.status
      })
      self.$db.ref(table).child(id).remove()
        this.points = ""
        this.status = ""
        this.isEdit = ""
    },
    cancelEdit(){
      this.points = ""
      this.status = ""
      this.isEdit = ""
    },
    ConfirmDeleteTask(table,id){
      if(confirm(`Are You Sure You Want to Delete This Task?`)){
        this.deleteTask(table,id)
      }
      else{
        return false
      }
    },
    deleteTask(table,id){
      this.$db.ref(table).child(id).remove()
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
