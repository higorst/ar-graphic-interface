import { useStore } from "effector-react";

import store from "./store";
import * as actions from "./actions";

export function useQueue() {
  const { queue } = useStore(store);

  return {
    queue,
    ...actions,
  };
}

export function useTraining() {
  const { done } = useStore(store);

  return {
    done,
    ...actions,
  };
}
