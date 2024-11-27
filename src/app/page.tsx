import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/theme-toggle"
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import {
   Linkedin,
   Twitter,
   Github,
   Mail
} from 'lucide-react'

import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger
} from "@/components/ui/accordion"
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle
} from "@/components/ui/card"
import { Check, X } from 'lucide-react'

// Previous Navbar and Footer components remain the same

const FeaturesExtended = () => (
   <section id="features-extended" className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Features</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
         {[
            {
               title: "AI-Powered Email Prioritization",
               description: "Machine learning algorithms automatically sort and prioritize your most important emails.",
               icon: "🤖"
            },
            {
               title: "Advanced Search Capabilities",
               description: "Powerful full-text search with advanced filters and quick retrieval.",
               icon: "🔍"
            },
            {
               title: "Keyboard Shortcut Mastery",
               description: "Fully customizable keyboard shortcuts for lightning-fast email management.",
               icon: "⌨️"
            },
            {
               title: "Smart Drafting Assistant",
               description: "AI-powered writing suggestions and auto-complete for faster email composition.",
               icon: "✍️"
            },
            {
               title: "Multi-Account Support",
               description: "Seamlessly manage multiple email accounts from a single interface.",
               icon: "📧"
            },
            {
               title: "Privacy-First Design",
               description: "End-to-end encryption and strict privacy controls for your emails.",
               icon: "🔒"
            }
         ].map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
               <div className="text-4xl mb-4">{feature.icon}</div>
               <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
               <p className="dark:text-gray-300 ">{feature.description}</p>
            </div>
         ))}
      </div>
   </section>
)

const PricingSection = () => (
   <section id="pricing" className="container mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
      <div className="grid md:grid-cols-3 gap-8">
         {[
            {
               title: "Free",
               price: "$0",
               features: [
                  "Basic Email Management",
                  "Limited AI Features",
                  "Single Account",
                  "Community Support"
               ],
               unavailable: [
                  "Advanced AI Prioritization",
                  "Multi-Account Support",
                  "Priority Support"
               ]
            },
            {
               title: "Pro",
               price: "$9.99/mo",
               features: [
                  "Full AI Email Management",
                  "Up to 3 Email Accounts",
                  "Advanced Search",
                  "Priority Support",
                  "Monthly AI Credits"
               ],
               unavailable: [
                  "Enterprise Features",
                  "Custom Integrations"
               ]
            },
            {
               title: "Enterprise",
               price: "Custom",
               features: [
                  "Unlimited AI Features",
                  "Unlimited Accounts",
                  "Custom Integrations",
                  "Dedicated Support",
                  "Advanced Security"
               ],
               unavailable: []
            }
         ].map((plan, index) => (
            <Card key={index} className="text-center">
               <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <p className="text-2xl font-bold">{plan.price}</p>
               </CardHeader>
               <CardContent>
                  <div className="space-y-2">
                     {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center">
                           <Check className="text-green-500 mr-2" size={20} />
                           {feature}
                        </div>
                     ))}
                     {plan.unavailable.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center text-gray-400">
                           <X className="mr-2" size={20} />
                           {feature}
                        </div>
                     ))}
                  </div>
               </CardContent>
               <CardFooter>
                  <Button className="w-full">
                     {plan.title === "Enterprise" ? "Contact Sales" : "Choose Plan"}
                  </Button>
               </CardFooter>
            </Card>
         ))}
      </div>
   </section>
)

const ContactSection = () => (
   <section id="contact" className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
         <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
         <form className="space-y-4">
            <div>
               <label htmlFor="name" className="block mb-2">Name</label>
               <input
                  type="text"
                  id="name"
                  className="w-full p-2 border rounded"
                  placeholder="Your Name"
               />
            </div>
            <div>
               <label htmlFor="email" className="block mb-2">Email</label>
               <input
                  type="email"
                  id="email"
                  className="w-full p-2 border rounded"
                  placeholder="your@email.com"
               />
            </div>
            <div>
               <label htmlFor="message" className="block mb-2">Message</label>
               <textarea
                  id="message"
                  className="w-full p-2 border rounded h-32"
                  placeholder="Your message..."
               ></textarea>
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
         </form>
      </div>
   </section>
)

const FAQSection = () => (
   <section id="faq" className="container mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="max-w-2xl mx-auto">
         <Accordion type="single" collapsible>
            {[
               {
                  question: "How does the AI email prioritization work?",
                  answer: "Our AI analyzes email content, sender importance, and your interaction history to automatically prioritize emails."
               },
               {
                  question: "Is my data secure?",
                  answer: "We use end-to-end encryption and follow strict privacy guidelines to protect your email data."
               },
               {
                  question: "Can I try EmailSync before purchasing?",
                  answer: "Yes! We offer a free tier with basic features. You can upgrade anytime for full AI capabilities."
               },
               {
                  question: "Do you support multiple email providers?",
                  answer: "We currently support Gmail, Outlook, and custom IMAP/SMTP email accounts."
               }
            ].map((faq, index) => (
               <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
               </AccordionItem>
            ))}
         </Accordion>
      </div>
   </section>
)
// Navbar Component
const Navbar = () => {
   return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
               <div className="flex items-center">
                  <Link href="/" className="flex-shrink-0 font-bold text-xl">
                     EmailSync
                  </Link>
               </div>
               <div className="hidden md:flex space-x-4">
                  <Link href="#features" className="dark:text-gray-300  hover:text-black dark:hover:text-white">
                     Features
                  </Link>
                  <Link href="#demo" className="dark:text-gray-300  hover:text-black dark:hover:text-white">
                     Demo
                  </Link>
                  <Link href="/pricing" className="dark:text-gray-300  hover:text-black dark:hover:text-white">
                     Pricing
                  </Link>
               </div>
               <div className="flex items-center space-x-4">
                  <ModeToggle />
                  <div className="hidden md:flex space-x-2">
                     <Link href="/sign-in">
                        <Button variant="outline" size="sm">Sign In</Button>
                     </Link>
                     <Link href="/sign-up">
                        <Button size="sm">Get Started</Button>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </nav>
   )
}

