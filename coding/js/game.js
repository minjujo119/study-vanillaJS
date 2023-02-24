
const key = {
  keyDown : {},
  keyValue : {
    37:'left',
    38:'up',
    39:'right',
    40:'down',
    88:'attack' // X
  }
}

const gameProp = {
  screenWidth : window.innerWidth,
  screenHegiht : window.innerHeight
}

// 모니터 주사율(60FPS)에 맞춰 애니메이션이 딜레이 없이 동작하게 도와줌
const renderGame = () => {
  hero.keyMotion();
  window.requestAnimationFrame(renderGame);
}

// 키가 눌렸을 때 이벤트
const windowEvent = () => {
  window.addEventListener('keydown', e => {
    if(key.keyValue[e.which] !== undefined){
      key.keyDown[key.keyValue[e.which]] = true;
    }
  });

  // 키가 떼졌을 때 이벤트
  window.addEventListener('keyup', e => {
    if(key.keyValue[e.which] !== undefined){
      key.keyDown[key.keyValue[e.which]] = false;
    }
  });
}


const loadImg = () => {
  const preLoadImgSrc = ['../lib/images/ninja_idle.png','../lib/images/ninja_run.png','../lib/images/ninja_attack.png']
  preLoadImgSrc.forEach(arr => {
    const img = new Image();
    img.src = arr;
  })
}



let hero;
const init = () => {
  hero = new Hero('.hero');
  loadImg();
  windowEvent();
  renderGame();
}
window.onload = () => {
  init();
}