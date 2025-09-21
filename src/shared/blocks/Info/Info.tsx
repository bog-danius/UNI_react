import React, {useState} from "react";
import styles from "./Info.module.css";
import emailjs from "emailjs-com";

const Info: React.FC = () => {
    const [text, setText] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text) return;

        const serviceID = "service_ga1j6vt";
        const templateID = "template_vxmn3pg";
        const userID = "Lm8CZP2cZI3Kh73Ik";

        emailjs.send(
            serviceID,
            templateID,
            {
                to_email: "jenesius1998@gmail.com",
                message: text
            },
            userID
        ).then(
            () => setStatus("Сообщение отправлено!"),
            (err) => setStatus("Ошибка при отправке: " + err.text)
        );

        setText("");
    };

    return (
        <section className={styles.info}>
            <h2 className={styles.title}>Jenesius</h2>
            <p className={styles.text}>
                Write us a message and we will contact you.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
                <textarea
                    placeholder="Введите ваше сообщение"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={styles.textarea}
                    required
                />
                <button type="submit" className={styles.button}>Отправить</button>
            </form>

            {status && <p className={styles.status}>{status}</p>}
        </section>
    );
};

export default Info;
