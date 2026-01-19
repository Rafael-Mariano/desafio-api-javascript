const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("pokemon");

fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(resposta => resposta.json())
    .then(pokemon => {
        document.querySelector(".conteudo").innerHTML = `
            <h1>${pokemon.name}</h1>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">

            <div>
                <p>Altura: ${pokemon.height}</p>
                <p>Peso: ${pokemon.weight}</p>
                <p>Tipos: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
            </div>

        `;
    })