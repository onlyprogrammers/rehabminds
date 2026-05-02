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
  linkPrefix?: string
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
  linkPrefix,
}: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  // Determine the correct link based on whether linkPrefix is provided
  const itemLink = linkPrefix ? `${linkPrefix}/${id}` : `/${category}s/${id}`

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 bg-white">
      <CardContent className="p-1.5">
        {/* Image Section */}
        <div className="relative mb-1.5">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-20 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
            />

          {/* Badges */}
          <div className="absolute top-0.5 left-0.5 flex flex-col gap-0.5">
            {type === "free" ? (
              <Badge className="bg-green-500 text-white text-[10px] px-0.5 py-0">FREE</Badge>
            ) : (
              <Badge className="bg-blue-500 text-white text-[10px] px-0.5 py-0">PREMIUM</Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-red-500 text-white text-[10px] px-0.5 py-0">-{discount}%</Badge>
            )}
          </div>

          {/* Programme Tag - Right Corner */}
          <div className="absolute top-0.5 right-0.5">
            <Badge className="bg-slate-800 text-white text-[10px] px-0.5 py-0 font-bold">
              {program}
            </Badge>
          </div>

          {/* Wishlist - Moved to below programme */}
          <button className="absolute top-5 right-0.5 p-0.5 bg-white/80 rounded-full hover:bg-white transition-colors">
            <Heart className="h-2.5 w-2.5 text-gray-600 hover:text-red-500" />
          </button>
        </div>

        {/* Content Section */}
        <div className="space-y-0.5">
          {/* Title */}
          <Link href={itemLink}>
            <h3 className="text-[10px] font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
              {code} - {title}
            </h3>
          </Link>

          {/* Program & Semester */}
          <p className="text-[10px] text-gray-500 leading-tight">
            {program} • {semester} Semester
          </p>

          {/* Rating */}
          <div className="flex items-center gap-0.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-2 w-2 ${
                    i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-600">({reviews})</span>
          </div>

          {/* Downloads */}
          <div className="flex items-center gap-0.5 text-[10px] text-gray-500">
            <Download className="h-2 w-2" />
            <span>{downloads.toLocaleString()}</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-1">
            {price === 0 ? (
              <span className="text-sm font-bold text-green-600">FREE</span>
            ) : (
              <div className="flex items-center gap-0.5">
                <span className="text-sm font-bold text-gray-900">₹{price}</span>
                {originalPrice && <span className="text-[10px] text-gray-500 line-through">₹{originalPrice}</span>}
              </div>
            )}
          </div>

          {/* Description - Hidden on mobile */}
          <p className="text-[10px] text-gray-600 line-clamp-1 hidden lg:block">{description}</p>

          {/* Action Buttons */}
          <div className="flex gap-0.5 pt-0.5">
            {type === "free" ? (
              <Button size="sm" className="flex-1 text-[10px] h-5">
                <Download className="mr-0.5 h-2 w-2" />
                Download
              </Button>
            ) : (
              <>
                <Button size="sm" className="flex-1 text-[10px] h-5">
                  <ShoppingCart className="mr-0.5 h-2 w-2" />
                  Buy Now
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-[10px] h-5 px-1 bg-transparent"
                >
                  <Eye className="h-2 w-2" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
