import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './PostBody.module.scss'

export default function PostBody({ children }) {
  return (
    <div className={clsx('prose mx-auto pt-10 pb-8 dark:prose-dark', styles.postBody)}>
      {children}
    </div>
  )
}

PostBody.propTypes = { children: PropTypes.element }
