import { AuthContext } from "@/context/Authprovider";
import {BreadcrumbItem, Breadcrumbs, Button, User} from "@nextui-org/react";
import { useContext } from "react";

export default function NavDashboard () {

    const { currentuser } = useContext(AuthContext);


    return (
        <header className={"fixed top-0 left-[17.5rem] right-0 border-b  bg-white border-l border-gray-100 hidden lg:block"}>
            <div className={"px-4 py-[20px] flex justify-between"}>
                <div className={"pt-3"}>
                    <Breadcrumbs>
                        <BreadcrumbItem><span className="font-semibold">Dashboard</span></BreadcrumbItem>
                        <BreadcrumbItem><span className="font-semibold text-customBlue">Overview</span></BreadcrumbItem>
                    </Breadcrumbs>
                </div>
                <div>
                    
                    <User name={currentuser?.username}
                          description={currentuser?.email}
                    />
                </div>
            </div>
        </header>
    )
}