import crypto from 'crypto';

// In-memory token store (in production, use Redis or database)
interface TokenData {
  service: string;
  travelers: number;
  totalAmount: number;
  bookingDetails: Record<string, unknown>;
  createdAt: string;
  sessionId: string;
}

const tokenStore = new Map<string, { data: TokenData; expires: number; used: boolean }>();

export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function createPaymentToken(bookingData: TokenData): string {
  const token = generateSecureToken();
  const expires = Date.now() + (30 * 60 * 1000); // 30 minutes expiry
  
  tokenStore.set(token, {
    data: bookingData,
    expires,
    used: false
  });
  
  // Clean up expired tokens (basic cleanup)
  cleanupExpiredTokens();
  
  return token;
}

export function validatePaymentToken(token: string): { valid: boolean; data?: TokenData; error?: string } {
  const tokenData = tokenStore.get(token);
  
  if (!tokenData) {
    return { valid: false, error: 'Token not found' };
  }
  
  if (tokenData.used) {
    return { valid: false, error: 'Token already used' };
  }
  
  if (Date.now() > tokenData.expires) {
    tokenStore.delete(token);
    return { valid: false, error: 'Token expired' };
  }
  
  return { valid: true, data: tokenData.data };
}

export function markTokenAsUsed(token: string): boolean {
  const tokenData = tokenStore.get(token);
  if (tokenData) {
    tokenData.used = true;
    return true;
  }
  return false;
}

export function invalidateToken(token: string): void {
  tokenStore.delete(token);
}

function cleanupExpiredTokens(): void {
  const now = Date.now();
  for (const [token, data] of tokenStore.entries()) {
    if (now > data.expires) {
      tokenStore.delete(token);
    }
  }
}

// Clean up expired tokens every 10 minutes
setInterval(cleanupExpiredTokens, 10 * 60 * 1000);