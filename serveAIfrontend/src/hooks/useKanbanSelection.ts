import { useState } from "react";

export function useKanbanSelection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Toggle single checkbox
  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // Toggle Select All for a column
  const toggleSelectAll = (columnIds: string[]) => {
    const areAllSelected = columnIds.every((id) =>
      selectedIds.includes(id)
    );

    if (areAllSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !columnIds.includes(id))
      );
    } else {
      setSelectedIds((prev) => {
        const uniqueIds = new Set([...prev, ...columnIds]);
        return Array.from(uniqueIds);
      });
    }
  };

  // Check if one order is selected
  const isSelected = (id: string) => {
    return selectedIds.includes(id);
  };

  // Check if all orders of a column are selected
  const isAllSelected = (columnIds: string[]) => {
    return (
      columnIds.length > 0 &&
      columnIds.every((id) => selectedIds.includes(id))
    );
  };

  // Selected count of a column
  const getSelectedCount = (columnIds: string[]) => {
    return columnIds.filter((id) => selectedIds.includes(id)).length;
  };

  // Remove moved selections
  const clearSelection = (ids: string[]) => {
    setSelectedIds((prev) =>
      prev.filter((id) => !ids.includes(id))
    );
  };

  const hasSelection = (columnIds: string[]) => {
    return getSelectedCount(columnIds) > 0;
    };

    return {
    selectedIds,

    toggleSelection,

    toggleSelectAll,

    isSelected,

    isAllSelected,

    getSelectedCount,

    hasSelection,

    clearSelection,
    };
}


