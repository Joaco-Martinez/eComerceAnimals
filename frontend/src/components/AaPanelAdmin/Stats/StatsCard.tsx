interface StatsCardProps {
  title: string;
  value: string | number;
}

export const StatsCard = ({ title, value }: StatsCardProps) => (
  <div className="bg-white shadow-md rounded-xl p-4">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold text-punky-green">{value}</h2>
  </div>
);
