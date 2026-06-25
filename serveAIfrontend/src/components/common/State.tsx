
import {
  Menu as MenuIcon,
  PackageCheck,
} from "lucide-react";

export function LoadingState({ label = "Loading workspace" }: { label?: string }) {
  return (
    <div className="grid min-h-48 place-items-center rounded-3xl border border-dashed border-charcoal-200 bg-white/70">
      <div className="text-center text-sm font-semibold text-charcoal-500">{label}...</div>
    </div>
  );
}

export function EmptyState({ title = "No records yet", description = "New activity will appear here." }: { title?: string; description?: string }) {
  return (
    <div className="grid min-h-44 place-items-center rounded-3xl border border-dashed border-charcoal-200 bg-white p-6 text-center">
      <div>
        <PackageCheck className="mx-auto size-8 text-lime-500" />
        <h3 className="mt-3 text-base font-bold text-charcoal-950">{title}</h3>
        <p className="mt-1 text-sm text-charcoal-500">{description}</p>
      </div>
    </div>
  );
}

export function ErrorState({ message = "Something went wrong" }: { message?: string }) {
  return <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">{message}</div>;
}