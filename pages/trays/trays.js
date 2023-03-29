const apiUrl = 'https://tarea-1.2023-1.tallerdeintegracion.cl/';

const queryParams = new URLSearchParams(window.location.search);
const menuID = queryParams.get('id');

const titleElement = document.getElementById('menu-title');
const subtitleElement = document.getElementById('menu-subtitle-block');

async function getMenu(id) {
    const response = await fetch(`${apiUrl}/trays/${id}`);
    const jsonResponse = await response.json();

    // display menu info
    titleElement.innerHTML = jsonResponse.name;
    subtitleElement.innerHTML += `
        <div class="field is-grouped" id='menu-info-tags'>
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

        <p class="subtitle" id="menu-subtitle-p">${jsonResponse.description}</p>

        <div class="notification is-primary" id="menu-grid-back">
            <div class="columns is-multiline is-mobile" id="menu-grid">
            </div>
        </div>
    `;

    const menuGrid = document.getElementById('menu-grid');

    // display courses
    jsonResponse.courses.forEach( async element => {    
        menuGrid.innerHTML += `
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
                    <span class="tag">${element.category}</span>
                    </div>
                </div>
            </div>
        </div>
        `
    });
};

function handleClick(event) {
    // console.log(event.id);
    window.location.href = `/pages/courses/courses.html?id=${event.id}`;
}


getMenu(menuID);

const breadcrumbs = document.getElementById('breadcrumbs');

function updateBreadcrumbs() {
  const path = window.location.pathname;
  const segments = path.split('/').filter((segment) => segment !== '');

  let breadcrumbsHtml = '';
  let url = '';

  segments.forEach((segment, index) => {
    url += `/${segment}`;
    const title = segment.charAt(0).toUpperCase() + segment.slice(1);

    breadcrumbsHtml += `
      <a href="${url}">${title}</a>
      ${index !== segments.length - 1 ? '<span>></span>' : ''}
    `;
  });

  breadcrumbs.innerHTML = breadcrumbsHtml;
}

updateBreadcrumbs();

