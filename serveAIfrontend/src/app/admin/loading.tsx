import { LoadingState } from "@/components/common/State";

export default function AdminLoading() {
  return <div className="p-8"><LoadingState label="Loading admin workspace" /></div>;
}
