import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import HomePage from '../../app/page';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
});

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<HomePage />);
    // Assert root header is present instead of ambiguous text check
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays main headline', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: 'Keephy gives businesses instant insight into what their customers think' })
    ).toBeInTheDocument();
  });

  it('displays subheading', () => {
    render(<HomePage />);
    expect(screen.getByText('From NFC to QR to API, collect real-time feedback and act fast.')).toBeInTheDocument();
  });

  it('renders all CTA buttons', () => {
    render(<HomePage />);
    const startTrialButtons = screen.getAllByRole('button', { name: 'Start Your Free Trial' });
    expect(startTrialButtons.length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Learn More' })).toBeInTheDocument();
  });

  it('renders features section', () => {
    render(<HomePage />);
    expect(screen.getByText('Key Features')).toBeInTheDocument();
    expect(screen.getByText('Ease of Use')).toBeInTheDocument();
    expect(screen.getByText('Real-Time Insights')).toBeInTheDocument();
    expect(screen.getByText('Customer Engagement')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<HomePage />);
    expect(screen.getAllByRole('link', { name: 'Features' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'About' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Contact' })[0]).toBeInTheDocument();
  });

  it('handles admin dashboard button click', () => {
    render(<HomePage />);
    const adminButton = screen.getByText('Admin Dashboard');
    fireEvent.click(adminButton);
    expect(mockPush).toHaveBeenCalledWith('/admin');
  });

  it('renders footer', () => {
    render(<HomePage />);
    expect(screen.getByText('© 2024 Keephy. All rights reserved.')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<HomePage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s.length).toBeGreaterThan(0);
  });

  it('renders inline SVG icons', () => {
    const { container } = render(<HomePage />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('has responsive design classes', () => {
    const { container } = render(<HomePage />);
    const grid = container.querySelector('#features + div .grid, #features ~ div .grid, .grid.md\\:grid-cols-3');
    expect(grid).not.toBeNull();
  });
});
