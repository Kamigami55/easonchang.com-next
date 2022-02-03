import PropTypes from 'prop-types'

import Footer from '@/components/organisms/Footer'
import Meta from '@/components/Meta'

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

Layout.defaultProps = {
  children: '',
}
