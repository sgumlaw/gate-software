<template>
  <div id="gate-calculator">
    <div class="heading-area">
      <h1 class="header-fence">GATE CALCULATOR</h1>
    </div>
    <div class="body-area">
      <form method="POST" action="/addgate" @submit.prevent="onSubmit">
          <div class="main-grid">
            <div class="general-info">                    
              <GeneralInput id="general-input"></GeneralInput>
              <GateParameters id="gate-parameters"></GateParameters>
              <Specifications id="specifications"></Specifications>
            </div>
            <div class="material-info">       
              <Pipe id="pipe"></Pipe>
              <Chainlink id="chainlink"></Chainlink>
              <Hardware id="hardware"></Hardware>
            </div>
            <div class="description-info">
              <Description id="description"></Description>
            
              
            
          </div>
          <div id="button-group">
            <!-- <button @click='checkHardware' style="font-size:1vw text-align:center">Render</button> -->
            <router-link :disabled="hardwareSet === false" :to="{name: 'render'}" tag="button" style="font-size:1vw text-align: center">Render</router-link>
            <button @click='resetGate' style="font-size:1vw text-align:center">Reset</button>
            <button @click="printPageArea('gate-calculator')" style="font-size:1vw text-align: center">Print</button>
          
          </div>
        </div>
      
    </form>
    </div>
  </div>
</template>

<script>
import GeneralInput from '../components/GeneralInput.vue'
import GateParameters from '../components/GateParameters.vue'
import Specifications from '../components/Specifications.vue'
import Chainlink from '../components/Chainlink.vue'
import Pipe from '../components/Pipe.vue'
import Hardware from '../components/Hardware.vue'
import Description from '../components/Description.vue'
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'GateCalculator',
  components: {
    GeneralInput,
    GateParameters,
    Specifications,
    Chainlink,
    Pipe,
    Hardware,
    Description
  },
  computed: {
    ...mapFields([
      'hingeType',
      'latchType',
    ]),
    hardwareSet: function () {
      if (this.hingeType === "" || this.latchType === "") {
        return false;
      }
      else {
        return true;
      }
    },
  },
  methods: {
                
      
      resetGate() {
          this.$store.commit('RESET_GATE')
    },
    checkHardware() {
      if (this.hingeType === "") {
        alert("Please select a hinge!")
      }
      else if (this.latchType === "") {
        alert("Please select a latch!")
      }
    },
      printPageArea(areaID){
            var printContent = document.getElementById(areaID);
            var WinPrint = window.open('', '', 'width=900,height=650');
            WinPrint.document.write(printContent.innerHTML);
            WinPrint.document.close();
            WinPrint.focus();
            WinPrint.print();
            WinPrint.close();
        }
      
  },
}
</script>

<style scoped>

#gate-calculator {
  min-height: 90vh;
  background: #eee;
  border-style: solid;
  border-color: #323232;
  border-width: 2px;
  display: grid;
  grid-template-columns: repeat(12, minmax(60px, auto));
  grid-template-rows: repeat(12, 1fr);
}
#general-input {
  border-style: solid;
  border-color: #323232;
  border-width: medium;
}
#gate-parameters {
  border-style: solid;
  border-color: #323232;
  border-width: medium;
}
#specifications {
  border-style: solid;
  border-color: #323232;
  border-width: medium;
}
#pipe {
  border-style: solid;
  border-color: #323232;
  border-width: medium;
}
#chainlink {
  border-style: solid;
  border-color: #323232;
  border-width: medium;
}
#hardware {
  border-style: solid;
  border-color: #323232;
  border-width: medium;
}
#description {
  border-style: solid;
  border-color: #323232;
  border-width: medium;
}

.main-grid {
  display: grid;
  grid-template-rows: 1fr 1fr .25fr .1fr;
  grid-gap: .3em;
  background: #eee;
  margin-bottom: 4px;
}

.general-info {
  display: grid;  
  grid-template-columns: 1fr 1.5fr 1fr;
  grid-gap: .4em;
  background: #eee;
  margin: 2px;
}

.material-info {
  display: grid;  
  grid-template-columns: 1.75fr 1fr 1fr;
  
  /* grid-template-areas: 
    "general-input gate-parameters gate-parameters specifications" 
    "pipe pipe chainlink hardware"
    "description description description button-group"; */
  grid-gap: .4em;
  background: #eee;
  margin: 2px;

}
/* #general-input {
  grid-area: general-input;
}
#gate-parameters {
  grid-area: gate-parameters;
}
#specifications {
  grid-area: specifications;
}
#pipe {
  grid-area: pipe;
}
#chainlink {
  grid-area: chainlink;
}
#hardware {
  grid-area: hardware;
}
#description {
  grid-area: description;
} */
.description-info {
  display: grid;
  grid-gap: .4em;
  background: #eee;
  margin: 2px;
  
}


button {
  background-color: #D8D8D8;
  color: #323232;
  font-family: kefa, Arial, Helvetica, sans-serif;
  font-size: 14px;
  padding: 12px 20px;
  border: solid;
  border-radius: 4px;
  border-color: #323232;
  cursor: pointer;
  float: left;
  margin: 4px;
  width: 100px;
}

.header-fence {
  margin-left: 1em;
  margin-bottom: 2px;
  font-family: kefa, Arial, Helvetica, sans-serif;
  color: #323232;
  text-align: center;
  font-size: xx-large;
}

.heading-area {
  grid-column: 1 / 12;
  justify-self: center;     
}

.body-area  {
  grid-column: 2 / 12;
  grid-row: 2 / 12;
}
</style>

