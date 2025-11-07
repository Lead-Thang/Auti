'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Calendar,
  DollarSign,
  MapPin,
  ArrowLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock tax data - in a real app, this would come from an API
const mockTaxRecords = [
  { id: 'TAX-001', orderId: '#ORD-001', customerCountry: 'USA', sellerCountry: 'USA', taxRate: 8.5, taxAmount: 9.72, total: 124.09, date: '2023-10-20', status: 'filed' },
  { id: 'TAX-002', orderId: '#ORD-002', customerCountry: 'Canada', sellerCountry: 'USA', taxRate: 5.0, taxAmount: 4.27, total: 89.76, date: '2023-10-21', status: 'pending' },
  { id: 'TAX-003', orderId: '#ORD-003', customerCountry: 'UK', sellerCountry: 'USA', taxRate: 20.0, taxAmount: 25.04, total: 150.23, date: '2023-10-22', status: 'pending' },
  { id: 'TAX-004', orderId: '#ORD-004', customerCountry: 'USA', sellerCountry: 'USA', taxRate: 8.5, taxAmount: 16.40, total: 209.39, date: '2023-10-19', status: 'filed' },
  { id: 'TAX-005', orderId: '#ORD-005', customerCountry: 'Germany', sellerCountry: 'USA', taxRate: 19.0, taxAmount: 10.39, total: 65.06, date: '2023-10-20', status: 'pending' },
  { id: 'TAX-006', orderId: '#ORD-006', customerCountry: 'USA', sellerCountry: 'USA', taxRate: 8.5, taxAmount: 15.55, total: 198.54, date: '2023-10-22', status: 'pending' },
];

export default function TaxDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [taxRecord, setTaxRecord] = useState<any>(null);

  // Decode the URI component to get the original tax ID
  const decodedTaxId = decodeURIComponent(params.id);

  useEffect(() => {
    // In a real app, you would fetch tax data based on the decoded ID
    const record = mockTaxRecords.find(tax => tax.id === decodedTaxId);
    if (record) {
      setTaxRecord(record);
    } else {
      // Handle case where tax record is not found
      console.log('Tax record not found for ID:', decodedTaxId);
    }
  }, [decodedTaxId]);

  const getTaxStatusColor = (status: string) => {
    switch (status) {
      case 'filed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!taxRecord) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tax Records
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">Tax record not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tax Records
          </Button>
          <h1 className="text-3xl font-bold">Tax Record Details</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Edit Record</Button>
          <Button variant="destructive">Delete Record</Button>
        </div>
      </div>

      {/* Tax Record Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <h2 className="text-2xl font-bold">#{taxRecord.id}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={getTaxStatusColor(taxRecord.status)}>
                    {taxRecord.status.charAt(0).toUpperCase() + taxRecord.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-500">Order ID</span>
              </div>
              <span className="font-medium">{taxRecord.orderId}</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-500">Customer Country</span>
              </div>
              <span className="font-medium">{taxRecord.customerCountry}</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-500">Seller Country</span>
              </div>
              <span className="font-medium">{taxRecord.sellerCountry}</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-500">Tax Rate</span>
              </div>
              <span className="font-medium">{taxRecord.taxRate}%</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-500">Tax Amount</span>
              </div>
              <span className="font-medium">${taxRecord.taxAmount.toFixed(2)}</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-500">Total Amount</span>
              </div>
              <span className="font-medium">${taxRecord.total.toFixed(2)}</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-500">Date</span>
              </div>
              <span className="font-medium">{taxRecord.date}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Calculation Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Order Subtotal</span>
              <span>${(taxRecord.total - taxRecord.taxAmount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Tax Rate ({taxRecord.taxRate}%)</span>
              <span>${taxRecord.taxAmount.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span>${taxRecord.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}