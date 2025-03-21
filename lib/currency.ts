// Exchange rates (as of a recent date)
// In a production app, you would use a real-time currency API
const exchangeRates: Record<string, number> = {
  KES: 1,
  USD: 0.0078, // 1 KES = 0.0078 USD
  EUR: 0.0072, // 1 KES = 0.0072 EUR
  GBP: 0.0062, // 1 KES = 0.0062 GBP
}

export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
  if (fromCurrency === toCurrency) {
    return amount
  }

  // Convert to base currency (KES) first if needed
  const amountInKES = fromCurrency === "KES" ? amount : amount / exchangeRates[fromCurrency]

  // Convert from KES to target currency
  const convertedAmount = amountInKES * exchangeRates[toCurrency]

  // Round to 2 decimal places
  return Math.round(convertedAmount * 100) / 100
}

export function formatCurrency(amount: number, currency: string): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  })

  return formatter.format(amount)
}

