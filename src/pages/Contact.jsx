import React from 'react';
import { Title, Text, Container, TextInput, Textarea, Button, Group, Paper, SimpleGrid } from '@mantine/core';
import { IconAt, IconMapPin, IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';

const Contact = () => {
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
    <Container size="lg">
      <Title order={1} mb="xl">Contact Me</Title>
      
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing={50}>
        <div>
          <Text size="lg" mb="md">
            Have a question or want to work together? Feel free to reach out!
          </Text>
          
          <Paper withBorder p="md" radius="md" mt="xl">
            <Group wrap="nowrap">
              <IconAt size={20} />
              <Text>hassanshahzad.dev@gmail.com</Text>
            </Group>
          </Paper>
          
          <Paper withBorder p="md" radius="md" mt="md">
            <Group wrap="nowrap">
              <IconMapPin size={20} />
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
          </Group>
        </div>
        
        <Paper withBorder p="xl" radius="md">
          {submitted ? (
            <div>
              <Title order={3} color="green" mb="md">Message Sent!</Title>
              <Text>
                Thank you for reaching out. I'll get back to you as soon as possible.
              </Text>
              <Button 
                onClick={() => setSubmitted(false)} 
                variant="light" 
                mt="md"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextInput
                label="Name"
                placeholder="Your name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                required
                mb="md"
              />
              
              <TextInput
                label="Email"
                placeholder="your.email@example.com"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                required
                mb="md"
              />
              
              <TextInput
                label="Subject"
                placeholder="Subject of your message"
                name="subject"
                value={formValues.subject}
                onChange={handleChange}
                required
                mb="md"
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
              />
              
              <Button 
                type="submit" 
                color="grape" 
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