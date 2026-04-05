"use server";

import connectToDB from "@/database";
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

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
  const result = await Profile.findOne({ userId }).sort({ _id: -1 });
  return JSON.parse(JSON.stringify(result));
}

export async function postNewJobAction(formData, pathTorevalidate) {
  await connectToDB();
  await Job.create(formData);
  revalidatePath(pathTorevalidate);
}

export async function fetchJobForRecruiterAction(id) {
  await connectToDB();
  const result = await Job.find({ recruiterId: id });
  return JSON.parse(JSON.stringify(result));
}

export async function fetchJobForCandidateAction(filterParams = {}) {
  await connectToDB();
  let updateParams = {};
  Object.keys(filterParams).forEach((filteKey) => {
    updateParams[filteKey] = { $in: filterParams[filteKey].split(",") };
  });
  const result = await Job.find(
    filterParams && Object.keys(filterParams).length > 0 ? updateParams : {},
  );
  return JSON.parse(JSON.stringify(result));
}

export async function createJobApplicationAction(data, pathTorevalidate) {
  await connectToDB();
  await Application.create(data);
  revalidatePath(pathTorevalidate);
}

export async function fetchJobApplicationForCandidate(candidateID) {
  await connectToDB();
  const result = await Application.find({ candidateUserId: candidateID });
  return JSON.parse(JSON.stringify(result));
}

export async function fetchJobApplicationForRecruiter(recruiterID) {
  await connectToDB();
  const result = await Application.find({ recruiterUserID: recruiterID });
  return JSON.parse(JSON.stringify(result));
}

export async function updateJobApplicationAction(data, pathToRevlidate) {
  await connectToDB();
  const {
    _id,
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

export async function getCandidateDetailsByAction(currentCandidateID) {
  await connectToDB();
  const result = await Profile.findOne({ userId: currentCandidateID });
  return JSON.parse(JSON.stringify(result));
}

export async function createFilterCategoryAction() {
  await connectToDB();
  const result = await Job.find({});
  return JSON.parse(JSON.stringify(result));
}

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

  await Profile.replaceOne(
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

  revalidatePath(pathTorevalidate);
}


export async function deleteRecruiterAction(userId, pathTorevalidate) {
  try {
    await connectToDB();

    // Step 1: Find all jobs by this recruiter
    const recruiterJobs = await Job.find({ recruiterId: userId });
    const jobIds = recruiterJobs.map((job) => job._id.toString());

    // Step 2: Delete all applications for those jobs
    if (jobIds.length > 0) {
      await Application.deleteMany({ jobId: { $in: jobIds } });
    }

    // Step 3: Delete all jobs by this recruiter
    await Job.deleteMany({ recruiterId: userId });

    // Step 4: Delete the recruiter profile
    await Profile.findOneAndDelete({ userId });

    revalidatePath(pathTorevalidate || "/");

    return { success: true };
  } catch (error) {
    console.error("deleteRecruiterAction error:", error.message);
    return { success: false, error: error.message };
  }
}

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

export async function createStripePaymentAction(data) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: data?.lineItems,
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/membership?status=cancel`,
  });

  return {
    success: true,
    id: session?.id,
    url: session?.url,
  };
}
