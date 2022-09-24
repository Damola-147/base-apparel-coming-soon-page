const inputElem = document.getElementById('input');
const button = document.getElementById('btn');
const inputContainer = document.querySelector('.input-container');

let email;
let iconImg;
let errTag;
let tagExists = false;

inputElem.addEventListener('input', () => {
    if(iconImg && errTag) {
        const msg = inputContainer.querySelector('.err-msg');
        const icon = inputContainer.querySelector('.err-icon');
        try {
            msg.remove();
            icon.remove();
        } catch (err) {
            console.log(err.message);
        }
    }
    tagExists = false;
    inputElem.classList.remove('red-border');
});

button.addEventListener('click', btnHandler);

function btnHandler() {
    const input = getInputValue();
    const value = validateInput(input);
    
    if(value === 'Error') {
        showError();
        return;
    }

    email = value;
    inputElem.value = '';
}

function getInputValue() {
    const input = inputElem.value.trim();
    return input;
}

function validateInput(value) {
    const email = value.split('@')[1];
    
    if(value.includes('@') && email.trim().length > 3) {
        return value;
    } else {
        return 'Error';
    }
}

function showError() {
    const errMsg = createTag('p', [{className: 'err-msg'}], 'Please provide a valid email');
    const errIcon = createTag(
        'img', 
        [
            {className: 'err-icon'},
            {src: './images/icon-error.svg'},
            {alt: 'error-icon'}
        ]
    );

    iconImg = errIcon;
    errTag = errMsg;

    if(!tagExists) {
        inputContainer.appendChild(errIcon);
        inputContainer.appendChild(errMsg);
        tagExists = true;
    }

    inputElem.classList.add('red-border');
}

function createTag(name, attr, value) {
    const tag = document.createElement(name);

    if(value) {
        tag.innerText = value;
    }

    for (let obj of attr) {
        for(let key in obj) {
            tag[key] = obj[key];
        }
    }

    return tag;
}