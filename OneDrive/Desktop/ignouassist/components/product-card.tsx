"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Download, Eye, ShoppingCart, Heart } from "lucide-react"

interface ProductCardProps {
  id: string
  code: string
  title: string
  program: string
  semester: string
  price: number
  originalPrice?: number
  type: "free" | "premium"
  rating: number
  reviews: number
  downloads: number
  description: string
  image: string
  category: "assignment" | "note" | "paper"
}

export default function ProductCard({
  id,
  code,
  title,
  program,
  semester,
  price,
  originalPrice,
  type,
  rating,
  reviews,
  downloads,
  description,
  image,
  category,
}: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 bg-white">
      <CardContent className="p-2 lg:p-4">
        {/* Image Section */}
        <div className="relative mb-2 lg:mb-3">
          <Link href={`/${category}s/${id}`}>
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-32 lg:h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-1 lg:top-2 left-1 lg:left-2 flex flex-col gap-1">
            {type === "free" ? (
              <Badge className="bg-green-500 text-white text-xs px-1 py-0.5 lg:px-2 lg:py-1">FREE</Badge>
            ) : (
              <Badge className="bg-blue-500 text-white text-xs px-1 py-0.5 lg:px-2 lg:py-1">PREMIUM</Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-red-500 text-white text-xs px-1 py-0.5 lg:px-2 lg:py-1">-{discount}%</Badge>
            )}
          </div>

          {/* Wishlist */}
          <button className="absolute top-1 lg:top-2 right-1 lg:right-2 p-1 lg:p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
            <Heart className="h-3 w-3 lg:h-4 lg:w-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>

        {/* Content Section */}
        <div className="space-y-1 lg:space-y-2">
          {/* Title */}
          <Link href={`/${category}s/${id}`}>
            <h3 className="text-xs lg:text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {code} - {title}
            </h3>
          </Link>

          {/* Program & Semester */}
          <p className="text-xs text-gray-500">
            {program} • {semester} Semester
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 lg:h-4 lg:w-4 ${
                    i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">({reviews})</span>
          </div>

          {/* Downloads */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Download className="h-3 w-3" />
            <span>{downloads.toLocaleString()} downloads</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            {price === 0 ? (
              <span className="text-lg lg:text-xl font-bold text-green-600">FREE</span>
            ) : (
              <div className="flex items-center gap-1">
                <span className="text-lg lg:text-xl font-bold text-gray-900">₹{price}</span>
                {originalPrice && <span className="text-sm text-gray-500 line-through">₹{originalPrice}</span>}
              </div>
            )}
          </div>

          {/* Description - Hidden on mobile */}
          <p className="text-xs text-gray-600 line-clamp-2 hidden lg:block">{description}</p>

          {/* Action Buttons */}
          <div className="flex gap-1 lg:gap-2 pt-1 lg:pt-2">
            {type === "free" ? (
              <Button size="sm" className="flex-1 text-xs lg:text-sm h-7 lg:h-9">
                <Download className="mr-1 h-3 w-3 lg:h-4 lg:w-4" />
                Download
              </Button>
            ) : (
              <>
                <Button size="sm" className="flex-1 text-xs lg:text-sm h-7 lg:h-9">
                  <ShoppingCart className="mr-1 h-3 w-3 lg:h-4 lg:w-4" />
                  Buy Now
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs lg:text-sm h-7 lg:h-9 px-2 lg:px-3 bg-transparent"
                >
                  <Eye className="h-3 w-3 lg:h-4 lg:w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
