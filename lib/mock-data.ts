import type { Product, Purchase, Sale } from "./types";

// Mock projects data
export const mockProjects: Product[] = [
  {
    id: "1",
    title: "Modern Dashboard UI Kit",
    description:
      "A comprehensive UI kit for building modern dashboard interfaces.",
    longDescription:
      "This UI kit includes over 100 components designed specifically for creating beautiful and functional dashboard interfaces. Perfect for admin panels, analytics dashboards, and data visualization projects.",
    price: 49.99,
    originalPrice: 69.99,
    image: "/placeholder.svg?height=300&width=500",
    category: "UI Kit",
    rating: 4.8,
    reviews: 124,
    seller: "Jane Seller",
    sellerId: "1",
    featured: true,
    updatedAt: "2023-04-15T00:00:00Z",
    includes: [
      "100+ UI Components",
      "Figma Source Files",
      "React Components",
      "Documentation",
      "6 Months Support",
    ],
    features: [
      "Responsive Design",
      "Dark & Light Modes",
      "Customizable Components",
      "Accessibility Compliant",
      "Regular Updates",
      "Compatible with React, Vue, and Angular",
    ],
    reviewsList: [
      {
        name: "Alex Johnson",
        rating: 5,
        date: "2023-03-10",
        comment:
          "Excellent UI kit with well-designed components. Saved me weeks of development time!",
      },
      {
        name: "Sarah Williams",
        rating: 4,
        date: "2023-02-22",
        comment:
          "Great quality and easy to customize. Would recommend for any dashboard project.",
      },
      {
        name: "Michael Chen",
        rating: 5,
        date: "2023-01-15",
        comment:
          "The documentation is excellent and the components are very well thought out.",
      },
    ],
    demoUrl: "https://example.com/demo-project",
  },
  {
    id: "2",
    title: "E-commerce Template",
    description:
      "A complete e-commerce template with shopping cart and checkout functionality.",
    longDescription:
      "This template provides everything you need to launch an online store quickly. It includes product listings, shopping cart, checkout process, user accounts, and admin dashboard.",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=500",
    category: "Template",
    rating: 4.6,
    reviews: 89,
    seller: "John Developer",
    sellerId: "2",
    featured: true,
    updatedAt: "2023-05-20T00:00:00Z",
    includes: [
      "Complete Frontend Template",
      "Admin Dashboard",
      "API Integration Examples",
      "Documentation",
      "3 Months Support",
    ],
    features: [
      "Responsive Design",
      "Product Search & Filtering",
      "Shopping Cart & Wishlist",
      "User Authentication",
      "Payment Gateway Integration",
      "Order Management",
    ],
    reviewsList: [
      {
        name: "David Smith",
        rating: 5,
        date: "2023-04-18",
        comment:
          "This template saved me months of development time. Very well structured and easy to customize.",
      },
      {
        name: "Emily Johnson",
        rating: 4,
        date: "2023-03-25",
        comment:
          "Great template with all the features I needed. Support was responsive when I had questions.",
      },
      {
        name: "Robert Lee",
        rating: 5,
        date: "2023-02-10",
        comment:
          "Excellent code quality and documentation. Highly recommended!",
      },
    ],
    demoUrl: "https://example.com/demo-project",
  },
  {
    id: "3",
    title: "React Component Library",
    description:
      "A collection of reusable React components for faster development.",
    longDescription:
      "This component library includes over 50 reusable React components that follow best practices and are fully customizable. Perfect for speeding up your React development workflow.",
    price: 39.99,
    originalPrice: 59.99,
    image: "/placeholder.svg?height=300&width=500",
    category: "Plugin",
    rating: 4.7,
    reviews: 56,
    seller: "React Masters",
    sellerId: "3",
    featured: false,
    updatedAt: "2023-03-10T00:00:00Z",
    includes: [
      "50+ React Components",
      "TypeScript Support",
      "Storybook Documentation",
      "Unit Tests",
      "12 Months Support",
    ],
    features: [
      "Fully Typed Components",
      "Accessibility Compliant",
      "Themeable Design System",
      "Small Bundle Size",
      "Server Component Support",
      "Comprehensive Documentation",
    ],
    reviewsList: [
      {
        name: "Jennifer Lee",
        rating: 5,
        date: "2023-02-28",
        comment:
          "These components are extremely well built and the TypeScript support is excellent.",
      },
      {
        name: "Thomas Brown",
        rating: 4,
        date: "2023-01-15",
        comment:
          "Great library that saved me a lot of time. Documentation could be a bit more detailed.",
      },
      {
        name: "Lisa Wang",
        rating: 5,
        date: "2022-12-20",
        comment:
          "The best React component library I've used. Very well thought out API.",
      },
    ],
    demoUrl: "https://example.com/demo-project",
  },
  {
    id: "4",
    title: "Premium Icon Set",
    description:
      "A collection of 500+ premium SVG icons for modern web applications.",
    longDescription:
      "This icon set includes over 500 carefully crafted SVG icons in multiple styles. Each icon is available in outlined, filled, and duotone variants, making it perfect for any design system.",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=500",
    category: "Icon Set",
    rating: 4.9,
    reviews: 210,
    seller: "Design Studio",
    sellerId: "4",
    featured: true,
    updatedAt: "2023-06-05T00:00:00Z",
    includes: [
      "500+ SVG Icons",
      "Multiple Styles (Outline, Filled, Duotone)",
      "Figma Library",
      "React Component",
      "Lifetime Updates",
    ],
    features: [
      "Pixel Perfect Design",
      "Customizable Size & Color",
      "Optimized SVG Files",
      "Consistent Style",
      "Regular Updates with New Icons",
      "Web Font Version Included",
    ],
    reviewsList: [
      {
        name: "Mark Wilson",
        rating: 5,
        date: "2023-05-20",
        comment:
          "These icons are beautiful and very versatile. The React component makes them super easy to use.",
      },
      {
        name: "Sophia Garcia",
        rating: 5,
        date: "2023-04-12",
        comment:
          "Excellent quality icons that look great at any size. Highly recommended!",
      },
      {
        name: "James Taylor",
        rating: 4,
        date: "2023-03-05",
        comment:
          "Great icon set with a wide variety of options. Would love to see even more categories added.",
      },
    ],
    demoUrl: "https://example.com/demo-project",
  },
  {
    id: "5",
    title: "Next.js Blog Template",
    description: "A modern blog template built with Next.js and Tailwind CSS.",
    longDescription:
      "This template provides everything you need to start a professional blog using Next.js. It includes a clean design, markdown support, categories, search functionality, and an admin dashboard.",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=500",
    category: "Template",
    rating: 4.5,
    reviews: 78,
    seller: "Next Experts",
    sellerId: "5",
    featured: true,
    updatedAt: "2023-05-15T00:00:00Z",
    includes: [
      "Complete Next.js Blog Template",
      "Admin Dashboard",
      "Markdown Support",
      "SEO Optimization",
      "6 Months Support",
    ],
    features: [
      "Responsive Design",
      "Dark & Light Modes",
      "Category & Tag Support",
      "Search Functionality",
      "Newsletter Integration",
      "Analytics Dashboard",
    ],
    reviewsList: [
      {
        name: "Daniel Johnson",
        rating: 5,
        date: "2023-04-28",
        comment:
          "This template is amazing! It had everything I needed to launch my blog quickly.",
      },
      {
        name: "Rachel Kim",
        rating: 4,
        date: "2023-03-15",
        comment:
          "Great template with good documentation. The admin dashboard is particularly useful.",
      },
      {
        name: "Chris Martinez",
        rating: 4,
        date: "2023-02-10",
        comment:
          "Solid template that was easy to customize to my needs. Support was helpful when I had questions.",
      },
    ],
    demoUrl: "https://example.com/demo-project",
  },
  {
    id: "6",
    title: "Authentication System",
    description:
      "A complete authentication system with social login and two-factor authentication.",
    longDescription:
      "This package provides a robust authentication system that can be integrated into any web application. It includes email/password authentication, social login options, two-factor authentication, and password reset functionality.",
    price: 69.99,
    originalPrice: 89.99,
    image: "/placeholder.svg?height=300&width=500",
    category: "Plugin",
    rating: 4.7,
    reviews: 45,
    seller: "Security Pro",
    sellerId: "6",
    featured: false,
    updatedAt: "2023-04-20T00:00:00Z",
    includes: [
      "Complete Authentication System",
      "Social Login Integration",
      "Two-Factor Authentication",
      "Admin Dashboard",
      "12 Months Support",
    ],
    features: [
      "Secure Password Hashing",
      "Email Verification",
      "Password Reset Flow",
      "OAuth Integration (Google, GitHub, etc.)",
      "Rate Limiting Protection",
      "Session Management",
    ],
    reviewsList: [
      {
        name: "Andrew Wilson",
        rating: 5,
        date: "2023-03-25",
        comment:
          "This saved me weeks of development time. The security features are top-notch.",
      },
      {
        name: "Michelle Lee",
        rating: 4,
        date: "2023-02-18",
        comment:
          "Very comprehensive authentication system. Documentation was clear and integration was straightforward.",
      },
      {
        name: "Kevin Brown",
        rating: 5,
        date: "2023-01-10",
        comment:
          "Excellent product with great support. The social login integration works flawlessly.",
      },
    ],
    demoUrl: "https://example.com/demo-project",
  },
  {
    id: "7",
    title: "Mobile App UI Kit",
    description:
      "A comprehensive UI kit for designing modern mobile applications.",
    longDescription:
      "This UI kit includes over 200 screens and components designed specifically for mobile app development. It covers common app categories like social, e-commerce, productivity, and more.",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=500",
    category: "UI Kit",
    rating: 4.8,
    reviews: 67,
    seller: "Mobile Design Studio",
    sellerId: "7",
    featured: true,
    updatedAt: "2023-06-10T00:00:00Z",
    includes: [
      "200+ Mobile UI Screens",
      "Figma & Sketch Files",
      "React Native Components",
      "Documentation",
      "Lifetime Updates",
    ],
    features: [
      "iOS & Android Designs",
      "Dark & Light Modes",
      "Customizable Components",
      "Responsive Layouts",
      "Accessibility Compliant",
      "Regular Updates",
    ],
    reviewsList: [
      {
        name: "Jessica Chen",
        rating: 5,
        date: "2023-05-28",
        comment:
          "This UI kit is incredible! The attention to detail and variety of screens saved me so much time.",
      },
      {
        name: "Ryan Thompson",
        rating: 5,
        date: "2023-04-15",
        comment:
          "Excellent quality and very comprehensive. The React Native components work perfectly.",
      },
      {
        name: "Olivia Martinez",
        rating: 4,
        date: "2023-03-10",
        comment:
          "Great UI kit with beautiful designs. Would recommend for any mobile app project.",
      },
    ],
    demoUrl: "https://example.com/demo-project",
  },
  {
    id: "8",
    title: "Analytics Dashboard Template",
    description:
      "A data visualization dashboard template with charts and graphs.",
    longDescription:
      "This template provides a complete analytics dashboard with various charts, graphs, and data visualization components. Perfect for building admin panels, business intelligence tools, or any data-heavy application.",
    price: 69.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=300&width=500",
    category: "Template",
    rating: 4.6,
    reviews: 52,
    seller: "Jane Seller",
    sellerId: "1",
    featured: false,
    updatedAt: "2023-05-25T00:00:00Z",
    includes: [
      "Complete Dashboard Template",
      "20+ Chart Components",
      "Data Visualization Tools",
      "Admin Panel",
      "6 Months Support",
    ],
    features: [
      "Responsive Design",
      "Real-time Data Support",
      "Customizable Charts",
      "Filter & Search Functionality",
      "Export Options (CSV, PDF)",
      "Dark & Light Themes",
    ],
    reviewsList: [
      {
        name: "Michael Scott",
        rating: 5,
        date: "2023-04-20",
        comment:
          "This dashboard template is exactly what I needed for my analytics project. Very well designed!",
      },
      {
        name: "Pam Beesly",
        rating: 4,
        date: "2023-03-15",
        comment:
          "Great template with excellent chart components. Easy to customize to our specific needs.",
      },
      {
        name: "Jim Halpert",
        rating: 5,
        date: "2023-02-10",
        comment:
          "The best dashboard template I've used. The documentation is clear and the code is well structured.",
      },
    ],
    demoUrl: "https://example.com/demo-project",
  },
  {
    id: "9",
    title: "Tailwind CSS Components",
    description: "A collection of ready-to-use Tailwind CSS components.",
    longDescription:
      "This package includes over 100 pre-built components using Tailwind CSS. Each component is fully responsive and customizable, making it perfect for rapidly building modern websites.",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=500",
    category: "UI Kit",
    rating: 4.7,
    reviews: 93,
    seller: "Tailwind Masters",
    sellerId: "8",
    featured: false,
    updatedAt: "2023-04-05T00:00:00Z",
    includes: [
      "100+ Tailwind Components",
      "HTML & React Versions",
      "Documentation",
      "Lifetime Updates",
      "Email Support",
    ],
    features: [
      "Fully Responsive",
      "Dark Mode Support",
      "Accessible Components",
      "Copy & Paste Ready",
      "Regular Updates",
      "Compatible with Tailwind v3",
    ],
    reviewsList: [
      {
        name: "David Miller",
        rating: 5,
        date: "2023-03-20",
        comment:
          "These components are fantastic! They saved me so much time on my project.",
      },
      {
        name: "Sarah Johnson",
        rating: 4,
        date: "2023-02-15",
        comment:
          "Great collection of components that work well together. Very easy to customize.",
      },
      {
        name: "Jason Lee",
        rating: 5,
        date: "2023-01-10",
        comment:
          "The best Tailwind component library I've used. Very well thought out and comprehensive.",
      },
    ],
    demoUrl: "https://example.com/demo-project",
  },
  {
    id: "10",
    title: "Landing Page Builder",
    description:
      "A drag-and-drop landing page builder with pre-designed blocks.",
    longDescription:
      "This tool allows you to create beautiful landing pages without coding. It includes a drag-and-drop interface, pre-designed blocks, and export options for various platforms.",
    price: 79.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=300&width=500",
    category: "Plugin",
    rating: 4.5,
    reviews: 78,
    seller: "Web Tools Inc",
    sellerId: "9",
    featured: true,
    updatedAt: "2023-06-15T00:00:00Z",
    includes: [
      "Drag-and-Drop Builder",
      "50+ Pre-designed Blocks",
      "Export to HTML/CSS",
      "WordPress Integration",
      "12 Months Support",
    ],
    features: [
      "No Coding Required",
      "Responsive Design",
      "SEO Optimization",
      "A/B Testing Tools",
      "Analytics Integration",
      "Form Handling",
    ],
    reviewsList: [
      {
        name: "Emma Wilson",
        rating: 5,
        date: "2023-05-20",
        comment:
          "This builder is amazing! I created a professional landing page in just a few hours.",
      },
      {
        name: "Robert Johnson",
        rating: 4,
        date: "2023-04-15",
        comment:
          "Great tool with lots of useful features. The pre-designed blocks are very well done.",
      },
      {
        name: "Sophia Martinez",
        rating: 4,
        date: "2023-03-10",
        comment:
          "Very intuitive interface and the export options work perfectly. Would recommend!",
      },
    ],
    demoUrl: "https://example.com/demo-project",
  },
];

