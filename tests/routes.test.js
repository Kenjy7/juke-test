import { describe, expect, it } from 'vitest'

import { routes } from '../src/router/routes.js'

// These guard the routing table against the classes of mistake that are easy to
// introduce when adding a page and only show up as a broken link in prod:
// duplicate paths, duplicate names, alias collisions, redirects to nowhere.

const namedRoutes = routes.filter((r) => r.name)
const allPaths = routes.map((r) => r.path)
const allAliases = routes.flatMap((r) => (Array.isArray(r.alias) ? r.alias : r.alias ? [r.alias] : []))

describe('router table', () => {
  it('has a catch-all NotFound route last', () => {
    const last = routes[routes.length - 1]
    expect(last.name).toBe('notFound')
    expect(last.path).toBe('/:pathMatch(.*)*')
  })

  it('has no duplicate primary paths', () => {
    expect(new Set(allPaths).size).toBe(allPaths.length)
  })

  it('has no duplicate route names', () => {
    const names = namedRoutes.map((r) => r.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('has no duplicate aliases', () => {
    expect(new Set(allAliases).size).toBe(allAliases.length)
  })

  it('never reuses a primary path as an alias', () => {
    const pathSet = new Set(allPaths)
    const collisions = allAliases.filter((a) => pathSet.has(a))
    expect(collisions).toEqual([])
  })

  it('every non-redirect route declares a lazy component loader', () => {
    for (const route of routes) {
      if (route.redirect) continue
      expect(typeof route.component, `route ${route.path}`).toBe('function')
    }
  })

  it('every redirect points to a real primary path', () => {
    const pathSet = new Set(allPaths)
    for (const route of routes) {
      if (!route.redirect) continue
      expect(pathSet.has(route.redirect), `redirect ${route.path} -> ${route.redirect}`).toBe(true)
    }
  })

  it('all paths and aliases are absolute', () => {
    for (const p of [...allPaths, ...allAliases]) {
      // Skip the catch-all matcher which is a param pattern, not a literal path.
      if (p.startsWith('/:')) continue
      expect(p.startsWith('/'), `path "${p}"`).toBe(true)
    }
  })
})
