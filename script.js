let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let scoreNul = document.getElementById("scoreNul");
let switchbtn= document.getElementById("button");

let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

//give each btnRef an index from 1 to 9 
btnRef.forEach((element, index) => {
  element.id = index;
});
let state = {
  scoreJ1: 0,
  scoreJ2: 0,
  matchNul: 0,

};
//Player 'X' plays first
let xTurn = true;
let count = 0;
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //enable popup
  popupRef.classList.remove("hide");
};
//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
    Xlist=[]
    OList=[]
  });
  //disable popup
  popupRef.classList.add("hide");
};

//This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    state.scoreJ1++
    score1.textContent = state.scoreJ1;
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    state.scoreJ2++
    score2.textContent = state.scoreJ2;
  }
};

//Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
  state.matchNul++;
  scoreNul.textContent = state.matchNul;
};

//New Game
newgameBtn.addEventListener("click", () => {
  count = 0;
  xTurn=true;

  enableButtons();
});
restartBtn.addEventListener("click", () => {
  count = 0;
  xTurn=true;
  enableButtons();
});

//Win Logic
const winChecker = () => {
  //Loop through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    //Check if elements are filled
    //If 3 empty elements are same and would give win as would
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
        count=0;  
      }
    }
  }
  };

  //make a function that takes an index as input and disable that btnref
  const disableButton = (index) => {
    btnRef[index].disabled = false;
    btnRef[index].innerText = "";
  }
  Xlist=[]
  OList=[]


btnRef.forEach((element) => {
  element.addEventListener("click", () => {
      if(xTurn==true){
      element.innerText = "X";
      element.disabled = true;
      Xlist.push(element.id)
      console.log(Xlist)
      if(Xlist.length>3){
      disableButton(Xlist[0])
      Xlist.shift()
      }


      }
      if(xTurn==false)
      { element.innerText = "O";
      element.disabled = true;
      OList.push(element.id)
      console.log(OList)
      if(OList.length>3){
      disableButton(OList[0])
      OList.shift()
      }

      }
      xTurn=!xTurn
      winChecker();
    
  });
});


  
    //Enable Buttons and disable popup on page load
window.onload = enableButtons;