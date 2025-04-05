//types
import type { MouseEventHandler } from 'react';
//components
import Link from 'next/link';
import Badge from 'frui/element/Badge';
//hooks
import { useEffect } from 'react';
import { useLanguage } from 'r22n';
import { useTheme } from '../../../theme';
//helpers
import { getCookie, setCookie } from 'cookies-next';

const UserMenu: React.FC<{ 
  open?: boolean,
  user?: Record<string, any>|null,
  toggleUserMenu: MouseEventHandler
}> = ({ open = false, toggleUserMenu, user }) => {
  const { _, changeLanguage, language } = useLanguage();
  const { languages } = useTheme();
  const translate = (lang: string) => {
    changeLanguage(lang, languages[lang].translations);
    setCookie('language', lang);
  }
  useEffect(() => {
    const cookie = getCookie('language') || 'en_US';
    const lang = cookie in languages? cookie: 'en_US'
    changeLanguage(lang, languages[lang].translations);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside className={`flex flex-col w-full max-w-xs duration-200 absolute top-0 bottom-0 z-50 bg-[#243545] border-r border-[#111827] text-gray-400 ${open? 'right-0': '-right-96' }`}>
      <main className="flex flex-col flex-grow">
        <ul className="m-0 p-0 absolute w-full">
          <li className="pt-2 pb-2.5">            
            <div className="flex py-1 px-4">
              <button className="text-sm mr-3" onClick={toggleUserMenu}>
                <i className="fas fa-chevron-right"></i>
              </button>
              <div className="uppercase text-white text-5xl">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="pl-4 w-full text-white">
                <h1 className="uppercase">{ user?.name }</h1>
                <div className="text-sm text-slate-300">{ user?.role }</div>
                <div className="mt-1 text-xs text-right">
                  {Object.keys(languages).map((lang, i) => (
                    <span key={i} className="mr-1 cursor-pointer inline-block" onClick={() => translate(lang)} >
                      <Badge className="inline-block" outline color={language === lang? '#FFFFFF': '#999999'}>
                        {languages[lang].label}
                      </Badge>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </li>
          <li className="border-t py-4 border-slate-600 text-sm">
            <Link className="px-4" href={`/user/${user?.id}`}>
              <i className="fas fa-user text-[#91C8D5] inline-block mr-2" />
              <span>{_('View Profile')}</span>
            </Link>
          </li>
          <li className="border-t py-4 border-slate-600 text-sm">
            <Link className="px-4" href="/auth/signout">
              <i className="fas fa-arrow-right-from-bracket text-[#91C8D5] inline-block mr-2" />
              <span>{_('Sign out')}</span>
            </Link>
          </li>   
        </ul>
      </main>
    </aside>
  );
};

export default UserMenu;