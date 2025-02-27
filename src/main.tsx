import { createRoot } from 'react-dom/client'
import './index.less'
import { RouterProvider } from 'react-router-dom'
import router from './routers/index.tsx'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
