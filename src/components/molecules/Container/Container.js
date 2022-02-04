import PropTypes from 'prop-types'

export default function Container({ children }) {
  return <div className="mx-auto w-full max-w-7xl px-5">{children}</div>
}

Container.propTypes = { children: PropTypes.node }

Container.defaultProps = { children: null }
