// client side JS
console.log('Client side JS file is loaded')

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
// note for classes, use '.' before name, for id's use '#'
const msgOne = document.querySelector('#msg-one')
const msgTwo = document.querySelector('#msg-two')

// msgOne.textContent = 'From JS'

// N.B. browser refreshes after event by default, can prevent default behaviour using 'e'
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = searchInput.value // .value extracts the input

    // set loading message, and clear previous messages
    msgOne.textContent = "Loading..."
    msgTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
            }
        })
    })
})
