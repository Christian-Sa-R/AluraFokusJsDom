const html = document.querySelector('html');
const timer = document.querySelector('#timer')
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const alterarMusica = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
    musica.loop = true;
const playPauseBt = document.querySelector('#start-pause');
const statusImg = document.querySelector('.app__image');
const textoTitulo = document.querySelector('.app__title');
const tempoFoco = 1500;
const tempoDescansoCurto = 300;
const tempoDescansoLongo = 900;

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