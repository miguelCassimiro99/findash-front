import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="card bg-card-color rounded-[8px] w-full flex flex-col items-start justify-center md:justify-end md:items-start p-1 md:p-2 h-[72px] md:h-[100px]">
      {children}
    </div>
  );
}
