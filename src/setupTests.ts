import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'

// Increase the default timeout
jest.setTimeout(10000)

// Configure testing-library
configure({
  testIdAttribute: 'data-testid',
  asyncUtilTimeout: 2000,
  computedStyleSupportsPseudoElements: false,
})

// Suppress React 18 console errors/warnings
const originalError = console.error
const originalWarn = console.warn

beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      /Warning: ReactDOM.render is no longer supported in React 18/.test(args[0]) ||
      /Warning: React.createFactory/.test(args[0]) ||
      /Warning: Using UNSAFE_componentWillMount/.test(args[0]) ||
      /Warning: Using UNSAFE_componentWillReceiveProps/.test(args[0]) ||
      /Warning: Using UNSAFE_componentWillUpdate/.test(args[0]) ||
      /Warning: Legacy context API/.test(args[0])
    ) {
      return
    }
    originalError.call(console, ...args)
  }

  console.warn = (...args: any[]) => {
    if (
      /Warning: React Router Future Flag/.test(args[0]) ||
      /Warning: The `punycode` module is deprecated/.test(args[0])
    ) {
      return
    }
    originalWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})
