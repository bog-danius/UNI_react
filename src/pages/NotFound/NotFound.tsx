import React from "react";
// @ts-ignore
import styles from "./NotFound.module.css";
import Button from "@shared/components/Button";


const NotFound: React.FC = () => {
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.code}>404</h1>
                <p className={styles.text}>Страница не найдена</p>
                <Button text="On Home" to="/"/>
            </div>
        </>
    );
};

export default NotFound;
