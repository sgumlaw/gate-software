<template>
    <div id="specifications" class="chainlink-wrapper">
        <div class="main-grid">
            <div class="specification-row">
                <label for="auto_calculate_bracing"> Use Defaults?</label> 
                <select 
                    id="auto_calculate_bracing" 
                    v-model="auto_calculate_bracing"
                    class="select-format">
                    <option disabled value="">Please select</option>
                    <option value="residential" :disabled="gate_type == 'cantilever'">Residential</option>
                    <option value="lt-commercial" :disabled="gate_type == 'cantilever'">Lt Commercial</option>
                    <option value="md-commercial" :disabled="gate_type == 'cantilever'">Md Commercial</option>
                    <option value="hv-commercial" :disabled="gate_type == 'cantilever'">Hv Commercial</option>
                    <option value="cantilever" disabled="gate_type != 'cantilever'">Cantilever</option>
                </select>
            </div>

            <div class="specification-row">
                <label for="hingeRing"> Hinge Ring?</label>            
            
                <select 
                    v-model="hingeRing"
                    :disabled = "gate_type == 'cantilever' || hingering == false"
                    class="select-format">
                    <option disabled value="">Select side</option>
                    <option value="left" :disabled="leaf == 2">Left </option>
                    <option value="right" :disabled="leaf == 2">Right </option>
                    <option value="double" :disabled="leaf == 1">Double </option>
                </select> 
            </div>    

            <div class="specification-row">
                <label for="cantileverDirection"> Slide Direction?</label>
                <select 
                    id="cantilever_opening_direction" 
                    v-model="cantilever_opening_direction"
                    :disabled = "cantileverOpenDirection"
                    class="select-format">
                    <option disabled value="">Select direction</option>
                    <option value="left" :disabled="leaf == 2">Left </option>
                    <option value="right" :disabled="leaf == 2">Right </option>
                </select>  
            </div>
            <div class="checkbox-row">
                
                <input id="diaganolPipe" v-model="diaganolPipe" class="checkbox-format" type="checkbox">              
                <label for="diaganolPipe" class="label-checkbox"> 
                    Inner Diagnaols?
                </label>
                <label />
                
            </div>
                
        </div>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
export default {
    name: "Specifications",

    data() {
                
        return {
        
        
        };
    },
    computed: {
        ...mapFields([
            'gate_type',
            'leaf',
            'auto_calculate_bracing',
            'diaganolPipe',
            'hingeRing',
            'pipe_set',
            'cantilever_opening_direction',
            'cantileverOpenDirection',
            'hingering'

        ]),
        
    },
    methods: {
        calculateBracing() {
            this.$store.commit('CALCULATE_BRACING')
    },
        setHingeRing() {
            this.$store.commit('RENDER_HINGERING')
     },
        setPipeEqual() {
            this.$store.commit('SET_PIPE_EQUAL')
        }

    
        },
    watch: {
        auto_calculate_bracing() {
            
            this.calculateBracing()
    },
        hingeRing() {
            console.log("You are being watched!")
            this.setHingeRing()
        },
        
        
},
    
}
</script>

<style scoped>
#Specifications {
  margin: 2px auto;
  height: 100%;
}

label{ 
    font-family: kefa, Arial, Helvetica, sans-serif;
    color: #323232;
    margin: 4px;
    text-align: left;
    font-size: 14px;
}
.label-checkbox {
    font-family: kefa, Arial, Helvetica, sans-serif;
    color: #323232;
    margin-top: 8px;
    margin-bottom: 2px;
    text-align: left;
    font-size: 14px;
}

.main-grid {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    background: #eee;
    grid-gap: 0.2rem;
    align-items: center;
    margin: 4px;
}

.specification-row {
    display: grid;
    grid-template-columns: .75fr 1fr;
}

.checkbox-row {
    display: grid;
    grid-template-columns: .15fr 1fr 1fr;
    align-items: center;
}

.select-format {
    padding: .5em;
    margin: 2px;
    font-size: 14px;
    width: 70%;
    color: #323232;
    background-color: white;
    font-family: sans-serif, Georgia, Arial, Helvetica;
}


.checkbox-format {
    margin-left: 2px;
}

.chainlink-wrapper {
    display: grid;
    grid-gap: .2em;
    background: #eee;
    margin: 2px;

}
</style>