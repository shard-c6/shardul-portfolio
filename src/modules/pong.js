// Neural Pong — placeholder AI.
// Each paddle is steered by a tiny hand-written "network" (4 inputs → 5 hidden → up/stay/down).
// Swap `policy()` for the real trained model (ONNX / TF.js) from the Neural Pong project.

const W = 640, H = 400, PADDLE = 70, MAX_STEP = 5.5;

export function initPong() {
  const cv = document.getElementById('pc');
  const cx = cv.getContext('2d');
  const nn = document.getElementById('nn').getContext('2d');
  const scoreL = document.getElementById('sl');
  const scoreR = document.getElementById('sr');
  const takeBtn = document.getElementById('take');
  const mode = document.getElementById('pmode');

  const L = { y: H / 2 }, R = { y: H / 2 };
  let ball, human = false, sl = 0, sr = 0, pointerY = H / 2, running = false;
  let acts = [[0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0]];

  const serve = (dir = 1) => (ball = { x: W / 2, y: H / 2, vx: 5 * dir, vy: Math.random() * 4 - 2 });
  serve();

  const track = (e) => {
    const r = cv.getBoundingClientRect();
    pointerY = ((e.clientY - r.top) * H) / r.height;
  };
  cv.addEventListener('pointermove', track);
  cv.addEventListener('pointerdown', (e) => {
    track(e);
    if (!human) toggle();
  });

  function toggle() {
    human = !human;
    takeBtn.classList.toggle('on', human);
    takeBtn.textContent = human ? 'Give it back' : 'Take left paddle';
    mode.textContent = human ? 'MODE · YOU vs NET' : 'MODE · NET vs NET';
  }
  takeBtn.onclick = toggle;
  document.getElementById('reset').onclick = () => {
    sl = sr = 0;
    serve();
  };

  // Predict where the ball will cross this paddle's line and move toward it, with a little noise.
  function policy(p, isRight) {
    const distance = isRight ? W - 30 - ball.x : ball.x - 30;
    const target = ball.y + ball.vy * (distance / Math.abs(ball.vx || 1)) * 0.6;
    const d = (target - p.y) / 60;
    if (isRight) {
      const inputs = [ball.y / H, ball.vy / 6, (W - ball.x) / W, p.y / H];
      acts = [inputs, [...inputs.map((v, i) => Math.tanh(v * 2 - 1 + i * 0.3)), Math.tanh(d)], [Math.max(0, -d), 1 - Math.min(1, Math.abs(d)), Math.max(0, d)]];
    }
    return Math.max(-MAX_STEP, Math.min(MAX_STEP, d * 6)) + (Math.random() - 0.5) * 1.2;
  }

  function update() {
    L.y += human ? (pointerY - L.y) * 0.25 : policy(L, false);
    R.y += policy(R, true);
    for (const p of [L, R]) p.y = Math.max(PADDLE / 2, Math.min(H - PADDLE / 2, p.y));

    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.y < 6 || ball.y > H - 6) ball.vy *= -1;
    if (ball.x < 30 && Math.abs(ball.y - L.y) < PADDLE / 2 + 6 && ball.vx < 0) {
      ball.vx = -ball.vx * 1.04;
      ball.vy += (ball.y - L.y) / 12;
    }
    if (ball.x > W - 30 && Math.abs(ball.y - R.y) < PADDLE / 2 + 6 && ball.vx > 0) {
      ball.vx = -ball.vx * 1.04;
      ball.vy += (ball.y - R.y) / 12;
    }
    if (ball.x < 0) { sr++; serve(1); }
    if (ball.x > W) { sl++; serve(-1); }
    scoreL.textContent = sl;
    scoreR.textContent = sr;
  }

  function draw() {
    cx.clearRect(0, 0, W, H);
    cx.setLineDash([4, 8]);
    cx.strokeStyle = '#e8e5e0';
    cx.beginPath(); cx.moveTo(W / 2, 0); cx.lineTo(W / 2, H); cx.stroke();
    cx.setLineDash([]);
    cx.fillStyle = human ? '#e8531f' : '#141414';
    cx.fillRect(14, L.y - PADDLE / 2, 8, PADDLE);
    cx.fillStyle = '#141414';
    cx.fillRect(W - 22, R.y - PADDLE / 2, 8, PADDLE);
    cx.beginPath(); cx.arc(ball.x, ball.y, 6, 0, Math.PI * 2); cx.fillStyle = '#e8531f'; cx.fill();

    // activation diagram for the right paddle
    nn.clearRect(0, 0, 200, 120);
    const cols = [20, 100, 180];
    const nodes = acts.map((layer, c) => layer.map((v, i) => [cols[c], ((i + 1) * 120) / (layer.length + 1), v]));
    for (let a = 0; a < 2; a++)
      for (const p of nodes[a])
        for (const q of nodes[a + 1]) {
          nn.strokeStyle = `rgba(232,83,31,${Math.min(0.6, Math.abs(p[2] * q[2]) + 0.04)})`;
          nn.beginPath(); nn.moveTo(p[0], p[1]); nn.lineTo(q[0], q[1]); nn.stroke();
        }
    for (const [x, y, v] of nodes.flat()) {
      nn.beginPath(); nn.arc(x, y, 6, 0, Math.PI * 2);
      nn.fillStyle = `rgba(20,20,20,${0.15 + Math.min(0.85, Math.abs(v))})`;
      nn.fill();
    }
  }

  function loop() {
    if (!running) return;
    update();
    draw();
    requestAnimationFrame(loop);
  }

  // Only simulate while the game is on screen.
  new IntersectionObserver(([entry]) => {
    const was = running;
    running = entry.isIntersecting;
    if (running && !was) loop();
  }).observe(cv);
  draw();
}
