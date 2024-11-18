interface DashboardStatsProps {
  title: string
  value: string
  icon: string
}

export default function DashboardStats({ 
  title, 
  value, 
  icon 
}: DashboardStatsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
      <div className="text-4xl mr-4">{icon}</div>
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}
