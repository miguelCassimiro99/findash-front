interface ValueDescriptionProps {
  isMonetary: boolean;
  countValue: number;
  description: string;
}

export default function ValueDescription({
  isMonetary,
  countValue,
  description,
}: ValueDescriptionProps) {
  function parseValue(itemValue: number) {
    if (itemValue >= 1000000) return (itemValue / 1000000).toFixed(1) + "M";
    if (itemValue >= 1000) return (itemValue / 1000).toFixed(1) + "k";

    return itemValue;
  }
  return (
    <>
      <div className="flex justify-start items-end text-gray-200 gap-1">
        {isMonetary && <span className="text-xs md:text-lg">R$</span>}
        <span className="value text-2xl md:text-5xl lg:text-4xl">
          {parseValue(countValue)}
        </span>
      </div>
      <span className="description text-xs md:text-sm text-gray-100">
        {description}
      </span>
    </>
  );
}
