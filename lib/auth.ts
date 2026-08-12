"use server";

const WC_URL = process.env.NEXT_PUBLIC_WC_URL as string;

export interface WCUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatarUrl: string;
}

// Login — returns JWT token
export async function loginUser(email: string, password: string): Promise<{
  token: string;
  user: WCUser;
} | { error: string }> {
  try {
    const res = await fetch(`${WC_URL}/wp-json/jwt-auth/v1/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Invalid email or password" };
    }

    return {
      token: data.token,
      user: {
        id: data.user_id ?? 0,
        email: data.user_email,
        firstName: data.user_display_name?.split(" ")[0] ?? "",
        lastName: data.user_display_name?.split(" ")[1] ?? "",
        displayName: data.user_display_name,
        avatarUrl: data.user_avatar ?? "",
      },
    };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}

// Register — creates a WooCommerce customer
export async function registerUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<{ success: true; token: string; user: WCUser } | { error: string }> {
  try {
    const WC_KEY = process.env.WC_CONSUMER_KEY as string;
    const WC_SECRET = process.env.WC_CONSUMER_SECRET as string;
    const credentials = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString("base64");

    // Create customer via WooCommerce API
    const res = await fetch(`${WC_URL}/wp-json/wc/v3/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        username: data.email,
      }),
    });

    const customer = await res.json();

    if (!res.ok) {
      // Handle common errors
      if (customer.code === "registration-error-email-exists") {
        return { error: "An account with this email already exists." };
      }
      return { error: customer.message || "Registration failed." };
    }

    // Auto-login after registration
    const loginResult = await loginUser(data.email, data.password);
    if ("error" in loginResult) {
      return { error: loginResult.error };
    }

    return { success: true, ...loginResult };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}

// Get current user from token
export async function getUser(token: string): Promise<WCUser | null> {
  try {
    const res = await fetch(`${WC_URL}/wp-json/wp/v2/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return null;
    const data = await res.json();

    return {
      id: data.id,
      email: data.slug,
      firstName: data.first_name ?? "",
      lastName: data.last_name ?? "",
      displayName: data.name ?? "",
      avatarUrl: data.avatar_urls?.["96"] ?? "",
    };
  } catch {
    return null;
  }
}

// Validate token
export async function validateToken(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${WC_URL}/wp-json/jwt-auth/v1/token/validate`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}