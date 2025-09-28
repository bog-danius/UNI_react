import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@shared/components/Button';
// @ts-ignore
import styles from './ToDo.module.css';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    selected: boolean;
}

const API_URL = 'http://localhost:3001/todos';

const ToDo: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState('');
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await axios.get<Todo[]>(API_URL);
            setTodos(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addTodo = async () => {
        if (!newTodo.trim()) return;
        try {
            const res = await axios.post<Todo>(API_URL, {
                text: newTodo,
                completed: false,
                selected: false,
            });
            setTodos([...todos, res.data]);
            setNewTodo('');
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const deleteSelectedTodos = async () => {
        const selectedIds = todos.filter(t => t.selected).map(t => t.id);
        try {
            await Promise.all(selectedIds.map(id => axios.delete(`${API_URL}/${id}`)));
            setTodos(todos.filter(t => !t.selected));
        } catch (err) {
            console.error(err);
        }
    };

    const toggleSelect = (id: number) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, selected: !todo.selected } : todo
            )
        );
    };

    const startEditing = (todo: Todo) => {
        setEditingId(todo.id);
        setEditingText(todo.text);
    };

    const saveEditing = async (id: number) => {
        try {
            const updatedTodo = { ...todos.find(t => t.id === id)!, text: editingText };
            await axios.put(`${API_URL}/${id}`, updatedTodo);
            setTodos(todos.map(t => (t.id === id ? updatedTodo : t)));
            setEditingId(null);
            setEditingText('');
            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingText('');
        setShowModal(false);
    };
    useEffect(() => {
        // Если модалка открыта, запрещаем скролл
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);
    return (
        <div className={styles.todo}>
            <div className={styles.todoContainer}>
                <h1 className={styles.title}>ToDo List</h1>

                <div className={styles.inputGroup}>
                    <input
                        className={styles.input}
                        value={newTodo}
                        onChange={e => setNewTodo(e.target.value)}
                        placeholder="Добавить задачу"
                    />
                    <Button text="Добавить" onClick={addTodo} />
                    <Button
                        text="Удалить выбранные"
                        onClick={deleteSelectedTodos}
                        className={styles.deleteSelectedButton}
                    />
                </div>

                <ul className={styles.todoList}>
                    {todos.map(todo => (
                        <li
                            key={todo.id}
                            className={`${styles.todoItem} ${todo.selected ? styles.selected : ''}`}
                        >
                            {editingId === todo.id ? (
                                <div className={styles.editGroup}>
                                    <input
                                        className={styles.editInput}
                                        value={editingText}
                                        onChange={e => setEditingText(e.target.value)}
                                    />
                                    <Button text="Сохранить" onClick={() => setShowModal(true)} />
                                    <Button text="Отмена" onClick={cancelEditing} />
                                </div>
                            ) : (
                                <div
                                    className={styles.todoContent}
                                    onClick={() => toggleSelect(todo.id)}
                                >
                                    <span className={styles.todoText}>{todo.text}</span>
                                    <div className={styles.editGroup}>
                                        <Button
                                            text="Изменить"
                                            onClick={e => {
                                                e.stopPropagation();
                                                startEditing(todo);
                                            }}
                                        />
                                        <Button
                                            text="Удалить"
                                            onClick={e => {
                                                e.stopPropagation();
                                                deleteTodo(todo.id);
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <p>Вы точно хотите сохранить изменения?</p>
                        <div className={styles.modalButtons}>
                            <Button text="Да" onClick={() => saveEditing(editingId!)} />
                            <Button text="Отмена" onClick={() => setShowModal(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ToDo;
