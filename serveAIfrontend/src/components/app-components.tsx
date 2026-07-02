"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Bell,
  Bot,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Home,
  Hotel,
  Layers3,
  LogOut,
  Menu as MenuIcon,
  Minus,
  PackageCheck,
  Plus,
  QrCode,
  Search,
  Settings,
  ShoppingBag,
  Star,
  Trash2,
  Truck,
  Users,
  X,
} from "lucide-react";
import { ReactNode, useMemo, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store/cart-store";
import type { AIInsight, Category, MenuItem, Order, OrderStatus } from "@/types";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatTime } from "@/utils/formatTime";
import { generateInitials } from "@/utils/generateInitials";
import { orderStatuses, statusTone } from "@/utils/orderStatus";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {buttonVariants, Button} from "@/components/ui/button";


// export function Button({
//   children,
//   className,
//   variant = "primary",
//   ...props
// }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }) {
//   return (
//     <button
//       className={cn(
//         "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-lime-300 disabled:cursor-not-allowed disabled:opacity-50 ",
//         variant === "primary" && "bg-lime-400 text-charcoal-950 shadow-soft hover:bg-lime-300",
//         variant === "secondary" && "bg-charcoal-950 text-white hover:bg-charcoal-800",
//         variant === "ghost" && "bg-white text-charcoal-800 ring-1 ring-charcoal-100 hover:bg-charcoal-50",
//         variant === "danger" && "bg-rose-500 text-white hover:bg-rose-600",
//         className,
//       )}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }

export function SectionCard({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("rounded-3xl border border-charcoal-100 bg-white p-5 shadow-soft", className)}>{children}</section>;
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-lime-700">AI Hotel POS</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-charcoal-950 md:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-charcoal-500 md:text-base">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder = "Search" }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="relative block w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-charcoal-400" />
      <input
        aria-label={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-2xl border border-charcoal-100 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-lime-400 focus:ring-4 focus:ring-lime-100"
      />
    </label>
  );
}

// export function StatusBadge({ status }: { status: OrderStatus | string }) {
//   const className = orderStatuses.includes(status as OrderStatus)
//     ? statusTone(status as OrderStatus)
//     : "bg-charcoal-100 text-charcoal-700 border-charcoal-200";
//   return <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-bold", className)}>{status}</span>;
// }

export function StatusBadge({
  status,
}: {
  status: OrderStatus | string;
}) {
  let className = "";

  if (orderStatuses.includes(status as OrderStatus)) {
    className = statusTone(status as OrderStatus);
  } else if (status === "Active") {
    className =
      "bg-green-100 text-green-700 border-green-200";
  } else if (status === "Inactive") {
    className =
      "bg-red-100 text-red-700 border-red-200";
  } else if (status === "On Break") {
    className =
      "bg-yellow-100 text-yellow-700 border-yellow-200";
  } else if (status === "Offline") {
    className =
      "bg-slate-100 text-slate-700 border-slate-200";
  } else {
    className =
      "bg-charcoal-100 text-charcoal-700 border-charcoal-200";
  }

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-bold",
        className
      )}
    >
      {status}
    </span>
  );
}

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

export function StatCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: typeof BarChart3 }) {
  return (
    <SectionCard>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-charcoal-500">{label}</p>
          <p className="mt-3 text-3xl font-black text-charcoal-950">{value}</p>
          <p className="mt-2 text-xs font-semibold text-emerald-600">{detail}</p>
        </div>
        <div className="rounded-2xl bg-lime-100 p-3 text-lime-700">
          <Icon className="size-5" />
        </div>
      </div>
    </SectionCard>
  );
}

export function AIInsightCard({ insight }: { insight: AIInsight }) {
  const tones = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    danger: "bg-rose-50 text-rose-700 border-rose-100",
    info: "bg-sky-50 text-sky-700 border-sky-100",
  };

  return (
    <article className={cn("rounded-3xl border p-5", tones[insight.tone])}>
      <div className="flex items-center gap-3">
        <Bot className="size-5" />
        <h3 className="font-black">{insight.title}</h3>
      </div>
      <p className="mt-4 text-2xl font-black">{insight.value}</p>
      <p className="mt-2 text-sm leading-6 opacity-85">{insight.description}</p>
      <p className="mt-4 rounded-2xl bg-white/70 p-3 text-xs font-bold">{insight.action}</p>
    </article>
  );
}

