import React from "react";
import { useLanguage } from '../languagecontext'; 

function Detail({ selected, closeDetail }) {
    const { language } = useLanguage();
    
    const texts = {
        en: {
            title: selected.Title,
            year: `Year: ${selected.Year}`,
            rating: `Rating: ${selected.imdbRating}`,
            plot: selected.Plot,
        },
        ar: {
            title: selected.Title,
            year: `السنة: ${selected.Year}`,
            rating: `التقييم: ${selected.imdbRating}`,
            plot: selected.Plot,
        },
    };

    return (
        <section className="detail">
            <div className="content">
                <h2>{texts[language].title}</h2>
                <span>{texts[language].year}</span>
                <p className="rating">
                    {texts[language].rating}
                </p>

                <div className="about">
                    <img src={selected.Poster} alt={selected.Title} />

                    <p>{texts[language].plot}</p>
                </div>
                <button
                    className="close"
                    onClick={closeDetail}
                >
                    {language === "en" ? "Close" : "إغلاق"}
                </button>
            </div>
        </section>
    );
}

export default Detail;