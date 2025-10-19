// src/shared/components/FilterSortBar.tsx
import React from "react";
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useTranslation } from "react-i18next";

export type SortKey = "created" | "title" | "completed";
export type SortDir = "asc" | "desc";

interface FilterSortBarProps {
    filterText?: string;
    onFilterTextChange?: (v: string) => void;
    filterCompleted?: "all" | "done" | "todo";
    onFilterCompletedChange?: (v: "all" | "done" | "todo") => void;
    sortKey?: SortKey;
    sortDir?: SortDir;
    onSortChange?: (k: SortKey, d: SortDir) => void;
}

const FilterSortBar: React.FC<FilterSortBarProps> = ({
                                                         filterText = "",
                                                         onFilterTextChange,
                                                         filterCompleted = "all",
                                                         onFilterCompletedChange,
                                                         sortKey = "created",
                                                         sortDir = "desc",
                                                         onSortChange,
                                                     }) => {
    const { t } = useTranslation();

    const handleSortKey = (e: React.ChangeEvent<{ value: unknown }>) => {
        const k = e.target.value as SortKey;
        onSortChange?.(k, sortDir);
    };

    const handleSortDir = (_: React.MouseEvent<HTMLElement>, v: SortDir | null) => {
        if (!v) return;
        onSortChange?.(sortKey, v);
    };

    return (
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
            <TextField
                size="small"
                label={t("filter.search", "Поиск")}
                value={filterText}
                onChange={(e) => onFilterTextChange?.(e.target.value)}
            />

            <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>{t("filter.status", "Статус")}</InputLabel>
                <Select
                    label={t("filter.status", "Статус")}
                    value={filterCompleted}
                    onChange={(e) => onFilterCompletedChange?.(e.target.value as any)}
                >
                    <MenuItem value="all">{t("filter.all", "Все")}</MenuItem>
                    <MenuItem value="todo">{t("filter.todo", "В процессе")}</MenuItem>
                    <MenuItem value="done">{t("filter.done", "Выполненные")}</MenuItem>
                </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>{t("sort.by", "Сортировать по")}</InputLabel>
                <Select label={t("sort.by", "Сортировать по")} value={sortKey} onChange={handleSortKey}>
                    <MenuItem value="created">{t("sort.created", "Дата")}</MenuItem>
                    <MenuItem value="title">{t("sort.title", "Заголовок")}</MenuItem>
                    <MenuItem value="completed">{t("sort.completed", "Статус")}</MenuItem>
                </Select>
            </FormControl>

            <ToggleButtonGroup size="small" value={sortDir} exclusive onChange={handleSortDir}>
                <ToggleButton value="asc">{t("sort.asc", "По возр.")}</ToggleButton>
                <ToggleButton value="desc">{t("sort.desc", "По убыв.")}</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};

export default FilterSortBar;
