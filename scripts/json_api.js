//Just for converting number to month's name
var months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August", "September",
    "October", "November", "December" ];

//Current page of the website
var currentPage;
//Maximum page
var maxPage = 1;

//Url for the API
let url = 'http://xkcd.com/info.0.json';

//Load early, load the comic and all its data
async function loadComic(url) {
    fetch(url)
    .then((response) => response.json())
    .then(function(content) {
        //Just for debugging purposes
        console.log(content)

        //Assigning HTML id to JS
        let comicPage = document.getElementById('comicPage');
        let comicTitle = document.getElementById('comicTitle');
        let datePublished = document.getElementById('datePublished');
        let altDesc = document.getElementById('altDesc');

        //Assign data
        currentPage = content.num;
        if(maxPage < currentPage){
            maxPage = currentPage;
        }
        
        //Assign data to show
        comicTitle.innerHTML = content.title;
        datePublished.innerHTML = content.year + " " + months[content.month] + " " + content.day + "th";
        comicPage.setAttribute('src', content.img);
        altDesc.innerHTML = content.alt;
    })
    .catch(error => {
        console.log(error);
        //if there is no longer page after, return back
        currentPage -= 1;
    });
};

function prevFunc() {

    //Checks if it is the first page or not
    if (currentPage == 1) {
        console.log("lowest");
    }
    //Loads the previous comic
    else{
        currentPage -= 1;
        url = 'http://xkcd.com/' + currentPage + '/info.0.json';
        loadComic(url);
    }
};

function fwdFunc() {
    currentPage += 1;

    url = 'http://xkcd.com/' + currentPage + '/info.0.json';
    loadComic(url);
};

function randFunc() {
    let rand = Math.floor(Math.random() * maxPage);
    currentPage = rand;
    url = 'http://xkcd.com/' + currentPage + '/info.0.json';
    loadComic(url);
};

function latestFunc() {
    url = 'http://xkcd.com/info.0.json';
    loadComic(url);
}

function firstFunc() {
    url = 'http://xkcd.com/1/info.0.json';
    loadComic(url);
}

window.onload = function() {
    //Load it first
    loadComic(url);

    //Assign the function to the buttons
    document.getElementById('prevButton').onclick = function() {prevFunc()};
    document.getElementById('fwdButton').onclick = function() {fwdFunc()};
    document.getElementById('randButton').onclick = function() {randFunc()};
    document.getElementById('latestButton').onclick = function() {latestFunc()};
    document.getElementById('firstButton').onclick = function() {firstFunc()};
    
};