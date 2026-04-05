"use client";

import {
  getCandidateDetailsByAction,
  updateJobApplicationAction,
} from "@/actions";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { createClient } from "@supabase/supabase-js";

const { Fragment } = require("react");

const AVATAR_COLORS = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-rose-600",
  "from-pink-500 to-fuchsia-600",
];

function getColor(name = "") {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

const SupabaseClient = createClient(
  "https://cydxaplwjbtfzurckrqc.supabase.co",
  "sb_publishable_Y89cVt1IkmIJbR8i0xbvrg_zj6EL7T5",
);

function CandidateList({
  currentCandidateetails,
  setCurrentCandidateDetails,
  jobApplications,
  showCurrentCandidateDetailsModel,
  setShowCurrentCandidateDetailsModel,
}) {
  async function handleFetchCandidateDetails(getCurrentCandidateId) {
    const data = await getCandidateDetailsByAction(getCurrentCandidateId);
    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModel(true);
    }
  }

  const info = currentCandidateetails?.candidateInfo;

 
  function handlePreviewresume() {
    const { data } = SupabaseClient.storage
      .from("job-board-public")
      .getPublicUrl(info?.resume);

    window.open(data?.publicUrl, "_blank");
  }

 
  async function handleUpdateJobStatus(getCurrentStatus) {
    let cpyJobApplicants = [...jobApplications];
    const indexOfCurrentApplicaton = cpyJobApplicants.findIndex(
      (item) => item.candidateUserId === currentCandidateetails?.userId,
    );
    const JobApplicantsToUpdate = {
      ...cpyJobApplicants[indexOfCurrentApplicaton],
      status:
        cpyJobApplicants[indexOfCurrentApplicaton].status.concat(
          getCurrentStatus,
        ),
    };
    await updateJobApplicationAction(JobApplicantsToUpdate, "/jobs");
  }

 
  function getCurrentApplicantStatus() {
    return (
      jobApplications.find(
        (item) => item.candidateUserId === currentCandidateetails?.userId,
      )?.status ?? []
    );
  }

 
  const currentStatus = getCurrentApplicantStatus();
  const isAlreadyActioned =
    currentStatus.includes("selected") || currentStatus.includes("rejected");

  return (
    <Fragment>
  
      <div className="grid grid-cols-1 gap-4 p-8 md:grid-cols-2 lg:grid-cols-3">
        {jobApplications && jobApplications.length > 0 ? (
          jobApplications.map((jobApplicantItem) => (
            <div
              key={jobApplicantItem?._id}
              className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
           
              <div
                className={`h-1.5 w-full bg-gradient-to-r ${getColor(jobApplicantItem?.name)}`}
              />

              <div className="p-5 flex items-center gap-4">
              
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getColor(
                    jobApplicantItem?.name,
                  )} flex items-center justify-center text-white text-lg font-bold shadow-md flex-shrink-0`}
                >
                  {jobApplicantItem?.name?.charAt(0) ?? "?"}
                </div>

              
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 truncate">
                    {jobApplicantItem?.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {jobApplicantItem?.email ?? "Applicant"}
                  </p>
                </div>

           
                <button
                  onClick={() =>
                    handleFetchCandidateDetails(
                      jobApplicantItem?.candidateUserId,
                    )
                  }
                  className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-xl text-white bg-gradient-to-r ${getColor(
                    jobApplicantItem?.name,
                  )} hover:opacity-90 transition-opacity shadow-sm`}
                >
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 flex flex-col items-center justify-center py-16 text-gray-400">
            <span className="text-5xl mb-4">📭</span>
            <p className="text-sm font-medium">No applicants yet</p>
          </div>
        )}
      </div>

  
      <Dialog
        open={showCurrentCandidateDetailsModel}
        onOpenChange={() => {
          setCurrentCandidateDetails(null);
          setShowCurrentCandidateDetailsModel(false);
        }}
      >
        <DialogContent className="p-0 overflow-hidden border-0 max-w-lg rounded-2xl shadow-2xl">
          <VisuallyHidden>
            <DialogTitle>Candidate Details</DialogTitle>
          </VisuallyHidden>

         
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-8 pt-10 pb-16">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getColor(
                  info?.name,
                )} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
              >
                {info?.name?.charAt(0) ?? "?"}
              </div>
              <div>
                <h2 className="text-white text-xl font-bold tracking-tight">
                  {info?.name}
                </h2>
                <p className="text-gray-400 text-sm mt-0.5">
                  {currentCandidateetails?.email}
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-16 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 pointer-events-none" />
          </div>

        
          <div className="grid grid-cols-3 divide-x divide-gray-100 -mt-8 mx-6 bg-white rounded-xl shadow-lg border border-gray-100 relative z-10">
            {[
              {
                value: info?.totalExperience,
                unit: "yrs",
                label: "Experience",
              },
              { value: info?.currentSalary, unit: "", label: "Salary" },
              { value: info?.noticePeriod, unit: "days", label: "Notice" },
            ].map(({ value, unit, label }) => (
              <div key={label} className="flex flex-col items-center py-4 px-2">
                <span className="text-lg font-bold text-gray-900">
                  {value}
                  {unit && (
                    <span className="text-sm font-medium text-gray-400">
                      {" "}
                      {unit}
                    </span>
                  )}
                </span>
                <span className="text-xs text-gray-400 mt-0.5">{label}</span>
              </div>
            ))}
          </div>

       
          <div className="px-6 pt-5 pb-7 space-y-5">
        
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                  🏢
                </span>
                <span className="font-medium">{info?.currentCompany}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                  📍
                </span>
                <span className="font-medium">{info?.currentJobLocation}</span>
              </div>
            </div>

        
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2.5">
                Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {info?.skills?.split(",").map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>

          
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2.5">
                Previous Companies
              </p>
              <div className="flex flex-wrap gap-2">
                {info?.previousCompanies?.split(",").map((company) => (
                  <span
                    key={company}
                    className="bg-gray-50 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200"
                  >
                    {company.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
  <div className="flex gap-3 p-4 w-full justify-end">
    <Button
      onClick={handlePreviewresume}
      variant="outline"
      className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors rounded-xl px-5"
    >
      Resume
    </Button>

    <Button
      disabled={isAlreadyActioned}
      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-5 disabled:opacity-50"
      onClick={() => handleUpdateJobStatus("selected")}
    >
      {currentStatus.includes("selected") ? "Selected" : "Select"}
    </Button>

    <Button
      disabled={isAlreadyActioned}
      className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-5 disabled:opacity-50"
      onClick={() => handleUpdateJobStatus("rejected")}
    >
      {currentStatus.includes("rejected") ? "Rejected" : "Reject"}
    </Button>
  </div>
</DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default CandidateList;