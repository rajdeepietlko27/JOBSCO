"use client";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

function CandidateActivity({ jobList, jobApplicants }) {
  const uniqueStatusArray = [
    ...new Set(
      jobApplicants.map((jobApplicantItem) => jobApplicantItem.status).flat(1),
    ),
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <Tabs defaultValue={uniqueStatusArray[0]} className="w-full">
        <div className="flex items-baseline justify-between border-b pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Your Activity
          </h1>
          <TabsList>
            {uniqueStatusArray.map((status) => (
              <TabsTrigger key={status} value={status}>
                {status}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="pb-24 pt-6">
          <div className="container mx-auto p-0 space-y-8">
            <div className="flex flex-col gap-4">
              {uniqueStatusArray.map((status) => (
                <TabsContent key={status} value={status}>
                  {jobList
                    .filter(
                      (jobItem) =>
                        jobApplicants
                          // ✅ FIXED: was jobApplicants.status (wrong), should filter each application
                          .filter(
                            (jobApplication) =>
                              jobApplication.status.indexOf(status) > -1,
                          )
                          // ✅ FIXED: was jobApplicants (wrong), should be filteredItemByStatus
                          .findIndex(
                            (filteredItemByStatus) =>
                              jobItem._id === filteredItemByStatus.jobId,
                          ) > -1,
                    )
                    // ✅ FIXED: syntax error "finalFilter item" → "finalFilterItem"
                    .map((finalFilterItem) => (
                      <CommonCard
                        key={finalFilterItem._id}
                        icon={<JobIcon />}
                        // ✅ FIXED: typo finalfilterItem → finalFilterItem
                        title={finalFilterItem?.title}
                        description={finalFilterItem?.companyName}
                      />
                    ))}
                </TabsContent>
              ))}
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

export default CandidateActivity;
