import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { LibraryPage } from './pages/LibraryPage';
import { CollaboratePage } from './pages/CollaboratePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SessionPage } from './pages/SessionPage';
import { SessionReviewPage } from './pages/SessionReviewPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SettingsPage } from './pages/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'library', element: <LibraryPage /> },
      { path: 'collaborate', element: <CollaboratePage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'settings', element: <SettingsPage /> }
    ]
  },
  {
    path: '/session/:id',
    element: <SessionPage />
  },
  {
    path: '/session/:id/review',
    element: <SessionReviewPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);
