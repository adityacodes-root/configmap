// AWS Service Icons & Color Definitions (Scalable Vector Graphics)
window.AWS_ICONS = {
  // Compute
  ec2: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#FF9900" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#FF9900" stroke-width="1.5"/>
    <path d="M14 18H34M14 24H34M14 30H34" stroke="#FF9900" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="20" y="13" width="8" height="22" rx="2" fill="#FF9900" fill-opacity="0.3" stroke="#FF9900" stroke-width="1.5"/>
    <circle cx="24" cy="18" r="1.5" fill="#FFFFFF"/>
    <circle cx="24" cy="24" r="1.5" fill="#FFFFFF"/>
    <circle cx="24" cy="30" r="1.5" fill="#FFFFFF"/>
  </svg>`,
  
  lambda: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#FF9900" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#FF9900" stroke-width="1.5"/>
    <path d="M14 34L22 14H26L34 34H29L24 21.5L19 34H14Z" fill="#FF9900"/>
    <path d="M18 29H30" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  ecs: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#FF9900" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#FF9900" stroke-width="1.5"/>
    <path d="M24 12L34 18V30L24 36L14 30V18L24 12Z" stroke="#FF9900" stroke-width="2"/>
    <path d="M24 12V24M24 24V36M24 24L34 18M24 24L14 18" stroke="#FF9900" stroke-width="2"/>
    <circle cx="24" cy="24" r="3" fill="#FFFFFF"/>
  </svg>`,

  fargate: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#FF9900" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#FF9900" stroke-width="1.5"/>
    <rect x="15" y="15" width="8" height="8" rx="1.5" fill="#FF9900"/>
    <rect x="25" y="15" width="8" height="8" rx="1.5" fill="#FF9900"/>
    <rect x="15" y="25" width="8" height="8" rx="1.5" fill="#FF9900"/>
    <rect x="25" y="25" width="8" height="8" rx="1.5" fill="#FF9900"/>
  </svg>`,

  // Storage
  s3: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#10B981" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#10B981" stroke-width="1.5"/>
    <ellipse cx="24" cy="17" rx="12" ry="4" stroke="#10B981" stroke-width="2"/>
    <path d="M12 17V31C12 33.2 17.4 35 24 35C30.6 35 36 33.2 36 31V17" stroke="#10B981" stroke-width="2"/>
    <path d="M12 24C12 26.2 17.4 28 24 28C30.6 28 36 26.2 36 24" stroke="#10B981" stroke-width="2"/>
  </svg>`,

  // Database
  rds: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#3B82F6" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#3B82F6" stroke-width="1.5"/>
    <ellipse cx="24" cy="15" rx="11" ry="3.5" fill="#3B82F6" fill-opacity="0.3" stroke="#3B82F6" stroke-width="2"/>
    <path d="M13 15V24C13 25.9 17.9 27.5 24 27.5C30.1 27.5 35 25.9 35 24V15" stroke="#3B82F6" stroke-width="2"/>
    <path d="M13 24V33C13 34.9 17.9 36.5 24 36.5C30.1 36.5 35 34.9 35 33V24" stroke="#3B82F6" stroke-width="2"/>
    <circle cx="24" cy="24" r="2" fill="#FFFFFF"/>
  </svg>`,

  dynamodb: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#3B82F6" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#3B82F6" stroke-width="1.5"/>
    <ellipse cx="24" cy="15" rx="11" ry="3" stroke="#3B82F6" stroke-width="1.8"/>
    <path d="M13 15V33C13 34.7 17.9 36 24 36C30.1 36 35 34.7 35 33V15" stroke="#3B82F6" stroke-width="1.8"/>
    <path d="M13 21C13 22.7 17.9 24 24 24C30.1 24 35 22.7 35 21" stroke="#3B82F6" stroke-width="1.8"/>
    <path d="M13 27C13 28.7 17.9 30 24 30C30.1 30 35 28.7 35 27" stroke="#3B82F6" stroke-width="1.8"/>
    <path d="M21 17L18 25H23L20 33L28 23H23L26 17H21Z" fill="#F59E0B"/>
  </svg>`,

  elasticache: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#3B82F6" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#3B82F6" stroke-width="1.5"/>
    <path d="M15 17L24 12L33 17L24 22L15 17Z" stroke="#3B82F6" stroke-width="2" fill="#3B82F6" fill-opacity="0.3"/>
    <path d="M15 24L24 29L33 24" stroke="#3B82F6" stroke-width="2"/>
    <path d="M15 31L24 36L33 31" stroke="#3B82F6" stroke-width="2"/>
  </svg>`,

  redshift: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#3B82F6" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#3B82F6" stroke-width="1.5"/>
    <rect x="14" y="14" width="20" height="20" rx="3" stroke="#3B82F6" stroke-width="2"/>
    <line x1="14" y1="20" x2="34" y2="20" stroke="#3B82F6" stroke-width="1.5"/>
    <line x1="14" y1="28" x2="34" y2="28" stroke="#3B82F6" stroke-width="1.5"/>
    <circle cx="18" cy="17" r="1.5" fill="#EF4444"/>
    <circle cx="18" cy="24" r="1.5" fill="#10B981"/>
    <circle cx="18" cy="31" r="1.5" fill="#3B82F6"/>
  </svg>`,

  // Networking & Content Delivery
  cloudfront: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#8B5CF6" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#8B5CF6" stroke-width="1.5"/>
    <circle cx="24" cy="24" r="12" stroke="#8B5CF6" stroke-width="2"/>
    <ellipse cx="24" cy="24" rx="6" ry="12" stroke="#8B5CF6" stroke-width="1.5"/>
    <line x1="12" y1="24" x2="36" y2="24" stroke="#8B5CF6" stroke-width="1.5"/>
  </svg>`,

  route53: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#8B5CF6" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#8B5CF6" stroke-width="1.5"/>
    <circle cx="24" cy="24" r="13" stroke="#8B5CF6" stroke-width="2"/>
    <path d="M24 16V24L29 28" stroke="#8B5CF6" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M19 32C20.5 33 22.2 33.5 24 33.5C29.2 33.5 33.5 29.2 33.5 24" stroke="#8B5CF6" stroke-width="1.5" stroke-dasharray="2 2"/>
  </svg>`,

  alb: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#8B5CF6" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#8B5CF6" stroke-width="1.5"/>
    <path d="M14 24H21M27 24H34M21 24L27 16M21 24L27 32" stroke="#8B5CF6" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="14" cy="24" r="2.5" fill="#8B5CF6"/>
    <circle cx="34" cy="16" r="2.5" fill="#8B5CF6"/>
    <circle cx="34" cy="24" r="2.5" fill="#8B5CF6"/>
    <circle cx="34" cy="32" r="2.5" fill="#8B5CF6"/>
  </svg>`,

  apigateway: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#EC4899" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#EC4899" stroke-width="1.5"/>
    <rect x="14" y="14" width="20" height="20" rx="3" stroke="#EC4899" stroke-width="2"/>
    <path d="M19 24H29M24 19V29" stroke="#EC4899" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="14" cy="14" r="2" fill="#EC4899"/>
    <circle cx="34" cy="14" r="2" fill="#EC4899"/>
    <circle cx="14" cy="34" r="2" fill="#EC4899"/>
    <circle cx="34" cy="34" r="2" fill="#EC4899"/>
  </svg>`,

  natgateway: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#8B5CF6" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#8B5CF6" stroke-width="1.5"/>
    <path d="M16 28L24 20L32 28" stroke="#8B5CF6" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="24" y1="20" x2="24" y2="34" stroke="#8B5CF6" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="24" cy="14" r="2" fill="#8B5CF6"/>
  </svg>`,

  internetgateway: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#8B5CF6" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#8B5CF6" stroke-width="1.5"/>
    <path d="M14 20C14 16.7 16.7 14 20 14C22.6 14 24.8 15.6 25.6 18C26.3 17.4 27.2 17 28.2 17C30.3 17 32 18.7 32 20.8C33.2 21.3 34 22.5 34 24C34 25.7 32.7 27 31 27H17C14.8 27 13 25.2 13 23C13 21.5 13.8 20.3 15.1 19.8" stroke="#8B5CF6" stroke-width="2"/>
    <path d="M24 27V36M20 32L24 36L28 32" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  transitgateway: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#8B5CF6" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#8B5CF6" stroke-width="1.5"/>
    <circle cx="24" cy="24" r="6" fill="#8B5CF6"/>
    <path d="M24 14V18M24 30V34M14 24H18M30 24H34M17 17L20 20M31 31L28 28M17 31L20 28M31 17L28 20" stroke="#8B5CF6" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // Messaging & Integration
  sqs: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#EC4899" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#EC4899" stroke-width="1.5"/>
    <rect x="13" y="17" width="22" height="14" rx="2" stroke="#EC4899" stroke-width="2"/>
    <line x1="20" y1="17" x2="20" y2="31" stroke="#EC4899" stroke-width="2"/>
    <line x1="28" y1="17" x2="28" y2="31" stroke="#EC4899" stroke-width="2"/>
    <path d="M15 13H33" stroke="#EC4899" stroke-width="2" stroke-linecap="round"/>
    <path d="M17 35H31" stroke="#EC4899" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  sns: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#EC4899" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#EC4899" stroke-width="1.5"/>
    <circle cx="24" cy="24" r="3.5" fill="#EC4899"/>
    <path d="M17 17C20.8 13.2 27.2 13.2 31 17" stroke="#EC4899" stroke-width="2" stroke-linecap="round"/>
    <path d="M13 13C19 7 29 7 35 13" stroke="#EC4899" stroke-width="2" stroke-linecap="round"/>
    <path d="M17 31C20.8 34.8 27.2 34.8 31 31" stroke="#EC4899" stroke-width="2" stroke-linecap="round"/>
    <path d="M13 35C19 41 29 41 35 35" stroke="#EC4899" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  eventbridge: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#EC4899" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#EC4899" stroke-width="1.5"/>
    <circle cx="16" cy="18" r="3" stroke="#EC4899" stroke-width="2"/>
    <circle cx="16" cy="30" r="3" stroke="#EC4899" stroke-width="2"/>
    <circle cx="32" cy="24" r="4" stroke="#EC4899" stroke-width="2"/>
    <path d="M19 19L28 23M19 29L28 25" stroke="#EC4899" stroke-width="2"/>
  </svg>`,

  stepfunctions: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#EC4899" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#EC4899" stroke-width="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#EC4899" stroke-width="2"/>
    <rect x="27" y="14" width="7" height="7" rx="1.5" stroke="#EC4899" stroke-width="2"/>
    <rect x="20" y="27" width="8" height="8" rx="1.5" stroke="#EC4899" stroke-width="2"/>
    <path d="M18 21V24H24V27" stroke="#EC4899" stroke-width="1.5"/>
    <path d="M30 21V24H24" stroke="#EC4899" stroke-width="1.5"/>
  </svg>`,

  // Analytics & Streaming
  kinesis: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#06B6D4" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#06B6D4" stroke-width="1.5"/>
    <path d="M14 16L24 24L14 32" stroke="#06B6D4" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M22 16L32 24L22 32" stroke="#06B6D4" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M30 16L36 21V27L30 32" stroke="#06B6D4" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  glue: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#06B6D4" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#06B6D4" stroke-width="1.5"/>
    <circle cx="18" cy="18" r="4" stroke="#06B6D4" stroke-width="2"/>
    <circle cx="30" cy="18" r="4" stroke="#06B6D4" stroke-width="2"/>
    <circle cx="24" cy="30" r="4" stroke="#06B6D4" stroke-width="2"/>
    <path d="M20 20L22 28M28 20L26 28M22 18H26" stroke="#06B6D4" stroke-width="1.8"/>
  </svg>`,

  athena: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#06B6D4" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#06B6D4" stroke-width="1.5"/>
    <circle cx="24" cy="22" r="9" stroke="#06B6D4" stroke-width="2"/>
    <path d="M30.5 28.5L36 34" stroke="#06B6D4" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M20 22H28M24 18V26" stroke="#06B6D4" stroke-width="1.8"/>
  </svg>`,

  quicksight: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#06B6D4" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#06B6D4" stroke-width="1.5"/>
    <rect x="14" y="24" width="5" height="10" rx="1" fill="#06B6D4"/>
    <rect x="21.5" y="18" width="5" height="16" rx="1" fill="#06B6D4"/>
    <rect x="29" y="14" width="5" height="20" rx="1" fill="#06B6D4"/>
  </svg>`,

  // Security, Identity & Compliance
  waf: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#EF4444" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#EF4444" stroke-width="1.5"/>
    <path d="M24 13L34 17V24C34 30.5 29.5 35 24 36.5C18.5 35 14 30.5 14 24V17L24 13Z" stroke="#EF4444" stroke-width="2"/>
    <path d="M20 23L23 26L28 20" stroke="#EF4444" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  cognito: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#EF4444" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#EF4444" stroke-width="1.5"/>
    <circle cx="24" cy="18" r="5" stroke="#EF4444" stroke-width="2"/>
    <path d="M15 32C15 27.5 19 25 24 25C29 25 33 27.5 33 32" stroke="#EF4444" stroke-width="2" stroke-linecap="round"/>
    <circle cx="31" cy="17" r="1.5" fill="#EF4444"/>
    <path d="M29 27C31 27.5 34 29 34 32" stroke="#EF4444" stroke-width="1.5"/>
  </svg>`,

  kms: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#EF4444" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#EF4444" stroke-width="1.5"/>
    <circle cx="21" cy="22" r="5" stroke="#EF4444" stroke-width="2"/>
    <path d="M25 25L33 33M30 30L33 27M32 32L35 29" stroke="#EF4444" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  secretsmanager: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#EF4444" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#EF4444" stroke-width="1.5"/>
    <rect x="16" y="22" width="16" height="12" rx="2" stroke="#EF4444" stroke-width="2"/>
    <path d="M19 22V17C19 14.2 21.2 12 24 12C26.8 12 29 14.2 29 17V22" stroke="#EF4444" stroke-width="2"/>
    <circle cx="24" cy="28" r="1.5" fill="#EF4444"/>
  </svg>`,

  networkfirewall: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#EF4444" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#EF4444" stroke-width="1.5"/>
    <rect x="13" y="14" width="22" height="20" rx="2" stroke="#EF4444" stroke-width="2"/>
    <line x1="13" y1="20" x2="35" y2="20" stroke="#EF4444" stroke-width="1.5"/>
    <line x1="13" y1="27" x2="35" y2="27" stroke="#EF4444" stroke-width="1.5"/>
    <line x1="20" y1="14" x2="20" y2="20" stroke="#EF4444" stroke-width="1.5"/>
    <line x1="28" y1="14" x2="28" y2="20" stroke="#EF4444" stroke-width="1.5"/>
    <line x1="24" y1="20" x2="24" y2="27" stroke="#EF4444" stroke-width="1.5"/>
    <line x1="18" y1="27" x2="18" y2="34" stroke="#EF4444" stroke-width="1.5"/>
    <line x1="30" y1="27" x2="30" y2="34" stroke="#EF4444" stroke-width="1.5"/>
  </svg>`,

  // Management & Governance
  cloudwatch: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#F59E0B" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#F59E0B" stroke-width="1.5"/>
    <rect x="13" y="14" width="22" height="20" rx="3" stroke="#F59E0B" stroke-width="2"/>
    <path d="M16 26L21 20L25 24L31 17" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
    <circle cx="31" cy="17" r="2" fill="#F59E0B"/>
  </svg>`,

  backup: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#F59E0B" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#F59E0B" stroke-width="1.5"/>
    <path d="M24 13C18 13 13 18 13 24C13 30 18 35 24 35C29 35 33.3 31.6 34.6 27" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
    <path d="M24 19V25L28 27" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
    <path d="M24 9L24 14L29 11.5" fill="#F59E0B"/>
  </svg>`,

  // AI & ML
  bedrock: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#14B8A6" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#14B8A6" stroke-width="1.5"/>
    <path d="M24 13L34 20V28L24 35L14 28V20L24 13Z" stroke="#14B8A6" stroke-width="2"/>
    <circle cx="24" cy="24" r="4" fill="#14B8A6"/>
    <path d="M19 16L24 20L29 16M24 28V33" stroke="#14B8A6" stroke-width="1.5"/>
  </svg>`,

  opensearch: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#14B8A6" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#14B8A6" stroke-width="1.5"/>
    <circle cx="22" cy="22" r="8" stroke="#14B8A6" stroke-width="2"/>
    <path d="M28 28L35 35" stroke="#14B8A6" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M19 22C19 20.3 20.3 19 22 19" stroke="#14B8A6" stroke-width="1.5"/>
  </svg>`,

  // Developer Tools & Containers
  codebuild: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#6366F1" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#6366F1" stroke-width="1.5"/>
    <path d="M16 28L12 24L16 20M32 20L36 24L32 28M26 16L22 32" stroke="#6366F1" stroke-width="2.2" stroke-linecap="round"/>
  </svg>`,

  ecr: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#FF9900" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#FF9900" stroke-width="1.5"/>
    <rect x="14" y="14" width="20" height="20" rx="3" stroke="#FF9900" stroke-width="2"/>
    <path d="M19 20H29M19 24H29M19 28H29" stroke="#FF9900" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // Migration & Transfer
  dms: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#3B82F6" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#3B82F6" stroke-width="1.5"/>
    <ellipse cx="18" cy="18" rx="5" ry="2" stroke="#3B82F6" stroke-width="1.5"/>
    <path d="M13 18V24C13 25.1 15.2 26 18 26C20.8 26 23 25.1 23 24V18" stroke="#3B82F6" stroke-width="1.5"/>
    <ellipse cx="30" cy="24" rx="5" ry="2" stroke="#3B82F6" stroke-width="1.5"/>
    <path d="M25 24V30C25 31.1 27.2 32 30 32C32.8 32 35 31.1 35 30V24" stroke="#3B82F6" stroke-width="1.5"/>
    <path d="M20 22L28 26M28 26L25 23M28 26L25 29" stroke="#10B981" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,

  lakeformation: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#06B6D4" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#06B6D4" stroke-width="1.5"/>
    <path d="M14 28C17 26 21 26 24 28C27 30 31 30 34 28V33C31 35 27 35 24 33C21 31 17 31 14 33V28Z" fill="#06B6D4" fill-opacity="0.3" stroke="#06B6D4" stroke-width="1.5"/>
    <path d="M24 14L32 19V24L24 20L16 24V19L24 14Z" stroke="#06B6D4" stroke-width="1.8"/>
  </svg>`,

  mediaconvert: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#EC4899" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#EC4899" stroke-width="1.5"/>
    <rect x="14" y="16" width="14" height="16" rx="2" stroke="#EC4899" stroke-width="2"/>
    <path d="M28 21L34 17V31L28 27V21Z" stroke="#EC4899" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="21" cy="24" r="2.5" fill="#EC4899"/>
  </svg>`,

  vpcorouter: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#8B5CF6" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#8B5CF6" stroke-width="1.5"/>
    <circle cx="24" cy="24" r="11" stroke="#8B5CF6" stroke-width="2"/>
    <line x1="24" y1="13" x2="24" y2="35" stroke="#8B5CF6" stroke-width="2"/>
    <line x1="13" y1="24" x2="35" y2="24" stroke="#8B5CF6" stroke-width="2"/>
  </svg>`,

  // Default / Missing fallback
  missing: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#EF4444" fill-opacity="0.15"/>
    <rect x="1" y="1" width="46" height="46" rx="7" stroke="#EF4444" stroke-width="2" stroke-dasharray="4 3"/>
    <text x="24" y="32" font-family="monospace" font-size="24" font-weight="900" fill="#EF4444" text-anchor="middle">?</text>
  </svg>`
};

