import { createDomain, sample } from "effector";
import { DEFAULT_PLAN_DATA, DefaultPlanData } from "./constants";
import { isEqual } from "./logic";

export const originPlan = createDomain("originPlan");

export const originPlanFetched = originPlan.createEvent<DefaultPlanData>();

export const originPlanReverted = originPlan.createEvent();

export const $originPlan = originPlan
  .createStore(DEFAULT_PLAN_DATA)
  .reset(originPlanReverted);

/** ====== */

export const plan = createDomain("plan");

export const planNameChanged = plan.createEvent<string>("planNameChanged");

export const planReverted = plan.createEvent();

export const $plan = plan.createStore(DEFAULT_PLAN_DATA).reset(planReverted);

export const $isPlanChanged = isEqual($originPlan, $plan);

sample({ clock: $originPlan, target: $plan });

sample({ clock: originPlanFetched, target: $originPlan });

sample({
  clock: planNameChanged,
  source: $plan,
  fn: (plan, name) => ({ ...plan, name }),
  target: $plan,
});

planNameChanged("asdkahsdkjh");
