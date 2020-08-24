
//Elements

let upgradeElem = document.getElementById("upgrades")
let playerElem = document.getElementById("player")
let clickUpgradeElem = document.getElementById("clickUpgradeData")
let autoUpgradeElem = document.getElementById("autoUpgradeData")

// Player Data

let player = {
  count: 0
}

function setPlayer(event) {
  event.preventDefault()
  let form = event.target


  player['name'] = form.playerName.value

  document.getElementById("game").classList.remove("d-none")
  document.getElementById("upButtons").classList.remove("d-none")
  document.getElementById("form").classList.add("d-none")
  drawPlayer()
}

// TODO maybe work on adding images for quantity
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
    price: 3000,
    quantity: 0,
    multiplier: 5,
    auto: true,
    img: "Trinity.png"
  },
  {
    name: "Morpheus",
    price: 5000,
    quantity: 0,
    multiplier: 8,
    auto: true,
    img: "morpheus.png"
  },
  {
    name: "Neo",
    price: 10000,
    quantity: 0,
    multiplier: 10,
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
  // drawDisabled()
}


function purchase(name) {
  // TODO add your draw function for interval purchase here

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
  // drawDisabled()
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
  return `<li class="text-light">${upgrade.quantity}|<img src="${upgrade.img}" alt=""> X${upgrade.multiplier * upgrade.quantity}</li>`
}
//TODO slacked tim for help on this one wait on reply or ask about it on grading its skipping my if and else statements uncomment all draws

//  function drawDisabled() {
//   debugger
//   upgrades.forEach(upgrade => {
//     toggleDisabled(upgrade)
//   });
// }

// function toggleDisabled(upgrade) {
//   let buttonElems = document.querySelectorAll('btn-hide')
//   console.log(buttonElems)
//   buttonElems.forEach(btn => {
//     if (upgrade.price > player.count) {
//       btn.classList.add("disabled")
//     } else {
//       btn.classList.remove("disabled")
//     }
//   });
// }

function drawUpgrades() {
  let template = ""

  upgrades.forEach(upgrade => {
    template += upgradeTemplate(upgrade)
  })
  upgradeElem.innerHTML = template
}
// TODO after you get the clear and add disabled class done try adding the removing display none function add the draw to the mine function
function upgradeTemplate(upgrade) {
  return `<button class="btn btn-secondary col-3 justify-space-around m-1 btn-hide " onclick="purchase('${upgrade.name}')"><img src="${upgrade.img}" alt="" >Price:${upgrade.price}</button>`
}


//#endregion

function updateScreen() {
  drawUpgrades()
  drawPlayerUpgrades()
  // drawDisabled()
  drawPlayer()
}

updateScreen()
