import { allSettled, fork } from "effector";
import { DEFAULT_PLAN_DATA } from "../constants";
import {
  $originPlan,
  $plan,
  originPlan,
  originPlanFetched,
  originPlanReverted,
  plan,
  planNameChanged,
  planReverted,
} from "../index";

describe("model test", () => {
  it("test origin plan", async () => {
    const scope = fork(plan);
    const scope2 = fork(originPlan);

    await allSettled(originPlanReverted, { scope: scope2 });
    await allSettled(planReverted, { scope: scope });

    expect(scope2.getState($originPlan)).toEqual(DEFAULT_PLAN_DATA);
    expect(scope.getState($plan)).toEqual(DEFAULT_PLAN_DATA);
  });

  it("test plan", async () => {
    const scope = fork(originPlan);

    const params = { id: "test", name: "test" };

    await allSettled(originPlanFetched, { scope: scope, params: params });

    expect(scope.getState($originPlan)).toEqual(params);
  });

  it("test plan2", async () => {
    const scope = fork(originPlan);

    const params = { id: "originPlan", name: "originPlan" };

    await allSettled(originPlanFetched, { scope: scope, params: params });

    expect(scope.getState($originPlan)).toEqual(scope.getState($plan));
  });

  it("test plan3", async () => {
    const scope = fork(plan);
    const scope2 = fork(originPlan);

    await allSettled(planNameChanged, { scope: scope, params: "test123" });

    expect(scope2.getState($originPlan)).not.toEqual(scope.getState($plan));
  });
});
