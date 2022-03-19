<template>
    <div class="digital-tree__layout">
        <div class="digital-tree__field-left">
            <div class="digital-tree__field-left-control">
                <img src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/000000/external-Pause-essential-collection-bearicons-glyph-bearicons.png" class="digital-tree__field-left-control-button" height="56px" id="field-left-control-pause"/>
                <img src="https://img.icons8.com/glyph-neue/64/000000/restart.png" class="digital-tree__field-left-control-button" id="field-left-control-restart"/>
                <img src="@/assets/paint-palette-svgrepo-com.svg" class="digital-tree__field-left-control-button" id="field-left-control-color" />
            </div>
            <div ref="myId3">{{ message }}</div>
            <div class="digital-tree__field-left-title">
                Logbox
            </div>
            <div class="digital-tree__field-left-logbox" id="left-logbox">

            </div>
        </div>
        <div class="blocks-field" id="space-for-blocks" ref="blocksFields">      
        </div>
        <div class="digital-tree__counter">
            <div class="digital-tree__counter-title">
                All cycle from start
            </div>
            <div class="digital-tree__counter-count" id="counter-count">0</div>
            <div class="digital-tree__counter-title">
                Full cycle count
            </div>
            <div class="digital-tree__counter-count" id="counter-fullCircle-count">0</div>
            <div class="digital-tree__counter-box">
                <div class="digital-tree__counter-text-before">Delay </div>
                <input type="number" id="counter-speed" oninput="changeSpeed()" placeholder="Speed" name="quantity" step="10" min="0" max="300" value="100">  
                <div class="digital-tree__counter-text-after">ms</div>
            </div>
            <div class="digital-tree__counter-box">
                <div class="digital-tree__counter-text-before" >Tree count</div>
                <input type="number" id="counter-tree" placeholder="Tree count" name="quantity" step="1" min="0" max="10" value="3">  
            </div>
            <div class="digital-tree__counter-trees-cell-box" id="counter-trees-cell">
            </div>
        </div>
    </div>
</template>

<script>

import cellObject from '../classes/cellObject'


const filedBox = {
  name: 'fieldBox',
  components: {    
  },
    
  data() {
    return {
      fieldCells:[],
      fieldWidth: 11,
      fieldHeight: 5,
      spaceBetweenBlocks: 5,
      blockSize: 50,
      message:"Welcome",
      blockClass: "block",
      blocksFields: null      

    }
    },
    methods: {
      makeFieldCells2d () {
        for (let i = 0; i < this.fieldHeight; i++) {
          this.fieldCells.push([])        
        }
      },
      changeFieldSize() {
        let newHeight = this.fieldHeight*this.blockSize+this.fieldHeight*this.spaceBetweenBlocks
        let newWidth = this.fieldWidth*this.blockSize+this.fieldWidth*this.spaceBetweenBlocks
        this.$el.querySelector(`#space-for-blocks`).style.width = `${newWidth}px`
        this.$el.querySelector(`#space-for-blocks`).style.height = `${newHeight}px`    
      },
      createField () {
        let newDivRaw
        for (let j = 0; j < this.fieldHeight; j++) {
          newDivRaw = document.createElement("div");
          newDivRaw.className = "blocks-field-raw"
          newDivRaw.id = `blocks-field-raw${j}`
          for (let i = 0; i < this.fieldWidth; i++) {
            document.body.onload = new cellObject(i, j, this.blocksFields, this.blockClass, newDivRaw);  
          }
        this.blocksFields.appendChild(newDivRaw)

        }
      },
      
    },
    created() {
      console.log("Hi")
      this.makeFieldCells2d()
      console.log(this.fieldCells)
      // changeFieldSize(this.fieldHeight, this.fieldWidth)    

    },
    mounted() {
      console.log("Hi Mounted")
      this.$refs.myId3.innerText = 'Hello Bro' 
      this.blocksFields = this.$el.querySelector(`#space-for-blocks`)
      this.changeFieldSize()
      
      // let newDivRaw = document.createElement("div");
      //   newDivRaw.className = this.blockClass
      //   newDivRaw.id = `i0j0`
      //   newDivRaw.ref = `i0j0`
      //   // newDivRaw.id = `i${i}j${j}`
      //   // this.elementById = document.getElementById(`i${i}j${j}`);
      //   // fieldCells[j].push(this)
      //   this.$refs.blocksFields.appendChild(newDivRaw)
      //   this.$el.querySelector(`#i0j0`).style.background = "blue"

      this.createField ()
      
  }
}
export default filedBox
</script>

<style>
@import "field-box";
</style>