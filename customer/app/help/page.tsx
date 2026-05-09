"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  HelpCircle, 
  Search, 
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Package,
  CreditCard,
  RefreshCw,
  ShoppingBag,
  User,
  Shield,
  ExternalLink
} from "lucide-react"

const categories = [
  { icon: ShoppingBag, label: "Orders & Shipping", count: 12 },
  { icon: RefreshCw, label: "Returns & Refunds", count: 8 },
  { icon: CreditCard, label: "Payments & Billing", count: 10 },
  { icon: User, label: "Account & Profile", count: 6 },
  { icon: Shield, label: "Security & Privacy", count: 5 },
  { icon: Package, label: "Products", count: 7 },
]

const faqs = [
  {
    question: "How can I track my order?",
    answer: "You can track your order by going to 'Track Order' in the sidebar menu. Enter your order ID or tracking number to see real-time updates on your package location and estimated delivery time.",
    category: "Orders & Shipping"
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Some items like electronics may have specific return conditions. Visit our Returns page to initiate a return.",
    category: "Returns & Refunds"
  },
  {
    question: "How do I cancel my order?",
    answer: "You can cancel your order within 24 hours of placing it by going to 'My Orders' and clicking 'Cancel Order'. If the order has already been shipped, you'll need to initiate a return instead.",
    category: "Orders & Shipping"
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, UPI, net banking, and NexaShop Wallet. EMI options are also available on select purchases.",
    category: "Payments & Billing"
  },
  {
    question: "How do I change my password?",
    answer: "Go to Settings > Security to change your password. You'll need to enter your current password first, then set a new password. We recommend using a strong, unique password.",
    category: "Account & Profile"
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, all payment information is encrypted using industry-standard SSL technology. We never store your complete card details on our servers. We're also PCI DSS compliant.",
    category: "Security & Privacy"
  },
  {
    question: "How do I use a promo code?",
    answer: "Enter your promo code at checkout in the 'Apply Coupon' field. The discount will be applied automatically if the code is valid and meets all conditions.",
    category: "Payments & Billing"
  },
  {
    question: "What should I do if I receive a damaged item?",
    answer: "If you receive a damaged item, please contact our support team within 48 hours with photos of the damage. We'll arrange for a replacement or full refund at no additional cost.",
    category: "Returns & Refunds"
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <PageLayout activeItem="Help Center">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-primary/10">
          <HelpCircle className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
          <p className="text-sm text-muted-foreground">Find answers and get support</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-6 lg:p-8 mb-8">
        <h2 className="text-xl font-bold text-white mb-2">How can we help you?</h2>
        <p className="text-white/80 mb-4">Search our knowledge base or browse categories below</p>
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-white border-0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories & FAQs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Categories */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Browse by Category</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((category) => (
                <button
                  key={category.label}
                  onClick={() => setSelectedCategory(selectedCategory === category.label ? null : category.label)}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    selectedCategory === category.label 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <category.icon className={`h-6 w-6 mb-2 ${
                    selectedCategory === category.label ? "text-primary" : "text-muted-foreground"
                  }`} />
                  <p className="font-medium text-foreground text-sm">{category.label}</p>
                  <p className="text-xs text-muted-foreground">{category.count} articles</p>
                </button>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Frequently Asked Questions</h3>
              {selectedCategory && (
                <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)}>
                  Clear filter
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-foreground pr-4">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4">
                      <p className="text-muted-foreground">{faq.answer}</p>
                      <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                        {faq.category}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              {filteredFaqs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No results found for your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="space-y-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Contact Support</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors text-left">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Live Chat</p>
                  <p className="text-xs text-muted-foreground">Available 24/7</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors text-left">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Phone Support</p>
                  <p className="text-xs text-muted-foreground">1-800-NEXA-SHOP</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors text-left">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email Support</p>
                  <p className="text-xs text-muted-foreground">support@nexashop.com</p>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { label: "Shipping Information", href: "#" },
                { label: "Return Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Privacy Policy", href: "#" },
              ].map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between p-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {link.label}
                  <ExternalLink className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-muted/50 rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Was this helpful?</h3>
            <p className="text-sm text-muted-foreground mb-4">Help us improve our support resources</p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">Yes</Button>
              <Button variant="outline" className="flex-1">No</Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
