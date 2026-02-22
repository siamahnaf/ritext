import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout className="[--fd-layout-width:1720px]" {...baseOptions()}>
      {children}
    </HomeLayout>
  );
}
