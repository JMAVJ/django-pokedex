$('document').ready(function () {
  $('#pokemon-container').on('click', '.pokemon', function () {
    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${$(this).attr('pokemon-id')}/`,
      method: 'GET',
    }).done((res) => {
      $('#pokedex-container').html('');
      $('#pokedex-container').html(`
          <img
            src="${res.sprites.front_default}"
            class="card-img-top"
            alt="${res.name}"
          />
          <h3>${res.name}</h3>
          <p>Type: ${res.types[0].type.name}</p>
      `);
    });
  });

  function renderPokemon(data) {
    $('#pokemon-container').append(
      () => `
      <div class="card col-lg-2 col-8 bg-transparent border-light m-2 pokemon" pokemon-id="${data.name}">
        <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name} front">
        <div class="card-body">
          <div class="card-title">${data.name}</div>
        </div>
      </div>
    `
    );
  }

  function renderAll() {
    $.ajax({
      url: 'https://pokeapi.co/api/v2/pokemon?limit=150',
      method: 'GET',
    }).done((res) => {
      res.results.forEach((pokemon) => {
        $.ajax({
          url: pokemon.url,
          method: 'GET',
        }).done((res) => {
          renderPokemon(res);
        });
      });
    });
  }

  renderAll();
});
