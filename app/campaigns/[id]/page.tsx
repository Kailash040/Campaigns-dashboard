import { DashboardLayout } from '@/components/dashboard-layout'
import { CampaignDetails } from '@/components/campaign-details'

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <DashboardLayout>
      <CampaignDetails campaignId={id} />
    </DashboardLayout>
  )
}

