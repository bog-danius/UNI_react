import React, { useState, useEffect } from "react";
import {
    Box,
    Card,
    Typography,
    Button,
    LinearProgress,
    Radio,
    RadioGroup,
    FormControlLabel,
    ThemeProvider,
    createTheme,
    CircularProgress,
    TextField,
} from "@mui/material";
import { AccessTime, HelpOutline, BarChart } from "@mui/icons-material";

const theme = createTheme({
    palette: {
        background: { default: "#2c2c2c", paper: "#2c2c2c" },
        text: { primary: "#fff", secondary: "#8f8e8e" },
        primary: { main: "#00bcd4" },
        secondary: { main: "#0097a7" },
    },
    typography: { fontFamily: "Inter, sans-serif" },
});

interface Question {
    id: number;
    question: string;
    options: string[];
    correct: number;
    category: string;
    hint?: string;
}

const questions: Question[] = [
    { id: 1, question: "Столица Франции?", options: ["Берлин", "Париж", "Рим", "Мадрид"], correct: 1, category: "География", hint: "Город любви 💙" },
    { id: 2, question: "Самая большая планета?", options: ["Земля", "Марс", "Юпитер", "Венера"], correct: 2, category: "Астрономия", hint: "Газовый гигант" },
    { id: 3, question: "Сколько континентов на Земле?", options: ["5", "6", "7", "8"], correct: 2, category: "География" },
    { id: 4, question: "Кто написал 'Война и мир'?", options: ["Пушкин", "Толстой", "Достоевский", "Гоголь"], correct: 1, category: "Литература" },
    { id: 5, question: "Химический символ воды?", options: ["H2O", "O2", "CO2", "H2"], correct: 0, category: "Химия" },
    { id: 6, question: "Какой океан самый большой?", options: ["Атлантический", "Тихий", "Индийский", "Северный"], correct: 1, category: "География" },
    { id: 7, question: "Какая планета ближе всего к Солнцу?", options: ["Меркурий", "Земля", "Венера", "Марс"], correct: 0, category: "Астрономия" },
    { id: 8, question: "Сколько будет 9 × 9?", options: ["81", "72", "99", "90"], correct: 0, category: "Математика" },
    { id: 9, question: "Какой цвет получается при смешении синего и жёлтого?", options: ["Фиолетовый", "Зелёный", "Оранжевый", "Коричневый"], correct: 1, category: "Искусство" },
    { id: 10, question: "Сколько секунд в минуте?", options: ["60", "100", "120", "80"], correct: 0, category: "Общие знания" },
    { id: 11, question: "Кто основал Microsoft?", options: ["Стив Джобс", "Билл Гейтс", "Марк Цукерберг", "Илон Маск"], correct: 1, category: "Технологии" },
    { id: 12, question: "Какой язык используется в React?", options: ["Python", "C++", "JavaScript", "PHP"], correct: 2, category: "Технологии" },
    { id: 13, question: "Что означает HTTP?", options: ["HyperText Transfer Protocol", "HighText Transfer Protocol", "HyperText Test Program", "Home Tool Transfer Protocol"], correct: 0, category: "Технологии" },
    { id: 14, question: "Какое животное самое быстрое?", options: ["Гепард", "Лев", "Тигр", "Лошадь"], correct: 0, category: "Животные" },
    { id: 15, question: "Сколько дней в високосном году?", options: ["365", "366", "367", "364"], correct: 1, category: "Общие знания" },
];

