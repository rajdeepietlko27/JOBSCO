"use client";

import PostNewJobs from "../post-new-job";
import RecruiterJobCard from "../recruiter-job-card";
import CandidateJobCard from "../candidate-job-card";
import { filterMenuDataArray, formUrlQuery } from "@/utils";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function JobListing({
  user,
  profileInfo,
  jobList,
  jobApplications,
  fetchFilterCategories,
}) {
  const [filterParams, setFilterParams] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("filterParams");
    if (!stored) return;
    const parsed = JSON.parse(stored);
    if (parsed && Object.keys(parsed).length > 0) {
      setFilterParams(parsed);
    }
  }, []);

  useEffect(() => {
    if (!filterParams || Object.keys(filterParams).length === 0) return;
    const url = formUrlQuery({
      params: searchParams.toString(),
      dataToAdd: filterParams,
    });
    router.push(url, { scroll: false });
  }, [filterParams]);

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilterParams = { ...filterParams };
    const indexOfCurrentSection =
      Object.keys(cpyFilterParams).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilterParams = {
        ...cpyFilterParams,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilterParams[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        cpyFilterParams[getSectionId] = [
          ...cpyFilterParams[getSectionId],
          getCurrentOption,
        ];
      } else {
        cpyFilterParams[getSectionId] = cpyFilterParams[getSectionId].filter(
          (_, i) => i !== indexOfCurrentOption
        );
      }
    }
    setFilterParams(cpyFilterParams);
    sessionStorage.setItem("filterParams", JSON.stringify(cpyFilterParams));
  }

  const filterMenus = filterMenuDataArray.map((item) => ({
    id: item.id,
    name: item.label,
    options: [
      ...new Set(fetchFilterCategories.map((listItem) => listItem[item.id])),
    ],
  }));

  const isCandidate = profileInfo?.role === "candidate";
  const totalJobs = jobList?.length || 0;
  const totalApplications = jobApplications?.length || 0;

  return (
    <div
      className="min-h-screen"
      style={{ background: "#f7f6f2", fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      {/* ── Dark Hero ─────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden px-10 pt-14 pb-16"
        style={{ background: "#0d0d0d" }}
      >
        {/* subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 400, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle,rgba(29,158,117,0.12) 0%,transparent 70%)",
            top: -120, right: -60,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* eyebrow pill */}
          <span
            className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-widest"
            style={{
              background: "rgba(29,158,117,0.15)",
              border: "1px solid rgba(29,158,117,0.25)",
              color: "#5DCAA5",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#5DCAA5]" />
            {isCandidate ? "Find Opportunities" : "Recruiter Dashboard"}
          </span>

          <h1
            className="text-white mb-2"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(32px, 4.5vw, 50px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
            }}
          >
            {isCandidate ? "Explore All Jobs" : "Jobs Dashboard"}
          </h1>
          <p className="text-[14px] font-light mb-7" style={{ color: "#666" }}>
            {isCandidate
              ? "Browse and apply to the latest openings across top companies."
              : "Manage your job postings and track applicants in one place."}
          </p>

          {/* stat chips */}
          <div className="flex gap-2.5 flex-wrap">
            {[
              {
                label: isCandidate ? "Open Roles" : "Posted Jobs",
                value: totalJobs,
              },
              {
                label: isCandidate ? "Applied" : "Applications",
                value: totalApplications,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl px-4 py-2.5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest mb-0.5"
                  style={{ color: "#555" }}
                >
                  {s.label}
                </p>
                <p
                  className="text-white text-[22px] font-bold leading-none"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filter / Action Bar ───────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-20 bg-white"
        style={{ borderBottom: "1px solid #eae7df" }}
      >
        <div className="max-w-7xl mx-auto px-10 flex items-center justify-between h-[60px] gap-4">
          <p className="text-[13px]" style={{ color: "#999" }}>
            <strong className="text-gray-900 font-semibold">{totalJobs}</strong>{" "}
            {isCandidate ? "jobs found" : "active postings"}
          </p>

          {isCandidate ? (
            /* Filter menus */
            <Menubar className="border-0 bg-transparent p-0 gap-1 h-auto">
              {filterMenus.map((filterMenu) => (
                <MenubarMenu key={filterMenu.name}>
                  <MenubarTrigger
                    className="rounded-lg text-[13px] font-medium px-3.5 py-1.5 cursor-pointer transition-all
                      data-[state=open]:bg-gray-900 data-[state=open]:text-white
                      hover:bg-gray-900 hover:text-white"
                    style={{
                      background: "#f7f6f2",
                      border: "1px solid #eae7df",
                      color: "#333",
                    }}
                  >
                    {filterMenu.name}
                  </MenubarTrigger>
                  <MenubarContent className="rounded-xl border border-gray-100 shadow-xl p-1.5">
                    {filterMenu.options.map((option, optionIdx) => (
                      <MenubarItem
                        key={optionIdx}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 text-[13px] text-gray-600"
                        onClick={() => handleFilter(filterMenu.id, option)}
                      >
                        <div
                          className={`h-4 w-4 rounded border flex items-center justify-center transition-all ${
                            filterParams[filterMenu.id]?.includes(option)
                              ? "bg-gray-900 border-gray-900"
                              : "border-gray-300"
                          }`}
                        >
                          {filterParams[filterMenu.id]?.includes(option) && (
                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <Label className="cursor-pointer">{option}</Label>
                      </MenubarItem>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
              ))}
            </Menubar>
          ) : (
            /* Post Job button */
            <div className="[&_button]:!bg-[#1D9E75] [&_button]:!text-white [&_button]:!border-0 [&_button]:!rounded-xl [&_button]:!font-semibold [&_button]:!text-[13px] [&_button]:!px-5 [&_button]:!py-2.5 [&_button:hover]:!bg-[#0F6E56]">
              <PostNewJobs
                jobList={jobList}
                user={user}
                profileInfo={profileInfo}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Job Cards Grid ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-10 py-9 pb-20">
        {jobList && jobList.length > 0 ? (
          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
          >
            {jobList.map((jobItem, index) =>
              isCandidate ? (
                <CandidateJobCard
                  key={jobItem._id}
                  profileInfo={profileInfo}
                  jobItem={jobItem}
                  jobApplications={jobApplications}
                  index={index}
                />
              ) : (
                <RecruiterJobCard
                  key={jobItem._id}
                  profileInfo={profileInfo}
                  jobItem={jobItem}
                  jobApplications={jobApplications}
                />
              )
            )}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-20">
            <p className="text-5xl mb-4 opacity-30">📋</p>
            <h3
              className="text-[20px] font-bold text-gray-900 mb-2"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              No jobs found
            </h3>
            <p className="text-[14px] text-gray-400">
              {isCandidate
                ? "Try adjusting your filters or check back later."
                : "Post your first job to start finding great candidates."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobListing;