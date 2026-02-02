import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Image src="/logos.png" width={469} height={167} alt='Ritext' className='w-[140px]' />,
    },
  };
}
