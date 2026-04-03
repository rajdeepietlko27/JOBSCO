"use server";

import connectToDB from "@/database";
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";
import { accessedDynamicData } from "next/dist/server/app-render/dynamic-rendering";

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function createProfileAction(formData, pathTorevalidate) {
  await connectToDB();
  await Profile.create(formData);
  revalidatePath(pathTorevalidate);
}

export async function fetchProfileAction(userId) {
  await connectToDB();
  // ✅ Sort by _id descending to get the latest document
  const result = await Profile.findOne({ userId }).sort({ _id: -1 });
  return JSON.parse(JSON.stringify(result));
}

// create job action
export async function postNewJobAction(formData, pathTorevalidate) {
  await connectToDB();
  await Job.create(formData);
  revalidatePath(pathTorevalidate);
}

// fetch job action
//recruiter
export async function fetchJobForRecruiterAction(id) {
  await connectToDB();
  const result = await Job.find({ recruiterId: id });
  return JSON.parse(JSON.stringify(result));
}

//candidate
export async function fetchJobForCandidateAction(filterParams = {}) {
  await connectToDB();
  let updateParams = {};
  // console.log("filterParams received:", filterParams); // 👈 verify this
  Object.keys(filterParams).forEach((filteKey) => {
    updateParams[filteKey] = { $in: filterParams[filteKey].split(",") };
  });
  // console.log("MongoDB query:", updateParams); // 👈 verify this
  const result = await Job.find(
    filterParams && Object.keys(filterParams).length > 0 ? updateParams : {},
  );
  return JSON.parse(JSON.stringify(result));
}

// create job application
export async function createJobApplicationAction(data, pathTorevalidate) {
  await connectToDB();
  await Application.create(data);
  revalidatePath(pathTorevalidate);
}

// fetch job application - candidate
export async function fetchJobApplicationForCandidate(candidateID) {
  await connectToDB();
  const result = await Application.find({ candidateUserId: candidateID });
  return JSON.parse(JSON.stringify(result));
}

// fetch job application - recruiter
export async function fetchJobApplicationForRecruiter(recruiterID) {
  await connectToDB();
  const result = await Application.find({ recruiterUserID: recruiterID });
  return JSON.parse(JSON.stringify(result));
}
// update job application
export async function updateJobApplicationAction(data, pathToRevlidate) {
  await connectToDB();
  const {
    _id, // ✅ add this
    recruiterUserID,
    name,
    email,
    candidateUserId,
    status,
    jobId,
    jobApplicationDate,
  } = data;

  await Application.findOneAndUpdate(
    { _id: _id },
    {
      recruiterUserID,
      name,
      email,
      candidateUserId,
      status,
      jobId,
      jobApplicationDate,
    },
    { new: true },
  );

  revalidatePath(pathToRevlidate);
}

// get candidate details by id
export async function getCandidateDetailsByAction(currentCandidateID) {
  await connectToDB();
  const result = await Profile.findOne({ userId: currentCandidateID });

  return JSON.parse(JSON.stringify(result));
}

// create ifilter catehories

export async function createFilterCategoryAction() {
  await connectToDB();
  const result = await Job.find({});
  return JSON.parse(JSON.stringify(result));
}

// update profile action

export async function updateProfileAction(data, pathTorevalidate) {
  await connectToDB();
  const {
    userId,
    role,
    email,
    isPremiumUser,
    memberShipType,
    memberShipStartDate,
    memberShipEndDate,
    recruiterInfo,
    candidateInfo,
    _id,
  } = data;

  console.log("UPDATE - recruiterInfo:", JSON.stringify(recruiterInfo));
  console.log("UPDATE - _id:", _id);

  // ✅ Use replaceOne instead
  const result = await Profile.replaceOne(
    { _id: _id },
    {
      userId,
      role,
      email,
      isPremiumUser,
      memberShipType,
      memberShipStartDate,
      memberShipEndDate,
      recruiterInfo,
      candidateInfo,
    },
  );

  // console.log("Update result:", result); // 👈 check if modifiedCount is 1

  revalidatePath(pathTorevalidate);
}

// create stripe price id based on tier selection
export async function createPriceIdAction(data) {
  const session = await stripe.prices.create({
    currency: "usd",
    unit_amount: data?.amount * 100,
    recurring: {
      interval: "year",
    },
    product_data: {
      name: "Premium Plan",
    },
  });
  return {
    success: true,
    id: session?.id,
  };
}

// create payment logic
// create payment logic
export async function createStripePaymentAction(data) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: data?.lineItems,
    mode: "subscription",
    success_url: `${baseUrl}/api/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/membership?status=cancel`,
  });

  return {
    success: true,
    id: session?.id,
    url: session?.url,
  };
}
