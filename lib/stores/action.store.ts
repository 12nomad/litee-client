import { create } from "zustand";

export interface Action<T> {
  isOpen: boolean;
  isEdit: boolean;
  editData: T | null;
  modalId: string | null;
}

export interface ActionStore<T> {
  action: Action<T>;
  setAction: <T>(action: Action<T>) => void;
  resetAction: () => void;
}

export const ActionStorageKey = "action-storage";

export const useActionStore = create<ActionStore<unknown>>()((set) => ({
  action: {
    isOpen: false,
    isEdit: false,
    editData: null,
    modalId: null,
  },
  setAction: (action) =>
    set({
      action: {
        isOpen: action.isOpen,
        isEdit: action.isEdit,
        editData: action.editData,
        modalId: action.modalId,
      },
    }),
  resetAction: () =>
    set({
      action: {
        isOpen: false,
        isEdit: false,
        editData: null,
        modalId: null,
      },
    }),
}));
