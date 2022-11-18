<template>
    <div id="Pipe" class="chainlinkEstimatorForm">
        <div class="chainlinkWrapper">
            <h1 class="label-fence font-bold">PIPE SELECTIONS</h1>
            <div class="main-grid">
                <label for="outer_vert_pipe"> Outer Vertical:</label>
                <select
                    class="select-format" 
                    id="outer_vert_pipe"
                    name="outer_vert_pipe"
                    v-model="outerVerticalPipe"
                    >
                    <option disabled value="">Please select</option>
                    <option v-for="pipe in pipes" :value="pipe.product_id" :key="pipe.id"> {{ pipe.name }} - {{ pipe.color }}</option>
                </select>

                <div class="pipe-setter">
                    <div class="pipe-setter-center">
                        <input id="pipe_set" @change="setPipeEqual" v-model="pipe_set" class="checkbox-format" type="checkbox">              
                        <label class="label-checkbox" for="pipe_set"> 
                            Set All Pipe Equal
                        </label>
                    </div>
                </div>
                

                <label for="outer_horz_pipe"> Outer Horizontal:</label>
                
                <select
                    class="select-format"
                    id="outer_horz_pipe"
                    name="outer_horz_pipe"
                    v-model="outerHorizontalPipe"
                    >
                    <option disabled value="">Please select</option>
                    <option v-for="pipe in pipes" :value="pipe.product_id" :key="pipe.id"> {{ pipe.name }} - {{ pipe.color }} </option>
                </select>

                <label class="pipe-setter" />
                

                <label for="inner_vert_pipe"> Inner Vertical:</label>
                <select 
                    class="select-format"
                    id="inner_vert_pipe"
                    :disabled="innerVerticalPipeQty === 0"
                    v-model="innerVerticalPipe"
                    >
                    <option disabled value="">Please select</option>
                    <option v-for="pipe in pipes" :value="pipe.product_id" :key="pipe.id"> {{ pipe.name }} - {{ pipe.color }}</option>
                </select>                
                
                <label for="innerVerticalPipeQty"> Quantity:</label>
                <select 
                    id="innerVerticalPipeQty" 
                    v-model.number="innerVerticalPipeQty"
                    class="select-format-qty">
                    <option selected>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                

                <label for="inner_horz_pipe"> Inner Horizontal:</label>
                <select 
                    class="select-format"
                    id="inner_horz_pipe"
                    :disabled="innerHorizontalPipeQty === 0"
                    v-model="innerHorizontalPipe"
                    >
                    <option disabled value="">Please select</option>
                    <option v-for="pipe in pipes" :value="pipe.product_id" :key="pipe.id"> {{ pipe.name }} - {{ pipe.color }} </option>
                </select>

                <label for="innerHorizontalPipeQty"> Quantity:</label>
                <select 
                    id="innerHorizontalPipeQty" 
                    v-model.number="innerHorizontalPipeQty"
                    class="select-format-qty">
                    <option selected>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            
                <label for="counter_bal_pipe"> Counter Balance:</label>
                <select 
                    id="counter_bal_pipe"
                    class="select-format"
                    :disabled="gate_type !== 'cantilever'"
                    v-model="counterBalancePipe"
                    >
                    <option disabled value="">Please select</option>
                    <option v-for="pipe in pipes" :value="pipe.product_id" :key="pipe.id"> {{ pipe.name }} - {{ pipe.color }} </option>
                </select>
            </div>   
        </div>
    </div>
</template>

<script>
    import { mapFields } from 'vuex-map-fields';

    export default {
        name: "Pipe",

        computed: {
            
            ...mapFields([
                'pipes',
                'gate_type',
                'pipe_set',
                'outerVerticalPipe',
                'outerHorizontalPipe',
                'innerVerticalPipe',
                'innerHorizontalPipe',
                'counterBalancePipe',
                'innerVerticalPipeQty',
                'innerHorizontalPipeQty',
    

            ])
        },
        methods: {
    
            setPipeEqual() {
                this.$store.commit('SET_PIPE_EQUAL')
            }


    },

        watch: {
            innerVerticalPipeQty(){
                this.setPipeEqual()
            },
            innerHorizontalPipeQty(){
                this.setPipeEqual()
            }
        }
        
        
    }
</script>

<style scoped>
    #Pipe {
        margin: 2px auto;
        
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

    .label-checkbox {
        margin: 0;
    }

    .main-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
        background: #eee;
        grid-gap: 0.2rem;
        align-items: center;
        margin: 4px;
    }
    .select-format {
        padding: .5em;
        margin: 2px;
        font-size: 14px;
        color: #323232;
        background-color: white;
        font-family: sans-serif, Georgia, Arial, Helvetica;
    }
    .select-format-qty {
        padding: .5em;
        margin: 2px;
        font-size: 14px;
        width: 80%;
        color: #323232;
        background-color: white;
        font-family: sans-serif, Georgia, Arial, Helvetica;
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
    .chainlinkEstimatorForm {
        display: grid;
        grid-gap: .2em;
        background: #eee;
        margin: 2px;
        border-style: solid;
        border-color: #323232;
        height: 100%;
    }
    .chainlinkWrapper {
        margin-bottom: 8px;
    }
    .checkbox-format {
        margin-left: 12px;
       
    }
    .pipe-setter {
        grid-column: 3 / span 2;
        
    }
    .pipe-setter-center {
        display: grid;
        grid-template-columns: .15fr 1fr;
        align-items: center;
    }

</style>