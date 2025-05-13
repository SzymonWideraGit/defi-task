import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { Favourites } from "./components/Favourites";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home/>} />
            <Route path="favourites" element={<Favourites/>}/>
        </Route>
    )
);

export default router;