"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Mail, MessageSquare } from 'lucide-react'
import axios from 'axios'

interface Campaign {
  id: string
  name: string
  type: 'Email' | 'WhatsApp'
  description: string
  status: 'Active' | 'Paused' | 'Completed'
  sent: number
  replies: number
  createdAt: string
}

export function CampaignDetails({ campaignId }: { campaignId: string }) {
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchCampaignDetails()
  }, [campaignId])

  const fetchCampaignDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/campaigns/${campaignId}`)
      setCampaign(response.data)
    } catch (error) {
      console.error('Error fetching campaign details:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading campaign details...</p>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Campaign not found
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'Completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{campaign.name}</h1>
              <p className="text-muted-foreground mt-1">
                {campaign.type} Campaign
              </p>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                campaign.status
              )}`}
            >
              {campaign.status}
            </span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {campaign.type === 'Email' ? (
                  <Mail className="h-5 w-5" />
                ) : (
                  <MessageSquare className="h-5 w-5" />
                )}
                Campaign Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Type</p>
                <p className="text-lg font-semibold">{campaign.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p className="text-lg font-semibold">{campaign.status}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created At</p>
                <p className="text-lg font-semibold">
                  {new Date(campaign.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Messages Sent</p>
                <p className="text-2xl font-bold">{campaign.sent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Replies</p>
                <p className="text-2xl font-bold">{campaign.replies.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reply Rate</p>
                <p className="text-2xl font-bold">
                  {campaign.sent > 0
                    ? ((campaign.replies / campaign.sent) * 100).toFixed(1)
                    : '0'}%
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
            <CardDescription>Campaign goals and objectives</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{campaign.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

