import { TMDBAPI } from '../api';

export const tmdbNowPlaying = () => {
    TMDBAPI.get(`movie/now_playing?api_key=${tmdbKey}&language=en-US&region=US&page=${pageNum}`
    ).then(response => {
        setData(response.data.results);
        setNumOfPages(response.data.total_pages);
    });
}