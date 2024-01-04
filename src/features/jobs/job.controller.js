import mongoose from "mongoose";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { applyJobRepo, createNewJob, findJobRepo } from "./job.repository.js";
import { likeRepo, getLikesRepo } from "../like/like.repository.js";

export const postJob = async (req, res, next) => {
  try {
    if (req.user.type !== "recruiter") {
      return res.status(400).json({
        success: false,
        msg: "sorry! only recruiter is allowed to post jobs!",
      });
    }

    const resp = await createNewJob(req.body);
    if (resp) {
      res.status(201).json({
        success: true,
        msg: "job posted successfully with ",
        job_description: resp,
      });
    } else {
      res.status(400).json({ success: false, msg: "Bad request" });
    }
  } catch (error) {
    next(new customErrorHandler(400, error));
  }
};

export const applyJob = async (req, res, next) => {
  const job_id = req.params.id;
  const user_id = req.user._id;

  try {
    const job_description = await findJobRepo(job_id);
    if (!job_description) {
      return next(new customErrorHandler(400, "Job not found"));
    }

    const isAlreadyApplied = job_description.applicants.includes(user_id);
    if (isAlreadyApplied) {
      return res
        .status(400)
        .json({ success: false, msg: "You have already applied for this job" });
    }

    const resp = await applyJobRepo(job_id, user_id);
    if (resp) {
      res
        .status(201)
        .json({ success: true, msg: "job applied successfully", resp });
    } else {
      res.status(400).json({ success: false, msg: "Bad request" });
    }
  } catch (error) {
    next(new customErrorHandler(400, error));
  }
};

export const like = async (req, res, next) => {
  const user_id = req.user._id;
  const { model, id } = req.query;

  try {
    const resp = await likeRepo(user_id, id, model);
    if (resp) {
      res.status(201).json({ success: true, msg: "Liked successfully", resp });
    } else {
      res.status(400).json({ success: false, msg: "Bad request" });
    }
  } catch (error) {
    next(new customErrorHandler(400, error));
  }
};

export const getLikes = async (req, res, next) => {
  const { id, on_model } = req.query;

  try {
    const resp = await getLikesRepo(id, on_model);
    if (resp) {
      res.status(200).json({ success: true, msg: "Likes retrieved", resp });
    } else {
      res.status(400).json({ success: false, msg: "Bad request" });
    }
  } catch (error) {
    next(new customErrorHandler(400, error));
  }
};
