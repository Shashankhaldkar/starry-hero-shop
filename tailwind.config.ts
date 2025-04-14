
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Starry Night & Comic Superheroes Theme
				starry: {
					purple: '#9b87f5',
					darkPurple: '#1A1F2C',
					vividPurple: '#8B5CF6',
					orange: '#F97316',
					blue: '#0EA5E9',
					white: '#FFFFFF',
					softPurple: '#E5DEFF',
					neutral: '#8E9196',
					charcoal: '#221F26',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'spin-slow': {
					'to': { transform: 'rotate(360deg)' }
				},
				'starry-bg': {
					'0%': { backgroundPosition: '0% 0%' },
					'100%': { backgroundPosition: '100% 100%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-gentle': 'pulse-gentle 4s ease-in-out infinite',
				'spin-slow': 'spin-slow 20s linear infinite',
				'starry-bg': 'starry-bg 30s ease infinite alternate'
			},
			backgroundImage: {
				'starry-pattern': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNi41NzEgNS4yODZsLTUgMi44NTd2NS43MTRsNSAyLjg1NyA1LTIuODU3di01LjcxNHoiIHN0cm9rZT0icmdiYSgxMzksMTM1LDI0NSwwLjIpIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNNTEuNDI5IDI3Ljg1N2wtNSAyLjg1N3Y1LjcxNGw1IDIuODU3IDUtMi44NTd2LTUuNzE0eiIgc3Ryb2tlPSJyZ2JhKDEzOSwxMzUsMjQ1LDAuMikiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0xNSAyNy44NTdsLTUgMi44NTd2NS43MTRsNSAyLjg1NyA1LTIuODU3di01LjcxNHoiIHN0cm9rZT0icmdiYSgxMzksMTM1LDI0NSwwLjIpIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGZpbGw9InJnYmEoMTM5LDEzNSwyNDUsMC4xKSIgY3g9IjQ2IiBjeT0iMTYiIHI9IjQiLz48Y2lyY2xlIGZpbGw9InJnYmEoMTM5LDEzNSwyNDUsMC4xKSIgY3g9IjIwIiBjeT0iNDgiIHI9IjQiLz48Y2lyY2xlIGZpbGw9InJnYmEoMTM5LDEzNSwyNDUsMC4xKSIgY3g9IjQ4IiBjeT0iNDYiIHI9IjIiLz48Y2lyY2xlIGZpbGw9InJnYmEoMTM5LDEzNSwyNDUsMC4xKSIgY3g9IjEyIiBjeT0iMTQiIHI9IjIiLz48Y2lyY2xlIGZpbGw9InJnYmEoMTM5LDEzNSwyNDUsMC4xKSIgY3g9IjMzIiBjeT0iMzgiIHI9IjMiLz48L2c+PC9zdmc+Cg==')",
				'gradient-starry': 'linear-gradient(135deg, rgba(26, 31, 44, 0.95) 0%, rgba(34, 31, 38, 0.95) 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
