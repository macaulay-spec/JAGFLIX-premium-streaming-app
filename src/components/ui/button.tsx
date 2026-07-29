import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold transition disabled:pointer-events-none disabled:opacity-50',
      variant === 'primary' && 'bg-[var(--brand)] text-black shadow-[0_0_34px_rgba(214,255,63,0.25)] hover:scale-[1.02]',
      variant === 'secondary' && 'border border-white/12 bg-white/10 text-white hover:bg-white/15',
      variant === 'ghost' && 'text-white hover:bg-white/10',
      variant === 'danger' && 'bg-[var(--danger)] text-white',
      className,
    )}
    {...props}
  />
));
Button.displayName = 'Button';
