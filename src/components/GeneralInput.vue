<template>
    <div id="general-input" class="chainlink-wrapper">
        <div class="main-grid">
            <label class="mt-2" for="customer">Customer:</label>
            <input class="mt-2" type="text" name="customer" id="customer" v-model.lazy="customer" required>
            <label class="mt-2" for="workorder">Work Order:</label>
            <input class="mt-2" type="text" name="workorder" id="workorder" v-model.lazy="workorder" required>
            <label class="mt-2" for="date">Date:</label>
            <input class="mt-2" type="date" name="date" id="date" v-model.lazy="date" required>
            <label class="mt-2" for="salesperson">Salesperson:</label>
            <input class="mt-2" type="text" name="salesperson" id="salesperson" v-model.lazy="salesperson" required>  
        </div>
          
    </div>

</template>

<script>
//import {mapActions, mapMutations, mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields';
//import uuid from 'uuid';

export default {
    name: "GeneralInput",
    data() {
        return {
            
        }
    },

    computed: {
        ...mapFields([
            'customer', 
            'workorder', 
            'date', 
            'salesperson'
        ])
    },
    //created: function() {
        //this.workorder = uuid.v4();
        //console.log(uuid.v4());
        //}
    //<input class="input w-2/3 md:w-auto h-8" type="text" name="workorder" id="workorder" @addWorkorder v-model.lazy="workorder" required>
    //<label class="input text-white w-2/3 md:w-auto h-8">{{ workorder }}</label>
        
}
</script>

<style scoped>
#general-input {
    margin: 2px auto;
    width: 100%;
}
label{ 
    font-family: kefa, Arial, Helvetica, sans-serif;
    color: #323232;
    margin: 4px;
    text-align: left;
    font-size: 14px;
}

.main-grid {
    display: grid;
    grid-template-columns: .5fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    background: #eee;
    grid-gap: 0.2rem;
    align-items: center;
    
  }
 input {
    padding: .25em;
    margin-bottom: 2px;
    margin-right: 2em;
    height: 40px;
    border-radius: 4px;
    color: #323232;
    font-size: 14px;
    font-family: sans-serif, Georgia, Arial, Helvetica;

  }
  .chainlink-wrapper {
    background: #eee;
    margin: 2px;

    
  }

</style>
                  