import {Component} from "react";
import './Header.css'

class Header extends Component {
    render() {
        const {logo} = this.props
        return (
            <header className="header">
                <nav className="header-nav">
                    <div className="header-nav-block__logo">
                        <p className="header-nav-block-logo__text">{logo}</p>
                    </div>
                    <div className="header-nav-block__link">
                        <a href="#About" className="header-nav-block-link__a">О нас</a>
                        <a href="#Reviews" className="header-nav-block-link__a">Отзывы</a>
                        <a href="#Catalog" className="header-nav-block-link__a">Каталог</a>
                    </div>
                    <button className="header-nav-block__button">Регистрация</button>
                </nav>
            </header>
        )
    }
}


export default Header;