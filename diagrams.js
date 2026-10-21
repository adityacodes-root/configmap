// 10 Industry-Standard AWS Cloud Architectures with exactly 3 missing components each
window.CONFIG_MAP_DIAGRAMS = [
  {
    id: 1,
    title: "Serverless E-Commerce & Event Processing",
    subtitle: "Event-driven checkout and order notifications",
    scenario: "High-throughput serverless microservices processing transactions, async order queues, and customer event notifications.",
    containers: [
      { label: "AWS Edge & CDN", x: 20, y: 40, w: 220, h: 420, color: "rgba(139, 92, 246, 0.08)", border: "#8B5CF6" },
      { label: "Compute & Ingestion Tier", x: 260, y: 40, w: 320, h: 420, color: "rgba(255, 153, 0, 0.06)", border: "#FF9900" },
      { label: "Data & Event Notification Tier", x: 600, y: 40, w: 320, h: 420, color: "rgba(59, 130, 246, 0.06)", border: "#3B82F6" }
    ],
    nodes: [
      { id: "route53", service: "route53", label: "Route 53", sub: "DNS & Latency", x: 50, y: 80, w: 160, h: 68 },
      { id: "cloudfront", service: "cloudfront", label: "CloudFront", sub: "Global Edge CDN", x: 50, y: 210, w: 160, h: 68 },
      { id: "s3", service: "s3", label: "Amazon S3", sub: "Frontend SPA", x: 50, y: 340, w: 160, h: 68 },
      { id: "apigateway", service: "apigateway", label: "API Gateway", sub: "REST Endpoints", x: 290, y: 140, w: 160, h: 68 },
      { id: "lambda", service: "lambda", label: "AWS Lambda", sub: "Order Processor", x: 390, y: 270, w: 160, h: 68 },
      { id: "sqs", service: "sqs", label: "Amazon SQS", sub: "Order Queue", x: 290, y: 370, w: 160, h: 68 },
      { id: "dynamodb", service: "dynamodb", label: "DynamoDB", sub: "Orders & State", x: 640, y: 100, w: 160, h: 68 },
      { id: "sns", service: "sns", label: "Amazon SNS", sub: "Push Fanout", x: 740, y: 240, w: 160, h: 68 },
      { id: "eventbridge", service: "eventbridge", label: "EventBridge", sub: "Event Bus Router", x: 640, y: 370, w: 160, h: 68 }
    ],
    connections: [
      { from: "route53", to: "cloudfront", label: "DNS Routing" },
      { from: "cloudfront", to: "s3", label: "Origin Fetch" },
      { from: "cloudfront", to: "apigateway", label: "API Ingress" },
      { from: "apigateway", to: "lambda", label: "Payload" },
      { from: "lambda", to: "dynamodb", label: "PutItem" },
      { from: "lambda", to: "sqs", label: "Async Task" },
      { from: "sqs", to: "lambda", label: "Batch Trigger" },
      { from: "lambda", to: "sns", label: "Order Placed" },
      { from: "sns", to: "eventbridge", label: "Event Feed" }
    ],
    missing: ["apigateway", "dynamodb", "sns"],
    reasons: {
      apigateway: "Without Amazon API Gateway, frontend clients have no entry point or REST routing into serverless Lambda backends.",
      dynamodb: "Without Amazon DynamoDB, customer order state, cart sessions, and transaction persistence are lost.",
      sns: "Without Amazon SNS, downstream order notifications and fanout to notification channels fail."
    }
  },
  {
    id: 2,
    title: "High-Availability 3-Tier Web Application",
    subtitle: "Fault-tolerant multi-tier architecture in a custom VPC",
    scenario: "Scalable enterprise web application with public edge ingress, private application compute fleets, and multi-AZ relational databases.",
    containers: [
      { label: "VPC Perimeter / Edge", x: 20, y: 40, w: 200, h: 420, color: "rgba(139, 92, 246, 0.08)", border: "#8B5CF6" },
      { label: "Public Subnet (DMZ)", x: 240, y: 40, w: 210, h: 420, color: "rgba(16, 185, 129, 0.06)", border: "#10B981" },
      { label: "Private Application Subnet", x: 470, y: 40, w: 210, h: 420, color: "rgba(255, 153, 0, 0.06)", border: "#FF9900" },
      { label: "Private Database Subnet", x: 700, y: 40, w: 220, h: 420, color: "rgba(59, 130, 246, 0.06)", border: "#3B82F6" }
    ],
    nodes: [
      { id: "internetgateway", service: "internetgateway", label: "Internet Gateway", sub: "VPC Inbound Gateway", x: 40, y: 150, w: 160, h: 68 },
      { id: "route53", service: "route53", label: "Route 53", sub: "Hosted Zone", x: 40, y: 290, w: 160, h: 68 },
      { id: "alb", service: "alb", label: "Application Load Balancer", sub: "SSL & HTTP Routing", x: 265, y: 120, w: 160, h: 68 },
      { id: "natgateway", service: "natgateway", label: "NAT Gateway", sub: "Outbound Egress", x: 265, y: 280, w: 160, h: 68 },
      { id: "ec2", service: "ec2", label: "Amazon EC2", sub: "Auto Scaling App Fleet", x: 495, y: 120, w: 160, h: 68 },
      { id: "elasticache", service: "elasticache", label: "Amazon ElastiCache", sub: "Redis Cluster (Cache)", x: 495, y: 280, w: 160, h: 68 },
      { id: "rds", service: "rds", label: "Amazon RDS", sub: "Aurora Multi-AZ", x: 730, y: 120, w: 160, h: 68 },
      { id: "s3", service: "s3", label: "Amazon S3", sub: "Asset Bucket", x: 730, y: 250, w: 160, h: 68 },
      { id: "cloudwatch", service: "cloudwatch", label: "Amazon CloudWatch", sub: "Alarms & Telemetry", x: 730, y: 370, w: 160, h: 68 }
    ],
    connections: [
      { from: "route53", to: "internetgateway", label: "Resolve" },
      { from: "internetgateway", to: "alb", label: "HTTPS Ingress" },
      { from: "alb", to: "ec2", label: "Forward Traffic" },
      { from: "ec2", to: "natgateway", label: "Updates" },
      { from: "ec2", to: "elasticache", label: "Session Cache" },
      { from: "ec2", to: "rds", label: "SQL Queries" },
      { from: "ec2", to: "s3", label: "Store Media" },
      { from: "ec2", to: "cloudwatch", label: "Push Logs" }
    ],
    missing: ["alb", "natgateway", "elasticache"],
    reasons: {
      alb: "Without Application Load Balancer (ALB), incoming web traffic cannot be routed or balanced across healthy EC2 targets.",
      natgateway: "Without NAT Gateway, private EC2 instances cannot securely download OS security patches or third-party APIs.",
      elasticache: "Without Amazon ElastiCache (Redis), database read spikes overwhelm the primary database instance."
    }
  },
  {
    id: 3,
    title: "Real-Time Streaming Analytics & Data Lake",
    subtitle: "Ingestion, streaming transformation, and interactive serverless queries",
    scenario: "High-volume clickstream and IoT telemetry ingestion with real-time analytics and long-term queryable data lake storage.",
    containers: [
      { label: "Data Ingestion & Streaming", x: 20, y: 40, w: 230, h: 420, color: "rgba(6, 182, 212, 0.08)", border: "#06B6D4" },
      { label: "Stream Processing & Transformation", x: 270, y: 40, w: 260, h: 420, color: "rgba(255, 153, 0, 0.06)", border: "#FF9900" },
      { label: "Lakehouse Storage & BI Analytics", x: 550, y: 40, w: 370, h: 420, color: "rgba(16, 185, 129, 0.06)", border: "#10B981" }
    ],
    nodes: [
      { id: "kinesis", service: "kinesis", label: "Amazon Kinesis", sub: "Real-Time Data Stream", x: 50, y: 150, w: 165, h: 68 },
      { id: "eventbridge", service: "eventbridge", label: "EventBridge", sub: "System Event Bus", x: 50, y: 290, w: 165, h: 68 },
      { id: "lambda", service: "lambda", label: "AWS Lambda", sub: "Micro-batch Parser", x: 310, y: 130, w: 165, h: 68 },
      { id: "glue", service: "glue", label: "AWS Glue", sub: "Catalog & Crawler", x: 310, y: 280, w: 165, h: 68 },
      { id: "s3", service: "s3", label: "Amazon S3", sub: "Parquet Data Lake", x: 600, y: 100, w: 165, h: 68 },
      { id: "athena", service: "athena", label: "Amazon Athena", sub: "Serverless SQL", x: 600, y: 220, w: 165, h: 68 },
      { id: "quicksight", service: "quicksight", label: "Amazon QuickSight", sub: "Executive Dashboards", x: 600, y: 340, w: 165, h: 68 },
      { id: "cloudwatch", service: "cloudwatch", label: "Amazon CloudWatch", sub: "Stream Throttles", x: 775, y: 170, w: 135, h: 68 }
    ],
    connections: [
      { from: "eventbridge", to: "kinesis", label: "Telemetry Events" },
      { from: "kinesis", to: "lambda", label: "Stream Shards" },
      { from: "lambda", to: "s3", label: "Write Parquet" },
      { from: "s3", to: "glue", label: "Schema Crawl" },
      { from: "glue", to: "athena", label: "Meta Catalog" },
      { from: "athena", to: "quicksight", label: "Visualizations" },
      { from: "kinesis", to: "cloudwatch", label: "Iterator Age" }
    ],
    missing: ["kinesis", "glue", "athena"],
    reasons: {
      kinesis: "Without Amazon Kinesis, high-velocity streaming records cannot be ingested or buffered in real time.",
      glue: "Without AWS Glue Data Catalog, Athena has no metadata schema definitions to partition or deserialize S3 files.",
      athena: "Without Amazon Athena, analysts and QuickSight cannot execute SQL queries against raw Parquet datasets."
    }
  },
  {
    id: 4,
    title: "Microservices Container Platform on Amazon ECS & Fargate",
    subtitle: "Zero-server container runtime with defense-in-depth security",
    scenario: "Automated container deployment running scalable microservices backed by encrypted secret management and managed document storage.",
    containers: [
      { label: "Edge Security & Ingress", x: 20, y: 40, w: 220, h: 420, color: "rgba(239, 68, 68, 0.08)", border: "#EF4444" },
      { label: "Container Compute Cluster", x: 260, y: 40, w: 320, h: 420, color: "rgba(255, 153, 0, 0.06)", border: "#FF9900" },
      { label: "Security & Managed Services", x: 600, y: 40, w: 320, h: 420, color: "rgba(139, 92, 246, 0.06)", border: "#8B5CF6" }
    ],
    nodes: [
      { id: "route53", service: "route53", label: "Route 53", sub: "Domain Routing", x: 45, y: 90, w: 160, h: 68 },
      { id: "waf", service: "waf", label: "AWS WAF", sub: "Web Exploit Shield", x: 45, y: 215, w: 160, h: 68 },
      { id: "alb", service: "alb", label: "Application Load Balancer", sub: "Path-based Routing", x: 45, y: 340, w: 160, h: 68 },
      { id: "ecs", service: "ecs", label: "Amazon ECS", sub: "Service Control Plane", x: 310, y: 120, w: 170, h: 68 },
      { id: "fargate", service: "fargate", label: "AWS Fargate", sub: "Serverless Tasks", x: 310, y: 250, w: 170, h: 68 },
      { id: "ecr", service: "ecr", label: "Amazon ECR", sub: "Docker Image Registry", x: 310, y: 370, w: 170, h: 68 },
      { id: "secretsmanager", service: "secretsmanager", label: "Secrets Manager", sub: "DB Credentials", x: 650, y: 110, w: 170, h: 68 },
      { id: "kms", service: "kms", label: "AWS KMS", sub: "Envelope Encryption", x: 650, y: 235, w: 170, h: 68 },
      { id: "dynamodb", service: "dynamodb", label: "DynamoDB", sub: "NoSQL Microservice DB", x: 650, y: 360, w: 170, h: 68 }
    ],
    connections: [
      { from: "route53", to: "waf", label: "Traffic Inspection" },
      { from: "waf", to: "alb", label: "Filtered HTTP" },
      { from: "alb", to: "ecs", label: "Target Group" },
      { from: "ecs", to: "fargate", label: "Task Launch" },
      { from: "fargate", to: "ecr", label: "Image Pull" },
      { from: "fargate", to: "secretsmanager", label: "Fetch Auth" },
      { from: "secretsmanager", to: "kms", label: "Decrypt Key" },
      { from: "fargate", to: "dynamodb", label: "CRUD Operations" }
    ],
    missing: ["waf", "ecr", "secretsmanager"],
    reasons: {
      waf: "Without AWS WAF, web endpoints are left exposed to SQL injection, XSS attacks, and bot floods.",
      ecr: "Without Amazon ECR, Fargate container tasks cannot pull the base container application images to boot.",
      secretsmanager: "Without AWS Secrets Manager, application tasks cannot retrieve rotated database credentials securely."
    }
  },
  {
    id: 5,
    title: "Secure Hybrid Cloud & Transit Gateway Hub",
    subtitle: "Hub-and-spoke multi-VPC enterprise networking with firewall inspection",
    scenario: "Centralized network architecture linking corporate on-prem data centers with multiple cloud VPCs via inspection firewalls.",
    containers: [
      { label: "On-Premises & Hybrid Link", x: 20, y: 40, w: 220, h: 420, color: "rgba(100, 116, 139, 0.08)", border: "#64748B" },
      { label: "Central Transit Hub VPC", x: 260, y: 40, w: 320, h: 420, color: "rgba(139, 92, 246, 0.06)", border: "#8B5CF6" },
      { label: "Spoke VPCs & Private Services", x: 600, y: 40, w: 320, h: 420, color: "rgba(16, 185, 129, 0.06)", border: "#10B981" }
    ],
    nodes: [
      { id: "vpcorouter", service: "vpcorouter", label: "Customer Gateway", sub: "On-Premises Data Center", x: 45, y: 130, w: 160, h: 68 },
      { id: "internetgateway", service: "internetgateway", label: "Direct Connect / VPN", sub: "Encrypted IPSec Link", x: 45, y: 280, w: 160, h: 68 },
      { id: "transitgateway", service: "transitgateway", label: "AWS Transit Gateway", sub: "Central Cloud Router", x: 310, y: 120, w: 170, h: 68 },
      { id: "networkfirewall", service: "networkfirewall", label: "Network Firewall", sub: "Stateful DPI Filter", x: 310, y: 250, w: 170, h: 68 },
      { id: "natgateway", service: "natgateway", label: "NAT Gateway", sub: "Central Egress", x: 310, y: 370, w: 170, h: 68 },
      { id: "ec2", service: "ec2", label: "Workload EC2 Fleet", sub: "Spoke Production VPC", x: 650, y: 110, w: 170, h: 68 },
      { id: "s3", service: "s3", label: "Amazon S3", sub: "VPC Gateway Endpoint", x: 650, y: 235, w: 170, h: 68 },
      { id: "kms", service: "kms", label: "AWS KMS", sub: "Internal Cryptography", x: 650, y: 360, w: 170, h: 68 }
    ],
    connections: [
      { from: "vpcorouter", to: "internetgateway", label: "Dedicated Fiber" },
      { from: "internetgateway", to: "transitgateway", label: "BGP Peering" },
      { from: "transitgateway", to: "networkfirewall", label: "East-West Inspection" },
      { from: "networkfirewall", to: "natgateway", label: "Inspected Egress" },
      { from: "transitgateway", to: "ec2", label: "Spoke Attachment" },
      { from: "ec2", to: "s3", label: "Private Endpoint" },
      { from: "ec2", to: "kms", label: "Auth Token" }
    ],
    missing: ["transitgateway", "networkfirewall", "s3"],
    reasons: {
      transitgateway: "Without AWS Transit Gateway, interconnected spoke VPCs cannot exchange packets across the central hub.",
      networkfirewall: "Without AWS Network Firewall, cross-VPC and outbound traffic bypasses mandatory deep-packet inspection.",
      s3: "Without the Amazon S3 VPC Endpoint, internal EC2 workloads cannot access private object buckets without traversing the public internet."
    }
  },
  {
    id: 6,
    title: "Generative AI & LLM Retrieval-Augmented Generation (RAG)",
    subtitle: "Enterprise semantic search and foundational model inference",
    scenario: "Secure GenAI chatbot using Amazon Bedrock foundation models with vector embeddings and authenticated user access.",
    containers: [
      { label: "Client Ingress & Auth", x: 20, y: 40, w: 220, h: 420, color: "rgba(239, 68, 68, 0.08)", border: "#EF4444" },
      { label: "API & RAG Orchestrator", x: 260, y: 40, w: 320, h: 420, color: "rgba(255, 153, 0, 0.06)", border: "#FF9900" },
      { label: "Foundation Models & Vector Store", x: 600, y: 40, w: 320, h: 420, color: "rgba(20, 184, 166, 0.06)", border: "#14B8A6" }
    ],
    nodes: [
      { id: "cognito", service: "cognito", label: "Amazon Cognito", sub: "User Identity & JWT", x: 45, y: 110, w: 160, h: 68 },
      { id: "cloudfront", service: "cloudfront", label: "CloudFront", sub: "Web App Hosting", x: 45, y: 240, w: 160, h: 68 },
      { id: "apigateway", service: "apigateway", label: "API Gateway", sub: "WebSocket / REST", x: 45, y: 365, w: 160, h: 68 },
      { id: "lambda", service: "lambda", label: "AWS Lambda", sub: "RAG Orchestrator", x: 310, y: 140, w: 170, h: 68 },
      { id: "dynamodb", service: "dynamodb", label: "DynamoDB", sub: "Chat Session History", x: 310, y: 290, w: 170, h: 68 },
      { id: "bedrock", service: "bedrock", label: "Amazon Bedrock", sub: "Claude / Titan Models", x: 650, y: 100, w: 170, h: 68 },
      { id: "opensearch", service: "opensearch", label: "OpenSearch Serverless", sub: "Vector Database (kNN)", x: 650, y: 230, w: 170, h: 68 },
      { id: "s3", service: "s3", label: "Amazon S3", sub: "Knowledge Base Docs", x: 650, y: 360, w: 170, h: 68 }
    ],
    connections: [
      { from: "cloudfront", to: "cognito", label: "Authenticate" },
      { from: "cloudfront", to: "apigateway", label: "Prompt Query" },
      { from: "apigateway", to: "lambda", label: "Invoke Agent" },
      { from: "lambda", to: "dynamodb", label: "Load Context" },
      { from: "lambda", to: "opensearch", label: "Vector Search" },
      { from: "lambda", to: "bedrock", label: "Prompt + Context" },
      { from: "s3", to: "opensearch", label: "Document Ingestion" }
    ],
    missing: ["cognito", "bedrock", "opensearch"],
    reasons: {
      cognito: "Without Amazon Cognito, user authentication, identity token verification, and session control are non-functional.",
      bedrock: "Without Amazon Bedrock, foundational LLM inference and generative response creation cannot occur.",
      opensearch: "Without OpenSearch Serverless vector database, semantic nearest-neighbor document retrieval (RAG) fails."
    }
  },
  {
    id: 7,
    title: "Automated CI/CD DevOps & Deployment Pipeline",
    subtitle: "Continuous integration and automated container cluster deployments",
    scenario: "Zero-touch release pipeline triggering source builds, automated unit tests, container builds, and blue-green updates.",
    containers: [
      { label: "Source Code & Trigger", x: 20, y: 40, w: 220, h: 420, color: "rgba(99, 102, 241, 0.08)", border: "#6366F1" },
      { label: "Build, Test & Package", x: 260, y: 40, w: 320, h: 420, color: "rgba(255, 153, 0, 0.06)", border: "#FF9900" },
      { label: "Deployment & Production Fleet", x: 600, y: 40, w: 320, h: 420, color: "rgba(16, 185, 129, 0.06)", border: "#10B981" }
    ],
    nodes: [
      { id: "s3", service: "s3", label: "Amazon S3", sub: "Artifact Store", x: 45, y: 110, w: 160, h: 68 },
      { id: "eventbridge", service: "eventbridge", label: "EventBridge", sub: "Git Webhook Trigger", x: 45, y: 240, w: 160, h: 68 },
      { id: "sns", service: "sns", label: "Amazon SNS", sub: "Pipeline Alerts Topic", x: 45, y: 365, w: 160, h: 68 },
      { id: "codebuild", service: "codebuild", label: "AWS CodeBuild", sub: "Container Compiler", x: 310, y: 130, w: 170, h: 68 },
      { id: "ecr", service: "ecr", label: "Amazon ECR", sub: "Versioned Image Tags", x: 310, y: 280, w: 170, h: 68 },
      { id: "ecs", service: "ecs", label: "Amazon ECS", sub: "Production Cluster", x: 650, y: 110, w: 170, h: 68 },
      { id: "alb", service: "alb", label: "Application Load Balancer", sub: "Blue/Green Listener", x: 650, y: 235, w: 170, h: 68 },
      { id: "cloudwatch", service: "cloudwatch", label: "Amazon CloudWatch", sub: "Rollback Health Metric", x: 650, y: 360, w: 170, h: 68 }
    ],
    connections: [
      { from: "eventbridge", to: "codebuild", label: "Trigger Build" },
      { from: "codebuild", to: "s3", label: "Archive Zip" },
      { from: "codebuild", to: "ecr", label: "Push Docker Image" },
      { from: "codebuild", to: "sns", label: "Notify Status" },
      { from: "ecr", to: "ecs", label: "Deploy New Tag" },
      { from: "ecs", to: "alb", label: "Test Listener Traffic" },
      { from: "cloudwatch", to: "ecs", label: "Threshold Alarms" }
    ],
    missing: ["codebuild", "ecr", "sns"],
    reasons: {
      codebuild: "Without AWS CodeBuild, source code cannot be compiled, unit tested, or containerized.",
      ecr: "Without Amazon ECR, Docker image tags cannot be stored or dispatched to ECS production clusters.",
      sns: "Without Amazon SNS, release status alerts, build failures, and approval notifications cannot be sent to squad channels."
    }
  },
  {
    id: 8,
    title: "Enterprise Data Lake & Modern Data Warehouse",
    subtitle: "High-scale migration, catalog governance, and fast analytical warehousing",
    scenario: "Heterogeneous database replication feeding raw object storage, governed data cataloging, and petabyte-scale data warehousing.",
    containers: [
      { label: "Data Ingestion & Migration", x: 20, y: 40, w: 220, h: 420, color: "rgba(59, 130, 246, 0.08)", border: "#3B82F6" },
      { label: "Governed Lake & Catalog", x: 260, y: 40, w: 320, h: 420, color: "rgba(6, 182, 212, 0.06)", border: "#06B6D4" },
      { label: "Analytical Data Warehouse", x: 600, y: 40, w: 320, h: 420, color: "rgba(255, 153, 0, 0.06)", border: "#FF9900" }
    ],
    nodes: [
      { id: "dms", service: "dms", label: "AWS DMS", sub: "CDC Database Sync", x: 45, y: 130, w: 160, h: 68 },
      { id: "rds", service: "rds", label: "Amazon RDS", sub: "OLTP Source Database", x: 45, y: 280, w: 160, h: 68 },
      { id: "s3", service: "s3", label: "Amazon S3", sub: "Enterprise Data Lake", x: 310, y: 110, w: 170, h: 68 },
      { id: "lakeformation", service: "lakeformation", label: "AWS Lake Formation", sub: "Column-level Security", x: 310, y: 240, w: 170, h: 68 },
      { id: "glue", service: "glue", label: "AWS Glue", sub: "Serverless ETL Job", x: 310, y: 365, w: 170, h: 68 },
      { id: "redshift", service: "redshift", label: "Amazon Redshift", sub: "Columnar Data Warehouse", x: 650, y: 120, w: 170, h: 68 },
      { id: "quicksight", service: "quicksight", label: "Amazon QuickSight", sub: "Enterprise BI Reports", x: 650, y: 260, w: 170, h: 68 },
      { id: "kms", service: "kms", label: "AWS KMS", sub: "Warehouse Encryption", x: 650, y: 380, w: 170, h: 68 }
    ],
    connections: [
      { from: "rds", to: "dms", label: "Change Data Capture" },
      { from: "dms", to: "s3", label: "Raw Landing Zone" },
      { from: "s3", to: "lakeformation", label: "Access Policy" },
      { from: "lakeformation", to: "glue", label: "Sanitized Data" },
      { from: "glue", to: "redshift", label: "COPY Command" },
      { from: "redshift", to: "quicksight", label: "Direct SQL Query" },
      { from: "redshift", to: "kms", label: "KMS Master Key" }
    ],
    missing: ["dms", "lakeformation", "redshift"],
    reasons: {
      dms: "Without AWS DMS (Database Migration Service), live transactional changes cannot replicate continuously into the data lake.",
      lakeformation: "Without AWS Lake Formation, granular column/row-level security and governance cannot be enforced.",
      redshift: "Without Amazon Redshift, high-performance columnar aggregations and enterprise BI reporting queries fail."
    }
  },
  {
    id: 9,
    title: "Multi-Region Active-Passive Disaster Recovery",
    subtitle: "Automated regional failover with global database replication",
    scenario: "Mission-critical banking architecture replicating state cross-region with DNS health-check automated failover and managed backups.",
    containers: [
      { label: "Global Edge & Routing", x: 20, y: 40, w: 220, h: 420, color: "rgba(139, 92, 246, 0.08)", border: "#8B5CF6" },
      { label: "Primary Region (us-east-1)", x: 260, y: 40, w: 320, h: 420, color: "rgba(16, 185, 129, 0.06)", border: "#10B981" },
      { label: "Disaster Recovery Region (us-west-2)", x: 600, y: 40, w: 320, h: 420, color: "rgba(245, 158, 11, 0.06)", border: "#F59E0B" }
    ],
    nodes: [
      { id: "route53", service: "route53", label: "Route 53", sub: "Health Check Failover", x: 45, y: 130, w: 160, h: 68 },
      { id: "cloudfront", service: "cloudfront", label: "CloudFront", sub: "Global Edge Cache", x: 45, y: 280, w: 160, h: 68 },
      { id: "alb", service: "alb", label: "Application Load Balancer", sub: "Primary Regional ALB", x: 310, y: 100, w: 170, h: 68 },
      { id: "ec2", service: "ec2", label: "Amazon EC2", sub: "Primary Compute Fleet", x: 310, y: 220, w: 170, h: 68 },
      { id: "rds", service: "rds", label: "Amazon RDS", sub: "Aurora Primary Cluster", x: 310, y: 350, w: 170, h: 68 },
      { id: "backup", service: "backup", label: "AWS Backup", sub: "Cross-Region Vault", x: 650, y: 100, w: 170, h: 68 },
      { id: "s3", service: "s3", label: "Amazon S3", sub: "Cross-Region Replica", x: 650, y: 220, w: 170, h: 68 },
      { id: "elasticache", service: "elasticache", label: "Amazon ElastiCache", sub: "DR Warm Cache", x: 650, y: 350, w: 170, h: 68 }
    ],
    connections: [
      { from: "route53", to: "cloudfront", label: "DNS Resolution" },
      { from: "cloudfront", to: "alb", label: "Primary Origin" },
      { from: "alb", to: "ec2", label: "Load Balance" },
      { from: "ec2", to: "rds", label: "Read / Write" },
      { from: "rds", to: "backup", label: "Snapshot Policy" },
      { from: "ec2", to: "s3", label: "Replicate Media" },
      { from: "rds", to: "elasticache", label: "Read Mirror" }
    ],
    missing: ["route53", "rds", "backup"],
    reasons: {
      route53: "Without Amazon Route 53 health-check failover routing, client requests cannot dynamically switch to the DR region during an outage.",
      rds: "Without Amazon RDS Aurora, database state and transactions in the primary zone are lost.",
      backup: "Without AWS Backup, automated cross-region snapshot replication and compliance disaster recovery policies are disabled."
    }
  },
  {
    id: 10,
    title: "Serverless Video Transcoding & Adaptive Streaming",
    subtitle: "Event-driven media ingestion and multi-bitrate HLS distribution",
    scenario: "Automated video pipeline converting raw user 4K uploads into multi-bitrate HLS adaptive video streams with state machine control.",
    containers: [
      { label: "Upload & Event Ingestion", x: 20, y: 40, w: 220, h: 420, color: "rgba(16, 185, 129, 0.08)", border: "#10B981" },
      { label: "Transcode Pipeline & State Control", x: 260, y: 40, w: 320, h: 420, color: "rgba(236, 72, 153, 0.06)", border: "#EC4899" },
      { label: "Delivery & User Feedback", x: 600, y: 40, w: 320, h: 420, color: "rgba(139, 92, 246, 0.06)", border: "#8B5CF6" }
    ],
    nodes: [
      { id: "s3", service: "s3", label: "Amazon S3", sub: "Raw Source Bucket", x: 45, y: 120, w: 160, h: 68 },
      { id: "eventbridge", service: "eventbridge", label: "EventBridge", sub: "ObjectCreated Rule", x: 45, y: 270, w: 160, h: 68 },
      { id: "stepfunctions", service: "stepfunctions", label: "AWS Step Functions", sub: "Video State Machine", x: 310, y: 110, w: 170, h: 68 },
      { id: "lambda", service: "lambda", label: "AWS Lambda", sub: "Metadata Extractor", x: 310, y: 240, w: 170, h: 68 },
      { id: "mediaconvert", service: "mediaconvert", label: "AWS Elemental MediaConvert", sub: "HLS Video Transcoder", x: 310, y: 365, w: 170, h: 68 },
      { id: "cloudfront", service: "cloudfront", label: "CloudFront", sub: "Low-Latency Video CDN", x: 650, y: 110, w: 170, h: 68 },
      { id: "dynamodb", service: "dynamodb", label: "DynamoDB", sub: "Video Catalog & URL", x: 650, y: 240, w: 170, h: 68 },
      { id: "sns", service: "sns", label: "Amazon SNS", sub: "Completion SMS / Push", x: 650, y: 365, w: 170, h: 68 }
    ],
    connections: [
      { from: "s3", to: "eventbridge", label: "Upload Event" },
      { from: "eventbridge", to: "stepfunctions", label: "Start Workflow" },
      { from: "stepfunctions", to: "lambda", label: "Inspect Codec" },
      { from: "stepfunctions", to: "mediaconvert", label: "Spawn Transcode" },
      { from: "mediaconvert", to: "cloudfront", label: "Distribute HLS" },
      { from: "lambda", to: "dynamodb", label: "Store Duration" },
      { from: "mediaconvert", to: "sns", label: "Job Complete" }
    ],
    missing: ["eventbridge", "stepfunctions", "mediaconvert"],
    reasons: {
      eventbridge: "Without Amazon EventBridge, S3 file creation events are not captured and cannot trigger downstream processing.",
      stepfunctions: "Without AWS Step Functions, multi-stage transcode orchestration, error handling, and state tracking fail.",
      mediaconvert: "Without AWS Elemental MediaConvert, raw video cannot be transcoded into adaptive multi-bitrate HLS streams."
    }
  }
];
