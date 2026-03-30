"use client";

import CandidateList from "../candidate-list";
import { ScrollArea } from "../ui/scroll-area";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const { Drawer, DrawerContent, DrawerTitle } = require("../ui/drawer");

function JobApplicants({
  showApplicationDrawer,
  setShowApplicationDrawer,
  showCurrentCandidateDetailsModel,
  setShowCurrentCandidateDetailsModel,
  currentCandidateetails,
  setCurrentCandidateDetails,
  jobItem,
  jobApplications,
}) {
  return (
    <Drawer
      open={showApplicationDrawer}
      onOpenChange={setShowApplicationDrawer}
    >
      <DrawerContent className="max-h-[50vh]">
        <VisuallyHidden>
          <DrawerTitle>Job Applicants</DrawerTitle>
        </VisuallyHidden>
        <ScrollArea className="h-auto overflow-y-auto">
          <CandidateList
            currentCandidateetails={currentCandidateetails}
            setCurrentCandidateDetails={setCurrentCandidateDetails}
            jobApplications={jobApplications}
            showCurrentCandidateDetailsModel={showCurrentCandidateDetailsModel}
            setShowCurrentCandidateDetailsModel={
              setShowCurrentCandidateDetailsModel
            }
          />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

export default JobApplicants;