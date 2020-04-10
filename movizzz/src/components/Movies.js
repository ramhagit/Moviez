import React from 'react';
import { TMDBAPI } from './api';
import { tmdbKey } from '../secrets';
import ShowList from './ShowList';

export default class Movies extends React.Component {
    state = {
        data: []
    }

    async componentDidMount() {
        const response = await TMDBAPI.get(`movie?api_key=${tmdbKey}&language=en-US&sort_by=release_date.desc&release_date.lte=2020-01-04&vote_average.gte=5.5`);
        const data = response.data.results;
        this.setState({ data: data });
    }

    render() {
        const { data } = this.state;
        return (
            <ShowList data={data} />
        )
    }
}