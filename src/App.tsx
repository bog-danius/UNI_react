// import React, { useState } from 'react';
// import Modal from "@shared/components/Modal";
import Header from '@widgets/Header';
import './App.css';
import type {INavItem} from "@type/nav.type.ts";
import type {IArticle} from "@type/nav.type.ts";
import logo from "@public/logo.png";
import Footer from "./widgets/Footer";
import Info from "@shared/blocks/Info";
import About from "@shared/blocks/About";

function App() {
    // const [isModalOpen, setIsModalOpen] = useState(false);

    const navItems: INavItem[] = [
        {id: "1", label: "Home", href: "#"},
        {id: "2", label: "About", href: "#"},
        {id: "3", label: "Contact", href: "#"}
    ];

    const article: IArticle[] = [
        {
            id: "1",
            title: "Web development",
            info: "We have developed data-driven applications mostly for web using advanced backend with PHP/Python/MySQL and rich frontend HTML/CSS/JavaScript.\n" +
                "\n" +
                "Advanced communication skilks: fluent English and Russian. Experience of team leading.\n" +
                "\n" +
                "Vast knowledge of: Databases, SQL, OPP, JS, Ajax, optimization, automated testing, usability,software design and development.",
            href: "about1.svg"
        },
        {
            id: "2",
            title: "Software development",
            info: "We offer wide range of software development services from creating tailor-made complex applications to programming a particular task according to your specifications.\n" +
                "\n" +
                "Our studio provides full product development lifecycle - starting from your business idea and up to providing support for the software products we create\n" +
                "\n" +
                "We have experience in optimization, DevOps, chat bot",
            href: "about2.svg"
        },
        {
            id: "3",
            title: "Illustrator",
            info: "Our talents include logo design, branding, design for print, social media, advertising and corporate identity. We are well-versed in the industry standard programs, specifically the Adobe Creative Suite.\n" +
                "\n" +
                "When working with us, you can expect original design that sets you apart from competitors, while capturing the essence of your business.\n" +
                "\n" +
                "Design Programs: Adobe illustrator | Adobe Photoshop | Adobe InDesign | Adobe PDF.",
            href: "about3.svg"
        },
    ];

    const love = "C любовью JenesiusGroup ❤️"
    return (
        <>
            <Header logo={logo} navItems={navItems}/>
            {/*<div>*/}
            {/*    <button onClick={() => setIsModalOpen(true)}>*/}
            {/*        Открыть модальное окно*/}
            {/*    </button>*/}

            {/*    <Modal*/}
            {/*        isOpen={isModalOpen}*/}
            {/*        onClose={() => setIsModalOpen(false)}*/}
            {/*        title="Пример модального окна"*/}
            {/*    >*/}
            {/*        <p>Содержимое модального окна!</p>*/}
            {/*        <button onClick={() => setIsModalOpen(false)}>*/}
            {/*            Закрыть*/}
            {/*        </button>*/}
            {/*    </Modal>*/}
            {/*</div>*/}

            <Info/>
            <About article={article}/>
            <Footer love={love}/>
        </>
    );
}

export default App;
