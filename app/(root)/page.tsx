import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import { IInterview } from "@/lib/models/Interview";
import { IUser } from "@/lib/models/User";
import Image from "next/image";
import Link from "next/link";

type InterviewWithMongoId = Omit<IInterview, 'id'> & { _id: string };
type UserWithId = IUser & { _id: string };

type InterviewCardProps = {
  id: string;
  role: string;
  type: string;
  techstack: string[];
  level: string;
  questions?: string[];
  finalized?: boolean;
  createdAt?: string;
  userId?: string;
};

export default async function Page() {
  const user = await getCurrentUser() as (IUser & { _id: any }) | null;
  const userId = user?._id?.toString() || '';

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <h2 className="text-2xl font-semibold">You must be signed in</h2>
        <Button asChild className="btn-primary">
          <Link href="/sign-in">
            Go to Sign In
          </Link>
        </Button>
      </div>
    );
  }

  const [userInterviews, latestInterviews] = await Promise.all([
    (await getInterviewsByUserId(userId)) as InterviewWithMongoId[],
    (await getLatestInterviews({ userId })) as InterviewWithMongoId[],
  ]);

  const transformInterview = (interview: InterviewWithMongoId): InterviewCardProps => ({
    id: interview._id.toString(),
    role: interview.role,
    type: interview.type,
    techstack: interview.techstack,
    level: interview.level,
    questions: interview.questions || [],
    userId: interview.userId,
    finalized: interview.finalized,
    createdAt: interview.createdAt?.toISOString(),
  });

  const transformedUserInterviews = userInterviews?.map(transformInterview) || [];
  const transformedLatestInterviews = latestInterviews?.map(transformInterview) || [];

  const hasPastInterviews = transformedUserInterviews.length > 0;
  const hasUpcomingInterviews = transformedLatestInterviews.length > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice on real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            transformedUserInterviews.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            transformedLatestInterviews.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>There are no new interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}
