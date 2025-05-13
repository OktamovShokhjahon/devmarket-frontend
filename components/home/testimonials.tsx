import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Frontend Developer",
    content:
      "DevMarket has been a game-changer for my workflow. The quality of templates and UI kits is exceptional, saving me countless hours of development time.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AJ",
  },
  {
    name: "Sarah Williams",
    role: "UX Designer",
    content:
      "As a designer, I've found both inspiration and practical resources on DevMarket. The platform makes it easy to find exactly what I need for my projects.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SW",
  },
  {
    name: "Michael Chen",
    role: "Full Stack Developer",
    content:
      "I've been both a buyer and seller on DevMarket. The platform is intuitive, the community is supportive, and the quality control ensures only the best products are available.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MC",
  },
]

export default function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((testimonial, i) => (
        <Card key={i} className="border-0 bg-background shadow-none">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <div className="space-y-1">
                <p className="text-muted-foreground">"{testimonial.content}"</p>
              </div>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
