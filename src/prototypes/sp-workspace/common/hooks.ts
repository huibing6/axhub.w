import { useState, useMemo } from 'react';

interface FilterValues {
  [key: string]: string;
}

export function useFilterData<T extends Record<string, any>>(
  data: T[],
  fields: { key: string; label: string }[]
) {
  const [filters, setFilters] = useState<FilterValues>({});

  const setFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters({});

  const filteredData = useMemo(() => {
    return data.filter(item => {
      return Object.entries(filters).every(([key, val]) => {
        if (!val || val === '全部') return true;
        const itemVal = String(item[key] ?? '').toLowerCase();
        return itemVal.includes(val.toLowerCase());
      });
    });
  }, [data, filters]);

  const hasFilters = Object.values(filters).some(v => v && v !== '全部');

  return { filters, setFilter, clearFilters, filteredData, hasFilters };
}
