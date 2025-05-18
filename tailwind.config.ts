
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
				// New black and grey theme
				dark: {
					100: '#f5f5f5',
					200: '#e5e5e5',
					300: '#d4d4d4',
					400: '#a3a3a3',
					500: '#737373',
					600: '#525252',
					700: '#404040',
					800: '#262626',
					900: '#171717',
					950: '#0a0a0a',
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
				'bg-shift': {
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
				'bg-shift': 'bg-shift 30s ease infinite alternate'
			},
			backgroundImage: {
				'dark-pattern': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjMjIyIiBzdG9wLW9wYWNpdHk9Ii4wNSIgb2Zmc2V0PSIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiMyMjIiIHN0b3Atb3BhY2l0eT0iLjA1IiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2EpIiBkPSJNMCAwaDYwdjYwSDB6Ii8+PHBhdGggZD0iTTM2LjU3MSA1LjI4NmwtNSAyLjg1N3Y1LjcxNGw1IDIuODU3IDUtMi44NTd2LTUuNzE0eiIgc3Ryb2tlPSJyZ2JhKDEzNiwxMzYsMTM2LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik01MS40MjkgMjcuODU3bC01IDIuODU3djUuNzE0bDUgMi44NTcgNS0yLjg1N3YtNS43MTR6IiBzdHJva2U9InJnYmEoMTM2LDEzNiwxMzYsMC4xKSIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE1IDI3Ljg1N2wtNSAyLjg1N3Y1LjcxNGw1IDIuODU3IDUtMi44NTd2LTUuNzE0eiIgc3Ryb2tlPSJyZ2JhKDEzNiwxMzYsMTM2LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgZmlsbD0icmdiYSgxMzYsMTM2LDEzNiwwLjEpIiBjeD0iNDYiIGN5PSIxNiIgcj0iNCIvPjxjaXJjbGUgZmlsbD0icmdiYSgxMzYsMTM2LDEzNiwwLjEpIiBjeD0iMjAiIGN5PSI0OCIgcj0iNCIvPjxjaXJjbGUgZmlsbD0icmdiYSgxMzYsMTM2LDEzNiwwLjEpIiBjeD0iNDgiIGN5PSI0NiIgcj0iMiIvPjxjaXJjbGUgZmlsbD0icmdiYSgxMzYsMTM2LDEzNiwwLjEpIiBjeD0iMTIiIGN5PSIxNCIgcj0iMiIvPjxjaXJjbGUgZmlsbD0icmdiYSgxMzYsMTM2LDEzNiwwLjEpIiBjeD0iMzMiIGN5PSIzOCIgcj0iMyIvPjwvc3ZnPg==')",
				'gradient-dark': 'linear-gradient(135deg, rgba(13, 13, 13, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
