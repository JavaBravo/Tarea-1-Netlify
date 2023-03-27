const apiUrl = 'https://tarea-1.2023-1.tallerdeintegracion.cl/';

const queryParams = new URLSearchParams(window.location.search);
const ingredientID = queryParams.get('id');

const titleElement = document.getElementById('ingredient-title');
const subtitleElement = document.getElementById('ingredient-subtitle-block');

async function getIngredient(id) {
    const response = await fetch(`${apiUrl}/ingredients/${id}`);
    const jsonResponse = await response.json();

    // display ingredient info
    titleElement.innerHTML = jsonResponse.name;
    subtitleElement.innerHTML += `
        <div class="field is-grouped" id='ingredient-info-tags'>
            <div class="control">
                <div class="tags has-addons">
                    <span class="tag is-dark">Precio</span>
                    <span class="tag">${jsonResponse.price}</span>
                </div>
            </div>

            <div class="control">
                <div class="tags has-addons">
                    <span class="tag is-dark">Tamaño</span>
                    <span class="tag">${jsonResponse.size}</span>
                </div>
            </div>

            <div class="control">
                <div class="tags has-addons">
                    <span class="tag is-dark">Expiración</span>
                    <span class="tag">${jsonResponse.expiration}</span>
                </div>
            </div>
        </div>

        <p class="subtitle" id="ingredient-subtitle-p">${jsonResponse.description}</p>

        <figure class="image is-1by1">
            <img src=${jsonResponse.img_url} alt="Placeholder image">
        </figure>
    `;
};

getIngredient(ingredientID);