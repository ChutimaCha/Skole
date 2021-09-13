import {gsap} from 'gsap';
import setRandomInterval from 'set-random-interval';
export default class Enemy{
constructor(items){


    this.resname = items.name;
    this.container = items.addTo;
   
    this.startFrom = 0;
    this.endAt = 0;
    this.front = 0;
    this.enemyArray= [];
    this.enemyDuration = [20,21,22,23,24,25,26,27,28,29,30,40,50];
   
    this.from = ["left", "right"];
   
    this.counter=0;

 console.log(items);
 }
}