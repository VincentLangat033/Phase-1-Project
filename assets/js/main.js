
document.addEventListener('DOMContentLoaded',function(e){
    e.preventDefault;

//variable declarations
const API_URL ='https://api.themoviedb.org/3/movie/popular?api_key=50b389526ca9b840b2cef75d8b8f512e'
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500'
const SEARCH_URL ='https://api.themoviedb.org/3/search/movie?api_key=50b389526ca9b840b2cef75d8b8f512e'
const API_KEY = 'api_key=50b389526ca9b840b2cef75d8b8f512e';
const BASE_URL = 'https://api.themoviedb.org/3';
const GENRE_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const form = document.getElementById('form')
const search = document.getElementById('search')
const main= document.getElementById('main')
const tagsElement = document.getElementById('tags');


// An array of sample genres I would like to display
const genres = [
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
  
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

//inititalize a selectedGenre as an empty array so that upon selection you can push elements to the array
let selectedGenre = []
//setGenre() calls our function/ invoking a function and this function has been hoisted
setGenre();
function setGenre() {
    //setting  iinerHtml to an empty string clears the previously displayed content in the DOM
    tagsElement.innerHTML= '';
    //iterates over our const genres array declared above then creates a new DIV
    genres.forEach(genre => {
        const genreTag = document.createElement('div');
        //give the div a classname of tag (to style in the css)
        genreTag.classList.add('tag');
        genreTag.id=genre.id;
        genreTag.innerText = genre.name;
        genreTag.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id == genre.id){
                            selectedGenre.splice(idx, 1);
                        }
                    })
                }else{
                    selectedGenre.push(genre.id);
                }
            }
            // console.log(selectedGenre) used to check any errors
        
            getMovies(GENRE_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
            highlightSelection()
        })
        tagsElement.append(genreTag);
    })
}
//function to check the highlighted selection
function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    clearBtn()
    if(selectedGenre.length !=0){   
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }

}
// function to clear button when selected
function clearBtn(){
    let clearBtn = document.getElementById('clear');
    if(clearBtn){
        clearBtn.classList.add('highlight')
    }else{
            
        let clear = document.createElement('div');
        clear.classList.add('tag','highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear Filter';
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGenre();            
            getMovies(API_URL);
        })
        tagsElement.append(clear);
    }
    
}

//function to displayMovies
getMovies(API_URL)
function getMovies(url){

    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        displayMovies(data.results)
        console.log(data.results)
    })
  
 }
function displayMovies(movies){
    //innerHTMl = ''clears previously  appended content
 main.innerHTML =''
 //iterate over the movies so as to pass their values. image,voteavarage,title
 movies.forEach((movie)=>{
  
    const moviesElement=document.createElement('div')
    moviesElement.classList.add('movie')
    
     const img = document.createElement('img')
     img.src =  `${IMAGE_PATH}${movie.poster_path}`
     const div = document.createElement('div')
     div.classList.add('movie-info')
    const h3 = document.createElement('h3')
    h3.innerText = movie.title
    const span = document.createElement('span')
    span.classList.add(getClassesByRating())
    span.innerText = movie.vote_average
    div.appendChild(h3)
    div.appendChild(span)
    const div1 = document.createElement('div')
    div1.classList.add('overview')
    const h31= document.createElement('h3')
    h31.innerText = movie.overview
    const button = document.createElement('button')
    const myRatingFormDiv =document.createElement('div')
    myRatingFormDiv.innerHTML =`
    <br>
    <form action="#" class="myRatingForm" id ="myRatingForm">
    <input type="text" placeholder ="Your Rating" class="yourRating" id="yourRating" >  <br>
    <button type="submit" name="Your Rating" id="buttonRating" value="Updating Rating"> <br>
    </form>
    `
    button.classList.add('updateRatingButtonDiv')
    button.innerText = 'Input your Rating'
    div1.appendChild(h31)
    div1.appendChild(button)
    div1.appendChild(myRatingFormDiv)
    moviesElement.appendChild(img)
    moviesElement.appendChild(div)
    moviesElement.appendChild(div1)
    main.appendChild(moviesElement)


// add an eventlistener to the button we created
button.addEventListener('click',()=>{
    alert('New Ratings will be posted')
    updateRating()
})
const myRatingForm = document.getElementById('myRatingForm')
 myRatingForm.addEventListener('submit', handleRating)
 function handleRating(e){
     e.preventDefault;
    //  let ratingObject = {value: e.target.yourRating.value}
      alert('JS')
      


 }    
 })
}
function getClassesByRating(rating){
    if(rating>=8){
        return 'green'
    }else if(rating>=5){
        return 'orange'
    }else{
        return 'red'
    }
}
form.addEventListener('submit', (e)=>{
     e.preventDefault;
      searchValue = search.value
     if(searchValue && searchValue !== ''){
         //concatenate with a forward slash
         getMovies(SEARCH_URL + '%query=' + searchValue)
        // getMovies(API_URL)
         searchValue='' //after search value is achieved, clear the value
     }else{
         window.location.reload()
     }
 })

 //implementing post method
 //https://api.themoviedb.org/3/movie/{movie_id}/rating?api_key=<<api_key>>

 function updateRating(movies){
//
     fetch('url',
     {
         method: 'POST',
         headers: {
             'Content-type': 'application/json'
         },
         body: JSON.stringify(movies)

     })
     .then(res=> res.json())
     .then(data =>console.log(data))
 }
 const myRatingForm = document.getElementById('myRatingForm')
 myRatingForm.addEventListener('submit', handleRating)
 function handleRating(e){
     e.preventDefault;
    //  let ratingObject = {value: e.target.yourRating.value}
      alert('JS')
      


 }


const newMovies =document.getElementById('newMovies')
newMovies.addEventListener('click', ()=>{
    console.log('New Movies will be posted soon!')
})


})