// export function InlineStatusSelect({ value, onChange }: { value: OrderStatus; onChange: (value: OrderStatus) => void }) {
//   return (
//     <select
//       aria-label="Update order status"
//       value={value}
//       onChange={(event) => {
//         onChange(event.target.value as OrderStatus);
//         toast.success("Order status updated");
//       }}
//       className="h-10 rounded-xl border border-charcoal-100 bg-white px-3 text-xs font-bold text-charcoal-800 outline-none focus:border-lime-400 focus:ring-4 focus:ring-lime-100"
//     >
//       {orderStatuses.map((status) => (
//         <option key={status}>{status}</option>
//       ))}
//     </select>
//   );
// }

interface OrderCardProps {
  order: Order;
  editable?: boolean;
  isSelected: boolean;
  onSelectToggle: () => void;
}


export function OrderCard({ order, editable = false, isSelected, onSelectToggle }: OrderCardProps) {
  return (
    <article className={`rounded-3xl border p-4 shadow-soft transition-all duration-200 ${
      isSelected ? "border-primary bg-primary-50/20 ring-1 ring-primary/20" : "border-charcoal-100 bg-white"
    }`}>
      <div className="flex items-start justify-between gap-3">
        <FieldGroup>
          <Field orientation="horizontal" className="flex items-center">
            <Checkbox
              id={`checkbox-${order.id}`}
              name={`checkbox-${order.id}`}
              checked={isSelected}
              onCheckedChange={onSelectToggle}
              className="border-gray-600 data-[state=checked]:bg-primary"
            />
          </Field>
        </FieldGroup>
        
        {/* Render read-only badge directly since page controls routing */}
        <StatusBadge status={order.status} />
      </div>

      <div className="mt-2">
        <h3 className="font-black text-charcoal-950">{order.id}</h3>
        <p className="mt-1 text-sm text-charcoal-500">{order.room} · {order.guest}</p>
      </div>

      <div className="mt-4 space-y-2">
        {order.items.map((item) => (
          <div key={`${order.id}-${item.id}`} className="flex justify-between gap-3 text-sm">
            <span className="text-charcoal-600">{item.quantity}x {item.name}</span>
            <span className="font-bold">{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-charcoal-100 pt-4">
        <span className="text-xs font-bold text-charcoal-400">{formatTime(order.createdAt)} · {order.eta}</span>
        <span className="text-lg font-black text-charcoal-950">{formatCurrency(order.total)}</span>
      </div>
    </article>
  );
}

// export function OrderCard({ order, editable = false }: { order: Order; editable?: boolean }) {
//   const [status, setStatus] = useState(order.status);

//   return (
//     <article className="rounded-3xl border border-charcoal-100 bg-white p-4 shadow-soft">
//       {/* <div className="flex items-start justify-between gap-3"> */}
        
//         <div className="flex items-start justify-between gap-3">
//           <FieldGroup className="">
//             <Field orientation="horizontal">
//               <Checkbox
//                 id="terms-checkbox-basic"
//                 name="terms-checkbox-basic"
//                 className="border-gray-600"
//               />
//             </Field>
//           </FieldGroup>
//         {editable ? <InlineStatusSelect value={status} onChange={setStatus} /> : <StatusBadge status={status} />}

          
//         </div>
//         <div>
//           <h3 className="font-black text-charcoal-950">{order.id}</h3>
//           <p className="mt-1 text-sm text-charcoal-500">{order.room} · {order.guest}</p>
//         </div>
//       {/* </div> */}
//       <div className="mt-4 space-y-2">
//         {order.items.map((item) => (
//           <div key={`${order.id}-${item.id}`} className="flex justify-between gap-3 text-sm">
//             <span className="text-charcoal-600">{item.quantity}x {item.name}</span>
//             <span className="font-bold">{formatCurrency(item.price * item.quantity)}</span>
//           </div>
//         ))}
//       </div>
//       <div className="mt-4 flex items-center justify-between border-t border-charcoal-100 pt-4">
//         <span className="text-xs font-bold text-charcoal-400">{formatTime(order.createdAt)} · {order.eta}</span>
//         <span className="text-lg font-black text-charcoal-950">{formatCurrency(order.total)}</span>
//       </div>
//     </article>
//   );
// }



export function ProductCard({ item }: { item: MenuItem }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft">
      <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} aria-label={item.name} />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-black text-charcoal-950">{item.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm leading-5 text-charcoal-500">{item.description}</p>
          </div>
          <span className="rounded-full bg-lime-100 px-2 py-1 text-xs font-black text-lime-700">{item.rating}</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-black">{formatCurrency(item.price)}</p>
            <p className="text-xs font-semibold text-charcoal-400">{item.prepTime}</p>
          </div>
          <Button
            disabled={!item.available}
            onClick={() => {
              addItem(item);
              toast.success(`${item.name} added to cart`);
            }}
          >
            <Plus className="size-4" /> Add
          </Button>
        </div>
      </div>
    </article>
  );
}

export function QuantitySelector({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="inline-grid grid-cols-[36px_40px_36px] items-center rounded-xl border border-charcoal-100 bg-white">
      <button aria-label="Decrease quantity" className="grid h-9 place-items-center" onClick={() => onChange(value - 1)}>
        <Minus className="size-4" />
      </button>
      <span className="text-center text-sm font-black">{value}</span>
      <button aria-label="Increase quantity" className="grid h-9 place-items-center" onClick={() => onChange(value + 1)}>
        <Plus className="size-4" />
      </button>
    </div>
  );
}

export function CartSummary({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const lines = useCartStore((state) => state.lines);
  const subtotal = lines.reduce((sum, line) => sum + line.item.price * line.quantity, 0);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);

  if (!lines.length) return null;

  return (
    <div className={cn("sticky bottom-4 z-30 mx-auto max-w-3xl rounded-2xl bg-charcoal-950 p-3 text-white shadow-strong", compact && "bottom-0 rounded-none")}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold">{count} items</p>
          <p className="text-lg font-black">{formatCurrency(subtotal)}</p>
        </div>
        <Button onClick={() => router.push("/order/cart")}>
          <ShoppingBag className="size-4" /> View cart
        </Button>
      </div>
    </div>
  );
}

export function CartItem({ id, name, price, quantity }: { id: string; name: string; price: number; quantity: number }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-charcoal-100 bg-white p-4">
      <div>
        <h3 className="font-black">{name}</h3>
        <p className="text-sm font-semibold text-charcoal-500">{formatCurrency(price)}</p>
      </div>
      <div className="flex items-center gap-3">
        <QuantitySelector value={quantity} onChange={(next) => updateQuantity(id, next)} />
        <button aria-label={`Remove ${name}`} onClick={() => { removeItem(id); toast.success("Item removed"); }} className="rounded-xl p-2 text-rose-500 hover:bg-rose-50">
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
}

export function Timeline({ statuses, current }: { statuses: OrderStatus[]; current: OrderStatus }) {
  const activeIndex = statuses.indexOf(current);
  return (
    <ol className="space-y-4">
      {statuses.map((status, index) => (
        <li key={status} className="flex gap-3">
          <span className={cn("mt-1 size-3 rounded-full", index <= activeIndex ? "bg-lime-400" : "bg-charcoal-200")} />
          <div>
            <p className="font-bold text-charcoal-950">{status}</p>
            <p className="text-sm text-charcoal-500">{index <= activeIndex ? "Completed or in progress" : "Upcoming"}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ConfirmDialog({ label, onConfirm }: { label: string; onConfirm: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}><Trash2 className="size-4" /> Delete</Button>
      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-charcoal-950/40 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-strong">
            <h3 className="text-xl font-black">Delete {label}?</h3>
            <p className="mt-2 text-sm text-charcoal-500">This demo action is reversible once backend permissions are added.</p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => { onConfirm(); setOpen(false); toast.success(`${label} deleted`); }}>Confirm</Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function FilterBar({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-3 rounded-3xl border border-charcoal-100 bg-white p-3 shadow-soft md:flex-row md:items-center">{children}</div>;
}

export function MetricCard(props: { label: string; value: string; detail: string; icon: typeof BarChart3 }) {
  return <StatCard {...props} />;
}

export function DashboardCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <SectionCard>
      <h2 className="text-lg font-black text-charcoal-950">{title}</h2>
      <div className="mt-4">{children}</div>
    </SectionCard>
  );
}

export function MenuCard({ category }: { category: Category }) {
  return (
    <article className="rounded-3xl border border-charcoal-100 bg-white p-5 shadow-soft">
      <span className={cn("rounded-full px-3 py-1 text-xs font-black", category.accent)}>{category.itemCount} items</span>
      <h3 className="mt-4 text-xl font-black">{category.name}</h3>
      <p className="mt-2 text-sm leading-6 text-charcoal-500">{category.description}</p>
    </article>
  );
}

export function ReusableForm({ children }: { children: ReactNode }) {
  return <form className="grid gap-4 rounded-3xl border border-charcoal-100 bg-white p-5 shadow-soft">{children}</form>;
}

export function DataTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft">
      <table className="hidden w-full text-left text-sm md:table">
        <thead className="bg-charcoal-50 text-xs uppercase text-charcoal-500">
          <tr>{headers.map((header) => <th key={header} className="px-4 py-3 font-black">{header}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-charcoal-100">
          {rows.map((row, index) => (
            <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-4 align-middle">{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
      <div className="grid gap-3 p-3 md:hidden">
        {rows.map((row, index) => (
          <div key={index} className="rounded-2xl border border-charcoal-100 p-4">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className="flex justify-between gap-4 py-2 text-sm">
                <span className="font-bold text-charcoal-400">{headers[cellIndex]}</span>
                <span className="text-right">{cell}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/menu", label: "Menu", icon: ShoppingBag },
  { href: "/admin/categories", label: "Categories", icon: Layers3 },
  { href: "/admin/tables", label: "Tables", icon: Hotel },
  { href: "/admin/staff", label: "Staff", icon: Users },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/ai-insights", label: "AI Insights", icon: Bot },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/kitchen", label: "Kitchen", icon: ChefHat },
  { href: "/delivery", label: "Delivery", icon: Truck },
  { href: "/order", label: "Guest Order", icon: Home },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebar = (
    <aside className={cn("flex h-full flex-col border-r border-charcoal-100 bg-white p-4 transition-all", collapsed ? "w-20" : "w-72")}>
      <div className="flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-lime-400 text-charcoal-950"><ChefHat className="size-5" /></span>
          {!collapsed ? <span className="text-lg font-black text-charcoal-950">ServeAI POS</span> : null}
        </Link>
        <button aria-label="Collapse sidebar" onClick={() => setCollapsed(!collapsed)} className="hidden rounded-xl p-2 hover:bg-charcoal-50 lg:block">
          {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>
      </div>
      <nav className="mt-8 grid gap-2">
        {adminLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className={cn("flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold transition", active ? "bg-charcoal-950 text-white" : "text-charcoal-600 hover:bg-lime-50 hover:text-charcoal-950")}>
              <Icon className="size-5 shrink-0" />
              {!collapsed ? label : null}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-3xl bg-lime-100 p-4 text-charcoal-950">
        {!collapsed ? <><p className="text-sm font-black">AI shift brief</p><p className="mt-1 text-xs font-semibold text-charcoal-600">Lunch demand is above average. Keep biryani stock warm.</p></> : <Bot className="size-5" />}
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-charcoal-50">
      <div className="fixed inset-y-0 left-0 z-30 hidden lg:block">{sidebar}</div>
      {mobileOpen ? <div className="fixed inset-0 z-50 lg:hidden"><div className="absolute inset-0 bg-charcoal-950/40" onClick={() => setMobileOpen(false)} /><div className="relative h-full">{sidebar}</div></div> : null}
      <div className={cn("transition-all", collapsed ? "lg:pl-20" : "lg:pl-72")}>
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-charcoal-100 bg-white/90 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button aria-label="Open navigation" onClick={() => setMobileOpen(true)} className="rounded-xl p-2 hover:bg-charcoal-50 lg:hidden"><MenuIcon className="size-5" /></button>
            <div>
              <p className="text-sm font-black text-charcoal-950">Grand Lotus Hotel</p>
              <p className="text-xs font-semibold text-charcoal-500">Live ordering command center</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button aria-label="Notifications" className="rounded-2xl border border-charcoal-100 bg-white p-3"><Bell className="size-4" /></button>
            <Button variant="ghost" onClick={logout}><LogOut className="size-4" /> Logout</Button>
            <div className="grid size-10 place-items-center rounded-2xl bg-charcoal-950 text-sm font-black text-white">{generateInitials(user?.name ?? "Admin User")}</div>
          </div>
        </header>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();
  const { role, logout } = useAuth();
  const links = [
    { href: "/order", label: "Menu", icon: Home },
    { href: "/order/cart", label: "Cart", icon: ShoppingBag },
    { href: "/order/tracking", label: "Track", icon: Truck },
    ...(role === "waiter" || role === "admin" ? [{ href: "/delivery", label: "Delivery", icon: Truck }] : []),
  ];

  return (
    <nav className={cn("fixed inset-x-0 bottom-0 z-40 grid border-t border-charcoal-100 bg-white px-2 py-2 md:hidden", links.length === 4 ? "grid-cols-5" : "grid-cols-4")}>
      {links.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href} className={cn("grid place-items-center gap-1 rounded-2xl py-2 text-xs font-bold", pathname === href ? "bg-lime-100 text-charcoal-950" : "text-charcoal-500")}>
          <Icon className="size-5" /> {label}
        </Link>
      ))}
      <button onClick={logout} className="grid place-items-center gap-1 rounded-2xl py-2 text-xs font-bold text-charcoal-500">
        <LogOut className="size-5" /> Logout
      </button>
    </nav>
  );
}

export function RoleTopbar({ title, subtitle }: { title: string; subtitle: string }) {
  const pathname = usePathname();
  const { role, user, logout } = useAuth();
  const links = role === "chef"
    ? [{ href: "/kitchen", label: "Kitchen", icon: ChefHat }]
    : role === "waiter"
      ? [
          { href: "/order", label: "Order", icon: ShoppingBag },
          { href: "/delivery", label: "Delivery", icon: Truck },
        ]
      : [
          { href: "/admin/dashboard", label: "Admin", icon: BarChart3 },
          { href: "/kitchen", label: "Kitchen", icon: ChefHat },
          { href: "/delivery", label: "Delivery", icon: Truck },
          { href: "/order", label: "Order", icon: ShoppingBag },
        ];

  return (
    <header className="sticky top-0 z-30 border-b border-charcoal-100 bg-white/90 px-4 py-3 backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-lime-400 text-charcoal-950"><ChefHat className="size-5" /></span>
          <div>
            <p className="text-sm font-black text-charcoal-950">{title}</p>
            <p className="text-xs font-semibold text-charcoal-500">{subtitle}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {links.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={cn("inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold", pathname === href ? "bg-charcoal-950 text-white" : "bg-white text-charcoal-600 ring-1 ring-charcoal-100")}>
              <Icon className="size-4" /> {label}
            </Link>
          ))}
          <div className="grid size-10 place-items-center rounded-2xl bg-charcoal-950 text-sm font-black text-white">{generateInitials(user?.name ?? "User")}</div>
          <Button variant="ghost" onClick={logout}><LogOut className="size-4" /> Logout</Button>
        </div>
      </div>
    </header>
  );
}

export function AddItemDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}><Plus className="size-4" /> Add item</Button>
      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-charcoal-950/40 p-4 " role="dialog" aria-modal="true">
          <ReusableForm >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">Create menu item</h2>
              <button type="button" aria-label="Close dialog" onClick={() => setOpen(false)}><X className="size-5" /></button>
            </div>
            {["Item name", "Price", "Prep time"].map((label) => (
              <label key={label} className="grid gap-2 text-sm font-bold">
                {label}
                <input className="h-11 rounded-xl border border-charcoal-100 px-3 outline-none focus:border-lime-400" />
              </label>
            ))}
            <Button type="button" onClick={() => { setOpen(false); toast.success("Menu item created"); }}>Create item</Button>
          </ReusableForm>
        </div>
      ) : null}
    </>
  );
}

export const icons = { BarChart3, ClipboardList, Hotel, PackageCheck, CreditCard, QrCode, Truck, Star, Bot };

export function useFiltered<T extends { name?: string; id?: string }>(items: T[], query: string) {
  return useMemo(() => {
    const needle = query.toLowerCase();
    return items.filter((item) => `${item.name ?? ""} ${item.id ?? ""}`.toLowerCase().includes(needle));
  }, [items, query]);
}
