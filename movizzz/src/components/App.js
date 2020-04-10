import React from 'react';
import Movies from './Movies';

const App = () => {
    // const response = TMDBAPI.get('&sort_by=release_date.desc');
    // const data = response.data;
    // console.log(data);
    
    return <>
        <div>App</div>
        <Movies />
    </>;
};

export default App;