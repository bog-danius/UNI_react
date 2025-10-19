import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                todoList: "ToDo List",
                add: "Add",
                delete: "Delete",
                edit: "Edit",
                save: "Save",
                cancel: "Cancel",
                filterPlaceholder: "Filter todos",
                loading: "Loading..."
            }
        },
        ru: {
            translation: {
                todoList: "Список задач",
                add: "Добавить",
                delete: "Удалить",
                edit: "Изменить",
                save: "Сохранить",
                cancel: "Отмена",
                filterPlaceholder: "Фильтр задач",
                loading: "Загрузка..."
            }
        }
    },
    lng: "ru",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

export default i18n;
