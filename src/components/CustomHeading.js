import { HashtagIcon } from '@heroicons/react/solid'

function CustomHeading({ Component, id, children, ...otherProps }) {
  return (
    <Component
      id={id}
      className="group -ml-4 flex scroll-mt-24 whitespace-pre-wrap pl-4"
      {...otherProps}
    >
      <a
        href={`#${id}`}
        className="absolute -ml-8 flex items-center border-0 opacity-0 group-hover:md:opacity-100"
        aria-label="Anchor"
      >
        {'​'}
        <div className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 shadow-sm ring-1 ring-slate-900/5 transition-all hover:bg-slate-100 hover:text-slate-700 hover:shadow hover:ring-slate-900/10 dark:ring-slate-400/20">
          <HashtagIcon className="h-4 w-4" />
        </div>
      </a>
      <span>{children}</span>
    </Component>
  )
}

export const CustomH1 = (props) => <CustomHeading Component="h1" {...props} />
export const CustomH2 = (props) => <CustomHeading Component="h2" {...props} />
export const CustomH3 = (props) => <CustomHeading Component="h3" {...props} />
export const CustomH4 = (props) => <CustomHeading Component="h4" {...props} />
export const CustomH5 = (props) => <CustomHeading Component="h5" {...props} />
export const CustomH6 = (props) => <CustomHeading Component="h6" {...props} />
