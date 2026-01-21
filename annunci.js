fetch('./annunci.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);

    const radioWrapper = document.getElementById('radio-wrapper');

    function radioCreate() {
      let categories = data.map(annuncio => annuncio.category);
      let uniqueCategories = [...new Set(categories)];

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

    radioCreate();
  });
