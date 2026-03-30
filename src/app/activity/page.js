import { fetchJobApplicationForCandidate, fetchJobApplicationForRecruiter, fetchJobForCandidateAction } from "@/actions";
import CandidateActivity from "@/components/candidate-activity";
import { currentUser } from "@clerk/nextjs/server";


export default async function Activity(){
    const user = await currentUser();
    const jobList = await fetchJobForCandidateAction();
   const jobApplicants = await fetchJobApplicationForCandidate(user?.id)

   return <div>
   <CandidateActivity 
     jobList={jobList}
     jobApplicants={jobApplicants}
    />
   </div>
}