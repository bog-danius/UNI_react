import { Component } from "react";
import './About.css'

class About extends Component {
    render() {
        return (
            <section id="About" className="about">
                <h2 className="about__title">О нас</h2>
                <p className="about__text">
                    {this.props.about}
                </p>
            </section>
        )
    }
}

export default About;