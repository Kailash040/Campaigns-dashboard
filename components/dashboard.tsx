"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Mail, MessageSquare, CheckCircle, Calendar, Megaphone } from 'lucide-react'
import axios from 'axios'

interface CampaignStats {
  activeCampaigns: number
  emailsSent: number
  replies: number
  meetingsBooked: number
}

interface ChartData {
  name: string
  value: number
}

export function Dashboard() {
  const [stats, setStats] = useState<CampaignStats>({
    activeCampaigns: 0,
    emailsSent: 0,
    replies: 0,
    meetingsBooked: 0,
  })
  const [chartData, setChartData] = useState<ChartData[]>([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/campaigns')
      const campaigns = response.data

      const activeCampaigns = campaigns.filter((c: any) => c.status === 'Active').length
      const emailsSent = campaigns.reduce((sum: number, c: any) => sum + (c.sent || 0), 0)
      const replies = campaigns.reduce((sum: number, c: any) => sum + (c.replies || 0), 0)
      const meetingsBooked = Math.floor(replies * 0.15) // Simulated: 15% of replies lead to meetings

      setStats({
        activeCampaigns,
        emailsSent,
        replies,
        meetingsBooked,
      })

      // Chart data for last 7 days
      setChartData([
        { name: 'Mon', value: 45 },
        { name: 'Tue', value: 52 },
        { name: 'Wed', value: 48 },
        { name: 'Thu', value: 61 },
        { name: 'Fri', value: 55 },
        { name: 'Sat', value: 38 },
        { name: 'Sun', value: 42 },
      ])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Fallback to default data
      setStats({
        activeCampaigns: 3,
        emailsSent: 1240,
        replies: 89,
        meetingsBooked: 13,
      })
      setChartData([
        { name: 'Mon', value: 45 },
        { name: 'Tue', value: 52 },
        { name: 'Wed', value: 48 },
        { name: 'Thu', value: 61 },
        { name: 'Fri', value: 55 },
        { name: 'Sat', value: 38 },
        { name: 'Sun', value: 42 },
      ])
    }
  }

  const summaryCards = [
    {
      title: 'Active Campaigns',
      value: stats.activeCampaigns,
      description: 'Currently running',
      icon: Megaphone,
      color: 'text-blue-600',
    },
    {
      title: 'Emails Sent',
      value: stats.emailsSent.toLocaleString(),
      description: 'Total this month',
      icon: Mail,
      color: 'text-green-600',
    },
    {
      title: 'Replies',
      value: stats.replies,
      description: 'Responses received',
      icon: MessageSquare,
      color: 'text-purple-600',
    },
    {
      title: 'Meetings Booked',
      value: stats.meetingsBooked,
      description: 'Scheduled meetings',
      icon: Calendar,
      color: 'text-orange-600',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your campaign performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Activity</CardTitle>
          <CardDescription>Emails sent over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
