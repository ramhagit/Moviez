import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/MainPages/Home/Home';
import ItemDetail from './components/ItemDisplay/ItemDetail/ItemDetail';
import Movies from './components/MainPages/Movies/Movies';
import SearchResults from './components/Navbar/Search/SearchResults';
import Footer from './components/Footer/Footer';

const App = () => {
    return (
        <div className="page-container">
            <BrowserRouter>
                <Navbar />
                <div className="content-container">
                    <Route path='/' exact component={() => <Home />} />
                    <Route path='/page/:page_num' exact component={props => <Home pageNum={props.match.params.page_num} />} />
                    <Route path='/movie/:id' exact component={props => <ItemDetail itemId={props.match.params.id} />} />
                    <Route path='/movies/:search_by/page/:page_num' exact component={props => <Movies searchBy={props.match.params.search_by} pageNum={props.match.params.page_num} />} />
                    <Route path='/search/:search_query' exact component={props => <SearchResults searchQuery={props.match.params.search_query} />} />
                    <Route path='/search/:search_query/page/:page_num' exact component={props => <SearchResults searchQuery={props.match.params.search_query} pageNum={props.match.params.page_num} />} />
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
