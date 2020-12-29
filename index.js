let players=[];
let turn=0;
let gameOver= false;


let dimensions=parseInt(document.getElementById("dimension").value);
console.log(dimensions);

let board =  new Array(dimensions).fill("").map(()=> new Array(dimensions).fill(""));

const changedim = (event) => {
  dimensions=parseInt(event.target.value);
  board=new Array(dimensions).fill("").map(() => new Array(dimensions).fill(""));
};

document
.getElementById("dimension")
.addEventListener("change" , changedim);

const handleClick = (cell,i,j) => {

  const el=cell;
  
  if (el.innerHTML !== "" || gameOver === true) {
    return;
  }

  board[i][j] = turn % 2 === 0 ? "X" : "O";
  el.innerHTML = board[i][j];

  if (calculateWinner()) {
    alert(players[turn % 2] + " won :)");
    gameOver = true;
    return;
  }
  turn++;

  document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";

  if (turn === dimensions*dimensions) {
    alert("game is drawn");
    gameOver = true;
    return;
  }
};

const initgame = () => {
  let gameContainer = document.getElementById("game-container");
  console.log(gameContainer);

for(let i=0;i<dimensions;i++){
  let row=document.createElement("div");
  row.className="row";

  for(let j=0;j<dimensions;j++){
    let cell=document.createElement("div");
    cell.className="cell";
    row.appendChild(cell);  
    cell.addEventListener("click", (event) => handleClick(cell, i, j));   
  }
  gameContainer.appendChild(row); 
  
}
};

const startGame = () =>{
  let input1=document.getElementById("p1");
  let input2=document.getElementById("p2");
  let select=document.getElementById("dimension");

  let player1=input1.value;
  let player2=input2.value;


  if(isEmpty(player1) || isEmpty(player2)) {
    alert("player name required");
    return;
  }

  input1.setAttribute("disabled" ,true );
  input2.setAttribute("disabled" , true);
  select.setAttribute("disabled",true);

  let game=document.getElementById("game-container");
  
  game.classList.remove("hide");

  players.push(player1);
  players.push(player2);

  document.getElementById("turn").innerHTML =players[turn%2] + "'s turn";

  initgame();
};


const calculateWinner = () => {

  let len=board.length;

  if (turn < len) 
  return false;

  for(let i=0;i<len;i++){
    if(board[i].every((el) => el === board[i][0] && el !== "")){
      return true;
    }

    let start=board[0][i];
    let count=1;
    for(let j=1;j<len;j++){
      if(start === board[j][i] && start!==""){
        count++;
      }
    }

    if(count === len){
      return true;
    }
  }

  let i=board[0][0];
  let j=0;
  while(j<len){
    if(board[0][0] === ""){
      break;
    }
    if(board[j][j]!==i){
      break;
    }else{
      j++;
    }
  }

  if(j===len){
    return true;
  }

  let revi=0;
  let revj=len-1;
  let revval=board[revi][revj];

  while(revi < len){
    if(board[revi][revj] === ""){
      break;
    }
    if(revval!== board[revi][revj]){
      break;
    }else{
      revi++;
      revj--;
    }
  }

  if(revi === len)
  {
    return true;
  }
  return false;
};

const isEmpty = (value) => !value || !value.trim();

