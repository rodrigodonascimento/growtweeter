import { Outlet } from "react-router";
import { DefaultLayoutStyle, MainContent } from "./styles";
import { SideBar } from "../components/SideBar";
import { RightSideMenu } from "../pages/RightSideMenu";

export function DefaultLayout() {
    return (
        <DefaultLayoutStyle>
            <SideBar />
            <MainContent>
                <Outlet />
            </MainContent>
            <RightSideMenu />
        </DefaultLayoutStyle>
    );
}