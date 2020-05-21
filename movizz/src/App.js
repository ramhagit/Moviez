import React, { useRef, useEffect  } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/MainPages/Home/Home';
import MovieDetail from './components/ItemDisplay/ItemDetail/MovieDetail';
import Movies from './components/MainPages/Movies/Movies';
import SearchResults from './components/MainPages/SearchResults/SearchResults';
import Footer from './components/Footer/Footer';
import TVShows from './components/MainPages/TVShows/TVShows';
import Attributes from './components/Attributes/Attributes';
import MoviesForActor from './components/MoviesForActor/MoviesForActor';

const App = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0,0);
        // containerRef.current.scrollTo(0,0);
    }, [])

    return (
        <div className="page-container" ref={containerRef}>
            <BrowserRouter>
                <Navbar />
                <div className="content-container">
                    <Route path='/' exact component={() => <Home />} />
                    <Route path='/page/:page_num' exact component={props => <Home pageNum={props.match.params.page_num} />} />
                    <Route path='/movie/:id' exact component={props => <MovieDetail itemId={props.match.params.id} />} />
                    <Route path='/movies/:search_by/page/:page_num' exact component={props => <Movies searchBy={props.match.params.search_by} pageNum={props.match.params.page_num} />} />
                    <Route path='/search/:search_query' exact component={props => <SearchResults searchQuery={props.match.params.search_query} />} />
                    <Route path='/search/:search_query/page/:page_num' exact component={props => <SearchResults searchQuery={props.match.params.search_query} pageNum={props.match.params.page_num} />} />
                    <Route path='/tv/' exact component={() => <TVShows />} />
                    <Route path='/attributes/' exact component={() => <Attributes />} />
                    <Route path='/movies_for_actor/:name' exact component={props => <MoviesForActor name={props.match.params.name} />} />
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
