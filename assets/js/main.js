const offset = 0;
const limit = 5;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

fetch(url)
    .then(resposta => resposta.json())
    .then(dados => {
        const pokemon = document.querySelector(".Pokemons")
        pokemon.innerHTML = "";

        const promessas = dados.results.map(item => {
            return fetch(item.url).then(respostas => respostas.json());
        })

        return Promise.all(promessas);
    })
    
    .then(pokemons => {
        const lista = document.querySelector(".Pokemons")
        
        pokemons.forEach(pokemon => {
            lista.innerHTML += `
            <li class="pokemon ${pokemon.types[0].type.name}" data-id="${pokemon.order}">
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
        
        
    })
    .catch(erro => console.log(erro))
    
document.querySelector('.Pokemons').addEventListener("click", (event) => {
    const li = event.target.closest("li.pokemon");

    if(!li) return;

    const id = li.getAttribute("data-id");
    
    window.location.href = `./detalhes.html?pokemon=${id}`;
})