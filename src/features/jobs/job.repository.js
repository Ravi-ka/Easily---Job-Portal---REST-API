import Job from "./schema/newJob.schema.js";

export const createNewJob = async (job) => {
  const newJob = new Job(job);
  return await newJob.save();
};

export const applyJobRepo = async (jobId, userId) => {
  return await Job.findByIdAndUpdate(
    jobId,
    { $push: { applicants: userId } },
    { new: true }
  );
};

export const findJobRepo = async (_id) => {
  return await Job.findById(_id);
};
