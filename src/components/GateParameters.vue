<template>
    <div id="chainlink" class="chainlink-wrapper">
        <div class="main-grid">
            <label for="height">Height:</label> 
            <input  
                type="text"
                name="height" 
                id="height" 
                v-model.lazy.number="height" 
                required>
        
            <input id="htT2T" v-model="htT2T" type="checkbox">

            <label>
                Tip to Tip
            </label>
            
                
            <label for="width">Width:</label>
            <input  
                type="text" 
                name="width" 
                id="width" 
                v-model.lazy.number="width" 
                required>
        
            
            <input id="wdtT2T" v-model="wdtT2T" type="checkbox">
            <label>
                Tip to Tip
            </label>
            
            
            <label for="color">Color:</label>            
            <select 
                name="color" 
                id="color"
                class="select-format"
                @change='setColorOptions'
                v-model="color" required>
                <option disabled value="">Please select</option>
                <option value="galvanized">Galvanized</option>
                <option value="black">Black</option>
                <option value="brown">Brown</option>
                <option value="green">Green</option>
            </select>
            
            <label></label>
            <label></label>

        
            <label for="gate_type">Type:</label>
            <select 
                name="gate_type" 
                id="gate_type"
                class="select-format"
                @change='setDefaultOptions'
                v-model="gate_type"
                required>
                <option disabled value="">Please select</option>
                <option value="swing">Swing</option>
                <option value="cantilever">Cantilever</option>
                <option value="harvey">Harvey</option>
                <option value="frame_only">Frame-Only</option>
                
            </select>
            <input
                id="barbwire" 
                type="checkbox" 
                v-model="barbwire">
            <label>
                Barbwire
            </label>
        
            <label for="gate_type">Leaf(s):</label>
            <select 
                    name="leaf" 
                    id="leaf"
                    class="select-format"
                    @change='setLeafEffect'
                    v-model="leaf"
                    required>
                <option disabled value="">Please select</option>
                <option value=1>Single</option>
                <option value=2>Double</option>
            </select>
            <input 
                id="hingering" 
                type="checkbox" 
                @change='setHingeEffect'
                :disabled = "gate_type == 'cantilever'"
                v-model="hingering">
            <label>
                Hinge Ring
            </label>      
        </div>    
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
//import {mapActions, mapMutations, mapGetters } from 'vuex'
export default {
    name: "GateParameters",

    data() {
                
        return {
        
        };
    },
    computed: {
        ...mapFields([
            'gate_type',
            'leaf',
            'color',
            'height',
            'width',
            'barbwire',
            'htT2T',
            'wdtT2T',
            'hingering',
            'auto_calculate_bracing'
        ]),
    },
    
    methods: {
        setDefaultOptions() {
            this.$store.commit('SET_DEFAULT_OPTIONS')
        },
        setLeafEffect() {
            this.$store.commit('SET_LEAF_EFFECT')
        },
        setHingeEffect() {
            this.$store.commit('SET_HINGE_EFFECT')
        },
        setColorOptions() {
            if (this.auto_calculate_bracing != ''){
                this.$store.dispatch('SET_COLOR_EFFECT')
            }
            
        }
        
    }
    
}
</script>

<style scoped>
    #GateParameters {
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

    .main-grid {
        display: grid;
        grid-template-columns: .25fr 1fr .1fr .75fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
        background: #eee;
        grid-gap: 0.2rem;
        align-items: center;
        margin: 4px;
    }
    
    .select-format {
        padding: .5em;
        margin: 2px;
        width: 90%;
        font-size: 14px;
        color: #323232;
        background-color: white;
        font-family: sans-serif, Georgia, Arial, Helvetica;
    }
    input {
        padding: .5em;
        margin-bottom: 2px;
        margin-right: 2em;
        height: 30px;
        width: 50%;
        border-radius: 4px;
        color: #323232;
        font-size: 14px;
        font-family: sans-serif, Georgia, Arial, Helvetica;

    }
    
    .chainlink-wrapper {
        display: grid;
        grid-gap: .2em;
        background: #eee;
        margin: 2px;
        
    }

</style>