<template>
    <div id="description" class="chainlink-wrapper">
        
        <h1 class="label-fence">INSTRUCTIONS</h1>
        <div class="labelGrid">
            <textarea v-model="description"/>
        </div>
            
    </div>
</template>

<script>
    import { mapFields } from 'vuex-map-fields';

    export default {
        name: "Description",

        computed: {
            ...mapFields([
                'description',
                

            ])
        },

        
    }
</script>

<style scoped>
.label-fence {
    margin-left: 1em;
    font-family: kefa, Arial, Helvetica, sans-serif;
    color: #323232;
}

.chainlink-wrapper {
    display: grid;
    grid-gap: .2em;
    background: #eee;
    margin: 2px;
    border-style: solid;
    border-color: #323232;
    height: 100%;
    margin-bottom: 8px;
}
  
textarea {
    width: 90%;
    height: 90%;
    margin-left: 1em;
    margin-bottom: 2px;
}

</style>