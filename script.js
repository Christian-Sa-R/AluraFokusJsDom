const html = document.querySelector('html');
const timer = document.querySelector('#timer')
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const playPauseBt = document.querySelector('#start-pause');
const textoPlayPauseBt = document.querySelector('.app__card-primary-button--text');
const statusImg = document.querySelector('.app__image');
const textoTitulo = document.querySelector('.app__title');
const imgPlayPause = document.querySelector('.app__card-primary-butto-icon');
const alterarMusica = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
    musica.loop = true;
const audioPlay = new Audio('sons/play.wav');
const audioPause = new Audio('sons/pause.mp3');
const audioTimeOut = new Audio('sons/beep.mp3');
const tempoFoco = 1500;
const tempoDescansoCurto = 300;
const tempoDescansoLongo = 900;

let intervalorId = null;
let tempoDecorrido = 5;

function alterarContexto(contexto){
    botoes.forEach(e => { //retira a classe "active" de todos os botoes
        e.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto); //muda a cor de fundo
    statusImg.setAttribute('src', `imagens/${contexto}.png`); //muda a imagem
    statusImg.setAttribute('alt', contexto); //muda o alt da imagem
    switch (contexto) { //muda o texto de acordo com o botao pressionado
        case "foco":
            textoTitulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `;
            break;
        case "descanso-curto":
            textoTitulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `;
            break;
        case "descanso-longo":
            textoTitulo.innerHTML = `
                Hora de voltar a superfície,<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>
                `;
            break;
    }
}

//inicio do bloco responsavel pelo temporizador
const contagemRegressiva = () => {
    if (tempoDecorrido <= 0) {
        finalizar();
        audioTimeOut.play();
        alert('Temporizador finalizado');
        return;
    }
    tempoDecorrido -= 1;
    console.log(`Temporizador: ${tempoDecorrido}`);
}
function iniciarOuPausar () {
    if (intervalorId) {
        finalizar();
        audioPause.play();
        return;
    } else{
        audioPlay.play();
    }
    intervalorId = setInterval(contagemRegressiva, 1000);
}
function finalizar() {
    clearInterval(intervalorId);
    intervalorId = null;
}
playPauseBt.addEventListener('click', () =>{
    iniciarOuPausar();
    if (imgPlayPause.getAttribute('src') === 'imagens/play_arrow.png') {
        imgPlayPause.setAttribute('src', 'imagens/pause.png')
        textoPlayPauseBt.innerHTML = 'Pausar'
    } else {
        imgPlayPause.setAttribute('src', 'imagens/play_arrow.png')
        textoPlayPauseBt.innerHTML = 'Começar'
    }
});

focoBt.addEventListener('click', () => {
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

alterarMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    }
    else {
        musica.pause();
    }
});