const pokedex = document.getElementById('pokedex');
const searchInput = document.getElementById('search-input');
let pokemon = [];

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 1010; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id,
            height: result.height,
            weight: result.weight
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokemons) => `
                <li class="card" onclick="selectPokemon(${pokemons.id})">
                    <img class="card-image" src="${pokemons.image}"/>
                    <h2 class="card-title">${pokemons.id}. ${pokemons.name}</h2>
                    <p class="card-subtitle">Type: ${formatType(pokemons.type)}</p>
                </li>
            `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

const formatType = (type) => {
    const typesArray = type.split(', ');
    const formattedTypes = typesArray.map((t) => {
        const className = getClassNameForType(t);
        return `<span class="${className}">${t}</span>`;
    });
    return formattedTypes.join(', ');
};

const getClassNameForType = (type) => {
    // Adicione lógica para obter a classe correspondente ao tipo
    switch (type) {
        case 'normal': 
            return 'is--normal'; 
        case 'grass':
            return 'is--grass';
        case 'fire':
            return 'is--fire';
        case 'water':
            return 'is--water';
        case 'bug':
            return 'is--bug';
        case 'electric':
            return 'is--electric';
        case 'rock':
            return 'is--rock';
        case 'ghost':
            return 'is--ghost';
        case 'poison':
            return 'is--poison';
        case 'psychic':
            return 'is--psychic';
        case 'fighting':
            return 'is--fighting';
        case 'ground':
            return 'is--ground';
        case 'dragon':
            return 'is--dragon';
        case 'fairy':
            return 'is--fairy';
        case 'dark':
            return 'is--dark'; 
        case 'steel': 
            return 'is--steel'; 
        case 'ice': 
            return'is--ice'; 
        case 'flying': 
            return'is--flying'; 
            // Adicione mais casos conforme necessário
        default:
            return '';
    }
};



const selectPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemons = await res.json();
    displayPopup(pokemons);
};

const displayPopup = (pokemons) => {
    const types = pokemons.types.map((type) => type.type.name);
    const typeClassList = types.map(getClassNameForType).join(' ');
    const type = pokemons.types.map((type) => formatType(type.type.name)).join(', ');

    const htmlString = `
        <div class="popup">
            <div class="card ${typeClassList}">
                <button id="BotaoFechar" onclick="FecharPopup()">X</button>
                <img class="card-image" src="${pokemons.sprites['front_default']}"/>
                <h2 class="card-title">${pokemons.id}. ${pokemons.name}</h2>
                <p class="card-subtitle">Type: ${type}</p>
                <p><small>Altura: </small> ${pokemons.height} | <small>Peso:</small> ${pokemons.weight}</p>
            </div>
        </div>
    `;

    // Adicione a classe 'popup-open' ao elemento body
    document.body.classList.add('popup-open');

    pokedex.innerHTML = htmlString + pokedex.innerHTML;
};
 





// Função para fechar o pop-up
function FecharPopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();
    }
}

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPokemon = pokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm)
    );

    if (filteredPokemon.length === 0) {
        pokedex.innerHTML = `<p>Nenhum pokémon com esse nome....</p>`;
    } else {
        const filteredPokemonHTMLString = filteredPokemon
            .map(
                (pokemons) => `
                    <li class="card" onclick="selectPokemon(${pokemons.id})">
                        <img class="card-image" src="${pokemons.image}"/>
                        <h2 class="card-title">${pokemons.id}. ${pokemons.name}</h2>
                        <p class="card-subtitle">Type: ${formatType(pokemons.type)}</p>
                    </li>
                `
            )
            .join('');
        pokedex.innerHTML = filteredPokemonHTMLString;
    }
});


// Função para filtrar os Pokémon por tipo
function filtrarPokemon(tipo) {
    const filteredPokemon = pokemon.filter((pokemon) =>
        pokemon.type.toLowerCase().includes(tipo)
    );
    const filteredPokemonHTMLString = filteredPokemon
        .map(
            (pokemons) => `
                <li class="card" onclick="selectPokemon(${pokemons.id})">
                    <img class="card-image" src="${pokemons.image}"/>
                    <h2 class="card-title">${pokemons.id}. ${pokemons.name}</h2>
                    <p class="card-subtitle">Type: ${formatType(pokemons.type)}</p>
                </li>
            `
        )
        .join('');
    pokedex.innerHTML = filteredPokemonHTMLString;
}


// Função para limpar o filtro e exibir todos os Pokémon
function limparFiltro() {
    displayPokemon(pokemon);
}

fetchPokemon();
/*/ Função para exibir um card de um Pokémon aleatório (a função porém não funcionava)
function displayRandomPokemon() {
    const randomIndex = Math.floor(Math.random() * pokemon.length); // Gera um índice aleatório
    const randomPokemon = pokemon[randomIndex];
    displayPopup(randomPokemon);
    (html:<button id="btnRandomPokemon" onclick="displayRandomPokemon()">Exibir Pokémon Aleatório</button>)


}*/


//area do login 
const bcrypt = require('bcryptjs');

// Função para cadastrar um novo usuário
function cadastrarUsuario(login, senha) {
  const senhaHash = bcrypt.hashSync(senha, 10); // Gerar hash da senha com custo 10
  // Execute a instrução SQL para armazenar o 'login' e 'senhaHash' no banco de dados
}

// Função para verificar o login
function verificarLogin(login, senhaDigitada) {
  // Execute a instrução SQL para obter o 'senha_hash' do banco de dados com base no 'login'
  const senhaHashNoBanco = '...'; // Substitua com o valor obtido do banco de dados

  const senhaCorreta = bcrypt.compareSync(senhaDigitada, senhaHashNoBanco);

  if (senhaCorreta) {
    // Senha correta, permita o login
    console.log('Login bem-sucedido!');
  } else {
    // Senha incorreta, negue o login
    console.log('Login falhou. Senha incorreta.');
  }
}
