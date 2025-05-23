import SideNavLayout from "@/components/admin/sidenavlayout";

export default function Layout({ children } : { children: React.ReactNode }) {
    return (
        <div className="bg-slate-100 min-h-screen">
            <SideNavLayout>
                { children }
            </SideNavLayout>
        </div>
    );
};
