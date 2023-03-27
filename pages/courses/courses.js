const apiUrl = 'https://tarea-1.2023-1.tallerdeintegracion.cl/';

const queryParams = new URLSearchParams(window.location.search);
const courseID = queryParams.get('id');

const titleElement = document.getElementById('course-title');
const subtitleElement = document.getElementById('course-subtitle-block');

async function getCourse(id) {
    const response = await fetch(`${apiUrl}/courses/${id}`);
    const jsonResponse = await response.json();

    // display course info
    titleElement.innerHTML = jsonResponse.name;
    subtitleElement.innerHTML += `
        <div class="field is-grouped" id='course-info-tags'>
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

        <p class="subtitle" id="course-subtitle-p">${jsonResponse.description}</p>

        <figure class="image is-1by1">
            <img src=${jsonResponse.img_url} alt="Placeholder image">
        </figure>

        <div class="notification is-primary" id="course-grid-back">
            <div class="columns is-multiline is-mobile" id="course-grid">
            </div>
        </div>
    `;

    const courseGrid = document.getElementById('course-grid');

    // display courses
    jsonResponse.ingredients.forEach( async element => {    
        courseGrid.innerHTML += `
        <div class="column is-one-third">
            <div class="card">
                <div class="card-image" onClick=handleClick(this) id=${element.id}>
                    <figure class="image is-square">
                        <img src=${element.img_url} alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">
                    ${element.name}
                    <br>
                    <span class="tag">Cantidad: ${element.quantity}</span>
                    </div>
                </div>
            </div>
        </div>
        `
    });
};

function handleClick(event) {
    window.location.href = `/pages/ingredients/ingredients.html?id=${event.id}`;
}


getCourse(courseID);