"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CommonForm from "../common-form";
import { initialPostNewJobsFormData, postNewJobsFormControls } from "@/utils";
import { postNewJobAction } from "@/actions";
import { toast } from "sonner";
import Link from "next/link";

function PostNewJobs({ profileInfo, user , jobList }) {
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    ...initialPostNewJobsFormData,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });
   
  


  function handlePostNewButtonvalid() {
    return Object.keys(jobFormData).every(
      (control) => jobFormData[control].trim() !== "",
    );
  }
  async function createNewJob(params) {
    await postNewJobAction(
      {
        ...jobFormData,
        recruiterId: user?.id,
        applicants: [],
      },
      "/jobs",
    );

    setJobFormData({
      ...initialPostNewJobsFormData,
      companyName: profileInfo?.recruiterInfo?.companyName,
    });
    setShowJobDialog(false);
  }
  function handleAddNewJob() {
  if (!profileInfo?.isPremiumUser && jobList.length >= 2) {
    toast.error("You can't post more than 2 jobs.", {
      description: "Please opt for membership to post more jobs.",
      action : <Link href={'/membership'} >Choose Membership</Link>
    });
    return;
  }
  setShowJobDialog(true);
}


  return (
    <div>
      <Button
        onClick={handleAddNewJob}
        className="h-10 px-6 text-sm font-medium rounded-lg bg-black text-white hover:bg-gray-800 transition-colors duration-200"
      >
        + Post a Job
      </Button>

      <Dialog
        open={showJobDialog}
        onOpenChange={() => {
          setShowJobDialog(false);
          setJobFormData({
            ...initialPostNewJobsFormData,
            companyName: profileInfo?.recruiterInfo?.companyName,
          });
        }}
      >
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0 rounded-2xl border border-gray-200 shadow-2xl">
      
          <DialogHeader className="px-8 pt-8 pb-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-gray-900 leading-none">
                  Post New Job
                </DialogTitle>
                <p className="text-sm text-gray-400 mt-1">
                  Fill in the details below to publish a listing
                </p>
              </div>
            </div>
          </DialogHeader>

         
          <div className="overflow-y-auto flex-1 px-8 py-6">
            <CommonForm
              buttonText={"Publish Job"}
              formData={jobFormData}
              setFormData={setJobFormData}
              formControls={postNewJobsFormControls}
              isBtnDisabled={!handlePostNewButtonvalid()}
              action={createNewJob}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PostNewJobs;
