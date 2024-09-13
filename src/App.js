import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/search";
import Detail from "./components/detail";
import { LanguageProvider } from "./languagecontext";
import "./App.css";

function App() {
    const [state, setState] = useState({
        s: "sherlock",
        results: [],
        originalResults: [],
        selected: {},
    });

const apiurl = "https://www.omdbapi.com/?apikey=a2526df0&s=";
    const searchTerm = "Batman";
    
    fetch(apiurl + searchTerm)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                const movies = data.Search;
                movies.forEach(movie => {
                    console.log(movie.Title);
                });
            } else {
                console.log(data.Error);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    useEffect(() => {
        axios(apiurl + "&s=" + state.s).then(({ data }) => {
            let results = data.Search;
            setState((prevState) => ({ ...prevState, results: results || [], originalResults: results || [] }));
        });
    }, [state.s]);

    const searchInput = (e) => {
        let s = e.target.value;
        setState((prevState) => ({ ...prevState, s: s }));
    };

    const search = (e) => {
        if (e.key === "Enter") {
            axios(apiurl + "&s=" + state.s).then(({ data }) => {
                let results = data.Search;
                setState((prevState) => ({ ...prevState, results: results || [] }));
            });
        }
    };

    const openDetail = (id) => {
        axios(apiurl + "&i=" + id).then(({ data }) => {
            let result = data;
            setState((prevState) => ({ ...prevState, selected: result }));
        });
    };

    const closeDetail = () => {
        setState((prevState) => ({ ...prevState, selected: {} }));
    };

    return (
        <LanguageProvider>
            <div className="App">
                <header className="App-header">
                    <h1>Welcome</h1>
                        <b> Millions of movies, TV shows and people to discover. Explore now.</b>
                </header>
                <main>
                    <Search searchInput={searchInput} search={search} />
                    <div className="container">
                        {state.results && state.results.map((e) => (
                            <div className="item" onClick={() => openDetail(e.imdbID)} key={e.imdbID}>
                                <img style={{ width: "250px" }} src={e.Poster} alt={e.Title} />
                                <h3 style={{ color: "white" }}>{e.Title}</h3>
                            </div>
                        ))}
                    </div>
                    {typeof state.selected.Title !== "undefined" ? (
                        <Detail selected={state.selected} closeDetail={closeDetail} />
                    ) : (
                        false
                    )}
                </main>
            </div>
        </LanguageProvider>
    );
}

export default App;