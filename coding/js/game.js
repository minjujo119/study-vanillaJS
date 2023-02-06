const key = {
  keyDown : {},
  keyValue : {
    37:'left',
    38:'up',
    39:'right',
    40:'down'
  }
};
const windowEvent = () => {

  window.addEventListener('keydown', e => {
    key.keyDown[key.keyValue[e.key]] = true;
    console.log(key.keyDown); 
  });

  window.addEventListener('keyup', e => {
    key.keyDown[key.keyValue[e.key]] = false;
    console.log(key.keyDown);
  });

};

const init = () => {
  windowEvent();
};

window.onload = () => {
  init();
  console.log('yes')
};