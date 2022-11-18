<template>
    <div id="showgate">
        <div class="heading-area">
            <h1>GATE RENDERING & MATERIAL LIST</h1>
        </div>      
        
        <div class="body-area">
            <div class="main-grid">
                <table class="table-general">
                    <colgroup>
                        <col style="width: 50">
                        <col style="width: 25">
                    </colgroup>
                    <tbody>
                        <tr>
                            <td class="label-fence is-oddRow">Customer Name</td>
                            <td class="label-fence is-oddRow">{{ customer }}</td>
                        </tr>
                        <tr>
                            <td class="label-fence is-evenRow">Work Order #</td>
                            <td class="label-fence is-evenRow">{{ workorder }}</td>
                        </tr>
                        <tr>
                            <td class="label-fence is-oddRow">Date</td>
                            <td class="label-fence is-oddRow">{{ date }}</td>
                        </tr>
                        <tr>
                            <td class="label-fence is-evenRow">Salesperson</td>
                            <td class="label-fence is-evenRow">{{ salesperson }}</td>
                        </tr>
                    </tbody>
                </table> 
                <table class="table-detail">
                    <colgroup>
                        <col style="width: 90">
                        <col style="width: 150">
                        <col style="width: 80">
                        <col style="width: 80">
                        <col style="width: 150">
                    </colgroup>
                        <thead class="table-header">
                            <tr>
                            <th scope="col" class="header-fence">Category</th>
                            <th scope="col" class="header-fence">Description</th>
                            <th scope="col" class="header-fence">Color</th>
                            <th scope="col" class="header-fence">Quantity/Pieces</th>
                            <th scope="col" class="header-fence">Inches</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in gateOutputList" :key="item.id">
                                <template v-if="index % 2 == 0">
                                    <td class="label-fence is-evenRow">{{ item.id }}</td>
                                    <td class="label-fence is-evenRow">{{ item.description }}</td>
                                    <td class="label-fence is-evenRow">{{ item.color }}</td>
                                    <td class="label-fence is-evenRow">{{ item.pieces }}</td>
                                    <td class="label-fence is-evenRow">{{ item.quantity }}</td>
                                </template>
                                <template v-if="index % 2 != 0">
                                    <td class="label-fence is-oddRow">{{ item.id }}</td>
                                    <td class="label-fence is-oddRow">{{ item.description }}</td>
                                    <td class="label-fence is-oddRow">{{ item.color }}</td>
                                    <td class="label-fence is-oddRow">{{ item.pieces }}</td>
                                    <td class="label-fence is-oddRow">{{ item.quantity }}</td>
                                </template>
                            </tr>
                        </tbody>
                    </table>
                    <template v-if="gate_type == 'cantilever'">
                        <div>
                            <h5>Cantilever Pipe Position (Inches on Center): </h5>
                            <table class="table-cantilever">
    `                                   <tbody>
                                    <tr v-for="(position, index) in cantileverPipePosition" :key="position.id">
                                        <template v-if="index % 2 == 0">
                                            <td class="label-fence-cantilever is-evenRow">{{index + ')'}}</td>
                                            <td class="label-fence is-evenRow">{{ position }}"</td>
                                        </template>
                                        <template v-if="index % 2 != 0">
                                            <td class="label-fence-cantilever is-oddRow">{{index + ')'}}</td>
                                            <td class="label-fence is-oddRow">{{ position }}"</td>
                                        </template>
                                    </tr>
                                </tbody>
                            </table>

                                <!-- <ul class="px-2 py-2 ">
                                    <li 
                                        class="text-sm font-medium text-gray-900 border-solid border-2 border-gray-400"
                                        v-for="(position, index) in cantileverPipePosition" :key="position.id">
                                            {{index + ')'}}  
                                            {{Math.round(position * 1000)/1000}} 
                                    </li>
                                </ul> -->
                            </div>
                        </template>        
            </div>
            
                <template>
                    <div class="instruction-body">
                        <h5 class="px-2 m-2 text-sm text-black uppercase>Instructions">Instructions:</h5>
                        <p class="px-2 m-2 whitespace-nowrap text-sm font-medium text-gray-900">{{ width }}w x {{ height }}h {{ gate_type }} gate - {{ color }}</p>
                        <p class="px-2 m-2 whitespace-nowrap text-sm font-medium text-gray-900">{{ description }}</p>
                    </div>
                </template>
                
                <div class="gate-rendering">
                    <GateRendering></GateRendering>
                </div>

        
        
            <div class="noprint flex mt-2 ml-4 justify-start">        
                <button>Post to Trello</button> 
                <router-link :to="{name: 'GateCalculator'}" tag="button">Edit Gate</router-link>
                <button>Finalize</button> 
                <button onclick="window.print()" style="font-size:1vw text-align: center">Print</button>
            </div>

        </div>  
        
    </div>

</template>


<script>

import {mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields';
import GateRendering from '../components/GateRendering';


export default {
    name: "ShowGate",
    components: {
        GateRendering
    },
    
   
   computed: {
        ...mapGetters([
            'gate',
            'actualHeight',
            'outerVerticalPipeQty',
            'outerVerticalPieces',
            'outerHorizontalPipeQty',
            'outerHorizontalPieces',
            'innerHorizontalPipe',
            'innerHorizontalPipeQty',
            'innerVerticalPipe',
            'innerVerticalPipeQty',
            'chainlinkDescription',
            'gateMaterialItems',
            'gateOutputList',
            'cantileverPipePosition'
        ]),
        ...mapFields([
            'customer',
            'workorder',
            'date',
            'salesperson',
            'gate_type',
            'description',
            'width',
            'height',
            'color'
        ]),
                
        
        },
    methods: { 
        printPageArea(areaID){
            var printContent = document.getElementById(areaID);
            window.print(printContent);
            //var WinPrint = window.open('', '', 'width=900,height=650');

            // WinPrint.document.write(printContent.innerHTML);
            // WinPrint.document.close();
            // WinPrint.focus();
            // WinPrint.print();
            // WinPrint.close();
        }
    }
   };
</script>

<style scoped>
    * {
    box-sizing: border-box;
    }
    #showgate {
        min-height: 90vh;
        background: #eee;
        border-style: solid;
        border-color: #323232;
        border-width: 2px;
        margin: 16px;
        display: grid;
        grid-template-columns: repeat(12, minmax(40px, auto));
        grid-template-rows: repeat(12, 1fr);
        
    }
    .main-grid {
        display: grid;
        
        grid-gap: .3em;
        background: #eee;
    }

    .table-general {
        margin-top: 4px;
        max-width: 40%;
        margin-left: 12px;
        margin-bottom: 4px;
        border-style: solid;
        border-color: #323232;
    }

    .table-detail {
        margin-left: 12px;
        margin-right: 12px;
        margin-bottom: 8px;
        border-style: solid;
        border-color: #323232;
    }
    .table-cantilever {
        width: 25%;
        margin-left: 12px;
        margin-right: 12px;
        margin-bottom: 8px;
        border-style: solid;
        border-color: #323232;   
    }

    .gate-rendering {
        margin-top: 4px;
        margin-left: 12px;
        margin-right: 12px;
        margin-bottom: 2px;
        padding: 8px;
        background: white;
        border-style: solid;
        border-color: #323232;
        border-width: 4px;
    }
    .instruction-body {
        display: flex;
        background: white;
        margin-top: 4px;
        margin-left: 12px;
        margin-right: 12px;
        margin-bottom: 2px;
        padding: 4px;
        border-style: solid;
        border-color: #323232;
        border-width: 4px;
    }
    .table-auto {
        color: black;
    }
    
    .w-layout-grid {
        display: -ms-grid;
        display: grid;
        grid-auto-columns: 1fr;
        -ms-grid-columns: 1fr 1fr;
        grid-template-columns: 1fr 1fr;
        -ms-grid-rows: auto auto;
        grid-template-rows: auto auto;
        grid-row-gap: 16px;
        grid-column-gap: 16px;
    }
    
    h1 {
        font-weight: 800;
        padding: 4px;
        margin-top: 2px;
        margin-left: 12px;
        margin-bottom: 4px;
        font-size: 32px;
    }
    h5 {
        font-weight: 800;
        padding: 4px;
        margin-top: 2px;
        margin-left: 12px;
        font-size: 16px;
    }

    .label-fence{ 
        padding: 4px;
        font-family: kefa, Arial, Helvetica, sans-serif;
        font-size: small;
        color: #323232;
        margin: 4px;
    }
    .label-fence-cantilever{ 
        text-align: right;
        padding: 4px;
        font-family: kefa, Arial, Helvetica, sans-serif;
        font-size: small;
        color: #323232;
        margin: 4px;
    }
    
    .diagram {
        margin: auto;
        width: 90%;    
        
    }
       
      .is-evenRow {
          background-color: lightgray;
      }

      .is-oddRow {
          background-color: white;
      }
    td {
        border: #323232;
        border-style: solid;
    }
    .header-fence {
        margin-left: 1em;
        margin-bottom: 2px;
        font-family: kefa, Arial, Helvetica, sans-serif;
        color: #323232;
        font-size: medium;
        text-align: left;
        padding: 4px;
        border: #323232;
        border-style: solid;
    }
    .table-header {
        background: #3f92f031;
    }
    button {
        background-color: #D8D8D8;
        color: #323232;
        font-family: kefa, Arial, Helvetica, sans-serif;
        font-size: 14px;
        padding: 12px 20px;
        border: solid;
        border-radius: 4px;
        border-color: #323232;
        cursor: pointer;
        float: left;
        margin: 4px;
        width: 135px;
    }
    .body-area  {
        grid-column: 2 / 12;
        grid-row: 2 / 12;
    }
    .heading-area {
        grid-column: 1 / 12;
        justify-self: center;
        
    }
    
    @media print
    {
    .noprint {display:none;}
}

    </style>