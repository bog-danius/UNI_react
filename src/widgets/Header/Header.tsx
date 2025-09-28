import React, {useState} from "react";
import { Link } from "react-router-dom";
// @ts-ignore
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
                {logo && (
                    <Link to="/">
                        <img src={logo} alt="logo" className={styles.logo} />
                    </Link>
                )}
            </div>

            <nav className={`${styles.nav} ${isMobileOpen ? styles.mobileOpen : ""}`}>
                <ul className={styles.navList}>
                    {navItems.map((item) => (
                        <li key={item.id} className={styles.navPoint}>
                            <Link to={item.to} className={styles.navLink}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <li className={styles.navPointMobile}>
                        <Button text="Login" to="/login"/>
                    </li>
                </ul>
            </nav>

            <div className={`${styles.burger} ${isMobileOpen ? styles.active : ""}`} onClick={toggleMobileMenu}>
                <span className={styles.burgerLine}></span>
                <span className={styles.burgerLine}></span>
                <span className={styles.burgerLine}></span>
            </div>

            <div className={styles.loginDesktop}>
                <Button text="Login" to="/login" />
            </div>
        </header>
    );
};

export default Header;
