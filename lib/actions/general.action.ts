"use server";

import { feedbackSchema } from "@/constants";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import connectDB from "@/lib/mongodb";
import Interview, { IInterview } from "@/lib/models/Interview";
import Feedback, { IFeedback } from "@/lib/models/Feedback";

// Helper to convert _id to id for plain objects
const transformDocument = (doc: any) => {
  if (!doc) return null;
  const { _id, __v, ...rest } = doc;
  return { id: _id.toString(), ...rest };
};

export async function getInterviewsByUserId(
  userId: string | undefined
): Promise<IInterview[] | null> {
  if (!userId) return null;

  try {
    await connectDB();
    const interviews = await Interview.find({ userId })
      .sort({ createdAt: -1 })
      .lean();
    return interviews.map(transformDocument) as IInterview[];
  } catch (error) {
    console.error("Error fetching interviews by user ID:", error);
    return null;
  }
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<IInterview[] | null> {
  const { userId, limit = 20 } = params;

  try {
    await connectDB();
    const interviews = await Interview.find({
      finalized: true,
      userId: { $ne: userId },
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return interviews.map(transformDocument) as IInterview[];
  } catch (error) {
    console.error("Error fetching latest interviews:", error);
    return null;
  }
}

export async function getInterviewsById(id: string): Promise<IInterview | null> {
  try {
    await connectDB();
    const interview = await Interview.findById(id).lean();
    if (!interview) return null;
    return transformDocument(interview) as IInterview;
  } catch (error) {
    console.error("Error fetching interview by ID:", error);
    return null;
  }
}

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript } = params;

  try {
    const formattedTranscript = transcript
      .map((sentence: { role: string; content: string }) =>
        `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001"),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
      `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    await connectDB();
    const newFeedback = await Feedback.create({
      interviewId,
      userId,
      ...object,
    });

    return { success: true, feedbackId: newFeedback._id.toString() };
  } catch (error) {
    console.error("Error saving feedback", error);
    return { success: false };
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<IFeedback | null> {
  const { interviewId, userId } = params;

  try {
    await connectDB();
    const feedback = await Feedback.findOne({
      interviewId,
      userId,
    }).lean();

    if (!feedback) return null;

    return transformDocument(feedback) as IFeedback;
  } catch (error) {
    console.error("Error fetching feedback by interview ID:", error);
    return null;
  }
}
