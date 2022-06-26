
document.addEventListener('DOMContentLoaded',function(e){
    e.preventDefault;
    


// const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const API_URL ='https://api.themoviedb.org/3/movie/popular?api_key=50b389526ca9b840b2cef75d8b8f512e'
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500'
const SEARCH_URL ='https://api.themoviedb.org/3/search/movie?api_key=50b389526ca9b840b2cef75d8b8f512e'
const form = document.getElementById('form')
const search = document.getElementById('search')
const main= document.getElementById('main')

//function to displayMovies

getMovies(API_URL)
 async function getMovies(url){

    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        displayMovies(data.results)
        console.log(data.results)
    })
  
 }
function displayMovies(movies){
 main.innerHTML =''
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
    span.classList.add('green')
    span.innerText = movie.vote_average
    div.appendChild(h3)
    div.appendChild(span)
    const div1 = document.createElement('div')
    div1.classList.add('overview')
    const h31= document.createElement('h3')
    h31.innerText = movie.overview
    div1.appendChild(h31)
    moviesElement.appendChild(img)
    moviesElement.appendChild(div)
    moviesElement.appendChild(div1)


   
  
    
     main.appendChild(moviesElement)
      
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
     let searchValue = search.value
     if(searchValue && searchValue !== ''){
         //concatenate with a forward slash
         getMovies(SEARCH_URL + '%query=' + searchValue)
        // getMovies(API_URL)
         searchValue=''
     }else{
         window.location.reload()
     }
 })

 //implementing post method
 //https://api.themoviedb.org/3/movie/{movie_id}/rating?api_key=<<api_key>>



})