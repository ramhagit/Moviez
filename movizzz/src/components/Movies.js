import React from 'react';
import { TMDBAPI } from './api';
import { tmdbKey } from '../secrets'

export default class Movies extends React.Component {
    state = {
        data: []
    }

    async componentDidMount() {
        const response = await TMDBAPI.get(`movie?api_key=${tmdbKey}&language=en-US&sort_by=release_date.desc&release_date.lte=2020-01-04&vote_average.gte=5.5&with_original_language=en`);
        const data = response.data.results;
        console.log(data);
        this.setState({ data: data });
        console.log(this.state.data);
        
    }

    render() {
        const { data } = this.state;
        return (
            <>
                <h1>movies: </h1>
                {data.map(item => {
                    console.log(item.title, item.release_date.split('-')[0]);
                    
                    return(
                    <div>
                        <span>{item.title} </span>
                        <span>{item.release_date.split('-')[0]}</span>
                        </div>
                        )
                })}
                {/* <div>{this.state.data}</div> */}
            </>
        )
    }
}