document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const result = document.getElementById('result')
    let tiles = []
    let width = 4
    let score = 0;
    
    
    //create the layout for the game
    function createGame() {
        for(let i=0; i < 16; i++) {
    tile = document.createElement('div')
    tile.innerHTML = 0
    grid.appendChild(tile)
    tiles.push(tile)
       
       }
       // generate two random numbers
       createDigit()
       createDigit()
    }
    createGame()
    
    // generate a random digit
    function createDigit() {
        let randomDigit = Math.floor(Math.random() * tiles.length)
        if (tiles[randomDigit].innerHTML == 0) {
            tiles[randomDigit].innerHTML = 2
            checkForGameOver()
        } else createDigit()
        }
        
        
        // allows the user to move right
        function moveRight() {
            for (let i=0; i < 16; i++) {
              if (i % 4 === 0) {
                let totalOne = tiles[i].innerHTML
                let totalTwo = tiles[i+1].innerHTML
                let totalThree = tiles[i+2].innerHTML
                let totalFour = tiles[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
        
                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)
        
                tiles[i].innerHTML = newRow[0]
                tiles[i +1].innerHTML = newRow[1]
                tiles[i +2].innerHTML = newRow[2]
                tiles[i +3].innerHTML = newRow[3]
              }
            }
          }
        // allows the user to move left
          function moveLeft() {
            for (let i=0; i < 16; i++) {
              if (i % 4 === 0) {
                let totalOne = tiles[i].innerHTML
                let totalTwo = tiles[i+1].innerHTML
                let totalThree = tiles[i+2].innerHTML
                let totalFour = tiles[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
        
                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)
        
                tiles[i].innerHTML = newRow[0]
                tiles[i +1].innerHTML = newRow[1]
                tiles[i +2].innerHTML = newRow[2]
                tiles[i +3].innerHTML = newRow[3]
              }
            }
          }
        
          // allows the user to move up
          function moveUp() {
            for (let i=0; i < 4; i++) {
              let totalOne = tiles[i].innerHTML
              let totalTwo = tiles[i+width].innerHTML
              let totalThree = tiles[i+(width*2)].innerHTML
              let totalFour = tiles[i+(width*3)].innerHTML
              let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
        
              let filteredColumn = column.filter(num => num)
              let missing = 4 - filteredColumn.length
              let zeros = Array(missing).fill(0)
              let newColumn = filteredColumn.concat(zeros)
        
              tiles[i].innerHTML = newColumn[0]
              tiles[i +width].innerHTML = newColumn[1]
              tiles[i+(width*2)].innerHTML = newColumn[2]
              tiles[i+(width*3)].innerHTML = newColumn[3]
            }
          }

        // allows the user to move right
          function moveDown() {
            for (let i=0; i < 4; i++) {
              let totalOne = tiles[i].innerHTML
              let totalTwo = tiles[i+width].innerHTML
              let totalThree = tiles[i+(width*2)].innerHTML
              let totalFour = tiles[i+(width*3)].innerHTML
              let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
        
              let filteredColumn = column.filter(num => num)
              let missing = 4 - filteredColumn.length
              let zeros = Array(missing).fill(0)
              let newColumn = zeros.concat(filteredColumn)
        
              tiles[i].innerHTML = newColumn[0]
              tiles[i +width].innerHTML = newColumn[1]
              tiles[i+(width*2)].innerHTML = newColumn[2]
              tiles[i+(width*3)].innerHTML = newColumn[3]
            }
          }
        
        // functions  to combine the tiles 
        
        function combineRow() {
            for (let i =0; i < 15; i++) {
              if (tiles[i].innerHTML === tiles[i +1].innerHTML) {
                let combinedTotal = parseInt(tiles[i].innerHTML) + parseInt(tiles[i +1].innerHTML)
                tiles[i].innerHTML = combinedTotal
                tiles[i +1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
              }
            }
            checkForWin()
          }

          function combineColumn() {
            for (let i =0; i < 12; i++) {
              if (tiles[i].innerHTML === tiles[i +width].innerHTML) {
                let combinedTotal = parseInt(tiles[i].innerHTML) + parseInt(tiles[i +width].innerHTML)
                tiles[i].innerHTML = combinedTotal
                tiles[i +width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
              }
            }
            checkForWin()
          }


     // assigning the functions to the keycodes

     function control(e) {
        if(e.keyCode === 37) {
          keyLeft()
        } else if (e.keyCode === 38) {
          keyUp()
        } else if (e.keyCode === 39) {
          keyRight()
        } else if (e.keyCode === 40) {
          keyDown()
        }
      }
      document.addEventListener('keyup', control)
    
      function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        createDigit()
      }
    
      function keyLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        createDigit()
      }
    
      function keyUp() {
        moveUp()
        combineColumn()
        moveUp()
        createDigit()
      }
    
      function keyDown() {
        moveDown()
        combineColumn()
        moveDown()
        createDigit()
      }

      //check for the number 2048 in the tiles to win
  function checkForWin() {
    for (let i=0; i < tiles.length; i++) {
      if (tiles[i].innerHTML == 2048) {
        result.style.color = 'green'
        document.removeEventListener('keyup', control)
        setTimeout(() => clear(), 3000)
      }
    }
  }

  //check if there are no zeros on the board to lose
  function checkForGameOver() {
    let zeros = 0
    for (let i=0; i < tiles.length; i++) {
      if (tiles[i].innerHTML == 0) {
        zeros++
      }
    }
    if (zeros === 0) {
      result.innerHTML = 'You lost!'
      result.style.color = 'red'
      document.removeEventListener('keyup', control)
      setTimeout(() => clear(), 3000)
    }
  }

  function clear() {
    clearInterval(myTimer)
  }

  //add colours to the tiles depending on the numerical value
  function addColours() {
    for (let i=0; i < tiles.length; i++) {
      if (tiles[i].innerHTML == 0) tiles[i].style.backgroundColor = 'white'
      else if (tiles[i].innerHTML == 2) tiles[i].style.backgroundColor = '#E0E0E0'
      else if (tiles[i].innerHTML  == 4) tiles[i].style.backgroundColor = '#EEB4B4' 
      else if (tiles[i].innerHTML  == 8) tiles[i].style.backgroundColor = '#F08080' 
      else if (tiles[i].innerHTML  == 16) tiles[i].style.backgroundColor = '#8B3A3A' 
      else if (tiles[i].innerHTML  == 32) tiles[i].style.backgroundColor = '#FFCCFF' 
      else if (tiles[i].innerHTML == 64) tiles[i].style.backgroundColor = '#FFCCFF' 
      else if (tiles[i].innerHTML == 128) tiles[i].style.backgroundColor = '#FFCCFF' 
      else if (tiles[i].innerHTML == 256) tiles[i].style.backgroundColor = '#FFCCFF' 
      else if (tiles[i].innerHTML == 512) tiles[i].style.backgroundColor = '#FFCCFF' 
      else if (tiles[i].innerHTML == 1024) tiles[i].style.backgroundColor = '#FFCCFF' 
      else if (tiles[i].innerHTML == 2048) tiles[i].style.backgroundColor = '#FFCCFF' 
    }
}

addColours()

//interval between switching of colours
var myTimer = setInterval(addColours, 600)
    
    
})
    