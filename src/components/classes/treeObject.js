// export default class treeObject { 
//     constructor(){
//         this.cells = []
//         this.lastCell = null
//         this.headColor = null
//         this.bodyColor = null
//         this.counterBox = null
//         this.counterCellBlock = null
//         this.isFreeCellsAround = true
//         this.setRandomColor()
//         this.id = digitalTrees.length
//         digitalTrees.push(this)
//     }
//     refreshLastCell() {
//         this.lastCell = this.cells[this.cells.length-1]
//     }
//     createCellTree() {
//         createCell(this.lastCell)  
//     }
//     addFirstCell() {
//         try {
//             let firstCell = chooseRandomStartCell (fieldHeight, fieldWidth) 
//             this.cells.push(firstCell)
//             this.cells[0].elementById.style.background = this.headColor
//             this.cells[0].parentTree = this
//             this.refreshLastCell()
            
//         } catch (error) {
//             console.log("===== Some Error ==========")
//         }
//     }       
//     createCell() {
//         let freeCellsArray = FreeCellsAround(this.lastCell)
//         if (freeCellsArray.length === 0) {
//             isAnyFreeCells = false   
//             this.isFreeCellsAround = false    
//         } else {
//             let FreeCellCoordinate = chooseRandomPoint (freeCellsArray)
//             let j = FreeCellCoordinate[0]
//             let i = FreeCellCoordinate[1]        
//             this.addNextCell(j, i)             
            
//         }            
//     }
//     addNextCell(j, i) {
//         this.lastCell.elementById.style.background = this.bodyColor
//         let nextCell = fieldCells[j][i]
//         nextCell.elementById.style.background = this.headColor
//         nextCell.previousCell = this.lastCell
//         nextCell.parentTree = this
//         this.cells.push(nextCell)
//         nextCell.parentTree.refreshLastCell()
//         this.nextCell = nextCell

//         let counterCellText = document.getElementById(`counter-trees-cell-box-text${this.id}`)
//         counterCellText.innerText = this.cells.length
//         this.logInLogbox()
//         console.log([this.lastCell.i,this.lastCell.j]+": thisCell "+[i,j]+": NextCell, "+"TreeID: "+this.id)
//     }
//     logInLogbox() {
//         let log = document.createElement("div")
//         log.className = "digital-tree__field-left-logbox-text"
//         let logText = `TreeID: ${this.id}; i: ${this.lastCell.i}; j:${this.lastCell.j};`
//         // counterBox.id = `TreeIndex${treeIndex}`
//         log.innerText = logText
//         logbox.appendChild(log)
//         logbox.scrollTop = logbox.scrollHeight;
//     }
//     setRandomColor() {
//         this.headColor = generateRandomColor()
//         this.bodyColor = generateRandomColor()
//     }
//     changeRandomColor() {
//         this.setRandomColor()
//         this.counterCellBlock.style.background = this.bodyColor
//     }
//     addCounterTreeCell() {
//         let counterBox = document.createElement("div")
//         counterBox.className = "digital-tree__counter-trees-cell-box"
//         counterBox.id = `TreeIndex${this.id}`
//         counterTreesCell.appendChild(counterBox)
//         this.counterBox = document.getElementById(`TreeIndex${this.id}`)
    
//         let newDiv = document.createElement("div")
//         newDiv.className = blockClass
//         newDiv.style.background = this.bodyColor
//         newDiv.id = `counter-trees-cell-box${this.id}`
//         this.counterBox.appendChild(newDiv)
//         this.counterCellBlock = document.getElementById(`counter-trees-cell-box${this.id}`)
    
//         let newDivText = document.createElement("div")
//         newDivText.className = "digital-tree__counter-trees-cell-box-text"
//         newDivText.id = `counter-trees-cell-box-text${this.id}`
//         newDivText.innerText = 0
//         newDivText.style.background = "none"
//         this.counterBox.appendChild(newDivText)
//     }
//     deleteCounterTreeCell() {
//         this.counterBox.parentNode.removeChild(this.counterBox);
//     }
//     helloTree() {
//         console.log("Hello i'm tree")
//     }
// } 
