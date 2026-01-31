import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Search, Filter, Briefcase, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const Dashboard = () => {
  // Dummy data - replace this with your 'jobs' state from API
  const [jobs] = useState([
    { _id: '1', company: 'Google', position: 'Frontend Engineer', status: 'interview', date: '2025-01-20' },
    { _id: '2', company: 'Meta', position: 'React Dev', status: 'pending', date: '2025-01-22' },
    { _id: '3', company: 'Amazon', position: 'Fullstack', status: 'rejected', date: '2025-01-25' },
    { _id: '4', company: 'Netflix', position: 'Senior Engineer', status: 'accepted', date: '2025-01-28' },
  ]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filter Logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(search.toLowerCase()) || 
                          job.position.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Stats Logic
  const stats = [
    { label: 'Total Apps', value: jobs.length, icon: Briefcase, color: 'border-blue-500' },
    { label: 'Interviews', value: jobs.filter(j => j.status === 'interview').length, icon: Clock, color: 'border-yellow-400' },
    { label: 'Offers', value: jobs.filter(j => j.status === 'accepted').length, icon: CheckCircle, color: 'border-green-500' },
  ];

  // Chart Data
  const chartData = [
    { name: 'Pending', count: jobs.filter(j => j.status === 'pending').length, color: '#FACC15' },
    { name: 'Interview', count: jobs.filter(j => j.status === 'interview').length, color: '#3B82F6' },
    { name: 'Rejected', count: jobs.filter(j => j.status === 'rejected').length, color: '#DC2626' },
    { name: 'Accepted', count: jobs.filter(j => j.status === 'accepted').length, color: '#10B981' },
  ];

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Career Dashboard</h1>

        {/* Quick Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${stat.color} flex items-center justify-between`}>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className="w-10 h-10 text-gray-300" />
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 h-80">
          <h3 className="font-bold text-gray-700 mb-4">Application Progress</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search companies or roles..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select 
            className="p-2 border border-gray-200 rounded-lg outline-none bg-white cursor-pointer"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
            <option value="accepted">Accepted</option>
          </select>
        </div>

        {/* Job List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map(job => (
            <div key={job._id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-lg text-gray-900">{job.position}</h4>
                  <p className="text-gray-500">{job.company}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  job.status === 'accepted' ? 'bg-green-100 text-green-600' :
                  job.status === 'rejected' ? 'bg-red-100 text-red-600' :
                  job.status === 'interview' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {job.status}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-400 gap-2">
                <Calendar className="w-4 h-4" />
                {job.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;