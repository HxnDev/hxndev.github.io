import React, { useState, useRef, useEffect } from 'react';
import { Paper, Title, Button, Group, Box, Space } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { gsap } from 'gsap';
import AnimatedField from './AnimatedField';
import FormSuccessAnimation from './FormSuccessAnimation';
import { useAnimationContext } from '../../context/AnimationContext';
import { useColorScheme } from '../../theme/ThemeProvider';

/**
 * Enhanced contact form with animations
 */
const ContactForm = () => {
  // Form state
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Refs
  const formRef = useRef(null);
  const submitButtonRef = useRef(null);
  
  // Context
  const { reducedMotion } = useAnimationContext();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle field focus
  const handleFocus = (fieldName) => {
    setFocused(fieldName);
  };
  
  // Handle field blur with validation
  const handleBlur = (fieldName) => {
    setFocused(null);
    
    // Validate on blur
    const fieldErrors = validateField(fieldName, formValues[fieldName]);
    if (fieldErrors) {
      setErrors(prev => ({ ...prev, ...fieldErrors }));
    }
  };
  
  // Validate a single field
  const validateField = (fieldName, value) => {
    if (!value || value.trim() === '') {
      return { [fieldName]: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required` };
    }
    
    if (fieldName === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return { email: 'Please enter a valid email address' };
    }
    
    return null;
  };
  
  // Validate all form fields
  const validateForm = () => {
    const newErrors = {};
    
    // Check each field
    Object.entries(formValues).forEach(([fieldName, value]) => {
      const fieldError = validateField(fieldName, value);
      if (fieldError) {
        Object.assign(newErrors, fieldError);
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      // Shake form on error
      if (!reducedMotion && formRef.current) {
        gsap.fromTo(
          formRef.current,
          { x: -10 },
          { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
        );
      }
      return;
    }
    
    // Set loading state
    setLoading(true);
    
    // In a real application, you'd send this to a backend
    // For this example, we'll just simulate a submission
    try {
      // Animate the submit button
      if (!reducedMotion && submitButtonRef.current) {
        gsap.to(submitButtonRef.current, {
          scale: 0.95,
          duration: 0.2
        });
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success animation
      if (!reducedMotion && formRef.current) {
        // Fade out form fields
        gsap.to(formRef.current.querySelectorAll('.form-field'), {
          y: -20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power3.out'
        });
      }
      
      // Set success state
      setSubmitted(true);
      
      // Reset form
      setFormValues({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ form: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
      
      // Reset button animation
      if (!reducedMotion && submitButtonRef.current) {
        gsap.to(submitButtonRef.current, {
          scale: 1,
          duration: 0.2
        });
      }
    }
  };
  
  // Reset form after submission
  const handleReset = () => {
    setSubmitted(false);
    
    // Fade in form fields again
    if (!reducedMotion && formRef.current) {
      gsap.fromTo(
        formRef.current.querySelectorAll('.form-field'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power3.out' }
      );
    }
  };
  
  // Animate button on hover
  useEffect(() => {
    if (reducedMotion || !submitButtonRef.current) return;
    
    const button = submitButtonRef.current;
    
    const handleMouseEnter = () => {
      gsap.to(button, {
        y: -3,
        boxShadow: '0 8px 15px rgba(155, 0, 255, 0.3)',
        duration: 0.3
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(button, {
        y: 0,
        boxShadow: '0 4px 10px rgba(155, 0, 255, 0.2)',
        duration: 0.3
      });
    };
    
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion]);
  
  return (
    <Paper 
      withBorder 
      radius="md" 
      p="xl"
      style={{
        overflow: 'hidden',
        position: 'relative',
        minHeight: '500px', // Ensure consistent height during animations
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {!submitted ? (
        // Contact form
        <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Title order={3} mb="xl">Send a Message</Title>
          
          <Box className="form-field" mb="md">
            <AnimatedField
              label="Name"
              name="name"
              placeholder="Your name"
              value={formValues.name}
              onChange={handleChange}
              onFocus={() => handleFocus('name')}
              onBlur={() => handleBlur('name')}
              error={errors.name}
              required
            />
          </Box>
          
          <Box className="form-field" mb="md">
            <AnimatedField
              label="Email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formValues.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              error={errors.email}
              required
            />
          </Box>
          
          <Box className="form-field" mb="md">
            <AnimatedField
              label="Subject"
              name="subject"
              placeholder="Subject of your message"
              value={formValues.subject}
              onChange={handleChange}
              onFocus={() => handleFocus('subject')}
              onBlur={() => handleBlur('subject')}
              error={errors.subject}
              required
            />
          </Box>
          
          <Box className="form-field" style={{ flex: 1 }}>
            <AnimatedField
              label="Message"
              name="message"
              placeholder="Your message here..."
              value={formValues.message}
              onChange={handleChange}
              onFocus={() => handleFocus('message')}
              onBlur={() => handleBlur('message')}
              error={errors.message}
              required
              multiline
              rows={4}
            />
          </Box>
          
          {errors.form && (
            <Box
              mb="md"
              p="sm"
              style={{
                backgroundColor: 'rgba(255, 56, 100, 0.1)',
                borderRadius: '4px',
                borderLeft: '3px solid #FF3864'
              }}
            >
              {errors.form}
            </Box>
          )}
          
          <Space h="md" />
          
          <Group position="right" mt="xl" className="form-field">
            <Button
              ref={submitButtonRef}
              type="submit"
              size="md"
              loading={loading}
              rightSection={<IconSend size={16} />}
              style={{
                background: `linear-gradient(45deg, ${isDark ? '#9B00FF' : '#6200EE'}, ${isDark ? '#00F5FF' : '#03DAC5'})`,
                boxShadow: '0 4px 10px rgba(155, 0, 255, 0.2)',
                transition: reducedMotion ? 'all 0.3s ease' : 'none'
              }}
            >
              Send Message
            </Button>
          </Group>
        </form>
      ) : (
        // Success message
        <FormSuccessAnimation onReset={handleReset} />
      )}
      
      {/* Background decoration */}
      {!reducedMotion && (
        <Box
          style={{
            position: 'absolute',
            bottom: -100,
            left: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle at center, rgba(0, 245, 255, 0.1), transparent 70%)',
            filter: 'blur(40px)',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />
      )}
    </Paper>
  );
};

export default ContactForm;