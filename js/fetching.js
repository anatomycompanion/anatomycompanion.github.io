const BASE_URL = 'http://localhost:8080';
const MUSCLES_URL = '/api/muscles/';

const header = new Headers();
header.set("Access-Control-Allow-Origin","*");
// header("Access-Control-Allow-Origin: *");
let fetchData = {
    method: 'Get',
    headers: header
}


function fetchMuscle(id) {
    fetch(BASE_URL+MUSCLES_URL + id)
        .then(response => response.json())
        .then(muscle => singleHandler(muscle,'muscles-output',htmlForMuscle));
}

function fetchMuscles() {
    fetch(BASE_URL+MUSCLES_URL, fetchData)
        .then(response => {
            console.log(response)
            return response.json();
        })
        .then(muscles => arrayHandler(muscles,'muscles-output',htmlForMuscle));
}

function singleHandler(el, targetId, styler) {
    document.getElementById(targetId).innerHTML = styler(el);
}

function arrayHandler(arr, targetId, styler) {
    document.getElementById(targetId).innerHTML = '<progress></progress>';
    let html_string = '';
    for (let i = 0; i < arr.length; i++) {
        html_string += styler(arr[i]);
    }
    document.getElementById(targetId).innerHTML = html_string;
}

function htmlForMuscle(muscle) {
    return '<fieldset>\n' +
        '    <legend>muscle.name</legend>\n' +
        '    <p>\n' +
        '        <strong>function:</strong> <br>muscle.function<br> <br>\n' +
        '        <strong>origin:</strong> <br>muscle.origin<br> <br>\n' +
        '        <strong>insertion:</strong><br>muscle.insertion<br> <br>\n' +
        '        <strong>innervation:</strong> <br>muscle.innervation<br> <br>\n' +
        '        <strong>vascularisation:</strong><br>muscle.vascularisation<br> <br>\n' +
        '        <strong>imageUrl:</strong> <br>muscle.imageUrl<br><br>\n' +
        '        <strong>region:</strong><br>muscle.region\n' +
        '    </p>\n' +
        '</fieldset>'
}

function errorCatch(targetId) {
    document.getElementById(targetId).innerHTML = 'Something went wrong';
}