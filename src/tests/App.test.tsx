import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Home from '@pages/Home'
import NotFound from '@pages/NotFound'
import App from '../App'
import { render as customRedner } from './providers/test-utils'

describe('App render home route', () => {
  it('full app rendering/navigating', async () => {
    customRedner(<App />)

    expect(screen.getByAltText(/switch won/i)).toBeInTheDocument()
  })

  it('landing on a Nofound page', () => {
    const badRoute = '/sf'

    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /not found/i
    )
  })
})
