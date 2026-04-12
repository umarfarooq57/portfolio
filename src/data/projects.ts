export interface Project {
  title: string;
  category: string;
  desc: string;
  link: string;
  imageAlt: string;
  image?: string;
  images?: string[]; // Array of images for 3D/animated view
  colorClass: string;
}

export const projects: Project[] = [
  {
    title: "Unique Job Services",
    category: "Web Platform",
    desc: "A comprehensive employment and recruitment agency platform to connect professionals with top employers. Features job boards and attendance tracking.",
    link: "https://apply.uniquejob.ca/",
    imageAlt: "Unique Job Services",
    image: "/ujs.png",
    colorClass: "from-blue-500 to-cyan-500",
  },
  {
    title: "Smart Attendance System",
    category: "Hardware & SaaS",
    desc: "Real-time biometric attendance tracker with fingerprint scanning, synced to a custom HR cloud dashboard for workforce visibility.",
    link: "https://uniquejob.ca/ui/",
    imageAlt: "Smart Attendance",
    image: "/biometric.png",
    colorClass: "from-purple-500 to-indigo-500",
  },
  {
    title: "AI Voice Cloning Engine",
    category: "AI / Voice",
    desc: "Integrated state-of-the-art TTS models for on-demand audio generation with 95% voice accuracy for content creators.",
    link: "#",
    imageAlt: "AI Voice",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
    colorClass: "from-pink-500 to-red-500",
  },
  {
    title: "eCommerce Platform",
    category: "eCommerce",
    desc: "Scalable online store handling thousands of daily orders with real-time inventory and Stripe payment integration.",
    link: "#",
    imageAlt: "eCommerce",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    colorClass: "from-green-500 to-emerald-500",
  },
  {
    title: "Warehouse Inventory System",
    category: "Operations",
    desc: "Centralized inventory dashboard with barcode scanning, reducing stock discrepancies by 90% and speeding up fulfillment.",
    link: "#",
    imageAlt: "Inventory",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    colorClass: "from-yellow-500 to-orange-500",
  },
  {
    title: "Bus Ticket Booking Engine",
    category: "Transport",
    desc: "Real-time seat booking system with QR code ticketing, route management, and a comprehensive admin analytics dashboard.",
    link: "#",
    imageAlt: "Bus Ticketing",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=800&auto=format&fit=crop",
    colorClass: "from-indigo-500 to-blue-500",
  },
  {
    title: "DocuForge PDF Platform",
    category: "SaaS / Utilities",
    desc: "Enterprise-grade PDF processing platform. Fast, secure, and reliable tools to merge, split, convert, and edit documents.",
    link: "https://likespdf.vercel.app/",
    imageAlt: "DocuForge PDF Platform",
    image: "https://image.thum.io/get/width/1200/crop/800/https://likespdf.vercel.app/",
    colorClass: "from-red-500 to-orange-500",
  },
  {
    title: "Digital Attendance (Live Location)",
    category: "Geofencing & HR",
    desc: "Live location-based digital attendance tracking system with real-time mapping, automated geofencing, and employee tracking analytics.",
    link: "#",
    imageAlt: "Digital Attendance Dashboard",
    images: [
      "https://images.unsplash.com/photo-1512758117929-c8baad54b037?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
    ],
    colorClass: "from-emerald-500 to-teal-500",
  }
];
