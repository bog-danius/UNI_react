import { Component } from "react";
import './Catalog.css'

class Catalog extends Component {
    render() {
        const products = ["Курс по React", "Курс по Vue", "Курс по Дизайну"];
        return (
            <section id="Catalog" className="catalog">
                <h2 className="catalog__title">Каталог</h2>
                <ul className="catalog__list">
                    {products.map((item, index) => (
                        <li key={index} className="catalog__item">{item}</li>
                    ))}
                </ul>
            </section>
        )
    }
}

export default Catalog;
