let contentMap = {}; // gets filled by page-specific file
let currentMainKey = '';
let rightSlots = [];

function renderMain(key) {
  const item = contentMap[key];
  const subtitleHTML = item.link
    ? `<a href="${item.link}" target="_blank" class="subtitle-link">${item.subtitle} 🔗</a>`
    : `<span>${item.subtitle}</span>`;

  return `
    <h1>${item.title}</h1>
    <h5>${subtitleHTML}</h5>
    <p>${item.text}</p>
    <img src="${item.imgLarge}" width="97%" alt="${item.alt}">
  `;
}

function renderThumbnail(key) {
  const item = contentMap[key];
  return `
    <h5>${item.subtitle}</h5>
    <img src="${item.imgSmall}" alt="${item.alt}">
  `;
}

function swapContent(slotIndex) {
  const clickedKey = rightSlots[slotIndex];
  if (clickedKey === currentMainKey) return;

  const oldMainKey = currentMainKey;
  currentMainKey = clickedKey;
  rightSlots[slotIndex] = oldMainKey;

  document.getElementById('main-content').innerHTML = renderMain(currentMainKey);
  for (let i = 0; i < rightSlots.length; i++) {
    document.getElementById(`right-slot-${i}`).innerHTML = renderThumbnail(rightSlots[i]);
  }
}

function initializePortfolio(startKey, sideKeys) {
  currentMainKey = startKey;
  rightSlots = sideKeys;
  document.getElementById('main-content').innerHTML = renderMain(currentMainKey);
  for (let i = 0; i < rightSlots.length; i++) {
    document.getElementById(`right-slot-${i}`).innerHTML = renderThumbnail(rightSlots[i]);
  }
}
