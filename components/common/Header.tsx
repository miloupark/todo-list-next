'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <div className='w-full border-b border-slate-200 bg-white'>
      <header className='mx-auto flex items-center px-6 h-15 w-full max-w-312'>
        <button
          type='button'
          onClick={() => {
            window.location.href = '/';
          }}
          className='flex items-center'
          aria-label='홈으로 이동'
        >
          {/*  모바일 logo */}
          <Image
            src='/img/logo_sm.svg'
            alt='로고'
            width={71}
            height={40}
            className='block md:hidden'
          />
          {/*  태블릿/데스크탑 logo */}
          <Image
            src='/img/logo_lg.svg'
            alt='로고'
            width={151}
            height={40}
            className='hidden md:block'
          />
        </button>
      </header>
    </div>
  );
}
