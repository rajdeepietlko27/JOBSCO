"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import {
  candidateOnboardFormControls,
  initialCaandidateFormDta,
  initialRecruiterFormData,
  recruiterOnBoardFormControls,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supaBaseClient = createClient(
  "https://cydxaplwjbtfzurckrqc.supabase.co",
  "sb_publishable_Y89cVt1IkmIJbR8i0xbvrg_zj6EL7T5",
);

// ── Upload box ────────────────────────────────────────────────────────────────
function ResumeUpload({ onChange, fileName }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium uppercase tracking-widest text-gray-400">
        Resume
      </label>
      <label
        htmlFor="resume-upload"
        className="flex items-center gap-4 rounded-xl border border-dashed border-gray-200 bg-white px-5 py-5 cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50"
      >
        {/* Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
          <svg
            className="w-5 h-5 text-blue-600"
            viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="13" x2="12" y2="17" />
            <polyline points="9 16 12 13 15 16" />
          </svg>
        </div>
        {/* Text */}
        <div>
          <p className="text-sm font-medium text-gray-800">
            {fileName ? fileName : "Upload your resume"}
          </p>
          <span className="text-xs text-gray-400">PDF, DOC up to 10 MB</span>
        </div>
        <input
          id="resume-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={onChange}
        />
      </label>
    </div>
  );
}

// ── Role pill ─────────────────────────────────────────────────────────────────
function RolePill({ label, color = "blue" }) {
  const styles = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-700",
  };
  const dotStyles = {
    blue: "bg-blue-500",
    green: "bg-green-500",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${styles[color]} mb-5`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[color]}`} />
      {label}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
function OnBoard() {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFromData, setRecruiterFormData] = useState(initialRecruiterFormData);
  const [candidateFormData, setCandidateFormData] = useState(initialCaandidateFormDta);
  const [file, setFile] = useState(null);

  const { user } = useUser();

  function handleTabChange(value) {
    setCurrentTab(value);
  }

  function handleRecruiterFormValid() {
    return (
      recruiterFromData &&
      recruiterFromData.name.trim() !== "" &&
      recruiterFromData.companyName.trim() !== "" &&
      recruiterFromData.companyRole.trim() !== ""
    );
  }

  function handleCandidateFormValid() {
    return Object.keys(candidateFormData).every(
      (key) => candidateFormData[key].trim() !== "",
    );
  }

  function handleFileChange(event) {
    event.preventDefault();
    setFile(event.target.files[0]);
  }

  async function handleUpdatePdfToSupabase() {
    const { data, error } = await supaBaseClient.storage
      .from("job-board-public")
      .upload(`/public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (data) {
      setCandidateFormData({ ...candidateFormData, resume: data.path });
    }
  }

  useEffect(() => {
    if (file) handleUpdatePdfToSupabase();
  }, [file]);

  async function createProfile() {
    const data =
      currentTab === "candidate"
        ? {
            candidateInfo: candidateFormData,
            role: "candidate",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          }
        : {
            recruiterInfo: recruiterFromData,
            role: "recruiter",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          };
    await createProfileAction(data, "/onboard");
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "#f7f6f2", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl px-6">
          <div className="flex items-end justify-between border-b border-gray-200 pt-14 pb-5 mb-10">
            <h1
              className="text-[38px] font-bold tracking-tight leading-none text-gray-900"
              style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-1.2px" }}
            >
              Welcome to{" "}
              <span className="text-blue-600">onboarding</span>
            </h1>

            <TabsList className="flex gap-1 bg-[#eceae3] p-1 rounded-xl border-0 h-auto">
              <TabsTrigger
                value="candidate"
                className="px-5 py-2 rounded-lg text-[13px] capitalize font-normal text-gray-500 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:font-medium data-[state=active]:shadow-sm transition-all"
              >
                Candidate
              </TabsTrigger>
              <TabsTrigger
                value="recruiter"
                className="px-5 py-2 rounded-lg text-[13px] capitalize font-normal text-gray-500 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:font-medium data-[state=active]:shadow-sm transition-all"
              >
                Recruiter
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* ── Candidate Form ── */}
        <TabsContent value="candidate">
          <div className="mx-auto max-w-2xl px-6 pb-20">
            <RolePill label="Candidate profile" color="blue" />

            {/* Resume upload */}
            <div className="mb-4">
              <ResumeUpload
                onChange={handleFileChange}
                fileName={file?.name}
              />
            </div>

            {/* Rest of candidate fields via CommonForm */}
            <CommonForm
              formData={candidateFormData}
              setFormData={setCandidateFormData}
              formControls={candidateOnboardFormControls}
              handleFileChange={handleFileChange}
              isBtnDisabled={!handleCandidateFormValid()}
              action={createProfile}
              buttonText={null}
            />

            {/* Submit button */}
            <button
              onClick={createProfile}
              disabled={!handleCandidateFormValid()}
              className="mt-7 w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-4 text-[15px] font-semibold text-white transition-all hover:bg-blue-600 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Onboard as student
            </button>
          </div>
        </TabsContent>

        {/* ── Recruiter Form ── */}
        <TabsContent value="recruiter">
          <div className="mx-auto max-w-2xl px-6 pb-20">
            <RolePill label="Recruiter profile" color="green" />

            <CommonForm
              formControls={recruiterOnBoardFormControls}
              formData={recruiterFromData}
              setFormData={setRecruiterFormData}
              isBtnDisabled={!handleRecruiterFormValid()}
              action={createProfile}
              buttonText={null}
            />

            {/* Submit button */}
            <button
              onClick={createProfile}
              disabled={!handleRecruiterFormValid()}
              className="mt-7 w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-4 text-[15px] font-semibold text-white transition-all hover:bg-blue-600 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Onboard as recruiter
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default OnBoard;