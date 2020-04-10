import React from 'react';
import { TMDBAPI } from './api';

export default class Movies extends React.Component {
    state = {
        data: []
    }

    async componentDidMount() {
        const response = await TMDBAPI.get('movie?api_key=5dc629ddd638c7ad0b2708391cad5c5b&sort_by=release_date.desc');
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
                        <span>Title: {item.title}</span>
                        <span>Year: {item.release_date.split('-')[0]}</span>
                        </div>
                        )
                })}
                {/* <div>{this.state.data}</div> */}
            </>
        )
    }
}