import React from "react";
import styles from "./About.module.css";
import type {IArticle} from "@type/nav.types";

interface AboutProps {
    article: IArticle[];
}

const About: React.FC<AboutProps> = ({article}) => {
    return (
        <section className={styles.about}>
            <ul className={styles.articleList}>
                {article.map((item) => (
                    <li key={item.id} className={styles.articleItem}>
                        <div>
                            <img src={item.href} alt={item.title} className={styles.articleImg}/>
                        </div>
                        <div className={styles.articleInfo}>
                            <h2 className={styles.articleTitle}>{item.title}</h2>
                            <p className={styles.articleText}>{item.info}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default About;
