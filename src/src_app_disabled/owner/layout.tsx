export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  // Middleware now protects /owner/*; layout should simply render children.
  return <div className="min-h-screen bg-white">{children}</div>;
}

// ASSISTANT_FINAL: true
