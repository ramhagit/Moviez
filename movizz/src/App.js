import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import ItemDetail from './components/ItemDetail/ItemDetail';
import Movies from './components/Movies/Movies';

const App = () => {
    return (
        <div className="page-container">
            <BrowserRouter>
                <Header />
                <div className="content-container">
                    <Route path='/' exact component={() => <Home />} />
                    <Route path='/page/:page_num' exact component={props => <Home pageNum={props.match.params.page_num} />} />
                    <Route path='/movie/:id' exact component={props => <ItemDetail itemId={props.match.params.id} />} />
                    <Route path='/movies' exact component={() => <Movies />} />
                    <Route path='/movies/:search_by/page/:page_num' exact component={props => <Movies searchBy={props.match.params.search_by} pageNum={props.match.params.page_num} />} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
