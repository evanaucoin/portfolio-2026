"use client";

import Image from "next/image";
import Link from "next/link";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/components/ui/cn";

interface ProjectCardProps {
  title: string;
  description: string;
  iconName: string;
  imagePath: string;
  href: string;
}

export default function ProjectCard({
  title,
  description,
  iconName,
  imagePath,
  href,
}: ProjectCardProps) {
  const Icon = Icons[iconName as keyof typeof Icons] as React.ElementType;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full"
    >
      <Link
        href={href}
        className={cn(
          "flex h-[360px] w-full overflow-hidden rounded-[40px]",
          "border border-[oklch(0.28_0_0)]",
          "bg-[oklch(0.18_0_0)]"
        )}
      >
        {/* Left Section */}
        <div className="flex w-1/2 flex-col p-10">
          {/* Top-left: Icon + Title */}
          <div className="flex flex-col gap-3">
            {Icon && (
              <Icon
                size={28}
                strokeWidth={1.5}
                className="text-[oklch(0.96_0_0)]"
              />
            )}
            <h3 className="text-xl font-semibold tracking-tight text-[oklch(0.96_0_0)]">
              {title}
            </h3>
          </div>

          {/* Bottom-left: Description */}
          <p className="mt-auto text-sm leading-relaxed text-[oklch(0.62_0_0)]">
            {description}
          </p>
        </div>

        {/* Right Section — edge-to-edge image */}
        <div className="relative w-1/2 overflow-hidden">
          <Image
            src={imagePath}
            alt={`${title} mockup`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-left-top"
          />
        </div>
      </Link>
    </motion.div>
  );
}
