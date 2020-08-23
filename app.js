
//Elements
//TODO uncomment let playerName = prompt("Are you the One? Enter matrix given Name:")
let upgradeElem = document.getElementById("upgrades")
let playerElem = document.getElementById("player")
let clickUpgradeElem = document.getElementById("clickUpgradeData")
let autoUpgradeElem = document.getElementById("autoUpgradeData")

// Player Data

//TODO change count to zero uncomment name
let player = {
  // name: playerName,
  count: 1000
}

let playerUpgrades = []

//Upgrades Data
let upgrades = [
  {
    name: "Red Pill",
    price: 50,
    quantity: 0,
    multiplier: 1,
    auto: false,
    img: "redpill.png"
  },
  {
    name: "Spoon",
    price: 75,
    quantity: 0,
    multiplier: 2,
    auto: false,
    img: "spoon.png"
  },
  {
    name: "Glock",
    price: 100,
    quantity: 0,
    multiplier: 3,
    auto: false,
    img: "gun.png"
  },
  {
    name: "Trinity",
    price: 200,
    quantity: 0,
    multiplier: 2,
    auto: true,
    img: "Trinity.png"
  },
  {
    name: "Morpheus",
    price: 300,
    quantity: 0,
    multiplier: 2,
    auto: true,
    img: "morpheus.png"
  },
  {
    name: "Neo",
    price: 500,
    quantity: 0,
    multiplier: 2,
    auto: true,
    img: "neo.png"
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
  drawPlayerUpgrades()
  drawPlayer()
  drawUpgrades()
}

function autoUpgrade() {
  //TODO remove interval to restart
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

function drawPlayerUpgrades() {
  let clickTemplate = ""
  let autoTemplate = ""

  upgrades.forEach(upgrade => {
    if (upgrade.auto == true) {
      autoTemplate += playerUpgradesTemplate(upgrade)
    } else {
      clickTemplate += playerUpgradesTemplate(upgrade)
    }
  })
  clickUpgradeElem.innerHTML = clickTemplate
  autoUpgradeElem.innerHTML = autoTemplate
}

function playerUpgradesTemplate(upgrade) {
  return `<li class="text-light">Price: ${upgrade.price}|<img src="${upgrade.img}" alt=""> X${upgrade.multiplier * upgrade.quantity}</li>`
}

function drawUpgrades() {
  let template = ""

  upgrades.forEach(upgrade => {
    template += upgradeTemplate(upgrade)
  })
  upgradeElem.innerHTML = template
}

function upgradeTemplate(upgrade) {
  return `<button class="btn btn-primary col-3 justify-space-around m-1" onclick="purchase('${upgrade.name}')"><img src="${upgrade.img}" alt="" >${upgrade.quantity}</button>`
}


//#endregion

function updateScreen() {
  drawUpgrades()
  drawPlayer()
  drawPlayerUpgrades()
}

updateScreen()
