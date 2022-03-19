export default class cellObject {
    constructor(i, j, blocksFields, blockClass, newDivRaw){
        this.id = `i${i}j${j}`
        this.i = i
        this.j = j
        this.nextCell = null
        this.previousCell = null
        this.parentTree = null   

        this.newDiv = document.createElement("div");
        this.newDiv.className = blockClass
        this.newDiv.id = `i${i}j${j}`
        // this.elementById = this.$el.querySelector(`i${i}j${j}`);
        // fieldCells[j].push(this)
        newDivRaw.appendChild(this.newDiv)
        // fieldCells[j][i].elementById = document.getElementById(`i${i}j${j}`);
    }     
}