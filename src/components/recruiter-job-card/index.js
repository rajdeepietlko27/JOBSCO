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

  return (
    <div>
      <CommonCard
        icon={<JobIcon />}
        title={jobItem?.title}
        footerContent={
          <Button
            disabled={
              jobApplications.filter((item) => item.jobId === jobItem._id)
                .length === 0
            }
            onClick={() => setShowApplicationDrawer(true)}
            className=" disabled:opacity-65  flex h-11 item-center justify-center px-5"
          >
            {
              jobApplications.filter((item) => item.jobId === jobItem._id)
                .length
            }{" "}
            Applicants
          </Button>
        }
      />
      <JobApplicants
        showApplicationDrawer={showApplicationDrawer}
        setShowApplicationDrawer={setShowApplicationDrawer}
        showCurrentCandidateDetailsModel={showCurrentCandidateDetailsModel}
        setShowCurrentCandidateDetailsModel={
          setShowCurrentCandidateDetailsModel
        }
        currentCandidateetails={currentCandidateetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        jobItem={jobItem}
        jobApplications={jobApplications.filter(
          (jobApplicantItem) => jobApplicantItem.jobId === jobItem?._id,
        )}
      />
    </div>
  );
}

export default RecruiterJobCard;
