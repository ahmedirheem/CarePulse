import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import StatCard from '@/components/StatCard'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'
import DataTable from '@/components/table/DataTable'
import {columns} from '@/components/table/columns'

const AdminDashboard = async () => {
  const appointments = await getRecentAppointmentList();  

  return (
    <div className='mx-auto flex flex-col space-y-14 max-w-7xl'>
      <header className='admin-header'>
        <Link href='/'>
          <Image
            src='/assets/icons/logo-full.svg'
            height={32}
            width={162}
            alt='Logo'
          />
        </Link>
        <p className='text-16-semibold'>Admin Dashboard</p>
      </header>

      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h2 className='header'>Welcome, Admin 👋</h2>
          <p className='text-gray-500'>Starting the day with managing new appointments</p>
        </section>

        <section className='admin-stat'>
          <StatCard type='appointments' label='Scheduled appointments' count={appointments.scheduledCount} icon='/assets/icons/appointments.svg' />
          <StatCard type='pending' label='Pending appointments' count={appointments.pendingCount} icon='/assets/icons/pending.svg' />
          <StatCard type='cancelled' label='Cancelled appointments' count={appointments.cancelledCount} icon='/assets/icons/cancelled.svg' />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  )
}

export default AdminDashboard
