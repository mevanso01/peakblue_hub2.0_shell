import * as React from "react";

export function Card({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>;
}

export function CardHeader({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return <div className={`border-b px-6 py-4 ${className}`}>{children}</div>;
}

export function CardContent({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardTitle({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>;
}
