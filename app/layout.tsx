import './globals.css';
export const metadata = {
  title: 'Form Demo',
  desciption: 'Inspection Forms',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
