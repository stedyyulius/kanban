<template lang="html">
  <div>
      <button type="button" v-if="isLogin === true" @click="logout()">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'navbar',  
  data(){
    return{
      isLogin:false
    }
  },
  methods:{
    logout(){
      this.isLogin = false
      localStorage.clear()
      this.$router.push('/')
    }
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
</style>
