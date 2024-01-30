import { create } from "zustand";
import { produce } from "immer";

interface IState {
  formIndex: number;
}

interface IActions {
  setFormIndex: (idx: number) => void;
}

interface IStore {
  state: IState;
  actions: IActions;
}

export const useStore = create<IStore>((set) => {
  const setState = (fn: any) => set(produce(fn) as (state: IStore) => IStore);

  return {
    state: {
      formIndex: 1,
    },
    actions: {
      setFormIndex: (idx: number) => {
        setState(({ state }: IStore) => {
          state.formIndex = idx;
        });
      },
    },
  };
});
