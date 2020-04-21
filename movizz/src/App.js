import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import ItemDetail from './components/ItemDetail/ItemDetail';

const App = () => {
    return (
        <div className="page-container">
            <BrowserRouter>
                <>
                    <Route path='/' exact component={Home} />
                    <Route path='/movie/:id' exact component={(props) => <ItemDetail itemId={props.match.params.id} />} />
                </>
            </BrowserRouter>
        </div>
    );
};

export default App;
