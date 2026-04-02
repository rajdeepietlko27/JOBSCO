"use client";

import PostNewJobs from "../post-new-job";
import RecruiterJobCard from "../recruiter-job-card";
import CandidateJobCard from "../candidate-job-card";
import { filterMenuDataArray, formUrlQuery } from "@/utils";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function JobListing({
  user,
  profileInfo,
  jobList,
  jobApplications,
  fetchFilterCategories,
}) {
  const [filterParams, setFilterParams] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();

  // ✅ On mount: restore filterParams from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem("filterParams");
    if (!stored) return;
    const parsed = JSON.parse(stored);
    if (parsed && Object.keys(parsed).length > 0) {
      setFilterParams(parsed);
    }
  }, []);

  // ✅ Whenever filterParams changes, push to URL
  useEffect(() => {
    if (!filterParams || Object.keys(filterParams).length === 0) return;

    const url = formUrlQuery({
      params: searchParams.toString(),
      dataToAdd: filterParams,
    });

    router.push(url, { scroll: false });
  }, [filterParams]); // ✅ Only depend on filterParams, NOT searchParams

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilterParams = { ...filterParams };
    const indexOfCurrentSection =
      Object.keys(cpyFilterParams).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      // Section doesn't exist yet, add it
      cpyFilterParams = {
        ...cpyFilterParams,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilterParams[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1) {
        // Option not selected, add it
        cpyFilterParams[getSectionId] = [
          ...cpyFilterParams[getSectionId],
          getCurrentOption,
        ];
      } else {
        // Option already selected, remove it (uncheck)
        cpyFilterParams[getSectionId] = cpyFilterParams[getSectionId].filter(
          (_, i) => i !== indexOfCurrentOption
        );
      }
    }

    setFilterParams(cpyFilterParams);
    sessionStorage.setItem("filterParams", JSON.stringify(cpyFilterParams));
  }

  const filterMenus = filterMenuDataArray.map((item) => ({
    id: item.id,
    name: item.label,
    options: [
      ...new Set(fetchFilterCategories.map((listItem) => listItem[item.id])),
    ],
  }));

  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {profileInfo?.role === "candidate"
              ? "Explore All Jobs"
              : "Jobs Dashboard"}
          </h1>
          <div className="flex items-center">
            {profileInfo?.role === "candidate" ? (
              <Menubar>
                {filterMenus.map((filterMenu) => (
                  <MenubarMenu key={filterMenu.name}>
                    <MenubarTrigger>{filterMenu.name}</MenubarTrigger>
                    <MenubarContent>
                      {filterMenu.options.map((option, optionIdx) => (
                        <MenubarItem
                          key={optionIdx}
                          className="flex items-center"
                          onClick={() => handleFilter(filterMenu.id, option)}
                        >
                          <div
                            className={`h-4 w-4 border rounded border-gray-900 ${
                              filterParams[filterMenu.id]?.includes(option)
                                ? "bg-black"
                                : ""
                            }`}
                          />
                          <Label className="ml-3 cursor-pointer text-sm text-gray-600">
                            {option}
                          </Label>
                        </MenubarItem>
                      ))}
                    </MenubarContent>
                  </MenubarMenu>
                ))}
              </Menubar>
            ) : (
              <PostNewJobs jobList={jobList} user={user} profileInfo={profileInfo} />
            )}
          </div>
        </div>

        <div className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <div className="lg:col-span-4">
              <div className="container mx-auto p-0 space-y-8">
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                  {jobList && jobList.length > 0
                    ? jobList.map((jobItem) =>
                        profileInfo?.role === "candidate" ? (
                          <CandidateJobCard
                            key={jobItem._id}
                            profileInfo={profileInfo}
                            jobItem={jobItem}
                            jobApplications={jobApplications}
                          />
                        ) : (
                          <RecruiterJobCard
                            key={jobItem._id}
                            profileInfo={profileInfo}
                            jobItem={jobItem}
                            jobApplications={jobApplications}
                          />
                        )
                      )
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobListing;