"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Breadcrumb from "@/components/Breadcrumb"
import {
  CreditCard,
  Plus,
  Settings,
  Eye,
  EyeOff,
  MoreHorizontal,
  Check,
  AlertCircle,
  Wallet,
  Trash,
  Edit,
  Lock
} from "lucide-react"
import { toast } from "sonner"

interface PaymentCard {
  id: string
  type: "credit" | "debit"
  lastFour: string
  brand: string
  expiry: string
  cardholderName: string
  isDefault: boolean
  isVerified: boolean
}

const mockCards: PaymentCard[] = [
  {
    id: "1",
    type: "credit",
    lastFour: "4832",
    brand: "Visa",
    expiry: "12/27",
    cardholderName: "John Doe",
    isDefault: true,
    isVerified: true
  },
  {
    id: "2",
    type: "debit",
    lastFour: "5281",
    brand: "Mastercard",
    expiry: "08/28",
    cardholderName: "John Doe",
    isDefault: false,
    isVerified: true
  },
  {
    id: "3",
    type: "credit",
    lastFour: "9921",
    brand: "American Express",
    expiry: "05/26",
    cardholderName: "John Doe",
    isDefault: false,
    isVerified: true
  }
]

export default function CardsPage() {
  const router = useRouter()
  const [cards, setCards] = useState<PaymentCard[]>(mockCards)
  const [showCardNumbers, setShowCardNumbers] = useState(false)
  const [cardToDelete, setCardToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const toggleCardVisibility = () => {
    setShowCardNumbers(!showCardNumbers)
  }

  const toggleDefaultCard = (cardId: string) => {
    const updatedCards = cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    }))
    setCards(updatedCards)
    toast.success("Default card updated!")
  }

  const handleDeleteCard = async (cardId: string) => {
    setIsDeleting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setCards(cards.filter(card => card.id !== cardId))
    setCardToDelete(null)
    setIsDeleting(false)
    
    toast.success("Card removed successfully!")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/dashboard" },
            { label: "Wallet", href: "/dashboard/payments" },
            { label: "Cards", href: "/dashboard/payments/cards" }
          ]} 
        />
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <CreditCard className="w-8 h-8 text-purple-600" />
              Payment Cards
            </h1>
            <p className="text-gray-600">Manage your saved payment methods</p>
          </div>

          <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Add New Card
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cards.length}</div>
            <p className="text-xs text-gray-600 mt-1">Saved in account</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Default Card</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {cards.find(c => c.isDefault)?.brand || "None"}
            </div>
            <p className="text-xs text-gray-600 mt-1">Primary payment method</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Verified Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {cards.filter(c => c.isVerified).length}
            </div>
            <p className="text-xs text-gray-600 mt-1">Ready to use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Card Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {cards.filter(c => c.type === "credit").length} / {cards.filter(c => c.type === "debit").length}
            </div>
            <p className="text-xs text-gray-600 mt-1">Credit / Debit</p>
          </CardContent>
        </Card>
      </div>

      {/* Visibility Toggle */}
      <div className="flex justify-end">
        <Button variant="outline" onClick={toggleCardVisibility}>
          {showCardNumbers ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
          {showCardNumbers ? "Hide" : "Show"} Card Numbers
        </Button>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card key={card.id} className="relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge variant={card.isDefault ? "default" : "secondary"}>
                {card.isDefault ? "Default" : "Other"}
              </Badge>
            </div>
            
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  {card.brand}
                </CardTitle>
                 <div className="flex gap-2">
                   <Button
                     variant="ghost"
                     size="sm"
                     onClick={() => router.push(`/dashboard/payments/cards/${card.id}/edit`)}
                     aria-label="Edit card"
                   >
                     <Edit className="w-4 h-4" />
                   </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setCardToDelete(card.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>Payment method</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-mono font-bold">
                    {showCardNumbers 
                      ? `${card.brand === "American Express" ? "****-****-****-" : "**** **** **** "}${card.lastFour}` 
                      : "•••• •••• •••• ••••"}
                  </div>
                  <div className="flex items-center gap-1">
                    {card.isVerified ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-gray-600">Cardholder Name</p>
                    <p className="font-medium">{card.cardholderName}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600">Expires</p>
                    <p className="font-medium">{card.expiry}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant={card.isDefault ? "outline" : "secondary"} 
                    className="w-full"
                    onClick={() => toggleDefaultCard(card.id)}
                    disabled={card.isDefault}
                  >
                    {card.isDefault ? "Current Default" : "Set as Default"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Add New Card Card */}
        <Card className="flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="p-3 rounded-full bg-purple-100 mb-4">
              <Plus className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-1">Add New Card</h3>
            <p className="text-sm text-gray-600 text-center">Add another payment method to your account</p>
          </CardContent>
        </Card>
      </div>

      {/* Security Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-yellow-600" />
            Card Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription className="text-blue-700">
                All card information is securely encrypted and stored using PCI DSS compliant systems.
              </AlertDescription>
            </Alert>
            
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-700">
                Your cards are protected with multi-layer security including fraud detection and 3D Secure.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Card Activity</CardTitle>
          <CardDescription>Your recent card transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Payment to Store Name</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Card ending in {cards[0]?.lastFour}</span>
                    <span>•</span>
                    <span>Today, 10:30 AM</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-600">-$24.99</p>
                <Badge>Completed</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Online Purchase</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Card ending in {cards[1]?.lastFour}</span>
                    <span>•</span>
                    <span>Yesterday, 4:15 PM</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-600">-$89.99</p>
                <Badge>Completed</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Subscription Renewal</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Card ending in {cards[2]?.lastFour}</span>
                    <span>•</span>
                    <span>Nov 3, 2024</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-600">-$15.00</p>
                <Badge>Completed</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      {cardToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <h3 className="text-lg font-semibold">Remove Card</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove this card? You will need to re-add it to use it for future payments.
            </p>
            
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setCardToDelete(null)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => handleDeleteCard(cardToDelete)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Removing...
                  </div>
                ) : (
                  "Remove Card"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}