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
		let tipo1 = pokemon.types[0].type.name;
		let tipo2 = pokemon.types.length > 1 ? pokemon.types[1].type.name : "";

		html += `
	    <div class="col">
	        <div class="card bg-transparent border-0">
	        	<div class="img-contain rounded-circle bg-light">
					 <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${ pokemon.name }">
					 <div class="types d-flex justify-content-center text-capitalize text-white">
					  	<div class = "bg-success rounded-pill px-2">${ tipo1} </div>
						${ tipo2 && `<div class = "bg-info mx-2 rounded-pill px-2">${tipo2}</div>`}
					</div>
				</div>
	        <div class="card-body text-center">
	            <h5 class="card-title text-uppercase text-danger fs-2">${
								pokemon.name
							}</h5>
	            <p class="card-text text-white">Altura: ${
								Number(pokemon.height) / 10
							}m <br>Peso: ${
			Number(pokemon.weight) / 10
		}kg <br>Experiencia base: ${pokemon.base_experience}p </p>
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
