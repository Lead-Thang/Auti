/**
 * Shared utility functions for admin panel
 */

/**
 * Generic function to get status color classes for badges
 * @param status - The status string
 * @param statusMap - Mapping of status values to color classes
 * @returns Tailwind CSS class string for the status color
 */
export const getStatusColor = (status: string, statusMap: Record<string, string>): string => {
  // Convert status to lowercase for comparison
  const normalizedStatus = status.toLowerCase();
  
  // Return the mapped color class or a default class if not found
  return statusMap[normalizedStatus] || 'bg-gray-100 text-gray-800';
};

/**
 * Get color class for commission status
 */
export const getCommissionStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'paid': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'processing': 'bg-blue-100 text-blue-800',
    'refunded': 'bg-red-100 text-red-800',
  };
  
  return getStatusColor(status, statusMap);
};

/**
 * Get color class for dispute status
 */
export const getDisputeStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'open': 'bg-red-100 text-red-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'resolved': 'bg-green-100 text-green-800',
  };
  
  // Handle 'in progress' variation
  if (status.toLowerCase() === 'in progress') {
    return 'bg-yellow-100 text-yellow-800';
  }
  
  return getStatusColor(status, statusMap);
};

/**
 * Get color class for escrow status
 */
export const getEscrowStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'held': 'bg-yellow-100 text-yellow-800',
    'released': 'bg-green-100 text-green-800',
    'pending': 'bg-blue-100 text-blue-800',
    'disputed': 'bg-red-100 text-red-800',
  };
  
  return getStatusColor(status, statusMap);
};

/**
 * Get color class for job status
 */
export const getJobStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'active': 'bg-green-100 text-green-800',
    'completed': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'closed': 'bg-gray-100 text-gray-800',
  };
  
  // Handle 'in progress' and 'in-progress' variations
  if (status.toLowerCase() === 'in progress' || status.toLowerCase() === 'in-progress') {
    return 'bg-yellow-100 text-yellow-800';
  }
  
  return getStatusColor(status, statusMap);
};

/**
 * Get color class for message status
 */
export const getMessageStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'read': 'bg-gray-100 text-gray-800',
    'unread': 'bg-blue-100 text-blue-800',
  };
  
  return getStatusColor(status, statusMap);
};

/**
 * Get color class for content status in moderation
 */
export const getContentStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
  };
  
  return getStatusColor(status, statusMap);
};

/**
 * Get color class for connection status
 */
export const getConnectionStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'active': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'accepted': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'inactive': 'bg-gray-100 text-gray-800',
  };
  
  return getStatusColor(status, statusMap);
};

/**
 * Get color class for order status
 */
export const getOrderStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'completed': 'bg-green-100 text-green-800',
    'processing': 'bg-yellow-100 text-yellow-800',
    'pending': 'bg-blue-100 text-blue-800',
    'cancelled': 'bg-red-100 text-red-800',
  };
  
  return getStatusColor(status, statusMap);
};

/**
 * Get color class for payment status
 */
export const getPaymentStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'completed': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'refunded': 'bg-blue-100 text-blue-800',
    'failed': 'bg-red-100 text-red-800',
  };
  
  return getStatusColor(status, statusMap);
};

/**
 * Get color class for shipping status
 */
export const getShippingStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'processing': 'bg-blue-100 text-blue-800',
    'shipped': 'bg-yellow-100 text-yellow-800',
    'delivered': 'bg-green-100 text-green-800',
    'returned': 'bg-red-100 text-red-800',
  };
  
  return getStatusColor(status, statusMap);
};

/**
 * Get color class for partnership status
 */
export const getPartnershipStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'active': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'terminated': 'bg-red-100 text-red-800',
  };
  
  return getStatusColor(status, statusMap);
};

/**
 * Get color class for payout status
 */
export const getPayoutStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'completed': 'bg-green-100 text-green-800',
    'processing': 'bg-yellow-100 text-yellow-800',
    'pending': 'bg-blue-100 text-blue-800',
    'failed': 'bg-red-100 text-red-800',
  };
  
  return getStatusColor(status, statusMap);
};

/**
 * Get color class for product status
 */
export const getProductStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'active': 'bg-green-100 text-green-800',
    'out-of-stock': 'bg-red-100 text-red-800',
    'low-stock': 'bg-yellow-100 text-yellow-800',
  };
  
  // Handle 'out of stock' variation
  if (status.toLowerCase() === 'out of stock') {
    return 'bg-red-100 text-red-800';
  }
  
  return getStatusColor(status, statusMap);
};

/**
 * Get color class for project status
 */
export const getProjectStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-green-100 text-green-800',
    'not-started': 'bg-blue-100 text-blue-800',
    'on-hold': 'bg-red-100 text-red-800',
  };
  
  // Handle various status variations
  if (status.toLowerCase() === 'in progress') {
    return 'bg-yellow-100 text-yellow-800';
  }
  if (status.toLowerCase() === 'not started') {
    return 'bg-blue-100 text-blue-800';
  }
  
  return getStatusColor(status, statusMap);
};

/**
 * Get color class for ticket/support status
 */
export const getTicketStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'open': 'bg-red-100 text-red-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'resolved': 'bg-green-100 text-green-800',
  };
  
  // Handle 'in progress' variation
  if (status.toLowerCase() === 'in progress') {
    return 'bg-yellow-100 text-yellow-800';
  }
  
  return getStatusColor(status, statusMap);
};

/**
 * Get color class for tax status
 */
export const getTaxStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'filed': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
  };
  
  return getStatusColor(status, statusMap);
};

/**
 * Get color class for user status
 */
export const getUserStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'active': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'suspended': 'bg-red-100 text-red-800',
  };
  
  return getStatusColor(status, statusMap);
};

/**
 * Get color class for transaction status
 */
export const getTransactionStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'completed': 'bg-green-100 text-green-800',
    'refunded': 'bg-blue-100 text-blue-800',
  };
  
  return getStatusColor(status, statusMap);
};