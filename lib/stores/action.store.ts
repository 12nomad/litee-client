import { create } from "zustand";

interface Action {
  isOpen: boolean;
  isEdit: boolean;
  editId: number | null;
}

interface ActionStore {
  action: Action;
  setAction: (action: Action) => void;
  resetAction: () => void;
}

export const ActionStorageKey = "action-storage";

export const useActionStore = create<ActionStore>()((set) => ({
  action: {
    isOpen: false,
    isEdit: false,
    editId: null,
  },
  setAction: (action) =>
    set({
      action: {
        isOpen: action.isOpen,
        isEdit: action.isEdit,
        editId: action.editId,
      },
    }),
  resetAction: () =>
    set({ action: { isOpen: false, isEdit: false, editId: null } }),
}));
