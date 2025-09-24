'use client';

import React from 'react';

const withAuthValidation = (WrappedComponent: React.ComponentType<any>) => {
  const AuthenticatedComponent = (props: any) => {
    // For now, just return the component without auth validation
    // In a real app, you would check authentication here
    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuthValidation(${WrappedComponent.displayName || WrappedComponent.name})`;

  return AuthenticatedComponent;
};

export default withAuthValidation;
