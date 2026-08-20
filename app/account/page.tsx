"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { loginUser, registerUser } from "@/lib/auth";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Leaf, ArrowRight, Mail, Lock, User } from "lucide-react";

type Tab = "login" | "register";

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { login, isLoggedIn, user, logout } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  // Redirect if already logged in — show dashboard instead
  if (isLoggedIn && user) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-[#E8E2CC] p-8 text-center">
          <div className="w-16 h-16 bg-[#E8F5D0] rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={28} className="text-[#2D5016]" />
          </div>
          <h2 className="text-xl font-bold text-[#2D3A1E] mb-1">
            Welcome, {user.firstName}!
          </h2>
          <p className="text-[#7A8C5E] text-sm mb-6">{user.email}</p>
          <div className="space-y-3">
            <Link
              href="/account/orders"
              className="flex items-center justify-between px-4 py-3 bg-[#F5F0E0] rounded-xl text-sm font-medium text-[#2D3A1E] hover:bg-[#EBE5CC] transition-colors"
            >
              My Orders <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => { logout(); router.push("/"); }}
              className="w-full px-4 py-3 border border-[#D4C9A8] rounded-xl text-sm font-medium text-[#7A8C5E] hover:border-red-300 hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await loginUser(loginForm.email, loginForm.password);
    console.log(result);
    if ("error" in result) {
      setError(result.error);
    } else {
      login(result.token, result.user);
      router.push("/");
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const result = await registerUser(registerForm);
    if ("error" in result) {
      setError(result.error);
    } else {
      login(result.token, result.user);
      router.push("/");
    }
    setLoading(false);
    console.log(result);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8 group">
          <div className="w-9 h-9 bg-[#2D5016] rounded-full flex items-center justify-center group-hover:bg-[#3D6B1E] transition-colors">
            <Leaf size={18} className="text-[#A8D86A]" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-[#2D5016] text-lg tracking-tight">Sabuj Mati</div>
            <div className="text-[#7A8C5E] text-xs">Organic Bangladesh</div>
          </div>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#E8E2CC] shadow-sm overflow-hidden">

          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-[#E8E2CC]">
            <button
              onClick={() => setTab("login")}
              className={`py-4 text-sm font-semibold transition-colors ${
                tab === "login"
                  ? "text-[#2D5016] border-b-2 border-[#2D5016] bg-[#FAFAF7]"
                  : "text-[#7A8C5E] hover:text-[#2D5016]"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setTab("register")}
              className={`py-4 text-sm font-semibold transition-colors ${
                tab === "register"
                  ? "text-[#2D5016] border-b-2 border-[#2D5016] bg-[#FAFAF7]"
                  : "text-[#7A8C5E] hover:text-[#2D5016]"
              }`}
            >
              Register
            </button>
          </div>

          <div className="p-6">

            {/* Login Form */}
            {tab === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#4A5E30] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B896]" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-4 py-2.5 border border-[#D4C9A8] rounded-xl text-sm outline-none focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]/20 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-[#4A5E30]">
                      Password
                    </label>
                    <Link href="/account/forgot-password" className="text-xs text-[#2D5016] hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B896]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 border border-[#D4C9A8] rounded-xl text-sm outline-none focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]/20 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8B896] hover:text-[#4A5E30] transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#2D5016] text-white font-semibold py-3 rounded-xl hover:bg-[#3D6B1E] disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Login <ArrowRight size={16} /></>
                  )}
                </button>

                <p className="text-center text-xs text-[#7A8C5E] pt-2">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setTab("register")}
                    className="text-[#2D5016] font-semibold hover:underline"
                  >
                    Register
                  </button>
                </p>
              </form>
            )}

            {/* Register Form */}
            {tab === "register" && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#4A5E30] mb-1.5">
                      First Name
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B896]" />
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={registerForm.firstName}
                        onChange={handleRegisterChange}
                        placeholder="John"
                        className="w-full pl-9 pr-3 py-2.5 border border-[#D4C9A8] rounded-xl text-sm outline-none focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]/20 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A5E30] mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={registerForm.lastName}
                      onChange={handleRegisterChange}
                      placeholder="Doe"
                      className="w-full px-3 py-2.5 border border-[#D4C9A8] rounded-xl text-sm outline-none focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]/20 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A5E30] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B896]" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-4 py-2.5 border border-[#D4C9A8] rounded-xl text-sm outline-none focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]/20 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A5E30] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B896]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      minLength={8}
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                      placeholder="Min. 8 characters"
                      className="w-full pl-9 pr-10 py-2.5 border border-[#D4C9A8] rounded-xl text-sm outline-none focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]/20 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8B896] hover:text-[#4A5E30] transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A5E30] mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B896]" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      required
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterChange}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 border border-[#D4C9A8] rounded-xl text-sm outline-none focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]/20 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8B896] hover:text-[#4A5E30] transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#7A8C5E]">
                  By registering you agree to our{" "}
                  <Link href="/terms" className="text-[#2D5016] hover:underline">Terms</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-[#2D5016] hover:underline">Privacy Policy</Link>.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#2D5016] text-white font-semibold py-3 rounded-xl hover:bg-[#3D6B1E] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Create Account <ArrowRight size={16} /></>
                  )}
                </button>

                <p className="text-center text-xs text-[#7A8C5E] pt-2">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setTab("login")}
                    className="text-[#2D5016] font-semibold hover:underline"
                  >
                    Login
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Back to shop */}
        <p className="text-center text-xs text-[#7A8C5E] mt-6">
          <Link href="/products" className="hover:text-[#2D5016] transition-colors">
            ← Continue shopping
          </Link>
        </p>
      </div>
    </div>
  );
}