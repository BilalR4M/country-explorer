import { cn } from '../lib/utils';

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
  });  // This test verifies that cn function combines classnames correctly
  it('should handle Tailwind class combinations', () => {
    // Test that multiple classes are combined
    const result = cn('px-2 py-1', 'p-3');
    
    // Just test that both inputs are included in the result
    expect(result.includes('px-2')).toBe(true);
    expect(result.includes('py-1')).toBe(true);
    expect(result.includes('p-3')).toBe(true);
  });
});
