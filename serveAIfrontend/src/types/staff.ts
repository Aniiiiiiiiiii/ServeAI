export interface StaffMember {
  id: string;
  name: string;
  role: "Admin" | "Kitchen" | "Delivery" | "Manager";
  status: "Active" | "On Break" | "Offline";
  shift: string;
  phone: string;
}
