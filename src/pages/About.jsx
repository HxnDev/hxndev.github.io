import React, { useEffect, useRef } from 'react';
import {
  Title,
  Text,
  Container,
  List,
  ThemeIcon,
  Group,
  Image,
  Paper,
  Grid,
  Box,
  SimpleGrid,
  Anchor,
} from '@mantine/core';
import { IconCheck, IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import SponsorshipSection from '../components/SponsorshipSection';
import BiographySection from '../components/about/BiographySection';
import Timeline from '../components/about/Timeline';
import SkillsVisualization from '../components/about/SkillsVisualization';
import AnimatedSection from '../components/common/AnimatedSection';
import { useAnimationContext } from '../context/AnimationContext';
import { gsap } from 'gsap';
import { useColorScheme } from '../theme/ThemeProvider';
import ConnectSection from '../components/ConnectSection';

const About = () => {
  const pageRef = useRef(null);
  const { reducedMotion } = useAnimationContext();
  const { colorScheme } = useColorScheme();
  const _isDark = colorScheme === 'dark';

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

  // Prepare experience data for timeline
  const experiences = [
    {
      title: 'Senior Full Stack Software Developer',
      company: 'EPFL',
      date: 'Mar 2024 - Feb 2025',
      description: (
        <>
          Designed and deployed scalable data infrastructure for <a href="https://gbdi.org" target="_blank" rel="noopener noreferrer" style={{ color: '#9B00FF', textDecoration: 'underline' }}>GBDI</a> (Global Building Data Initiative), improving data processing speed by 30% through optimized AWS pipelines.
        </>
      ),
      // Add a separate bullets array for list items
      bullets: [
        "Engineered ReactJS web applications and APIs to resolve 3 critical user pain points (e.g., fragmented data access, slow query response) for GBDI's global building materials database.",
        "Built scalable architectures for cross-functional research projects, enhancing system efficiency by 20%."
      ]
    },
    {
      title: 'Lead Full Stack Developer',
      company: 'IBM',
      date: 'Jul 2022 - Nov 2023',
      description: '', // Empty description since we're only using bullet points
      bullets: [
        "Led the development of microservices architecture, reducing deployment time by 75%.",
        "Designed and executed CI/CD pipelines for containerized applications on AWS, resulting in a significant increase in delivery speed."
      ]
    },
    {
      title: 'Full Stack Developer',
      company: 'Shanghai Zixel',
      date: 'Apr 2022 - Jul 2022',
      description: '', // Empty description since we're only using bullet points
      bullets: [
        "Developed microservices-based applications, reducing response time by 40%.",
        "Transformed server-side architecture with cutting-edge technologies including Spring Boot and MySQL."
      ]
    },
    {
      title: 'Full Stack Developer',
      company: 'Think Vision',
      date: 'Sep 2020 - Mar 2022',
      description: '', // Empty description since we're only using bullet points
      bullets: [
        "Designed and developed a ReactJS website integrated with a mobile app, achieving real-time notifications via a linked database.",
        "Built and deployed a microservice on Kubernetes, improving monitoring and updates by 20%."
      ]
    },
  ];

  // Prepare skills data
  const skills = [
    { name: 'JavaScript', level: 95, category: 'Languages' },
    { name: 'TypeScript', level: 85, category: 'Languages' },
    { name: 'Python', level: 95, category: 'Languages' },
    { name: 'C++', level: 70, category: 'Languages' },
    { name: 'Java', level: 90, category: 'Languages' },
    { name: 'GoLang', level: 60, category: 'Languages' },
    { name: 'Rust', level: 70, category: 'Languages' },

    { name: 'React', level: 95, category: 'Frontend' },
    { name: 'Angular', level: 75, category: 'Frontend' },
    { name: 'Next.js', level: 75, category: 'Frontend' },
    { name: 'HTML/CSS', level: 90, category: 'Frontend' },

    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'Flask', level: 80, category: 'Backend' },
    { name: 'GraphQL', level: 90, category: 'Backend' },
    { name: 'Django', level: 70, category: 'Backend' },

    { name: 'TensorFlow', level: 75, category: 'AI/ML' },
    { name: 'PyTorch', level: 70, category: 'AI/ML' },

    { name: 'MongoDB', level: 85, category: 'Database' },
    { name: 'MySQL', level: 95, category: 'Database' },
    { name: 'PostgreSQL', level: 80, category: 'Database' },
    { name: 'Redis', level: 75, category: 'Database' },

    { name: 'Docker', level: 80, category: 'DevOps' },
    { name: 'AWS', level: 75, category: 'DevOps' },

    { name: 'Git', level: 95, category: 'Tools' },
  ];

  // Bio paragraphs
  const bio = [
    "I am a results-driven Full Stack Developer with 5 years of experience in designing and deploying scalable applications, optimizing system performance, and leading teams. My expertise spans frontend and backend development, cloud infrastructure, and DevOps, enabling me to build high-impact solutions for both Fortune 50 companies and cutting-edge research projects.",
    "With a strong foundation in Python, Java, JavaScript, and Rust, I specialize in creating performant, secure, and maintainable applications. My work has included optimizing AWS-based pipelines to enhance data processing speeds, developing ReactJS applications that improve user experience, and architecting microservices to streamline deployment and scalability.",
    "Passionate about tackling complex engineering challenges, I excel in end-to-end development, from system design to deployment and maintenance. My approach emphasizes both functionality and user experience, ensuring that the solutions I build drive efficiency and real-world impact.",
  ];

  return (
    <Container size="lg" ref={pageRef}>
      <Title
        order={1}
        className="page-title"
        mb="xl"
        style={{
          backgroundImage: 'linear-gradient(45deg, #6200EE, #03DAC5)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        About Me
      </Title>

      <Grid gutter={50} mb="xl">
        <Grid.Col md={12}>
          <BiographySection bio={bio} />
        </Grid.Col>
      </Grid>

      {/* Skills section */}
      <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.2} mb="xl">
        <SkillsVisualization skills={skills} />
      </AnimatedSection>

      {/* Experience timeline */}
      <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.4} mb="xl">
        <Timeline experiences={experiences} />
      </AnimatedSection>

      {/* Connect with me section */}
      <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.6} mb="xl">
        <ConnectSection />
      </AnimatedSection>

      {/* Support My Work section */}
      <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.8} mb="xl">
        <SponsorshipSection />
      </AnimatedSection>
    </Container>
  );
};

export default About;
