import AdminSideNav from "@/components/admin/admin-sidenav";

export default function Layout({ children } : { children: React.ReactNode }) {
  return (
    <div className="bg-slate-100 min-h-screen">
      <AdminSideNav>
        { children }
      </AdminSideNav>
    </div>
  );
};
