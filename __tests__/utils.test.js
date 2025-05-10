import { cn } from '@/lib/utils';

describe('cn function', () => {
  it('should handle a single class name', () => {
    expect(cn('test-class')).toBe('test-class');
  });

  it('should merge multiple class names', () => {
    expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500');
  });

  it('should handle conditional class names', () => {
    const isActive = true;
    expect(cn(
      'base-class', 
      isActive && 'active-class',
      !isActive && 'inactive-class'
    )).toBe('base-class active-class');
  });

  it('should handle falsy values', () => {
    expect(cn('base-class', false, null, undefined, 0, '')).toBe('base-class');
  });
    // This test verifies that cn function handles Tailwind class merging correctly
  it('should handle Tailwind class combinations', () => {
    // Test that conflicting Tailwind classes are properly merged
    const result = cn('px-2 py-1', 'p-3');
    
    // When p-3 is applied with px-2 and py-1, tailwind-merge will use p-3
    // since it takes precedence over the individual padding utilities
    expect(result).toBe('p-3');
  });
});
