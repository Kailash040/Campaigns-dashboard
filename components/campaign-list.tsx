"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Eye } from 'lucide-react'
import { CreateCampaignDialog } from '@/components/create-campaign-dialog'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import Link from 'next/link'

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

export function CampaignList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3001/api/campaigns')
      setCampaigns(response.data)
    } catch (error) {
      console.error('Error fetching campaigns:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch campaigns. Using fallback data.',
        variant: 'destructive',
      })
      // Fallback data
      setCampaigns([
        {
          id: '1',
          name: 'Q4 Product Launch',
          type: 'Email',
          description: 'Launch campaign for new product',
          status: 'Active',
          sent: 450,
          replies: 32,
          createdAt: '2024-01-15',
        },
        {
          id: '2',
          name: 'Customer Retention',
          type: 'WhatsApp',
          description: 'Re-engage existing customers',
          status: 'Active',
          sent: 230,
          replies: 18,
          createdAt: '2024-01-20',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleCampaignCreated = () => {
    fetchCampaigns()
    setIsDialogOpen(false)
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage and track your marketing campaigns
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Campaign
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>
            {campaigns.length} campaign{campaigns.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading campaigns...
            </div>
          ) : campaigns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No campaigns found. Create your first campaign to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Name</th>
                    <th className="text-left p-4 font-medium">Type</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Sent</th>
                    <th className="text-left p-4 font-medium">Replies</th>
                    <th className="text-left p-4 font-medium">Created At</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">{campaign.name}</td>
                      <td className="p-4">{campaign.type}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                            campaign.status
                          )}`}
                        >
                          {campaign.status}
                        </span>
                      </td>
                      <td className="p-4">{campaign.sent}</td>
                      <td className="p-4">{campaign.replies}</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(campaign.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <Link href={`/campaigns/${campaign.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <CreateCampaignDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={handleCampaignCreated}
      />
    </div>
  )
}

