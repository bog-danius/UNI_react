import { Component } from "react";
import './Hero.css'

class Hero extends Component {
    render() {
        return (
            <section className="hero">
                <h1 className="hero__title">Добро пожаловать в Jenesius</h1>
                <p className="hero__subtitle">Мы делаем ваш мир лучше ✨</p>
                <button className="hero__button">Узнать больше</button>
            </section>
        )
    }
}

export default Hero;
