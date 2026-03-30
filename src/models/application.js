import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  recruiterUserID: String,
  name: String,
  email: String,
  candidateUserId: String,
  status: Array,
  jobId: String,
  jobApplicationDate: String,
});


const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema)


export default Application;