//*  API
const API = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

//* Consumir API

const getData = async (api) => {
	try {
		let arregloPokemon = [];

		let respuesta = await (await fetch(api)).json();
		paginacion(respuesta);

		let results = respuesta.results;

		for (const result of results) {
			let pokemon = await (await fetch(result.url)).json();
			arregloPokemon.push(pokemon);
		}

		console.log(arregloPokemon);
		dibujarData(arregloPokemon);

	} catch (error) {
		console.log("Error", error);
	}

};

//* Dibujar cards de Pokemones

const dibujarData = (data) => {
	let html = "";
	html += '<div class="row row-cols-1 row-cols-md-3 g-4">';
	data.forEach((pokemon) => {
		html += `
	    <div class="col">
	        <div class="card">
	        <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
	        <div class="card-body text-center">
	            <h5 class="card-title">${pokemon.name}</h5>
	            <p class="card-text">Altura: ${Number(pokemon.height)/10}m <br>Peso: ${Number(pokemon.weight)/10}kg <br>Experiencia base: ${pokemon.base_experience}p </p>
	        </div>
	        </div>
	    </div>
	   `;
	});
	html += "</div>";

	document.getElementById("dataPokemon").innerHTML = html;
};

//* Paginación

const paginacion = (data) => {
	let html = `<li class ="page-item ${
		data.previous ? "" : "disabled"
	}"><a class="page-link" onclick ="getData('${
		data.previous
	}')">Prev</a></li> <li class="page-item ${
		data.next ? "" : "disabled"
	}"><a class="page-link" onclick ="getData('${data.next}')">Next</a></li>`;

	document.getElementById("pagination").innerHTML = html;
};

//* Eejecutar getData

getData(API);

