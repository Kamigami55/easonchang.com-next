// template come from:
// https://blog.prototypr.io/how-to-implement-command-palette-with-kbar-and-tailwind-css-71ea0e3f99c1

import {
  CodeBracketIcon,
  HomeIcon,
  LanguageIcon,
  LightBulbIcon,
  MoonIcon,
  PencilSquareIcon,
  SunIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import {
  ActionId,
  ActionImpl,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  Priority,
  useMatches,
} from 'kbar';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import React, { forwardRef, useMemo } from 'react';

export default function CommandPalette({ children }) {
  const { t } = useTranslation(['common']);
  const router = useRouter();
  const { setTheme } = useTheme();

  const changeLocale = (locale: string) => {
    // TODO pathname, asPath, query won't get updated when change page, should fix
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: locale });
  };

  const actions = [
    // Page section
    {
      id: 'home',
      name: t('home'),
      keywords: 'home homepage index 首頁',
      perform: () => router.push('/'),
      icon: <HomeIcon className="w-6 h-6" />,
      section: {
        name: t('page'),
        priority: Priority.HIGH,
      },
    },
    {
      id: 'posts',
      name: t('posts'),
      keywords:
        'latest posts writing words blog articles thoughts 最新 文章 寫作 部落格',
      perform: () => router.push('/posts'),
      icon: <PencilSquareIcon className="w-6 h-6" />,
      section: {
        name: t('page'),
        priority: Priority.HIGH,
      },
    },
    {
      id: 'projects',
      name: t('projects'),
      keywords:
        'projects web code coding product program 專案 程式 成品 作品集',
      perform: () => router.push('/projects'),
      icon: <CodeBracketIcon className="w-6 h-6" />,
      section: {
        name: t('page'),
        priority: Priority.HIGH,
      },
    },
    {
      id: 'about',
      name: t('about'),
      keywords:
        'about contact eason chang more links email github linkedin twitter facebook resume 關於 聯絡 聯繫 張楹翔 更多 連結 郵件 推特 臉書 履歷',
      perform: () => router.push('/about'),
      icon: <UserIcon className="w-6 h-6" />,
      section: {
        name: t('page'),
        priority: Priority.HIGH,
      },
    },
    // Operation section
    // - Theme toggle
    {
      id: 'theme',
      name: t('toggle-theme'),
      keywords: 'change toggle theme mode color 切換 更換 顏色 主題 模式',
      icon: <LightBulbIcon className="w-6 h-6" />,
      section: t('operation'),
    },
    {
      id: 'theme-light',
      name: t('light-mode'),
      keywords: 'theme light white mode color 顏色 主題 模式 明亮 白色',
      perform: () => setTheme('light'),
      icon: <SunIcon className="w-6 h-6" />,
      parent: 'theme',
      section: t('operation'),
    },
    {
      id: 'theme-dark',
      name: t('dark-mode'),
      keywords: 'theme dark black mode color 顏色 主題 模式 暗黑 黑色 深夜',
      perform: () => setTheme('dark'),
      icon: <MoonIcon className="w-6 h-6" />,
      parent: 'theme',
      section: t('operation'),
    },
    // - Language toggle
    {
      id: 'language',
      name: t('toggle-language'),
      keywords:
        'change toggle locale language translation 切換 更換 語言 語系 翻譯',
      icon: <LanguageIcon className="w-6 h-6" />,
      section: t('operation'),
    },
    {
      id: 'language-english',
      name: t('english'),
      keywords: 'locale language translation english 語言 語系 英文 英語',
      perform: () => changeLocale('en'),
      icon: <span className="p-1">🇺🇸</span>,
      parent: 'language',
      section: t('operation'),
    },
    {
      id: 'language-chinese',
      name: t('chinese'),
      keywords:
        'locale language translation traditional chinese taiwanese 語言 語系 翻譯 中文 台灣 繁體',
      perform: () => changeLocale('zh-TW'),
      icon: <span className="p-1">🇹🇼</span>,
      parent: 'language',
      section: t('operation'),
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <CommandBar />
      {children}
    </KBarProvider>
  );
}

function CommandBar() {
  return (
    <KBarPortal>
      <KBarPositioner className="z-20 p-2 bg-gray-400/70 dark:bg-gray-900/80 flex items-center backdrop-blur-sm">
        <KBarAnimator className="w-full max-w-[600px] overflow-hidden p-2 bg-white/80 dark:bg-gray-700/80 rounded-xl box-content border border-gray-400 dark:border-gray-600">
          <KBarSearch className="flex px-4 w-full h-16 outline-none bg-transparent" />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}

function RenderResults() {
  const { results, rootActionId } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className="px-4 pt-4 pb-2 font-medium text-gray-500 dark:text-gray-400">
            {item}
          </div>
        ) : (
          <ResultItem
            action={item}
            active={active}
            currentRootActionId={rootActionId}
          />
        )
      }
    />
  );
}

interface Props {
  action: ActionImpl;
  active: boolean;
  currentRootActionId: ActionId;
}
type Ref = HTMLButtonElement;

const ResultItem = forwardRef<Ref, Props>(
  (
    {
      action,
      active,
      currentRootActionId,
    }: {
      action: ActionImpl;
      active: boolean;
      currentRootActionId: ActionId;
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const ancestors = useMemo(() => {
      if (!currentRootActionId) return action.ancestors;
      const index = action.ancestors.findIndex(
        (ancestor) => ancestor.id === currentRootActionId
      );
      // +1 removes the currentRootAction; e.g.
      // if we are on the "Set theme" parent action,
      // the UI should not display "Set theme… > Dark"
      // but rather just "Dark"
      return action.ancestors.slice(index + 1);
    }, [action.ancestors, currentRootActionId]);

    return (
      <div
        ref={ref}
        className={`${
          active
            ? 'bg-teal-500 rounded-lg text-gray-100'
            : 'transparent text-gray-600 dark:text-gray-300'
        } rounded-lg px-4 py-2 flex items-center cursor-pointer justify-between`}
      >
        <div className="flex items-center gap-2 text-base">
          {action.icon && action.icon}
          <div className="flex flex-col">
            <div>
              {ancestors.length > 0 &&
                ancestors.map((ancestor) => (
                  <React.Fragment key={ancestor.id}>
                    <span className="mr-4 opacity-70">{ancestor.name}</span>
                    <span className="mr-4">&rsaquo;</span>
                  </React.Fragment>
                ))}
              <span>{action.name}</span>
            </div>
            {action.subtitle && (
              <span className="text-sm">{action.subtitle}</span>
            )}
          </div>
        </div>
        {action.shortcut?.length ? (
          <div aria-hidden className="grid grid-flow-col gap-2">
            {action.shortcut.map((sc) => (
              <kbd
                key={sc}
                className={`${
                  active
                    ? 'bg-white text-teal-500 dark:text-gray-200 dark:bg-gray-500'
                    : 'bg-gray-200 text-gray-500 dark:text-gray-400 dark:bg-gray-600'
                } px-3 py-2 flex rounded-md items-center cursor-pointer justify-between`}
              >
                {sc}
              </kbd>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
