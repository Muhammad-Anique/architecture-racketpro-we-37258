'use strict';

/**
 * RacketPro Web - Main Interaction Scripts
 * Handles navigation, testimonials, and lead generation form.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            mobileMenu.classList.toggle('active');
        });
    }

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Adjust for fixed header height
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });

    // --- Testimonial Carousel Logic (Simple Toggle) ---
    const dots = document.querySelectorAll('.dot');
    const track = document.getElementById('testimonialTrack');
    
    if (dots.length > 0 && track) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Update dots
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');

                // Shift track (Simplified for 2 items)
                const amount = index * 50; // Based on 2 items
                track.style.transform = `translateX(-${index * 100}%)`;
                track.style.transition = 'transform 0.5s ease-in-out';
            });
        });
    }

    // --- Leads Contact Form Handling ---
    const leadForm = document.getElementById('leadForm');

    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Basic Validation Status
            const submitBtn = leadForm.querySelector('button');
            const originalText = submitBtn.textContent;
            
            // Get Form Data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                interest: document.getElementById('interest').value,
                message: document.getElementById('message').value,
                submittedAt: new Date().toISOString()
            };

            // Visual Feedback
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                // Architecture calls for Supabase integration. 
                // In a vanilla frontend environment, this typically uses the Fetch API 
                // to a database REST endpoint or an Edge Function.
                
                console.log('Lead Data Captured:', formData);

                // Mock API Call Delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Success State
                alert(`Thank you, ${formData.name}! Your inquiry regarding ${formData.interest} has been received. Our team will contact you shortly.`);
                leadForm.reset();

            } catch (error) {
                console.error('Submission Error:', error);
                alert('Connection error. Please try again later or contact us directly via email.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    // --- Header Background Change on Scroll ---
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.padding = '0';
            header.style.backgroundColor = '#ffffff';
        }
    });

});