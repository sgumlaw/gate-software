import { updateField } from 'vuex-map-fields';

let actions = {
    updateField,

    SET_COLOR_EFFECT(context){
        
            console.log('Color Effect was called')
            context.commit('CALCULATE_BRACING');
},


}

export default actions