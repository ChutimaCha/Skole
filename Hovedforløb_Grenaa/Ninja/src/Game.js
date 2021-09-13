import "@babel/polyfill";
//import 'bootstrap/dist/css/bootstrap.min.css'
import "../css/style.scss";
import { gsap } from "gsap";
import * as PIXI from 'pixi.js';
import Stage from './Stage';
import Enemy from './Enemy';
import {Spine} from 'pixi-spine';
import {how, Howl, howler} from 'howler';
import loader from "sass-loader";


export default class Game {

  constructor() {

    this.myStage = new Stage();
this.scene = this.myStage.scene;
this.scene.sortableChildren = true; // så kan vi bruge z-index på children
this.background = this.myStage.bg;
this.si = this.myStage.stageInfo;


let assets = [
  '../assets/spritesheet/ninjarack.json',
  './assets/images/background.jpg',
  '../assets/images/ninja-jum.png',
  '../assets/images/play.png'
];


const loader = PIXI.loader.shared
.add(assets)
.add('alienspine', '../assets/spritesheet/alien-spine/alienboss.json')

.loader ((loader,res) => {
  console.log('ready for game');

let bgTexture = PIXI.Texture.from('./assets/images/background.jpg');
let _bg = new PIXI.Sprite(bgTexture);
this.background.addChild(_bg);
let sheet = PIXI.loader.shared.resources['../assets/spritesheet/ninjarack.json'].spritesheet;

this.ninja = new PIXI.AnimatedSprite(sheet.animations['alien']);
this.ninja.anchor.set(0.5);
this.ninja.x = 512;
this.ninja.y = 768 - 150;


this.ninja.interactive = true;
this.ninja.buttonMode = true;
this.ninja.zIndex = 2;
this.ninja.animationSpeed = 0.5;


this.ninja.play();
this.scene.addChild(this.ninja);



// side 10/27 eventlistener "on" til opjekter skal interageres med Pixi...
this.si.app.stage.interactive = true;

this.si.app.stage.on('pointerdown', (event) => {

  this.ninja.stop(); //stop ninja animation
  this.ninja.texture = PIXI.Texture.from('../assets/images/ninja-jump.png'); //skift texture til jump;

let newPosition = event.data.getLocalPosition(this.backgound);


//more about GSAP class https://greensock.com/docs/v3/GSAP/gsap.to()
gsap.to(this.ninja, {
  duration: 0.2,
  x: newPosition.x-300,
y:newPosition.y,

ease: "Circ.easeOut",
onComplete: () => {

  //more about GSAP.to() https://greensock.com/docs/v3/GSAP/gsap.to()
  gsap.to(this.ninja, {
duration: 0.2,
x:500,
y:768-150,
ease: "Circ.easeOut",
  });

  this.ninja.play();
}, // END: onComplete
});

})
//Hvordan han angriber
let mX = Event.data.global.x;
mX > this.si.appWidth/2 ? this.ninja.scale = -1 : this.ninja.scale.x = 1;


//Lyd i PIXI
this.hitSound = new Howl({
  src:['./assets/sound/effekt_swish.mp3'],
  volume:0.5
  })

  this.hitSound.play();
  

  let playTexture = PIXI.Texture.from("./assets/images/play.png");

  let play = new PIXI.Sprite(playTexture);
  play.anchor.set(0.5);
  play.x=512;
  play.y=250;
  play.interactive = true;
  play.buttonMode = true;
  this.scene.addChild(play);

play.on('pointerdown', (event) =>{
  event.stopPropagation();

  this.si.app.stage.interactive = true;


  //more guide about gsap.to() https://greensock.com/docs/v3/GSAP/gsap.to() 
  gsap.to(event.currentTarget, {
duration: 0.5,
delay:0.2,
y: play.y - 350,
ease: "Elastic.easeInOut",
volume: 0.2
  })

  var timerid = setTimeout(() => {
soundSwirp.play();
  }, 500);


  let sound = new Howl({
src:['./assets/sound/musicloop.mp3'],
autoplay: true,
loop: true,
volume: 0.5

  })
})

// import Enemy.js
this.enemy = new Enemy({
  name:resizeBy.alienspine,
  addTo:this.scene
});

})
}
  } //END constructor




