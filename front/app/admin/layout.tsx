import React from "react";
import AdminNav from "../components/admin/AdminNav";

export const metadata = {
    title: "KLP Shop Admin",
    description: "KLP Shop Admin Dashboard"
};

const AdminLayout = ({children} : {children: React.ReactNode}) => {
    return( 
        <div>
           <AdminNav />
           {children}
        </div>
    )
}

export default AdminLayout;