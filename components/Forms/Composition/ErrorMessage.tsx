"use client";

import { useFormContext } from "react-hook-form";

interface ErrorMessageProps {
  field: string;
}

function get(obj: Record<any, any>, path: string) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      );

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

  return result;
}

export default function ErrorMessage({ field }: ErrorMessageProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const fieldError = get(errors, field);

  if (!fieldError) return null;

  return (
    <span className="mt-1 text-xs text-[#f9818e] absolute bottom-0 left-0 ">
      {fieldError.message?.toString()}
    </span>
  );
}
