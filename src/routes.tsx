import { createBrowserRouter, Navigate } from "react-router";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Sigin } from "./pages/Signin";
import { FoYou } from "./pages/FoYou";
import { Explorer } from "./pages/Explorer";
import { Following } from "./pages/Following";
import { Topics } from "./pages/Topics";
import { Replies } from "./pages/Replies";
import { Media } from "./pages/Media";
import { Likes } from "./pages/Likes";
import { ProtectedRouter } from "./components/ProtectedRouter";
import { FeedHeader } from "./components/FeedHeader";
import { ProfileHeader } from "./components/ProfileHeader";
import { MyTweets } from './components/MyTweets/index';
import { ExploreUsers } from "./components/ExplorerUsers";

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
                element: <FeedHeader />,
                children: [
                    {
                        index: true,
                        element: <FoYou />
                    },
                    {
                        path: 'explore-users',
                        element: <ExploreUsers />
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
                path: 'profile/:userId?',
                element: <ProfileHeader />,
                children: [
                    {
                        index: true,
                        element: <MyTweets />
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