// Mock purchases data
export const mockPurchases: Purchase[] = [
  {
    id: "p1",
    product: mockProjects[0],
    purchaseDate: "2023-05-15T00:00:00Z",
    downloadCount: 2,
  },
  {
    id: "p2",
    product: mockProjects[3],
    purchaseDate: "2023-04-20T00:00:00Z",
    downloadCount: 1,
  },
  {
    id: "p3",
    product: mockProjects[5],
    purchaseDate: "2023-03-10T00:00:00Z",
    downloadCount: 3,
  },
];

// Mock sales data
export const mockSales: Sale[] = [
  {
    id: "s1",
    product: mockProjects[0],
    customer: "John Buyer",
    date: "2023-05-15T00:00:00Z",
    amount: 49.99,
  },
  {
    id: "s2",
    product: mockProjects[7],
    customer: "Alice Johnson",
    date: "2023-05-10T00:00:00Z",
    amount: 69.99,
  },
  {
    id: "s3",
    product: mockProjects[0],
    customer: "Bob Smith",
    date: "2023-05-05T00:00:00Z",
    amount: 49.99,
  },
  {
    id: "s4",
    product: mockProjects[7],
    customer: "Charlie Brown",
    date: "2023-04-28T00:00:00Z",
    amount: 69.99,
  },
  {
    id: "s5",
    product: mockProjects[0],
    customer: "David Miller",
    date: "2023-04-20T00:00:00Z",
    amount: 49.99,
  },
];
