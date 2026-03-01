"use client";

import { useState, useEffect } from "react";
import {
  Users,
  FileText,
  Eye,
  TrendingUp,
  Clock,
  BookOpen,
  Activity,
  Database
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTopics: 0,
    totalProcedures: 0,
    totalResources: 0,
    totalViews: 0,
    pendingReviews: 0
  });

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        // Simulated data - replace with actual API call
        setStats({
          totalUsers: 1234,
          totalTopics: 56,
          totalProcedures: 89,
          totalResources: 234,
          totalViews: 45200,
          pendingReviews: 12
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, change, color }) => (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          {change && (
            <p className="mt-2 text-sm text-green-600 flex items-center">
              <TrendingUp className="inline h-4 w-4 mr-1" />
              {change} from last month
            </p>
          )}
        </div>
        <div className={`rounded-full ${color} p-3`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "created a new medical topic",
      time: "5 minutes ago",
      icon: BookOpen,
      color: "bg-blue-500"
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "updated procedure guidelines",
      time: "1 hour ago",
      icon: Activity,
      color: "bg-green-500"
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "added new resources",
      time: "3 hours ago",
      icon: Database,
      color: "bg-purple-500"
    },
    {
      id: 4,
      user: "Sarah Williams",
      action: "reviewed pending content",
      time: "5 hours ago",
      icon: Clock,
      color: "bg-yellow-500"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Download Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          change="+12%"
          color="bg-blue-500"
        />
        <StatCard
          title="Medical Topics"
          value={stats.totalTopics}
          icon={BookOpen}
          change="+8%"
          color="bg-green-500"
        />
        <StatCard
          title="Procedures"
          value={stats.totalProcedures}
          icon={Activity}
          change="+15%"
          color="bg-purple-500"
        />
        <StatCard
          title="Resources"
          value={stats.totalResources}
          icon={Database}
          change="+23%"
          color="bg-yellow-500"
        />
        <StatCard
          title="Total Views"
          value={(stats.totalViews / 1000).toFixed(1) + 'K'}
          icon={Eye}
          change="+31%"
          color="bg-indigo-500"
        />
        <StatCard
          title="Pending Reviews"
          value={stats.pendingReviews}
          icon={Clock}
          color="bg-red-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Link
                href="/dashboard/admin/medical-topics/new"
                className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50"
              >
                <BookOpen className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm text-gray-700">New Topic</span>
              </Link>
              <Link
                href="/dashboard/admin/procedures/new"
                className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50"
              >
                <Activity className="h-6 w-6 text-green-600 mb-2" />
                <span className="text-sm text-gray-700">New Procedure</span>
              </Link>
              <Link
                href="/dashboard/admin/resources/new"
                className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50"
              >
                <Database className="h-6 w-6 text-purple-600 mb-2" />
                <span className="text-sm text-gray-700">Add Resource</span>
              </Link>
              <Link
                href="/dashboard/admin/users/new"
                className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50"
              >
                <Users className="h-6 w-6 text-yellow-600 mb-2" />
                <span className="text-sm text-gray-700">Add User</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`rounded-full ${activity.color} p-2`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}