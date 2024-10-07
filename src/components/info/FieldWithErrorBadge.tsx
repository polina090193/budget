import React from 'react';
import { Badge, BadgeProps, styled } from "@mui/material";
import { Field } from 'formik';

type ErrorBadgeProps = {
  badgeContent: string | number;
  ariaLabel: string;
  anchorOrigin: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
  };
  [key: string]: any;
}

const withErrorBadge = (WrappedComponent: React.FC) => {
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    width: '100%',
    '& .MuiBadge-badge': {
      width: 'max-content',
      backgroundColor: theme.palette.secondary.main,
    },
  }));

  const ComponentWithBadge = ({ badgeContent, ariaLabel, anchorOrigin, ...props }: ErrorBadgeProps) => {
    return (
      <StyledBadge
        aria-label={ariaLabel}
        overlap="circular"
        badgeContent={badgeContent}
        color="primary"
        anchorOrigin={anchorOrigin}
      >
        <WrappedComponent {...props} />
      </StyledBadge>
    );
  };

  ComponentWithBadge.displayName = `WithErrorBadge(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithBadge;
};

const FieldWithErrorBadge = withErrorBadge(Field);

export default FieldWithErrorBadge;