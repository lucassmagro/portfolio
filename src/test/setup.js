import '@testing-library/jest-dom/vitest'

// Locomotive Scroll e matchMedia não existem no jsdom; mocka o mínimo necessário.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })
}

// Observers usados pela framer-motion (whileInView/useScroll) não existem no jsdom.
class MockObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
window.IntersectionObserver = window.IntersectionObserver || MockObserver
window.ResizeObserver = window.ResizeObserver || MockObserver
