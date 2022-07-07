const letters = document.getElementById('letters')
const opt = document.getElementById('options')
const userInput = document.getElementById('user-input')
const newButton = document.getElementById('ngb')
const results = document.getElementById('results')
const house = document.getElementById('house')
const line1 = document.querySelector('.line-1')
const line2 = document.querySelector('.line-2')
const line3 = document.querySelector('.line-3')
const line4 = document.querySelector('.line-4')
const line5 = document.querySelector('.line-5')
const line6 = document.querySelector('.line-6')
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
    'giraffe',
    'ostrich',
    'python',
    'sloth',
    'alpaca',
    'rabbit'
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
    'asparagus',
    'popcorn',
    'pizza',
    'cupcake',
    'salad',
    'spinach'
  ]
}

let winCount = 0
let count = 0
let chosenWord = ''

const displayOpt = () => {
  opt.classList.remove('hide')
  opt.innerHTML += `<h2>Pick a Category</h2>`
  let buttonE = document.createElement('div')
  for (let value in options) {
    buttonE.innerHTML += `<button class="opts" onclick="getWord('${value}')">${value}</button>`
  }
  opt.appendChild(buttonE)
}
const block = () => {
  letters.classList.add('hide')
  results.classList.remove('hide')
  opt.classList.add('hide')
  userInput.classList.add('hide')
  newButton.classList.remove('hide')
  line1.classList.add('hide')
  line2.classList.add('hide')
  line3.classList.add('hide')
  line4.classList.add('hide')
  line5.classList.add('hide')
}
const getWord = (optionValue) => {
  let optButton = document.querySelectorAll('.opts')
  optButton.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add('active')
    }
    button.disabled = true
  })
  opt.innerHTML += `<h2>Pick a Letter</h2>`
  letters.classList.remove('hide')
  userInput.innerText = ''
  let optArray = options[optionValue]
  chosenWord = optArray[Math.floor(Math.random() * optArray.length)]
  chosenWord = chosenWord.toUpperCase()
  console.log(chosenWord)

  let display = chosenWord.replace(/./g, '<span class="dashes">_</span>')
  userInput.innerHTML = display
}

const startNew = () => {
  winCount = 0
  count = 0
  userInput.innerHTML = ''
  opt.innerHTML = ''
  line1.classList.remove('hide')
  line2.classList.remove('hide')
  line3.classList.remove('hide')
  line4.classList.remove('hide')
  line5.classList.remove('hide')
  results.classList.add('hide')
  newButton.classList.add('hide')
  letters.classList.add('hide')
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
            button.disabled = true
            if (winCount === cArray.length) {
              results.innerHTML = `<h3 class='message'>You win!</h3><p>The word was ${chosenWord}</p>`
              block()
            }
          }
        })
      } else {
        count += 1
        button.disabled = true
        switch (count) {
          case 1:
            document.querySelector('.line-1').classList.add('ani')
            setTimeout(() => {
              line1.classList.add('hide')
            }, 1000)
            break
          case 2:
            document.querySelector('.line-2').classList.add('ani')
            setTimeout(() => {
              line2.classList.add('hide')
            }, 1000)
            break
          case 3:
            document.querySelector('.line-3').classList.add('ani')
            setTimeout(() => {
              line3.classList.add('hide')
            }, 1000)
            break
          case 4:
            document.querySelector('.line-4').classList.add('ani')
            setTimeout(() => {
              line4.classList.add('hide')
            }, 1000)
            break
          case 5:
            document.querySelector('.line-5').classList.add('ani')
            setTimeout(() => {
              line5.classList.add('hide')
            }, 1000)
            break
          default:
            line1.classList.remove('hide')
            line2.classList.remove('hide')
            line3.classList.remove('hide')
            line4.classList.remove('hide')
            console.log('default')
        }
        if (count === 5) {
          results.innerHTML = `<h3 class='lmessage'>You Lose : (</h3><p>The word was ${chosenWord}</p>`
          block()
        }
      }
    })
    letters.append(button)
  }
  displayOpt()
}
newButton.addEventListener('click', startNew)
window.onload = startNew
