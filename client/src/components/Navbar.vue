<template lang="html">
  <div>
      <button type="button" @click="logout()">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'navbar',  
  data(){
    return{
      
    }
  },
  methods:{
    logout(){
      localStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css">
</style>
