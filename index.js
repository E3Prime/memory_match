initialize();

/** @param {number} ms */
const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** @param {string[]} collection */
const shuffle = (collection) => {
  for (let i = collection.length - 1; i > 0; --i) {
    const randomInt = Math.floor(Math.random() * (i + 1));
    [collection[i], collection[randomInt]] = [collection[randomInt], collection[i]];
  }
};

function initialize() {
  const memoryMatch = /** @type {HTMLElement} */ (document.getElementById('memoryMatch'));
  const resetBtn = /** @type {HTMLElement} */ (document.getElementById('reset'));
  const assets = ['assets/cheeseburger.png', 'assets/fries.png', 'assets/hotdog.png', 'assets/ice-cream.png', 'assets/milkshake.png', 'assets/pizza.png'];
  const images = [...assets, ...assets];
}
