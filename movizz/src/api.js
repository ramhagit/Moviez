import axios from 'axios';

export const OMDBAPI = axios.create({
    baseURL: `https://www.omdbapi.com`
})

export const TMDBAPI = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})

export const tmdbImage = "https://image.tmdb.org/t/p/";

export const omdbImage = axios.create({
    baseURL: "https://img.omdbapi.com/"
})