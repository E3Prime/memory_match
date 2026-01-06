initialize();

/** @param {number} ms */
const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function initialize() {
  const memoryMatchElem = /** @type {HTMLElement} */ (document.getElementById('memoryMatch'));
  const resetBtn = /** @type {HTMLElement} */ (document.getElementById('reset'));
  const assets = ['assets/cheeseburger.png', 'assets/fries.png', 'assets/hotdog.png', 'assets/ice-cream.png', 'assets/milkshake.png', 'assets/pizza.png'];
  const images = shuffle([...assets, ...assets]);
  renderBoard(memoryMatchElem, images);
  memoryMatchElem.addEventListener('click', performAction);
}

/** @param {PointerEvent} e */
function performAction(e) {
  const actionBtn = /** @type {HTMLButtonElement} */ (/** @type {HTMLElement} */ (e.target).closest('.action-btn'));
  if (!(actionBtn instanceof HTMLButtonElement)) return;
  const actionBtns = /** @type {HTMLButtonElement[]} */ (Array.from(document.querySelectorAll('.action-btn')));

  actionBtn.disabled = true;
  actionBtns.forEach((btn) => (btn.disabled = true));

  const imgSrc = e.target;
  const imgSrcKey = actionBtn.dataset.key;

  // NOTE Left off here checking whether or not img is flipped accordingly
}

/**
 * @param {HTMLElement} memoryMatchElem
 * @param {string[]} images
 * */
function renderBoard(memoryMatchElem, images) {
  for (const img of images) {
    const blankImg = document.createElement('img');
    const btn = document.createElement('button');
    const imgName = img.slice(7, -4);

    blankImg.src = 'assets/blank.png';
    blankImg.alt = 'Mystery image';
    btn.type = 'button';
    btn.classList.add('action-btn');
    btn.dataset.key = imgName;
    btn.dataset.flipped = 'false';
    btn.appendChild(blankImg);
    memoryMatchElem.appendChild(btn);
  }
}

/** @param {string[]} collection */
function shuffle(collection) {
  for (let i = collection.length - 1; i > 0; --i) {
    const randomInt = Math.floor(Math.random() * (i + 1));
    [collection[i], collection[randomInt]] = [collection[randomInt], collection[i]];
  }
  return collection;
}
