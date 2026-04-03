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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .jl-root {
          min-height: 100vh;
          background: #F7F6F2;
          font-family: 'DM Sans', sans-serif;
        }

        /* HERO */
        .jl-hero {
          background: #0D0D0D;
          padding: 52px 40px 60px;
          position: relative;
          overflow: hidden;
        }
        .jl-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
        .jl-hero-glow {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(29,158,117,0.12) 0%, transparent 70%);
          top: -120px; right: -60px;
          pointer-events: none;
        }
        .jl-hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .jl-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(29,158,117,0.15);
          border: 1px solid rgba(29,158,117,0.25);
          color: #5DCAA5;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 16px;
        }
        .jl-hero-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #5DCAA5;
        }
        .jl-hero h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 4.5vw, 50px);
          font-weight: 800;
          color: #fff;
          line-height: 1.08;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }
        .jl-hero-sub {
          color: #666;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.6;
        }
        .jl-hero-stats {
          display: flex;
          gap: 10px;
          margin-top: 28px;
          flex-wrap: wrap;
        }
        .jl-hero-stat {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 10px 18px;
        }
        .jl-hero-stat-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 2px;
        }
        .jl-hero-stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
        }

        /* FILTER / ACTION BAR */
        .jl-bar {
          background: #fff;
          border-bottom: 1px solid #eae7df;
        }
        .jl-bar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
          gap: 16px;
        }
        .jl-bar-label {
          font-size: 13px;
          color: #999;
          font-weight: 400;
        }
        .jl-bar-label strong {
          color: #111;
          font-weight: 600;
        }

        /* Override Menubar to match design */
        .jl-bar [data-radix-menubar-root] {
          background: transparent !important;
          border: none !important;
          gap: 4px !important;
        }
        .jl-bar [data-radix-menubar-trigger] {
          background: #F7F6F2 !important;
          border: 1px solid #eae7df !important;
          border-radius: 8px !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          color: #333 !important;
          padding: 6px 14px !important;
          transition: background 0.15s !important;
        }
        .jl-bar [data-radix-menubar-trigger]:hover,
        .jl-bar [data-radix-menubar-trigger][data-state="open"] {
          background: #111 !important;
          color: #fff !important;
          border-color: #111 !important;
        }

        /* Post job button override */
        .jl-post-btn button,
        .jl-post-btn [role="button"] {
          background: #1D9E75 !important;
          color: #fff !important;
          border: none !important;
          border-radius: 10px !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          padding: 8px 20px !important;
          cursor: pointer !important;
          transition: background 0.2s !important;
          white-space: nowrap !important;
        }
        .jl-post-btn button:hover,
        .jl-post-btn [role="button"]:hover {
          background: #0F6E56 !important;
        }

        /* BODY */
        .jl-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 36px 40px 80px;
        }

        /* EMPTY STATE */
        .jl-empty {
          text-align: center;
          padding: 80px 20px;
        }
        .jl-empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.3;
        }
        .jl-empty h3 {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #111;
          margin-bottom: 8px;
        }
        .jl-empty p {
          font-size: 14px;
          color: #999;
        }

        /* JOB CARDS GRID */
        .jl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        /* Card wrapper to inject styles into CommonCard children */
        .jl-card-wrap > div {
          background: #fff !important;
          border-radius: 16px !important;
          border: 1.5px solid #eae7df !important;
          transition: transform 0.2s, box-shadow 0.2s !important;
          overflow: hidden !important;
        }
        .jl-card-wrap > div:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 16px 36px rgba(0,0,0,0.08) !important;
          border-color: #1D9E75 !important;
        }

        /* buttons inside cards */
        .jl-card-wrap button {
          background: #0D0D0D !important;
          color: #fff !important;
          border: none !important;
          border-radius: 8px !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          padding: 8px 18px !important;
          transition: background 0.2s !important;
        }
        .jl-card-wrap button:hover:not(:disabled) {
          background: #1D9E75 !important;
        }
        .jl-card-wrap button:disabled {
          background: #e5e2da !important;
          color: #aaa !important;
          cursor: not-allowed !important;
        }

        @media (max-width: 640px) {
          .jl-hero { padding: 36px 20px 48px; }
          .jl-bar-inner { padding: 0 20px; }
          .jl-body { padding: 24px 16px 60px; }
          .jl-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="jl-root">
        {/* Dark Hero */}
        <div className="jl-hero">
          <div className="jl-hero-grid" />
          <div className="jl-hero-glow" />
          <div className="jl-hero-inner">
            <div>
              <div className="jl-hero-eyebrow">
                <div className="jl-hero-eyebrow-dot" />
                {isCandidate ? "Find Opportunities" : "Recruiter Dashboard"}
              </div>
              <h1>
                {isCandidate ? "Explore All Jobs" : "Jobs Dashboard"}
              </h1>
              <p className="jl-hero-sub">
                {isCandidate
                  ? "Browse and apply to the latest openings across top companies."
                  : "Manage your job postings and track applicants in one place."}
              </p>
              <div className="jl-hero-stats">
                <div className="jl-hero-stat">
                  <div className="jl-hero-stat-label">
                    {isCandidate ? "Open Roles" : "Posted Jobs"}
                  </div>
                  <div className="jl-hero-stat-value">{totalJobs}</div>
                </div>
                <div className="jl-hero-stat">
                  <div className="jl-hero-stat-label">
                    {isCandidate ? "Applied" : "Applications"}
                  </div>
                  <div className="jl-hero-stat-value">{totalApplications}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter / Action Bar */}
        <div className="jl-bar">
          <div className="jl-bar-inner">
            <p className="jl-bar-label">
              <strong>{totalJobs}</strong> {isCandidate ? "jobs found" : "active postings"}
            </p>
            <div className={isCandidate ? "" : "jl-post-btn"}>
              {isCandidate ? (
                <Menubar>
                  {filterMenus.map((filterMenu) => (
                    <MenubarMenu key={filterMenu.name}>
                      <MenubarTrigger>{filterMenu.name}</MenubarTrigger>
                      <MenubarContent>
                        {filterMenu.options.map((option, optionIdx) => (
                          <MenubarItem
                            key={optionIdx}
                            className="flex items-center"
                            onClick={() => handleFilter(filterMenu.id, option)}
                          >
                            <div
                              className={`h-4 w-4 border rounded border-gray-900 ${
                                filterParams[filterMenu.id]?.includes(option)
                                  ? "bg-black"
                                  : ""
                              }`}
                            />
                            <Label className="ml-3 cursor-pointer text-sm text-gray-600">
                              {option}
                            </Label>
                          </MenubarItem>
                        ))}
                      </MenubarContent>
                    </MenubarMenu>
                  ))}
                </Menubar>
              ) : (
                <PostNewJobs
                  jobList={jobList}
                  user={user}
                  profileInfo={profileInfo}
                />
              )}
            </div>
          </div>
        </div>

        {/* Job Cards */}
        <div className="jl-body">
          {jobList && jobList.length > 0 ? (
            <div className="jl-grid">
              {jobList.map((jobItem) => (
                <div className="jl-card-wrap" key={jobItem._id}>
                  {isCandidate ? (
                    <CandidateJobCard
                      profileInfo={profileInfo}
                      jobItem={jobItem}
                      jobApplications={jobApplications}
                    />
                  ) : (
                    <RecruiterJobCard
                      profileInfo={profileInfo}
                      jobItem={jobItem}
                      jobApplications={jobApplications}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="jl-empty">
              <div className="jl-empty-icon">📋</div>
              <h3>No jobs found</h3>
              <p>
                {isCandidate
                  ? "Try adjusting your filters or check back later."
                  : "Post your first job to start finding great candidates."}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default JobListing;