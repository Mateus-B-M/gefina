import {createRoot} from 'react-dom/client';
import InvoicePage from './InvoicePage.tsx';
import App from './App.tsx';

const root =document.querySelector('div');

if (root !==null ) createRoot(root).render(<App/>);