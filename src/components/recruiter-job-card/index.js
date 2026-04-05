"use client";

import { useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import JobApplicants from "../job-applicants";

function RecruiterJobCard({ jobItem, jobApplications }) {
  const [showApplicationDrawer, setShowApplicationDrawer] = useState(false);
  const [currentCandidateetails, setCurrentCandidateDetails] = useState(null);
  const [
    showCurrentCandidateDetailsModel,
    setShowCurrentCandidateDetailsModel,
  ] = useState(false);

  const applicantCount = jobApplications.filter(
    (item) => item.jobId === jobItem._id
  ).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .rjc-card {
          background: #fff;
          border-radius: 16px;
          border: 1.5px solid #eae7df;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          font-family: 'DM Sans', sans-serif;
          height: 100%;
        }
        .rjc-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.08);
          border-color: #1D9E75;
        }

        .rjc-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .rjc-icon-wrap {
          width: 48px; height: 48px;
          background: #F0F9F5;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .rjc-count-badge {
          background: ${applicantCount > 0 ? "#F0F9F5" : "#F7F6F2"};
          color: ${applicantCount > 0 ? "#1D9E75" : "#aaa"};
          border: 1px solid ${applicantCount > 0 ? "#9FE1CB" : "#eae7df"};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 4px 10px;
          border-radius: 20px;
          white-space: nowrap;
        }

        .rjc-title {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #0D0D0D;
          line-height: 1.25;
          flex: 1;
        }

        .rjc-divider {
          height: 1px;
          background: #F0EDE6;
        }

        .rjc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .rjc-footer-label {
          font-size: 12px;
          color: #999;
          font-weight: 300;
        }
        .rjc-footer-label strong {
          color: #333;
          font-weight: 500;
        }

        .rjc-btn {
          background: #0D0D0D !important;
          color: #fff !important;
          border: none !important;
          border-radius: 8px !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          padding: 8px 18px !important;
          height: auto !important;
          transition: background 0.2s !important;
          white-space: nowrap !important;
        }
        .rjc-btn:hover:not(:disabled) {
          background: #1D9E75 !important;
        }
        .rjc-btn:disabled {
          background: #E5E2DA !important;
          color: #aaa !important;
          cursor: not-allowed !important;
          opacity: 1 !important;
        }
      `}</style>

      <div className="rjc-card">
    
        <div className="rjc-top">
          <div className="rjc-icon-wrap">
            <JobIcon />
          </div>
          <div
            className="rjc-count-badge"
            style={{
              background: applicantCount > 0 ? "#F0F9F5" : "#F7F6F2",
              color: applicantCount > 0 ? "#1D9E75" : "#aaa",
              border: `1px solid ${applicantCount > 0 ? "#9FE1CB" : "#eae7df"}`,
            }}
          >
            {applicantCount} {applicantCount === 1 ? "Applicant" : "Applicants"}
          </div>
        </div>

      
        <div className="rjc-title">{jobItem?.title}</div>

        <div className="rjc-divider" />

    
        <div className="rjc-footer">
          <p className="rjc-footer-label">
            {applicantCount > 0 ? (
              <><strong>{applicantCount}</strong> candidate{applicantCount !== 1 ? "s" : ""} applied</>
            ) : (
              "No applicants yet"
            )}
          </p>
          <Button
            disabled={applicantCount === 0}
            onClick={() => setShowApplicationDrawer(true)}
            className="rjc-btn"
          >
            View Applicants
          </Button>
        </div>
      </div>

      <JobApplicants
        showApplicationDrawer={showApplicationDrawer}
        setShowApplicationDrawer={setShowApplicationDrawer}
        showCurrentCandidateDetailsModel={showCurrentCandidateDetailsModel}
        setShowCurrentCandidateDetailsModel={setShowCurrentCandidateDetailsModel}
        currentCandidateetails={currentCandidateetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        jobItem={jobItem}
        jobApplications={jobApplications.filter(
          (jobApplicantItem) => jobApplicantItem.jobId === jobItem?._id,
        )}
      />
    </>
  );
}

export default RecruiterJobCard;