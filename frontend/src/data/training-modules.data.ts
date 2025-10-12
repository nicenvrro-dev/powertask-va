export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: "sales" | "admin" | "customer";
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  duration: number;
  points: number;
  progress: number;
  status: "not-started" | "in-progress" | "completed";
  chapters: TrainingChapter[];
  prerequisites?: string;
  tags: string[];
  enrolledDate?: string;
  completedDate?: string;
}

export interface TrainingChapter {
  id: string;
  title: string;
  description: string;
  duration: number;
  points: number;
  completed: boolean;
  locked: boolean;
}

export const salesTrainingModules: TrainingModule[] = [
  {
    id: "sales-001",
    title: "Introduction to Sales",
    description: "Learn the fundamentals of sales and customer interaction",
    category: "sales",
    level: "BEGINNER",
    duration: 120,
    points: 24,
    progress: 25,
    status: "in-progress",
    chapters: [
      {
        id: "ch-001",
        title: "What is Sales?",
        description:
          "Sales is the process of selling products or services to customers. It's not just about transactions.",
        duration: 15,
        points: 10,
        completed: true,
        locked: false,
      },
      {
        id: "ch-002",
        title: "Key Components of Sales",
        description: "Understanding the essential elements that make up successful sales processes",
        duration: 10,
        points: 15,
        completed: false,
        locked: false,
      },
      {
        id: "ch-003",
        title: "The Sales Process",
        description: "Step-by-step guide through the modern sales cycle",
        duration: 30,
        points: 15,
        completed: false,
        locked: false,
      },
      {
        id: "ch-004",
        title: "Building Customer Relationships",
        description: "Learn how to create lasting connections with your customers",
        duration: 25,
        points: 20,
        completed: false,
        locked: true,
      },
      {
        id: "ch-005",
        title: "Handling Objections",
        description: "Strategies for overcoming customer concerns and objections",
        duration: 20,
        points: 15,
        completed: false,
        locked: true,
      },
      {
        id: "ch-006",
        title: "Closing Techniques",
        description: "Master the art of closing deals effectively",
        duration: 20,
        points: 20,
        completed: false,
        locked: true,
      },
    ],
    tags: ["fundamentals", "beginner", "customer-interaction"],
    enrolledDate: "2025-01-15",
  },
  {
    id: "sales-002",
    title: "Lead Generation Strategies",
    description: "Master modern lead generation techniques and tools",
    category: "sales",
    level: "INTERMEDIATE",
    duration: 180,
    points: 36,
    progress: 0,
    status: "not-started",
    chapters: [
      {
        id: "ch-007",
        title: "Lead Generation Fundamentals",
        description: "Understanding the basics of attracting and converting prospects",
        duration: 15,
        points: 11,
        completed: false,
        locked: false,
      },
      {
        id: "ch-008",
        title: "What is Lead Generation?",
        description:
          "Lead generation is the process of attracting and converting strangers into prospects",
        duration: 10,
        points: 11,
        completed: false,
        locked: false,
      },
      {
        id: "ch-009",
        title: "Digital Marketing for Leads",
        description: "Leverage digital channels to generate quality leads",
        duration: 35,
        points: 18,
        completed: false,
        locked: true,
      },
      {
        id: "ch-010",
        title: "Content Marketing Strategies",
        description: "Create compelling content that attracts your target audience",
        duration: 40,
        points: 20,
        completed: false,
        locked: true,
      },
      {
        id: "ch-011",
        title: "Social Media Lead Generation",
        description: "Use social platforms to build your pipeline",
        duration: 35,
        points: 16,
        completed: false,
        locked: true,
      },
      {
        id: "ch-012",
        title: "Lead Scoring and Qualification",
        description: "Identify and prioritize your best prospects",
        duration: 25,
        points: 15,
        completed: false,
        locked: true,
      },
      {
        id: "ch-013",
        title: "CRM and Lead Management",
        description: "Tools and techniques for managing your lead pipeline",
        duration: 20,
        points: 15,
        completed: false,
        locked: true,
      },
    ],
    tags: ["lead-generation", "digital-marketing", "intermediate"],
    prerequisites: "Complete Introduction to Sales module",
  },
  {
    id: "sales-003",
    title: "Advanced Sales Techniques",
    description: "Elevate your sales game with advanced strategies and psychology",
    category: "sales",
    level: "ADVANCED",
    duration: 210,
    points: 48,
    progress: 0,
    status: "not-started",
    chapters: [
      {
        id: "ch-014",
        title: "Sales Psychology",
        description: "Understanding buyer psychology and decision-making",
        duration: 30,
        points: 20,
        completed: false,
        locked: false,
      },
      {
        id: "ch-015",
        title: "Consultative Selling",
        description: "Become a trusted advisor to your clients",
        duration: 35,
        points: 18,
        completed: false,
        locked: true,
      },
      {
        id: "ch-016",
        title: "Negotiation Mastery",
        description: "Win-win negotiation strategies for complex deals",
        duration: 40,
        points: 22,
        completed: false,
        locked: true,
      },
      {
        id: "ch-017",
        title: "Account-Based Selling",
        description: "Strategic approach to high-value accounts",
        duration: 35,
        points: 20,
        completed: false,
        locked: true,
      },
      {
        id: "ch-018",
        title: "Sales Analytics and Forecasting",
        description: "Data-driven approaches to sales success",
        duration: 35,
        points: 18,
        completed: false,
        locked: true,
      },
      {
        id: "ch-019",
        title: "Building a Personal Brand",
        description: "Establish yourself as an industry thought leader",
        duration: 35,
        points: 20,
        completed: false,
        locked: true,
      },
    ],
    tags: ["advanced", "psychology", "strategy"],
    prerequisites: "Complete Lead Generation Strategies module",
  },
];

