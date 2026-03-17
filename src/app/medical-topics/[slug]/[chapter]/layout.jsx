import React from 'react'
import Sidebar from './SideBar'

export default function layout({ children }) {
  return (
    <main className="max-w-7xl mx-auto px-4 gap-5 sm:px-6 lg:px-8 py-12 grid grid-cols-12">

      <div className="col-span-3">
        <div className="sticky top-12">
          <Sidebar />
        </div>
      </div>

      <div className="col-span-9">
        {children}
      </div>

    </main>
  )
}
