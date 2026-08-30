"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  currentPage?: string;
}

export default function Breadcrumb({ currentPage = "Ngữ pháp" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-[#766A61] py-1">
      <Link href="/dashboard" className="hover:text-[#D85C4C] transition-colors">
        Trang chủ
      </Link>
      <span className="text-[#E7D9CC]">/</span>
      <span className="text-[#D85C4C] font-extrabold">{currentPage}</span>
    </nav>
  );
}
