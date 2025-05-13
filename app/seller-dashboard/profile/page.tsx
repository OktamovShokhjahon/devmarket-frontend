"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/context/auth-context"
import { ArrowLeft, Save, Upload, Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function SellerProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [profile, setProfile] = useState({
    name: "Jane Seller",
    email: "seller@example.com",
    bio: "UI/UX designer specializing in dashboard interfaces and design systems.",
    location: "New York, USA",
    website: "https://janedesigner.com",
    skills: ["UI Design", "UX Research", "Design Systems", "Figma", "Adobe XD", "Prototyping"],
  })

  const [newSkill, setNewSkill] = useState("")

  const [workHistory, setWorkHistory] = useState([
    {
      title: "Senior UI Designer",
      company: "Design Agency Inc.",
      period: "2020 - Present",
      description: "Leading UI design for enterprise clients and creating design systems.",
    },
    {
      title: "UI/UX Designer",
      company: "Tech Startup",
      period: "2018 - 2020",
      description: "Designed user interfaces for mobile and web applications.",
    },
  ])

  const [newWorkItem, setNewWorkItem] = useState({
    title: "",
    company: "",
    period: "",
    description: "",
  })

  const [portfolio, setPortfolio] = useState([
    {
      title: "E-commerce Redesign",
      image: "/placeholder.svg?height=200&width=300",
      description: "Complete redesign of an e-commerce platform focusing on conversion optimization.",
    },
    {
      title: "Finance Dashboard",
      image: "/placeholder.svg?height=200&width=300",
      description: "Data visualization dashboard for financial analytics.",
    },
  ])

  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: "",
    image: "/placeholder.svg?height=200&width=300",
    description: "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    } else if (user.role !== "seller") {
      router.push(`/${user.role}-dashboard`)
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (index: number) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((_, i) => i !== index),
    })
  }

  const handleAddWorkHistory = () => {
    if (newWorkItem.title && newWorkItem.company) {
      setWorkHistory([...workHistory, newWorkItem])
      setNewWorkItem({
        title: "",
        company: "",
        period: "",
        description: "",
      })
    }
  }

  const handleRemoveWorkHistory = (index: number) => {
    setWorkHistory(workHistory.filter((_, i) => i !== index))
  }

  const handleAddPortfolio = () => {
    if (newPortfolioItem.title) {
      setPortfolio([...portfolio, newPortfolioItem])
      setNewPortfolioItem({
        title: "",
        image: "/placeholder.svg?height=200&width=300",
        description: "",
      })
    }
  }

  const handleRemovePortfolio = (index: number) => {
    setPortfolio(portfolio.filter((_, i) => i !== index))
  }

  return (
    <div className="container py-8 md:py-12">
      <Link
        href="/seller-dashboard"
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">Edit Profile</h1>
      <p className="mb-8 text-muted-foreground">Update your seller profile information</p>

      <div className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update your personal and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center relative overflow-hidden">
                <img src="/placeholder.svg?height=128&width=128" alt="Profile" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="secondary" className="gap-1">
                    <Upload className="h-4 w-4" /> Change
                  </Button>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      readOnly
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell potential buyers about yourself and your expertise"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      placeholder="https://yourwebsite.com"
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Add your skills and expertise</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <div
                  key={index}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary flex items-center gap-1"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(index)}
                    className="ml-1 rounded-full hover:bg-primary/20 h-4 w-4 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
              />
              <Button onClick={handleAddSkill}>Add</Button>
            </div>
          </CardContent>
        </Card>

        {/* Work History */}
        <Card>
          <CardHeader>
            <CardTitle>Work History</CardTitle>
            <CardDescription>Add your professional experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {workHistory.map((work, index) => (
              <div key={index} className="rounded-lg border p-4 relative">
                <button
                  onClick={() => handleRemoveWorkHistory(index)}
                  className="absolute top-2 right-2 rounded-full hover:bg-muted h-6 w-6 flex items-center justify-center"
                >
                  ×
                </button>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-sm text-muted-foreground">Title</Label>
                    <div className="font-medium">{work.title}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Period</Label>
                    <div className="font-medium">{work.period}</div>
                  </div>
                </div>
                <div className="mt-2">
                  <Label className="text-sm text-muted-foreground">Company</Label>
                  <div className="font-medium">{work.company}</div>
                </div>
                <div className="mt-2">
                  <Label className="text-sm text-muted-foreground">Description</Label>
                  <div className="text-sm text-muted-foreground">{work.description}</div>
                </div>
              </div>
            ))}

            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-4">Add New Work Experience</h3>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="work-title">Title</Label>
                    <Input
                      id="work-title"
                      placeholder="Job Title"
                      value={newWorkItem.title}
                      onChange={(e) => setNewWorkItem({ ...newWorkItem, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="work-period">Period</Label>
                    <Input
                      id="work-period"
                      placeholder="2020 - Present"
                      value={newWorkItem.period}
                      onChange={(e) => setNewWorkItem({ ...newWorkItem, period: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="work-company">Company</Label>
                  <Input
                    id="work-company"
                    placeholder="Company Name"
                    value={newWorkItem.company}
                    onChange={(e) => setNewWorkItem({ ...newWorkItem, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="work-description">Description</Label>
                  <Textarea
                    id="work-description"
                    placeholder="Describe your responsibilities and achievements"
                    value={newWorkItem.description}
                    onChange={(e) => setNewWorkItem({ ...newWorkItem, description: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddWorkHistory} className="gap-1">
                  <Plus className="h-4 w-4" /> Add Work Experience
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio</CardTitle>
            <CardDescription>Showcase your best work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {portfolio.map((item, index) => (
                <div key={index} className="rounded-lg border overflow-hidden relative group">
                  <button
                    onClick={() => handleRemovePortfolio(index)}
                    className="absolute top-2 right-2 rounded-full bg-background/80 hover:bg-background h-6 w-6 flex items-center justify-center z-10"
                  >
                    ×
                  </button>
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}

              <div className="rounded-lg border border-dashed p-6 flex flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-muted/50 p-3">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">Add Portfolio Item</h3>
                <p className="text-sm text-muted-foreground mb-4">Showcase your work to potential buyers</p>
                <Button variant="outline" onClick={() => document.getElementById("portfolio-dialog")?.showModal()}>
                  Add Item
                </Button>
              </div>
            </div>

            {/* Portfolio Dialog */}
            <dialog
              id="portfolio-dialog"
              className="modal p-6 rounded-lg border shadow-lg bg-background max-w-md w-full"
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Add Portfolio Item</h3>
                <div className="space-y-2">
                  <Label htmlFor="portfolio-title">Title</Label>
                  <Input
                    id="portfolio-title"
                    placeholder="Project Title"
                    value={newPortfolioItem.title}
                    onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolio-image">Image</Label>
                  <div className="border rounded-md p-4 text-center">
                    <div className="aspect-video overflow-hidden mb-4 bg-muted flex items-center justify-center">
                      <img
                        src={newPortfolioItem.image || "/placeholder.svg"}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Upload className="h-4 w-4" /> Upload Image
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolio-description">Description</Label>
                  <Textarea
                    id="portfolio-description"
                    placeholder="Describe your project"
                    value={newPortfolioItem.description}
                    onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, description: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => document.getElementById("portfolio-dialog")?.close()}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleAddPortfolio()
                      document.getElementById("portfolio-dialog")?.close()
                    }}
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </dialog>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" onClick={handleProfileUpdate} className="gap-2">
            <Save className="h-4 w-4" /> Save Profile
          </Button>
        </div>
      </div>
    </div>
  )
}