// Standard display names & abbreviations for autocomplete & matching
window.AWS_SERVICE_NAMES = {
  ec2: { name: "Amazon EC2", abbr: "EC2", category: "Compute" },
  lambda: { name: "AWS Lambda", abbr: "Lambda", category: "Compute" },
  ecs: { name: "Amazon ECS", abbr: "ECS", category: "Containers" },
  fargate: { name: "AWS Fargate", abbr: "Fargate", category: "Serverless Compute" },
  s3: { name: "Amazon S3", abbr: "S3", category: "Storage" },
  rds: { name: "Amazon RDS", abbr: "RDS", category: "Database" },
  dynamodb: { name: "Amazon DynamoDB", abbr: "DynamoDB", category: "Database" },
  elasticache: { name: "Amazon ElastiCache", abbr: "ElastiCache", category: "Database" },
  redshift: { name: "Amazon Redshift", abbr: "Redshift", category: "Analytics" },
  cloudfront: { name: "Amazon CloudFront", abbr: "CloudFront", category: "Networking" },
  route53: { name: "Amazon Route 53", abbr: "Route 53", category: "Networking" },
  alb: { name: "Application Load Balancer", abbr: "ALB", category: "Networking" },
  apigateway: { name: "Amazon API Gateway", abbr: "API Gateway", category: "Networking" },
  natgateway: { name: "NAT Gateway", abbr: "NAT Gateway", category: "Networking" },
  internetgateway: { name: "Internet Gateway", abbr: "IGW", category: "Networking" },
  transitgateway: { name: "AWS Transit Gateway", abbr: "Transit Gateway", category: "Networking" },
  sqs: { name: "Amazon SQS", abbr: "SQS", category: "Application Integration" },
  sns: { name: "Amazon SNS", abbr: "SNS", category: "Application Integration" },
  eventbridge: { name: "Amazon EventBridge", abbr: "EventBridge", category: "Application Integration" },
  stepfunctions: { name: "AWS Step Functions", abbr: "Step Functions", category: "Application Integration" },
  kinesis: { name: "Amazon Kinesis", abbr: "Kinesis", category: "Analytics" },
  glue: { name: "AWS Glue", abbr: "Glue", category: "Analytics" },
  athena: { name: "Amazon Athena", abbr: "Athena", category: "Analytics" },
  quicksight: { name: "Amazon QuickSight", abbr: "QuickSight", category: "Analytics" },
  waf: { name: "AWS WAF", abbr: "WAF", category: "Security" },
  cognito: { name: "Amazon Cognito", abbr: "Cognito", category: "Security" },
  kms: { name: "AWS KMS", abbr: "KMS", category: "Security" },
  secretsmanager: { name: "AWS Secrets Manager", abbr: "Secrets Manager", category: "Security" },
  networkfirewall: { name: "AWS Network Firewall", abbr: "Network Firewall", category: "Security" },
  cloudwatch: { name: "Amazon CloudWatch", abbr: "CloudWatch", category: "Management" },
  backup: { name: "AWS Backup", abbr: "AWS Backup", category: "Storage" },
  bedrock: { name: "Amazon Bedrock", abbr: "Bedrock", category: "Machine Learning" },
  opensearch: { name: "OpenSearch Serverless", abbr: "OpenSearch", category: "Analytics" },
  codebuild: { name: "AWS CodeBuild", abbr: "CodeBuild", category: "Developer Tools" },
  ecr: { name: "Amazon ECR", abbr: "ECR", category: "Containers" },
  dms: { name: "AWS DMS", abbr: "DMS", category: "Migration" },
  lakeformation: { name: "AWS Lake Formation", abbr: "Lake Formation", category: "Analytics" },
  mediaconvert: { name: "AWS Elemental MediaConvert", abbr: "MediaConvert", category: "Media Services" },
  vpcorouter: { name: "VPC Core Router", abbr: "VPC Router", category: "Networking" }
};
