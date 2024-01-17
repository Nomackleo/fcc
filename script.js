/**
 * Estado actual del jugador.
 * @type {string}
 */
let playerState = 'run';
/**
 * Elemento de lista desplegable para seleccionar animaciones.
 * @type {HTMLSelectElement}
 */
const dropdown = document.getElementById('animations');
/**
 * Evento que actualiza el estado del jugador cuando cambia la opción en la lista desplegable.
 * @param {Event} e - Objeto de evento que representa el cambio en la lista desplegable.
 */
dropdown.addEventListener('change', function (e) {
  playerState = e.target.value;
});
/**
 * Elemento canvas para renderizar las animaciones del jugador.
 * @type {HTMLCanvasElement}
 */
const CANVAS = document.getElementById('canvas');
/**
 * Contexto 2D del canvas.
 * @type {CanvasRenderingContext2D}
 */
const CTX = CANVAS.getContext('2d');
const CANVAS_WIDTH = (CANVAS.width = 600);
const CANVAS_HEIGHT = (CANVAS.height = 600);
/**
 * Imagen del jugador.
 * @type {HTMLImageElement}
 */
const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
const SPRITE_WIDTH = 575;
const SPRITE_HEIGTH = 523;

let frameX = 0;
let frameY = 0;
/**
 * Número de frames transcurridos en el juego.
 * @type {number}
 */
let gameFrame = 0;
/**
 * Número de frames que deben pasar antes de cambiar al siguiente frame de animación.
 * @type {number}
 */

const STAGGER_FRAMES = 3;
/**
 * Almacena información sobre las animaciones del jugador.
 * @type {Object.<string, { loc: Array<{ x: number, y: number }> }>}
 */
const SPRITE_ANIMATIONS = [];
/**
 * Estados de animación disponibles para el jugador.
 * @type {Array<{ name: string, frames: number }>}
 */
const ANIMATION_STATES = [
  {
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 6,
  },
  {
    name: 'fall',
    frames: 6,
  },
  {
    name: 'run',
    frames: 8,
  },
  {
    name: 'dizzy',
    frames: 10,
  },
  {
    name: 'sit',
    frames: 4,
  },
  {
    name: 'roll',
    frames: 6,
  },
  {
    name: 'bite',
    frames: 6,
  },
  {
    name: 'ko',
    frames: 11,
  },
  {
    name: 'getHit',
    frames: 3,
  },
];
ANIMATION_STATES.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i <= state.frames; i++) {
    let positionX = i * SPRITE_WIDTH;
    let positionY = index * SPRITE_HEIGTH;
    frames.loc.push({ x: positionX, y: positionY });
  }
  SPRITE_ANIMATIONS[state.name] = frames;
});
console.log(ANIMATION_STATES);
console.log(SPRITE_ANIMATIONS);

function animate() {
  // Limpiar el canvas en cada cuadro de animación.
  CTX.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // CTX.fillRect(50, 50, 100, 100);
  // CTX.drawImage(playerImage, 0, 0, 6000, 6000);
  let position =
    Math.floor(gameFrame / STAGGER_FRAMES) %
    SPRITE_ANIMATIONS[playerState].loc.length;
  frameX = SPRITE_WIDTH * position;
  frameY = SPRITE_ANIMATIONS[playerState].loc[position].y;
  console.log(frameY);

  CTX.drawImage(
    playerImage,
    frameX,
    frameY,
    SPRITE_WIDTH,
    SPRITE_HEIGTH,
    0,
    0,
    SPRITE_WIDTH,
    SPRITE_HEIGTH
  );

  // gameFrame % STAGGER_FRAMES === 0
  //   ? frameX < 6
  //     ? frameX++
  //     : (frameX = 0)
  //   : console.log('Error');

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
