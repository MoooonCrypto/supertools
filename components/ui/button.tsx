import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:pointer-events-none',
      {
        'bg-primary text-white hover:opacity-90': variant === 'default',
        'bg-secondary text-white hover:opacity-90': variant === 'secondary',
        'border border-border bg-transparent hover:bg-muted': variant === 'outline',
        'hover:bg-muted': variant === 'ghost',
        'h-10 py-2 px-4': size === 'default',
        'h-9 px-3': size === 'sm',
        'h-11 px-8': size === 'lg',
        'h-10 w-10': size === 'icon',
      },
      className
    )

    if (asChild && React.isValidElement(children)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return React.cloneElement(children as any, {
        className: cn(classes, (children.props as any).className),
      })
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
