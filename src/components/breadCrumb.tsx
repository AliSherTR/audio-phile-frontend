import Link from "next/link";
import React from "react";

interface Props {
    pathname: string;
}

export const Breadcrumb = ({ pathname }: Props) => {
    const pathSegments = pathname.split("/").filter(Boolean); // Split and remove empty segments

    const breadcrumb = pathSegments.map((segment, index) => {
        const routeTo = `/${pathSegments.slice(0, index + 1).join("/")}`; // Build the route for each segment
        const segmentLabel = segment.charAt(0).toUpperCase() + segment.slice(1); // Capitalize segment

        return (
            <h1 className=" font-semibold text-lg" key={routeTo}>
                {index > 0 && " > "}
                <Link href={routeTo}>{segmentLabel}</Link>
            </h1>
        );
    });

    return (
        <nav className=" flex gap-3" aria-label="breadcrumb">
            {breadcrumb}
        </nav>
    );
};
