import {BreadcrumbItem, Breadcrumbs, Button, User} from "@nextui-org/react";

export default function NavDashboard () {
    return (
        <header className={"fixed top-0 left-[17.5rem] right-0 border-b  bg-white border-l border-gray-100 hidden lg:block"}>
            <div className={"px-4 py-[20px] flex justify-between"}>
                <div className={"pt-3"}>
                    <Breadcrumbs>
                        <BreadcrumbItem>Dashboard</BreadcrumbItem>
                        <BreadcrumbItem>Overview</BreadcrumbItem>
                    </Breadcrumbs>
                </div>
                <div>
                    
                    <User name={"frankie mosehla"}
                          description={"frankie@gmail.com"}
                    />
                </div>
            </div>
        </header>
    )
}