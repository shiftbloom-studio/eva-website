'use client'

import { Box, SkipNavContent, SkipNavLink, useDisclosure } from '@chakra-ui/react'

import { ReactNode } from 'react'

import {
  AnnouncementBanner,
  AnnouncementBannerProps,
} from '../announcement-banner'
import { Footer, FooterProps } from './footer'
import { Header, HeaderProps } from './header'
import { ImpressumModal } from '../impressum-modal/impressum-modal'
import { PrivacyModal } from '../privacy-modal/privacy-modal'

interface LayoutProps {
  children: ReactNode
  announcementProps?: AnnouncementBannerProps
  headerProps?: HeaderProps
  footerProps?: FooterProps
}

export const MarketingLayout: React.FC<LayoutProps> = (props) => {
  const { children, announcementProps, headerProps, footerProps } = props
  const { isOpen: isImpressumOpen, onOpen: onImpressumOpen, onClose: onImpressumClose } = useDisclosure()
  const { isOpen: isPrivacyOpen, onOpen: onPrivacyOpen, onClose: onPrivacyClose } = useDisclosure()

  return (
    <Box
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch' // Verbessert das Scrolling für iOS
      }}
    >
      <SkipNavLink>Skip to content</SkipNavLink>
      {announcementProps ? <AnnouncementBanner {...announcementProps} /> : null}
      <Header {...headerProps} />
      <Box
        as="main"
        overflowX="hidden"
        style={{
          willChange: 'transform',
          perspective: '1000px',
          height: '100%'
        }}
      >
        <SkipNavContent />
        {children}
      </Box>
      <Footer {...footerProps} onImpressumOpen={onImpressumOpen} onPrivacyOpen={onPrivacyOpen} />
      <ImpressumModal isOpen={isImpressumOpen} onClose={onImpressumClose} onPrivacyModalOpen={onPrivacyOpen} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={onPrivacyClose} />
    </Box>
  )
}
