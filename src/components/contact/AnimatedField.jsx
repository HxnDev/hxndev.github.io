import React, { useState, useRef, useEffect } from 'react';
import { TextInput, Textarea, Text, Box } from '@mantine/core';
import { gsap } from 'gsap';
import { useAnimationContext } from '../../context/AnimationContext';
import { useColorScheme } from '../../theme/ThemeProvider';

/**
 * Animated form field with focus effects
 */
const AnimatedField = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  required = false,
  multiline = false,
  rows = 4,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const fieldRef = useRef(null);
  const underlineRef = useRef(null);
  const { reducedMotion } = useAnimationContext();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Handle field focus animation
  useEffect(() => {
    if (reducedMotion || !fieldRef.current) return;
    
    if (isFocused) {
      // Animate focus state
      gsap.to(fieldRef.current, {
        y: -4,
        boxShadow: `0 8px 16px rgba(${isDark ? '155, 0, 255' : '98, 0, 238'}, 0.15)`,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Animate underline
      if (underlineRef.current) {
        gsap.fromTo(
          underlineRef.current, 
          { width: '0%' }, 
          { width: '100%', duration: 0.4, ease: 'power2.out' }
        );
      }
    } else {
      // Animate blur state
      gsap.to(fieldRef.current, {
        y: 0,
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Reset underline
      if (underlineRef.current) {
        gsap.to(underlineRef.current, {
          width: '0%',
          duration: 0.3,
          ease: 'power2.in'
        });
      }
    }
  }, [isFocused, reducedMotion, isDark]);
  
  // Handle error shake animation
  useEffect(() => {
    if (reducedMotion || !fieldRef.current || !error) return;
    
    // Shake animation for errors
    gsap.fromTo(
      fieldRef.current,
      { x: -5 },
      { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
    );
  }, [error, reducedMotion]);
  
  // Handle focus events
  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };
  
  // Component for the field
  const FieldComponent = multiline ? Textarea : TextInput;
  
  return (
    <Box mb="md">
      {label && (
        <Text mb={5} weight={500} size="sm">
          {label}
          {required && <span style={{ color: '#FF3864' }}> *</span>}
        </Text>
      )}
      
      <Box
        ref={fieldRef}
        style={{
          position: 'relative',
          transition: reducedMotion ? 'all 0.3s ease' : 'none'
        }}
      >
        <FieldComponent
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          error={error}
          required={required}
          minRows={multiline ? rows : undefined}
          {...props}
          styles={(theme) => ({
            input: {
              transition: 'all 0.3s ease',
              border: `1px solid ${isFocused 
                ? (isDark ? 'rgba(155, 0, 255, 0.5)' : 'rgba(98, 0, 238, 0.5)')
                : (error 
                  ? theme.colors.red[6] 
                  : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
                )
              }`,
              backgroundColor: isDark ? 'rgba(28, 29, 34, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              '&:focus': {
                borderColor: isDark ? 'rgba(155, 0, 255, 0.7)' : 'rgba(98, 0, 238, 0.7)'
              }
            }
          })}
        />
        
        {/* Animated underline */}
        {isFocused && (
          <Box
            ref={underlineRef}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '2px',
              width: '0%',
              background: `linear-gradient(to right, ${isDark ? '#9B00FF' : '#6200EE'}, ${isDark ? '#00F5FF' : '#03DAC5'})`,
              zIndex: 2
            }}
          />
        )}
      </Box>
      
      {/* Error message with fade in animation */}
      {error && (
        <Text 
          color="red" 
          size="xs" 
          mt={5}
          style={{
            animation: reducedMotion ? 'none' : 'fadeIn 0.3s ease forwards'
          }}
        >
          {error}
        </Text>
      )}
      
      {/* Add keyframe animations */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default AnimatedField;