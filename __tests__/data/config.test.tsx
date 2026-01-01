import { describe, it, expect } from 'vitest'
import siteConfig from '#data/config'

describe('Site configuration', () => {
  describe('SEO settings', () => {
    it('has title and description', () => {
      expect(siteConfig.seo.title).toBeDefined()
      expect(siteConfig.seo.description).toBeDefined()
      expect(typeof siteConfig.seo.title).toBe('string')
      expect(typeof siteConfig.seo.description).toBe('string')
    })

    it('title is not empty', () => {
      expect(siteConfig.seo.title.length).toBeGreaterThan(0)
    })

    it('description is not empty', () => {
      expect(siteConfig.seo.description.length).toBeGreaterThan(0)
    })
  })

  describe('Header configuration', () => {
    it('has navigation links', () => {
      expect(Array.isArray(siteConfig.header.links)).toBe(true)
      expect(siteConfig.header.links.length).toBeGreaterThan(0)
    })

    it('each navigation link has required properties', () => {
      siteConfig.header.links.forEach((link) => {
        expect(link.label).toBeDefined()
        expect(link.href).toBeDefined()
        expect(typeof link.href).toBe('string')
        expect(link.href.startsWith('#')).toBe(true)
      })
    })

    it('navigation links have unique ids', () => {
      const ids = siteConfig.header.links.map((link) => link.id).filter(Boolean)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('Footer configuration', () => {
    it('has copyright notice', () => {
      expect(siteConfig.footer.copyright).toBeDefined()
    })

    it('has footer links', () => {
      expect(Array.isArray(siteConfig.footer.links)).toBe(true)
      expect(siteConfig.footer.links.length).toBeGreaterThan(0)
    })

    it('each footer link has required properties', () => {
      siteConfig.footer.links.forEach((link) => {
        expect(link.label).toBeDefined()
        expect(link.href).toBeDefined()
      })
    })

    it('includes contact and legal links', () => {
      const linkIds = siteConfig.footer.links.map((link) => link.id).filter(Boolean)
      expect(linkIds).toContain('impressum')
      expect(linkIds).toContain('datenschutz')
    })
  })

  describe('Signup configuration', () => {
    it('has title', () => {
      expect(siteConfig.signup.title).toBeDefined()
      expect(typeof siteConfig.signup.title).toBe('string')
    })

    it('has features array', () => {
      expect(Array.isArray(siteConfig.signup.features)).toBe(true)
      expect(siteConfig.signup.features.length).toBeGreaterThan(0)
    })

    it('each feature has title and description', () => {
      siteConfig.signup.features.forEach((feature) => {
        expect(feature.title).toBeDefined()
        expect(feature.description).toBeDefined()
        expect(typeof feature.title).toBe('string')
        expect(typeof feature.description).toBe('string')
      })
    })
  })

  describe('Logo configuration', () => {
    it('has logo component', () => {
      expect(siteConfig.logo).toBeDefined()
    })
  })

  describe('URL configurations', () => {
    it('has terms URL', () => {
      expect(siteConfig.termsUrl).toBeDefined()
    })

    it('has privacy URL', () => {
      expect(siteConfig.privacyUrl).toBeDefined()
    })
  })
})
