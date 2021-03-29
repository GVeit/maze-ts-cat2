import React from 'react'


export class Rand {
    static randomInt(x) {
      return Math.floor(Math.random() * x);
    }
    static pickRand(al) {
      return al[this.randomInt(al.length)];
    }
}