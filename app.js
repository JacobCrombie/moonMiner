
//Elements
//TODO uncomment let playerName = prompt("Are you the One? Enter matrix given Name:")
let upgradeElem = document.getElementById("upgrades")
let playerElem = document.getElementById("player")

// Player Data

//TODO change count to zero uncomment name
let player = {
  // name: playerName,
  count: 1000
}


//Upgrades Data
let upgrades = [
  {
    name: "Pickaxes",
    price: 100,
    quantity: 0,
    multiplier: 1,
    auto: false
  },
  {
    name: "Gun",
    price: 100,
    quantity: 0,
    multiplier: 2,
    auto: false
  },
  {
    name: "Gun",
    price: 100,
    quantity: 0,
    multiplier: 2,
    auto: false
  },
  {
    name: "Rovers",
    price: 200,
    quantity: 0,
    multiplier: 2,
    auto: true
  },
  {
    name: "Tank",
    price: 300,
    quantity: 0,
    multiplier: 2,
    auto: true
  },
  {
    name: "Rovers",
    price: 200,
    quantity: 0,
    multiplier: 2,
    auto: true
  }
]




//#region GAME LOGIC

function mine() {
  // forloop to go over upgrades multiply quantity by multiplier
  // debugger
  console.log(player.count)
  upgrades.forEach(upgrade => {
    if (upgrade.quantity == 0) {
      return
    } else if (upgrade.auto == true) {
      return
    } else {
      player.count += upgrade.quantity * upgrade.multiplier
      console.log(player.count)
    }
  })
  player.count++
  drawPlayer()
}


function purchase(name) {
  // if statement for (player.count >= upgrade.price) then increase upgrade quantity by 1 and decrease player.count by upgrade.price

  let purchased = upgrades.find(u => u.name == name)



  if (purchased.price > player.count) {
    return
  } else {
    if (purchased.auto == true) {
      autoUpgrade()
    }
    purchased.quantity++
    player.count -= purchased.price
    purchased.price = Math.floor(purchased.price * 1.15)

  }

  drawPlayer()
  drawUpgrades()
}

function autoUpgrade() {
  setInterval(function () {
    upgrades.forEach(upgrade => {
      if (upgrade.auto == false) {
        return
      } else {
        player.count += upgrade.quantity * upgrade.multiplier
      }
      drawPlayer()
    })
  }, 5000)
}




//#endregion


//#region Draw Methods

function drawPlayer() {
  playerElem.innerHTML = `<div>Player Name: ${player.name}</div>
    <div>Clicks: ${player.count} </div>`
}


function drawUpgrades() {
  let template = ""


  upgrades.forEach(upgrade => {
    template += upgradeTemplate(upgrade)
  })
  upgradeElem.innerHTML = template
}

function upgradeTemplate(upgrade) {
  return `<button class="btn btn-primary col-3 justify-space-around m-1" onclick="purchase('${upgrade.name}')">Type: ${upgrade.name} Price: ${upgrade.price} Quantity: ${upgrade.quantity} Multiplier: ${upgrade.multiplier}</button>`
}


//#endregion

function updateScreen() {
  drawUpgrades()
  drawPlayer()
}

updateScreen()
