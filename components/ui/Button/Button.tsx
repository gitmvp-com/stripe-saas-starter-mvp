'use client';

import cn from 'classnames';
import { Loader2 } from 'lucide-react';
import React, { forwardRef, ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'slim' | 'flat';
  active?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    className,
    variant = 'flat',
    children,
    active,
    loading = false,
    disabled = false,
    ...rest
  } = props;

  const rootClassName = cn(
    styles.root,
    {
      [styles.slim]: variant === 'slim',
      [styles.loading]: loading,
      [styles.disabled]: disabled
    },
    className
  );

  return (
    <button
      aria-pressed={active}
      ref={ref}
      className={rootClassName}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;