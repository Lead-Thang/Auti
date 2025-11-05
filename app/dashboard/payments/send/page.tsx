"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import Breadcrumb from "@/components/Breadcrumb"
import {
  Send,
  DollarSign,
  User,
  Clock,
  CheckCircle,
  Calendar as CalendarIcon,
  Wallet,
  CreditCard,
  Banknote,
  AlertCircle,
  Info
} from "lucide-react"

// Mock data
const mockRecipients = [
  { id: "1", name: "John Smith", email: "john@example.com", image: "/avatars/01.png" },
  { id: "2", name: "Sarah Johnson", email: "sarah@example.com", image: "/avatars/02.png" },
  { id: "3", name: "Mike Williams", email: "mike@example.com", image: "/avatars/03.png" },
  { id: "4", name: "Emma Davis", email: "emma@example.com", image: "/avatars/04.png" },
]

const mockPaymentMethods = [
  { id: "wallet", name: "Wallet Balance", balance: 5234.50, type: "wallet" },
  { id: "card1", name: "Credit Card (****4832)", type: "card" },
  { id: "card2", name: "Debit Card (****5281)", type: "card" },
]

export default function SendMoneyPage() {
  const [recipient, setRecipient] = useState<string | null>(null)
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("wallet")
  const [description, setDescription] = useState("")
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(undefined)
  const [saveAsFavorite, setSaveAsFavorite] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSendMoney = () => {
    if (!recipient || !amount) {
      return
    }
    
    setIsConfirming(true)
  }

  const handleConfirmPayment = () => {
    setIsProcessing(true)
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false)
      setIsConfirming(false)
      // Reset form
      setRecipient(null)
      setAmount("")
      setDescription("")
      setScheduleDate(undefined)
      setSaveAsFavorite(false)
    }, 2000)
  }

  const filteredRecipients = mockRecipients.filter(recipient =>
    recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipient.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedRecipient = mockRecipients.find(r => r.id === recipient)
  const selectedPaymentMethod = mockPaymentMethods.find(pm => pm.id === paymentMethod)

  const feeRate = 0.025 // 2.5% fee
  const feeAmount = parseFloat(amount) * feeRate
  const totalAmount = parseFloat(amount) + feeAmount

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/dashboard" },
            { label: "Wallet", href: "/dashboard/payments" },
            { label: "Send Money", href: "/dashboard/payments/send" }
          ]} 
        />
        
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Send className="w-8 h-8 text-purple-600" />
            Send Money
          </h1>
          <p className="text-gray-600">Transfer funds to contacts or accounts</p>
        </div>
      </div>

      {/* Send Money Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Send Payment</CardTitle>
              <CardDescription>Enter payment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10 text-2xl"
                  />
                  <Select defaultValue="USD">
                    <SelectTrigger className="w-20 absolute right-3 top-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Recipient Selection */}
              <div className="space-y-2">
                <Label>Recipient</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedRecipient ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={selectedRecipient.image} />
                            <AvatarFallback>
                              {selectedRecipient.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{selectedRecipient.name}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-500">
                          <User className="w-4 h-4" />
                          <span>Select recipient</span>
                        </div>
                      )}
                      <div className="h-4 w-px bg-gray-300 mx-2" />
                      <span>Select</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Select Recipient</DialogTitle>
                      <DialogDescription>
                        Choose from your contacts or favorites
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User className="w-4 h-4 text-gray-400" />
                        </div>
                        <Input
                          placeholder="Search contacts..."
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {filteredRecipients.map((recipientItem) => (
                          <div
                            key={recipientItem.id}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                              recipient === recipientItem.id ? "bg-purple-50 border border-purple-200" : ""
                            }`}
                            onClick={() => {
                              setRecipient(recipientItem.id)
                              setSearchQuery("")
                            }}
                          >
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={recipientItem.image} />
                              <AvatarFallback>
                                {recipientItem.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{recipientItem.name}</p>
                              <p className="text-sm text-gray-600">{recipientItem.email}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="wallet" className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" /> Wallet
                    </TabsTrigger>
                    <TabsTrigger value="card1" className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" /> Card
                    </TabsTrigger>
                    <TabsTrigger value="card2" className="flex items-center gap-2">
                      <Banknote className="w-4 h-4" /> Card
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Note (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add a note for the recipient..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Schedule Payment */}
              <div className="space-y-2">
                <Label>Schedule Payment (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scheduleDate ? (
                        scheduleDate.toLocaleDateString()
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={scheduleDate}
                      onSelect={setScheduleDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Save as Favorite */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="save-favorite"
                  checked={saveAsFavorite}
                  onCheckedChange={(checked) => setSaveAsFavorite(!!checked)}
                />
                <Label htmlFor="save-favorite">Save as favorite recipient</Label>
              </div>

              {/* Fee Info */}
              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-700" />
                <AlertDescription className="text-blue-700">
                  <div className="flex justify-between">
                    <span>Transaction Fee (2.5%):</span>
                    <span>${feeAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium mt-1">
                    <span>Total Amount:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </AlertDescription>
              </Alert>

              {/* Send Button */}
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600" 
                onClick={handleSendMoney}
                disabled={!recipient || !amount || parseFloat(amount) <= 0}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Money
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Summary Card */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedRecipient && (
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={selectedRecipient.image} />
                      <AvatarFallback>
                        {selectedRecipient.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{selectedRecipient.name}</p>
                      <p className="text-sm text-gray-600">{selectedRecipient.email}</p>
                    </div>
                  </div>
                )}

                {amount && (
                  <div className="py-3 border-t border-b border-gray-100">
                    <div className="flex justify-between mb-1">
                      <span>Amount:</span>
                      <span className="font-semibold">${amount}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Fee (2.5%):</span>
                      <span>${feeAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold mt-2">
                      <span>Total:</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">From:</p>
                    <div className="flex items-center gap-2 mt-1">
                      {selectedPaymentMethod.type === "wallet" ? (
                        <Wallet className="w-5 h-5 text-purple-600" />
                      ) : (
                        <CreditCard className="w-5 h-5 text-purple-600" />
                      )}
                      <span className="font-medium">{selectedPaymentMethod.name}</span>
                      {selectedPaymentMethod.type === "wallet" && (
                        <Badge variant="secondary">
                          ${selectedPaymentMethod.balance.toFixed(2)}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {scheduleDate && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Scheduled for {scheduleDate.toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Security Info */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                Security Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Your payment is secured with end-to-end encryption. Funds will be transferred immediately unless scheduled.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirming} onOpenChange={setIsConfirming}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription>
              Please review the payment details before proceeding.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">To:</span>
              <div className="flex items-center gap-2">
                {selectedRecipient && (
                  <>
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={selectedRecipient.image} />
                      <AvatarFallback>
                        {selectedRecipient.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{selectedRecipient.name}</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold">${amount}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Fee (2.5%):</span>
              <span>${feeAmount.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-200 pt-2 font-bold">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">From:</span>
              <span>{selectedPaymentMethod?.name}</span>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsConfirming(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleConfirmPayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm Payment
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}