import type { Metadata } from 'next'
import { SlidingNavbar } from '@/components/sliding-navbar'
import { getMaterialListings } from '@/lib/materials'
import { MaterialsClient } from './materials-client'

export const metadata: Metadata = {
  title: 'IGNOU Assignment, Notes and Books Marketplace',
  description:
    'Upload, sell, or share IGNOU assignments, notes, books, solved papers, and study materials with students.',
  keywords: [
    'IGNOU assignment upload',
    'IGNOU notes marketplace',
    'IGNOU books',
    'IGNOU solved assignments',
    'IGNOU study materials',
  ],
}

export default async function MaterialsPage() {
  const materials = await getMaterialListings()

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SlidingNavbar />
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">IGNOU Study Material Marketplace</h1>
          <p className="mt-2 max-w-3xl text-gray-600">
            Share free resources or sell approved assignments, notes, books, and exam preparation material.
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <MaterialsClient initialMaterials={materials} />
      </div>
    </main>
  )
}

