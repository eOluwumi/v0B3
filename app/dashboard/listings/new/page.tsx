"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import { useListingsRefresh } from "@/components/listings-provider"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

const categories = [
  "Electronics",
  "Furniture",
  "Clothing",
  "Books",
  "Sports Equipment",
  "Musical Instruments",
  "Tools",
  "Collectibles",
  "Art",
  "Other",
]

export default function NewListingPage() {
  const { supabase, user } = useSupabase()
  const { triggerRefresh } = useListingsRefresh()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    offeringCategory: "",
    offeringDescription: "",
    seekingCategory: "",
    seekingDescription: "",
    location: "",
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!user) {
        throw new Error("You must be logged in to create a listing")
      }

      let imageUrl = null

      // Upload image if one was selected
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `listings/${user.id}/${fileName}`

        const { error: uploadError, data } = await supabase.storage.from("listing-images").upload(filePath, imageFile)

        if (uploadError) {
          throw uploadError
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage.from("listing-images").getPublicUrl(filePath)

        imageUrl = publicUrlData.publicUrl
      }

      // Insert listing into database
      const { error } = await supabase.from("listings").insert([
        {
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          offering_category: formData.offeringCategory,
          offering_description: formData.offeringDescription,
          seeking_category: formData.seekingCategory,
          seeking_description: formData.seekingDescription,
          location: formData.location,
          image_url: imageUrl,
          status: "active",
        },
      ])

      if (error) {
        throw error
      }

      // Trigger refresh of listings page (safe to call even if provider is missing)
      triggerRefresh()

      toast({
        title: "Listing created! 🎉",
        description: "Your listing has been successfully created and is now live in the marketplace.",
      })

      // Navigate back to listings page
      router.push("/dashboard/listings")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create listing",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex items-center mb-6">
        <Link href="/dashboard/listings" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Create New Listing</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Listing Details</CardTitle>
            <CardDescription>
              Provide details about what you're offering and what you're seeking in return.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Listing Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Vintage Camera for Trade"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Listing Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide a detailed description of your listing"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">What You're Offering</h3>
                <div className="space-y-2">
                  <Label htmlFor="offeringCategory">Category</Label>
                  <Select
                    value={formData.offeringCategory}
                    onValueChange={(value) => handleSelectChange("offeringCategory", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="offeringDescription">Description</Label>
                  <Textarea
                    id="offeringDescription"
                    name="offeringDescription"
                    placeholder="Describe what you're offering"
                    value={formData.offeringDescription}
                    onChange={handleChange}
                    required
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">What You're Seeking</h3>
                <div className="space-y-2">
                  <Label htmlFor="seekingCategory">Category</Label>
                  <Select
                    value={formData.seekingCategory}
                    onValueChange={(value) => handleSelectChange("seekingCategory", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seekingDescription">Description</Label>
                  <Textarea
                    id="seekingDescription"
                    name="seekingDescription"
                    placeholder="Describe what you're looking for"
                    value={formData.seekingDescription}
                    onChange={handleChange}
                    required
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g., Lagos, Nigeria"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image (Optional)</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="text-sm text-gray-500">Click to upload an image</p>
                    </div>
                    <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </Label>
                </div>
                {imagePreview && (
                  <div className="w-32 h-32 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/dashboard/listings">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Listing"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardLayout>
  )
}
