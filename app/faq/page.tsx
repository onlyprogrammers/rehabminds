import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Find answers to common questions about our services, appointments, and mental health care.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 container">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="sticky top-20 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#appointments" className="text-primary hover:underline">
                    Appointments
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-primary hover:underline">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#insurance" className="text-primary hover:underline">
                    Insurance & Payments
                  </Link>
                </li>
                <li>
                  <Link href="#confidentiality" className="text-primary hover:underline">
                    Confidentiality & Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#specialists" className="text-primary hover:underline">
                    Our Specialists
                  </Link>
                </li>
                <li>
                  <Link href="#general" className="text-primary hover:underline">
                    General Questions
                  </Link>
                </li>
              </ul>
              
              <div className="pt-8">
                <h3 className="text-lg font-semibold mb-4">Need More Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you can't find the answer to your question, please contact us directly.
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3 space-y-10">
            {/* Appointments */}
            <div id="appointments" className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">Appointments</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I schedule an appointment?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      You can schedule an appointment in several ways:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Using our online booking form on the Appointments page</li>
                      <li>Calling our office at +1 (234) 567-890</li>
                      <li>Emailing us at appointments@rehabminds.com</li>
                      <li>Visiting our office in person</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      For new patients, we recommend scheduling an initial consultation to determine the most appropriate services for your needs.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>What should I bring to my first appointment?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      For your first appointment, please bring:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>A valid photo ID</li>
                      <li>Your insurance card (if applicable)</li>
                      <li>Any relevant medical records or previous psychological evaluations</li>
                      <li>A list of current medications</li>
                      <li>Payment method for any applicable fees or co-payments</li>
                      <li>A list of questions or concerns you'd like to discuss</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>How long will my appointment last?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Appointment durations vary based on the type of service:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Initial consultations: 60-90 minutes</li>
                      <li>Individual therapy sessions: 45-60 minutes</li>
                      <li>Couples or family therapy: 60-90 minutes</li>
                      <li>Psychological assessments: 1-3 hours (may require multiple sessions)</li>
                      <li>Medication management: 20-30 minutes</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      Your specialist will discuss the recommended session length based on your specific needs.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>What is your cancellation policy?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      We understand that circumstances may arise that require you to cancel or reschedule your appointment. We request at least 24 hours' notice for any cancellations or changes to avoid a cancellation fee.
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Late cancellations (less than 24 hours' notice) or missed appointments may be subject to a fee of 50% of the session cost. This policy helps us manage our schedule effectively and provide timely care to all patients.
                    </p>
                    <p className="text-muted-foreground mt-2">
                      If you need to cancel or reschedule, please contact our office as soon as possible by phone or email.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>Do you offer virtual appointments?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes, we offer secure video consultations (teletherapy) for many of our services. Virtual appointments provide a convenient option for patients who:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Live far from our office</li>
                      <li>Have mobility limitations</li>
                      <li>Prefer the comfort and privacy of their own home</li>
                      <li>Have scheduling constraints that make in-person visits difficult</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      Our virtual platform is secure, HIPAA-compliant, and easy to use. You'll receive instructions on how to join your virtual appointment after scheduling.
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Note that some services, particularly certain assessments and evaluations, may require in-person visits.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Services */}
            <div id="services" className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">Services</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What types of mental health services do you offer?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      We offer a comprehensive range of mental health services, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Individual therapy and counseling</li>
                      <li>Couples and family therapy</li>
                      <li>Child and adolescent psychology</li>
                      <li>Treatment for various mental health disorders</li>
                      <li>Psychometric and clinical assessments</li>
                      <li>Workshops and group programs</li>
                      <li>Medication management (through our psychiatrists)</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      For a detailed description of our services, please visit our <Link href="/services" className="text-primary hover:underline">Services page</Link>.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I know which service is right for me?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Determining the right service depends on your specific needs, concerns, and goals. We recommend scheduling an initial consultation, during which a specialist will:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Discuss your concerns and symptoms</li>
                      <li>Review your mental health history</li>
                      <li>Assess your current situation</li>
                      <li>Recommend appropriate services and treatment options</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      You can also contact our office directly to discuss your specific concerns, and our staff can guide you toward the most appropriate service.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>How long does therapy typically last?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      The duration of therapy varies widely depending on:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>The nature and severity of your concerns</li>
                      <li>Your personal goals for therapy</li>
                      <li>The type of therapy being provided</li>
                      <li>Your progress and response to treatment</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      Some people benefit from short-term therapy (8-12 sessions) focused on specific issues, while others may engage in longer-term therapy to address complex or chronic concerns. Your therapist will discuss treatment recommendations and regularly review your progress to determine the appropriate duration.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Do you offer services for children and adolescents?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes, we offer specialized services for children and adolescents, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Child psychology</li>
                      <li>Behavioral assessments</li>
                      <li>Treatment for developmental disorders</li>
                      <li>Academic performance issues</li>
                      <li>Family therapy</li>
                      <li>Parent coaching and support</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      Our child and adolescent specialists use age-appropriate approaches and have extensive experience working with young people. We create a welcoming, supportive environment where children and teenagers feel comfortable expressing themselves.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>What therapeutic approaches do your specialists use?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Our specialists are trained in various evidence-based therapeutic approaches, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Cognitive Behavioral Therapy (CBT)</li>
                      <li>Dialectical Behavior Therapy (DBT)</li>
                      <li>Psychodynamic Therapy</li>
                      <li>Mindfulness-Based Cognitive Therapy</li>
                      <li>Solution-Focused Brief Therapy</li>
                      <li>Family Systems Therapy</li>
                      <li>Trauma-Focused Therapy</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      Many of our specialists integrate multiple approaches to create personalized treatment plans that address your unique needs and preferences. During your initial consultation, you can discuss therapeutic approaches with your specialist to ensure they align with your goals.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Insurance & Payments */}
            <div id="insurance" className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">Insurance & Payments</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Do you accept insurance?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes, we accept several insurance plans. Currently, we are in-network providers for:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Blue Cross Blue Shield</li>
                      <li>Aetna</li>
                      <li>Cigna</li>
                      <li>United Healthcare</li>
                      <li>Medicare</li>
                      <li>Several local and regional plans</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      Insurance coverage varies by plan, even within the same insurance company. We recommend contacting your insurance provider directly to verify your mental health benefits, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Whether our providers are in-network</li>
                      <li>Your deductible and how much has been met</li>
                      <li>Co-payment or co-insurance amounts</li>
                      <li>Number of sessions covered per year</li>
                      <li>Whether pre-authorization is required</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      Our billing staff can also help you understand your insurance benefits and coverage.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>What are your fees for services?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Our fees vary based on the type of service and the specialist providing care. Standard rates are:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Initial consultation: $150-200</li>
                      <li>Individual therapy session (45-60 min): $120-180</li>
                      <li>Couples/family therapy (60-90 min): $150-200</li>
                      <li>Psychological assessment (per hour): $150-250</li>
                      <li>Group therapy session: $50-75</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      If you're using insurance, your out-of-pocket cost will depend on your specific plan's coverage. For patients paying directly (self-pay), we offer a sliding scale fee structure based on financial need.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Do you offer payment plans?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes, we offer payment plans for patients who need flexibility in managing their mental health care expenses. Our administrative team can work with you to develop a payment schedule that fits your financial situation.
                    </p>
                    <p className="text-muted-foreground mt-2">
                      We also offer a sliding scale fee structure for patients without insurance or with financial hardship. Eligibility for reduced fees is based on income and household size. Please speak with our billing department for more information about these options.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      We accept various payment methods, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Credit and debit cards (Visa, MasterCard, American Express, Discover)</li>
                      <li>Health Savings Account (HSA) and Flexible Spending Account (FSA) cards</li>
                      <li>Cash</li>
                      <li>Personal checks</li>
                      <li>Electronic bank transfers</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      For ongoing therapy, many patients choose to keep a credit card on file for convenient billing.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Confidentiality & Privacy */}
            <div id="confidentiality" className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">Confidentiality & Privacy</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is my information kept confidential?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes, we take confidentiality very seriously. All information shared during sessions and your personal records are kept strictly confidential in accordance with professional ethical standards and legal requirements.
                    </p>
                    <p className="text-muted-foreground mt-2">
                      We comply with all privacy laws, including HIPAA (Health Insurance Portability and Accountability Act), which provides federal protections for your personal health information.
                    </p>
                    <p className="text-muted-foreground mt-2">
                      There are a few specific situations where confidentiality may be limited by law, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>If there is a risk of harm to yourself or others</li>
                      <li>Suspected abuse of children, elderly persons, or dependent adults</li>
                      <li>If a court order requires disclosure</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      Your specialist will discuss these limitations to confidentiality during your first session.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do you protect my personal information?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      We implement multiple layers of protection for your personal information:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Secure electronic health record system with encryption and access controls</li>
                      <li>Regular staff training on privacy and security practices</li>
                      <li>Physical safeguards for paper records</li>
                      <li>Secure, HIPAA-compliant telehealth platform for virtual appointments</li>
                      <li>Privacy policies that limit access to your information to only those directly involved in your care</li>
                      <li>Secure messaging system for communications</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      We regularly review and update our security practices to ensure the continued protection of your information.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can my family members access my records?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Your mental health records cannot be accessed by family members without your explicit written consent, except in specific circumstances:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Parents or legal guardians typically have access to records for minor children (though there are some exceptions based on the type of treatment and local laws)</li>
                      <li>Legal guardians may have access to records for adults who have been deemed unable to make their own healthcare decisions</li>
                      <li>In emergency situations where sharing information is necessary for your safety</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      If you wish to allow a family member access to your information, we can provide a release of information form for you to complete, specifying exactly what information can be shared and with whom.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Our Specialists */}
            <div id="specialists" className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">Our Specialists</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What qualifications do your specialists have?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      All our specialists hold advanced degrees in their respective fields and are licensed by appropriate professional boards. Our team includes:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Psychiatrists (M.D. or D.O.) with specialized training in psychiatry</li>
                      <li>Psychologists (Ph.D., Psy.D., or Ed.D.) with doctoral-level training</li>
                      <li>Licensed Clinical Social Workers (LCSW) with master's degrees in social work</li>
                      <li>Licensed Professional Counselors (LPC) with master's degrees in counseling</li>
                      <li>Marriage and Family Therapists (MFT) with specialized training in relationship therapy</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      Many of our specialists also have additional certifications in specialized treatment approaches or for specific populations. You can view detailed information about each specialist's qualifications on our <Link href="/specialists" className="text-primary hover:underline">Specialists page</Link>.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I choose the right specialist for my needs?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Choosing the right specialist depends on several factors:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>The nature of your concerns (some specialists focus on specific issues)</li>
                      <li>The type of treatment you're seeking</li>
                      <li>Your personal preferences regarding therapeutic style</li>
                      <li>Insurance coverage and network participation</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      Our intake coordinators can help match you with an appropriate specialist based on your needs and preferences. You can also browse our specialists' profiles on our website to learn about their backgrounds, approaches, and specialties.
                    </p>
                    <p className="text-muted-foreground mt-2">
                      If after your initial session you feel the specialist is not the right fit, please let us know. The therapeutic relationship is important, and we want to ensure you're working with someone you feel comfortable with.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I request a specific specialist?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes, you can request a specific specialist when scheduling your appointment. If you have reviewed our specialists' profiles and have a preference, please let our scheduling team know.
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Keep in mind that popular specialists may have longer wait times for new appointments. If you're seeking help for an urgent matter, we may recommend starting with another available specialist who can see you sooner.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* General Questions */}
            <div id="general" className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">General Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is there parking available at your location?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Yes, we have free parking available for all patients and visitors in the building's parking lot. The parking area is well-lit and easily accessible from the main entrance.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I provide feedback about my experience?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      We value your feedback and use it to continuously improve our services. You can provide feedback in several ways:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Complete our patient satisfaction survey (sent via email after appointments)</li>
                      <li>Speak directly with your specialist or our office manager</li>
                      <li>Submit feedback through the contact form on our website</li>
                      <li>Send an email to feedback@rehabminds.com</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      If you have concerns about your care that you'd prefer to discuss confidentially, please contact our clinical director.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Do you offer resources for crisis situations?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      While we strive to provide timely care to all our patients, we are not an emergency or crisis service. If you're experiencing a mental health emergency, please:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Call the Mental Health Crisis Hotline: +1 (800) 123-4567 (available 24/7)</li>
                      <li>Go to your nearest emergency room</li>
                      <li>Call 911</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      For urgent but non-emergency situations during business hours, please call our office, and we will do our best to accommodate you as quickly as possible.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>How can I get involved in mental health advocacy?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      There are many ways to get involved in mental health advocacy:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 
                    </p>
                    <ul className=\"list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Volunteer with local mental health organizations</li>
                    </ul>   <li>Participate in awareness events and fundraisers</li>
                      <li>Share your personal experiences (if comfortable) to help reduce stigma</li>
                      <li>Support mental health legislation and policy initiatives</li>
                      <li>Donate to mental health research and service organizations</li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                      We occasionally host community events and workshops focused on mental health awareness and education. Check our website or subscribe to our newsletter for information about upcoming opportunities.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
  ;<section className="py-16 bg-primary text-primary-foreground">
    <div className="container text-center">
      <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
      <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
        We're here to help. Contact our team directly for personalized assistance with any questions or concerns.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/contact">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            Contact Us
          </Button>
        </Link>
        <Link href="/appointment">
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            Book an Appointment
          </Button>
        </Link>
      </div>
    </div>
  </section>
  </div>
  )
}
