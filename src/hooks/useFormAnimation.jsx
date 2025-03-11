import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useAnimationContext } from '../context/AnimationContext';

/**
 * Hook for animating form elements and handling form state
 * @param {Object} initialValues - Initial form values
 * @param {Function} validateFn - Validation function
 * @param {Function} submitHandler - Form submission handler
 * @returns {Object} - Form state and animation handlers
 */
export const useFormAnimation = (initialValues = {}, validateFn, submitHandler) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  const fieldsRef = useRef({});
  const formRef = useRef(null);

  const { reducedMotion } = useAnimationContext();

  // Register a field for animations
  const registerField = (name, ref) => {
    if (ref && !fieldsRef.current[name]) {
      fieldsRef.current[name] = ref;
    }
  };

  // Handle form input changes
  const handleChange = e => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));

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
  const handleFocus = name => {
    if (reducedMotion) return;

    setFocused(name);

    if (fieldsRef.current[name]) {
      gsap.to(fieldsRef.current[name], {
        y: -4,
        boxShadow: '0 8px 16px rgba(155, 0, 255, 0.15)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  // Handle field blur
  const handleBlur = name => {
    if (reducedMotion) return;

    setFocused(null);

    if (fieldsRef.current[name]) {
      gsap.to(fieldsRef.current[name], {
        y: 0,
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    // Validate on blur if there's a validation function
    if (validateFn) {
      const fieldErrors = validateFn(values, name);
      if (fieldErrors && Object.keys(fieldErrors).length > 0) {
        setErrors(prev => ({ ...prev, ...fieldErrors }));

        // Shake animation for errors
        if (fieldsRef.current[name] && fieldErrors[name]) {
          gsap.fromTo(
            fieldsRef.current[name],
            { x: -5 },
            { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
          );
        }
      }
    }
  };

  // Handle form submission
  const handleSubmit = async e => {
    e && e.preventDefault();

    // Validate all fields
    if (validateFn) {
      const formErrors = validateFn(values);

      if (formErrors && Object.keys(formErrors).length > 0) {
        setErrors(formErrors);

        // Shake animation for errors
        if (!reducedMotion) {
          Object.keys(formErrors).forEach(fieldName => {
            if (fieldsRef.current[fieldName]) {
              gsap.fromTo(
                fieldsRef.current[fieldName],
                { x: -5 },
                { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
              );
            }
          });
        }

        return;
      }
    }

    // Set submitting state
    setIsSubmitting(true);
    setFormState('submitting');

    try {
      // Call submission handler if provided
      if (submitHandler) {
        await submitHandler(values);
      }

      // Success state
      setFormState('success');
      setSubmitted(true);

      // Success animation
      if (!reducedMotion && formRef.current) {
        const timeline = gsap.timeline();

        timeline
          .to(formRef.current, {
            y: 10,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
          })
          .set(formRef.current, { display: 'none' })
          .fromTo(
            '.success-message',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
          );
      }
    } catch (error) {
      // Error state
      console.error('Form submission error:', error);
      setFormState('error');

      // Error animation if needed
      if (!reducedMotion && formRef.current) {
        gsap.fromTo(
          formRef.current,
          { x: -10 },
          { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form state
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setFocused(null);
    setIsSubmitting(false);
    setSubmitted(false);
    setFormState('idle');

    // Reset form display if needed
    if (formRef.current) {
      gsap.set(formRef.current, { display: 'block', y: 0, opacity: 1 });
    }
  };

  // Entrance animation for form
  useEffect(() => {
    if (reducedMotion || !formRef.current) return;

    const fields = Object.values(fieldsRef.current);

    gsap.fromTo(
      fields,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out',
        clearProps: 'all',
      }
    );
  }, [reducedMotion]);

  return {
    values,
    errors,
    focused,
    isSubmitting,
    submitted,
    formState,
    formRef,
    fieldsRef,
    registerField,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};

export default useFormAnimation;
