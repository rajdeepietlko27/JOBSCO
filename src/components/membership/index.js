"use client";

import { membershipPlans } from "@/utils";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import {
  createPriceIdAction,
  createStripePaymentAction,
  updateProfileAction,
} from "@/actions";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

function MemberShip({ profileInfo }) {
  const pathName = useSearchParams();
  const hasUpdated = useRef(false); // ✅ prevents infinite loop

  async function handlePayment(getCurrentPlan) {
    const stripe = await stripePromise;
    const extractPriceId = await createPriceIdAction({
      amount: Number(getCurrentPlan?.price),
    });

    if (extractPriceId) {
      sessionStorage.setItem("currentPlan", JSON.stringify(getCurrentPlan));
      const result = await createStripePaymentAction({
        lineItems: [
          {
            price: extractPriceId?.id,
            quantity: 1,
          },
        ],
      });

      if (result?.url) {
        window.location.href = result.url;
      }
    }
  }

  async function updateProfile() {
    const fetchCurrentPlanFromSessionStorage = JSON.parse(
      sessionStorage.getItem("currentPlan"),
    );

    // ✅ Fixed broken date calculation (operator precedence bug)
    const planType = fetchCurrentPlanFromSessionStorage?.type;
    const yearsToAdd = planType === "basic" ? 1 : planType === "teams" ? 2 : 5;

    const endDate = new Date(
      new Date().getFullYear() + yearsToAdd,
      new Date().getMonth(),
      new Date().getDate(), // ✅ getDate() not getDay()
    );

    await updateProfileAction(
      {
        ...profileInfo,
        isPremiumUser: true,
        memberShipType: planType,
        memberShipStartDate: new Date().toString(),
        memberShipEndDate: endDate.toString(),
      },
      "/membership",
    );

    // ✅ Clean up after update
    sessionStorage.removeItem("currentPlan");
    window.history.replaceState({}, "", "/membership");
  }

  useEffect(() => {
    // ✅ Only run once, not on every re-render
    if (pathName.get("status") === "success" && !hasUpdated.current) {
      hasUpdated.current = true;
      updateProfile();
    }
  }, [pathName]);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-baseline justify-between border-b pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950">
          {profileInfo?.isPremiumUser
            ? "You are a Premium User"
            : "Choose Your Best Plan"}
        </h1>
        <div>
          {profileInfo?.isPremiumUser ? (
            <Button className="flex h-11 items-center justify-center px-5">
              {
                membershipPlans.find(
                  (planItem) => planItem.type === profileInfo?.memberShipType,
                )?.heading
              }
            </Button>
          ) : null}
        </div>
      </div>
      <div className="py-20 pb-24 pt-6">
        <div className="container mx-auto p-0 space-y-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {membershipPlans.map((plan, index) => (
              <CommonCard
                key={plan.price}
                icon={
                  <div className="flex justify-between">
                    <div>
                      <JobIcon />
                    </div>
                    <h1 className="font-bold text-2xl">{plan.heading}</h1>
                  </div>
                }
                title={`$ ${plan.price} /yr`}
                description={plan.type}
                footerContent={
                  profileInfo?.memberShipType === "enterprise" ||
                  (profileInfo?.memberShipType === "basic" && index === 0) ||
                  (profileInfo?.memberShipType === "teams" && index >= 0 && index < 2)
                    ? null
                    : (
                      <Button
                        onClick={() => handlePayment(plan)}
                        className="flex h-11 items-center justify-center px-5"
                      >
                        {profileInfo?.memberShipType === "basic" ||
                        profileInfo?.memberShipType === "teams"
                          ? "Update Plan"
                          : "Get Premium"}
                      </Button>
                    )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberShip;