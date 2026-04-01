"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect } from "react";

function HomePageButtonControl({ user, profileInfo }) {
  const router = useRouter();

  useEffect(()=>{
   router.refresh();
  } , [])
  return (
    <div className="flex space-x-4">
      <Button
        href={"/jobs"}
        className="flex h-11 items-center justify-center px-5"
        onClick={() => router.push("/jobs")}
      >
        {user
          ? profileInfo?.role === "candidate"
            ? "Browse Jobs"
            : "Job Dashoboard"
          : "Find Jobs"}
      </Button>
      <Button
        href={"/jobs"}
        className="flex h-11 items-center justify-center px-5"

        onClick={
            ()=> router.push(
          user
          ? profileInfo?.role === "candidate"
            ? ' /activity' : '/jobs' : '/jobs'

            )
        }
      >
        {user
          ? profileInfo?.role === "candidate"
            ? "Your Activity"
            : "Post new Job"
          : "Post New Job"}
      </Button>
    </div>
  );
}

export default HomePageButtonControl;
