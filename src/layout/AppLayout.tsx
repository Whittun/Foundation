import { Outlet } from 'react-router-dom';
import s from './AppLayout.module.css';
import { AppMenu } from '../components/AppMenu';

export const AppLayout = () => {
  return (
    <div className={s.root}>
      <aside className={s.aside}>
        <AppMenu />
      </aside>
      <main className={s.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};
