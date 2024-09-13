import React from "react";
import "./search.css";
import { useLanguage } from '../languagecontext'; 

function Search({ searchInput, search }) {
    const { language } = useLanguage();
    
    const placeholderText = {
        en: "Search for a Movie...",
        ar: "ابحث عن فيلم...",
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder={placeholderText[language]} 
                className="search"
                onChange={searchInput}
                onKeyPress={search}
            />
        </div>
    );
}

export default Search;
