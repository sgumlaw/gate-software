<template>
    <div id="chainlink" class="chainlinkEstimatorForm">
        <div class="chainlinkWrapper">
            <h1 class="label-fence font-bold">CHAINLINK SPECIFICATIONS</h1>
            <div class="main-grid">
                <label for="chainlinkGauge">Gauge:</label>
                <select 
                    id="chainlinkGauge" 
                    name="chainlinkGauge"
                    v-model="chainlinkGauge"
                    class="select-format">
                    <option value="none">None</option>
                    <option value="2-3/8 x 11-1/2ga">11-1/2ga</option>
                    <option value="2 x 9ga">9ga</option>
                    <option value="2 x 8ga">8ga</option>
                    <option value="2 x 6ga">6ga</option>
                </select>
            
            
                <label for="chainlinkSelvage">Selvage:</label>
                <select 
                    id="chainlinkSelvage" 
                    name="chainlinkSelvage"
                    :disabled="gate_type === 'frame_only'"
                    v-model="chainlinkSelvage"
                    class="select-format">
                    <option value="none">None</option>
                    <option selected value="kk">KK</option>
                    <option value="kt">KT</option>
                    <option value="tt">TT</option>
                </select>
            
                <label for="chainlinkColor">Color:</label>
                <select 
                    id="chainlinkColor" 
                    name="chainlinkColor"
                    :disabled="gate_type === 'frame_only'"
                    v-model="chainlinkColor"
                    class="select-format">
                    <option value="none">None</option>
                    <option selected value="galvanized">Galvanized</option>
                    <option value="black">Black</option>
                    <option value="green">Green</option>
                    <option value="brown">Brown</option>
                </select>
            
                <label for="chainlinkHeight">Height:</label>
                <select 
                    id="chainlinkHeight" 
                    name="chainlinkHeight"
                    v-model="chainlinkHeight"
                    class="select-format">
                    <option value="none">None</option>
                    <option value=3>3</option>
                    <option value=3.5>3-1/2</option>
                    <option value=4>4</option>
                    <option value=5>5</option>
                    <option value=6>6</option>
                    <option value=7>7</option>
                    <option value=8>8</option>
                    <option value=10>10</option>
                    <option value=12>12</option>
                </select>
            </div>
    
            
        </div>                   
    </div>
   
</template>

    <script>
        import { mapFields } from 'vuex-map-fields';

        export default {
            name: "Chainlink",

            computed: {
                ...mapFields([
                    'chainlinkHeight',
                    'chainlinkGauge',
                    'chainlinkSelvage',
                    'chainlinkColor',
                    'chainlinkSelection',
                    'gate_type',

                ])
            },

            
        }
    </script>

<style scoped>
#Chainlink {
  margin: 2px auto;
}
    .select-format {
        padding: .5em;
        margin-right: 4px;
        margin: 2px;
        font-size: 14px;
        width: 80%;
        color: #323232;
        background-color: white;
        font-family: sans-serif, Georgia, Arial, Helvetica;
    }

    label {
        font-family: kefa, Arial, Helvetica, sans-serif;
        color: #323232;
        text-align: left;
        font-size: 14px;
        margin-left: 1em;
    }

    .label-fence {
      margin-left: 1em;
      margin-bottom: 2px;
      font-family: kefa, Arial, Helvetica, sans-serif;
      color: #323232;
      
  }
   .chainlinkEstimatorForm {
        display: grid;
        grid-gap: .2em;
        background: #eee;
        margin: 2px;
        border-style: solid;
        border-color: #323232;
        height: 100%;
  }
    
    .main-grid {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;  
        grid-template-columns: .5fr 1fr;
        background: #eee;
        grid-gap: 0.2rem;
        margin: 2px;
        align-items: center;
    }
    .chainlinkWrapper {
        margin-bottom: 8px;
    }
</style>