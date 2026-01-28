window.addEventListener("DOMContentLoaded", () => {
  const diceSound = document.getElementById("diceSound");
  const btn = document.getElementById("reloadBtn");
  const dices = document.querySelectorAll(".dice-img");

  const h1 = document.querySelector("h1");
  const j1 = document.getElementById("j1");
  const j2 = document.getElementById("j2");

  // base path (local x GitHub Pages)
  const basePath = location.hostname.includes("github.io")
    ? "/Jogo-de-dados-Js/"
    : "./";

  // define o src do áudio (funciona nos dois)
  diceSound.src = basePath + "sounds/dice-roll.mp3";
  diceSound.volume = 1;

  function resetResultado() {
    j1.classList.remove("win", "lose", "draw");
    j2.classList.remove("win", "lose", "draw");
  }

  function animateTitle() {
    h1.classList.remove("winner-animate");
    void h1.offsetWidth;
    h1.classList.add("winner-animate");
  }

  btn.addEventListener("click", () => {
    // som na hora do clique
    diceSound.currentTime = 0;
    diceSound.play().catch(() => {});

    // animação dos dados (mantida)
    dices.forEach((dice, index) => {
      dice.classList.remove("jump-physics");
      void dice.offsetWidth;

      setTimeout(() => {
        dice.classList.add("jump-physics");
      }, index * 400);
    });

    // lógica do jogo (meio da animação)
    setTimeout(() => {
      const n1 = Math.floor(Math.random() * 6) + 1;
      const n2 = Math.floor(Math.random() * 6) + 1;

      // caminhos corretos (local + pages)
      dices[0].src = `${basePath}img/dice${n1}.png`;
      dices[1].src = `${basePath}img/dice${n2}.png`;

      resetResultado();

      if (n1 > n2) {
        h1.innerHTML = "🥇 Jogador 1 ganhou!";
        j1.classList.add("win");
        j2.classList.add("lose");
      } else if (n2 > n1) {
        h1.innerHTML = "🥇 Jogador 2 ganhou!";
        j2.classList.add("win");
        j1.classList.add("lose");
      } else {
        h1.innerHTML = "Empate!";
        j1.classList.add("draw");
        j2.classList.add("draw");
      }

      animateTitle();
    }, 530);
  });
});
