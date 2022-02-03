import PropTypes from 'prop-types'

export default function Container({ children }) {
  return <div className="px-5 mx-auto w-full max-w-7xl">{children}</div>
}

Container.propTypes = { children: PropTypes.node }

Container.defaultProps = { children: null }
