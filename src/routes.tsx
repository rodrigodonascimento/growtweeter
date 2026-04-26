import { createBrowserRouter, Navigate } from "react-router";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Sigin } from "./pages/Signin";
import { Feed } from "./pages/Feed";
import { FoYou } from "./pages/FoYou";
import { Explorer } from "./pages/Explorer";
import { Following } from "./pages/Following";
import { Topics } from "./pages/Topics";
import { Profile } from "./pages/Profile";
import { Tweets } from "./pages/Tweets";
import { Replies } from "./pages/Replies";
import { Media } from "./pages/Media";
import { Likes } from "./pages/Likes";
import { ProtectedRouter } from "./components/ProtectedRouter";

export const routes = createBrowserRouter([
    {
        path: '/login',
        element: <Sigin />
    },
    {
        path: '/',
        element: (
            <ProtectedRouter>
                <DefaultLayout />
            </ProtectedRouter>
        ),
        children: [
            {
                path: '',
                element: <Feed />,
                children: [
                    {
                        index: true,
                        element: <FoYou />
                    },
                    {
                        path: 'following',
                        element: <Following />
                    }
                ]
            },
            {
                path: 'explore',
                element: <Explorer />,
                children: [
                    {
                        index: true,
                        element: <Topics />
                    }
                ]
            },
            {
                path: 'profile',
                element: <Profile />,
                children: [
                    {
                        index: true,
                        element: <Tweets />
                    },
                    {
                        path: 'replies',
                        element: <Replies />
                    },
                    {
                        path: 'media',
                        element: <Media />
                    },
                    {
                        path: 'likes',
                        element: <Likes />
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to={'/login'} />
    }
]);