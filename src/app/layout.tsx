
import '@/app/globals.css'
import Navbar from '@component/Navbar'
import Footer from '@/components/Footer'
import QueryClientContext from '@context/QueryClientContext'
import AuthContext from '@/context/AuthContext'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '웹툰 웹 서비스',
  description: '여러 플랫폼의 웹툰들의 순위를 종합',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
        <body className={`pt-[80px]`}>
           
            <AuthContext>
              <QueryClientContext>  
                    <Navbar></Navbar>
                    <main>
                      <div className = 'relative w-full h-full'>
                         
                        {children}             
                      </div>
                      <Footer />
                    </main>
                    <div id = "modal"></div>
              </QueryClientContext>
            </AuthContext>
        </body>
    </html>
  )
}
