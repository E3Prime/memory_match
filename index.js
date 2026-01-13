/** @param {number} ms */
const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

initialize();

function initialize() {
  const memoryMatchElem = /** @type {HTMLElement} */ (document.getElementById('memoryMatch'));
  const assets = ['assets/cheeseburger.png', 'assets/fries.png', 'assets/hotdog.png', 'assets/ice-cream.png', 'assets/milkshake.png', 'assets/pizza.png'];
  const images = shuffle([...assets, ...assets]);
  renderBoard(memoryMatchElem, images);
  memoryMatchElem.addEventListener('click', performAction);
}

/** @param {PointerEvent} e */
async function performAction(e) {
  const actionBtn = /** @type {HTMLButtonElement} */ (/** @type {HTMLElement} */ (e.target).closest('.action-btn'));
  if (!(actionBtn instanceof HTMLButtonElement)) return;
  const actionBtns = /** @type {HTMLButtonElement[]} */ (Array.from(document.querySelectorAll('.action-btn')));

  actionBtn.disabled = true;
  actionBtns.forEach((btn) => (btn.disabled = true));

  const imgSrc = /** @type {HTMLImageElement} */ (e.target);
  const imgSrcKey = actionBtn.dataset.key;

  if (actionBtn.dataset.flipped === 'false') {
    actionBtn.dataset.flipped = 'true';
    imgSrc.classList.add('rotation');
    await sleep(500);
    imgSrc.src = `assets/${imgSrcKey}.png`;
  } else {
    actionBtn.dataset.flipped = 'true';
    imgSrc.classList.remove('rotation');
    await sleep(500);
    imgSrc.src = 'assets/blank.png';
  }
  await sleep(1000);

  const selectedCards = /** @type {HTMLImageElement[]} */ (actionBtns.filter((c) => c.dataset.flipped === 'true').flatMap((c) => Array.from(c.children)));
  selectedCards.length === 2 ? await checkForMatch(selectedCards) : actionBtns.forEach((btn) => (btn.disabled = false));
}

/** @param {HTMLImageElement[]} selectedCards */
async function checkForMatch(selectedCards) {
  const [card1, card2] = selectedCards;
  if (!(card1.parentElement && card2.parentElement)) return;

  if (card1.parentElement.dataset.key === card2.parentElement.dataset.key) {
    card1.classList.add('match');
    card2.classList.add('match');
    await sleep(1000);
    card1.parentElement.remove();
    card2.parentElement.remove();
  } else {
    card1.classList.add('no-match');
    card2.classList.add('no-match');
    await sleep(1000);
    card1.classList.remove('no-match');
    card2.classList.remove('no-match');
    await sleep(300);
    card1.classList.remove('rotation');
    card2.classList.remove('rotation');
    await sleep(500);
    card1.src = 'assets/blank.png';
    card2.src = 'assets/blank.png';
    card1.parentElement.dataset.flipped = 'false';
    card2.parentElement.dataset.flipped = 'false';
  }
  await sleep(1000);
  const actionBtns = /** @type {HTMLButtonElement[]} */ (Array.from(document.querySelectorAll('.action-btn')));
  actionBtns.length === 0 ? replay() : actionBtns.forEach((b) => (b.disabled = false));
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

function replay() {
  const memoryMatchElem = /** @type {HTMLElement} */ (document.getElementById('memoryMatch'));
  const resetBtn = /** @type {HTMLButtonElement} */ (document.getElementById('reset'));
  resetBtn.disabled = false;
  resetBtn.style.opacity = '1';
  resetBtn.addEventListener(
    'click',
    () => {
      resetBtn.disabled = true;
      resetBtn.style.opacity = '0';
      memoryMatchElem.removeEventListener('click', performAction);
      initialize();
    },
    {once: true}
  );
}

/** @param {string[]} collection */
function shuffle(collection) {
  for (let i = collection.length - 1; i > 0; --i) {
    const randomInt = Math.floor(Math.random() * (i + 1));
    [collection[i], collection[randomInt]] = [collection[randomInt], collection[i]];
  }
  return collection;
}
