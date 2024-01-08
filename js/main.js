const els = {
    firstScreen: null,
    questionScreen: null,
    endScreen: null,
    firstBtn: null,
    answers: null,
    endBtn: null,
    answersContainer: null
};

let questionIndex = 0;

const questions = [{
        question: 'Quel est ton personnage préféré dans Star Wars ?',
        answers: [{
            title: 'Luke Skywalker',
            side: 'Jedi'
        }, {
            title: 'Dark Vador',
            side: 'Sith'
        }, {
            title: 'Padmé Amidala',
            side: 'nonReceptif'
        }, {
            title: 'Obi-Wan',
            side: 'Jedi'
        }]
    },
    {
        question: 'POV : Tu es maître jedi, ton apprenti te trahi et t\'attaque par derrière. Que fais-tu ?',
        answers: [{
            title: 'Je ferais ce que j\'ai à faire, il mérite la mort !',
            side: 'Sith'
        }, {
            title: 'Je le maîtrise, il sera jugée par la République Galactique !',
            side: 'Jedi'
        }, {
            title: 'J\'esquive son attaque et me rend sur Coruscant pour prévenir le Conseil Jedi. ',
            side: 'nonReceptif'
        }]
    },
    {
        question: 'Quel est ta couleur préférée ?',
        answers: [{
            title: 'Rouge comme le sang de mes ennemis',
            side: 'Sith'
        }, {
            title: 'Bleu comme Max Rebo, le célèbre musicien',
            side: 'Jedi'
        }, {
            title: 'Jaune comme un Chasseur Naboo N-1 ',
            side: 'Jedi'
        }, {
            title: 'Rose comme la panthère ',
            side: 'nonReceptif'
        }]
    },
    {
        question: 'Que pensez-vous de la Postlogie ?',
        answers: [{
            title: 'C\'est quoi la Postlogie ?',
            side: 'nonReceptif'
        }, {
            title: 'J\'adore ! Disney a vraiment sublimé l\'oeuvre. Mon préféré c\'est l\'Episode IX.',
            side: 'Sith'
        }, {
            title: 'Une descente aux enfers, c\'est dommage, il y avait quelques bonnes idées.',
            side: 'Jedi'
        }]
    }
];

const recordedAnswers = [];


const init = () => {
    console.log('OK, la page a été chargée');

    els.firstScreen = document.querySelector('.first-screen');
    els.questionScreen = document.querySelector('.question-screen');
    els.endScreen = document.querySelector('.end-screen');
    els.firstBtn = els.firstScreen.querySelector('button');
    els.endBtn = els.endScreen.querySelector('button');
    els.answersContainer = els.questionScreen.querySelector('ul');

    els.firstBtn.addEventListener('click', () => {
        displayScreen('question');
        displayQuestion(questionIndex);
    });
    els.endBtn.addEventListener('click', () => {
        displayScreen('first');
        questionIndex = 0;
    });

    els.answersContainer.addEventListener('click', ({ target }) => {
        if (target.tagName !== 'LI') {
            return;
        }
        const side = target.getAttribute('data-side');
        recordedAnswers.push(side);

        questionIndex++;

        if (questionIndex >= questions.length) {
            calculateScore();
            displayScreen('end');
        } else {
            displayQuestion(questionIndex);
        }
    });

};

const calculateScore = () => {
    const side = recordedAnswers.sort((a, b) => {
        return recordedAnswers.filter(answer => answer === a).length - 
        recordedAnswers.filter(answer => answer === b).length 
    }).pop();
   

    const realside = {
        Jedi: 'UN JEDI',
        Sith: 'UN SITH',
        nonReceptif: 'NON RECEPTIF'
    };

    const imgside = {
        Jedi: 'jedi.jpg',
        Sith: 'sith.jpg',
        nonReceptif: 'nonreceptif.jpg'
    }

    const styleside = {
        Jedi: 'rgb(11, 11, 88)',
        Sith: 'rgb(80, 12, 12)',
        nonReceptif: 'rgb(86, 61, 14)'
    }

    els.endScreen.querySelector('span').textContent = realside[side];
    els.endScreen.querySelector('img').src = 'img/' + imgside[side];
    els.endScreen.querySelector('.box2').style.background = `linear-gradient(360deg, ${styleside[side]}, black)`;

};

const displayQuestion = (index) => {

    const currentQuestion = questions[index];

    const questionEl = els.questionScreen.querySelector('h2');

    const answerEls = currentQuestion.answers.map((answer) => {
        const liEl = document.createElement('li');
        liEl.textContent = answer.title;
        liEl.setAttribute('data-side', answer.side);
        return liEl;
    });

    questionEl.textContent = currentQuestion.question;

    const pageNumberEl = els.questionScreen.querySelector('p');
    pageNumberEl.textContent = `${index + 1}/${questions.length}`;
    
    els.answersContainer.textContent = '';
    els.answersContainer.append(...answerEls);
};

const displayScreen = (screenName) => {
    // console.log('screenName', screenName);
    els.firstScreen.style.display = 'none';
    els.questionScreen.style.display = 'none';
    els.endScreen.style.display = 'none';

    const screen = els[screenName + 'Screen'];
    // console.log('screen', screen);
    screen.style.display = 'flex';
};


window.addEventListener('load', init);
