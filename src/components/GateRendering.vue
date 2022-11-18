<template>
    <div>
        <div>
            <ejs-diagram id="diagram"  
                :width='width' 
                :height='height' 
                :nodes='nodes'
                :snapSettings='snapSettings'
                :layout='layout'
                >
            </ejs-diagram>
        </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { Diagram, SnapConstraints } from '@syncfusion/ej2-vue-diagrams';
    
     
export default {
    name: 'GateRendering',
   
    data() {
        return {
            width: "100%",
            height: "350px",
            snapSettings:{constraints: SnapConstraints.ShowLines = false},
            layout: {},
            
            getNodeDefaults: {},
            
            
        } 
              
    },
    computed: {
        ...mapGetters([
            'pathList',
            'pathList2',
            'pathList3',
            //'pathListArch'
            ]),
        frameNode: function() {
            return this.pathList
        },
        chainlinkNode: function() {
            return this.pathList2
        },
        barbwireNode: function() {
            return this.pathList3
        },
        //archNode: function(){
          //  return this.pathListArch
        //},
        nodes: function() {
            return this.frameNode.concat(this.chainlinkNode).concat(this.barbwireNode)
        }
        
    },

    beforeMount: function() { 
        this.$store.getters.addBarbwire
        //this.nodes = this.$store.getters.pathList.concat(this.$store.getters.pathList2);
        this.layout = this.$store.getters.gateLayout;
        //console.log(this.nodes);

        this.getNodeDefaults = (obj) => {
        if (obj.style.strokeColor === undefined) {
                obj.style.strokeColor = this.$store.getters.chainlinkColor;
            }
        }
    },
        mounted: function () {
         let diagramInstance = Diagram;
         let diagramObj = document.getElementById("diagram");
         diagramInstance = diagramObj.ej2_instances[0];
         //diagramInstance.select([diagramInstance.frameNode, diagramInstance.chainlinkNode, diagramInstance.barbwireNode]);
         //diagramInstance.selectAll();
         diagramInstance.group();
         //diagramInstance.align('Right', this.layout.bounds, 'Selector');
         diagramInstance.bringToCenter(this.layout.bounds);
        //diagramInstance.bringIntoView(this.layout.bounds);
         //diagramInstance.bringToFront(this.layout.bounds);
         //diagramInstance.nudge('Right');
        //  diagramInstance.fitToPage({
        //      mode: 'Page',
        //      region: 'Content',
        //      margin: {
        //          right: 1000,
        //          top: 25
        //      },
        //      canZoomIn: true
        //  });
         
         

     }
}
</script>

<style>
  
  
</style>