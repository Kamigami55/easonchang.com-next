// template come from:
// https://blog.prototypr.io/how-to-implement-command-palette-with-kbar-and-tailwind-css-71ea0e3f99c1

import {
  HomeIcon,
  LightBulbIcon,
  MoonIcon,
  PencilIcon,
  SunIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import {
  ActionId,
  ActionImpl,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
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

  const actions = [
    {
      id: 'home',
      name: t('home'),
      keywords: 'home homepage 首頁',
      perform: () => router.push('/'),
      icon: <HomeIcon className="w-6 h-6" />,
    },
    {
      id: 'posts',
      name: t('posts'),
      keywords: 'posts writing words blog articles thoughts 文章 寫作 部落格',
      perform: () => router.push('/posts'),
      icon: <PencilIcon className="w-6 h-6" />,
    },
    {
      id: 'projects',
      name: t('projects'),
      keywords:
        'projects web code coding product program 專案 程式 成品 作品集',
      perform: () => router.push('/projects'),
      icon: <LightBulbIcon className="w-6 h-6" />,
    },
    {
      id: 'about',
      name: t('about'),
      keywords:
        'about eason chang more links email github linkedin twitter facebook resume 關於 張楹翔 更多 連結 郵件 推特 臉書 履歷',
      perform: () => router.push('/about'),
      icon: <UserCircleIcon className="w-6 h-6" />,
    },
    {
      id: 'theme',
      name: t('toggle-theme'),
      keywords:
        'change toggle theme dark black light white mode color 切換 更換 顏色 主題 模式 暗黑 黑色 深夜 明亮 白色',
      icon: <MoonIcon className="w-6 h-6" />,
    },
    {
      id: 'theme-light',
      name: t('light-mode'),
      keywords:
        'change toggle theme light white mode color 切換 更換 顏色 主題 模式 明亮 白色',
      perform: () => setTheme('light'),
      icon: <SunIcon className="w-6 h-6" />,
      parent: 'theme',
    },
    {
      id: 'theme-dark',
      name: t('dark-mode'),
      keywords:
        'change toggle theme dark black mode color 切換 更換 顏色 主題 模式 暗黑 黑色 深夜',
      perform: () => setTheme('dark'),
      icon: <MoonIcon className="w-6 h-6" />,
      parent: 'theme',
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
      <KBarPositioner className="z-20 p-2 bg-gray-900/80 flex items-center backdrop-blur-sm">
        <KBarAnimator className="w-full max-w-[600px] overflow-hidden p-2 bg-white dark:bg-gray-800 rounded-xl box-content">
          <KBarSearch className="flex px-4 w-full h-16 outline-none bg-white dark:bg-gray-800" />
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
          <div className="px-4 pt-4 pb-2 font-medium text-gray-500 dark:text-gray-400 uppercase">
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
            : 'transparent text-gray-500 dark:text-gray-400'
        } rounded-lg px-4 py-2 flex items-center cursor-pointer justify-between`}
      >
        <div className="flex items-center gap-2 text-base">
          {action.icon && action.icon}
          <div className="flex flex-col">
            <div>
              {ancestors.length > 0 &&
                ancestors.map((ancestor) => (
                  <React.Fragment key={ancestor.id}>
                    <span className="mr-4 opacity-50">{ancestor.name}</span>
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
