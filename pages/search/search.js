const apiURL = 'https://tarea-1.2023-1.tallerdeintegracion.cl/';

if (window.location.href.includes('/pages/search/search.html')) {
    const queryParams = new URLSearchParams(window.location.search);
    const nameParam = queryParams.get('name');
    showResults(nameParam);
};

async function showResults(nameSearch) {
    const responses = await search(nameSearch);

    const searchGrid = document.getElementById('search-grid');

    for (let i = 1; i <= 3; i++) {

        if (!responses[i].length) {
            console.log('AQUI');
            responses[i].forEach( element => {
                searchGrid.innerHTML += `
                <div class="column is-one-third" id=${element.id} onClick=handleClick(this)>
                    <div class="card">
                        <div class="card-image">
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
        };
    }
    // responses.forEach( async element => {
};


async function search(input) {
    const traysQ = await fetch(`${apiURL}/search/trays?name=${input}`);
    const traysRes = await traysQ.json();

    const coursesQ = await fetch(`${apiURL}/search/courses?name=${input}`);
    const coursesRes = await coursesQ.json();

    const ingredientsQ = await fetch(`${apiURL}/search/ingredients?name=${input}`);
    const ingredientsRes = await ingredientsQ.json();

    return {
        1: traysRes,
        2: coursesRes,
        3: ingredientsRes,
    }
};

async function handleSearch(event) {
    if (event.key === 'Enter' || event.target.id === 'search-button') {
        const searchValue = document.getElementById("search-input").value;
        window.location.href = `/pages/search/search.html?name=${searchValue}`;
        // const responses = await search(searchValue);
        // console.log(responses);
    };
};
