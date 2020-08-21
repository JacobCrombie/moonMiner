//Elements

let clickCount = 0

// Player Data

let player = {
  name: "Jake",
  upgrades:{},
  clickCount: 0
}

//Upgrades Data

let clickUpgrades = {
  pickaxes: {
    price: 100,
    quantity: 0,
    multiplier: 1
  }
}

let automaticUpgrades = {
  rovers: {
    price: 600,
    quantity: 0,
    multiplier: 20
  }
}


//#region 

function mine(){
  clickCount ++
  console.log(clickCount)
  drawClicks()
}

//#endregion


//#region Draw Methods

function drawClicks(){
  document.getElementById("clickCount").innerText = clickCount.toString()
}

//#endregion

function updateScreen(){
  drawClicks()
}

updateScreen()
