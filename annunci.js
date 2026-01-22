let annunciData = [];

fetch("./annunci.json")
  .then(function (response) {
    if (!response.ok) throw new Error("HTTP " + response.status);
    return response.json();
  })
  .then(function (data) {
    annunciData = data;

    createCategoryRadios();
    setupPriceInput();
    globalFilter();
    setupEvents();
  })
  .catch(function (err) {
    console.error("ERRORE:", err);
  });

function getRadioWrapper() {
  return document.getElementById("radio-wrapper");
}

function getCardWrapper() {
  return document.getElementById("card-wrapper");
}

function getPriceInput() {
  return document.getElementById("priceInput");
}

function getPriceValue() {
  return document.getElementById("priceValue");
}

function getWordInput() {
  return document.getElementById("wordInput");
}

function createCategoryRadios() {
  let radioWrapper = getRadioWrapper();
  if (!radioWrapper) return;

  radioWrapper.innerHTML = "";

  let categories = annunciData.map(function (a) {
    return a.category;
  });

  let uniqueCategories = ["Tutti", ...new Set(categories)];

  uniqueCategories.forEach(function (category, index) {
    let safeId = category.replace(/\s+/g, "-").toLowerCase();

    let div = document.createElement("div");
    div.classList.add("form-check");

    div.innerHTML = `
      <input
        class="form-check-input"
        type="radio"
        name="radioDefault"
        id="${safeId}"
        value="${category}"
        ${index === 0 ? "checked" : ""}
      >
      <label class="form-check-label" for="${safeId}">
        ${category}
      </label>
    `;

    radioWrapper.appendChild(div);
  });
}

function showCards(list) {
  let cardWrapper = getCardWrapper();
  if (!cardWrapper) return;

  cardWrapper.innerHTML = "";

  if (!list.length) {
    cardWrapper.innerHTML = `<p class="lead">Nessun annuncio trovato</p>`;
    return;
  }

  list.forEach(function (annuncio, i) {
    let div = document.createElement("div");
    div.classList.add("card-custom");

    let priceNum = Number(annuncio.price);
    let priceText = isNaN(priceNum)
      ? annuncio.price
      : priceNum.toFixed(2);

    div.innerHTML = `
      <div class="img-wrap">
        <img
          src="https://picsum.photos/seed/${annuncio.id ?? i}/300/200"
          alt="immagine annuncio"
        >
      </div>
      <p class="h2">${annuncio.name}</p>
      <p class="h4">${annuncio.category}</p>
      <p class="lead">${priceText} €</p>
    `;

    cardWrapper.appendChild(div);
  });
}

function setupPriceInput() {
  let priceInput = getPriceInput();
  let priceValue = getPriceValue();
  if (!priceInput) return;

  let prices = annunciData
    .map(function (a) {
      return Number(a.price);
    })
    .filter(function (n) {
      return !isNaN(n);
    })
    .sort(function (a, b) {
      return a - b;
    });

  let maxPrice = Math.ceil(prices[prices.length - 1] || 0);

  priceInput.max = maxPrice;
  priceInput.value = maxPrice;

  if (priceValue) priceValue.innerHTML = maxPrice;
}

function filterByCategory(array) {
  let radios = document.querySelectorAll(".form-check-input");
  let radioArray = Array.from(radios);

  let checked = radioArray.find(function (r) {
    return r.checked;
  });

  if (!checked || checked.value === "Tutti") return array;

  return array.filter(function (annuncio) {
    return annuncio.category === checked.value;
  });
}

function filterByPrice(array) {
  let priceInput = getPriceInput();
  if (!priceInput) return array;

  let max = Number(priceInput.value);

  return array.filter(function (annuncio) {
    return Number(annuncio.price) <= max;
  });
}

function filterByWord(array) {
  let wordInput = getWordInput();
  if (!wordInput) return array;

  let word = wordInput.value.toLowerCase().trim();
  if (word === "") return array;

  return array.filter(function (annuncio) {
    let nameText = (annuncio.name || "").toLowerCase();
    let categoryText = (annuncio.category || "").toLowerCase();
    return (
      nameText.includes(word) || categoryText.includes(word)
    );
  });
}

function globalFilter() {
  let filtered = filterByCategory(annunciData);
  filtered = filterByPrice(filtered);
  filtered = filterByWord(filtered);

  showCards(filtered);
}

function setupEvents() {
  let radioWrapper = getRadioWrapper();
  let priceInput = getPriceInput();
  let priceValue = getPriceValue();
  let wordInput = getWordInput();

  if (radioWrapper) {
    radioWrapper.addEventListener("change", function (e) {
      if (e.target && e.target.name === "radioDefault") {
        globalFilter();
      }
    });
  }

  if (priceInput) {
    priceInput.addEventListener("input", function () {
      if (priceValue) priceValue.innerHTML = priceInput.value;
      globalFilter();
    });
  }

  if (wordInput) {
    wordInput.addEventListener("input", function () {
      globalFilter();
    });
  }
}
