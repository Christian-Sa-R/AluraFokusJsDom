const html = document.querySelector('html');
const timer = document.querySelector('#timer')
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const playPauseBt = document.querySelector('#start-pause');
const statusImg = document.querySelector('.app__image');
const textoTitulo = document.querySelector('.app__title');
const imgPlayPause = document.querySelector('.app__card-primary-butto-icon');
const alterarMusica = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
    musica.loop = true;
const audioPlay = new Audio('sons/play.wav');
const audioPause = new Audio('sons/pause.mp3');
const audioTimeOut = new Audio('sons/beep.mp3');

let intervalorId = null;
let tempoDecorrido = 1500;
let tempoInicial = 1500;

function alterarContexto(contexto){
    audioTimeOut.pause(); //pausa o audio de timeout caso esteja ativo
    audioTimeOut.currentTime = 0; //reseta o audio de conclusao
    finalizar(); //pausa o timer antes de redefinir
    botoes.forEach(e => { //retira a classe "active" de todos os botoes
        e.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto); //muda a cor de fundo
    statusImg.setAttribute('src', `imagens/${contexto}.png`); //muda a imagem
    statusImg.setAttribute('alt', contexto); //muda o alt da imagem
    switch (contexto) { //muda o texto de acordo com o botao pressionado
        case "foco":
            tempoDecorrido = 1500;
            textoTitulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `;
            break;
        case "descanso-curto":
            tempoDecorrido = 300;
            textoTitulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `;
            break;
        case "descanso-longo":
            tempoDecorrido = 900;
            textoTitulo.innerHTML = `
                Hora de voltar a superfície,<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>
                `;
            break;
    }
    mostraTempo(); //exibe o timer ja atualizado
    tempoInicial = tempoDecorrido; //quando o tempo finalizar, a operacao inversa acontece
}

//inicio do bloco responsavel pelo temporizador
//verifica se o timer zerou. Caso nao, decrementa o timer exibe o tempo restante. Caso sim, toca o audio de fim, exibe alerta e finaliza
const contagemRegressiva = () => {
    if (tempoDecorrido <= 0) {
        audioTimeOut.play();
        finalizar();
        tempoDecorrido = tempoInicial;
        audioTimeOut.currentTime = 0;
        return;
    }
    tempoDecorrido -= 1;
    mostraTempo()
}
// verifica se existe contagem. Se sim, interrompe, senao, inicia
function iniciarOuPausar () {
    if (intervalorId) {
        finalizar();
        audioPause.play();
        return;
    }
    imgPlayPause.setAttribute('src', 'imagens/pause.png');
    imgPlayPause.nextElementSibling.innerHTML = 'Pausar';
    audioPlay.play();
    intervalorId = setInterval(contagemRegressiva, 1000);
}
// zera o temporizador, parando a contagem
function finalizar() {
    imgPlayPause.setAttribute('src', 'imagens/play_arrow.png');
    imgPlayPause.nextElementSibling.innerHTML = 'Começar';
    clearInterval(intervalorId);
    intervalorId = null;
}
playPauseBt.addEventListener('click', () =>{ //botao de iniciar/pausar
    audioTimeOut.pause();
    iniciarOuPausar();
});

focoBt.addEventListener('click', () => { //botao para contexto de foco
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => { //botao para contexto de curto
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => { //botao para contexto de descanso longo
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

alterarMusica.addEventListener('change', () => { //seletor liga/desliga musica
    if (musica.paused) {
        musica.play();
    }
    else {
        musica.pause();
    }
});

function mostraTempo () { //no elemento html da tela, mostra o tempo
    const tempo = new Date(tempoDecorrido * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    timer.innerHTML = `${tempoFormatado}`;
}