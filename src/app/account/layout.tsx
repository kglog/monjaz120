import './account.append.css';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="account-page">{children}</div>;
}
