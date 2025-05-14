import { ReactNode } from "react";

export interface IProtectedRoute {
    children: ReactNode;
}

interface RouteChildren {
    path: string;
    element: React.ElementType;
}

export interface IRouteConfig {
path: string;
layout: React.ElementType;
guard?: React.ElementType;
element?: React.ElementType;
redirectTo?: string;
children: RouteChildren[];
}