export const adminTrainingModules: TrainingModule[] = [
  {
    id: "admin-001",
    title: "Administrative Essentials",
    description: "Master the core skills required for effective administrative support",
    category: "admin",
    level: "BEGINNER",
    duration: 150,
    points: 30,
    progress: 0,
    status: "not-started",
    chapters: [
      {
        id: "ch-020",
        title: "Role of an Administrative Professional",
        description: "Understanding your responsibilities and impact",
        duration: 20,
        points: 12,
        completed: false,
        locked: false,
      },
      {
        id: "ch-021",
        title: "Office Organization Systems",
        description: "Create efficient filing and organization systems",
        duration: 25,
        points: 14,
        completed: false,
        locked: false,
      },
      {
        id: "ch-022",
        title: "Time Management for Admins",
        description: "Prioritize tasks and manage multiple responsibilities",
        duration: 30,
        points: 16,
        completed: false,
        locked: true,
      },
      {
        id: "ch-023",
        title: "Professional Communication",
        description: "Email etiquette and business correspondence",
        duration: 25,
        points: 14,
        completed: false,
        locked: true,
      },
      {
        id: "ch-024",
        title: "Document Management",
        description: "Creating, editing, and managing business documents",
        duration: 30,
        points: 16,
        completed: false,
        locked: true,
      },
      {
        id: "ch-025",
        title: "Meeting Coordination",
        description: "Planning and executing successful meetings",
        duration: 20,
        points: 12,
        completed: false,
        locked: true,
      },
    ],
    tags: ["fundamentals", "organization", "communication"],
  },
  {
    id: "admin-002",
    title: "Executive Support Excellence",
    description: "Advanced skills for supporting senior leadership",
    category: "admin",
    level: "INTERMEDIATE",
    duration: 180,
    points: 38,
    progress: 0,
    status: "not-started",
    chapters: [
      {
        id: "ch-026",
        title: "Calendar Management Strategies",
        description: "Optimize executive schedules for maximum productivity",
        duration: 25,
        points: 15,
        completed: false,
        locked: false,
      },
      {
        id: "ch-027",
        title: "Travel Coordination",
        description: "Plan and execute complex travel arrangements",
        duration: 30,
        points: 16,
        completed: false,
        locked: true,
      },
      {
        id: "ch-028",
        title: "Expense Management",
        description: "Track, process, and reconcile business expenses",
        duration: 25,
        points: 14,
        completed: false,
        locked: true,
      },
      {
        id: "ch-029",
        title: "Confidentiality and Discretion",
        description: "Handling sensitive information professionally",
        duration: 20,
        points: 12,
        completed: false,
        locked: true,
      },
      {
        id: "ch-030",
        title: "Project Support and Coordination",
        description: "Assist with project management and tracking",
        duration: 35,
        points: 18,
        completed: false,
        locked: true,
      },
      {
        id: "ch-031",
        title: "Stakeholder Communication",
        description: "Represent executives in communications",
        duration: 25,
        points: 15,
        completed: false,
        locked: true,
      },
      {
        id: "ch-032",
        title: "Problem Solving and Initiative",
        description: "Anticipate needs and solve problems proactively",
        duration: 20,
        points: 13,
        completed: false,
        locked: true,
      },
    ],
    tags: ["executive-support", "leadership", "advanced-admin"],
    prerequisites: "Complete Administrative Essentials module",
  },
  {
    id: "admin-003",
    title: "Digital Tools for Modern Admins",
    description: "Master the technology stack for administrative excellence",
    category: "admin",
    level: "INTERMEDIATE",
    duration: 160,
    points: 34,
    progress: 0,
    status: "not-started",
    chapters: [
      {
        id: "ch-033",
        title: "Office Suite Mastery",
        description: "Advanced features of Microsoft Office or Google Workspace",
        duration: 35,
        points: 18,
        completed: false,
        locked: false,
      },
      {
        id: "ch-034",
        title: "Cloud Collaboration Tools",
        description: "Leverage cloud platforms for team productivity",
        duration: 25,
        points: 14,
        completed: false,
        locked: true,
      },
      {
        id: "ch-035",
        title: "Communication Platforms",
        description: "Master Slack, Teams, and other messaging tools",
        duration: 20,
        points: 12,
        completed: false,
        locked: true,
      },
      {
        id: "ch-036",
        title: "Database and CRM Basics",
        description: "Work with databases and customer relationship systems",
        duration: 30,
        points: 16,
        completed: false,
        locked: true,
      },
      {
        id: "ch-037",
        title: "Automation and Workflow Tools",
        description: "Streamline repetitive tasks with automation",
        duration: 30,
        points: 16,
        completed: false,
        locked: true,
      },
      {
        id: "ch-038",
        title: "Digital Security Best Practices",
        description: "Protect sensitive information in the digital workspace",
        duration: 20,
        points: 12,
        completed: false,
        locked: true,
      },
    ],
    tags: ["technology", "digital-tools", "productivity"],
  },
];

