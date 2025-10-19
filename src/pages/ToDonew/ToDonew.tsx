import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../i18n.ts';
// @ts-ignore
import { RootState, AppDispatch } from '@app/store';
import {
    fetchTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleSelect,
} from '@entities/slices/todosSlice';
import { openModal, closeModal, setEditingText, setFilterText } from '@entities/slices/uiSlice';
import Button from '@shared/components/Button';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import styles from './ToDonew.module.css';

const ToDonew: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list: todos, loading, error } = useSelector((state: RootState) => state.todos);
    const { showModal, editingId, editingText, filterText } = useSelector((state: RootState) => state.ui);

    const [newTodo, setNewTodo] = useState('');
    const [sortAZ, setSortAZ] = useState(true); // true = A→Z, false = Z→A
    const { t, i18n } = useTranslation();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleAdd = () => {
        if (!newTodo.trim()) return;
        dispatch(addTodo(newTodo));
        setNewTodo('');
    };

    const handleSaveEdit = () => {
        if (editingId !== null) {
            dispatch(updateTodo({ id: editingId, text: editingText }));
            dispatch(closeModal());
        }
    };

    const handleToggleSort = () => {
        setSortAZ(!sortAZ);
    };

    const handleToggleLang = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    // Фильтр и сортировка
    const filteredTodos = todos
        .filter(todo => todo.text.toLowerCase().includes(filterText.toLowerCase()))
        .sort((a, b) => sortAZ ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text));

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>{t('todoList')}</h1>
                <Button text={i18n.language === 'ru' ? 'EN' : 'RU'} onClick={handleToggleLang} />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.inputGroup}>
                <input
                    className={styles.input}
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                    placeholder={t('add')}
                />
                <Button text={t('add')} onClick={handleAdd} />
            </div>

            <div className={styles.filterGroup}>
                <input
                    className={styles.input}
                    placeholder={t('filterPlaceholder')}
                    value={filterText}
                    onChange={e => dispatch(setFilterText(e.target.value))}
                />
                <Button text={sortAZ ? 'A→Z' : 'Z→A'} onClick={handleToggleSort} />
            </div>

            {loading ? (
                <p>{t('loading')}</p>
            ) : (
                <ul className={styles.todoList}>
                    {filteredTodos.map(todo => (
                        <li
                            key={todo.id}
                            className={`${styles.todoItem} ${todo.selected ? styles.selected : ''}`}
                        >
                            <span
                                className={styles.todoText}
                                style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                                onClick={() => dispatch(toggleSelect(todo.id))}
                            >
                                {todo.text}
                            </span>
                            <div className={styles.todoButtons}>
                                <Button text={t('edit')} onClick={() => dispatch(openModal({ id: todo.id, text: todo.text }))} />
                                <Button text={t('delete')} onClick={() => dispatch(deleteTodo(todo.id))} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <input
                            className={styles.input}
                            value={editingText}
                            onChange={e => dispatch(setEditingText(e.target.value))}
                        />
                        <div className={styles.modalButtons}>
                            <Button text={t('save')} onClick={handleSaveEdit} />
                            <Button text={t('cancel')} onClick={() => dispatch(closeModal())} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ToDonew;
