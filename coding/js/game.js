
const key = {
  keyDown : {},
  keyValue : {
    37:'left',
    39:'right',
    88:'attack',
  }
}

const renderGame = () => {
  window.requestAnimationFrame(renderGame);
}

const windowEvent = () => {
  window.addEventListener('keydown', e => {
    if(key.keyValue[e.which] !== undefined){
      key.keyDown[key.keyValue[e.which]] = true;
      hero.keyMotion();
    }
  });

  window.addEventListener('keyup', e => {
    if(key.keyValue[e.which] !== undefined){
      key.keyDown[key.keyValue[e.which]] = false;
      hero.keyMotion();
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