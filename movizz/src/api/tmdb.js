import { TMDBAPI } from './base';
import { tmdbKey } from '../keys';

export const tmdbNowPlaying = (pageNum=1) => {
    return TMDBAPI.get(`movie/now_playing?api_key=${tmdbKey}&language=en-US&region=US&page=${pageNum}&adult=false`);
}

export const tmdbNowPlayingFiltered = () => {
    return TMDBAPI.get(`movie/now_playing?api_key=${tmdbKey}&language=en-US&vote_average.gte=5`);
}