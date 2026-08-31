interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipRequestMap = new Map<string, RateLimitRecord>();

/**
 * Basic in-memory IP rate limiter for lead submissions
 * Limit: 15 requests per 15 minutes per IP
 */
export function checkRateLimit(ip: string, maxRequests = 15, windowMs = 15 * 60 * 1000): { isAllowed: boolean; remaining: number } {
  const now = Date.now();
  const record = ipRequestMap.get(ip);

  // Clean up expired keys periodically
  if (ipRequestMap.size > 10000) {
    ipRequestMap.forEach((value, key) => {
      if (now > value.resetTime) {
        ipRequestMap.delete(key);
      }
    });
  }

  if (!record || now > record.resetTime) {
    ipRequestMap.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { isAllowed: true, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    return { isAllowed: false, remaining: 0 };
  }

  record.count += 1;
  return { isAllowed: true, remaining: maxRequests - record.count };
}
