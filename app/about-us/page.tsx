'use client';

import React from 'react';
import { Users, Target, Award, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AboutUsPage() {
  const stats = [
    { number: '10,000+', label: 'Businesses Trust Us' },
    { number: '50M+', label: 'Customer Feedback Collected' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '150+', label: 'Countries Served' }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Customer-Centric',
      description: 'We put our customers at the heart of everything we do, ensuring their success is our success.'
    },
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: 'Results-Driven',
      description: 'We focus on delivering measurable results that help businesses improve their customer satisfaction.'
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our platform and service delivery.'
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: 'Collaboration',
      description: 'We believe in the power of collaboration and work closely with our clients to achieve their goals.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '/images/team/sarah.jpg',
      bio: 'Former hospitality executive with 15+ years of experience in customer experience management.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '/images/team/michael.jpg',
      bio: 'Tech veteran with expertise in scalable platforms and data analytics.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      image: '/images/team/emily.jpg',
      bio: 'Product strategist passionate about creating intuitive user experiences.'
    },
    {
      name: 'David Kim',
      role: 'Head of Engineering',
      image: '/images/team/david.jpg',
      bio: 'Full-stack engineer with a focus on performance and reliability.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              About Keephy
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              We're on a mission to help businesses worldwide improve customer satisfaction 
              through innovative feedback collection and analytics solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-lg text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              <div className="mt-6 space-y-4 text-lg text-gray-600">
                <p>
                  Keephy was born from a simple observation: businesses were struggling to 
                  understand their customers' true feelings and needs. Traditional feedback 
                  methods were outdated, slow, and often ignored.
                </p>
                <p>
                  Founded in 2020 by a team of hospitality and technology veterans, we set out 
                  to revolutionize how businesses collect, analyze, and act on customer feedback.
                </p>
                <p>
                  Today, we're proud to serve thousands of businesses across 150+ countries, 
                  helping them build stronger relationships with their customers through 
                  real-time insights and actionable data.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To empower businesses with the tools and insights they need to create 
                exceptional customer experiences that drive growth and loyalty.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                A world where every customer interaction is meaningful, every business 
                understands their customers deeply, and customer satisfaction is the 
                cornerstone of success.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape our company culture.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Keephy who are dedicated to your success.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
                <p className="mt-2 text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Keephy?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We're not just another feedback platform. Here's what makes us different.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Real-Time Insights',
                description: 'Get instant feedback and analytics to make quick decisions and improve customer experience.',
                icon: <CheckCircle className="w-6 h-6 text-green-500" />
              },
              {
                title: 'Easy Integration',
                description: 'Seamlessly integrate with your existing systems and workflows in minutes, not months.',
                icon: <CheckCircle className="w-6 h-6 text-green-500" />
              },
              {
                title: 'Advanced Analytics',
                description: 'Powerful AI-driven insights help you understand customer sentiment and trends.',
                icon: <CheckCircle className="w-6 h-6 text-green-500" />
              },
              {
                title: 'Global Scale',
                description: 'Built to handle millions of feedback submissions across multiple languages and time zones.',
                icon: <CheckCircle className="w-6 h-6 text-green-500" />
              },
              {
                title: '24/7 Support',
                description: 'Our dedicated support team is always here to help you succeed.',
                icon: <CheckCircle className="w-6 h-6 text-green-500" />
              },
              {
                title: 'Security First',
                description: 'Enterprise-grade security and compliance to protect your data and your customers.',
                icon: <CheckCircle className="w-6 h-6 text-green-500" />
              }
            ].map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-1 text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to join our mission?
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              Start your journey towards better customer satisfaction today.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}