const Material: React.FC = () => {
    const [step, setStep] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60); // 1 минута на вопрос
    const [setFeedback] = useState("");

    const current = questions[step];
    const progress = ((step + 1) / questions.length) * 100;

    useEffect(() => {
        if (step >= questions.length) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    handleNext();
                    return 60;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [step]);

    const handleNext = () => {
        if (selected === current.correct) setScore(score + 1);
        setSelected(null);
        setTimeLeft(60);
        if (step < questions.length - 1) setStep(step + 1);
        else setStep(questions.length);
    };

    const restart = () => {
        setStep(0);
        setScore(0);
        setSelected(null);
        setTimeLeft(60);
        // @ts-ignore
        setFeedback("");
    };

    const categories = Array.from(new Set(questions.map(q => q.category)));

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: "100vh", backgroundColor: "#2c2c2c", p: 3 }}>
                <Typography variant="h4" textAlign="center" color="#fff" mb={3}>
                    Онлайн-тест
                </Typography>

                <Card sx={{ p: 3, maxWidth: 800, mx: "auto", borderRadius: 3 }}>
                    {step < questions.length ? (
                        <>
                            {/* 1. Вопрос */}
                            <Typography variant="h6" mb={1}>
                                Вопрос {step + 1} из {questions.length}
                            </Typography>

                            {/* 2. Прогресс */}
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                                sx={{
                                    height: 8,
                                    borderRadius: 2,
                                    backgroundColor: "#8f8e8e",
                                    "& .MuiLinearProgress-bar": { backgroundColor: "#00bcd4" },
                                    mb: 2,
                                }}
                            />

                            {/* 3. Текст вопроса */}
                            <Typography variant="h5" color="#fff" mb={2}>
                                {current.question}
                            </Typography>

                            {/* 4. Варианты ответов */}
                            <RadioGroup
                                value={selected !== null ? selected : ""}
                                onChange={(e) => setSelected(Number(e.target.value))}
                            >
                                {current.options.map((opt, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={index}
                                        control={<Radio sx={{ color: "#00bcd4" }} />}
                                        label={opt}
                                        sx={{
                                            color: "#fff",
                                            border: "1px solid #0097a7",
                                            borderRadius: 2,
                                            px: 2,
                                            py: 1,
                                            mb: 1,
                                            "&:hover": { backgroundColor: "#0097a733" },
                                        }}
                                    />
                                ))}
                            </RadioGroup>

                            {/* 5. Подсказка */}
                            {current.hint && (
                                <Box display="flex" alignItems="center" mt={1}>
                                    <HelpOutline sx={{ color: "#00bcd4", mr: 1 }} />
                                    <Typography variant="body2" color="#8f8e8e">
                                        {current.hint}
                                    </Typography>
                                </Box>
                            )}

                            {/* 6. Таймер */}
                            <Box display="flex" alignItems="center" mt={2}>
                                <AccessTime sx={{ color: "#00bcd4", mr: 1 }} />
                                <Typography color="#fff">Осталось: {timeLeft} сек</Typography>
                            </Box>

                            {/* 7. Кнопка Далее */}
                            <Box display="flex" justifyContent="flex-end" mt={3}>
                                <Button
                                    variant="contained"
                                    disabled={selected === null}
                                    onClick={handleNext}
                                    sx={{
                                        backgroundColor: "#00bcd4",
                                        "&:hover": { backgroundColor: "#0097a7" },
                                    }}
                                >
                                    {step === questions.length - 1 ? "Завершить" : "Далее"}
                                </Button>
                            </Box>

                            {/* 8. Прогресс по категориям */}
                            <Box mt={3}>
                                {categories.map((cat, i) => {
                                    const total = questions.filter(q => q.category === cat).length;
                                    const answered = questions
                                        .slice(0, step + 1)
                                        .filter(q => q.category === cat).length;
                                    return (
                                        <Box key={i} mb={1}>
                                            <Typography variant="body2" color="#8f8e8e">{cat}</Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={(answered / total) * 100}
                                                sx={{
                                                    height: 6,
                                                    borderRadius: 2,
                                                    backgroundColor: "#3a3a3a",
                                                    "& .MuiLinearProgress-bar": { backgroundColor: "#0097a7" },
                                                }}
                                            />
                                        </Box>
                                    );
                                })}
                            </Box>
                        </>
                    ) : (
                        <>
                            {/* 9. Результат */}
                            <Box textAlign="center" py={4}>
                                <Typography variant="h4" color="#00bcd4" mb={2}>
                                    Тест завершён 🎉
                                </Typography>
                                <Typography variant="h6" color="#fff">
                                    Ваш результат: {score} из {questions.length}
                                </Typography>

                                {/* 10. Круговой прогресс */}
                                <Box my={2}>
                                    <CircularProgress
                                        variant="determinate"
                                        value={(score / questions.length) * 100}
                                        size={120}
                                        sx={{ color: "#00bcd4" }}
                                    />
                                    <Typography color="#8f8e8e" mt={1}>
                                        {((score / questions.length) * 100).toFixed(1)}%
                                    </Typography>
                                </Box>

                                {/* 11. Аналитика */}
                                <Box mt={2}>
                                    <Typography color="#fff">Правильных ответов: {score}</Typography>
                                    <Typography color="#fff">Неправильных: {questions.length - score}</Typography>
                                </Box>

                                {/* 12. Обратная связь */}
                                <Box mt={3}>
                                    <TextField
                                        fullWidth
                                        placeholder="Оставьте отзыв о тесте"
                                        multiline
                                        rows={3}
                                        sx={{
                                            input: { color: "#fff" },
                                            textarea: { color: "#fff" },
                                            backgroundColor: "#3a3a3a",
                                            borderRadius: 2,
                                        }}
                                    />
                                </Box>

                                {/* 13. Кнопка повторного прохождения */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={restart}
                                    sx={{ mt: 3, backgroundColor: "#00bcd4", "&:hover": { backgroundColor: "#0097a7" } }}
                                >
                                    Пройти снова
                                </Button>

                                {/* 14. Статистика категорий */}
                                <Box mt={3}>
                                    {categories.map((cat, i) => {
                                        const total = questions.filter(q => q.category === cat).length;
                                        const correct = questions
                                            .filter((q, idx) => idx < questions.length && q.category === cat)
                                            // @ts-ignore
                                            .filter((q, idx) => idx < score).length;
                                        return (
                                            <Box key={i} mb={1}>
                                                <Typography color="#8f8e8e">{cat}: {correct}/{total}</Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={(correct / total) * 100}
                                                    sx={{
                                                        height: 6,
                                                        borderRadius: 2,
                                                        backgroundColor: "#3a3a3a",
                                                        "& .MuiLinearProgress-bar": { backgroundColor: "#0097a7" },
                                                    }}
                                                />
                                            </Box>
                                        );
                                    })}
                                </Box>

                                {/* 15. Общий рейтинг */}
                                <Box mt={3}>
                                    <Typography variant="body2" color="#8f8e8e">Ваше место среди пользователей: #5</Typography>
                                    <BarChart sx={{ color: "#00bcd4", fontSize: 40, mt: 1 }} />
                                </Box>
                            </Box>
                        </>
                    )}
                </Card>
            </Box>
        </ThemeProvider>
    );
};

export default Material;
