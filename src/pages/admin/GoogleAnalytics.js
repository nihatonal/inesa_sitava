import React, { useState } from 'react'
import Container from '../../components/Container'
import AdminPageHeader from './AdminPageHeader'
import { DashboardHeader } from './analytics/DashboardHeader'
import Overview from './analytics/Overview'
import { TopLocations } from './analytics/TopLocations'
import TopPagesAndSessions from './analytics/TopPagesAndSessions'
import { TrafficOverview } from './analytics/TrafficOverview'

const GoogleAnalytics = () => {
  const [period, setPeriod] = useState("weekly");
  const onChange = (e) => {
    setPeriod(e.target.id)
  }

  return (
    <div className='bg-[#F9F9FA]'>
      <Container className={'pb-24 md:pb-12 '}>
        <AdminPageHeader />
        <div className='px-4 pb-8 space-y-8'>
          <DashboardHeader period={period} onChange={onChange} />
          <Overview period={period} />
          <TrafficOverview period={period} />
          <TopPagesAndSessions period={period} />
          <TopLocations period={period} />
        </div>

      </Container>
    </div>
  )
}

export default GoogleAnalytics