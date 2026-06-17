import type { StaffMember } from "@/types";

export const staff: StaffMember[] = [
  { id: "s-1", name: "Meera Iyer", role: "Manager", status: "Active", shift: "08:00 - 17:00", phone: "+91 98765 11111" },
  { id: "s-2", name: "Rohan Das", role: "Kitchen", status: "Active", shift: "12:00 - 21:00", phone: "+91 98765 22222" },
  { id: "s-3", name: "Imran Khan", role: "Delivery", status: "On Break", shift: "10:00 - 19:00", phone: "+91 98765 33333" },
  { id: "s-4", name: "Sara Paul", role: "Admin", status: "Offline", shift: "16:00 - 01:00", phone: "+91 98765 44444" },
];
