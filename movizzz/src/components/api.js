import axios from 'axios';

export const OMDBAPI = axios.create({
    baseURL: "http://www.omdbapi.com/?apikey=e91d1d1c"
})

export const TMDBAPI = axios.create({
    baseURL: "https://api.themoviedb.org/3/discover/"
})