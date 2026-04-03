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
  const hasUpdated = useRef(false);

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

    const planType = fetchCurrentPlanFromSessionStorage?.type;
    const yearsToAdd = planType === "basic" ? 1 : planType === "teams" ? 2 : 5;

    const endDate = new Date(
      new Date().getFullYear() + yearsToAdd,
      new Date().getMonth(),
      new Date().getDate(),
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

    sessionStorage.removeItem("currentPlan");
    window.history.replaceState({}, "", "/membership");
  }

  useEffect(() => {
    if (pathName.get("status") === "success" && !hasUpdated.current) {
      hasUpdated.current = true;
      updateProfile();
    }
  }, [pathName]);

  const currentPlanIndex = membershipPlans.findIndex(
    (p) => p.type === profileInfo?.memberShipType,
  );

  const planColors = ["#1a1a2e", "#16213e", "#0f3460"];
  const planAccents = ["#e94560", "#6c47ff", "#1D9E75"];
  const planBadges = ["Starter", "Most Popular", "Enterprise"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .mem-root {
          min-height: 100vh;
          background: #F7F6F2;
          font-family: 'DM Sans', sans-serif;
        }

        /* HERO */
        .mem-hero {
          background: #0D0D0D;
          padding: 64px 40px 72px;
          position: relative;
          overflow: hidden;
        }
        .mem-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
        .mem-hero-glow {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(108,71,255,0.15) 0%, transparent 70%);
          top: -150px; right: -100px;
          pointer-events: none;
        }
        .mem-hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .mem-hero-left {}
        .mem-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(108,71,255,0.15);
          border: 1px solid rgba(108,71,255,0.3);
          color: #a78bfa;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 20px;
        }
        .mem-hero-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #a78bfa;
        }
        .mem-hero h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(34px, 5vw, 52px);
          font-weight: 800;
          color: #fff;
          line-height: 1.08;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }
        .mem-hero h1 span {
          color: #a78bfa;
        }
        .mem-hero-sub {
          color: #666;
          font-size: 15px;
          font-weight: 300;
          max-width: 440px;
          line-height: 1.65;
        }
        .mem-current-badge {
          background: rgba(108,71,255,0.12);
          border: 1px solid rgba(108,71,255,0.25);
          border-radius: 14px;
          padding: 14px 22px;
          text-align: center;
          white-space: nowrap;
        }
        .mem-current-badge .badge-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #666;
          margin-bottom: 4px;
        }
        .mem-current-badge .badge-value {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #a78bfa;
        }

        /* BODY */
        .mem-body {
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 40px 80px;
        }

        /* PLAN CARDS GRID */
        .mem-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        /* PLAN CARD */
        .mem-plan-card {
          background: #fff;
          border-radius: 20px;
          border: 1.5px solid #eae7df;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
          transition: transform 0.2s, box-shadow 0.2s;
          overflow: hidden;
        }
        .mem-plan-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .mem-plan-card.is-active {
          border-color: #6c47ff;
          box-shadow: 0 0 0 3px rgba(108,71,255,0.1);
        }
        .mem-plan-card-stripe {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          border-radius: 20px 20px 0 0;
        }

        .mem-plan-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .mem-plan-badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .mem-plan-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }

        .mem-plan-price {
          font-family: 'Syne', sans-serif;
          font-size: 42px;
          font-weight: 800;
          color: #0D0D0D;
          line-height: 1;
          margin-bottom: 4px;
          letter-spacing: -0.02em;
        }
        .mem-plan-price sup {
          font-size: 20px;
          font-weight: 600;
          vertical-align: super;
          letter-spacing: 0;
        }
        .mem-plan-period {
          font-size: 13px;
          color: #999;
          font-weight: 300;
          margin-bottom: 8px;
        }
        .mem-plan-type {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .mem-plan-divider {
          height: 1px;
          background: #f0ede6;
          margin-bottom: 24px;
        }

        /* features list */
        .mem-plan-features {
          list-style: none;
          padding: 0; margin: 0 0 28px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }
        .mem-plan-features li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #444;
          font-weight: 400;
        }
        .mem-plan-features li .feat-dot {
          width: 18px; height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          flex-shrink: 0;
          color: #fff;
          font-weight: 700;
        }

        /* CTA button */
        .mem-plan-cta {
          width: 100% !important;
          border-radius: 10px !important;
          padding: 13px 20px !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 14px !important;
          font-weight: 600 !important;
          letter-spacing: 0.02em !important;
          cursor: pointer !important;
          transition: opacity 0.2s, transform 0.1s !important;
          border: none !important;
          color: #fff !important;
        }
        .mem-plan-cta:hover {
          opacity: 0.88 !important;
          transform: translateY(-1px) !important;
        }
        .mem-plan-cta:active {
          transform: translateY(0) !important;
        }
        .mem-plan-cta-owned {
          width: 100%;
          border-radius: 10px;
          padding: 13px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          background: #f4f3ef;
          color: #999;
          border: 1.5px dashed #ddd;
          cursor: default;
        }

        /* PREMIUM BANNER */
        .mem-premium-banner {
          background: linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #1a0533 100%);
          border-radius: 16px;
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }
        .mem-premium-banner-left {}
        .mem-premium-banner-left h2 {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }
        .mem-premium-banner-left p {
          font-size: 13px;
          color: #a78bfa;
          font-weight: 300;
        }
        .mem-premium-star {
          font-size: 32px;
          filter: drop-shadow(0 0 12px rgba(167,139,250,0.6));
        }

        @media (max-width: 640px) {
          .mem-hero { padding: 40px 20px 52px; }
          .mem-body { padding: 28px 16px 60px; }
          .mem-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="mem-root">
        {/* Hero */}
        <div className="mem-hero">
          <div className="mem-hero-grid" />
          <div className="mem-hero-glow" />
          <div className="mem-hero-inner">
            <div className="mem-hero-left">
              <div className="mem-hero-eyebrow">
                <div className="mem-hero-eyebrow-dot" />
                Jobsco Premium
              </div>
              <h1>
                {profileInfo?.isPremiumUser ? (
                  <>You are a <span>Premium</span> User</>
                ) : (
                  <>Choose Your <span>Best Plan</span></>
                )}
              </h1>
              <p className="mem-hero-sub">
                {profileInfo?.isPremiumUser
                  ? "Enjoy all the benefits of your premium membership. Upgrade anytime."
                  : "Unlock powerful features to accelerate your career or find the best talent."}
              </p>
            </div>
            {profileInfo?.isPremiumUser && (
              <div className="mem-current-badge">
                <div className="badge-label">Active Plan</div>
                <div className="badge-value">
                  {membershipPlans.find(
                    (p) => p.type === profileInfo?.memberShipType,
                  )?.heading || "Premium"}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="mem-body">
          {/* Premium active banner */}
          {profileInfo?.isPremiumUser && (
            <div className="mem-premium-banner">
              <div className="mem-premium-banner-left">
                <h2>Welcome to Jobsco Premium</h2>
                <p>Your membership is active — enjoy all premium features below.</p>
              </div>
              <div className="mem-premium-star">★</div>
            </div>
          )}

          {/* Plan cards */}
          <div className="mem-grid">
            {membershipPlans.map((plan, index) => {
              const accent = planAccents[index] || "#6c47ff";
              const isOwned =
                profileInfo?.memberShipType === "enterprise" ||
                (profileInfo?.memberShipType === "basic" && index === 0) ||
                (profileInfo?.memberShipType === "teams" && index >= 0 && index < 2);
              const isActive = profileInfo?.memberShipType === plan.type;

              const featuresByPlan = [
                ["Post up to 5 jobs/month", "Basic candidate search", "Email support", "1 year access"],
                ["Post unlimited jobs", "Advanced candidate filters", "Priority support", "2 year access"],
                ["Everything in Teams", "Dedicated account manager", "API access", "5 year access"],
              ];
              const features = featuresByPlan[index] || [];

              return (
                <div
                  key={plan.price}
                  className={`mem-plan-card${isActive ? " is-active" : ""}`}
                >
                  {/* Top color stripe */}
                  <div
                    className="mem-plan-card-stripe"
                    style={{ background: accent }}
                  />

                  {/* Top row */}
                  <div className="mem-plan-top">
                    <div
                      className="mem-plan-icon"
                      style={{ background: accent + "18" }}
                    >
                      <JobIcon />
                    </div>
                    <div
                      className="mem-plan-badge"
                      style={{
                        background: accent + "18",
                        color: accent,
                      }}
                    >
                      {isActive ? "Current Plan" : planBadges[index]}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mem-plan-price">
                    <sup>$</sup>{plan.price}
                  </div>
                  <div className="mem-plan-period">per year</div>
                  <div
                    className="mem-plan-type"
                    style={{ color: accent }}
                  >
                    {plan.type}
                  </div>

                  <div className="mem-plan-divider" />

                  {/* Features */}
                  <ul className="mem-plan-features">
                    {features.map((feat) => (
                      <li key={feat}>
                        <span
                          className="feat-dot"
                          style={{ background: accent }}
                        >
                          ✓
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {isOwned ? (
                    <div className="mem-plan-cta-owned">
                      {isActive ? "✓ Current Plan" : "Already Included"}
                    </div>
                  ) : (
                    <Button
                      onClick={() => handlePayment(plan)}
                      className="mem-plan-cta"
                      style={{ background: accent }}
                    >
                      {profileInfo?.memberShipType === "basic" ||
                      profileInfo?.memberShipType === "teams"
                        ? "Upgrade Plan →"
                        : "Get Started →"}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberShip;