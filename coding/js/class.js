// 히어로 캐릭터 클래스
class Hero {
  constructor(el){
    this.el = document.querySelector(el);
    this.movex = 0;
    this.speed = 11;
    this.jumpHeight = 200;
    this.jumpDuration = 400;
    this.direction = 'right';
  }

  // 키를 눌렀다 뗐을 때 메소드
  keyMotion(){

    // 왼쪽 오른쪽 달리기
    if(key.keyDown['left']){
      this.direction = 'left';
      this.el.classList.add('run');
      this.el.classList.add('flip');
      this.movex = this.movex <= 0 ? 0 : this.movex - this.speed;
    }
    else if(key.keyDown['right']){
      this.direction = 'right';
      this.el.classList.add('run');
      this.el.classList.remove('flip')
      this.movex = this.movex + this.speed
    }
    if(!key.keyDown['left'] && !key.keyDown['right']){
      this.el.classList.remove('run')
    }
    
    if(key.keyDown['up']){
      // console.log(this.position().bottom, this.position().top)
      // console.log(Math.ceil(this.el.getBoundingClientRect().top), Math.ceil(this.el.getBoundingClientRect().bottom))
      // console.log(Math.ceil(this.position().bottom), Math.ceil(this.position().top))

      if(!jumpProp.operate){
        if(this.direction == 'right'){
          this.el.classList.add('jump_right');
        }else{
          this.el.classList.add('jump_left');
        }
        hero.jumpMotion();
      }
      jumpProp.operate = true;
    }
    if(!key.keyDown['up']){
        jumpProp.operate = false;
    }
    

    // 공격하기
    if(key.keyDown['attack']){
      if(!bulletComProp.launch){
        this.el.classList.add('attack');
        bulletComProp.arr.push(new Bullet());
        bulletComProp.launch = true;
      }
    }
    if(!key.keyDown['attack']){
      this.el.classList.remove('attack')
      bulletComProp.launch = false;
    }
    this.el.parentNode.style.transform = `translateX(${this.movex}px`;
  }

  // 히어로 위치값 알아내는 메소드
  position(){
    return{
      left: this.el.getBoundingClientRect().left,
      right: this.el.getBoundingClientRect().right,
      top: gameProp.screenHegiht - this.el.getBoundingClientRect().top,
      bottom: gameProp.screenHegiht - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height
    }
  }
  size(){
    return{
      width: this.el.offsetWidth,
      height: this.el.offsetHeight
    }
  }
  // 점프 동작 메소드
  jumpMotion(){
    let jumpTimeoutID;
    clearTimeout(jumpTimeoutID);
    jumpTimeoutID = setTimeout(()=>{this.el.classList.remove('jump_right','jump_left');},this.jumpDuration)
    this.el.animate([
      {transform : `translateY(0px)`},
      {transform : `translateY(-${this.jumpHeight}px)`, offset : 0.35},
      {transform : `translateY(0px)`, offset : 1}],
      {duration: this.jumpDuration, iteration: 1,}
    );
  }
}

// 수리검 클래스
class Bullet {
  constructor(){
    this.parentNode = document.querySelector('.game');
    this.el = document.createElement('div');
    this.el.className = 'hero_bullet';
    this.x = 0;
    this.y = 0;
    this.speed = 30;
    this.distance = 0;
    this.bulletDirection = 'right';
    this.init();
  }
  
  init(){
    this.bulletDirection = hero.direction === 'left' ? 'left' : 'right';
    this.x = this.bulletDirection === 'right' ? hero.movex + hero.size().width/2;
    this.y = hero.position().bottom - hero.size().height/2;
    this.distance = this.x;
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.parentNode.appendChild(this.el);
  }

  moveBullet(){
    let setRotate = '';
    if(this.bulletDirection === 'left'){
      this.distance -= this.speed;
      setRotate = 'rotate(180deg)';
    }else{
      this.distance += this.speed;
    }
    this.el.style.transform = `translate(${this.distance}px, ${this.y}px) ${setRotate}`;
    console.log(this.y, Math.ceil(hero.position().bottom - hero.size().height/2))
    this.crashBullet();
  }

  // 총알 위치값 알아내는 메소드
  position(){
    return{
      left: this.el.getBoundingClientRect().left,
      right: this.el.getBoundingClientRect().right,
      top: gameProp.screenHegiht - this.el.getBoundingClientRect().top,
      bottom: gameProp.screenHegiht - this.el.getBoundingClientRect().top - this.el.getBoundingClientRect().height
    }
  }
  crashBullet(){
    if(this.position().left > gameProp.screenWidth || this.position().right < 0){
      this.el.remove();
    }
  }
}

class Monster {
  constructor(){
    this.parentNode = document.querySelector('.game');
    this.el = document.createElement('div');
    this.el.className = 'monster_box'
    this.elChildren = document.createElement('div');
    this.elChildren.className = 'monster';


    this.init();
  }
  init(){
    this.el.appendChild(this.elChildren);
    this.parentNode.appendChild(this.el);
  }
}