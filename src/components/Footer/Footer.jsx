import {Component} from "react";
import './Footer.css'

class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <p className='footer__text'>{this.props.love}</p>
                <p className='footer__text'>❤️</p>
            </footer>
        )
    }
}

export default Footer;