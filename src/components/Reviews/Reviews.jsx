import { Component } from "react";
import './Reviews.css'

class Reviews extends Component {
    render() {
        const reviews = [
            { name: "Богдан", text: "Очень довольна курсами!" },
            { name: "Коля", text: "Профессионально и доступно." },
            { name: "Никита", text: "Советую друзьям!" }
        ];
        return (
            <section id="Reviews" className="reviews">
                <h2 className="reviews__title">Отзывы</h2>
                <div className="reviews__list">
                    {reviews.map((review, index) => (
                        <div key={index} className="reviews__card">
                            <p className="reviews__text">“{review.text}”</p>
                            <span className="reviews__author">— {review.name}</span>
                        </div>
                    ))}
                </div>
            </section>
        )
    }
}

export default Reviews;
