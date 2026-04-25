import { Outlet } from "react-router";
import { DefaultLayoutStyle } from "./styles";
import { SideBar } from "../components/SideBar";
import { RightSideMenu } from "../pages/RightSideMenu";

export function DefaultLayout() {
    return (
        <DefaultLayoutStyle>
            <SideBar />
            <Outlet />
            <RightSideMenu />
        </DefaultLayoutStyle>
    );
}