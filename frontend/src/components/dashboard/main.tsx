import {ReactElement} from "react";
import {Outlet} from "react-router-dom";

export default function Content() : ReactElement {
    return (
        <main className={"lg:ps-[18rem] pt-[5rem]"}>
            <Outlet />
        </main>
    )
}