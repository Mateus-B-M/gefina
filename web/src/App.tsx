import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router';

import DashboardPage from './DashboardPage.tsx';
import InvoicePage from './InvoicePage.tsx';

export default function App() {
    return <div>

        <BrowserRouter>
            <nav>
                <Link to='/'>Painel Inicial</Link>
                <Link to='/faturas'>Faturas</Link>
            </nav>
            <Routes>
                <Route path='/' element={<DashboardPage />} />
                <Route path='/faturas' element={<InvoicePage />} />
            </Routes>

        </BrowserRouter>
    </div>
}