import React from "react";
import styles from "./Footer.module.css";

interface FooterProps {
    love?: string;
}

const Footer: React.FC<FooterProps> = ({love}) => {
    return (
        <footer className={styles.footer}>
            <p className={styles.love}>{love}</p>
        </footer>
    );
};

export default Footer;
