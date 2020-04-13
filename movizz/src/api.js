import axios from 'axios';
import { omdbKey } from './secrets';

export const OMDBAPI = axios.create({
    baseURL: `http://www.omdbapi.com/?apikey=${omdbKey}`
})

export const TMDBAPI = axios.create({
    baseURL: "https://api.themoviedb.org/3/discover/"
})

export const tmdbImage = axios.create({
    baseURL: "https://image.tmdb.org/t/p/"
})