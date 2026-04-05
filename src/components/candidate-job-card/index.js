import { Fragment, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { createJobApplicationAction } from "@/actions";
import Link from "next/link";


const ICON_GRADIENTS = [
  "from-indigo-950 to-violet-900",
  "from-blue-950 to-blue-800",
  "from-emerald-950 to-emerald-700",
  "from-rose-950 to-rose-800",
  "from-amber-950 to-amber-700",
];

function JobCardIcon({ index = 0 }) {
  const grad = ICON_GRADIENTS[index % ICON_GRADIENTS.length];
  return (
    <div
      className={`w-[52px] h-[52px] shrink-0 rounded-[14px] bg-gradient-to-br ${grad} flex items-center justify-center`}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="white"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}

function CandidateJobCard({ jobItem, profileInfo, jobApplications, index = 0 }) {
  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);

  const alreadyApplied =
    jobApplications.findIndex((item) => item.jobId === jobItem?._id) > -1;

  async function handleJobApply() {
    if (!profileInfo?.isPremiumUser && jobApplications.length >= 2) {
      toast.error("You can't apply more than 2 jobs.", {
        description: "Please opt for membership to apply to more jobs.",
        action: <Link href="/membership">Choose Membership</Link>,
      });
      return;
    }

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
      <Drawer open={showJobDetailsDrawer} onOpenChange={setShowJobDetailsDrawer}>

        <div
          className="group relative bg-white border border-[#e8e5de] rounded-[20px] p-6 flex flex-col gap-4
                     transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-gray-200 overflow-hidden"
        >
       
          <span
            className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-violet-600
                       opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t-[20px]"
          />

       
          <div className="flex items-start gap-3">
            <JobCardIcon index={index} />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-1">
                {jobItem?.companyName}
              </p>
              <h3
                className="text-[17px] font-bold text-gray-900 leading-snug truncate"
                style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.3px" }}
              >
                {jobItem?.title}
              </h3>
            </div>
          </div>

        
          <div className="flex flex-wrap gap-2">
            {jobItem?.location && (
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                📍 {jobItem.location}
              </span>
            )}
            {jobItem?.type && (
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-violet-50 text-violet-700">
                {jobItem.type} Time
              </span>
            )}
            {jobItem?.experience && (
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
                {jobItem.experience} yrs exp
              </span>
            )}
          </div>

    
          <DrawerTrigger asChild>
            <button
              className="w-full py-3 rounded-xl bg-gray-900 text-white text-[13px] font-semibold
                         transition-all hover:bg-blue-600 active:scale-[0.98]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              View Details →
            </button>
          </DrawerTrigger>
        </div>

     
        <DrawerContent className="p-0 overflow-hidden max-w-3xl mx-auto rounded-t-3xl border-0">

      
          <div className="bg-[#0f0f14] px-9 pt-8 pb-7">
            <DrawerHeader className="p-0">
              <p className="text-[11px] font-medium uppercase tracking-widest text-gray-500 mb-1.5">
                {jobItem?.companyName}
              </p>
              <DrawerTitle
                className="text-[30px] font-bold text-white leading-tight mb-2"
                style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-1px" }}
              >
                {jobItem?.title}
              </DrawerTitle>
              {jobItem?.location && (
                <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                  {jobItem.location}
                </div>
              )}

             
              <div className="flex gap-2.5 mt-5">
                <button
                  onClick={handleJobApply}
                  disabled={alreadyApplied}
                  className={`px-6 py-2.5 rounded-xl text-[13px] font-semibold transition-all
                    ${alreadyApplied
                      ? "bg-green-500 text-white cursor-default"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                    } disabled:opacity-100`}
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {alreadyApplied ? "Applied ✓" : "Apply Now"}
                </button>
                <button
                  onClick={() => setShowJobDetailsDrawer(false)}
                  className="px-6 py-2.5 rounded-xl text-[13px] text-gray-400 border border-gray-700
                             hover:border-gray-500 hover:text-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </DrawerHeader>
          </div>

        
          <div className="px-9 py-7 bg-white flex flex-col gap-6">

          
            <div className="flex flex-wrap gap-2.5">
              {jobItem?.type && (
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                  {jobItem.type} Time
                </span>
              )}
              {jobItem?.experience && (
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3.5 py-1.5 rounded-full bg-violet-50 text-violet-700 border border-violet-100">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
                  {jobItem.experience} yrs Experience
                </span>
              )}
            </div>

          
            {jobItem?.description && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-300 mb-2">
                  About the role
                </p>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  {jobItem.description}
                </p>
              </div>
            )}

            {jobItem?.skills && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-300 mb-3">
                  Skills required
                </p>
                <div className="flex flex-wrap gap-2">
                  {jobItem.skills.split(",").map((skill) => (
                    <span
                      key={skill}
                      className="bg-gray-950 text-white text-[12px] font-medium px-3.5 py-1.5 rounded-full"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}

export default CandidateJobCard;