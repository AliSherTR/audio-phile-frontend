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
            <h1 className=" font-semibold text-xs" key={routeTo}>
                {index > 0 && " > "}
                <Link href={routeTo}>{segmentLabel}</Link>
            </h1>
        );
    });

    return (
        <nav
            className=" ml-10 flex items-center gap-2 md:ml-0 md:mt-0 mt-2"
            aria-label="breadcrumb"
        >
            {breadcrumb}
        </nav>
    );
};
