interface StatCardProps {
  /** Title text to display in the card */
  title: string;
  /** Value to display prominently in the card */
  value: string;
  /** Optional CSS classes to apply to the card */
  className?: string;
}

/**
 * StatCard component displays a statistic with a title and value in a card format
 *
 * @param {StatCardProps} props - Component props
 * @param {string} props.title - Title text to display in the card
 * @param {string} props.value - Value to display prominently in the card
 * @param {string} [props.className] - Optional CSS classes to apply to the card
 * @returns {JSX.Element} A card displaying a statistic
 */
export function StatCard({ title, value, className = "" }: StatCardProps) {
  return (
    <div
      data-testid="stat-card"
      className={`bg-[#1e2327] rounded-xl p-4 md:p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm md:text-base text-gray-400">{title}</h3>
      </div>
      <p className="text-xl md:text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
