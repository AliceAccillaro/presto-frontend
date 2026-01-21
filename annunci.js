fetch('./annunci.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);

    const radioWrapper = document.getElementById('radio-wrapper');
    const cardWrapper = document.getElementById('card-wrapper');

    function radioCreate() {
      let categories = data.map(annuncio => annuncio.category);
      let uniqueCategories = [...new Set(categories)];
      uniqueCategories.unshift('Tutti');

      radioWrapper.innerHTML = "";

      uniqueCategories.forEach((category, index) => {
        const safeId = category.replace(/\s+/g, '-').toLowerCase();

        let div = document.createElement('div');
        div.classList.add('form-check');

        div.innerHTML = `
          <input 
            class="form-check-input"
            type="radio"
            name="radioDefault"
            id="${safeId}"
            value="${category}"
            ${index === 0 ? 'checked' : ''}
          >
          <label class="form-check-label" for="${safeId}">
            ${category}
          </label>
        `;

        radioWrapper.appendChild(div);
      });
    }

    function showCards(filteredCategory = 'Tutti') {
      cardWrapper.innerHTML = '';

      const filteredData =
        filteredCategory === 'Tutti'
          ? data
          : data.filter(annuncio => annuncio.category === filteredCategory);

      filteredData.forEach((annuncio, i) => {
        let div = document.createElement('div');
        div.classList.add('card-custom');

        div.innerHTML = `
          <img src="https://picsum.photos/seed/${annuncio.id ?? i}/300/200" alt="immagine casuale" class="img-fluid img-card">
          <p class="h2">${annuncio.name}</p>
          <p class="h4">${annuncio.category}</p>
          <p class="lead">${annuncio.price} €</p>
        `;

        cardWrapper.appendChild(div);
      });
    }

    // 1) creo radio
    radioCreate();

    // 2) mostro subito le card (tutte)
    showCards();

    // 3) quando cambio radio, filtro
    radioWrapper.addEventListener('change', (e) => {
      if (e.target && e.target.name === 'radioDefault') {
        showCards(e.target.value);
      }
    });
  })
  .catch(err => console.error(err));
