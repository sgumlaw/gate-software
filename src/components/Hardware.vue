<template>
    <div id="hardware" class="chainlinkEstimatorForm">
        <div class="chainlinkWrapper">
            <h1 class="label-fence font-bold">HARDWARE SELECTIONS</h1>
            <div class="main-grid">
                <label for="hingeType"> Hinge Type:</label>
                <select 
                    id="hingeType" 
                    name="hingeType"
                    :disabled="wdtT2T === true"
                    v-model="hingeType"
                    class="select-format">
                    <option disabled value="">Please select</option>
                    <option selected value="male/female">Male/Female</option>
                    <option value="box">Box Hinges</option>
                    <option value="bulldog">Bulldog Hinges</option>
                    <option value="barrel">Barrel Hinges</option>
                    <option value="rollers">Rollers</option>
                </select>
            
                <label for="latchType"> Latch Type:</label>
                <select 
                    id="latch_id" 
                    name="latch_id"
                    :disabled="wdtT2T === true"
                    v-model="latchType"
                    class="select-format">
                    <option disabled value="">Please select</option>
                    <option value="fork/collar">Fork/Collar</option>
                    <option value="strongarm">Strong Arm</option>
                    <option value="droprod">Commercial Drop Rod</option>
                    <option value="maxi">Maxi Latch</option>
                    <option value="cantileverLatch">Cantilever Latch</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>

import { mapFields } from 'vuex-map-fields';

export default {
    name: "Hardware",

    computed: {
        ...mapFields([
        'hingeType',
        'latchType',
        'wdtT2T',
        ]) 
    }
}
</script>

<style scoped>
    #Hardware {
        margin: 2px auto;
    }

    label{ 
        font-family: kefa, Arial, Helvetica, sans-serif;
        color: #323232;
        margin: 4px;
        text-align: left;
        font-size: 14px;
        margin-left: 1em;
    }
    .label-fence {
        margin-left: 1em;
        font-family: kefa, Arial, Helvetica, sans-serif;
        color: #323232;
    }
    .main-grid {
        display: grid;
        grid-template-rows: 1fr 1fr;  
        grid-template-columns: .5fr 1fr;
        background: #eee;
        grid-gap: 0.2rem;
        align-items: center;
        margin: 4px;
    }
    .select-format {
        padding: .5em;
        margin: 2px;
        font-size: 14px;
        width: 80%;
        color: #323232;
        background-color: white;
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

</style>