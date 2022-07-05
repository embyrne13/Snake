const letters = document.getElementById('letters')
const opt = document.getElementById('options')
const userInput = document.getElementById('user-input')
const newGame = document.getElementById('new-game')
const newButton = document.getElementById('ngb')
const results = document.getElementById('results')

let options = {
  Animals: [
    'monkey',
    'zebra',
    'jaguar',
    'elephant',
    'chimpanzee',
    'koala',
    'skunk',
    'raccoon',
    'crocodile',
    'giraffe'
  ],
  Food: [
    'spaghetti',
    'quiche',
    'dumplings',
    'hamburger',
    'zucchini',
    'eggplant',
    'pizza',
    'mushroom',
    'falafel',
    'asparagus'
  ]
}

let winCount = 0
let count = 0
let chosenWord = ''

const displayOpt = () => {
  opt.innerHTML += `<h2>Pick a Category</h2>`
  let buttonE = document.createElement('div')
  for (let value in options) {
    buttonE.innerHTML += `<button class="opts" onclick="getWord('${value}')">${value}</button>`
  }
  opt.appendChild(buttonE)
}
const block = () => {
  let optButton = document.querySelectorAll('.options')
  let letBut = document.querySelectorAll('.letters')
  optButton.forEach((button) => {
    button.disabled = true
  })
  letBut.forEach((button) => {
    button.disabled.true
  })
  newGame.classList.remove('hide')
}
const getWord = (optionValue) => {
  let optButton = document.querySelectorAll('.opts')
  optButton.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add('active')
    }
    button.disabled = true
  })
  letters.classList.remove('hide')
  userInput.innerText = ''
  let optArray = options[optionValue]
  chosenWord = optArray[Math.floor(Math.random() * optArray.length)]
  chosenWord = chosenWord.toUpperCase()
  console.log(chosenWord)

  let display = chosenWord.replace(/./g, '<span class="dashes">_</span>')
  userInput.innerHTML = display
  letters.append('button')
}
const init = () => {
  winCount = 0
  count = 0
  userInput.innerHTML = ''
  opt.innerHTML = ''
  letters.classList.add('hide')
  newGame.classList.add('hide')
  letters.innerHTML = ''
  for (let i = 65; i < 91; i++) {
    let button = document.createElement('button')
    button.classList.add('letters')
    button.innerText = String.fromCharCode(i)
    button.addEventListener('click', () => {
      let cArray = chosenWord.split('')
      let dashes = document.getElementsByClassName('dashes')
      if (cArray.includes(button.innerText)) {
        cArray.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char
            winCount += 1
            if (winCount == cArray.length) {
              results.innerHTML = `<h3 class='message'>You win!!!</h3><p>The word was <span>${chosenWord}</span></p>`
              block()
            }
          }
        })
      } else {
        count += 1
        // byeHouse(count)
        if (count == 5) {
          results.innerHTML = `<h3 class='lmessage'>You Lose :(</h3><p>The word was <span>${chosenWord}</span></p>`
          console.log(count)
          block()
        }
      }
      button.disabled = true
    })
    letters.append(button)
  }
  displayOpt()
  newButton.addEventListener('click', init)
}
window.onload = init
