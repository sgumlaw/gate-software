<template>
    
        <nav class="navbar" style="max-height: 36px">
            
                <div class="navbar-start">
                    <a class="navbar-item has-text-white mx-2">
                        Customer Id:
                    </a>
                    <a class="navbar-item has-text-white mx-2">
                        CustomerName
                    </a>
                    <a class="navbar-item has-text-white mx-2">
                        Date:
                    </a>
                    <a class="navbar-item has-text-white mx-2">
                        Date
                    </a>
                </div>
                <div class="navbar-end">
                    <a class="navbar-item has-text-white mx-2">
                        User:
                    </a>
                    <a class="navbar-item has-text-white mx-2">
                        UserName
                    </a>
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

.header-color {
    background-color:#323232f6;
}
.fence-icon {
    display: inline;
}
.navbar-item:hover {
    background: #3374C2;
  }

</style>