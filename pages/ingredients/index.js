const apiUrl = 'https://tarea-1.2023-1.tallerdeintegracion.cl/';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const sort = urlParams.get('sort');
const order = urlParams.get('order');

async function setIngredients(page, sort, order) {
    console.log('query', sort, order);
    const response = await fetch(`${apiUrl}/ingredients?page=${page}&sort=${sort}&order=${order}`);
    const jsonResponse = await response.json();

    const ingredientsGrid = document.getElementById('ingredients-grid');

    jsonResponse.items.forEach( element => {
        ingredientsGrid.innerHTML += `
        <div class="column is-one-third">
            <div class="card">
                <div class="card-image" id=${element.id} onClick=handleClick(this)>
                    <figure class="image is-square">
                        <img src=${element.img_url} alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">
                    ${element.name}
                    <br>
                    $${element.price}
                    </div>
                </div>
            </div>
        </div>
        `
    });

    setPagination(jsonResponse.pages, jsonResponse.page);
};

setIngredients(1, sort, order);

function setPagination(nPages, current) {
    // console.log(`Son ${nPages} páginas, estás en la ${current}`);
    if (nPages <= 1) {
        return
    }

    const nextButton = document.getElementsByClassName('pagination-next');
    const prevButton = document.getElementsByClassName('pagination-previous');


    if (current == 1) {
        // console.log('es el 1, así que lo desactivamos')
    } else {
        nextButton.disabled = true;
    };
}

function handleClick(event) {
    window.location.href = `/pages/ingredients/ingredients.html?id=${event.id}`;
};

function handleSort(selectedSort) {
    window.location.href = `/pages/ingredients/index.html?sort=${selectedSort}&order=${order}`;
};

function handleOrder(selectedOrder) {
    window.location.href = `/pages/ingredients/index.html?sort=${sort}&order=${selectedOrder}`;
};


// const breadcrumbs = document.getElementById('breadcrumbs');

// function updateBreadcrumbs() {
//   const path = window.location.pathname;
//   const segments = path.split('/').filter((segment) => segment !== '');

//   let breadcrumbsHtml = '';
//   let url = '';

//   segments.forEach((segment, index) => {
//     url += `/${segment}`;
//     const title = segment.charAt(0).toUpperCase() + segment.slice(1);

//     breadcrumbsHtml += `
//       <a href="${url}">${title}</a>
//       ${index !== segments.length - 1 ? '<span>></span>' : ''}
//     `;
//   });

//   breadcrumbs.innerHTML = breadcrumbsHtml;
// }

// updateBreadcrumbs();

