import { Container } from "@/components/Container";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { getQuizQuestions } from "@/lib/data";
import { ElectionQuiz } from "@/components/quiz/ElectionQuiz";

export default function QuizPage() {
  const questions = getQuizQuestions();

  return (
    <main className="py-10">
      <Container>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Election readiness quiz
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70 dark:text-white/70">
              6 quick questions to check if you’re election-ready. You’ll get a
              score and simple personalized suggestions.
            </p>
          </div>

          <DisclaimerBanner compact />

          <ElectionQuiz questions={questions} />
        </div>
      </Container>
    </main>
  );
}

