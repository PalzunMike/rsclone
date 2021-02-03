const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// let board = new Board(ctx);

// function play() {
//    board.reset();
//    let piece = new Piece(ctx);
//    piece.draw();

//    board.piece = piece;
// }

const moves = {
   [KEY.LEFT]: p => ({ ...p, x: p.x - 1}),
   [KEY.RIGHT]: p => ({ ...p, x: p.x + 1}),
   [KEY.DOWN]: p => ({ ...p, y: p.y + 1}),
   [KEY.SPACE]: p => ({ ...p, y: p.y + 1}),
   [KEY.UP]: (p) => board.rotate(p)
};

document.addEventListener('keydown', event =>{
   if (moves[event.keyCode]){
      event.preventDefault();
      let p = moves[event.keyCode](board.piece);
         if (event.keyCode === KEY.SPACE) {
            while (board.valid(p)) {
               account.score += POINTS.HARD_DROP;
               board.piece.move(p);   
               p = moves[KEY.DOWN](board.piece);
            }
         } else if (board.valid(p)){
                  board.piece.move(p);
                     if (event.keyCode === KEY.DOWN){
                        account.score += POINTS.SOFT_DROP;
                     }
               }   
   }
});

const time = { start: 0, elapsed: 0, level: 1000 };

function animate(now = 0) {
  // обновить истекшее время
  time.elapsed = now - time.start;
  
  // если время отображения текущего фрейма прошло 
  if (time.elapsed > time.level) {
  
    // начать отсчет сначала
    time.start = now;   
    
    // "уронить" активную фигурку
    board.drop();  
  }
  
  // очистить холст для отрисовки нового фрейма
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
  
  // отрисовать игровое поле 
  board.draw();  
  requestAnimationFrame(animate);
}

function play() {
  board.reset();
  let piece = new Piece(ctx);
  board.piece = piece;
  board.piece.setStartPosition();
  animate();
}

let accountValues = {
  score: 0,
}

function updateAccount(key, value) {
  let element = document.getElementById(key);
  if (element) {
    element.textContent = value;
  }
}

// Проксирование доступа к свойствам accountValues
let account = new Proxy(accountValues, {
  set: (target, key, value) => {
    target[key] = value;
    updateAccount(key, value);
    return true;
  }
});