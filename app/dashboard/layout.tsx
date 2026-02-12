import DashboardSidebar from "../layout/DashboardSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <DashboardSidebar/>
    </div>
  );
}
