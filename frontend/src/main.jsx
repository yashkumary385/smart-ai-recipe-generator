import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router }from './App'
import { ToastContainer, Bounce } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
        />
   <RouterProvider router={router}/>
  </StrictMode>,
)
