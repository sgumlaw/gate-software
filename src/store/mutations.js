import { updateField } from 'vuex-map-fields';

let mutations = {
    updateField,

    RESET_GATE(state) {
        state.customer = ''
        state.workorder = ''
        state.date = ''
        state.salesperson = ''
        state.gate_type = ''
        state.leaf = ''
        state.color = ''
        state.height = ''
        state.width = ''
        state.hingeRing = ''
        state.hingering = false
        state.barbwire = false
        state.outerVerticalPipe = ''
        state.innerVerticalPipe = ''
        state.outerHorizontalPipe = ''
        state.innerHorizontalPipe = ''
        state.counterBalancePipe = ''
        state.chainlinkGauge = ''
        state.chainlinkSelvage = ''
        state.chainlinkColor = ''
        state.hingeType = ''
        state.latchType = ''
        state.outerVerticalPipeQty = 0
        state.innerVerticalPipeQty = 0
        state.outerHorizontalPipeQty = 0
        state.innerHorizontalPipeQty = 0
        state.diaganolPipeQty = 0
        state.diaganolPipe = ''
        state.auto_calculate_bracing = ''
        state.description = ''
        state.cantilever_opening_direction = ''
        

        },
        SET_DEFAULT_OPTIONS(state){
            if (state.gate_type == 'cantilever'){
               state.auto_calculate_bracing = 'cantilever'
               state.hingeRing = ''
               
            }
            
            else if (state.gate_type == 'swing'){
                state.auto_calculate_bracing = ''
                state.cantilever_opening_direction = ''
                
            }
        },
        SET_LEAF_EFFECT(state){
            if (state.gate_type == 'cantilever' && state.leaf == 2){
                state.cantilever_opening_direction = ''
                state.cantileverOpenDirection = true
            }
            else if (state.gate_type !== 'cantilever' && state.leaf == 2){
                state.hingeRing = ''
            }
            else if (state.gate_type == 'cantilever' && state.leaf == 1){
                state.cantileverOpenDirection = false
            }
        },
        SET_HINGE_EFFECT(state){
            if (state.hingering == true && state.leaf == 2){
                state.hingeRing = 'double'
            }
            else if (state.hingering == false){
                state.hingeRing = ''
            }
        },
        

        SET_PIPE_EQUAL(state) {
            if (state.pipe_set === true) {
                if (state.outerVerticalPipe) {
                    state.outerHorizontalPipe = state.outerVerticalPipe
                    if (state.innerHorizontalPipeQty > 0) {
                        state.innerHorizontalPipe = state.outerVerticalPipe
                    }
                    if (state.innerVerticalPipeQty > 0) {
                        state.innerVerticalPipe = state.outerVerticalPipe
                    }
                    if (state.counterBalancePipeQty > 0) {
                        state.counterBalancePipe = state.outerVerticalPipe
                    }
                }
                else if (state.outerHorizontalPipe) {
                    state.outerVerticalPipe = state.outerHorizontalPipe
                    if (state.innerHorizontalPipeQty > 0) {
                        state.innerHorizontalPipe = state.outerHorizontalPipe
                    }
                    if (state.innerVerticalPipeQty > 0) {
                        state.innerVerticalPipe = state.outerHorizontalPipe
                    }
                    if (state.counterBalancePipeQty > 0) {
                        state.counterBalancePipe = state.outerHorizontalPipe
                    }
                }
                else if (state.innerVerticalPipe) {
                    state.outerVerticalPipe = state.innerVerticalPipe
                    state.outerHorizontalPipe = state.innerVerticalPipe
                    if (state.innerHorizontalPipeQty > 0) {
                        state.innerHorizontalPipe = state.innerVerticalPipe
                    }
                    if (state.counterBalancePipeQty > 0) {
                        state.counterBalancePipe = state.innerVerticalPipe
                    }
                }
                else if (state.innerHorizontalPipe) {
                    state.outerVerticalPipe = state.innerHorizontalPipe
                    state.outerHorizontalPipe = state.innerHorizontalPipe
                    if (state.innerVerticalPipeQty > 0) {
                        state.innerVerticalPipe = state.innerHorizontalPipe
                    }
                    if (state.counterBalancePipeQty > 0) {
                        state.counterBalancePipe = state.innerHorizontalPipe
                    }
                }
                else if (state.counterBalancePipe) {
                    state.outerVerticalPipe = state.counterBalancePipe
                    state.outerHorizontalPipe = state.counterBalancePipe
                    if (state.innerVerticalPipeQty > 0) {
                        state.innerVerticalPipe = state.counterBalancePipe
                    }
                    if (state.innerHorizontalPipeQty > 0) {
                        state.innerHorizontalPipe = state.counterBalancePipe
                    }
                }
            }
        },
        RENDER_HINGERING(state) {
            if (state.hingeRing == 'left'){
                state.hingeRingPath = 'M1,85 L-1,85'
            }
            else if (state.hingeRing == 'right'){
                state.hingeRingPath = 'M99,85 L101,85'
            }
            else if (state.hingeRing == 'double'){
                state.hingeRingPath = 'M1,85 L-1,85 M99,85 L101,85'
            }
            else if (state.hingeRing == ''){
                state.hingeRingPath = ''
            }
        },
        CALCULATE_BRACING(state) {
            if (state.auto_calculate_bracing === "residential"){
                if (state.color === 'galvanized') {
                    state.outerVerticalPipe = '138055G'
                    state.outerHorizontalPipe = '138055G'
                    state.chainlinkGauge = "2-3/8 x 11-1/2ga"
                    state.chainlinkSelvage = "kk"
                    state.chainlinkColor = "galvanized"
                    state.hingeType = "male/female"
                    state.latchType = "fork/collar"
                    if (state.height > 5) {
                        state.innerHorizontalPipeQty = 1
                        state.innerHorizontalPipe = '138055G'
                    }
                }
                else if(state.color === 'black') {
                    state.outerVerticalPipe = '138055BK'
                    state.outerHorizontalPipe = '138055BK'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkSelvage = "kk"
                    state.chainlinkColor = "black"
                    state.hingeType = "male/female"
                    state.latchType = "fork/collar"
                    if (state.height > 5) {
                        state.innerHorizontalPipeQty = 1
                        state.innerHorizontalPipe = '138055BK'
                        
                    }
                }
                else if(state.color === 'brown') {
                    state.outerVerticalPipe = '138055BR'
                    state.outerHorizontalPipe = '138055BR'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkSelvage = "kk"
                    state.chainlinkColor = "brown"
                    state.hingeType = "male/female"
                    state.latchType = "fork/collar"
                    if (state.height > 5) {
                        state.innerHorizontalPipeQty = 1
                        state.innerHorizontalPipe = '138055BR'
                        
                    }
                }
                else if(state.color === 'green') {
                    state.outerVerticalPipe = '138055GR'
                    state.outerHorizontalPipe = '138055GR'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkSelvage = "kk"
                    state.chainlinkColor = "green"
                    state.hingeType = "male/female"
                    state.latchType = "fork/collar"
                    if (state.height > 5) {
                        state.innerHorizontalPipeQty = 1
                        state.innerHorizontalPipe = '138055GR'
                        
                    }
                }
            }
            else if (state.auto_calculate_bracing === "lt-commercial"){
                if (state.color === 'galvanized') {
                    state.outerVerticalPipe = '158055G'
                    state.outerHorizontalPipe = '158055G'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkColor = "galvanized"
                    // state.hingeType = "male/female"
                    // state.latchType = "fork/collar"
                    if (state.height > 5) {
                        state.innerHorizontalPipeQty = 1
                        state.innerHorizontalPipe = '158055G'
                        state.chainlinkSelvage = 'kt'
                    }
                    else if (state.height < 6) {
                        state.chainlinkSelvage = 'kk'
                    } 
                }
                else if(state.color === 'black') {
                    state.outerVerticalPipe = '158055BK'
                    state.outerHorizontalPipe = '158055BK'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkColor = "black"
                    // state.hingeType = "male/female"
                    // state.latchType = "fork/collar"
                    if (state.height > 5) {
                        state.innerHorizontalPipeQty = 1
                        state.innerHorizontalPipe = '158055BK'
                        state.chainlinkSelvage = 'kt'
                        
                    }
                    else if (state.height < 6) {
                        state.chainlinkSelvage = 'kk'
                    } 
                }
                else if(state.color === 'brown') {
                    state.outerVerticalPipe = '158055BR'
                    state.outerHorizontalPipe = '158055BR'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkColor = "brown"
                    // state.hingeType = "male/female"
                    // state.latchType = "fork/collar"
                    if (state.height > 5) {
                        state.innerHorizontalPipeQty = 1
                        state.innerHorizontalPipe = '158055BR'
                        state.chainlinkSelvage = 'kt'
                    }
                    else if (state.height < 6) {
                        state.chainlinkSelvage = 'kk'
                    } 
                }
                else if(state.color === 'green') {
                    state.outerVerticalPipe = '158055GR'
                    state.outerHorizontalPipe = '158055GR'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkColor = "green"
                    // state.hingeType = "male/female"
                    // state.latchType = "fork/collar"
                    if (state.height > 5) {
                        state.innerHorizontalPipeQty = 1
                        state.innerHorizontalPipe = '158055GR'
                        state.chainlinkSelvage = 'kt'
                    }
                    else if (state.height < 6) {
                        state.chainlinkSelvage = 'kk'
                    }
                }
            }
            else if (state.auto_calculate_bracing === "md-commercial"){
                if (state.color === 'galvanized') {
                    state.outerVerticalPipe = '158SS20G'
                    state.outerHorizontalPipe = '158SS20G'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkColor = "galvanized"
                    // state.hingeType = "box"
                    // state.latchType = "strongarm"
                    if (state.height > 5) {
                        state.innerHorizontalPipeQty = 1
                        state.innerHorizontalPipe = '158SS20G'
                        state.chainlinkSelvage = 'kt'
                    }
                    else if (state.height < 6) {
                        state.chainlinkSelvage = 'kk'
                    }
                }
                else if(state.color === 'black') {
                    state.outerVerticalPipe = '158SS20BK'
                    state.outerHorizontalPipe = '158SS20BK'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkColor = "black"
                    // state.hingeType = "box"
                    // state.latchType = "strongarm"
                    if (state.height > 5) {
                        state.innerHorizontalPipeQty = 1
                        state.innerHorizontalPipe = '158SS20BK'
                        state.chainlinkSelvage = 'kt'
                    }
                    else if (state.height < 6) {
                        state.chainlinkSelvage = 'kk'
                    }
                }
                else if(state.color === 'brown') {
                    state.outerVerticalPipe = '158SS20BR'
                    state.outerHorizontalPipe = '158SS20BR'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkColor = "brown"
                    // state.hingeType = "box"
                    // state.latchType = "strongarm"
                    if (state.height > 5) {
                        state.innerHorizontalPipeQty = 1
                        state.innerHorizontalPipe = '158SS20BR'
                        state.chainlinkSelvage = 'kt'
                    }
                    else if (state.height < 6) {
                        state.chainlinkSelvage = 'kk'
                    }
                }
                else if(state.color === 'green') {
                    state.outerVerticalPipe = '158SS20GR'
                    state.outerHorizontalPipe = '158SS20GR'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkColor = "green"
                    // state.hingeType = "box"
                    // state.latchType = "strongarm"
                    if (state.height > 5) {
                        state.innerHorizontalPipeQty = 1
                        state.innerHorizontalPipe = '158SS20GR'
                        state.chainlinkSelvage = 'kt'
                    }
                    else if (state.height < 6) {
                        state.chainlinkSelvage = 'kk'
                    }
                }
            }
            else if (state.auto_calculate_bracing === "hv-commercial"){
                if (state.color === 'galvanized') {
                    state.outerVerticalPipe = '158SS40G'
                    state.outerHorizontalPipe = '158SS40G'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkColor = "galvanized"
                    state.hingeType = "box"
                    state.latchType = "strongarm"
                    if (state.height > 5) {
                        state.innerHorizontalPipeQty = 1
                        state.innerHorizontalPipe = '158SS40G'
                        state.chainlinkSelvage = 'kt'
                    }
                    else if (state.height < 6) {
                        state.chainlinkSelvage = 'kk'
                    }
                }
                else if(state.color === 'black') {
                    state.outerVerticalPipe = '158SS40BK'
                    state.outerHorizontalPipe = '158SS40BK'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkColor = "black"
                    state.hingeType = "box"
                    state.latchType = "strongarm"
                    if (state.height > 5) {
                        state.innerHorizontalPipeQty = 1
                        state.innerHorizontalPipe = '158SS40BK'
                        state.chainlinkSelvage = 'kt'
                    }
                    else if (state.height < 6) {
                        state.chainlinkSelvage = 'kk'
                    }
                }
                else if(state.color === 'brown') {
                    state.outerVerticalPipe = '158SS40BR'
                    state.outerHorizontalPipe = '158SS40BR'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkColor = "brown"
                    state.hingeType = "box"
                    state.latchType = "strongarm"
                    if (state.height > 5) {
                        state.innerHorizontalPipeQty = 1
                        state.innerHorizontalPipe = '158SS40BR'
                        state.chainlinkSelvage = 'kt'
                    }
                    else if (state.height < 6) {
                        state.chainlinkSelvage = 'kk'
                    }
                }
                else if(state.color === 'green') {
                    state.outerVerticalPipe = '158SS40GR'
                    state.outerHorizontalPipe = '158SS40GR'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkColor = "green"
                    state.hingeType = "box"
                    state.latchType = "strongarm"
                    if (state.height > 5) {
                        state.innerHorizontalPipeQty = 1
                        state.innerHorizontalPipe = '158SS40GR'
                        state.chainlinkSelvage = 'kt'
                    }
                    else if (state.height < 6) {
                        state.chainlinkSelvage = 'kk'
                    }
                }
            }
            else if (state.auto_calculate_bracing === "cantilever"){
                if (state.color === 'galvanized') {
                    state.outerVerticalPipe = '178SS40G'
                    state.outerHorizontalPipe = '238SS40G'
                    state.counterBalancePipe = '158SS20G'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkSelvage = "kk"
                    state.chainlinkColor = "galvanized"
                    state.hingeType = "rollers"
                    state.latchType = "cantileverLatch"
                    if (state.width/state.leaf < 8  ) {
                        state.innerVerticalPipeQty = 0
                        state.diaganolPipeQty = 0
                    }
                    else if (state.width/state.leaf < 16 ) {
                        state.innerVerticalPipeQty = 1
                        state.innerVerticalPipe = '158SS20G'
                        state.diaganolPipeQty = 1
                        state.diaganolPipe = '158SS20G'
                    }
                    else if (state.width/state.leaf < 24 ) {
                        state.innerVerticalPipeQty = 2
                        state.innerVerticalPipe = '158SS20G'
                        state.diaganolPipeQty = 2
                        state.diaganolPipe = '158SS20G'
                    }
                    else if (state.width/state.leaf < 32 ) {
                        state.innerVerticalPipeQty = 3
                        state.innerVerticalPipe = '158SS20G'
                        state.diaganolPipeQty = 3
                        state.diaganolPipe = '158SS20G'
                    }
                    else if (state.width/state.leaf < 40 ) {
                        state.innerVerticalPipeQty = 4
                        state.innerVerticalPipe = '158SS20G'
                        state.diaganolPipeQty = 4
                        state.diaganolPipe = '158SS20G'
                    }
                }
                else if(state.color === 'black') {
                    state.outerVerticalPipe = '178SS40BK'
                    state.outerHorizontalPipe = '238SS40BK'
                    state.counterBalancePipe = '158SS20BK'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkSelvage = "kk"
                    state.chainlinkColor = "black"
                    state.hingeType = "rollers"
                    state.latchType = "cantileverLatch"
                    if (state.width/state.leaf < 8  ) {
                        state.innerVerticalPipeQty = 0
                        state.diaganolPipeQty = 0
                    }
                    else if (state.width/state.leaf < 16 ) {
                        state.innerVerticalPipeQty = 1
                        state.innerVerticalPipe = '158SS20BK'
                        state.diaganolPipeQty = 1
                        state.diaganolPipe = '158SS20BK'
                    }
                    else if (state.width/state.leaf < 24 ) {
                        state.innerVerticalPipeQty = 2
                        state.innerVerticalPipe = '158SS20BK'
                        state.diaganolPipeQty = 2
                        state.diaganolPipe = '158SS20BK'
                    }
                    else if (state.width/state.leaf < 32 ) {
                        state.innerVerticalPipeQty = 3
                        state.innerVerticalPipe = '158SS20BK'
                        state.diaganolPipeQty = 3
                        state.diaganolPipe = '158SS20BK'
                    }
                    else if (state.width/state.leaf < 40 ) {
                        state.innerVerticalPipeQty = 4
                        state.innerVerticalPipe = '158SS20BK'
                        state.diaganolPipeQty = 4
                        state.diaganolPipe = '158SS20BK'
                    }
                }
                else if(state.color === 'brown') {
                    state.outerVerticalPipe = '178SS40BR'
                    state.outerHorizontalPipe = '238SS40BR'
                    state.counterBalancePipe = '158SS20BR'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkSelvage = "kk"
                    state.chainlinkColor = "brown"
                    state.hingeType = "rollers"
                    state.latchType = "cantileverLatch"
                    if (state.width/state.leaf < 8  ) {
                        state.innerVerticalPipeQty = 0
                        state.diaganolPipeQty = 0
                    }
                    else if (state.width/state.leaf < 16 ) {
                        state.innerVerticalPipeQty = 1
                        state.innerVerticalPipe = '158SS20BR'
                        state.diaganolPipeQty = 1
                        state.diaganolPipe = '158SS20BR'
                    }
                    else if (state.width/state.leaf < 24 ) {
                        state.innerVerticalPipeQty = 2
                        state.innerVerticalPipe = '158SS20BR'
                        state.diaganolPipeQty = 2
                        state.diaganolPipe = '158SS20BR'
                    }
                    else if (state.width/state.leaf < 32 ) {
                        state.innerVerticalPipeQty = 3
                        state.innerVerticalPipe = '158SS20BR'
                        state.diaganolPipeQty = 3
                        state.diaganolPipe = '158SS20BR'
                    }
                    else if (state.width/state.leaf < 40 ) {
                        state.innerVerticalPipeQty = 4
                        state.innerVerticalPipe = '158SS20BR'
                        state.diaganolPipeQty = 4
                        state.diaganolPipe = '158SS20BR'
                    }
                }
                else if(state.color === 'green') {
                    state.outerVerticalPipe = '178SS40GR'
                    state.outerHorizontalPipe = '238SS40GR'
                    state.counterBalancePipe = '158SS20GR'
                    state.chainlinkGauge = "2 x 9ga"
                    state.chainlinkSelvage = "kk"
                    state.chainlinkColor = "green"
                    state.hingeType = "rollers"
                    state.latchType = "cantileverLatch"
                    if (state.width/state.leaf < 8  ) {
                        state.innerVerticalPipeQty = 0
                        state.diaganolPipeQty = 0
                    }
                    else if (state.width/state.leaf < 16 ) {
                        state.innerVerticalPipeQty = 1
                        state.innerVerticalPipe = '158SS20GR'
                        state.diaganolPipeQty = 1
                        state.diaganolPipe = '158SS20GR'
                    }
                    else if (state.width/state.leaf < 24 ) {
                        state.innerVerticalPipeQty = 2
                        state.innerVerticalPipe = '158SS20GR'
                        state.diaganolPipeQty = 2
                        state.diaganolPipe = '158SS20GR'
                    }
                    else if (state.width/state.leaf < 32 ) {
                        state.innerVerticalPipeQty = 3
                        state.innerVerticalPipe = '158SS20GR'
                        state.diaganolPipeQty = 3
                        state.diaganolPipe = '158SS20GR'
                    }
                    else if (state.width/state.leaf < 40 ) {
                        state.innerVerticalPipeQty = 4
                        state.innerVerticalPipe = '158SS20GR'
                        state.diaganolPipeQty = 4
                        state.diaganolPipe = '158SS20GR'
                    }
                }
            }
        },
}

export default mutations