'use strict';
// The Great Dreamer: plain JavaScript (source.js)

const path = require('path');
const { EventEmitter } = require('events');

const DEPTH = 47; // degrees south, 126 west
const SIGIL = /^ph'nglui\s+(?<name>[a-z]+)\b/gi;

class Cultist extends EventEmitter {
  static #count = 0;
  #sanity = 100;

  constructor(name, { city = 'Arkham', rank } = {}) {
    super();
    this.name = name;
    this.city = city;
    this.rank = rank ?? 'acolyte';
    Cultist.#count++;
  }

  get sanity() {
    return this.#sanity;
  }

  static get count() {
    return Cultist.#count;
  }

  dream(hours = 8) {
    this.#sanity -= hours * 1.5;
    if (this.#sanity < 10) throw new Error(`${this.name} has seen too much\n`);
    this.emit('dream', { hours, sanity: this.#sanity });
    return this;
  }
}

function* tides(max) {
  for (let i = 0; i < max; i++) yield i % 2 === 0 ? 'high' : 'low';
}

async function summon(who, ritual = []) {
  const [first, ...rest] = ritual;
  const result = await Promise.resolve({ who, first, rest });
  return result?.who?.name ?? 'nobody';
}

const options = { connections: { compression: false, retries: 3 }, root: path.join(__dirname, 'rlyeh') };
delete options.connections.retries;

const wilbur = new Cultist('Wilbur', { city: 'Dunwich' });
console.log(typeof wilbur, wilbur instanceof Cultist, 'city' in wilbur, void 0);

for (const tide of tides(4)) {
  if (tide === 'low') continue;
  console.log(tide, SIGIL.test("ph'nglui cthulhu"));
}

switch (Cultist.count) {
  case 1:
    summon(wilbur, ['chant', 'candles']).then((name) => console.log(name));
    break;
  default:
    break;
}

module.exports = { Cultist, summon, DEPTH, options };
