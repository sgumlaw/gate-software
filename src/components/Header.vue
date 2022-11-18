<template>
    
        <nav class="navbar">
            <div id="navbar-brand">
                <a class="navbar-item" href="https://fenceeteer.com">
                   <p class="fence-title">
                        The Fencestimator
                    </p>
                    <p class="fence-subtitle"> Fence Software Simplified</p>
                </a>
                <a class="navbar-burger" id="burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
                <div class="navbar-start">
                    
                </div>

                
            <div class="navbar-menu" id="nav-links">
                <div class="navbar-start ml-6">
                    <a class="navbar-item ml-6">
                        <router-link to="/" class="has-text-white mx-2">Home</router-link> 
                    </a>
                
                    <a class="navbar-item">
                        <router-link to="/about" class="has-text-white mx-2 ">About</router-link>
                    </a>
                
                
                    <a class="navbar-item">
                        <router-link to="/how_flows" class="has-text-white mx-2 ">How Fencestimator Flows</router-link>
                    </a>
                
                
                    <a class="navbar-item">
                         <router-link :to="{name: 'GateCalculator'}" class="has-text-white mx-2 ">Gate Calculator</router-link>
                    </a>
                </div>                    
                
            </div>
                    
           
            
        </nav>
            

</template>

<script>
//import '../css/mystyles.css';
export default {
    name: "Header", 
    
}
</script>

<style scoped>

.fence-title {
    color: #eb0c0c;
    font-weight: bolder;
    font-size: 36px;
    font-family: kefa, Arial, Helvetica, sans-serif;
    margin-top: 12px; 
    text-decoration: underline;          
}
.fence-subtitle {
    color: #eb0c0c;
    font-weight: bolder;
    font-size: large;
    font-family: kefa, Arial, Helvetica, sans-serif;
    margin-top: 4px;   
    float: right;      
}

.navbar-item:hover {
    background: #3374C2;
  }


</style>