import tnc from '@/components/images/logos/t&c.png'
import ca from '@/components/images/logos/childandadolecent.png'
import dt from '@/components/images/logos/disordertreatment.png'
import pm from '@/components/images/logos/psychomatrictretment.png'
import wp from '@/components/images/logos/workshopprogramme.png'

export const services = [
  {
    category: "Therapy & Counseling",
    image:tnc,
    subcategories: [
      {
        name: "Individual Counseling",
        about: {
          description: "Personalized therapy for individuals dealing with emotional, mental, or behavioral issues.",
          instructions: [
            "Sessions are typically one-on-one with a licensed therapist.",
            "Clients are encouraged to share openly.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
          ],
          benefits: "Improves self-awareness, emotional regulation, and overall mental well-being.",
        },
      },
      {
        name: "Couple Therapy",
        about: {
          description: "Focused on resolving relationship issues and enhancing communication between partners.",
          instructions: [
            "Both partners must attend sessions together.",
            "Confidentiality is maintained.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
          ],
          benefits: "Helps rebuild trust, improve communication, and strengthen relationships.",
        },
      },
      {
        name: "Family & Relationship Counseling",
        about: {
          description: "Supports families navigating conflicts, parenting challenges, or emotional crises.",
          instructions: [
            "Multiple family members can attend.",
            "Sessions are structured around shared goals.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
          ],
          benefits: "Improves family dynamics, emotional bonding, and conflict resolution.",
        },
      },
      {
        name: "LGBTQ+ Support",
        about: {
          description: "Safe and inclusive space for LGBTQ+ individuals to explore their identity and mental health.",
          instructions: [
            "No discrimination tolerated.",
            "Sessions are sensitive and affirming.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
          ],
          benefits: "Promotes mental wellness, self-acceptance, and resilience.",
        },
      },
    ],
  },
  {
    category: "Disorder Treatment",
    image:dt,
    subcategories: [
      {
        name: "Stress, Depression, Anxiety",
        about: {
          description:
            "Therapy targeting common mental health concerns such as anxiety, depression, and chronic stress.",
          instructions: [
            "Initial assessments help tailor a personalized treatment plan.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
            "Sessions may be rescheduled if needed with prior notice.",
          ],
          benefits: "Reduces symptoms, enhances coping skills, and improves daily functioning.",
        },
      },
      {
        name: "OCD, PTSD, Trauma Therapy",
        about: {
          description: "Treatment focused on trauma recovery, intrusive thoughts, and obsessive behaviors.",
          instructions: [
            "May include CBT, exposure therapy, or EMDR depending on diagnosis.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
            "Sessions may be rescheduled if needed with prior notice.",
          ],
          benefits: "Improves emotional safety, reduces triggers, and supports long-term healing.",
        },
      },
      {
        name: "Sleep & Eating Disorders",
        about: {
          description: "Help for individuals struggling with insomnia, anorexia, bulimia, or binge eating.",
          instructions: [
            "A combination of therapy, medical evaluation, and behavior tracking is used.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
            "Sessions may be rescheduled if needed with prior notice.",
          ],
          benefits: "Restores healthy habits and improves physical and emotional health.",
        },
      },
      {
        name: "Addiction Therapy",
        about: {
          description: "Comprehensive therapy to support recovery from substance or behavioral addiction.",
          instructions: [
            "May include detox referrals, relapse prevention, and group therapy.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
            "Sessions may be rescheduled if needed with prior notice.",
          ],
          benefits: "Promotes long-term recovery, accountability, and healthier lifestyle choices.",
        },
      },
    ],
  },
  {
    category: "Child & Adolescent",
    image:ca,
    subcategories: [
      {
        name: "Child Psychology",
        about: {
          description: "Focuses on emotional and behavioral development in children.",
          instructions: [
            "Sessions often involve play therapy, parental guidance, and regular assessments.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
            "Sessions may be rescheduled if needed with prior notice.",
          ],
          benefits: "Supports mental growth, resilience, and better academic performance.",
        },
      },
      {
        name: "Behavioral Assessments",
        about: {
          description: "Evaluates behavior patterns to identify psychological or developmental issues.",
          instructions: [
            "Parents may need to fill out behavioral questionnaires or journals.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
            "Sessions may be rescheduled if needed with prior notice.",
          ],
          benefits: "Enables early intervention and tailored support strategies.",
        },
      },
      {
        name: "Academic Performance Issues",
        about: {
          description: "Assists students struggling with concentration, motivation, or learning disorders.",
          instructions: [
            "Includes collaboration with educators and cognitive assessments.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
            "Sessions may be rescheduled if needed with prior notice.",
          ],
          benefits: "Improves academic success and reduces school-related anxiety.",
        },
      },
      {
        name: "Developmental Disorders",
        about: {
          description: "Supports children with autism, ADHD, or learning disabilities.",
          instructions: [
            "Treatment plans are individualized and may include occupational or speech therapy.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
            "Sessions may be rescheduled if needed with prior notice.",
          ],
          benefits: "Enhances communication, social skills, and adaptive functioning.",
        },
      },
    ],
  },
  {
    category: "Psychometric & Clinical",
    image:pm,
    subcategories: [
      {
        name: "IQ Testing",
        about: {
          description: "Standardized assessment to evaluate intellectual functioning.",
          instructions: [
            "Test administered by certified psychologists in a controlled environment.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
            "Sessions may be rescheduled if needed with prior notice.",
          ],
          benefits: "Helpful for academic placement, giftedness, or learning difficulties.",
        },
      },
      {
        name: "Psychometric Evaluations",
        about: {
          description: "Comprehensive evaluations measuring emotional, cognitive, and personality traits.",
          instructions: [
            "Takes 1-3 hours and may involve written or verbal testing.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
            "Sessions may be rescheduled if needed with prior notice.",
          ],
          benefits: "Provides insight into mental health and supports accurate diagnosis.",
        },
      },
      {
        name: "Clinical Hypnosis",
        about: {
          description: "Uses guided hypnosis to support behavioral change and emotional healing.",
          instructions: [
            "Requires informed consent and is conducted by a licensed hypnotherapist.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
            "Sessions may be rescheduled if needed with prior notice.",
          ],
          benefits: "Effective for phobias, anxiety, smoking cessation, and pain management.",
        },
      },
      {
        name: "Personality Assessments",
        about: {
          description: "Evaluates personality traits and behavior styles using standardized tools.",
          instructions: [
            "Results are discussed in follow-up sessions to develop self-awareness.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
            "Sessions may be rescheduled if needed with prior notice.",
          ],
          benefits: "Useful for therapy planning, career guidance, and relationship insights.",
        },
      },
    ],
  },
  {
    category: "Workshops & Programs",
    image:wp,
    subcategories: [
      {
        name: "Cultural Adjustment Assistance",
        about: {
          description: "Helps individuals or families adapt to new cultural or geographic settings.",
          instructions: [
            "Workshops may include roleplays, group discussions, and coping techniques.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
            "Sessions may be rescheduled if needed with prior notice.",
          ],
          benefits: "Reduces culture shock and enhances integration.",
        },
      },
      {
        name: "Brain Coordination & Balancing",
        about: {
          description: "Exercises and therapies designed to enhance cognitive performance and coordination.",
          instructions: [
            "Typically delivered through hands-on activities or neurofeedback sessions.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
            "Sessions may be rescheduled if needed with prior notice.",
          ],
          benefits: "Improves focus, memory, and mental agility.",
        },
      },
      {
        name: "Stress Management Workshops",
        about: {
          description: "Interactive sessions teaching tools to manage stress effectively.",
          instructions: [
            "Includes relaxation techniques, mindfulness, and cognitive strategies.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
            "Sessions may be rescheduled if needed with prior notice.",
          ],
          benefits: "Boosts emotional resilience and productivity.",
        },
      },
      {
        name: "Corporate Wellness Programs",
        about: {
          description: "Designed for organizations to promote employee mental well-being.",
          instructions: [
            "Offered as in-house workshops or external training modules.",
            "Arrive at least 10 minutes early to settle in.",
            "Bring any relevant documents or previous diagnoses.",
            "Sessions may be rescheduled if needed with prior notice.",
          ],
          benefits: "Increases workplace morale, focus, and performance.",
        },
      },
    ],
  },
]

export const contactSupport = {
  title: "Need Help Choosing?",
  description: "Not sure which service is right for you? Contact us for a consultation.",
  action: "Contact Us",
}
