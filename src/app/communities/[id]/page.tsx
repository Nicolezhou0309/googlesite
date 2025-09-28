import React from 'react'
import CommunityDetail from '@/components/CommunityDetail'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CommunityDetailPage({ params }: PageProps) {
  const { id: communityId } = await params

  return <CommunityDetail communityId={communityId} />
}

export async function generateStaticParams() {
  const communities = [
    'zhonghuan-hutai',
    'pujiang-center',
    'pujiang-park',
    'north-hongqiao',
    'jingan-center',
    'hongqiao',
    'jiading-nanxiang',
    'jingan',
    'songjiang',
    'west-hongqiao'
  ]

  return communities.map((id) => ({
    id: id,
  }))
}