// Footer Component
const Footer = () => {
   return (
      <footer className="bg-gray-50 dark:bg-gray-900 py-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               <div>
                  <h3 className="font-bold text-xl mb-4">EmailSync</h3>
                  <p className="dark:text-gray-300 ">The minimalistic, AI-powered email client.</p>
               </div>
               <div>
                  <h4 className="font-semibold mb-4">Product</h4>
                  <ul className="space-y-2">
                     <li><Link href="#features" className="dark:text-gray-300  hover:text-black">Features</Link></li>
                     <li><Link href="/pricing" className="dark:text-gray-300  hover:text-black">Pricing</Link></li>
                     <li><Link href="/demo" className="dark:text-gray-300  hover:text-black">Demo</Link></li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-semibold mb-4">Company</h4>
                  <ul className="space-y-2">
                     <li><Link href="/about" className="dark:text-gray-300  hover:text-black">About</Link></li>
                     <li><Link href="/contact" className="dark:text-gray-300  hover:text-black">Contact</Link></li>
                     <li><Link href="/careers" className="dark:text-gray-300  hover:text-black">Careers</Link></li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-semibold mb-4">Connect</h4>
                  <div className="flex space-x-4">
                     <Link href="https://linkedin.com" target="_blank"><Linkedin /></Link>
                     <Link href="https://twitter.com" target="_blank"><Twitter /></Link>
                     <Link href="https://github.com" target="_blank"><Github /></Link>
                     <Link href="mailto:hello@emailsync.com"><Mail /></Link>
                  </div>
               </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center dark:text-gray-300 ">
               © {new Date().getFullYear()} EmailSync. All rights reserved.
            </div>
         </div>
      </footer>
   )
}

const LandingPage = async () => {
   const { userId } = auth()
   if (userId) {
      return redirect('/mail')
   }

   return (
      <div className="min-h-screen flex flex-col dark:text-white text-black">
         <Navbar />

         <main className="flex-grow pt-24 relative">
            {/* Background gradient */}
            <div className="absolute z-[-1] bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_80%)]"></div>

            {/* Hero Section */}
            <div className="container mx-auto px-4 text-center">
               <h1 className="bg-gradient-to-r from-gray-600 to-gray-900 dark:from-white to bg-gray-600 inline-block text-transparent bg-clip-text font-bold text-4xl md:text-6xl mb-4">
                  The minimalistic, <br />AI-powered email client.
               </h1>
               <p className="text-lg md:text-xl dark:text-gray-300  max-w-2xl mx-auto mb-8">
                  Emailsync is a minimalistic, AI-powered email client that empowers you to manage your email with ease.
               </p>
               <div className="space-x-4 mb-12">
                  <Link href="/mail">
                     <Button size="lg">Get Started</Button>
                  </Link>
                  <Link href='https://start-saas.com?utm=emailsync'>
                     <Button variant="outline" size="lg">Learn More</Button>
                  </Link>
               </div>
            </div>

            {/* Features Section */}
            <section id="features" className="container mx-auto px-4 py-16">
               <h2 className="text-2xl font-semibold text-center mb-12">Experience the power of:</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     {
                        title: "AI-driven email RAG",
                        description: "Automatically prioritize your emails with our advanced AI system."
                     },
                     {
                        title: "Full-text search",
                        description: "Quickly find any email with our powerful search functionality."
                     },
                     {
                        title: "Shortcut-focused interface",
                        description: "Navigate your inbox efficiently with our intuitive keyboard shortcuts."
                     }
                  ].map((feature, index) => (
                     <div key={index} className="bg-white dark:bg-gray-800 border rounded-lg shadow-md p-6 text-center">
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="dark:text-gray-300 ">{feature.description}</p>
                     </div>
                  ))}
               </div>
            </section>

            {/* Demo Section */}
            <section id="demo" className="container mx-auto px-4 py-16">
               <Image
                  src='/demo.png'
                  alt='EmailSync Demo'
                  width={1200}
                  height={800}
                  className='mx-auto border rounded-lg shadow-xl transition-all hover:shadow-2xl hover:scale-[101%]'
               />
            </section>
            <FeaturesExtended />
            <PricingSection />
            <ContactSection />
            <FAQSection />
         </main>

         <Footer />
      </div>
   )
}

export default LandingPage
