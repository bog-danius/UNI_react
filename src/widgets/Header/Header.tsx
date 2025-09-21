import React, {useState} from "react";
import styles from "./Header.module.css";
import {type INavItem} from "@type/nav.types";
import Button from "@shared/components/Button";

interface HeaderProps {
    logo?: string;
    navItems: INavItem[];
}

const Header: React.FC<HeaderProps> = ({logo, navItems = []}) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                {logo && <img src={logo} alt="logo" className={styles.logo}/>}
            </div>

            <nav className={`${styles.nav} ${isMobileOpen ? styles.mobileOpen : ""}`}>
                <ul className={styles.navList}>
                    {navItems.map((item) => (
                        <li key={item.id} className={styles.navPoint}>
                            <a href={item.href} className={styles.navLink}>
                                {item.label}
                            </a>
                        </li>
                    ))}
                    <li className={styles.navPointMobile}>
                        <Button text="Login" href="/login"/>
                    </li>
                </ul>
            </nav>

            <div className={`${styles.burger} ${isMobileOpen ? styles.active : ""}`} onClick={toggleMobileMenu}>
                <span className={styles.burgerLine}></span>
                <span className={styles.burgerLine}></span>
                <span className={styles.burgerLine}></span>
            </div>

            <div className={styles.loginDesktop}>
                <Button text="Login" href="/login"/>
            </div>
        </header>
    );
};

export default Header;