export const customerServiceModules: TrainingModule[] = [
  {
    id: "customer-001",
    title: "Customer Service Fundamentals",
    description: "Build a strong foundation in customer service excellence",
    category: "customer",
    level: "BEGINNER",
    duration: 140,
    points: 28,
    progress: 0,
    status: "not-started",
    chapters: [
      {
        id: "ch-039",
        title: "The Customer Service Mindset",
        description: "Develop the right attitude for serving customers",
        duration: 20,
        points: 12,
        completed: false,
        locked: false,
      },
      {
        id: "ch-040",
        title: "Active Listening Skills",
        description: "Truly hear what customers are saying",
        duration: 25,
        points: 14,
        completed: false,
        locked: false,
      },
      {
        id: "ch-041",
        title: "Effective Communication Techniques",
        description: "Speak clearly and professionally with customers",
        duration: 25,
        points: 14,
        completed: false,
        locked: true,
      },
      {
        id: "ch-042",
        title: "Problem Solving Basics",
        description: "Identify and resolve customer issues",
        duration: 30,
        points: 16,
        completed: false,
        locked: true,
      },
      {
        id: "ch-043",
        title: "Product Knowledge",
        description: "Know your products inside and out",
        duration: 20,
        points: 12,
        completed: false,
        locked: true,
      },
      {
        id: "ch-044",
        title: "First Impressions Matter",
        description: "Make every customer interaction count",
        duration: 20,
        points: 12,
        completed: false,
        locked: true,
      },
    ],
    tags: ["fundamentals", "communication", "service-excellence"],
  },
  {
    id: "customer-002",
    title: "Handling Difficult Customers",
    description: "Expert strategies for managing challenging situations",
    category: "customer",
    level: "INTERMEDIATE",
    duration: 170,
    points: 36,
    progress: 0,
    status: "not-started",
    chapters: [
      {
        id: "ch-045",
        title: "Understanding Customer Frustration",
        description: "Recognize the root causes of customer dissatisfaction",
        duration: 25,
        points: 14,
        completed: false,
        locked: false,
      },
      {
        id: "ch-046",
        title: "De-escalation Techniques",
        description: "Calm angry customers and reduce tension",
        duration: 30,
        points: 16,
        completed: false,
        locked: true,
      },
      {
        id: "ch-047",
        title: "Empathy in Action",
        description: "Show genuine understanding and care",
        duration: 25,
        points: 14,
        completed: false,
        locked: true,
      },
      {
        id: "ch-048",
        title: "Setting Boundaries",
        description: "Maintain professionalism with aggressive customers",
        duration: 20,
        points: 12,
        completed: false,
        locked: true,
      },
      {
        id: "ch-049",
        title: "Turning Complaints into Opportunities",
        description: "Convert negative experiences into positive outcomes",
        duration: 30,
        points: 16,
        completed: false,
        locked: true,
      },
      {
        id: "ch-050",
        title: "When to Escalate",
        description: "Know when to involve management",
        duration: 20,
        points: 12,
        completed: false,
        locked: true,
      },
      {
        id: "ch-051",
        title: "Self-Care for Service Professionals",
        description: "Manage stress and avoid burnout",
        duration: 20,
        points: 12,
        completed: false,
        locked: true,
      },
    ],
    tags: ["conflict-resolution", "de-escalation", "advanced"],
    prerequisites: "Complete Customer Service Fundamentals module",
  },
  {
    id: "customer-003",
    title: "Omnichannel Customer Support",
    description: "Deliver consistent excellence across all channels",
    category: "customer",
    level: "ADVANCED",
    duration: 190,
    points: 42,
    progress: 0,
    status: "not-started",
    chapters: [
      {
        id: "ch-052",
        title: "Phone Support Best Practices",
        description: "Master the art of telephone customer service",
        duration: 30,
        points: 16,
        completed: false,
        locked: false,
      },
      {
        id: "ch-053",
        title: "Email Support Excellence",
        description: "Write clear, helpful, and professional emails",
        duration: 25,
        points: 14,
        completed: false,
        locked: true,
      },
      {
        id: "ch-054",
        title: "Live Chat Techniques",
        description: "Provide fast, efficient chat support",
        duration: 25,
        points: 14,
        completed: false,
        locked: true,
      },
      {
        id: "ch-055",
        title: "Social Media Customer Service",
        description: "Handle public customer interactions professionally",
        duration: 30,
        points: 16,
        completed: false,
        locked: true,
      },
      {
        id: "ch-056",
        title: "Self-Service and Knowledge Bases",
        description: "Empower customers to help themselves",
        duration: 25,
        points: 14,
        completed: false,
        locked: true,
      },
      {
        id: "ch-057",
        title: "Video Support and Screen Sharing",
        description: "Use visual tools to solve complex issues",
        duration: 25,
        points: 14,
        completed: false,
        locked: true,
      },
      {
        id: "ch-058",
        title: "Measuring Customer Satisfaction",
        description: "Track and improve your service metrics",
        duration: 30,
        points: 18,
        completed: false,
        locked: true,
      },
    ],
    tags: ["omnichannel", "digital-support", "advanced"],
    prerequisites: "Complete Handling Difficult Customers module",
  },
];

export const getModulesByCategory = (
  category: "sales" | "admin" | "customer"
): TrainingModule[] => {
  switch (category) {
    case "sales":
      return salesTrainingModules;
    case "admin":
      return adminTrainingModules;
    case "customer":
      return customerServiceModules;
    default:
      return [];
  }
};

export const getCategoryLabel = (category: "sales" | "admin" | "customer"): string => {
  switch (category) {
    case "sales":
      return "Sales & Lead Generation";
    case "admin":
      return "Administrative Support";
    case "customer":
      return "Customer Service";
    default:
      return category;
  }
};

export const getCategoryDescription = (category: "sales" | "admin" | "customer"): string => {
  switch (category) {
    case "sales":
      return "Master the art of sales and lead generation";
    case "admin":
      return "Excel in administrative and executive support";
    case "customer":
      return "Deliver exceptional customer service experiences";
    default:
      return "";
  }
};
