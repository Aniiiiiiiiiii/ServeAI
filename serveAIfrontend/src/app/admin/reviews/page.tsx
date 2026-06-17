import { AIInsightCard, PageHeader, SectionCard, StatusBadge } from "@/components/app-components";
import { insights } from "@/lib/demo/insights";
import { reviews } from "@/lib/demo/reviews";
import { formatDate } from "@/utils/formatDate";

export default function ReviewsPage() {
  return (
    <div className="grid gap-6">
      <PageHeader title="Reviews" description="Guest feedback, sentiment labels, and AI service suggestions." />
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-4">
          {reviews.map((review) => (
            <SectionCard key={review.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div><h2 className="text-xl font-black">{review.guest}</h2><p className="text-sm font-semibold text-charcoal-500">{review.room} · {formatDate(review.createdAt)}</p></div>
                <div className="flex items-center gap-2"><StatusBadge status={review.sentiment} /><span className="font-black text-lime-700">{review.rating}/5</span></div>
              </div>
              <p className="mt-4 text-charcoal-600">{review.comment}</p>
              <p className="mt-4 rounded-2xl bg-lime-50 p-3 text-sm font-bold text-lime-800">{review.suggestion}</p>
            </SectionCard>
          ))}
        </div>
        <AIInsightCard insight={insights[3]} />
      </div>
    </div>
  );
}
