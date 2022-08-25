import { useKBar } from 'kbar';

export default function CommandBarToggle() {
  const { query } = useKBar();

  return (
    <button
      aria-label="Toggle Command Palette"
      type="button"
      className="hidden rounded transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 h-12 w-12 py-3 px-4 sm:block"
      onClick={query.toggle}
    >
      <svg
        fill="none"
        className="text-gray-900 transition-colors dark:text-gray-100 w-4 h-4"
        viewBox="0 0 18 18"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M14.333 1a2.667 2.667 0 0 0-2.666 2.667v10.666a2.667 2.667 0 1 0 2.666-2.666H3.667a2.667 2.667 0 1 0 2.666 2.666V3.667a2.667 2.667 0 1 0-2.666 2.666h10.666a2.667 2.667 0 0 0 0-5.333Z"
        />
      </svg>
    </button>
  );
}
