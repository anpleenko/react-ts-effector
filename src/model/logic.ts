import { combine, Store } from "effector";
import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";

/** https://github.com/effector/patronum/blob/main/src/or/index.ts */
export function or(...stores: Array<Store<boolean>>): Store<boolean> {
  return combine(stores, (values) => {
    for (const value of values) {
      if (value) return true;
    }

    return false;
  });
}

/** https://github.com/effector/patronum/blob/main/src/and/index.ts */
export function and(...stores: Array<Store<boolean>>): Store<boolean> {
  return combine(stores, (values) => {
    for (const value of values) {
      if (!value) return false;
    }

    return true;
  });
}

export function not(store: Store<boolean>): Store<boolean> {
  return store.map((value) => !value);
}

export function bool<T>(store: Store<T>): Store<boolean> {
  return store.map(Boolean);
}

export function isEmpty<T>(store: Store<T>): Store<boolean> {
  return store.map(_isEmpty);
}

export function isEqual<T, O>(a: Store<T>, b: Store<O>): Store<boolean> {
  return combine(a, b, _isEqual);
}

export function nand(...stores: Array<Store<boolean>>): Store<boolean> {
  return not(and(...stores));
}

export function nor(...stores: Array<Store<boolean>>): Store<boolean> {
  return not(or(...stores));
}

export function xor(...stores: Array<Store<boolean>>): Store<boolean> {
  return and(or(...stores), not(and(...stores)));
}

export function xnor(...stores: Array<Store<boolean>>): Store<boolean> {
  return not(xor(...stores));
}
