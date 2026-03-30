"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import {
  candidateOnboardFormControls,
  initialCaandidateFormDta,
  initialRecruiterFormData,
  recruiterOnBoardFormControls,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supaBaseClient = createClient(
  "https://cydxaplwjbtfzurckrqc.supabase.co",
  "sb_publishable_Y89cVt1IkmIJbR8i0xbvrg_zj6EL7T5",
);

function OnBoard() {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFromData, setRecruiterFormData] = useState(
    initialRecruiterFormData,
  );
  const [candidateFormData, setCandidateFormData] = useState(
    initialCaandidateFormDta,
  );
  const [file, setFile] = useState(null);

  function handleTabChange(value) {
    setCurrentTab(value);
  }

  function handleRecruiterFormValid() {
    return (
      recruiterFromData &&
      recruiterFromData.name.trim() !== "" &&
      recruiterFromData.companyName.trim() !== "" &&
      recruiterFromData.companyRole.trim() !== ""
    );
  }

  function handleCandidateFormValid() {
    return Object.keys(candidateFormData).every(
      (key) => candidateFormData[key].trim() !== "",
    );
  }

  const currentAuthUser = useUser();
  const { user } = currentAuthUser;

  function handleFileChange(event) {
    event.preventDefault();
    setFile(event.target.files[0]);
  }

  async function handleUpdatePdfToSupabase() {
    const { data, error } = await supaBaseClient.storage
      .from("job-board-public")
      .upload(`/public/${file.name}`, file, {
        cacheControl: " 3600",
        upsert: false,
      });
    console.log(data, error);
    if (data) {
      setCandidateFormData({
        ...candidateFormData,
        resume: data.path,
      });
    }
  }

  useEffect(() => {
    if (file) handleUpdatePdfToSupabase();
  }, [file]);

  async function createProfile() {
    const data =
      currentTab === "candidate"
        ? {
            candidateInfo: candidateFormData,
            role: "candidate",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          }
        : {
            recruiterInfo: recruiterFromData,
            role: "recruiter",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          };
    await createProfileAction(data, "/onboard");
  }
  return (
    <div className="bg-white">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Welcome to onboarding
            </h1>
            <TabsList>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="candidate">
          <CommonForm
            formData={candidateFormData}
            setFormData={setCandidateFormData}
            buttonText={"OnBoard As student"}
            formControls={candidateOnboardFormControls}
            handleFileChange={handleFileChange}
            isBtnDisabled={!handleCandidateFormValid()}
             action={createProfile}
          />
        </TabsContent>
        <TabsContent value="recruiter">
          <CommonForm
            formControls={recruiterOnBoardFormControls}
            buttonText={"Onboard as recruiter"}
            formData={recruiterFromData}
            setFormData={setRecruiterFormData}
            isBtnDisabled={!handleRecruiterFormValid()}
            action={createProfile}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default OnBoard;
