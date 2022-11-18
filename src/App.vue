<template>
  <div id="app">
    <head>
      <meta charset="utf-8">
      <title>The Fencestimator</title>
      
    </head>
    <div class="noprint block px-2 m-2">
      <Header />
      <div class=" noprint block m-1 px-2"></div>
      <Subheader />
    </div>
    <div class="block px-2 m-2">
      <router-view></router-view>
    </div>
    
    <footer class="footer">
      <div class="footer-content has-text-centered">
        <p> Copyright 2021 <strong> Gumlaw & Company, LLC </strong></p>
      </div>
    </footer>
  </div>
   
</template>

<script>
//import GateCalculator from './components/GateCalculator.vue'
import Header from './components/Header.vue';
import Subheader from './components/Subheader.vue';

export default {
  name: 'App',
  components: {
    Header, 
    Subheader,
    
  },
  
}
</script>

<style lang="scss">
#app {
   font-family: kefa, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #0e1c85;
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 5%;
    background-color:#323232f6;
    color: white;
    .navigation__logo {
      font-weight: bold;
      font-size: 24px;
    }
    .navigation__user {
      font-weight: bold;
    }
  }
.footer-content {
  text-align: center;
  color: white;
}
@media print
    {
    .noprint {display:none;}
    .footer {display: none;}
}
}
@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";


</style>
