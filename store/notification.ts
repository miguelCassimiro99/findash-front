import { create } from "zustand";
import { produce } from "immer";

export type NotificationType = {
  type: "success" | "error";
  title: string;
  description: string;
};

interface IState {
  isNotificationOpen: boolean;
  notification: NotificationType | null;
}

interface IActions {
  setNotificationOpen: (open: boolean) => void;
  setNotification: (notification: NotificationType | null) => void;
  closeNotification: () => void;
}

interface IStore {
  state: IState;
  actions: IActions;
}

export const useStore = create<IStore>((set) => {
  const setState = (fn: any) => set(produce(fn) as (state: IStore) => IStore);

  return {
    state: {
      isNotificationOpen: false,
      notification: null,
    },
    actions: {
      setNotification: (notification: NotificationType | null) => {
        setState(({ state }: IStore) => {
          state.notification = notification;
        });
      },

      setNotificationOpen: (open: boolean) => {
        setState(({ state }: IStore) => {
          if (state.notification !== null && !state.isNotificationOpen) {
            state.isNotificationOpen = open;

            // setTimeout(() => {
            //   state.isNotificationOpen = false;
            //   state.notification = null;
            // }, 5000);
          }
        });
      },

      closeNotification: () => {
        setState(({ state }: IStore) => {
          state.isNotificationOpen = false;
          state.notification = null;
        });
      },
    },
  };
});
