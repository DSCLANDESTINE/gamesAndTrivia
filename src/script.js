document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".blocks");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");
  const width = 4;
  let blocks = [];
  let score = 0

  // Generating the game's blocks!

  function generateBlocks() {
    for (let i = 0; i < width * width; i++) {
      const block = document.createElement("div");
      block.innerHTML = 0;
      gridDisplay.appendChild(block);
      blocks.push(block);
    }

    generateBlocksValue();
    generateBlocksValue();
  }
  generateBlocks();

  // generating each blocks worth!

  function generateBlocksValue() {
    const randomNumber = Math.floor(Math.random() * blocks.length);
    if (blocks[randomNumber].innerHTML == 0) {
      blocks[randomNumber].innerHTML = 2;

      //check wether the player has lost or not?
    } else generateBlocksValue();
  }

  //writing functions for in-game mechanics,

  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = blocks[i].innerHTML;
        let totalTwo = blocks[i + 1].innerHTML;
        let totalThree = blocks[i + 2].innerHTML;
        let totalFour = blocks[i + 3].innerHTML;
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
        

        let filteredRow = row.filter(num => num)
        let missing = 4 -filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filteredRow)
        

        blocks[i].innerHTML = newRow[0]
        blocks[i+1].innerHTML = newRow[1]
        blocks[i+2].innerHTML = newRow[2]
        blocks[i+3].innerHTML = newRow[3]
      }
    }
  }

  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = blocks[i].innerHTML;
        let totalTwo = blocks[i + 1].innerHTML;
        let totalThree = blocks[i + 2].innerHTML;
        let totalFour = blocks[i + 3].innerHTML;
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
        

        let filteredRow = row.filter(num => num)
        let missing = 4 -filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeros)
        

        blocks[i].innerHTML = newRow[0]
        blocks[i+1].innerHTML = newRow[1]
        blocks[i+2].innerHTML = newRow[2]
        blocks[i+3].innerHTML = newRow[3]
      }
    }
  }

  function moveUp(){
    for (let i = 0 ; i < 4; i++){
        let totalOne = blocks[i].innerHTML;
        let totalTwo = blocks[i + width].innerHTML;
        let totalThree = blocks[i + width*2].innerHTML;
        let totalFour = blocks[i + width*3].innerHTML;
        let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
        

        let filteredColumn = column.filter(num => num)
        let missing = 4 -filteredColumn.length
        let zeros = Array(missing).fill(0)
        let newColumn = filteredColumn.concat(zeros)
        

        blocks[i].innerHTML = newColumn[0]
        blocks[i+width].innerHTML = newColumn[1]
        blocks[i+width*2].innerHTML = newColumn[2]
        blocks[i+width*3].innerHTML = newColumn[3]
    }
  }

  function moveDown(){
    for (let i = 0 ; i < 4; i++){
        let totalOne = blocks[i].innerHTML;
        let totalTwo = blocks[i + width].innerHTML;
        let totalThree = blocks[i + width*2].innerHTML;
        let totalFour = blocks[i + width*3].innerHTML;
        let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];
        

        let filteredColumn = column.filter(num => num)
        let missing = 4 -filteredColumn.length
        let zeros = Array(missing).fill(0)
        let newColumn = zeros.concat(filteredColumn)
        

        blocks[i].innerHTML = newColumn[0]
        blocks[i+width].innerHTML = newColumn[1]
        blocks[i+width*2].innerHTML = newColumn[2]
        blocks[i+width*3].innerHTML = newColumn[3]
    }
  }


  function combineRow(){
    for(let i = 0; i<15 ; i++ ){
        if(blocks[i].innerHTML === blocks[i+1].innerHTML){
            let combinedTotal = parseInt(blocks[i].innerHTML) + parseInt(blocks[i+1].innerHTML)
            blocks[i].innerHTML = combinedTotal
            blocks[i+1].innerHTML = 0

            score += combinedTotal
            scoreDisplay.innerHTML = score
        }
    }
    
    checkGamesStatus()
  }

  function combineColumn(){
    for(let i = 0; i<12 ; i++ ){
        if(blocks[i].innerHTML === blocks[i+width].innerHTML){
            let combinedTotal = parseInt(blocks[i].innerHTML) + parseInt(blocks[i+width].innerHTML)
            blocks[i].innerHTML = combinedTotal
            blocks[i+width].innerHTML = 0

            score += combinedTotal
            scoreDisplay.innerHTML = score
        }
    }
    
    checkGamesStatus()
  }


 ///asigning keys!
 function controls(e) {
    if(e.key === 'ArrowLeft'){
        keyLeft()
    } else if(e.key === 'ArrowRight'){
       keyRight() 
    } else if(e.key === 'ArrowUp'){
        keyUp() 
     } else if(e.key === 'ArrowDown'){
        keyDown() 
     }
 }

 document.addEventListener('keydown', controls)

 function keyLeft(){
    moveLeft()
    combineRow()
    moveLeft()
    generateBlocksValue()

 }

function keyRight(){
        moveRight()
        combineRow()
        moveRight()
        generateBlocksValue()
    
     }

     function keyUp(){
        moveUp()
        combineColumn()
        moveUp()
        generateBlocksValue()
    
     }

     function keyDown(){
        moveDown()
        combineColumn()
        moveDown()
        generateBlocksValue()
    
     }

     //checking for a win(looking for number 2048)!

     function checkGamesStatus(){
        let zeros = 0
      for(let i=0 ; i < blocks.length; i++) {
        if(blocks.innerHTML == 2048){
            alert("welldone")
            document.removeEventListener('keydown', controls)
        }else if(blocks[i].innerHTML == 0){
           zeros++ 
        }
      }
      if (zeros === 0){
        alert("game over")
        document.removeEventListener('keydown', controls)
      }

     }
  
});
