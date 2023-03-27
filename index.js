const apiUrl = 'https://tarea-1.2023-1.tallerdeintegracion.cl/';

async function setMenus(page) {
    const response = await fetch(`${apiUrl}/trays?page=${page}`);
    const jsonResponse = await response.json();

    const menuGrid = document.getElementById('menu-grid');

    jsonResponse.items.forEach( async element => {

        const imageUrl = await getImage(element.id);
    
        menuGrid.innerHTML += `
        <div class="column is-one-third" id=${element.id} onClick=handleClick(this)>
            <div class="card">
                <div class="card-image">
                    <figure class="image is-square">
                        <img src=${imageUrl} alt="Placeholder image">
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

}


function setPagination(nPages, current) {
    console.log(`Son ${nPages} páginas, estás en la ${current}`);

    const nextButton = document.getElementsByClassName('pagination-next');
    const prevButton = document.getElementsByClassName('pagination-previous');


    if (current == 1) {
        console.log('es el 1, así que lo desactivamos')
    } else {
        nextButton.disabled = true;
    };
}

async function getImage(id) {
    const response = await fetch(`${apiUrl}/trays/${id}`);
    const courses = await response.json();
    const imageUrl = courses.courses[2].img_url;

    return imageUrl;
};

function handleClick(event) {
    window.location.href = `/pages/trays/trays.html?id=${event.id}`;
};

setMenus(1);
