'use strict';
// player1 背景區塊
const player0El = document.querySelector('.player--0');
// player2 背景區塊
const player1El = document.querySelector('.player--1');
// player1 總分數
const score0El = document.querySelector('#score--0');
// player2 總分數
const score1El = document.getElementById('score--1');
// player1 現在得分
const current0El = document.getElementById('current--0');
// player2 現在得分
const current1El = document.getElementById('current--1');
// 骰子圖片
const diceEl = document.querySelector('.dice');
// 按鈕 new game
const btnNew = document.querySelector('.btn--new');
// 按鈕 骰
const btnRoll = document.querySelector('.btn--roll');
// 按鈕 hold
const btnHold = document.querySelector('.btn--hold');

// 外部聲明函數 預設
let scores, currentScore, activePlayer, playing;

//創建一個初始化的函數
const init = function () {
  // 開始條件
  scores = [0, 0]; // 使用數組存儲分數 為什麼這麼做?原因是因為我們要把兩個參與者的分數存儲在一個數組中
  currentScore = 0; // 目前得分為0,使用變數儲存
  activePlayer = 0; // 創建目前動作的玩家 0為玩家1 ,1為玩家2 。
  playing = true; // 創建一個變數布林值 代表正在playing,playing時true , 結束 false

  score0El.textContent = 0; // player1 分數歸0
  score1El.textContent = 0; // player2 分數歸0
  current0El.textContent = 0; // player 當前分數歸0
  current1El.textContent = 0; // player 當前分數歸0
  diceEl.classList.add('hidden'); // 隱藏骰子

  player0El.classList.remove('player--winner'); // player1 刪除class winner
  player1El.classList.remove('player--winner'); // player2 刪除class winner
  player1El.classList.remove('player--active'); // player2 刪除class active

  player0El.classList.add('player--active'); // player1 新增class active  先手
};

//預設先觸發init函數
init();

// 創建一個更換玩家的函數
const switchPlayer = function () {
  // 切換玩家時,上一個玩家的當前分數重置為0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // 重製current變量分數
  currentScore = 0;
  // 切換玩家
  activePlayer = activePlayer === 0 ? 1 : 0; // 預設activePlayer = 0 ; 賦予值 三源判斷式
  // 切換背景
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// 骰骰子功能
btnRoll.addEventListener('click', function () {
  // 只有當playing = ture時才可動作 代表正在玩
  if (playing) {
    // 1. 產生亂數骰子
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. 顯示骰子 ,並改變圖案
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. 確認骰子數 : 如果不是1 疊加分數
    if (dice !== 1) {
      // add dice to 現在分數
      currentScore += dice;
      // current0El.textContent = currentScore; // 先測試動作使用變量測試
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // 使用變量的值判定目前動作的玩家
    } else {
      //更換下一個玩家,使用調入函數
      switchPlayer();
    }
  }
});

// hold功能
btnHold.addEventListener('click', function () {
  // 只有當playing = ture時才可動作 代表正在玩
  if (playing) {
    // 1. 增加 當前分數 加到 active 玩家的總分數
    scores[activePlayer] += currentScore; //數組的值 分數會從0+上當前分數
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check 玩家得分 如果100  當前動作玩家winner  遊戲結束
    if (scores[activePlayer] >= 20) {
      //如果分數大於...
      playing = false; // 遊戲結束 playing 變false
      diceEl.classList.add('hidden'); //骰子隱藏回去
      document // player的變量動作玩家 0或1 新增class winner
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document // winner玩家刪除active背景
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. 按下切換下一個玩家 ,使用調入函數
      switchPlayer();
    }
  }
});

// reset 功能 , 直接調用變量
btnNew.addEventListener('click', init );
