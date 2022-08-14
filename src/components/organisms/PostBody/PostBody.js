import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './PostBody.module.scss'

export default function PostBody({ children, className }) {
  return (
    <div
      className={clsx(
        'prose mx-auto transition-colors dark:prose-dark',
        styles.postBody,
        className
      )}
    >
      {children}
    </div>
  )
}

PostBody.propTypes = { children: PropTypes.element }
