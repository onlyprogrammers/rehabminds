import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { services } from "@/data/services"
import { CategoryDetails } from "@/components/category-details"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return services.map((service) => ({
    slug: encodeURIComponent(service.category),
  }))
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug)
  const categoryData = services.find((service) => service.category === decodedSlug)

  if (!categoryData) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 font-medium">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to all categories
      </Link>

      <h1 className="text-4xl font-bold tracking-tight mb-2 text-primary">{categoryData.category}</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Explore our range of {categoryData.category.toLowerCase()} services designed to support your mental health
        journey.
      </p>

      <CategoryDetails category={categoryData} />
    </main>
  )
}
