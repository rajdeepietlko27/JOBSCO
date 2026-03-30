import { Fragment, useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { createJobApplicationAction } from "@/actions";

function CandidateJobCard({ jobItem, profileInfo, jobApplications }) {
  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);
  //   console.log(jobItem , "jobitem"  , profileInfo , "profile");
  console.log(jobApplications);

  async function handleJobApply(params) {
    await createJobApplicationAction(
      {
        recruiterUserID: jobItem?.recruiterId,
        name: profileInfo?.candidateInfo?.name,
        email: profileInfo?.email,
        candidateUserId: profileInfo?.userId,
        status: ["Applied"],
        jobId: jobItem?._id,
        jobApplicationDate: new Date().toLocaleDateString(),
      },
      "/jobs",
    );
    setShowJobDetailsDrawer(false);
  }

  return (
    <Fragment>
      <Drawer
        open={showJobDetailsDrawer}
        onOpenChange={setShowJobDetailsDrawer}
      >
        <CommonCard
          icon={<JobIcon />}
          title={jobItem?.title}
          description={jobItem?.companyName}
          footerContent={
            <DrawerTrigger asChild>
              <Button className="flex h-11 items-center justify-center px-5">
                View Details
              </Button>
            </DrawerTrigger>
          }
        />

        <DrawerContent className="p-0 overflow-hidden">
          {/* Gradient header band */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-8 pt-8 pb-6">
            <div className="max-w-4xl mx-auto">
              <DrawerHeader className="p-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-purple-200 text-sm font-medium uppercase tracking-widest mb-1">
                      {jobItem?.companyName}
                    </p>
                    <DrawerTitle className="text-4xl font-extrabold text-white">
                      {jobItem?.title}
                    </DrawerTitle>
                    <div className="flex items-center gap-2 mt-2 text-purple-100 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {jobItem?.location}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-1">
                    <Button
                      disabled={
                        jobApplications.findIndex(
                          (item) => item.jobId === jobItem?._id,
                        ) > -1
                          ? true
                          : false
                      }
                      className=" disabled:opacity-65  bg-white  text-purple-700 font-semibold hover:bg-purple-50 border-0 px-5 h-10 rounded-xl"
                      onClick={handleJobApply}
                    >
                      {jobApplications.findIndex(
                        (item) => item.jobId === jobItem?._id,
                      ) > -1
                        ? "Applied"
                        : "Apply"}
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-white border border-white/30 hover:bg-white/10 px-5 h-10 rounded-xl"
                      onClick={() => setShowJobDetailsDrawer(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DrawerHeader>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-6 bg-white">
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
              {/* Badges row */}
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-sm font-semibold px-4 py-1.5 rounded-full border border-indigo-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {jobItem?.type} Time
                </span>
                <span className="flex items-center gap-1.5 bg-purple-50 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full border border-purple-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  {jobItem?.experience} yrs Experience
                </span>
              </div>

              {/* Description */}
              {jobItem?.description && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                    About the Role
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {jobItem?.description}
                  </p>
                </div>
              )}

              {/* Skills */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                  Skills Required
                </h3>
                <div className="flex flex-wrap gap-2">
                  {jobItem?.skills.split(",").map((skill) => (
                    <span
                      key={skill}
                      className="bg-gray-950 text-white text-sm font-medium px-4 py-1.5 rounded-full"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}

export default CandidateJobCard;
