// document.addEventListener('DOMContentLoaded',function(){
//     // alert('Movies-Zangu says: Welcome to my page!')

//     fetch('https://api.themoviedb.org/3/movie/popular?api_key=50b389526ca9b840b2cef75d8b8f512e')
//     .then(res=>res.json())
//     .then(data =>{
//         // data.forEach(movies=>{
//             console.log(data)
//         // })
//     })
// })


//api link
//https://api.themoviedb.org/3

// most popular
// https://api.themoviedb.org/3/movie/popular?


// apikey
//api_key=50b389526ca9b840b2cef75d8b8f512e

// const API_URL
//https://api.themoviedb.org/3/movie/popular?api_key=50b389526ca9b840b2cef75d8b8f512e

//const IMAGE_Path
//https://image.tmdb.org/t/p/1280/

// const searchUrl
//https://api.themoviedb.org/3/search/movie?api_key=50b389526ca9b840b2cef75d8b8f512e

const API_URL ='https://api.themoviedb.org/3/movie/popular?api_key=50b389526ca9b840b2cef75d8b8f512e'
const IMAGE_Path = 'https://image.tmdb.org/t/p/1280/'
const SEARCH_URL ='https://api.themoviedb.org/3/search/movie?api_key=50b389526ca9b840b2cef75d8b8f512e'
const form = document.querySelector('.form')
const search = document.getElementsByClassName('search')
const main = document.getElementsByClassName('main')

fetchMovies(API_URL)
 async  function fetchMovies(url){
     const res = await fetch(url);
     const data = await res.json();
     displayMovies(data.results)
     console.log(data.results)

}
function displayMovies(movies){
    main.innerHTML = ''

    movies.forEach(movie=>{
        const {title,poster_path,vote_average,overview}= movie
        //create a div in main 
        //first delete the existing placeholders
        const moviesElement = document.createElement('div')//.className= 'movie' //then give the div a className
        moviesElement.classList.add('movie') //classname of movie
        //first add elements of the div to the div before appending to the main element
        moviesElement.innerHTML = `
        <img src="${IMAGE_Path + poster_path} alt ="${title}" />
        <div class="movieInfo" >
        <h3>${title} </h3>
        <span class="${getClassesByRating(vote_average)}"> ${vote_average}</span>  
        </div>
        <div class ="overView"> 
        <h3> Overview</h3>
        ${overview}

        </div>
        `
        moviesElement
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
    const searchValue = search.value;
    if(searchValue && searchValue !==''){
        fetchMovies(SEARCH_URL + searchValue)
        searchValue = ''
    }else{
        window.location.reload()
        //we want it to reload
    }
})