import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

interface CategoryDetailsProps {
  category: {
    subcategories: {
      name: string
      about: {
        description: string
        instructions: string[]
        benefits: string
      }
    }[]
  }
}

import { Button } from "@/components/ui/button"

export function CategoryDetails({ category }: CategoryDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {category.subcategories.map((subcategory, index) => (
        <Card key={index} className="overflow-hidden border-2 border-blue-100 shadow-md h-full flex flex-col">
          <CardHeader className="bg-primary text-white">
            <CardTitle>{subcategory.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4 flex-grow flex flex-col">
            <div>
              <h3 className="text-lg font-medium mb-2 text-primary">About</h3>
              <p className="text-gray-700">{subcategory.about.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2 text-primary">Instructions</h3>
              <ul className="space-y-2">
                {subcategory.about.instructions.map((instruction, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
              <h3 className="text-lg font-medium mb-2 text-primary">Benefits</h3>
              <p className="text-gray-700 bg-accent/50 p-3 rounded-md border border-secondary/30">
                {subcategory.about.benefits}
              </p>
            </div>

            <Button className="w-full bg-secondary hover:bg-secondary/90 text-gray-900 font-medium mt-4">
              Get Consultation
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
