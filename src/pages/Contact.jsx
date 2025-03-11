import React, { useRef, useEffect } from 'react';
import { Title, Text, Container, Button, Group, Paper, SimpleGrid, Box, ThemeIcon, TextInput, Textarea } from '@mantine/core';
import { IconAt, IconMapPin, IconBrandGithub, IconBrandLinkedin, IconSend } from '@tabler/icons-react';
import { gsap } from 'gsap';
import { useAnimationContext } from '../context/AnimationContext';
import { useColorScheme } from '../theme/ThemeProvider';

const Contact = () => {
  const pageRef = useRef(null);
  const { reducedMotion } = useAnimationContext();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Page entrance animation
  useEffect(() => {
    if (reducedMotion || !pageRef.current) return;
    
    // Animate title
    const title = pageRef.current.querySelector('.page-title');
    gsap.fromTo(
      title,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, [reducedMotion]);
  
  // Form state
  const [formValues, setFormValues] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real application, you'd send this to a backend
    // For this example, we'll just simulate a submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormValues({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  return (
    <Container size="lg" ref={pageRef}>
      <Title order={1} className="page-title" mb="xl">Contact Me</Title>
      
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing={50}>
        <div>
          <Text size="lg" mb="md">
            Have a question or want to work together? Feel free to reach out!
          </Text>
          
          <Paper withBorder p="md" radius="md" mt="xl" style={{ backgroundColor: isDark ? 'rgba(28, 29, 34, 0.7)' : 'rgba(255, 255, 255, 0.7)' }}>
            <Group wrap="nowrap">
              <ThemeIcon 
                size={34} 
                radius="xl" 
                color="cyan"
                style={{
                  background: isDark ? 'rgba(0, 245, 255, 0.2)' : 'rgba(0, 245, 255, 0.3)',
                }}
              >
                <IconAt size={20} />
              </ThemeIcon>
              <Text>hassanshahzad.dev@gmail.com</Text>
            </Group>
          </Paper>
          
          <Paper withBorder p="md" radius="md" mt="md" style={{ backgroundColor: isDark ? 'rgba(28, 29, 34, 0.7)' : 'rgba(255, 255, 255, 0.7)' }}>
            <Group wrap="nowrap">
              <ThemeIcon 
                size={34} 
                radius="xl" 
                color="grape"
                style={{
                  background: isDark ? 'rgba(155, 0, 255, 0.2)' : 'rgba(155, 0, 255, 0.3)',
                }}
              >
                <IconMapPin size={20} />
              </ThemeIcon>
              <Text>Location, City, Country</Text>
            </Group>
          </Paper>
          
          <Group mt="xl" spacing="md">
            <Button 
              component="a"
              href="https://github.com/HxnDev"
              target="_blank"
              leftSection={<IconBrandGithub size={18} />}
              variant="outline"
              style={{
                borderColor: isDark ? 'rgba(155, 0, 255, 0.5)' : 'rgba(98, 0, 238, 0.5)',
                color: isDark ? '#9B00FF' : '#6200EE',
              }}
            >
              GitHub
            </Button>
            <Button 
              component="a"
              href="https://www.linkedin.com/in/hassan-shahzad-2a6617212/"
              target="_blank"
              leftSection={<IconBrandLinkedin size={18} />}
              color="blue"
            >
              LinkedIn
            </Button>
            <Button 
              component="a"
              href="mailto:hassanshahzad.dev@gmail.com"
              leftSection={<IconSend size={18} />}
              variant="gradient"
              gradient={{ from: '#9B00FF', to: '#00F5FF' }}
            >
              Email Me
            </Button>
          </Group>
        </div>
        
        <Paper withBorder p="xl" radius="md" style={{ backgroundColor: isDark ? 'rgba(28, 29, 34, 0.7)' : 'rgba(255, 255, 255, 0.7)' }}>
          {submitted ? (
            <div>
              <Title order={3} color="teal" mb="md">Message Sent!</Title>
              <Text>
                Thank you for reaching out. I'll get back to you as soon as possible.
              </Text>
              <Button 
                onClick={() => setSubmitted(false)} 
                variant="light" 
                mt="md"
                color="grape"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Title order={3} mb="xl">Send a Message</Title>
              
              <TextInput
                label="Name"
                placeholder="Your name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                required
                mb="md"
                styles={{
                  input: {
                    backgroundColor: isDark ? 'rgba(28, 29, 34, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  }
                }}
              />
              
              <TextInput
                label="Email"
                placeholder="your.email@example.com"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                required
                mb="md"
                styles={{
                  input: {
                    backgroundColor: isDark ? 'rgba(28, 29, 34, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  }
                }}
              />
              
              <TextInput
                label="Subject"
                placeholder="Subject of your message"
                name="subject"
                value={formValues.subject}
                onChange={handleChange}
                required
                mb="md"
                styles={{
                  input: {
                    backgroundColor: isDark ? 'rgba(28, 29, 34, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  }
                }}
              />
              
              <Textarea
                label="Message"
                placeholder="Your message here..."
                name="message"
                value={formValues.message}
                onChange={handleChange}
                required
                minRows={4}
                mb="md"
                styles={{
                  input: {
                    backgroundColor: isDark ? 'rgba(28, 29, 34, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  }
                }}
              />
              
              <Button 
                type="submit" 
                style={{
                  background: `linear-gradient(45deg, ${isDark ? '#9B00FF' : '#6200EE'}, ${isDark ? '#00F5FF' : '#03DAC5'})`,
                  boxShadow: '0 4px 10px rgba(155, 0, 255, 0.2)',
                }}
                fullWidth
                loading={loading}
              >
                Send Message
              </Button>
            </form>
          )}
        </Paper>
      </SimpleGrid>
    </Container>
  );
};

export default Contact;