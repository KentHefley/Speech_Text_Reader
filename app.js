const main = document.querySelector('main');
const textBox = document.getElementById('text-box');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const close = document.getElementById('close');

const data = [
    {
        image: './img/thirsty.png',
        text: "I'm Thirsty"
    },
    {
        image: './img/hungry.png',
        text: "I'm Hungry"
    },
    {
        image: './img/tired.png',
        text: "I'm Tired"
    },
    {
        image: './img/hurt.png',
        text: "I'm Hurt"
    },
    {
        image: './img/happy.png',
        text: "I'm Happy"
    },
    {
        image: './img/angry.png',
        text: "I'm Angry"
    },
    {
        image: './img/sad.png',
        text: "I'm Sad"
    },
    {
        image: './img/scared.png',
        text: "I'm Scared"
    },
    {
        image: './img/outdoors.png',
        text: "I want to go outside"
    },
    {
        image: './img/home.png',
        text: "I want to go home"
    },
    {
        image: './img/school.png',
        text: "I want to go to school"
    },
    {
        image: './img/bed.png',
        text: "I want to go to bed"
    },
]

data.forEach(createBox);



//*Functions

//Create Box

function createBox(item) {
    const box = document.createElement('div');
    const {image, text} = item;
    box.classList.add('box')
    box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
    `
    //? speak event
    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        //add active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });

    main.appendChild(box);
}

//Init speech synt
const message = new SpeechSynthesisUtterance();

//Store voices
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option')
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;
        voicesSelect.appendChild(option);
    })
}

// Set Text
function setTextMessage(text) {
    message.text = text
}

// Speak text
function speakText() {
    speechSynthesis.speak(message)
}

function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value)
}


//*Event Listeners

toggleBtn.addEventListener('click', () => {
    textBox.classList.toggle('show')
    textarea.value = '';
})

close.addEventListener('click', () => {
    textBox.classList.remove('show')
    textarea.value = '';
})

//voices change
speechSynthesis.addEventListener('voiceschanged', getVoices);

//change voices in select
voicesSelect.addEventListener('change', setVoice)

//Read Text in textarea
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
    textarea.disabled =  true;
    message.addEventListener('end', () => {
        textarea.disabled = false;
    })
})




//! Initial get voices call
getVoices();