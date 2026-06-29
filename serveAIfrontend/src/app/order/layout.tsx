import { MobileNavigation} from "@/components/app-components";
import {RoleTopbar} from "@/components/common/RoleTopbar";


export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="hidden md:block">
        <RoleTopbar title="Guest Ordering" subtitle="Waiter order, cart, and tracking workspace" />
      </div>
      {children}
      <MobileNavigation />
    </div>
  );
}
