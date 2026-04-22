import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../components/layout/app-layout'
import { AllPage } from '../pages/all-page'
import { CategoryPage } from '../pages/category-page'
import { ROUTES } from '../constants/routes'

export function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path={ROUTES.home} element={<Navigate to={ROUTES.all} replace />} />
        <Route path={ROUTES.all} element={<AllPage />} />
        <Route path={ROUTES.category} element={<CategoryPage />} />
      </Routes>
    </AppLayout>
  )
}

