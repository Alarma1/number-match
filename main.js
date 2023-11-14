
function createGameForm() {
  const headText = document.createElement('h1')
  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');
  const box = document.createElement('div');
  headText.innerHTML = 'Найди пару цифр';
  input.placeholder = 'Количество фишек';
  button.classList.add('startBtn');
  button.textContent = 'Начать игру';
  box.id = 'gameField';
  box.classList.add('field-container', 'playingField');
  document.getElementById('game').append(headText);
  form.append(input);
  form.append(button);
  document.body.append(box);

  return {
    headText,
    form,
    input,
    button,
    box
  };
}
function createGameButton() {
  const button = document.createElement('button')
  button.setAttribute('disabled', '')
  button.classList.add('btn', 'game-button');
  return button;
}

document.addEventListener('DOMContentLoaded', function () {

  function createGame(container) {
    const gameForm = createGameForm();
    container.append(gameForm.form);
    gameForm.form.addEventListener('submit', function (e) {
      e.preventDefault();
      let gameFormValue = gameForm.input.value * 2;
      const timerShow = document.getElementById("timer");
      document.getElementById('gameField').innerHTML = '';
      if (gameForm.input.value > 1 && gameForm.input.value < 11 && gameForm.input.value % 2 == 0) {

        clearInterval(timer);
        let timeMinut = 60;
        timer = setInterval(function () {
          seconds = timeMinut;
          if (timeMinut === -1) {
            clearInterval(timer);
            alert("Время закончилось");
          } else {
            let strTimer = `${seconds}`;
            timerShow.innerHTML = strTimer;
          }
          --timeMinut;
        }, 1000)
        for (let i = 0; i < gameFormValue; i++) {
          document.getElementById('gameField').append(createGameButton());
        }
        for (let i = 0; i < document.getElementById('gameField').childNodes.length; i++) {
          document.getElementById('gameField').childNodes[i].disabled = false
        }
      } else {
        gameForm.input.value = '4';
        gameFormValue = gameForm.input.value * 2;
        for (let i = 0; i < gameFormValue; i++) {
          document.getElementById('gameField').append(createGameButton());
        }
        clearInterval(timer);
        timerShow.innerHTML = '';
      };
      let shuffleMass = shuffle();
      let buttonNumber = [];
      let buttonNumberCheck = [];

      for (let i = 0; i < document.getElementById('gameField').childNodes.length; i++) {
        document.getElementById('gameField').childNodes[i].innerText = shuffleMass[i]

        document.getElementsByClassName('btn')[i].addEventListener('click', function () {
          document.getElementById('gameField').childNodes[i].classList.toggle('game-button')
          document.getElementById('gameField').childNodes[i].classList.toggle('click-on')
          document.getElementById('gameField').childNodes[i].disabled = true
          buttonNumber.push(document.getElementById('gameField').childNodes[i].innerText)
          if (buttonNumber[0] === buttonNumber[1]) {
            buttonNumberCheck.push(buttonNumber[0])
            buttonNumberCheck.push(buttonNumber[1])
            for (let i = 0; i < document.getElementById('gameField').childNodes.length; i++) {
              if (document.getElementById('gameField').childNodes[i].innerText === buttonNumber[0] || document.getElementById('gameField').childNodes[i].innerText === buttonNumber[1]) {
                document.getElementById('gameField').childNodes[i].classList.add('disabled')
                document.getElementById('gameField').childNodes[i].classList.remove('click-on')
                document.getElementById('gameField').childNodes[i].disabled = true
              }
            }
            if (document.getElementById('gameField').childNodes.length === buttonNumberCheck.length) {
              alert("Поздравляю!Вы победили!");
              clearInterval(timer);
            }
            buttonNumber = []
          } else {
            if (buttonNumber.length === 2 && buttonNumber[0] !== buttonNumber[1]) {
              for (let i = 0; i < document.getElementById('gameField').childNodes.length; i++) {
                if (document.getElementById('gameField').childNodes[i].classList.contains('click-on')) {
                  document.getElementById('gameField').childNodes[i].classList.toggle('game-button')
                  document.getElementById('gameField').childNodes[i].classList.toggle('click-on')
                  document.getElementById('gameField').childNodes[i].disabled = false
                }
                if (buttonNumberCheck >= 2) {
                  for (let j = 0; j < buttonNumberCheck.length; j++) {
                    if (document.getElementById('gameField').childNodes[i] !== buttonNumberCheck[j]) {
                      document.getElementById('gameField').childNodes[i].disabled = false
                    }
                  }
                }
              }
              buttonNumber = []
            }
          }
        })
      }
    });
  }
  function shuffle() {
    let shuffleArr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 0, 0]
    let numberArr = []
    for (let i = 0; i < document.getElementById('gameField').childNodes.length; i++) {
      numberArr.push(shuffleArr[i])
    }
    for (let i = numberArr.length - 1; i > 0; i--) {
      const newArr = numberArr[i]
      let randomNumber = Math.floor(Math.random() * (i + 1));
      numberArr[i] = numberArr[randomNumber]
      numberArr[randomNumber] = newArr
    }
    return numberArr
  }
  createGame(document.getElementById('game'));
});
