import SideNavLayout from "@/components/admin/sidenavlayout";

export default function Layout({ children } : { children: React.ReactNode }) {
    return (
        <div className="bg-gray-100 h-screen">
            <SideNavLayout>
                { children }
            </SideNavLayout>
        </div>
    );
};
