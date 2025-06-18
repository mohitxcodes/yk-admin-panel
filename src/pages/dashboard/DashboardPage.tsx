import { motion } from 'framer-motion';

function DashboardPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800 p-8"
        >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text mb-6">
                Dashboard Overview
            </h1>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sample Cards */}
                {[
                    { title: 'Total Users', value: '1,234', change: '+12%' },
                    { title: 'Revenue', value: '$45,678', change: '+8%' },
                    { title: 'Active Sessions', value: '892', change: '+23%' },
                ].map((card, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
                    >
                        <h3 className="text-gray-400 text-sm mb-2">{card.title}</h3>
                        <div className="flex items-end justify-between">
                            <p className="text-2xl font-semibold">{card.value}</p>
                            <span className="text-green-400 text-sm">{card.change}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                    <div className="space-y-4">
                        {[
                            { action: 'New user registered', time: '2 minutes ago' },
                            { action: 'System update completed', time: '1 hour ago' },
                            { action: 'Database backup', time: '3 hours ago' },
                        ].map((activity, index) => (
                            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                                <span className="text-gray-300">{activity.action}</span>
                                <span className="text-gray-500 text-sm">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default DashboardPage;
