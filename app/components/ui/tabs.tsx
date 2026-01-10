tabs.tsx'use client';

import React, { createContext, useContext, useState } from 'react';

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const Tabs = ({
  children,
  defaultValue,
  onValueChange,
  className,
}: {
  children: React.ReactNode;
  defaultValue: string;
  onValueChange?: (value: string) => void;
  className?: string;
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`flex gap-2 ${className}`}>{children}</div>;
};

export const TabsTrigger = ({
  children,
  value,
  className,
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const isActive = context.value === value;

  return (
    <button
      onClick={() => context.onValueChange(value)}
      className={`px-4 py-2 rounded-lg transition-all font-medium ${
        isActive
          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
          : 'bg-slate-800/50 text-slate-300 hover:text-slate-100'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({
  children,
  value,
  className,
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  if (context.value !== value) return null;

  return <div className={className}>{children}</div>;
};
