import React from "react";
import { LucideProps } from "lucide-react";

export interface sideBarLink {
    name: string;
    href: string;
    icon: React.FC<LucideProps>;
}
