const textElement = document.querySelector('#text');
const optionButtonsElement = document.querySelector('#option-buttons');

let state = {};

function startGame() {
    state = {};
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

const textNodes = [
    {
        id: 1,
        text: `"BEEP BEEP BEEP!"`,
        options: [
            {
                text: 'Press the snooze button and go back to sleep.',
                nextText: 2
            },
            {
                text: 'Pick up your phone.',
                nextText: 3
            }
        ]
    },
    {
        id: 2,
        text: `Zzzzzzzz...
        Ten minutes pass.`,
        options: [
            {
                text: 'This feels nice. So comfy.',
                nextText: -1
            }
        ]

    },
    {
        id: 3,
        text: `You pick up your phone.
        The bright screen temporarily blinds you.
        Rubbing your eyes you tap on the "Stop" alarm button and look at the screen.
        "6am."
        A few seconds pass and you get out of bed.`,
        options: [
            {
                text: 'Go to the toilet.',
                nextText: 4
            },
            {
                text: 'Go to the kitchen.',
                nextText: 5
            }
        ]

    },
    {
        id: 4,
        text: `You reach the toilet.
        It is dark.`,
        options: [
            {
                text: 'Pee in the dark.',
                nextText: 6
            },
            {
                text: 'Flip the light switch.',
                nextText: 7
            }
        ]

    },
    {
        id: 5,
        text: `You reach the kitchen.
        Moonlight streams through the windows.
        You feel neither hungry nor thirsty.`,
        options: [
            {
                text: 'Go to the toilet.',
                nextText: 4
            }
        ]

    },
    {
        id: 6,
        text: `You start peeing and realize
        that you are actually in the kitchen. 
        Peeing in your breakfast bowl.
        OMG.
        `,
        options: [
            {
                text: 'This must be a dream.',
                nextText: -1
            }
        ]

    },
    {
        id: 7,
        text: `The lights flicker on.
        You see yourself in the mirror.`,
        options: [
            {
                text: 'Pee.',
                // setState: { houseKey: false },
                nextText: 8
            }
        ]

    },
    {
        id: 8,
        text: `You Pee.
        A great sense of relief.
        To be continued...`,
        options: [
            {
                text: 'Restart story.',
                nextText: -1
            }
        ]

    }
]

startGame();