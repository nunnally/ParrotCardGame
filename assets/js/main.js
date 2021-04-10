gameConfig = {
    "cards":4,
    "max":7,
    "ready":0
    
}
gameData = {
    "cards":[],
    "time":0,
    "turns":0,
    "matches":0,
    "time":0
}

openedCards = [];


    var myVar = setInterval(gameTime, 1000);

    function gameTime() {
        if(gameConfig.ready===1) {
            gameData.time+=1;
            document.querySelector('.info').innerHTML = gameData.time;
        }

    }



function loadGame() {


    inputUser()
    gameData.cards = [...Array(gameConfig.cards/2).keys()];
    gameData.cards = gameData.cards.concat(gameData.cards).sort( () => .5 - Math.random() );
    
    
    let html = ''

    gameData.cards.forEach(function(id){
        
        html += `<div class="card" data-card-id="${id}">`;
        html +=`<div class="back" style="background: url(media/cards/${id}.gif) no-repeat" disabled="disabled"></div>`;
        html += `</div>`;

      });


    document.querySelector('.flex').innerHTML = html;


    html_cards = document.querySelectorAll('.card')

    
    html_cards.forEach(card => {

        card.addEventListener('click', () => {
            card.classList.add("turn","blocked");
            
            if(openedCards.length<2) {
                openedCards.push(card)
                console.log(openedCards)
            }

            if(openedCards.length===2){
                gameData.turns+=1;
                document.querySelectorAll('.info')[1].innerHTML =gameData.turns;
                if (matchCard(openedCards)){
                    
                    openedCards[0].classList.add('blocked')
                    openedCards[1].classList.add('blocked')
                    
                    openedCards=[];
                }

                else {
                    
                    setTimeout(function(){
                        openedCards[0].classList.remove('turn',"blocked");
                        openedCards[1].classList.remove('turn',"blocked");
                        openedCards=[];
                        
                         
                      },300)
                }

                if(isFinished()){

                    gameConfig.ready=0;
                    document.querySelector("#message").classList.add("show")


                }


                
            }


            
        });
      });
    
}

function matchCard(cards){

    if(cards[0].getAttribute("data-card-id")===cards[1].getAttribute("data-card-id")){
        gameData.matches+=1;
        console.log("deu match")
        return true;
    };

    return false;
}

function isFinished(){
    return (gameConfig.cards== gameData.matches *2)
}
function inputUser() {

    gameConfig.cards=parseInt(prompt('Digite o número de cartas (número par entre 4 e 14):'));

    if(gameConfig.cards >= 4 && gameConfig.cards <= gameConfig.max*2){
        gameConfig.ready=1;
        return console.log('game loaded')
    }
    inputUser()
}

function reloadGame(){
    const ask = prompt("Gostaria de jogar novamente? Digite sim caso essa seja a intenção.")
    if(ask.toLowerCase() === "sim"){
        location.reload()
    }
}

document.addEventListener("DOMContentLoaded", loadGame());


