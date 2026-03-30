import {
  fetchJobApplicationForCandidate,
  fetchJobApplicationForRecruiter,
  fetchJobForCandidateAction,
  fetchJobForRecruiterAction,
  fetchProfileAction,
} from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";

async function JobsPage() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  const jobList =
    profileInfo?.role === "candidate"
      ? await fetchJobForCandidateAction()
      : await fetchJobForRecruiterAction(user?.id);

  const getJobApplicationList = profileInfo?.role === "candidate" ?
  await fetchJobApplicationForCandidate(user?.id) :
  await fetchJobApplicationForRecruiter(user?.id);

  return (
    <JobListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobList={jobList}
      jobApplications={getJobApplicationList}
    />
  );
}

export default JobsPage;
