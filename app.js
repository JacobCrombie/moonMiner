//Elements


let autoUpgradesElem = document.getElementById("autoUpgrades")
let clickUpgradesElem = document.getElementById("clickUpgrades")
let playerElem = document.getElementById("player")

// Player Data


let player = {
  name: "Jake",
  count: 1000
}


//Upgrades Data
let clickUpgrades = [
  {
    name: "Pickaxes",
    price: 100,
    quantity: 1,
    multiplier: 1
  }


]


let autoUpgrades = [
  {
    name: "Rovers",
    price: 600,
    quantity: 0,
    multiplier: 20
  }

]



//#region GAME LOGIC

function mine() {
  // forloop to go over upgrades multiply quantity by multiplier
    clickUpgrades.forEach(upgrade => {
    player.count += upgrade.quantity * upgrade.multiplier +1
  })

  drawPlayer()
}

function purchase(name) {
  // if statement for (player.count >= upgrade.price) then increase upgrade quantity by 1 and decrease player.count by upgrade.price
  
  let upgrade = clickUpgrades.find(u => u.name == name)
   if (!upgrade) {
     upgrade = autoUpgrades.find(u => u.name == name)
   }
  
  
  if(upgrade.price> player.count){
     return
   }else{
     upgrade.quantity++
     player.count -= upgrade.price
   }
  drawPlayer()
  drawUpgrades()
}

//#endregion


//#region Draw Methods

function drawPlayer() {
  playerElem.innerHTML = `<div>Player Name: ${player.name}  Clicks: ${player.count} </div>`
}


function drawUpgrades() {
  let autotemplate = ""
  let clicktemplate = ""

  autoUpgrades.forEach(upgrade => {
    autotemplate += upgradeTemplate(upgrade)
  })

  clickUpgrades.forEach(upgrade => {
    clicktemplate += upgradeTemplate(upgrade)
  })
  autoUpgradesElem.innerHTML = autotemplate
  clickUpgradesElem.innerHTML = clicktemplate
}

function upgradeTemplate(upgrade) {
  return `<button class="" onclick="purchase('${upgrade.name}')">Type: ${upgrade.name} Price: ${upgrade.price} Quantity: ${upgrade.quantity} Multiplier: ${upgrade.multiplier}</button>`
}


//#endregion

function updateScreen() {
  drawUpgrades()
  drawPlayer()
}

updateScreen()
