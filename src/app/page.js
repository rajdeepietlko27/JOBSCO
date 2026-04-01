import { fetchProfileAction } from "@/actions";
import HomePageButtonControl from "@/components/homepage-button-control";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment } from "react";

async function Home() {
  const user = await currentUser();
  console.log(user, "current user");

  const profileInfo = await fetchProfileAction(user?.id);

  if (user && !profileInfo?._id) redirect("/onboard");

  return (
    <Fragment>
      <div className="bg-white">
        <div className="relative w-full">
          <div className="min-h-screen flex">
            <div className="container m-auto p-0">
              <div className="flex items-center flex-wrap gap-12 items-center lg:gap-0">
                <div className="lg-w-5/12 space-y-8">
                  <span className="flex space-x-2">
                    <span className="block w-14 mb-2 border-b-2 border-gray-700"></span>
                    <span className="font-medium text-gray-600">
                      one stop solution to find job
                    </span>
                  </span>
                  <h1 className="text-4xl font-bold md:text-6xl">
                    The Best <br /> Job Portal App{" "}
                  </h1>
                  <p className="text-xl text-gray-700">
                    Find Best Job for Product based Companies and Build Your
                    Carrier
                  </p>
                  <HomePageButtonControl 
                 user={JSON.parse(JSON.stringify(user))}
                   profileInfo={profileInfo} />
                </div>
                <div className="hidden relative md:block lg:w-7/12">
                  <img
                    src="https://cdn.pixabay.com/photo/2017/10/31/09/55/dream-job-2904780_640.jpg"
                    alt="Job Portal"
                    className="relative ml-auto "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
