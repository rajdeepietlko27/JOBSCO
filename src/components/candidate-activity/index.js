"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";


function RocketIcon({ color = "#fff" }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill={color}
        opacity="0.9"
      />
    </svg>
  );
}

const STATUS_STYLES = {
  applied: {
    badge: "bg-blue-50 text-blue-600",
    bar: "bg-blue-600",
    icon: "from-indigo-950 to-violet-900",
  },
  rejected: {
    badge: "bg-red-50 text-red-600",
    bar: "bg-red-500",
    icon: "from-red-950 to-red-800",
  },
  selected: {
    badge: "bg-green-50 text-green-700",
    bar: "bg-green-500",
    icon: "from-green-950 to-green-700",
  },
};

function JobCard({ title, companyName, status }) {
  const s = STATUS_STYLES[status?.toLowerCase()] ?? STATUS_STYLES.applied;

  return (
    <div className="relative flex items-center gap-5 bg-white border border-gray-100 rounded-2xl px-6 py-5 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-gray-200 cursor-pointer">
    
      <span className={`absolute right-0 top-0 bottom-0 w-1 rounded-r-2xl ${s.bar}`} />

     
      <div
        className={`w-13 h-13 shrink-0 rounded-xl bg-gradient-to-br ${s.icon} flex items-center justify-center`}
        style={{ width: 52, height: 52 }}
      >
        <RocketIcon />
      </div>

 
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-[15px] tracking-tight truncate">
          {title}
        </p>
        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mt-0.5">
          {companyName}
        </p>
      </div>

   
      <span
        className={`shrink-0 text-[11px] font-medium px-3 py-1 rounded-full capitalize ${s.badge}`}
      >
        {status}
      </span>

   
      <span className="text-gray-300 text-lg ml-1 shrink-0">›</span>
    </div>
  );
}

function CandidateActivity({ jobList, jobApplicants }) {
  const uniqueStatusArray = [
    ...new Set(
      jobApplicants.map((item) => item.status).flat(1)
    ),
  ];

  function getJobsForStatus(status) {
    return jobList.filter((jobItem) =>
      jobApplicants
        .filter((app) => app.status.indexOf(status) > -1)
        .findIndex((app) => jobItem._id === app.jobId) > -1
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "#f7f6f2", fontFamily: "'DM Sans', sans-serif" }}
    >
      <Tabs defaultValue={uniqueStatusArray[0]} className="w-full">
     
        <div className="mx-auto max-w-5xl px-12">
          <div className="flex items-end justify-between border-b border-gray-200 pt-14 pb-5">
            <h1
              className="text-[40px] font-bold tracking-tight text-gray-900 leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Your{" "}
              <span className="text-blue-600">Activity</span>
            </h1>

            <TabsList className="flex gap-1 bg-gray-100 p-1 rounded-xl border-0">
              {uniqueStatusArray.map((status) => (
                <TabsTrigger
                  key={status}
                  value={status}
                  className="px-5 py-2 rounded-lg text-[13px] capitalize font-normal text-gray-500 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:font-medium data-[state=active]:shadow-sm transition-all"
                >
                  {status}
                
                  <span className="ml-2 inline-flex items-center justify-center bg-gray-900 text-white text-[10px] font-medium rounded-full px-1.5 py-0.5 leading-none">
                    {getJobsForStatus(status).length}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        
        <div className="mx-auto max-w-5xl px-12 pt-8 pb-20">
          {uniqueStatusArray.map((status) => (
            <TabsContent key={status} value={status}>
              <p className="text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-5">
                {status} jobs
              </p>

              <div className="flex flex-col gap-3">
                {getJobsForStatus(status).length === 0 ? (
                  <p className="text-center py-16 text-gray-400 text-[15px]">
                    No {status} applications yet.
                  </p>
                ) : (
                  getJobsForStatus(status).map((job) => (
                    <JobCard
                      key={job._id}
                      title={job?.title}
                      companyName={job?.companyName}
                      status={status}
                    />
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

export default CandidateActivity;