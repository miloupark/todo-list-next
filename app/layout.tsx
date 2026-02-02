import './styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css'
        ></link>
      </head>
      <body>{children}</body>
    </html>
  );
}
