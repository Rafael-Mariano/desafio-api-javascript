const offset = 2;
const limit = 1;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

fetch(url)
    .then(resposta => resposta.json())
    .then(dados => {
        const pokemon = dados.results[0]
        return fetch(pokemon.url)
    })
    .then(resposta => resposta.json())
    .then(pokemon => {
        const lista = document.querySelector(".Pokemons")
        debugger
        lista.innerHTML = `
            <li class="pokemon ${pokemon.types[0].type.name}">
                <span class="numero">${`#${String(pokemon.order).padStart(3, '0')}`}</span>
                <span class="nome">${pokemon.name}</span>

                <div class="detalhes">
                    <ol class="tipos">
                        ${pokemon.types.map(tipo => `<li class="tipo">${tipo.type.name}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
                </div>
            </li>
        `
        
    })
    .catch(erro => console.log(erro))
    
