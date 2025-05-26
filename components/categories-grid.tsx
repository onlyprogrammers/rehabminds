import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

type Service = {
  category: string
  image: any
  subcategories: {
    name: string
    about: {
      description: string
      instructions: string[]
      benefits: string
    }
  }[]
}

interface CategoriesGridProps {
  services: Service[]
}

export function CategoriesGrid({ services }: CategoriesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <Link
          href={`/category/${service.category}`}
          key={index}
          className="transition-transform hover:scale-105"
        >
          <Card className="h-full border-2 hover:border-secondary bg-gradient-to-b from-white to-blue-50">
            <CardHeader className="bg-primary text-white rounded-t-lg flex-row items-center">
              <Image src={service.image?service.image:""} alt="img" height={39} className="mx-2" />
              <div>

                <CardTitle>{service.category}</CardTitle>
                <CardDescription className="text-blue-100">
                  {service.subcategories.length} services available
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                {service.subcategories.slice(0, 3).map((subcategory, idx) => (
                  <li key={idx} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-secondary mr-2"></div>
                    <span>{subcategory.name}</span>
                  </li>
                ))}
                {service.subcategories.length > 3 && (
                  <li className="text-primary font-medium mt-2">+ {service.subcategories.length - 3} more services</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
