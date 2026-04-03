"use client";

import {
  candidateOnboardFormControls,
  initialCaandidateFormDta,
  initialRecruiterFormData,
  recruiterOnBoardFormControls,
} from "@/utils";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { deleteRecruiterAction, updateProfileAction } from "@/actions";
import { useRouter } from "next/navigation";

function AccountInfo({ profileInfo }) {
  const [candidateFormData, setcandidateFormData] = useState(initialCaandidateFormDta);
  const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
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
            recruiterInfo: { ...recruiterFormData },
          },
      "/account",
    );
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    const result = await deleteRecruiterAction(profileInfo?.userId, "/");
    if (result?.success) {
      router.push("/");
    } else {
      console.error("Delete failed:", result?.error);
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
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
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Role</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {profileInfo?.role || "Not set"}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Status</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {profileInfo?.isPremiumUser ? "Premium" : "Standard"}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Email</p>
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
                setFormData={isCandidate ? setcandidateFormData : setRecruiterFormData}
                buttonText={"Update Profile"}
              />
            </div>
          </div>

          {/* ✅ Danger Zone - only for recruiters */}
          {!isCandidate && (
            <div className="mx-6 mb-8 rounded-2xl border border-red-100 bg-red-50/50 p-5 sm:mx-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-red-700">Danger Zone</h3>
                  <p className="mt-1 text-xs text-red-500">
                    Deleting your account will permanently remove your profile,
                    all posted jobs, and all received applications.
                  </p>
                </div>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="shrink-0 rounded-xl border border-red-300 bg-white px-5 py-2 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ✅ Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Delete your account?</h3>
              <p className="mt-2 text-sm text-slate-500">
                This will permanently delete your recruiter profile, all jobs you posted,
                and all job applications. This action <span className="font-semibold text-red-600">cannot be undone</span>.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleting}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-700 disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Yes, delete everything"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default AccountInfo;