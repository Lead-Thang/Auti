"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import Breadcrumb from "@/components/Breadcrumb"
import {
  CreditCard,
  Info,
  AlertCircle,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
  Calendar,
  Wallet
} from "lucide-react"
import { toast } from "sonner"

export default function AddCardPage() {
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isDefault, setIsDefault] = useState(false)
  const [saveCard, setSaveCard] = useState(true)
  const [showCvv, setShowCvv] = useState(false)
  const [showProcessing, setShowProcessing] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleAddCard = () => {
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast.error("Please fill in all required fields")
      return
    }

    // Validate card number (basic validation)
    const cleanCardNumber = cardNumber.replace(/\s/g, '')
    if (!/^\d{16}$/.test(cleanCardNumber)) {
      toast.error("Please enter a valid 16-digit card number")
      return
    }

    // Validate expiry date (basic validation)
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      toast.error("Please enter a valid expiry date (MM/YY)")
      return
    }

    // Validate CVV (basic validation)
    if (!/^\d{3,4}$/.test(cvv)) {
      toast.error("Please enter a valid CVV (3-4 digits)")
      return
    }

    setIsConfirmed(true)
  }

  const handleConfirmCard = async () => {
    setShowProcessing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setShowProcessing(false)
    setIsConfirmed(false)
    
    toast.success("Card added successfully!")
    
    // Reset form
    setCardNumber("")
    setCardName("")
    setExpiryDate("")
    setCvv("")
    setIsDefault(false)
    setSaveCard(true)
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '').replace(/\D/g, '')
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/)
    if (!match) return value
    return [match[1], match[2], match[3], match[4]].filter(Boolean).join(' ')
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setCardNumber(formatted)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="space-y-4 mb-8">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/dashboard" },
            { label: "Wallet", href: "/dashboard/payments" },
            { label: "Cards", href: "/dashboard/payments/cards" },
            { label: "Add Card", href: "/dashboard/payments/cards/add" }
          ]} 
        />
        
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CreditCard className="w-8 h-8 text-purple-600" />
            Add New Card
          </h1>
          <p className="text-gray-600">Securely add a new payment card to your wallet</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Card Details</CardTitle>
          <CardDescription>Enter your card information securely</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Card Number */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="cardNumber"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className="pl-10"
                maxLength={19}
              />
            </div>
          </div>

          {/* Cardholder Name */}
          <div className="space-y-2">
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              placeholder="John Doe"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Expiry Date */}
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="pl-10"
                  maxLength={5}
                />
              </div>
            </div>

            {/* CVV */}
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="cvv"
                  type={showCvv ? "text" : "password"}
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="pl-10 pr-10"
                  maxLength={4}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 h-4 w-4 text-gray-400"
                  onClick={() => setShowCvv(!showCvv)}
                >
                  {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Security Info */}
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-700" />
            <AlertDescription className="text-blue-700">
              Your card information is securely encrypted and stored with PCI DSS compliance.
            </AlertDescription>
          </Alert>

          {/* Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="saveCard" className="text-base font-medium">
                  Save Card
                </Label>
                <p className="text-sm text-gray-600">Keep this card for future payments</p>
              </div>
              <Switch
                id="saveCard"
                checked={saveCard}
                onCheckedChange={setSaveCard}
              />
            </div>

            {saveCard && (
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isDefault" className="text-base font-medium">
                    Set as Default
                  </Label>
                  <p className="text-sm text-gray-600">Use this card as your default payment method</p>
                </div>
                <Switch
                  id="isDefault"
                  checked={isDefault}
                  onCheckedChange={setIsDefault}
                />
              </div>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" defaultChecked />
            <div>
              <Label htmlFor="terms" className="text-sm font-medium">
                I agree to the <span className="text-purple-600">Terms of Service</span> and acknowledge that I have read the <span className="text-purple-600">Privacy Policy</span>
              </Label>
            </div>
          </div>

          {/* Add Card Button */}
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600" 
            onClick={handleAddCard}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Add Card Securely
          </Button>
        </CardContent>
      </Card>

      {/* Verification Info */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            Card Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>After adding your card, a small verification charge may be applied and refunded</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Card will be ready to use immediately after verification</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>You can manage all your cards in the Cards section</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmed} onOpenChange={setIsConfirmed}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Card Details</DialogTitle>
            <DialogDescription>
              Please verify the card information before adding it to your wallet
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Card Number:</span>
              <span className="font-semibold">**** {cardNumber.slice(-4)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Cardholder Name:</span>
              <span className="font-semibold">{cardName}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Expiry Date:</span>
              <span className="font-semibold">{expiryDate}</span>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-200 pt-2">
              <span>Default Card:</span>
              <Badge variant={isDefault ? "default" : "secondary"}>
                {isDefault ? "Yes" : "No"}
              </Badge>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsConfirmed(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleConfirmCard}
              disabled={showProcessing}
            >
              {showProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm & Add Card
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}