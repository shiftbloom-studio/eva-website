import { Variant } from 'framer-motion';

// Fade in animations
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
};

export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

export const fadeInDown = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

export const fadeInLeft = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

export const fadeInRight = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

// Staggered children animations
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

// Subtle hover animations
export const subtleHover = {
    initial: { scale: 1 },
    hover: {
        scale: 1.03,
        transition: { duration: 0.2, ease: 'easeInOut' }
    }
};

// Button animation
export const buttonHover = {
    initial: { scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)' },
    hover: {
        scale: 1.03,
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
};

// Elegant page transitions
export const pageTransition = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }
    }
};

// Subtle floating animation
export const floating = {
    initial: { y: 0 },
    animate: {
        y: [-5, 5, -5],
        transition: {
            repeat: Infinity,
            duration: 4,
            ease: 'easeInOut',
            repeatType: 'loop' as const
        }
    }
};

// Reveal animation for content sections
export const revealAnimation: Record<string, Variant> = {
    hidden: {
        opacity: 0,
        y: 30
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Card hover effect
export const cardHover = {
    initial: { y: 0, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
    hover: {
        y: -5,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
        transition: { duration: 0.3, ease: 'easeOut' }
    }
};

// Text gradient animation
export const textGradient = {
    initial: { backgroundPosition: '0% 50%' },
    animate: {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        transition: {
            repeat: Infinity,
            duration: 10,
            ease: 'linear'
        }
    }
}; 