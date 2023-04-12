const key = {
  keyDown : {},
  keyValue : {
    37:'left',
    38:'up',
    39:'right',
    40:'down',
    88:'attack' // X
  }
};

const allMonsterComProp = {
  arr : []
}

const bulletComProp = {
  launch: false,
  arr: []
};

const jumpProp = {
  operate: false
}

const gameBackground = {
  gameBox: document.querySelector('.game')
}

const gameProp = {
  screenWidth : window.innerWidth,
  screenHegiht : window.innerHeight,
  gameOver : false,
};

// 모니터 주사율(60FPS)에 맞춰 애니메이션이 딜레이 없이 동작하게 도와줌
const renderGame = () => {
  hero.keyMotion();
  setGameBackground();
  bulletComProp.arr.forEach((arr,i)=>{
    arr.moveBullet();
  });
  allMonsterComProp.arr.forEach((arr,i)=>{
    arr.moveMonster();
  });
  stageInfo.stage.clearCheck();
  window.requestAnimationFrame(renderGame);
}

const endGame = () => {
  gameProp.gameOver = true;
  key.keyDown.left = false;
  key.keyDown.right = false;
  document.querySelector('.game_over').classList.add('active');
}

const setGameBackground = () => {
  let parallaxValue = Math.min(0, -(hero.movex - gameProp.screenWidth/3));
  gameBackground.gameBox.style.transform = `translateX(${parallaxValue}px)`
}

const stageInfo = {
  stage : [],
  totalScore: 0,
  monster: [
    {defaultMon:greenMon, bossMon:greenMonBoss},
    {defaultMon:yellowMon, bossMon:yellowMonBoss},
    {defaultMon:pinkMon, bossMon:pinkMonBoss},
  ],
}

// 키가 눌렸을 때 이벤트
const windowEvent = () => {
  window.addEventListener('keydown', e => {
    if(key.keyValue[e.which] !== undefined && !gameProp.gameOver){
      key.keyDown[key.keyValue[e.which]] = true;
    }
  });

  // 키가 떼졌을 때 이벤트
  window.addEventListener('keyup', e => {
    if(key.keyValue[e.which] !== undefined){
      key.keyDown[key.keyValue[e.which]] = false;
    }
  });

  // 윈도우 리사이즈 될때
  window.addEventListener('resize', e => {
    gameProp.screenWidth = window.innerWidth;
    gameProp.screenHegiht = window.innerHeight;
  })
}

// 이미지 로드먼저하기
const loadImg = () => {
  const preLoadImgSrc = [
    '../lib/images/ninja_idle.png',
    '../lib/images/ninja_jump.png',
    '../lib/images/ninja_run.png',
    '../lib/images/ninja_attack.png',
    '../lib/images/monster/monster_green_run.png',
    '../lib/images/monster/monster_yellow_run.png',
    '../lib/images/monster/monster_pink_run.png'
  ]
  preLoadImgSrc.forEach(arr => {
    const img = new Image();
    img.src = arr;
  })
}


let hero;
let monster;
let bullet;
const init = () => {
  hero = new Hero('.hero');
  stageInfo.stage = new Stage();
  // allMonsterComProp.arr[0] = new Monster(pinkMonBoss,gameProp.screenWidth + 700);
  // allMonsterComProp.arr[1] = new Monster(yellowMonBoss,gameProp.screenWidth + 1400);
  // allMonsterComProp.arr[2] = new Monster(greenMonBoss,gameProp.screenWidth + 2100);
  loadImg();
  windowEvent();
  renderGame();
}
window.onload = () => {
  init();
};