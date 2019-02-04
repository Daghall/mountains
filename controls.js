export default function Controls(draw) {
  setupEventListeners();

  function setupEventListeners() {
    const preventDefaultKeys = [
      "Tab",
      " ",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
    ];

    window.addEventListener("keydown", (event) => {
      if (preventDefaultKeys.includes(event.key)) {
        event.preventDefault();
      }

      switch (event.key) {
        case "r":
          draw();
          break;
        case "ArrowUp":
          draw(1);
          break;
        case "ArrowDown":
          draw(-1);
          break;
      }
    });
  }
}
