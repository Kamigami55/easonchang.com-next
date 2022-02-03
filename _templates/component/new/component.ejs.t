---
to: src/components/<%= type %>/<%= name %>/<%= name %>.js
---
import PropTypes from 'prop-types'

export default function <%= name %>({ prop }) {
  return (
    <div>
      <p><%= name %></p>
    </div>
  )
}

<%= name %>.propTypes = {}

<%= name %>.defaultProps = {}
