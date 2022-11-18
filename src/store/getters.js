import { getField } from 'vuex-map-fields';
import { Rect } from '@syncfusion/ej2-vue-diagrams';
import { decimalToFraction} from '../functions/functions.js'


let getters = {

    getField,

    //Identifiers: 
    selectedOuterVerticalPipe: state => {
        return state.pipes.find(pipe => pipe.product_id === state.outerVerticalPipe)
    },
    selectedOuterHorizontalPipe: state => {
        return state.pipes.find(pipe => pipe.product_id === state.outerHorizontalPipe)
    },
    selectedInnerVerticalPipe: state => {
        return state.pipes.find(pipe => pipe.product_id === state.outerVerticalPipe)
    },
    selectedInnerHorizontalPipe: state => {
        return state.pipes.find(pipe => pipe.product_id === state.outerHorizontalPipe)
    },
    gate: state => {
        return state.gate
    },

    //Quantities
    actualHeight: state => {
        let bw;
        if(state.barbwire === false) {
            bw = 0;
        }
        else {
            bw = 1;
        }
        if (state.gate_type === 'cantilever') {
            return (state.height - 1) * 12;
        }
        else {
            return (state.height + bw) * 12;
        }
        
    },
    
    outerVerticalPipeQty: (state, getters) => { 
        if (state.gate_type === 'cantilever') {
            let ovpq = decimalToFraction(getters.actualHeight - getters.cantileverHorizontalDeduct + 5.5)
            return ovpq
        }
        if (state.htT2T === true) {
            let ovpq = decimalToFraction(getters.actualHeight)
            return ovpq
        }
        else if (getters.selectedOuterVerticalPipe.diameter === "1-3/8") {
            let ovpq = decimalToFraction(getters.actualHeight - 1)
            return ovpq;
        }
        else {
            let ovpq = decimalToFraction(getters.actualHeight - 2)
            return ovpq; 
        }
    },

    outerVerticalPieces: state => {
        return state.leaf * 2
    },
    
    uprightDeduct: (state, getters) => {
        return getters.selectedOuterVerticalPipe.upright * getters.outerVerticalPieces
    },
    cantileverHorizontalDeduct: (state, getters) => {
        return getters.selectedOuterHorizontalPipe.upright * 2
    },

    horizontalDeduct: (state, getters) => {
        let topOuterHorizontalDeduct = 1.0;
        let bottomOuterHorizontalDeduct = .25;
        return getters.selectedOuterHorizontalPipe.upright * 2 + topOuterHorizontalDeduct + bottomOuterHorizontalDeduct
    },

    hingeDeduct: state => {
        if (state.gate_type === "cantilever") {
            return 0
        }
        else if (state.wdtT2T === true) {
            return 0
        }
        else if (state.hingeType === "bulldog") {
            return 1.75 * state.leaf
        }
        else {
            return 2.0 * state.leaf
        }
    },
    latchDeduct: state => {
        if (state.gate_type === "cantilever") {
            return 0
        }
        else if (state.wdtT2T === true) {
            return 0
        }
        else if (state.latchType === "fork/collar") {
            return 2.0
        }
        else if (state.latchType === "strongarm") {
            if (state.leaf == 1) {
                return 3.0
            } 
            else if (state.leaf == 2) {
                return 4.0
            }
        }
        else if (state.latchType === "droprod") {
            return 4.0
        }
        else if (state.latchType === "maxi") {
            return 1.0
        }
    },
    outerHorizontalPieces: state => {
        return state.leaf * 2
    },

    innerHorizontalPieces: state => {
        return state.leaf * state.innerHorizontalPipeQty
    },
    innerVerticalPieces: state => {
        return state.leaf * state.innerVerticalPipeQty
    },
    innerHorizontalPipeQty: (state, getters) => {
        if (state.innerHorizontalPipeQty > 0) {
            return getters.outerHorizontalPipeQty
        }
        else {
            return 0
        }
    },
    innerVerticalPipeQty: (state, getters) => {
        if (state.innerVerticalPipeQty > 0) {
            if (state.gate_type === 'cantilever') {
                let ivpq = decimalToFraction(getters.actualHeight - getters.cantileverHorizontalDeduct + 5.5)
                return ivpq
            }
            else {
                let ivpq = decimalToFraction(state.height * 12 - getters.horizontalDeduct)
                return ivpq
            }
        }
        else {
            return 0
        }
    },
    hingePieces: state => {
        return 2 * state.leaf
    },
    //Descriptions
    outerHorizontalPipeDescription: (state, getters) => {
        return getters.selectedOuterHorizontalPipe.name
    },
    outerVerticalPipeDescription: (state, getters) => {
        return getters.selectedOuterVerticalPipe.name
    },

    innerHorizontalPipeDescription: (state, getters) => {
        return getters.selectedInnerHorizontalPipe.name
    },
    innerVerticalPipeDescription: (state, getters) => {
        return getters.selectedInnerVerticalPipe.name 
    },

    outerHorizontalPipeQty: (state, getters) => {
        if (state.gate_type === "cantilever") {
            let ohpq = decimalToFraction(state.width * 12 / state.leaf * 1.5)
            return ohpq
        }
        else {
            let ohpq = decimalToFraction(((state.width * 12) - getters.hingeDeduct - getters.latchDeduct - getters.uprightDeduct)/state.leaf)
            return ohpq
        }
    },

    chainlinkDescription: state => {
        let chainlink = state.chainlinkGauge;
        let chainlinkHeight = Math.ceil(state.height)
        if (state.gate_type === 'cantilever') {
            chainlinkHeight = chainlinkHeight - 1
        }
        else {
            chainlinkHeight
        }
        return chainlink + " x " + chainlinkHeight + state.chainlinkSelvage.toUpperCase()
    },
    chainlinkQuantity: state => {
        return decimalToFraction(state.width * 12);
    },
    clColor: state => {
        return state.chainlinkColor.charAt(0).toUpperCase() + state.chainlinkColor.slice(1)
    },

    frameColor: state => {
        return state.color.charAt(0).toUpperCase() + state.color.slice(1)
    },

    gateMaterialItems: (state, getters) => {
        return [
            {id: "Chainlink", quantityCheck: state.width, description: getters.chainlinkDescription, color: getters.clColor, pieces: "N/A", quantity: getters.chainlinkQuantity.toString().concat(" ", "inches")}, 
            {id: "Outer Vertical Pipe", quantityCheck: getters.outerVerticalPieces, description: getters.outerVerticalPipeDescription, color: getters.frameColor, pieces: getters.outerVerticalPieces.toString().concat(" ", "pcs"), quantity: getters.outerVerticalPipeQty.toString().concat(" ", "inches")}, 
            {id: "Outer Horizontal Pipe", quantityCheck: getters.outerHorizontalPieces, description: getters.outerHorizontalPipeDescription, color: getters.frameColor, pieces: getters.outerHorizontalPieces.toString().concat(" ", "pcs"), quantity: getters.outerHorizontalPipeQty.toString().concat(" ", "inches")}, 
            {id: "Inner Vertical Pipe", quantityCheck: getters.innerVerticalPieces, description: getters.innerVerticalPipeDescription, color: getters.frameColor, pieces: getters.innerVerticalPieces.toString().concat(" ", "pcs"), quantity: getters.innerVerticalPipeQty.toString().concat(" ", "inches")}, 
            {id: "Inner Horizontal Pipe", quantityCheck: getters.innerHorizontalPieces, description: getters.innerHorizontalPipeDescription, color: getters.frameColor, pieces: getters.innerHorizontalPieces.toString().concat(" ", "pcs"), quantity: getters.innerHorizontalPipeQty.toString().concat(" ", "inches")},
            {id: "Hinge", quantityCheck: getters.hingePieces, description: getters.hingeDescription, color: getters.frameColor, pieces: getters.hingePieces.toString().concat(" ", "hinges"), quantity: " - "},
            {id: "Latch", quantityCheck: 1, description: getters.latchDescription, color: getters.frameColor, pieces: "1 Latch", quantity: " - "}
        ]
    },
    
    hingePieceDescription: (state, getters) => {
        let hingeString = getters.hingePieces.toString().concat(" ", "Hinges")
        return hingeString
    },
    hingeDescription: state => {
        if (state.hingeType == "male/female"){
            return "Male/Female Hinges"
        }
        else if (state.hingeType == "box"){
            return "Box Hinges"
        }
        else if (state.hingeType == "bulldog"){
            return "Bulldog Hinges"
        }
        else if (state.hingeType == "barrel"){
            return "Barrel Hinges"
        }
        else if (state.hingeType == "rollers"){
            return "Cantilever Rollers"
        }
    },
    latchDescription: state => {
        if (state.latchType == "fork/collar"){
            return "Fork Latch/Collar"
        }
        else if (state.latchType == "strongarm"){
            return "Strongarm Latch"
        }
        else if (state.latchType == "droprod"){
            return "Commercial Drop Rod"
        }
        else if (state.latchType == "maxi"){
            return "Maxi Latch"
        }
        else if (state.latchType == "cantileverLatch"){
            return "Cantilever Latch"
        }
    },
    cantileverPipePosition: (state, getters) => {
        let vert_list =[];
        let v = [];
        let first_post = .25;
        let end_post = 3.0;
        let ovp_od = 1.875;
        let ivp_od = 1.625;
        
        
        if (state.gate_type == "cantilever") {
            let slide_inches = state.width * 12 * 1.5;
            let width_inches = state.width * 12;
            if (state.leaf == 2){
                width_inches = width_inches/2
                slide_inches = slide_inches/2
            }
        
            let num_sections = getters.innerVerticalPieces + 1;
            let section_width = width_inches / num_sections;
            
            let first_post_oc = (first_post + ovp_od/2);
            
            vert_list = vert_list.concat(first_post_oc);

            for (var i=1; i <= num_sections; i++) {
                first_post += section_width 
                v = v.concat(first_post)
            }
             for (let i=0; i < v.length; i++){
                 v[i] = v[i] + ivp_od/2
                 vert_list = vert_list.concat(v[i])
            }
            
            let lastItem = vert_list[vert_list.length - 1]
             let counter_width = slide_inches - end_post - lastItem - ovp_od - ivp_od/2
             let cbmp = (lastItem+counter_width/2+ivp_od/2)
             vert_list = vert_list.concat(cbmp)
             console.log(cbmp)
             let cbep = (slide_inches - end_post - ovp_od/2)
             
             //cbep = decimalToFraction(cbep)
             console.log(cbep)
             vert_list = vert_list.concat(cbep)
             let cantileverPositions = vert_list.map(function(position) {
                return decimalToFraction(position)
            })
                return cantileverPositions
        }
    },
    // abc: (state, getters) => {
    //     let cantileverPositions = getters.cantileverPipePosition.map(function(position) {
    //         return decimalToFraction(position)
    //      })
    //      return cantileverPositions
    // },
    gateOutputList: (state, getters) => {
        return getters.gateMaterialItems.filter(function(item) {
            return item.quantityCheck > 0
        })
    },
    
    gateHeight: state => {
        let height = Math.ceil(state.height)
        if (height < 5){
            return height * 50
        }
        else if (height == 5){
            return 250
        }
        else if (height == 6){
            return 260
        }
        else if (height == 7){
            return 270
        }
        else if (height == 8){
            return 280
        }
         else if (height > 8){
             return 290
         }
        // else if (height == 10){
        //     return 300
        // }
        // else if (height == 11){
        //     return 310
        // }
        // else if (height == 12){
        //     return 320
        // }
        // else if (height == 13){
        //     return 330
        // }
        // else if (height == 14){
        //     return 340
        // }
        // else if (height == 15){
        //     return 350
        // }
        // else if (height == 16){
        //     return 360
        // }
        // else if (height == 17){
        //     return 370
        // }
        // else if (height == 18){
        //     return 380
        // }
        // else if (height == 19){
        //     return 390
        // }
        // else if (height >= 20){
        //     return 400
        // }   
        
    },
    gateWidth: (state) => {
        let width = Math.ceil(state.width)
        if (state.gate_type != 'cantilever') {
            if (width < 31) {
                return width * 40 
            }
            else if (width > 30) {
                return 1200
        }
    }
    else if (state.gate_type == 'cantilever'){
        if (width < 21) {
            return width * 60 
        }
        else if (width > 20) {
            return 1200
        }
    }
    },

    gateLayout: (state, getters) => {
        // if (state.gate_type != 'cantilever'){
            return {
                type: 'None',
                bounds: new Rect(0, 0, getters.gateWidth, getters.gateHeight),
            }
    
        // else if (state.gate_type == 'cantilever') {
        //     return {
        //         type: 'None',
        //         bounds: new Rect(0, 0, state.width * 60, getters.gateHeight),
        //     }
        // }
    },
    horizontalPath: state => {
        if(state.innerHorizontalPipeQty == 0) {
            return ''
        }
        else if(state.innerHorizontalPipeQty > 0){
            var coordsY='';
            var sections = Math.ceil(100/(state.innerHorizontalPipeQty + 1))
            if(state.leaf == 1){
                let i;
                for (i = 1; i <= state.innerHorizontalPipeQty; i++){
                    var y; 
                    y = (sections*i).toString()
                    coordsY += ' M0'+','+y+' L100'+','+ y;
                }
            return coordsY         
            }
            else if(state.leaf == 2){
                let i;
                for (i = 1; i <= state.innerHorizontalPipeQty; i++){
                    let y; 
                    y = (sections*i).toString()
                    if  (state.width < 9){
                        coordsY += ' M0'+','+y+' L48'+','+y+' M52'+','+y+' L100'+','+ y;
                    }
                    else if  (state.width > 9 && state.width < 14){
                        coordsY += ' M0'+','+y+' L48.5'+','+y+' M51.5'+','+y+' L100'+','+ y;
                    }
                    else if  (state.width > 13 && state.width < 19){
                        coordsY += ' M0'+','+y+' L49'+','+y+' M51'+','+y+' L100'+','+ y;
                    }
                    else if  (state.width > 18 && state.width < 25){
                        coordsY += ' M0'+','+y+' L49.25'+','+y+' M50.75'+','+y+' L100'+','+ y;
                    }
                    else if  (state.width > 24 && state.width < 39){
                        coordsY += ' M0'+','+y+' L49.5'+','+y+' M50.5'+','+y+' L100'+','+ y;
                    }
                    else if  (state.width > 38 && state.width < 60){
                        coordsY += ' M0'+','+y+' L49.65'+','+y+' M50.35'+','+y+' L100'+','+ y;
                    }
                    else if  (state.width >= 60){
                        coordsY += ' M0'+','+y+' L49.75'+','+y+' M50.25'+','+y+' L100'+','+ y;
                    }
                }

            return coordsY
                
            }
        }
    },
    verticalPath: state => {
        if (state.gate_type != "cantilever"){
            if(state.innerVerticalPipeQty == 0) {
                return ''
            }
            else if(state.innerVerticalPipeQty > 0){
                if(state.leaf == 1){
                    var coordsX='';
                    var sections = Math.ceil(100/(state.innerVerticalPipeQty + 1))
                    let i;
                    for (i = 1; i <= state.innerVerticalPipeQty; i++){
                        var x; 
                        x = (sections*i).toString()
                        coordsX += ' M'+x+',98'+' L'+x+',3';
                    }
                return coordsX         
                }
                else if(state.leaf == 2){
                    var coordsX1='';
                    var coordsX2='';
                    sections = Math.ceil(48/(state.innerVerticalPipeQty + 1))
                    let i;
                    for (i = 1; i <= state.innerVerticalPipeQty; i++){
                        x; 
                        x = (sections*i).toString()
                        coordsX1 += ' M'+x+',98'+' L'+x+',3';
                    }
                    for (i = 1; i <= state.innerVerticalPipeQty; i++){
                        var x1; 
                        x1 = (52 + (sections*i)).toString()
                        coordsX2 += ' M'+x1+',98'+' L'+x1+',3';
                    }
                return coordsX1.concat(coordsX2)
                    
                }
            }
        }
        else if (state.gate_type == "cantilever"){
            if(state.innerVerticalPipeQty == 0) {
                return ''
            }
            else if(state.innerVerticalPipeQty > 0){
                if(state.leaf == 1){
                    if(state.cantilever_opening_direction == 'right'){
                    coordsX='';
                    sections = Math.ceil(65.5/(state.innerVerticalPipeQty + 1))
                    let i;
                    for (i = 1; i <= state.innerVerticalPipeQty; i++){
                        let x; 
                        x = (sections*i).toString()
                        coordsX += ' M'+x+',100'+' L'+x+',0';
                    }
                return coordsX
                    }
                    else if(state.cantilever_opening_direction == 'left'){
                    coordsX='';
                    sections = Math.ceil(65.5/(state.innerVerticalPipeQty + 1))
                    let i;
                    for (i = 1; i <= state.innerVerticalPipeQty; i++){
                        let x; 
                        x = (34.5 + (sections*i)).toString();
                        coordsX += ' M'+x+',100'+' L'+x+',0';
                    }
                return coordsX
                    }

                }
                else if(state.leaf == 2){
                    coordsX1='';
                    coordsX2='';
                    sections = Math.ceil(32/(state.innerVerticalPipeQty + 1))
                    let i;
                    for (i = 1; i <= state.innerVerticalPipeQty; i++){
                        let x; 
                        x = (18 + (sections*i)).toString()
                        coordsX1 += ' M'+x+',100'+' L'+x+',0';
                    }
                    for (i = 1; i <= state.innerVerticalPipeQty; i++){
                        let x1; 
                        x1 = (52 + (sections*i)).toString()
                        coordsX2 += ' M'+x1+',100'+' L'+x1+',0';
                    }
                return coordsX1.concat(coordsX2)
                    
                }
            }
        }
    },
    diaganolPath: state => {
        if (state.diaganolPipe == false){
            return ''
        }
        else if (state.gate_type != "cantilever" && state.diaganolPipe == true){
            if(state.leaf == 1){
                if(state.innerVerticalPipeQty == 0) {
                    return 'M0,3 L100,98'
                }
                else if(state.innerVerticalPipeQty == 1){
                    return 'M0,3 L50,98 M50,3 L100,98'
                }
                else if(state.innerVerticalPipeQty == 2){
                    return 'M0,3 L34,98 M34,3 L68,98 M68,3 L100,98'
                }
                else if(state.innerVerticalPipeQty == 3){
                    return 'M0,3 L25,98 M25,3 L50,98 M50,3 L75,98 M75,3 L100,98'
                }
                else if(state.innerVerticalPipeQty == 4){
                    return 'M0,3 L20,98 M20,3 L40,98 M40,3 L60,98 M60,3 L80,98 M80,3 L100,98'
                }
                       
            }
            else if(state.leaf == 2){
                if(state.innerVerticalPipeQty == 0) {
                    return 'M0,3 L49.25,98 M50.75,3 L100,98'
                }
                else if(state.innerVerticalPipeQty == 1){
                    return 'M0,3 L24,98 M24,3 L49.25,98 M50.75,3 L76,98 M76,3 L100,98'
                }
                else if(state.innerVerticalPipeQty == 2){
                    return 'M0,3 L16,98 M16,3 L32,98 M32,3 L49.25,98 M50.75,3 L68,98 M68,3 L84,98 M84,3 L100,98'
                }
                else if(state.innerVerticalPipeQty == 3){
                    return 'M0,3 L12,98 M12,3 L24,98 M24,3 L36,98 M36,3 L49.25,98 M50.75,3 L64,98 M64,3 L76,98 M76,3 L88,98 M88,3 L100,98'
                }
                else if(state.innerVerticalPipeQty == 4){
                    return 'M0,3 L10,98 M10,3 L20,98 M20,3 L30,98 M30,3 L40,98 M40,3 L49.25,98 M50.75,3 L62,98 M62,3 L72,98 M72,3 L82,98 M82,3 L92,98 M92,3 L100,98'
                }
            }
        
        }
        else if (state.gate_type == "cantilever" && state.diaganolPipe == true){
            if(state.leaf == 1 && state.cantilever_opening_direction == 'right'){
                if(state.innerVerticalPipeQty == 0) {
                    return 'M.5,0 L65.5,100'
                }
                else if(state.innerVerticalPipeQty == 1){        
                    return 'M.5,0 L32.75,100 M32.75,0 L65.5,100'
                }
                else if(state.innerVerticalPipeQty == 2){        
                    return 'M.5,0 L22,100 M22,0 L44,100 M44,0 L65.5,100'
                }       
                else if(state.innerVerticalPipeQty == 3){        
                    return 'M.5,0 L17,100 M17,0 L34,100 M34,0 L51,100 M51,0 L65.5,100'
                }       
                else if(state.innerVerticalPipeQty == 4){        
                    return 'M.5,0 L14,100 M14,0 L28,100 M28,0 L42,100 M42,0 L56,100 M56,0 L65.5,100'
                }       

            }
            else if(state.leaf == 1 && state.cantilever_opening_direction == 'left'){
                if(state.innerVerticalPipeQty == 0) {
                    return 'M34.5,100 L99.5,0'
                }
                else if(state.innerVerticalPipeQty == 1){        
                    return 'M34.5,100 L67.5,0 M67.5,100 L99.5,0'
                }
                else if(state.innerVerticalPipeQty == 2){        
                    return 'M34.5,100 L56.5,0 M56.5,100 L78.5,0 M78.5,100 L99.5,0'
                }       
                else if(state.innerVerticalPipeQty == 3){        
                    return 'M34.5,100 L51.5,0 M51.5,100 L68.5,0 M68.5,100 L85.5,0 M85.5,100 L99.5,0'
                }       
                else if(state.innerVerticalPipeQty == 4){        
                    return 'M34.5,100 L48.5,0 M48.5,100 L62.5,0 M62.5,100 L76.5,0 M76.5,100 L90.5,0 M90.5,100 L99.5,0'
                }  
                }
            else if(state.leaf == 2){
                if(state.innerVerticalPipeQty == 0) {
                    return 'M50,0 L18,100 M51,0 L83,100'
                }
                else if(state.innerVerticalPipeQty == 1) {
                    return 'M50,0 L34,100 M34,0 L18,100 M51,0 L68,100 M68,0 L83,100'
                }
                else if(state.innerVerticalPipeQty == 2) {
                    return 'M50,0 L40,100 M40,0 L29,100 M29,0 L18,100 M51,0 L63,100 M63,0 L74,100 M74,0 L83,100'
                }
                else if(state.innerVerticalPipeQty == 3) {
                    return 'M50,0 L42,100 M42,0 L34,100 M34,0 L26,100 M26,0 L18,100  M51,0 L60,100 M60,0 L68,100 M68,0 L76,100 M76,0 L83,100'
                }
                else if(state.innerVerticalPipeQty == 4) {
                    return 'M50,0 L46,100 M46,0 L39,100 M39,0 L32,100 M32,0 L25,100 M25,0 L18,100  M51,0 L59,100 M59,0 L66,100 M66,0 L73,100 M73,0 L80,100 M80,0 L83,100'
                }
            }
        }
    },
    chainlinkDiamondsPerFt: state => {
        //purpose of this getter is to aesthically scale the # of chainlink diamonds to the height of the actual rectangle; 
        //given that I had to limit the height of the box in which the diagram image is rendered, as the gate height increases,
        //gate image must be condensed to accomodate the box limitations. As such, the number of diamonds needs to be reduced
        //so that the same amount of diamonds are not condensed into smaller frame
        let height = Math.ceil(state.height)
        if (height < 5) {
            return height * 6
        }
        else if (height == 5) {
            return height * 5
        }
        else if (height < 9) {
            return height * 4
        }
        else if (height < 14) {
            return height * 3
        }
        else if (height >= 14) {
            return height * 2
        }
        
    },
    
    chainlinkCoordinates: (state, getters) => (initialCoords) => {
        let coordsY = initialCoords.toString().split();
        let height = getters.chainlinkDiamondsPerFt; 
        let selvageCoords = [];
        let selvageTop = '';
        let selvageTopX;
        let selvageTopY = "-2";
        //the height represents the number of diamonds in each column and thus
        //dictates the number of loop iterations performed below 

        if (height % 2 != 0){
            height = height + 1
            }
             for (var i=0; i < height; i++){
         
               if (i % 2 == 0){
                   //if the loop iteration is even, follow the code below, 
                   //which takes the X coordinate and subtracts 5 and the Y
                   //coordinate and add 5. The coordinates are always presented
                   //as only one X,Y pair; Effectively, this draws a zig zag from
                   //top to bottom 
                 for (var l=0; l < initialCoords.length; l++) {
                   if(l % 2 != 0) {
                   initialCoords[l] = initialCoords[l] + 5;
                   } 
                   else if(l % 2 == 0) {
                   initialCoords[l] = initialCoords[l] - 5;
                   } 
                   }
                }
               else if (i % 2 != 0){
                   //if the loop iteration is odd, follow the code below, 
                   //which takes the X coordinate and adds 5 and the Y
                   //coordinate and adds 5. The coordinates are always presented
                   //as only one X,Y pair; the X coordinate always stays at 
                   //two positions, while the Y value increases until it reaches
                   //the bottom
                 for (let l=0; l < initialCoords.length; l++) {
                   if(l % 2 != 0) {
                   initialCoords[l] = initialCoords[l] + 5;
                   } 
                   else if(l % 2 == 0) {
                   initialCoords[l] = initialCoords[l] + 5;
                   } 
         
                   }
                   }
                   //after each column is completed, the results are added to the
                   //coordsY array and converted to a string
                coordsY = coordsY.concat(initialCoords.toString(' '));
                 }
         
             for (let i=0; i < height; i++){
                 //This follows the same pattern as the above loop, except that Y
                 //coordinate decreases until it reaches the top and the X coordinate
                 //goes back in forth between the outside and middle; Effectively, this 
                 //draws a zig zag from bottom to top to complete the diamond for each column 
               if (i % 2 == 0){
                 for (let l=0; l < initialCoords.length; l++) {
                   if(l % 2 != 0) {
                   initialCoords[l] = initialCoords[l] - 5;
                   } 
                   else if(l % 2 == 0) {
                   initialCoords[l] = initialCoords[l] + 5;
                   } 
                   }
                }
               else if (i % 2 != 0){
                 for (let l=0; l < initialCoords.length; l++) {
                   if(l % 2 != 0) {
                   initialCoords[l] = initialCoords[l] - 5;
                   } 
                   else if(l % 2 == 0) {
                   initialCoords[l] = initialCoords[l] - 5;
                   } 
         
                   }
                   }
                coordsY = coordsY.concat(initialCoords.toString(' '));
                
                 }
                 for (let i=0; i < coordsY.length; i++) {
                    //The first item in the array is always the starting point
                    //Syncfusion labels the starting point with a 'M' and every
                    //'L' represents a line that is drawn with the number after 
                    //the 'L' being the termination point for that particular line
                    if (i==0){
                    
                        coordsY[i] = "M".concat(coordsY[i]);
                        
                }
                    else {
                     coordsY[i] = "L".concat(coordsY[i]);
                     }
                }
                if (state.chainlinkSelvage == 'kt') {
                    selvageCoords = selvageCoords.concat(coordsY[0]);
                    selvageTopX = initialCoords[0];
                    selvageTop = "L" + selvageTopX.toString() + ', ' + selvageTopY;                    
                    selvageTop = selvageTop.split();
                    selvageCoords = selvageCoords.concat(selvageTop);
                    coordsY = coordsY.concat(selvageCoords);
            }
                return coordsY;
    },

    chainlinkPath: (state, getters) => {
        let width = Math.ceil(state.width) * 3; 
        let coordinatesXY = [];
        let initialCoords = []; 
        
        if (width % 2 != 0){
            width = width + 1
        }
        if (state.leaf == 1){
            for (var i=0; i < width; i++){
                if (i == 0){
                    
                    initialCoords = [5,0];
                }
                
                else {
                    initialCoords[0] = initialCoords[0] + 10;
                }

                coordinatesXY = coordinatesXY.concat(getters.chainlinkCoordinates(initialCoords)); 
                
                
                
            }
        
          coordinatesXY = coordinatesXY.join(' ');
        
        return coordinatesXY; 
        }
        else if (state.leaf == 2){

            for (let i=0; i < width; i++){
                if (i == 0){
                    initialCoords = [5,0];
                }
                else if (i == Math.ceil(width/2)) {
                    initialCoords[0] = initialCoords[0] + 20;
                }
                else {

                    initialCoords[0] = initialCoords[0] + 10;
                }

                coordinatesXY = coordinatesXY.concat(getters.chainlinkCoordinates(initialCoords)); 
            }
            coordinatesXY = coordinatesXY.join(' ');
            
        return coordinatesXY; 
        }
        
    },
    // archPath: state => {
    //     if (state.gate_type != "archTop"){
    //         return ''
    //     }
    //     else if (state.gate_type == "archTop"){ 
    //         if (state.leaf == 1) { 
    //             return 'M0,14 Q50,0 100,14' 
    //         }
    //         else if (state.leaf == 2){
    //             return 'M0,14 Q24,0 48,14 M50,14 Q76,0 100,14' 
    //         }
    //     }
    // },
    framePath: (state, getters ) => {
        if (state.gate_type != "cantilever"){ 
            if (state.leaf == 1) { 
                return 'M0,100 L0,0 M0,98 L100,98 M100,100 L100,0 M100,3 L0,3 '.concat(getters.horizontalPath).concat(getters.verticalPath).concat(state.hingeRingPath).concat(getters.diaganolPath)
            }
            else if (state.leaf == 2) {
                if (state.width < 9){
                    return 'M0,100 L0,0 M0,98 L48,98 M52,98 L100,98 M100,100 L100,0 M100,3 L52,3 M48,3 L0,3 M52,0 L52,100 M48,0 L48,100 '.concat(getters.horizontalPath).concat(getters.verticalPath).concat(state.hingeRingPath).concat(getters.diaganolPath)
                }
                else if (state.width > 8 && state.width < 14) {
                    return 'M0,100 L0,0 M0,98 L48.5,98 M51.5,98 L100,98 M100,100 L100,0 M100,3 L51.5,3 M48.5,3 L0,3 M51.5,0 L51.5,100 M48.5,0 L48.5,100 '.concat(getters.horizontalPath).concat(getters.verticalPath).concat(state.hingeRingPath).concat(getters.diaganolPath)
                    
                }
                else if (state.width > 13 && state.width < 19) {
                    return 'M0,100 L0,0 M0,98 L49,98 M51,98 L100,98 M100,100 L100,0 M100,3 L51,3 M49,3 L0,3 M51,0 L51,100 M49,0 L49,100 '.concat(getters.horizontalPath).concat(getters.verticalPath).concat(state.hingeRingPath).concat(getters.diaganolPath)
                    
                }
                else if (state.width > 18 && state.width < 25) {
                    return 'M0,100 L0,0 M0,98 L49.25,98 M50.75,98 L100,98 M100,100 L100,0 M100,3 L50.75,3 M49.25,3 L0,3 M50.75,0 L50.75,100 M49.25,0 L49.25,100 '.concat(getters.horizontalPath).concat(getters.verticalPath).concat(state.hingeRingPath).concat(getters.diaganolPath)
                    
                }
                else if (state.width > 24 && state.width < 39) {
                    return 'M0,100 L0,0 M0,98 L49.5,98 M50.5,98 L100,98 M100,100 L100,0 M100,3 L50.5,3 M49.5,3 L0,3 M50.5,0 L50.5,100 M49.5,0 L49.5,100 '.concat(getters.horizontalPath).concat(getters.verticalPath).concat(state.hingeRingPath).concat(getters.diaganolPath)
                    
                }
                else if (state.width > 38 && state.width < 60) {
                    return 'M0,100 L0,0 M0,98 L49.65,98 M50.35,98 L100,98 M100,100 L100,0 M100,3 L50.35,3 M49.65,3 L0,3 M50.35,0 L50.35,100 M49.65,0 L49.65,100 '.concat(getters.horizontalPath).concat(getters.verticalPath).concat(state.hingeRingPath).concat(getters.diaganolPath)
                    
                }
                else if (state.width >= 60) {
                    return 'M0,100 L0,0 M0,98 L49.75,98 M50.25,98 L100,98 M100,100 L100,0 M100,3 L50.25,3 M49.75,3 L0,3 M50.25,0 L50.25,100 M49.75,0 L49.75,100 '.concat(getters.horizontalPath).concat(getters.verticalPath).concat(state.hingeRingPath).concat(getters.diaganolPath)
                    
                }
            }
        }
        else if(state.gate_type == 'cantilever') {
            if (state.leaf == 1) {
                if (state.cantilever_opening_direction == 'right'){ 
                return 'M0,0 L100,0 M0,100 L100,100 M.5,0 L.5,100 M99,0 L99,100 M65.5,0 L65.5,100 M65.5,50 L99,50 M82,0 L82,100 M99,0 L65.5,100 M99,100 L65.5,0 '.concat(getters.verticalPath).concat(getters.diaganolPath)
            }
                if (state.cantilever_opening_direction == 'left'){ 
                return 'M0,0 L100,0 M0,100 L100,100 M1,0 L1,100 M99.5,0 L99.5,100 M34.5,0 L34.5,100 M34.5,50 L1,50 M18,0 L18,100 M1,0 L34.5,100 M1,100 L34.5,0 '.concat(getters.verticalPath).concat(getters.diaganolPath)
            }
        }
            else if (state.leaf == 2) {
                if (state.width < 20){
                    return 'M0,0 L50.25,0 M0,100 L50.25,100 M50.75,0 L100,0 M50.75,100 L100,100 M99,0 L99,100 M51.25,0 L51.25,100 M49.75,0 L49.75,100 M1,0 L1,100 M18,0 L18,100 M83,0 L83,100 M18,50 L1,50 M83,50 L99,50 M1,0 L18,100 M1,100 L18,0 M83,0 L99,100 M83,100 L99,0 '.concat(getters.verticalPath).concat(getters.diaganolPath)
                }
                else if (state.width > 19){
                    return 'M0,0 L50.5,0 M0,100 L50.5,100 M50.65,0 L100,0 M50.65,100 L100,100 M99,0 L99,100 M50.90,0 L50.9,100 M50.25,0 L50.25,100 M1,0 L1,100 M18,0 L18,100 M83,0 L83,100 M18,50 L1,50 M83,50 L99,50 M1,0 L18,100 M1,100 L18,0 M83,0 L99,100 M83,100 L99,0 '.concat(getters.verticalPath).concat(getters.diaganolPath)
                }
        }
    }
    },
    
    barbwirePath: state => {
        if (state.barbwire == false){
            return ''
        }
        if (state.gate_type !== 'cantilever'){
            if (state.leaf == 1) {
                
                    return 'M0,0 L0,14 M100,0 L100,14 M0,1 L100,1 M0,6 L100,6 M0,11 L100,11   M4.5,0 L5.5,2 M5.5,0 L4.5,2 M9.5,0 L10.5,2 M10.5,0 L9.5,2 M14.5,0 L15.5,2 M15.5,0 L14.5,2 M19.5,0 L20.5,2 M20.5,0 L19.5,2  M24.5,0 L25.5,2 M25.5,0 L24.5,2  M29.5,0 L30.5,2 M30.5,0 L29.5,2  M34.5,0 L35.5,2 M35.5,0 L34.5,2  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M49.5,0 L50.5,2 M50.5,0 L49.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2  M64.5,0 L65.5,2 M65.5,0 L64.5,2  M69.5,0 L70.5,2 M70.5,0 L69.5,2  M74.5,0 L75.5,2 M75.5,0 L74.5,2  M79.5,0 L80.5,2 M80.5,0 L79.5,2  M84.5,0 L85.5,2 M85.5,0 L84.5,2  M89.5,0 L90.5,2 M90.5,0 L89.5,2  M94.5,0 L95.5,2 M95.5,0 L94.5,2  M4.5,5 L5.5,7 M5.5,5 L4.5,7 M9.5,5 L10.5,7 M10.5,5 L9.5,7 M14.5,5 L15.5,7 M15.5,5 L14.5,7 M19.5,5 L20.5,7 M20.5,5 L19.5,7  M24.5,5 L25.5,7 M25.5,5 L24.5,7  M29.5,5 L30.5,7 M30.5,5 L29.5,7  M34.5,5 L35.5,7 M35.5,5 L34.5,7  M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7  M49.5,5 L50.5,7 M50.5,5 L49.5,7  M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7  M64.5,5 L65.5,7 M65.5,5 L64.5,7  M69.5,5 L70.5,7 M70.5,5 L69.5,7  M74.5,5 L75.5,7 M75.5,5 L74.5,7  M79.5,5 L80.5,7 M80.5,5 L79.5,7  M84.5,5 L85.5,7 M85.5,5 L84.5,7  M89.5,5 L90.5,7 M90.5,5 L89.5,7  M94.5,5 L95.5,7 M95.5,5 L94.5,7  M4.5,10 L5.5,12 M5.5,10 L4.5,12 M9.5,10 L10.5,12 M10.5,10 L9.5,12 M14.5,10 L15.5,12 M15.5,10 L14.5,12 M19.5,10 L20.5,12 M20.5,10 L19.5,12  M24.5,10 L25.5,12 M25.5,10 L24.5,12  M29.5,10 L30.5,12 M30.5,10 L29.5,12  M34.5,10 L35.5,12 M35.5,10 L34.5,12  M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M49.5,10 L50.5,12 M50.5,10 L49.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12  M64.5,10 L65.5,12 M65.5,10 L64.5,12  M69.5,10 L70.5,12 M70.5,10 L69.5,12  M74.5,10 L75.5,12 M75.5,10 L74.5,12  M79.5,10 L80.5,12 M80.5,10 L79.5,12  M84.5,10 L85.5,12 M85.5,10 L84.5,12  M89.5,10 L90.5,12 M90.5,10 L89.5,12  M94.5,10 L95.5,12 M95.5,10 L94.5,12'
                    
                }

            else if (state.leaf == 2) {
                if (state.width < 9){
                    return 'M0,0 L0,14 M48,0 L48,14 M52,0 L52,14 M100,0 L100,14 M0,1 L48,1 M52,1 L100,1 M0,6 L48,6 M52,6 L100,6 M0,11 L48,11 M52,11 L100,11  M4.5,0 L5.5,2 M5.5,0 L4.5,2 M9.5,0 L10.5,2 M10.5,0 L9.5,2 M14.5,0 L15.5,2 M15.5,0 L14.5,2 M19.5,0 L20.5,2 M20.5,0 L19.5,2  M24.5,0 L25.5,2 M25.5,0 L24.5,2  M29.5,0 L30.5,2 M30.5,0 L29.5,2  M34.5,0 L35.5,2 M35.5,0 L34.5,2  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2  M64.5,0 L65.5,2 M65.5,0 L64.5,2  M69.5,0 L70.5,2 M70.5,0 L69.5,2  M74.5,0 L75.5,2 M75.5,0 L74.5,2  M79.5,0 L80.5,2 M80.5,0 L79.5,2  M84.5,0 L85.5,2 M85.5,0 L84.5,2  M89.5,0 L90.5,2 M90.5,0 L89.5,2  M94.5,0 L95.5,2 M95.5,0 L94.5,2  M4.5,5 L5.5,7 M5.5,5 L4.5,7 M9.5,5 L10.5,7 M10.5,5 L9.5,7 M14.5,5 L15.5,7 M15.5,5 L14.5,7 M19.5,5 L20.5,7 M20.5,5 L19.5,7  M24.5,5 L25.5,7 M25.5,5 L24.5,7  M29.5,5 L30.5,7 M30.5,5 L29.5,7  M34.5,5 L35.5,7 M35.5,5 L34.5,7  M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7   M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7  M64.5,5 L65.5,7 M65.5,5 L64.5,7  M69.5,5 L70.5,7 M70.5,5 L69.5,7  M74.5,5 L75.5,7 M75.5,5 L74.5,7  M79.5,5 L80.5,7 M80.5,5 L79.5,7  M84.5,5 L85.5,7 M85.5,5 L84.5,7  M89.5,5 L90.5,7 M90.5,5 L89.5,7  M94.5,5 L95.5,7 M95.5,5 L94.5,7  M4.5,10 L5.5,12 M5.5,10 L4.5,12 M9.5,10 L10.5,12 M10.5,10 L9.5,12 M14.5,10 L15.5,12 M15.5,10 L14.5,12 M19.5,10 L20.5,12 M20.5,10 L19.5,12  M24.5,10 L25.5,12 M25.5,10 L24.5,12  M29.5,10 L30.5,12 M30.5,10 L29.5,12  M34.5,10 L35.5,12 M35.5,10 L34.5,12  M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12  M64.5,10 L65.5,12 M65.5,10 L64.5,12  M69.5,10 L70.5,12 M70.5,10 L69.5,12  M74.5,10 L75.5,12 M75.5,10 L74.5,12  M79.5,10 L80.5,12 M80.5,10 L79.5,12  M84.5,10 L85.5,12 M85.5,10 L84.5,12  M89.5,10 L90.5,12 M90.5,10 L89.5,12  M94.5,10 L95.5,12 M95.5,10 L94.5,12'
                }
                else if (state.width > 8 && state.width < 14) {
                    return 'M0,0 L0,14 M48.5,0 L48.5,14 M51.5,0 L51.5,14 M100,0 L100,14 M0,1 L48.5,1 M51.5,1 L100,1 M0,6 L48.5,6 M51.5,6 L100,6 M0,11 L48.5,11 M51.5,11 L100,11  M4.5,0 L5.5,2 M5.5,0 L4.5,2 M9.5,0 L10.5,2 M10.5,0 L9.5,2 M14.5,0 L15.5,2 M15.5,0 L14.5,2 M19.5,0 L20.5,2 M20.5,0 L19.5,2  M24.5,0 L25.5,2 M25.5,0 L24.5,2  M29.5,0 L30.5,2 M30.5,0 L29.5,2  M34.5,0 L35.5,2 M35.5,0 L34.5,2  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2  M64.5,0 L65.5,2 M65.5,0 L64.5,2  M69.5,0 L70.5,2 M70.5,0 L69.5,2  M74.5,0 L75.5,2 M75.5,0 L74.5,2  M79.5,0 L80.5,2 M80.5,0 L79.5,2  M84.5,0 L85.5,2 M85.5,0 L84.5,2  M89.5,0 L90.5,2 M90.5,0 L89.5,2  M94.5,0 L95.5,2 M95.5,0 L94.5,2  M4.5,5 L5.5,7 M5.5,5 L4.5,7 M9.5,5 L10.5,7 M10.5,5 L9.5,7 M14.5,5 L15.5,7 M15.5,5 L14.5,7 M19.5,5 L20.5,7 M20.5,5 L19.5,7  M24.5,5 L25.5,7 M25.5,5 L24.5,7  M29.5,5 L30.5,7 M30.5,5 L29.5,7  M34.5,5 L35.5,7 M35.5,5 L34.5,7  M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7   M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7  M64.5,5 L65.5,7 M65.5,5 L64.5,7  M69.5,5 L70.5,7 M70.5,5 L69.5,7  M74.5,5 L75.5,7 M75.5,5 L74.5,7  M79.5,5 L80.5,7 M80.5,5 L79.5,7  M84.5,5 L85.5,7 M85.5,5 L84.5,7  M89.5,5 L90.5,7 M90.5,5 L89.5,7  M94.5,5 L95.5,7 M95.5,5 L94.5,7  M4.5,10 L5.5,12 M5.5,10 L4.5,12 M9.5,10 L10.5,12 M10.5,10 L9.5,12 M14.5,10 L15.5,12 M15.5,10 L14.5,12 M19.5,10 L20.5,12 M20.5,10 L19.5,12  M24.5,10 L25.5,12 M25.5,10 L24.5,12  M29.5,10 L30.5,12 M30.5,10 L29.5,12  M34.5,10 L35.5,12 M35.5,10 L34.5,12  M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12  M64.5,10 L65.5,12 M65.5,10 L64.5,12  M69.5,10 L70.5,12 M70.5,10 L69.5,12  M74.5,10 L75.5,12 M75.5,10 L74.5,12  M79.5,10 L80.5,12 M80.5,10 L79.5,12  M84.5,10 L85.5,12 M85.5,10 L84.5,12  M89.5,10 L90.5,12 M90.5,10 L89.5,12  M94.5,10 L95.5,12 M95.5,10 L94.5,12'
                }
                else if (state.width > 13 && state.width < 19) {
                    return 'M0,0 L0,14 M49,0 L49,14 M51,0 L51,14 M100,0 L100,14 M0,1 L49,1 M51,1 L100,1 M0,6 L49,6 M51,6 L100,6 M0,11 L49,11 M51,11 L100,11  M4.5,0 L5.5,2 M5.5,0 L4.5,2 M9.5,0 L10.5,2 M10.5,0 L9.5,2 M14.5,0 L15.5,2 M15.5,0 L14.5,2 M19.5,0 L20.5,2 M20.5,0 L19.5,2  M24.5,0 L25.5,2 M25.5,0 L24.5,2  M29.5,0 L30.5,2 M30.5,0 L29.5,2  M34.5,0 L35.5,2 M35.5,0 L34.5,2  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2  M64.5,0 L65.5,2 M65.5,0 L64.5,2  M69.5,0 L70.5,2 M70.5,0 L69.5,2  M74.5,0 L75.5,2 M75.5,0 L74.5,2  M79.5,0 L80.5,2 M80.5,0 L79.5,2  M84.5,0 L85.5,2 M85.5,0 L84.5,2  M89.5,0 L90.5,2 M90.5,0 L89.5,2  M94.5,0 L95.5,2 M95.5,0 L94.5,2  M4.5,5 L5.5,7 M5.5,5 L4.5,7 M9.5,5 L10.5,7 M10.5,5 L9.5,7 M14.5,5 L15.5,7 M15.5,5 L14.5,7 M19.5,5 L20.5,7 M20.5,5 L19.5,7  M24.5,5 L25.5,7 M25.5,5 L24.5,7  M29.5,5 L30.5,7 M30.5,5 L29.5,7  M34.5,5 L35.5,7 M35.5,5 L34.5,7  M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7   M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7  M64.5,5 L65.5,7 M65.5,5 L64.5,7  M69.5,5 L70.5,7 M70.5,5 L69.5,7  M74.5,5 L75.5,7 M75.5,5 L74.5,7  M79.5,5 L80.5,7 M80.5,5 L79.5,7  M84.5,5 L85.5,7 M85.5,5 L84.5,7  M89.5,5 L90.5,7 M90.5,5 L89.5,7  M94.5,5 L95.5,7 M95.5,5 L94.5,7  M4.5,10 L5.5,12 M5.5,10 L4.5,12 M9.5,10 L10.5,12 M10.5,10 L9.5,12 M14.5,10 L15.5,12 M15.5,10 L14.5,12 M19.5,10 L20.5,12 M20.5,10 L19.5,12  M24.5,10 L25.5,12 M25.5,10 L24.5,12  M29.5,10 L30.5,12 M30.5,10 L29.5,12  M34.5,10 L35.5,12 M35.5,10 L34.5,12  M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12  M64.5,10 L65.5,12 M65.5,10 L64.5,12  M69.5,10 L70.5,12 M70.5,10 L69.5,12  M74.5,10 L75.5,12 M75.5,10 L74.5,12  M79.5,10 L80.5,12 M80.5,10 L79.5,12  M84.5,10 L85.5,12 M85.5,10 L84.5,12  M89.5,10 L90.5,12 M90.5,10 L89.5,12  M94.5,10 L95.5,12 M95.5,10 L94.5,12'
                
                }
                else if (state.width > 18 && state.width < 25) {
                    return 'M0,0 L0,14 M49.25,0 L49.25,14 M50.75,0 L50.75,14 M100,0 L100,14 M0,1 L49.25,1 M50.75,1 L100,1 M0,6 L49.25,6 M50.75,6 L100,6 M0,11 L49.25,11 M50.75,11 L100,11  M4.5,0 L5.5,2 M5.5,0 L4.5,2 M9.5,0 L10.5,2 M10.5,0 L9.5,2 M14.5,0 L15.5,2 M15.5,0 L14.5,2 M19.5,0 L20.5,2 M20.5,0 L19.5,2  M24.5,0 L25.5,2 M25.5,0 L24.5,2  M29.5,0 L30.5,2 M30.5,0 L29.5,2  M34.5,0 L35.5,2 M35.5,0 L34.5,2  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2  M64.5,0 L65.5,2 M65.5,0 L64.5,2  M69.5,0 L70.5,2 M70.5,0 L69.5,2  M74.5,0 L75.5,2 M75.5,0 L74.5,2  M79.5,0 L80.5,2 M80.5,0 L79.5,2  M84.5,0 L85.5,2 M85.5,0 L84.5,2  M89.5,0 L90.5,2 M90.5,0 L89.5,2  M94.5,0 L95.5,2 M95.5,0 L94.5,2  M4.5,5 L5.5,7 M5.5,5 L4.5,7 M9.5,5 L10.5,7 M10.5,5 L9.5,7 M14.5,5 L15.5,7 M15.5,5 L14.5,7 M19.5,5 L20.5,7 M20.5,5 L19.5,7  M24.5,5 L25.5,7 M25.5,5 L24.5,7  M29.5,5 L30.5,7 M30.5,5 L29.5,7  M34.5,5 L35.5,7 M35.5,5 L34.5,7  M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7   M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7  M64.5,5 L65.5,7 M65.5,5 L64.5,7  M69.5,5 L70.5,7 M70.5,5 L69.5,7  M74.5,5 L75.5,7 M75.5,5 L74.5,7  M79.5,5 L80.5,7 M80.5,5 L79.5,7  M84.5,5 L85.5,7 M85.5,5 L84.5,7  M89.5,5 L90.5,7 M90.5,5 L89.5,7  M94.5,5 L95.5,7 M95.5,5 L94.5,7  M4.5,10 L5.5,12 M5.5,10 L4.5,12 M9.5,10 L10.5,12 M10.5,10 L9.5,12 M14.5,10 L15.5,12 M15.5,10 L14.5,12 M19.5,10 L20.5,12 M20.5,10 L19.5,12  M24.5,10 L25.5,12 M25.5,10 L24.5,12  M29.5,10 L30.5,12 M30.5,10 L29.5,12  M34.5,10 L35.5,12 M35.5,10 L34.5,12  M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12  M64.5,10 L65.5,12 M65.5,10 L64.5,12  M69.5,10 L70.5,12 M70.5,10 L69.5,12  M74.5,10 L75.5,12 M75.5,10 L74.5,12  M79.5,10 L80.5,12 M80.5,10 L79.5,12  M84.5,10 L85.5,12 M85.5,10 L84.5,12  M89.5,10 L90.5,12 M90.5,10 L89.5,12  M94.5,10 L95.5,12 M95.5,10 L94.5,12'
                }
                else if (state.width > 24 && state.width < 39) {
                    return 'M0,0 L0,14 M49.5,0 L49.5,14 M50.5,0 L50.5,14 M100,0 L100,14 M0,1 L49.5,1 M50.5,1 L100,1 M0,6 L49.5,6 M50.5,6 L100,6 M0,11 L49.5,11 M50.5,11 L100,11  M4.5,0 L5.5,2 M5.5,0 L4.5,2 M9.5,0 L10.5,2 M10.5,0 L9.5,2 M14.5,0 L15.5,2 M15.5,0 L14.5,2 M19.5,0 L20.5,2 M20.5,0 L19.5,2  M24.5,0 L25.5,2 M25.5,0 L24.5,2  M29.5,0 L30.5,2 M30.5,0 L29.5,2  M34.5,0 L35.5,2 M35.5,0 L34.5,2  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2  M64.5,0 L65.5,2 M65.5,0 L64.5,2  M69.5,0 L70.5,2 M70.5,0 L69.5,2  M74.5,0 L75.5,2 M75.5,0 L74.5,2  M79.5,0 L80.5,2 M80.5,0 L79.5,2  M84.5,0 L85.5,2 M85.5,0 L84.5,2  M89.5,0 L90.5,2 M90.5,0 L89.5,2  M94.5,0 L95.5,2 M95.5,0 L94.5,2  M4.5,5 L5.5,7 M5.5,5 L4.5,7 M9.5,5 L10.5,7 M10.5,5 L9.5,7 M14.5,5 L15.5,7 M15.5,5 L14.5,7 M19.5,5 L20.5,7 M20.5,5 L19.5,7  M24.5,5 L25.5,7 M25.5,5 L24.5,7  M29.5,5 L30.5,7 M30.5,5 L29.5,7  M34.5,5 L35.5,7 M35.5,5 L34.5,7  M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7   M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7  M64.5,5 L65.5,7 M65.5,5 L64.5,7  M69.5,5 L70.5,7 M70.5,5 L69.5,7  M74.5,5 L75.5,7 M75.5,5 L74.5,7  M79.5,5 L80.5,7 M80.5,5 L79.5,7  M84.5,5 L85.5,7 M85.5,5 L84.5,7  M89.5,5 L90.5,7 M90.5,5 L89.5,7  M94.5,5 L95.5,7 M95.5,5 L94.5,7  M4.5,10 L5.5,12 M5.5,10 L4.5,12 M9.5,10 L10.5,12 M10.5,10 L9.5,12 M14.5,10 L15.5,12 M15.5,10 L14.5,12 M19.5,10 L20.5,12 M20.5,10 L19.5,12  M24.5,10 L25.5,12 M25.5,10 L24.5,12  M29.5,10 L30.5,12 M30.5,10 L29.5,12  M34.5,10 L35.5,12 M35.5,10 L34.5,12  M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12  M64.5,10 L65.5,12 M65.5,10 L64.5,12  M69.5,10 L70.5,12 M70.5,10 L69.5,12  M74.5,10 L75.5,12 M75.5,10 L74.5,12  M79.5,10 L80.5,12 M80.5,10 L79.5,12  M84.5,10 L85.5,12 M85.5,10 L84.5,12  M89.5,10 L90.5,12 M90.5,10 L89.5,12  M94.5,10 L95.5,12 M95.5,10 L94.5,12'
                }
                else if (state.width > 38 && state.width < 60) {
                    return 'M0,0 L0,14 M49.65,0 L49.65,14 M50.35,0 L50.35,14 M100,0 L100,14 M0,1 L49.65,1 M50.35,1 L100,1 M0,6 L49.65,6 M50.35,6 L100,6 M0,11 L49.65,11 M50.35,11 L100,11  M4.5,0 L5.5,2 M5.5,0 L4.5,2 M9.5,0 L10.5,2 M10.5,0 L9.5,2 M14.5,0 L15.5,2 M15.5,0 L14.5,2 M19.5,0 L20.5,2 M20.5,0 L19.5,2  M24.5,0 L25.5,2 M25.5,0 L24.5,2  M29.5,0 L30.5,2 M30.5,0 L29.5,2  M34.5,0 L35.5,2 M35.5,0 L34.5,2  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2  M64.5,0 L65.5,2 M65.5,0 L64.5,2  M69.5,0 L70.5,2 M70.5,0 L69.5,2  M74.5,0 L75.5,2 M75.5,0 L74.5,2  M79.5,0 L80.5,2 M80.5,0 L79.5,2  M84.5,0 L85.5,2 M85.5,0 L84.5,2  M89.5,0 L90.5,2 M90.5,0 L89.5,2  M94.5,0 L95.5,2 M95.5,0 L94.5,2  M4.5,5 L5.5,7 M5.5,5 L4.5,7 M9.5,5 L10.5,7 M10.5,5 L9.5,7 M14.5,5 L15.5,7 M15.5,5 L14.5,7 M19.5,5 L20.5,7 M20.5,5 L19.5,7  M24.5,5 L25.5,7 M25.5,5 L24.5,7  M29.5,5 L30.5,7 M30.5,5 L29.5,7  M34.5,5 L35.5,7 M35.5,5 L34.5,7  M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7   M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7  M64.5,5 L65.5,7 M65.5,5 L64.5,7  M69.5,5 L70.5,7 M70.5,5 L69.5,7  M74.5,5 L75.5,7 M75.5,5 L74.5,7  M79.5,5 L80.5,7 M80.5,5 L79.5,7  M84.5,5 L85.5,7 M85.5,5 L84.5,7  M89.5,5 L90.5,7 M90.5,5 L89.5,7  M94.5,5 L95.5,7 M95.5,5 L94.5,7  M4.5,10 L5.5,12 M5.5,10 L4.5,12 M9.5,10 L10.5,12 M10.5,10 L9.5,12 M14.5,10 L15.5,12 M15.5,10 L14.5,12 M19.5,10 L20.5,12 M20.5,10 L19.5,12  M24.5,10 L25.5,12 M25.5,10 L24.5,12  M29.5,10 L30.5,12 M30.5,10 L29.5,12  M34.5,10 L35.5,12 M35.5,10 L34.5,12  M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12  M64.5,10 L65.5,12 M65.5,10 L64.5,12  M69.5,10 L70.5,12 M70.5,10 L69.5,12  M74.5,10 L75.5,12 M75.5,10 L74.5,12  M79.5,10 L80.5,12 M80.5,10 L79.5,12  M84.5,10 L85.5,12 M85.5,10 L84.5,12  M89.5,10 L90.5,12 M90.5,10 L89.5,12  M94.5,10 L95.5,12 M95.5,10 L94.5,12'
                }
                else if (state.width >= 60) {
                    return 'M0,0 L0,14 M49.75,0 L49.75,14 M50.75,0 L50.75,14 M100,0 L100,14 M0,1 L49.75,1 M50.75,1 L100,1 M0,6 L49.75,6 M50.75,6 L100,6 M0,11 L49.75,11 M50.75,11 L100,11  M4.5,0 L5.5,2 M5.5,0 L4.5,2 M9.5,0 L10.5,2 M10.5,0 L9.5,2 M14.5,0 L15.5,2 M15.5,0 L14.5,2 M19.5,0 L20.5,2 M20.5,0 L19.5,2  M24.5,0 L25.5,2 M25.5,0 L24.5,2  M29.5,0 L30.5,2 M30.5,0 L29.5,2  M34.5,0 L35.5,2 M35.5,0 L34.5,2  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2  M64.5,0 L65.5,2 M65.5,0 L64.5,2  M69.5,0 L70.5,2 M70.5,0 L69.5,2  M74.5,0 L75.5,2 M75.5,0 L74.5,2  M79.5,0 L80.5,2 M80.5,0 L79.5,2  M84.5,0 L85.5,2 M85.5,0 L84.5,2  M89.5,0 L90.5,2 M90.5,0 L89.5,2  M94.5,0 L95.5,2 M95.5,0 L94.5,2  M4.5,5 L5.5,7 M5.5,5 L4.5,7 M9.5,5 L10.5,7 M10.5,5 L9.5,7 M14.5,5 L15.5,7 M15.5,5 L14.5,7 M19.5,5 L20.5,7 M20.5,5 L19.5,7  M24.5,5 L25.5,7 M25.5,5 L24.5,7  M29.5,5 L30.5,7 M30.5,5 L29.5,7  M34.5,5 L35.5,7 M35.5,5 L34.5,7  M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7   M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7  M64.5,5 L65.5,7 M65.5,5 L64.5,7  M69.5,5 L70.5,7 M70.5,5 L69.5,7  M74.5,5 L75.5,7 M75.5,5 L74.5,7  M79.5,5 L80.5,7 M80.5,5 L79.5,7  M84.5,5 L85.5,7 M85.5,5 L84.5,7  M89.5,5 L90.5,7 M90.5,5 L89.5,7  M94.5,5 L95.5,7 M95.5,5 L94.5,7  M4.5,10 L5.5,12 M5.5,10 L4.5,12 M9.5,10 L10.5,12 M10.5,10 L9.5,12 M14.5,10 L15.5,12 M15.5,10 L14.5,12 M19.5,10 L20.5,12 M20.5,10 L19.5,12  M24.5,10 L25.5,12 M25.5,10 L24.5,12  M29.5,10 L30.5,12 M30.5,10 L29.5,12  M34.5,10 L35.5,12 M35.5,10 L34.5,12  M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12  M64.5,10 L65.5,12 M65.5,10 L64.5,12  M69.5,10 L70.5,12 M70.5,10 L69.5,12  M74.5,10 L75.5,12 M75.5,10 L74.5,12  M79.5,10 L80.5,12 M80.5,10 L79.5,12  M84.5,10 L85.5,12 M85.5,10 L84.5,12  M89.5,10 L90.5,12 M90.5,10 L89.5,12  M94.5,10 L95.5,12 M95.5,10 L94.5,12' 
                }
            }
        }
        else if (state.gate_type == 'cantilever'){
            if (state.leaf == 1) {
                if (state.cantilever_opening_direction == 'right'){ 
                    return 'M.5,0 L.5,17 M65.5,0 L65.5,17 M.5,1 L65.5,1 M.5,6 L65.5,6 M.5,11 L65.5,11  M4.5,0 L5.5,2 M5.5,0 L4.5,2 M9.5,0 L10.5,2 M10.5,0 L9.5,2 M14.5,0 L15.5,2 M15.5,0 L14.5,2 M19.5,0 L20.5,2 M20.5,0 L19.5,2  M24.5,0 L25.5,2 M25.5,0 L24.5,2  M29.5,0 L30.5,2 M30.5,0 L29.5,2  M34.5,0 L35.5,2 M35.5,0 L34.5,2  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M49.5,0 L50.5,2 M50.5,0 L49.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2 M4.5,5 L5.5,7 M5.5,5 L4.5,7 M9.5,5 L10.5,7 M10.5,5 L9.5,7 M14.5,5 L15.5,7 M15.5,5 L14.5,7 M19.5,5 L20.5,7 M20.5,5 L19.5,7  M24.5,5 L25.5,7 M25.5,5 L24.5,7  M29.5,5 L30.5,7 M30.5,5 L29.5,7  M34.5,5 L35.5,7 M35.5,5 L34.5,7  M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7  M49.5,5 L50.5,7 M50.5,5 L49.5,7  M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7 M4.5,10 L5.5,12 M5.5,10 L4.5,12 M9.5,10 L10.5,12 M10.5,10 L9.5,12 M14.5,10 L15.5,12 M15.5,10 L14.5,12 M19.5,10 L20.5,12 M20.5,10 L19.5,12  M24.5,10 L25.5,12 M25.5,10 L24.5,12  M29.5,10 L30.5,12 M30.5,10 L29.5,12  M34.5,10 L35.5,12 M35.5,10 L34.5,12  M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M49.5,10 L50.5,12 M50.5,10 L49.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12'}
                    
                else if (state.cantilever_opening_direction == 'left'){ 
                    return 'M34.5,0 L34.5,17 M99.5,0 L99.5,17 M34.5,1 L99.5,1 M34.5,6 L99.5,6 M34.5,11 L99.5,11  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M49.5,0 L50.5,2 M50.5,0 L49.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2  M64.5,0 L65.5,2 M65.5,0 L64.5,2  M69.5,0 L70.5,2 M70.5,0 L69.5,2  M74.5,0 L75.5,2 M75.5,0 L74.5,2  M79.5,0 L80.5,2 M80.5,0 L79.5,2  M84.5,0 L85.5,2 M85.5,0 L84.5,2  M89.5,0 L90.5,2 M90.5,0 L89.5,2  M94.5,0 L95.5,2 M95.5,0 L94.5,2 M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7  M49.5,5 L50.5,7 M50.5,5 L49.5,7  M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7  M64.5,5 L65.5,7 M65.5,5 L64.5,7  M69.5,5 L70.5,7 M70.5,5 L69.5,7  M74.5,5 L75.5,7 M75.5,5 L74.5,7  M79.5,5 L80.5,7 M80.5,5 L79.5,7  M84.5,5 L85.5,7 M85.5,5 L84.5,7  M89.5,5 L90.5,7 M90.5,5 L89.5,7  M94.5,5 L95.5,7 M95.5,5 L94.5,7 M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M49.5,10 L50.5,12 M50.5,10 L49.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12  M64.5,10 L65.5,12 M65.5,10 L64.5,12  M69.5,10 L70.5,12 M70.5,10 L69.5,12  M74.5,10 L75.5,12 M75.5,10 L74.5,12  M79.5,10 L80.5,12 M80.5,10 L79.5,12  M84.5,10 L85.5,12 M85.5,10 L84.5,12  M89.5,10 L90.5,12 M90.5,10 L89.5,12  M94.5,10 L95.5,12 M95.5,10 L94.5,12'
                    }
                
                    //return 'M0,0 L0,17 M100,0 L100,17 M0,1 L100,1 M0,6 L100,6 M0,11 L100,11   M4.5,0 L5.5,2 M5.5,0 L4.5,2 M9.5,0 L10.5,2 M10.5,0 L9.5,2 M14.5,0 L15.5,2 M15.5,0 L14.5,2 M19.5,0 L20.5,2 M20.5,0 L19.5,2  M24.5,0 L25.5,2 M25.5,0 L24.5,2  M29.5,0 L30.5,2 M30.5,0 L29.5,2  M34.5,0 L35.5,2 M35.5,0 L34.5,2  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M49.5,0 L50.5,2 M50.5,0 L49.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2  M64.5,0 L65.5,2 M65.5,0 L64.5,2  M69.5,0 L70.5,2 M70.5,0 L69.5,2  M74.5,0 L75.5,2 M75.5,0 L74.5,2  M79.5,0 L80.5,2 M80.5,0 L79.5,2  M84.5,0 L85.5,2 M85.5,0 L84.5,2  M89.5,0 L90.5,2 M90.5,0 L89.5,2  M94.5,0 L95.5,2 M95.5,0 L94.5,2  M4.5,5 L5.5,7 M5.5,5 L4.5,7 M9.5,5 L10.5,7 M10.5,5 L9.5,7 M14.5,5 L15.5,7 M15.5,5 L14.5,7 M19.5,5 L20.5,7 M20.5,5 L19.5,7  M24.5,5 L25.5,7 M25.5,5 L24.5,7  M29.5,5 L30.5,7 M30.5,5 L29.5,7  M34.5,5 L35.5,7 M35.5,5 L34.5,7  M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7  M49.5,5 L50.5,7 M50.5,5 L49.5,7  M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7  M64.5,5 L65.5,7 M65.5,5 L64.5,7  M69.5,5 L70.5,7 M70.5,5 L69.5,7  M74.5,5 L75.5,7 M75.5,5 L74.5,7  M79.5,5 L80.5,7 M80.5,5 L79.5,7  M84.5,5 L85.5,7 M85.5,5 L84.5,7  M89.5,5 L90.5,7 M90.5,5 L89.5,7  M94.5,5 L95.5,7 M95.5,5 L94.5,7  M4.5,10 L5.5,12 M5.5,10 L4.5,12 M9.5,10 L10.5,12 M10.5,10 L9.5,12 M14.5,10 L15.5,12 M15.5,10 L14.5,12 M19.5,10 L20.5,12 M20.5,10 L19.5,12  M24.5,10 L25.5,12 M25.5,10 L24.5,12  M29.5,10 L30.5,12 M30.5,10 L29.5,12  M34.5,10 L35.5,12 M35.5,10 L34.5,12  M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M49.5,10 L50.5,12 M50.5,10 L49.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12  M64.5,10 L65.5,12 M65.5,10 L64.5,12  M69.5,10 L70.5,12 M70.5,10 L69.5,12  M74.5,10 L75.5,12 M75.5,10 L74.5,12  M79.5,10 L80.5,12 M80.5,10 L79.5,12  M84.5,10 L85.5,12 M85.5,10 L84.5,12  M89.5,10 L90.5,12 M90.5,10 L89.5,12  M94.5,10 L95.5,12 M95.5,10 L94.5,12'
                }

            else if (state.leaf == 2) {
                if (state.width < 9){
                    return 'M0,0 L0,17 M48,0 L48,17 M52,0 L52,17 M100,0 L100,17 M0,1 L48,1 M52,1 L100,1 M0,6 L48,6 M52,6 L100,6 M0,11 L48,11 M52,11 L100,11  M4.5,0 L5.5,2 M5.5,0 L4.5,2 M9.5,0 L10.5,2 M10.5,0 L9.5,2 M14.5,0 L15.5,2 M15.5,0 L14.5,2 M19.5,0 L20.5,2 M20.5,0 L19.5,2  M24.5,0 L25.5,2 M25.5,0 L24.5,2  M29.5,0 L30.5,2 M30.5,0 L29.5,2  M34.5,0 L35.5,2 M35.5,0 L34.5,2  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2  M64.5,0 L65.5,2 M65.5,0 L64.5,2  M69.5,0 L70.5,2 M70.5,0 L69.5,2  M74.5,0 L75.5,2 M75.5,0 L74.5,2  M79.5,0 L80.5,2 M80.5,0 L79.5,2  M84.5,0 L85.5,2 M85.5,0 L84.5,2  M89.5,0 L90.5,2 M90.5,0 L89.5,2  M94.5,0 L95.5,2 M95.5,0 L94.5,2  M4.5,5 L5.5,7 M5.5,5 L4.5,7 M9.5,5 L10.5,7 M10.5,5 L9.5,7 M14.5,5 L15.5,7 M15.5,5 L14.5,7 M19.5,5 L20.5,7 M20.5,5 L19.5,7  M24.5,5 L25.5,7 M25.5,5 L24.5,7  M29.5,5 L30.5,7 M30.5,5 L29.5,7  M34.5,5 L35.5,7 M35.5,5 L34.5,7  M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7   M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7  M64.5,5 L65.5,7 M65.5,5 L64.5,7  M69.5,5 L70.5,7 M70.5,5 L69.5,7  M74.5,5 L75.5,7 M75.5,5 L74.5,7  M79.5,5 L80.5,7 M80.5,5 L79.5,7  M84.5,5 L85.5,7 M85.5,5 L84.5,7  M89.5,5 L90.5,7 M90.5,5 L89.5,7  M94.5,5 L95.5,7 M95.5,5 L94.5,7  M4.5,10 L5.5,12 M5.5,10 L4.5,12 M9.5,10 L10.5,12 M10.5,10 L9.5,12 M14.5,10 L15.5,12 M15.5,10 L14.5,12 M19.5,10 L20.5,12 M20.5,10 L19.5,12  M24.5,10 L25.5,12 M25.5,10 L24.5,12  M29.5,10 L30.5,12 M30.5,10 L29.5,12  M34.5,10 L35.5,12 M35.5,10 L34.5,12  M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12  M64.5,10 L65.5,12 M65.5,10 L64.5,12  M69.5,10 L70.5,12 M70.5,10 L69.5,12  M74.5,10 L75.5,12 M75.5,10 L74.5,12  M79.5,10 L80.5,12 M80.5,10 L79.5,12  M84.5,10 L85.5,12 M85.5,10 L84.5,12  M89.5,10 L90.5,12 M90.5,10 L89.5,12  M94.5,10 L95.5,12 M95.5,10 L94.5,12'
                }
                else if (state.width > 8 && state.width < 14) {
                    return 'M0,0 L0,17 M48.5,0 L48.5,17 M51.5,0 L51.5,17 M100,0 L100,17 M0,1 L48.5,1 M51.5,1 L100,1 M0,6 L48.5,6 M51.5,6 L100,6 M0,11 L48.5,11 M51.5,11 L100,11  M4.5,0 L5.5,2 M5.5,0 L4.5,2 M9.5,0 L10.5,2 M10.5,0 L9.5,2 M14.5,0 L15.5,2 M15.5,0 L14.5,2 M19.5,0 L20.5,2 M20.5,0 L19.5,2  M24.5,0 L25.5,2 M25.5,0 L24.5,2  M29.5,0 L30.5,2 M30.5,0 L29.5,2  M34.5,0 L35.5,2 M35.5,0 L34.5,2  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2  M64.5,0 L65.5,2 M65.5,0 L64.5,2  M69.5,0 L70.5,2 M70.5,0 L69.5,2  M74.5,0 L75.5,2 M75.5,0 L74.5,2  M79.5,0 L80.5,2 M80.5,0 L79.5,2  M84.5,0 L85.5,2 M85.5,0 L84.5,2  M89.5,0 L90.5,2 M90.5,0 L89.5,2  M94.5,0 L95.5,2 M95.5,0 L94.5,2  M4.5,5 L5.5,7 M5.5,5 L4.5,7 M9.5,5 L10.5,7 M10.5,5 L9.5,7 M14.5,5 L15.5,7 M15.5,5 L14.5,7 M19.5,5 L20.5,7 M20.5,5 L19.5,7  M24.5,5 L25.5,7 M25.5,5 L24.5,7  M29.5,5 L30.5,7 M30.5,5 L29.5,7  M34.5,5 L35.5,7 M35.5,5 L34.5,7  M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7   M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7  M64.5,5 L65.5,7 M65.5,5 L64.5,7  M69.5,5 L70.5,7 M70.5,5 L69.5,7  M74.5,5 L75.5,7 M75.5,5 L74.5,7  M79.5,5 L80.5,7 M80.5,5 L79.5,7  M84.5,5 L85.5,7 M85.5,5 L84.5,7  M89.5,5 L90.5,7 M90.5,5 L89.5,7  M94.5,5 L95.5,7 M95.5,5 L94.5,7  M4.5,10 L5.5,12 M5.5,10 L4.5,12 M9.5,10 L10.5,12 M10.5,10 L9.5,12 M14.5,10 L15.5,12 M15.5,10 L14.5,12 M19.5,10 L20.5,12 M20.5,10 L19.5,12  M24.5,10 L25.5,12 M25.5,10 L24.5,12  M29.5,10 L30.5,12 M30.5,10 L29.5,12  M34.5,10 L35.5,12 M35.5,10 L34.5,12  M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12  M64.5,10 L65.5,12 M65.5,10 L64.5,12  M69.5,10 L70.5,12 M70.5,10 L69.5,12  M74.5,10 L75.5,12 M75.5,10 L74.5,12  M79.5,10 L80.5,12 M80.5,10 L79.5,12  M84.5,10 L85.5,12 M85.5,10 L84.5,12  M89.5,10 L90.5,12 M90.5,10 L89.5,12  M94.5,10 L95.5,12 M95.5,10 L94.5,12'
                }
                else if (state.width > 13 && state.width < 19) {
                    return 'M0,0 L0,17 M49,0 L49,17 M51,0 L51,17 M100,0 L100,17 M0,1 L49,1 M51,1 L100,1 M0,6 L49,6 M51,6 L100,6 M0,11 L49,11 M51,11 L100,11  M4.5,0 L5.5,2 M5.5,0 L4.5,2 M9.5,0 L10.5,2 M10.5,0 L9.5,2 M14.5,0 L15.5,2 M15.5,0 L14.5,2 M19.5,0 L20.5,2 M20.5,0 L19.5,2  M24.5,0 L25.5,2 M25.5,0 L24.5,2  M29.5,0 L30.5,2 M30.5,0 L29.5,2  M34.5,0 L35.5,2 M35.5,0 L34.5,2  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2  M64.5,0 L65.5,2 M65.5,0 L64.5,2  M69.5,0 L70.5,2 M70.5,0 L69.5,2  M74.5,0 L75.5,2 M75.5,0 L74.5,2  M79.5,0 L80.5,2 M80.5,0 L79.5,2  M84.5,0 L85.5,2 M85.5,0 L84.5,2  M89.5,0 L90.5,2 M90.5,0 L89.5,2  M94.5,0 L95.5,2 M95.5,0 L94.5,2  M4.5,5 L5.5,7 M5.5,5 L4.5,7 M9.5,5 L10.5,7 M10.5,5 L9.5,7 M14.5,5 L15.5,7 M15.5,5 L14.5,7 M19.5,5 L20.5,7 M20.5,5 L19.5,7  M24.5,5 L25.5,7 M25.5,5 L24.5,7  M29.5,5 L30.5,7 M30.5,5 L29.5,7  M34.5,5 L35.5,7 M35.5,5 L34.5,7  M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7   M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7  M64.5,5 L65.5,7 M65.5,5 L64.5,7  M69.5,5 L70.5,7 M70.5,5 L69.5,7  M74.5,5 L75.5,7 M75.5,5 L74.5,7  M79.5,5 L80.5,7 M80.5,5 L79.5,7  M84.5,5 L85.5,7 M85.5,5 L84.5,7  M89.5,5 L90.5,7 M90.5,5 L89.5,7  M94.5,5 L95.5,7 M95.5,5 L94.5,7  M4.5,10 L5.5,12 M5.5,10 L4.5,12 M9.5,10 L10.5,12 M10.5,10 L9.5,12 M14.5,10 L15.5,12 M15.5,10 L14.5,12 M19.5,10 L20.5,12 M20.5,10 L19.5,12  M24.5,10 L25.5,12 M25.5,10 L24.5,12  M29.5,10 L30.5,12 M30.5,10 L29.5,12  M34.5,10 L35.5,12 M35.5,10 L34.5,12  M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12  M64.5,10 L65.5,12 M65.5,10 L64.5,12  M69.5,10 L70.5,12 M70.5,10 L69.5,12  M74.5,10 L75.5,12 M75.5,10 L74.5,12  M79.5,10 L80.5,12 M80.5,10 L79.5,12  M84.5,10 L85.5,12 M85.5,10 L84.5,12  M89.5,10 L90.5,12 M90.5,10 L89.5,12  M94.5,10 L95.5,12 M95.5,10 L94.5,12'
                
                }
                else if (state.width > 18 && state.width < 25) {
                    return 'M0,0 L0,17 M49.25,0 L49.25,17 M50.75,0 L50.75,17 M100,0 L100,17 M0,1 L49.25,1 M50.75,1 L100,1 M0,6 L49.25,6 M50.75,6 L100,6 M0,11 L49.25,11 M50.75,11 L100,11  M4.5,0 L5.5,2 M5.5,0 L4.5,2 M9.5,0 L10.5,2 M10.5,0 L9.5,2 M14.5,0 L15.5,2 M15.5,0 L14.5,2 M19.5,0 L20.5,2 M20.5,0 L19.5,2  M24.5,0 L25.5,2 M25.5,0 L24.5,2  M29.5,0 L30.5,2 M30.5,0 L29.5,2  M34.5,0 L35.5,2 M35.5,0 L34.5,2  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2  M64.5,0 L65.5,2 M65.5,0 L64.5,2  M69.5,0 L70.5,2 M70.5,0 L69.5,2  M74.5,0 L75.5,2 M75.5,0 L74.5,2  M79.5,0 L80.5,2 M80.5,0 L79.5,2  M84.5,0 L85.5,2 M85.5,0 L84.5,2  M89.5,0 L90.5,2 M90.5,0 L89.5,2  M94.5,0 L95.5,2 M95.5,0 L94.5,2  M4.5,5 L5.5,7 M5.5,5 L4.5,7 M9.5,5 L10.5,7 M10.5,5 L9.5,7 M14.5,5 L15.5,7 M15.5,5 L14.5,7 M19.5,5 L20.5,7 M20.5,5 L19.5,7  M24.5,5 L25.5,7 M25.5,5 L24.5,7  M29.5,5 L30.5,7 M30.5,5 L29.5,7  M34.5,5 L35.5,7 M35.5,5 L34.5,7  M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7   M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7  M64.5,5 L65.5,7 M65.5,5 L64.5,7  M69.5,5 L70.5,7 M70.5,5 L69.5,7  M74.5,5 L75.5,7 M75.5,5 L74.5,7  M79.5,5 L80.5,7 M80.5,5 L79.5,7  M84.5,5 L85.5,7 M85.5,5 L84.5,7  M89.5,5 L90.5,7 M90.5,5 L89.5,7  M94.5,5 L95.5,7 M95.5,5 L94.5,7  M4.5,10 L5.5,12 M5.5,10 L4.5,12 M9.5,10 L10.5,12 M10.5,10 L9.5,12 M14.5,10 L15.5,12 M15.5,10 L14.5,12 M19.5,10 L20.5,12 M20.5,10 L19.5,12  M24.5,10 L25.5,12 M25.5,10 L24.5,12  M29.5,10 L30.5,12 M30.5,10 L29.5,12  M34.5,10 L35.5,12 M35.5,10 L34.5,12  M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12  M64.5,10 L65.5,12 M65.5,10 L64.5,12  M69.5,10 L70.5,12 M70.5,10 L69.5,12  M74.5,10 L75.5,12 M75.5,10 L74.5,12  M79.5,10 L80.5,12 M80.5,10 L79.5,12  M84.5,10 L85.5,12 M85.5,10 L84.5,12  M89.5,10 L90.5,12 M90.5,10 L89.5,12  M94.5,10 L95.5,12 M95.5,10 L94.5,12'
                }
                else if (state.width > 24 && state.width < 39) {
                    return 'M0,0 L0,17 M49.5,0 L49.5,17 M50.5,0 L50.5,17 M100,0 L100,17 M0,1 L49.5,1 M50.5,1 L100,1 M0,6 L49.5,6 M50.5,6 L100,6 M0,11 L49.5,11 M50.5,11 L100,11  M4.5,0 L5.5,2 M5.5,0 L4.5,2 M9.5,0 L10.5,2 M10.5,0 L9.5,2 M14.5,0 L15.5,2 M15.5,0 L14.5,2 M19.5,0 L20.5,2 M20.5,0 L19.5,2  M24.5,0 L25.5,2 M25.5,0 L24.5,2  M29.5,0 L30.5,2 M30.5,0 L29.5,2  M34.5,0 L35.5,2 M35.5,0 L34.5,2  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2  M64.5,0 L65.5,2 M65.5,0 L64.5,2  M69.5,0 L70.5,2 M70.5,0 L69.5,2  M74.5,0 L75.5,2 M75.5,0 L74.5,2  M79.5,0 L80.5,2 M80.5,0 L79.5,2  M84.5,0 L85.5,2 M85.5,0 L84.5,2  M89.5,0 L90.5,2 M90.5,0 L89.5,2  M94.5,0 L95.5,2 M95.5,0 L94.5,2  M4.5,5 L5.5,7 M5.5,5 L4.5,7 M9.5,5 L10.5,7 M10.5,5 L9.5,7 M14.5,5 L15.5,7 M15.5,5 L14.5,7 M19.5,5 L20.5,7 M20.5,5 L19.5,7  M24.5,5 L25.5,7 M25.5,5 L24.5,7  M29.5,5 L30.5,7 M30.5,5 L29.5,7  M34.5,5 L35.5,7 M35.5,5 L34.5,7  M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7   M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7  M64.5,5 L65.5,7 M65.5,5 L64.5,7  M69.5,5 L70.5,7 M70.5,5 L69.5,7  M74.5,5 L75.5,7 M75.5,5 L74.5,7  M79.5,5 L80.5,7 M80.5,5 L79.5,7  M84.5,5 L85.5,7 M85.5,5 L84.5,7  M89.5,5 L90.5,7 M90.5,5 L89.5,7  M94.5,5 L95.5,7 M95.5,5 L94.5,7  M4.5,10 L5.5,12 M5.5,10 L4.5,12 M9.5,10 L10.5,12 M10.5,10 L9.5,12 M14.5,10 L15.5,12 M15.5,10 L14.5,12 M19.5,10 L20.5,12 M20.5,10 L19.5,12  M24.5,10 L25.5,12 M25.5,10 L24.5,12  M29.5,10 L30.5,12 M30.5,10 L29.5,12  M34.5,10 L35.5,12 M35.5,10 L34.5,12  M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12  M64.5,10 L65.5,12 M65.5,10 L64.5,12  M69.5,10 L70.5,12 M70.5,10 L69.5,12  M74.5,10 L75.5,12 M75.5,10 L74.5,12  M79.5,10 L80.5,12 M80.5,10 L79.5,12  M84.5,10 L85.5,12 M85.5,10 L84.5,12  M89.5,10 L90.5,12 M90.5,10 L89.5,12  M94.5,10 L95.5,12 M95.5,10 L94.5,12'
                }
                else if (state.width > 38 && state.width < 60) {
                    return 'M0,0 L0,17 M49.65,0 L49.65,17 M50.35,0 L50.35,17 M100,0 L100,17 M0,1 L49.65,1 M50.35,1 L100,1 M0,6 L49.65,6 M50.35,6 L100,6 M0,11 L49.65,11 M50.35,11 L100,11  M4.5,0 L5.5,2 M5.5,0 L4.5,2 M9.5,0 L10.5,2 M10.5,0 L9.5,2 M14.5,0 L15.5,2 M15.5,0 L14.5,2 M19.5,0 L20.5,2 M20.5,0 L19.5,2  M24.5,0 L25.5,2 M25.5,0 L24.5,2  M29.5,0 L30.5,2 M30.5,0 L29.5,2  M34.5,0 L35.5,2 M35.5,0 L34.5,2  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2  M64.5,0 L65.5,2 M65.5,0 L64.5,2  M69.5,0 L70.5,2 M70.5,0 L69.5,2  M74.5,0 L75.5,2 M75.5,0 L74.5,2  M79.5,0 L80.5,2 M80.5,0 L79.5,2  M84.5,0 L85.5,2 M85.5,0 L84.5,2  M89.5,0 L90.5,2 M90.5,0 L89.5,2  M94.5,0 L95.5,2 M95.5,0 L94.5,2  M4.5,5 L5.5,7 M5.5,5 L4.5,7 M9.5,5 L10.5,7 M10.5,5 L9.5,7 M14.5,5 L15.5,7 M15.5,5 L14.5,7 M19.5,5 L20.5,7 M20.5,5 L19.5,7  M24.5,5 L25.5,7 M25.5,5 L24.5,7  M29.5,5 L30.5,7 M30.5,5 L29.5,7  M34.5,5 L35.5,7 M35.5,5 L34.5,7  M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7   M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7  M64.5,5 L65.5,7 M65.5,5 L64.5,7  M69.5,5 L70.5,7 M70.5,5 L69.5,7  M74.5,5 L75.5,7 M75.5,5 L74.5,7  M79.5,5 L80.5,7 M80.5,5 L79.5,7  M84.5,5 L85.5,7 M85.5,5 L84.5,7  M89.5,5 L90.5,7 M90.5,5 L89.5,7  M94.5,5 L95.5,7 M95.5,5 L94.5,7  M4.5,10 L5.5,12 M5.5,10 L4.5,12 M9.5,10 L10.5,12 M10.5,10 L9.5,12 M14.5,10 L15.5,12 M15.5,10 L14.5,12 M19.5,10 L20.5,12 M20.5,10 L19.5,12  M24.5,10 L25.5,12 M25.5,10 L24.5,12  M29.5,10 L30.5,12 M30.5,10 L29.5,12  M34.5,10 L35.5,12 M35.5,10 L34.5,12  M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12  M64.5,10 L65.5,12 M65.5,10 L64.5,12  M69.5,10 L70.5,12 M70.5,10 L69.5,12  M74.5,10 L75.5,12 M75.5,10 L74.5,12  M79.5,10 L80.5,12 M80.5,10 L79.5,12  M84.5,10 L85.5,12 M85.5,10 L84.5,12  M89.5,10 L90.5,12 M90.5,10 L89.5,12  M94.5,10 L95.5,12 M95.5,10 L94.5,12'
                }
                else if (state.width >= 60) {
                    return 'M0,0 L0,17 M49.75,0 L49.75,17 M50.75,0 L50.75,17 M100,0 L100,17 M0,1 L49.75,1 M50.75,1 L100,1 M0,6 L49.75,6 M50.75,6 L100,6 M0,11 L49.75,11 M50.75,11 L100,11  M4.5,0 L5.5,2 M5.5,0 L4.5,2 M9.5,0 L10.5,2 M10.5,0 L9.5,2 M14.5,0 L15.5,2 M15.5,0 L14.5,2 M19.5,0 L20.5,2 M20.5,0 L19.5,2  M24.5,0 L25.5,2 M25.5,0 L24.5,2  M29.5,0 L30.5,2 M30.5,0 L29.5,2  M34.5,0 L35.5,2 M35.5,0 L34.5,2  M39.5,0 L40.5,2 M40.5,0 L39.5,2  M44.5,0 L45.5,2 M45.5,0 L44.5,2  M54.5,0 L55.5,2 M55.5,0 L54.5,2  M59.5,0 L60.5,2 M60.5,0 L59.5,2  M64.5,0 L65.5,2 M65.5,0 L64.5,2  M69.5,0 L70.5,2 M70.5,0 L69.5,2  M74.5,0 L75.5,2 M75.5,0 L74.5,2  M79.5,0 L80.5,2 M80.5,0 L79.5,2  M84.5,0 L85.5,2 M85.5,0 L84.5,2  M89.5,0 L90.5,2 M90.5,0 L89.5,2  M94.5,0 L95.5,2 M95.5,0 L94.5,2  M4.5,5 L5.5,7 M5.5,5 L4.5,7 M9.5,5 L10.5,7 M10.5,5 L9.5,7 M14.5,5 L15.5,7 M15.5,5 L14.5,7 M19.5,5 L20.5,7 M20.5,5 L19.5,7  M24.5,5 L25.5,7 M25.5,5 L24.5,7  M29.5,5 L30.5,7 M30.5,5 L29.5,7  M34.5,5 L35.5,7 M35.5,5 L34.5,7  M39.5,5 L40.5,7 M40.5,5 L39.5,7  M44.5,5 L45.5,7 M45.5,5 L44.5,7   M54.5,5 L55.5,7 M55.5,5 L54.5,7  M59.5,5 L60.5,7 M60.5,5 L59.5,7  M64.5,5 L65.5,7 M65.5,5 L64.5,7  M69.5,5 L70.5,7 M70.5,5 L69.5,7  M74.5,5 L75.5,7 M75.5,5 L74.5,7  M79.5,5 L80.5,7 M80.5,5 L79.5,7  M84.5,5 L85.5,7 M85.5,5 L84.5,7  M89.5,5 L90.5,7 M90.5,5 L89.5,7  M94.5,5 L95.5,7 M95.5,5 L94.5,7  M4.5,10 L5.5,12 M5.5,10 L4.5,12 M9.5,10 L10.5,12 M10.5,10 L9.5,12 M14.5,10 L15.5,12 M15.5,10 L14.5,12 M19.5,10 L20.5,12 M20.5,10 L19.5,12  M24.5,10 L25.5,12 M25.5,10 L24.5,12  M29.5,10 L30.5,12 M30.5,10 L29.5,12  M34.5,10 L35.5,12 M35.5,10 L34.5,12  M39.5,10 L40.5,12 M40.5,10 L39.5,12  M44.5,10 L45.5,12 M45.5,10 L44.5,12  M54.5,10 L55.5,12 M55.5,10 L54.5,12  M59.5,10 L60.5,12 M60.5,10 L59.5,12  M64.5,10 L65.5,12 M65.5,10 L64.5,12  M69.5,10 L70.5,12 M70.5,10 L69.5,12  M74.5,10 L75.5,12 M75.5,10 L74.5,12  M79.5,10 L80.5,12 M80.5,10 L79.5,12  M84.5,10 L85.5,12 M85.5,10 L84.5,12  M89.5,10 L90.5,12 M90.5,10 L89.5,12  M94.5,10 L95.5,12 M95.5,10 L94.5,12' 
                }
            }
        }
    },
    
    // barbwireHeightAdjustment: (state, getters) => {

    //     if (state.barbwire == true){
    //         return getters.gateHeight * .135
    //     }
    //     else {
    //         return 0
    //     }
    // },
    hingeRingAdjustment: state => {
        //I had to add this modificiation into the program because when a hinge ring was added, the
            //gate frame was moving 2 pixels to accomodate the -2 X coordinate point for the hinge ring on
            //left or 102 on right. The frame box stays the same, so the frame had to shrink to accomodate
            //going from 0 to 100 to -2 to 100 or 0 to 102. In other words the container doesn't flex forcing
            //the inner diagrams to flex 
        if (state.hingeRing == 'left' || state.hingeRing == 'double'){
            return .01
        }
        else {
                return 0
            }
        
    },

    hingeRingFrameAdjustment: state => {
        if (state.hingering == true){
            if (state.leaf == 1){        
                return state.width * 40/100
                
            }
            else if (state.leaf == 2){        
                return state.width * 40/100 * 2
                
            }
        }
        else {
            return 0
            }
    },

    pathList: (state, getters ) => {
        //This is for the frame rendering
        let barbwireAdjustment = 0;
        //let pixelMultiplier = 40;
        // if (state.hingeRingPath.length > 0){
        //     if (state.leaf == 1){
        //         pixelMultiplier = 40;
        //     }
        //     else if (state.leaf == 2){
        //         pixelMultiplier = 40;
        //     }
        // }
        // else {
        //     pixelMultiplier = 40;
        // }
        if (state.barbwire == true) {
            barbwireAdjustment = .1575;
        }
        if (state.gate_type != 'cantilever'){
            return [{id:"frame", width: getters.gateWidth, height: getters.gateHeight,
            pivot: {
                x: 0,
                y: 0 - barbwireAdjustment
            },
            style: {
                strokeColor: getters.diagramColor,
                fill: 'transparent',
                strokeWidth: 2
            },
                shape: {
                type: 'Path', data: getters.framePath
                } 
            },
        ]
        }
        else if(state.gate_type == 'cantilever') {
            //return [{id:"frame", width: state.width * 62, height: getters.gateHeight,
            return [{id:"frame", width: getters.gateWidth, height: getters.gateHeight,
                pivot: {
                    x: .0075,
                    y: 0 - barbwireAdjustment
                },
                style: {
                    strokeColor: getters.diagramColor,
                    fill: 'transparent',
                    strokeWidth: 4
                },
                    shape: {
                    type: 'Path', data: getters.framePath
                    } 
                }
                ]
        }

    },
    cantileverChainlinkWidth: (state, getters) => {
        if (state.gate_type == 'cantilever'){
            return getters.gateWidth / 3 * 1.05
        }
        else {
            return 0
        }
    },
    pathList2: (state, getters ) => {
        //This represents the chainlink rendering
            let barbwireAdjustment = 0;
            let cantileverChainlinkShift = 0;
            //If the gate has barbwire, the chainlink will run to the top 
            //of the barbwire, unless you make the adjustment below. The 
            //adjustment shifts the Y starting point down the aproximate %
            //of space occupied by the barbwire at the top
            if (state.barbwire == true) {
                barbwireAdjustment = .1575;
            }
            else {
                barbwireAdjustment = 0;
            }
            //I have to admit, I am not clear on the math here, but found the adjustment number that 
            //works. Same as above, if the gate opens to the left, then the counter balance will be 
            //on the left of the screen; therefore the chainlink will need to shift to the right 33.33%
            //in theory, but I had to adjust the X axis right .5275
            if (state.gate_type == 'cantilever' && state.cantilever_opening_direction == 'left'){
                cantileverChainlinkShift = .52
                
            }
            else if (state.gate_type == 'cantilever' && state.leaf == 2){
                cantileverChainlinkShift = .2665
                
            }
            else if (state.gate_type == 'cantilever' && state.cantilever_opening_direction == 'right'){
                cantileverChainlinkShift = -.005;  
            }

            if (state.gate_type != 'frame_only'){
            return [{id: "chainlink", width: getters.gateWidth - getters.hingeRingFrameAdjustment - getters.cantileverChainlinkWidth, height: getters.gateHeight,
            pivot: {
                x: 0 - cantileverChainlinkShift - getters.hingeRingAdjustment,
                y: 0 - barbwireAdjustment
            },
            style: {
                strokeColor: getters.chainlinkColor,
                fill: 'transparent',
                strokeWidth: 1
            },
            shape: {
                type: 'Path', data: getters.chainlinkPath
                } 
            }]
            }
            else if (state.gate_type == 'frame_only'){
            return [{id: "chainlink", width: getters.gateWidth, height: getters.gateHeight,
            pivot: {
                x: 0,
                y: 0 
            },
            style: {
                fill: 'transparent',
                visible: false,
                strokeWidth: 0
            },
            shape: {
                
                } 
            }]
            }
    },  

    pathList3: (state, getters ) => {
        //This represents the barbwire rendering
        let barbwireAdjustment = 0;
        let baseHeight = 37;
        if (state.gate_type !== 'cantilever'){
            return [{id:"bw_frame", width: getters.gateWidth - getters.hingeRingFrameAdjustment - getters.cantileverChainlinkWidth, height: baseHeight + state.height,
                    pivot: {
                        x: 0 - getters.hingeRingAdjustment,
                        y: 0
                    },
                    style: {
                        strokeColor: getters.diagramColor,
                        fill: 'transparent',
                        strokeWidth: 1
                    },
                        shape: {
                        type: 'Path', data: getters.barbwirePath
                        } 
                    }]
                }
        else if (state.gate_type == 'cantilever'){
             if (state.cantilever_opening_direction == 'left'){ 
                 barbwireAdjustment = .52;
            }
            else if (state.leaf == 2){
                 barbwireAdjustment = .2665;  
             }
            else if (state.cantilever_opening_direction == 'right'){
                 barbwireAdjustment = -.005;  
             }
            return [{id:"bw_frame", width: getters.gateWidth - getters.cantileverChainlinkWidth, height: getters.gateHeight * (1+(1/state.height)) - getters.gateHeight,
                pivot: {
                    x: 0 - barbwireAdjustment,
                    y: 0
                },
                style: {
                    strokeColor: getters.diagramColor,
                    fill: 'transparent',
                    strokeWidth: 1
                },
                    shape: {
                    type: 'Path', data: getters.barbwirePath
                    } 
                }]
            }
        },

    // pathListArch: (state, getters ) => {
    //     //This represents the barbwire rendering
    //     let baseHeight = 37;
    //     if (state.gate_type == 'archTop'){
    //         return [{id:"arch", width: getters.gateWidth - getters.hingeRingFrameAdjustment, height: baseHeight + state.height,
    //                 pivot: {
    //                     x: 0 - getters.hingeRingAdjustment,
    //                     y: 0
    //                 },
    //                 style: {
    //                     strokeColor: getters.diagramColor,
    //                     fill: 'transparent',
    //                     strokeWidth: 2
    //                 },
    //                     shape: {
    //                     type: 'Path', data: getters.archPath
    //                     } 
    //                 }]
    //             }
    //     },

        diagramColor: state => {
            if (state.color === 'galvanized') {
                return '#9C9A99'
            }
            else if (state.color === 'black') {
                return 'black'
            }
            else if (state.color === 'brown') {
                return '#ad8618'
            }
            else if (state.color === 'green') {
                return 'green'
            }
            
        },
        chainlinkColor: state => {
            if (state.chainlinkColor === 'galvanized') {
                return '#9C9A99'
            }
            else if (state.color === 'black') {
                return 'black'
            }
            else if (state.color === 'brown') {
                return '#92400E'
            }
            else if (state.color === 'green') {
                return 'green'
            }
            
        },

        



}

export default  getters