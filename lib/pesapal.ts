import axios, { type AxiosError } from "axios"

// PesaPal API configuration from environment variables
const PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY as string
const PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET as string
const PESAPAL_API_URL = process.env.PESAPAL_API_URL || "https://pay.pesapal.com/v3"
const CALLBACK_URL = process.env.CALLBACK_URL || "http://localhost:3000/payment-callback"
const SUBSCRIPTION_CALLBACK_URL = process.env.CALLBACK_URL || "http://localhost:3000/subscription/callback"
const IPN_URL = process.env.IPN_URL || "http://localhost:3000/api/ipn"
const SUBSCRIPTION_IPN_URL = process.env.IPN_URL || "http://localhost:3000/api/subscription/ipn"

// Types
interface AuthResponse {
  token: string
  expiryDate: string
}

interface IPNResponse {
  ipn_id: string
  url: string
  created_date: string
  ipn_status: string
}

interface OrderPayload {
  id: string
  currency: string
  amount: string
  description: string
  callback_url: string
  notification_id: string
  billing_address: {
    email_address: string
    phone_number: string
    country_code: string
    first_name: string
    last_name: string
  }
}

interface OrderResponse {
  order_tracking_id: string
  merchant_reference: string
  redirect_url: string
  status: string
  payment_method?: string
}

// Generate auth token
export async function getAuthToken(): Promise<string> {
  try {
    const response = await axios.post<AuthResponse>(`${PESAPAL_API_URL}/api/Auth/RequestToken`, {
      consumer_key: PESAPAL_CONSUMER_KEY,
      consumer_secret: PESAPAL_CONSUMER_SECRET,
    })

    return response.data.token
  } catch (error) {
    const axiosError = error as AxiosError
    console.error("Error getting auth token:", axiosError.response?.data || axiosError.message)
    throw new Error("Failed to get auth token")
  }
}

// Register IPN URL
export async function registerIPN(authToken: string, isSubscription = false): Promise<string> {
  try {
    const url = isSubscription ? SUBSCRIPTION_IPN_URL : IPN_URL

    const response = await axios.post<IPNResponse>(
      `${PESAPAL_API_URL}/api/URLSetup/RegisterIPN`,
      {
        url,
        ipn_notification_type: "GET",
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      },
    )

    return response.data.ipn_id
  } catch (error) {
    const axiosError = error as AxiosError
    console.error("Error registering IPN:", axiosError.response?.data || axiosError.message)
    throw new Error("Failed to register IPN")
  }
}

// Submit order
export async function submitOrder(
  authToken: string,
  ipnId: string,
  orderData: any,
  isSubscription = false,
): Promise<OrderResponse> {
  try {
    const callbackUrl = isSubscription ? SUBSCRIPTION_CALLBACK_URL : CALLBACK_URL

    const orderPayload: OrderPayload = {
      id: orderData.orderId,
      currency: orderData.currency,
      amount: Number.parseFloat(orderData.amount.toString()).toFixed(2),
      description: orderData.description,
      callback_url: callbackUrl,
      notification_id: ipnId,
      billing_address: {
        email_address: orderData.email,
        phone_number: orderData.phone || "",
        country_code: orderData.countryCode,
        first_name: orderData.firstName,
        last_name: orderData.lastName,
      },
    }

    const response = await axios.post<OrderResponse>(
      `${PESAPAL_API_URL}/api/Transactions/SubmitOrderRequest`,
      orderPayload,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      },
    )

    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    console.error("Error submitting order:", axiosError.response?.data || axiosError.message)
    throw new Error("Failed to submit order")
  }
}

// Get transaction status
export async function getTransactionStatus(authToken: string, orderTrackingId: string): Promise<any> {
  try {
    const response = await axios.get(
      `${PESAPAL_API_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      },
    )

    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    console.error("Error getting transaction status:", axiosError.response?.data || axiosError.message)
    throw new Error("Failed to get transaction status")
  }
}

