"use client";

import {
  candidateOnboardFormControls,
  initialCaandidateFormDta,
  initialRecruiterFormData,
  recruiterOnBoardFormControls,
} from "@/utils";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { updateProfileAction } from "@/actions";

function AccountInfo({ profileInfo }) {
  const [candidateFormData, setcandidateFormData] = useState(
    initialCaandidateFormDta,
  );
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData,
  );

  useEffect(() => {
    console.log("full profileInfo:", JSON.stringify(profileInfo));

    if (!profileInfo) return;

    if (profileInfo?.role === "recruiter") {
      setRecruiterFormData(profileInfo?.recruiterInfo || initialRecruiterFormData);
    } else {
      setcandidateFormData(profileInfo?.candidateInfo || initialCaandidateFormDta);
    }
  }, [profileInfo]);

  async function handleUpdateAccount() {
    await updateProfileAction(
      profileInfo?.role === "candidate"
        ? {
            _id: profileInfo?._id,
            userId: profileInfo?.userId,
            role: profileInfo?.role,
            email: profileInfo?.email,
            isPremiumUser: profileInfo?.isPremiumUser,
            memberShipType: profileInfo?.memberShipType,
            memberShipStartDate: profileInfo?.memberShipStartDate,
            memberShipEndDate: profileInfo?.memberShipEndDate,
            candidateInfo: {
              ...candidateFormData,
              resume: profileInfo?.candidateInfo?.resume,
            },
          }
        : {
            _id: profileInfo?._id,
            userId: profileInfo?.userId,
            role: profileInfo?.role,
            email: profileInfo?.email,
            isPremiumUser: profileInfo?.isPremiumUser,
            memberShipType: profileInfo?.memberShipType,
            memberShipStartDate: profileInfo?.memberShipStartDate,
            memberShipEndDate: profileInfo?.memberShipEndDate,
            recruiterInfo: {
              ...recruiterFormData,
            },
          },
      "/account",
    );
  }

  const isCandidate = profileInfo?.role === "candidate";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/60">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-3xl border border-white/70 bg-white/80 px-6 py-8 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-700">
                Account Management
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Account Details
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                Update your personal information, company details, and profile
                settings from one clean dashboard.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Role
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {profileInfo?.role || "Not set"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Status
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {profileInfo?.isPremiumUser ? "Premium" : "Standard"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Email
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                  {profileInfo?.email || "Not available"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main card */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  {isCandidate ? "Candidate Profile" : "Recruiter Profile"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Keep your profile up to date to improve your experience.
                </p>
              </div>

              <div
                className={`inline-flex w-fit items-center rounded-full px-4 py-1 text-sm font-semibold ${
                  isCandidate
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                    : "bg-violet-50 text-violet-700 ring-1 ring-violet-200"
                }`}
              >
                {isCandidate ? "Candidate" : "Recruiter"}
              </div>
            </div>
          </div>

          <div className="px-4 py-6 sm:px-8 sm:py-8">
            <div className="rounded-2xl bg-slate-50/70 p-4 ring-1 ring-slate-200/80 sm:p-6">
              <CommonForm
                action={handleUpdateAccount}
                formControls={
                  isCandidate
                    ? candidateOnboardFormControls.filter(
                        (formControl) => formControl.name !== "resume",
                      )
                    : recruiterOnBoardFormControls
                }
                formData={isCandidate ? candidateFormData : recruiterFormData}
                setFormData={
                  isCandidate ? setcandidateFormData : setRecruiterFormData
                }
                buttonText={"Update Profile"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;