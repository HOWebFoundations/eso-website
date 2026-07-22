// ============================================================================
//  MoF DECREES BACKEND
//  Live decrees are served by the Vercel serverless function at /api/decrees
//  (uploads are managed from the secret admin page). Same origin, so no CORS.
//  Set to "" to force the static fallback list.
// ============================================================================
const DECREES_API = "/api/decrees";

const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About Us",
    nav_services: "Our Services",
    nav_clients: "Our Clients",
    nav_lebanon_insights: "Lebanon Insights",
    nav_market_guide: "Market Guide",
    nav_mof_decrees: "Laws and Decrees",
    nav_news: "News",
    nav_careers: "Careers",
    nav_client_portal: "Client Portal",
    nav_study: "Study",
    hero_eso_advisory: "ESO Advisory",
    hero_bridging: "Bridging what is with what can be.",
    hero_firm_expertise: "Firm Expertise & Resources",
    hero_audit_assurance: "Audit & Assurance",
    hero_tax_advisory: "Tax Advisory",
    hero_accounting: "Accounting",
    hero_consulting: "Consulting",
    hero_fb_specialty: "F&B Specialty",
    hero_mof_decrees: "Laws and Decrees",
    hero_schedule_consultation: "SCHEDULE A CONSULTATION",
    hero_latest_insights: "Latest Insights",
    hero_recent_studies: "Recent studies & market analysis.",
    hero_market_intelligence: "Market Intelligence",
    hero_view_all_news: "VIEW ALL NEWS",
    home_who_we_are: "Who We Are",
    home_integrity: "Integrity in Every Detail",
    home_eso_full_service: "ESO is a full-service firm serving clients globally. We go beyond the numbers, dedicated to providing clear, actionable financial insights. From rigorous auditing to strategic tax advisory, we ensure your business operates with absolute confidence and compliance.",
    home_discover_firm: "Discover Our Firm",
    home_our_expertise: "Our Expertise",
    home_big_4_standards: "Big 4 Standards. Boutique Agility.",
    home_from_rigorous: "From rigorous statutory auditing to complex cross-border tax structuring, we provide the full spectrum of accounting and corporate advisory services. Our specialized teams deliver tailored insights to ensure your enterprise thrives in any regulatory environment.",
    home_explore_services: "Explore Services",
    home_career_opportunities: "Career Opportunities",
    home_build_career: "Build Your Career With ESO",
    home_believe_diverse: "We believe a diverse workforce and an inclusive culture matter. We are continually looking for driven professionals and bright students to join our rigorous audit, tax, and consulting practices.",
    home_view_open_positions: "View Open Positions",
    about_title: "About ESO",
    about_subtitle: "Assisting professionals with precision, clarity, and uncompromising standards.",
    about_standard_subtitle: "The ESO Standard",
    about_bridging: "Bridging what is with what can be.",
    about_full_service: "ESO is a full-service firm serving clients globally. We are dedicated to providing professional, personalized guidance in a wide range of financial and business needs.",
    about_whether_multinational: "Whether you are a multinational corporation navigating complex tax jurisdictions, or a growing enterprise needing robust financial modeling, our expert consultants act as an extension of your team. We don't just report on the past; we architect your financial future.",
    about_our_people: "Our People",
    about_discover_team: "Discover Our Team",
    about_behind_every: "Behind every strategic insight and flawless audit is a team of dedicated professionals. Our partners and senior staff bring a wealth of diverse experience to the table, ensuring that your enterprise benefits from well-rounded, expert financial perspectives.",
    about_meet_experts: "Meet the Experts",
    adv_subtitle: "The ESO Advantage",
    adv_why_choose: "Why Partners Choose Us",
    adv_proactive_title: "Proactive Strategy",
    adv_proactive_desc: "We don't just report history; we architect futures. Our modeling anticipates market shifts so you can navigate volatility safely.",
    adv_compliance_title: "Absolute Compliance",
    adv_compliance_desc: "Eliminate regulatory blindspots. Our rigorous multi-tier audit processes guarantee pristine ledgers across borders.",
    adv_local_title: "Local Mastery",
    adv_local_desc: "Global standards meet granular local insight. We decode complex MENA jurisdictions to optimize your operational footprint.",
    clients_title: "Our Clients",
    clients_subtitle: "Serving a diverse range of industries and organizations.",
    clients_intro: "Our clients are among our prestigious local and foreign in different sectors, ESO has developed an expertise in all industries, mainly:",
    client_fb: "Food and Beverage",
    client_manufacturing: "Manufacturing Industry",
    client_contracting: "Contracting and real estate development",
    client_transportation: "Transportation (freight)",
    client_automotive: "Automotive, Car Dealerships and Rentals",
    client_media: "Media and advertising management",
    client_hospitality: "Hospitality & Leisure (Hotel management)",
    client_printing: "Printing works",
    client_trading: "Trading and all kind of services",
    client_public_works: "Public works",
    client_commercial: "Commercial representation",
    client_bottling: "Bottling & packing industries",
    client_healthcare: "Health care",
    client_oil: "Oil industry",
    client_financial: "Financial and brokerage services",
    client_venture: "Venture Capital and Private Equity Funds",
    client_hightech: "High Tech and Internet startup companies",
    client_ngo: "International and Non Governmental Organizations (NGO)",
    fb_breadcrumb: "Food & Beverage",
    fb_page_title: "Food and Beverage Sector",
    back_to_clients: "← Back to Clients",
    fb_core_specialty: "Firm Core Specialty",
    fb_financial_engine: "The Financial Engine of Hospitality",
    fb_lead_text: "Nearly 70% of our enterprise clients operate within the dynamic Food & Beverage sector. We do not just audit restaurants; we architect the financial systems that allow hospitality groups to scale aggressively and profitably.",
    fb_unforgiving: "The F&B industry is notoriously unforgiving. Razor-thin margins, highly volatile supply chain costs, complex payroll structures, and multi-channel revenue streams (dine-in, delivery apps, catering) demand a level of financial precision that standard accounting simply cannot provide. ESO brings decades of hyper-specialized expertise to independent concepts, national franchises, and international hospitality holding groups.",
    fb_specialized_caps: "Our Specialized F&B Capabilities",
    fb_inventory_title: "Inventory & Yield Management",
    fb_inventory_desc: "Food cost is the silent killer of profitability. We implement rigorous theoretical-vs-actual tracking systems. We audit recipe costing, track raw material spoilage, conduct granular variance analyses, and identify vendor pricing discrepancies to protect your gross margins.",
    fb_pos_title: "POS & Aggregator Reconciliation",
    fb_pos_desc: "Delivery platforms (Toters, Zomato, etc.) create accounting chaos with complex commission structures and delayed payouts. Our team seamlessly integrates your Point of Sale (POS) data with backend ledgers, ensuring every transaction, tip, and commission is reconciled down to the cent.",
    fb_franchise_title: "Franchise & Multi-Unit Auditing",
    fb_franchise_desc: "For franchisors, we conduct comprehensive royalty compliance audits to ensure franchisees are accurately reporting revenue. For multi-unit operators, we establish centralized purchasing ledgers and inter-company transfer pricing to streamline multi-location accounting.",
    fb_labor_title: "Labor & Tax Optimization",
    fb_labor_desc: "Hospitality relies on shift-based, highly variable labor. We optimize payroll structures to remain legally compliant with NSSF while minimizing tax liabilities. We also manage complex VAT treatments that differ between dine-in services and packaged goods.",
    fb_ready_scale: "Ready to scale your concept?",
    fb_stop_guessing: "Stop guessing your prime costs. Partner with the firm that understands the business of food as deeply as you do.",
    fb_consult_team: "Consult our F&B Team",
    fb_why_title: "Why Hospitality Demands a Specialist",
    fb_why_p1: "A restaurant is not a generic business with a kitchen attached. It runs on high transaction volumes, perishable inventory that loses value by the hour, heavy cash handling, shift-based and tipped labor, and revenue split across dine-in, takeaway, catering and a changing roster of delivery aggregators. A generalist records all of this after the fact; a specialist manages the levers that decide whether a concept survives its second year.",
    fb_why_p2: "Our F&B practice is organized around prime cost, the combined weight of food, beverage and labor, because it is the single figure that most reliably predicts a venue's survival. We track it against sales on a weekly rhythm rather than waiting for year-end, so problems surface while there is still time to fix them.",
    fb_approach_title: "How We Work With F&B Groups",
    fb_step1_t: "1. Prime-Cost Diagnostic",
    fb_step1_d: "We baseline your food, beverage and labor costs against revenue, channel by channel, to expose exactly where margin is leaking.",
    fb_step2_t: "2. Systems and POS Integration",
    fb_step2_d: "We connect your point-of-sale, inventory and accounting systems so revenue, voids and discounts reconcile automatically instead of by hand.",
    fb_step3_t: "3. Controls and Reporting",
    fb_step3_d: "We install cash-handling, purchasing and inventory controls, then deliver management reporting an operator can actually act on.",
    fb_step4_t: "4. Audit and Expansion Readiness",
    fb_step4_d: "We prepare franchise-ready and investor-ready financials so you can open the next branch or bring in a partner with clean books.",
    fb_faq_title: "Food and Beverage: Frequently Asked Questions",
    fb_faq_q1: "How is restaurant accounting different from standard business accounting?",
    fb_faq_a1: "The difference is speed and detail. Restaurants turn over perishable stock daily and earn revenue across several channels at once, so costs have to be measured weekly against sales, not summarized once a year. Prime cost, cash controls and channel-by-channel reconciliation matter far more than in a typical retail or services business.",
    fb_faq_q2: "How do you reconcile revenue from delivery aggregators?",
    fb_faq_a2: "Delivery platforms pay out net of commission, promotions and adjustments, often on their own timetable, which rarely matches what the POS recorded. We reconcile each platform's payout reports against POS sales and bank deposits, so commissions, chargebacks and missing settlements are identified rather than quietly absorbed into other costs.",
    fb_faq_q3: "Can you support a franchise or multi-branch expansion?",
    fb_faq_a3: "Yes. We handle royalty and marketing-fee compliance for both franchisors and franchisees, consolidate multi-unit reporting, and standardize the chart of accounts across branches so every location is measured the same way. That consistency is what makes an expansion financeable.",
    fb_faq_q4: "Do you handle NSSF and payroll for shift-based hospitality staff?",
    fb_faq_a4: "We do. We structure payroll for variable, shift-based and tipped staff to stay compliant with NSSF and labor rules at the prevailing statutory rates, while keeping the treatment defensible in an audit. We also separate the VAT treatment that differs between dine-in service and packaged goods.",
    team_breadcrumb: "Our Team",
    team_title: "Leadership & Experts",
    team_subtitle: "Decades of global and local financial expertise driving your strategic success.",
    team_firm_leadership: "Firm Leadership",
    team_our_staff: "Our Staff",
    team_leadership_desc: "With over a quarter of a century of experience in the auditing and consulting field since 2001, ESO is still going strong. Under Elie Salloum's guidance and capabilities, alongside our staff's extraordinary knowledge and expertise, we are dedicated to delivering the best services possible.",
    role_founder: "Founder & CEO",
    desc_founder: "Bringing 25 years of unparalleled experience in corporate advisory and auditing. Elie embodies the strategic vision, uncompromising integrity, and analytical precision essential for navigating global financial landscapes.",
    team_advisory_mgmt: "Advisory & Management",
    team_advisory_desc: "Driving strategy and ensuring absolute compliance.",
    role_head_tax: "Head of Tax Advisory",
    desc_karim: "Specializes in Lebanese Ministry of Finance decrees and corporate VAT structures. 15 years experience.",
    role_dir_consulting: "Director of Consulting",
    desc_layla: "Expert in operational restructuring and business valuations. Holds a CFA charter and MSc in Economics.",
    role_tax_manager: "Tax Manager",
    desc_jad: "Manages NSSF compliance and multi-tiered exchange rate reconciliation for SME portfolios.",
    role_audit_manager: "Audit Manager",
    desc_nour: "Specializes in healthcare and NGO auditing, ensuring pristine ledgers and grant compliance.",
    team_senior_associates: "Senior Associates & Analysts",
    team_senior_desc: "The analytical engine of our practice.",
    role_senior_auditor: "Senior Auditor",
    desc_tarek: "5+ years experience in public accounting. Leads field audit teams for manufacturing clients.",
    role_senior_auditor_2: "Senior Auditor",
    desc_maya: "Detail-oriented assurance professional with a focus on retail trade and inventory accounting.",
    role_senior_fin_analyst: "Senior Financial Analyst",
    desc_omar: "Expert in building hyper-inflationary DCF models. BA in Finance from AUB.",
    role_tax_associate: "Tax Associate",
    desc_zeina: "Prepares corporate tax filings and handles day-to-day Ministry of Finance communications.",
    team_associates_admin: "Associates & Administration",
    team_associates_desc: "Supporting seamless daily operations.",
    role_junior_auditor: "Junior Auditor",
    desc_samer: "Recent graduate performing analytical procedures and substantive testing for assurance clients.",
    role_junior_auditor_2: "Junior Auditor",
    desc_clara: "Assists in drafting financial statements and executing statutory audit fieldwork.",
    role_junior_consultant: "Junior Consultant",
    desc_rami: "Supports the advisory team in market research and creating business restructuring presentations.",
    role_office_admin: "Office Administrator",
    desc_yara: "Ensures smooth day-to-day operations, client onboarding, and firm-wide scheduling.",
    services_title: "Firm Expertise",
    services_subtitle: "Big 4 caliber solutions tailored for modern enterprises.",
    services_global_standards: "Global Standards",
    services_comprehensive: "Comprehensive Financial Solutions.",
    services_we_provide: "We provide the full spectrum of accounting and corporate advisory services. Our methodology matches the rigor of international Big 4 firms, delivered with the agility and personalized attention of a boutique practice.",
    services_select_service: "Select a service below to discover how our dedicated expert teams can optimize your operations, ensure absolute compliance, and architect your strategic growth.",
    services_4_pillars: "Our 4 Core Pillars",
    services_explore_services: "Explore Our Services",
    card_audit_title: "Audit & Assurance",
    card_audit_desc: "Independent statutory audits and IFRS compliance ensuring absolute integrity in your financial statements. Click to explore.",
    card_tax_title: "Tax Advisory",
    card_tax_desc: "Strategic tax planning, VAT compliance, and defense against regulatory audits. Click to explore.",
    card_acc_title: "Accounting",
    card_acc_desc: "Comprehensive bookkeeping, payroll processing, and multi-currency ledger reconciliation. Click to explore.",
    card_cons_title: "Consulting",
    card_cons_desc: "Rigorous M&A due diligence, enterprise valuations, and operational restructuring. Click to explore.",
    audit_breadcrumb: "Audit & Assurance",
    audit_page_title: "Audit & Assurance",
    back_to_services: "← Back to Services",
    audit_unwavering: "Unwavering Integrity and Trust",
    audit_intro: "In today's complex financial landscape, stakeholders demand transparency and absolute accuracy. ESO's Audit and Assurance practice is built on a foundation of uncompromising independence and deep technical rigor. Our methodology aligns with international Big 4 standards, providing you with financial statements that inspire total confidence.",
    audit_core_services: "Core Audit Services",
    audit_li1_strong: "Statutory & Independent Audits:",
    audit_li1_desc: "Comprehensive audits of financial statements in accordance with International Standards on Auditing (ISA).",
    audit_li2_strong: "IFRS Compliance & Transition:",
    audit_li2_desc: "Expert guidance on adopting and transitioning to complex International Financial Reporting Standards, including the new IFRS 18 requirements.",
    audit_li3_strong: "Internal Control Reviews:",
    audit_li3_desc: "Systematic evaluation of your company's internal controls, identifying weaknesses and mitigating risks of fraud and operational inefficiency.",
    audit_li4_strong: "Agreed-Upon Procedures:",
    audit_li4_desc: "Targeted investigations into specific financial data or operational components to satisfy regulatory or investor requirements.",
    audit_conclusion: "We do not view an audit merely as a compliance exercise. Our experienced partners utilize the audit process to uncover hidden operational inefficiencies and deliver actionable insights that drive enterprise value.",
    ready_elevate: "Ready to elevate your enterprise?",
    contact_advisory: "Contact our advisory team to discuss how we can assist with your specific requirements.",
    get_in_touch: "Get in Touch",
    tax_breadcrumb: "Tax Advisory",
    tax_page_title: "Tax Advisory",
    tax_optimizing: "Optimizing Liabilities. Ensuring Compliance.",
    tax_intro: "Navigating the rapidly shifting tax landscape requires a proactive, highly specialized approach. ESO's Tax Advisory team combines deep knowledge of the Lebanese Ministry of Finance regulations with a sophisticated understanding of international tax frameworks. We help businesses optimize their tax position while eliminating exposure to compliance risks and penalties.",
    tax_comprehensive: "Comprehensive Tax Strategies",
    tax_li1_strong: "Corporate Tax Planning:",
    tax_li1_desc: "Strategic modeling to optimize your effective tax rate while remaining strictly within the bounds of domestic and international tax laws.",
    tax_li2_strong: "VAT Compliance & Restructuring:",
    tax_li2_desc: "Accurate calculation, timely filing, and strategic restructuring of Value Added Tax to prevent cash flow bottlenecks.",
    tax_li3_strong: "Ministry of Finance Decree Consulting:",
    tax_li3_desc: "Real-time guidance on implementing the latest tax decrees, ensuring your accounting systems remain compliant amidst changing national budgets.",
    tax_li4_strong: "Tax Audit Defense:",
    tax_li4_desc: "Robust representation and defense during official tax authority inspections and inquiries.",
    tax_conclusion: "Whether you are a local SME navigating multi-tiered exchange rates or a multinational structuring cross-border transactions, our tax experts provide the clarity and strategic foresight necessary to protect your bottom line.",
    acc_breadcrumb: "Accounting",
    acc_page_title: "Accounting Services",
    acc_precision: "Precision in Every Ledger",
    acc_intro: "Flawless accounting is the lifeblood of any successful enterprise. ESO provides comprehensive, outsourced accounting solutions designed to give business owners real-time visibility into their financial health. By offloading your accounting functions to our dedicated team, you can focus on core operations with the assurance that your books are impeccably maintained.",
    acc_capabilities: "Our Accounting Capabilities",
    acc_li1_strong: "Comprehensive Bookkeeping:",
    acc_li1_desc: "Accurate, day-to-day recording of all financial transactions utilizing advanced, cloud-based accounting software.",
    acc_li2_strong: "Payroll & NSSF Management:",
    acc_li2_desc: "Confidential and compliant payroll processing, including all mandatory National Social Security Fund (NSSF) declarations and tax withholdings.",
    acc_li3_strong: "Multi-Currency Reconciliation:",
    acc_li3_desc: "Expert management and reconciliation of accounts operating across multiple, highly volatile currency exchange rates.",
    acc_li4_strong: "Management Reporting:",
    acc_li4_desc: "Customized monthly and quarterly financial dashboards that provide leadership with clear, actionable insights into cash flow and profitability.",
    acc_conclusion: "We do not just maintain your books; we modernize your entire finance function, implementing the digital tools and rigorous processes required for scalable growth.",
    cons_breadcrumb: "Consulting",
    cons_page_title: "Corporate Consulting",
    cons_architecting: "Architecting Strategic Growth",
    cons_intro: "When enterprises face critical inflection points, whether a major acquisition, a cash flow crisis, or a need for deep structural reorganization, ESO's Corporate Consulting team provides the specialized expertise required to navigate forward. We partner with leadership to translate complex financial data into decisive corporate strategy.",
    cons_solutions: "Strategic Advisory Solutions",
    cons_li1_strong: "M&A Due Diligence:",
    cons_li1_desc: "Rigorous financial and tax due diligence for buy-side and sell-side transactions, identifying hidden liabilities before the deal closes.",
    cons_li2_strong: "Enterprise Valuation:",
    cons_li2_desc: "Objective, highly technical business valuations using advanced DCF modeling adjusted for hyper-inflationary and regional risk premiums.",
    cons_li3_strong: "Outsourced CFO Services:",
    cons_li3_desc: "High-level financial leadership on a fractional basis, guiding your executive team through capital raising, budgeting, and strategic planning.",
    cons_li4_strong: "Operational Restructuring:",
    cons_li4_desc: "Assessing and redesigning internal workflows and financial structures to maximize efficiency and restore profitability in distressed assets.",
    cons_conclusion: "Our consultants don't just advise; they execute. We stand beside our partners through the most complex corporate transitions, bridging the gap between what is and what can be.",
    guide_page_title: "Doing Business in Lebanon",
    guide_subtitle: "A practical guide to structuring, taxing and running a business in Lebanon, to global standards.",
    guide_areas_title: "Key Areas for Operating in Lebanon",
    guide_t1_h: "Choosing a Business Structure",
    guide_t1_p: "Lebanon offers several vehicles, from the SAL joint-stock company and the SARL limited-liability company to holding and offshore structures. The right choice depends on where your income arises, who your partners are, and where you bank.",
    guide_t2_h: "Corporate Tax and the Annual Budget",
    guide_t2_p: "Corporate income tax, its brackets and its filing calendar are set by the Ministry of Finance and revised through the annual budget and its decrees. Because rates and deadlines change, plan against the current rules and file within the windows, which tend to tighten.",
    guide_t3_h: "VAT and the Shift to E-Invoicing",
    guide_t3_p: "Value Added Tax applies to most goods and services, with specific rules on registration, filing and recovery. The region is also moving toward mandatory electronic invoicing, which is a data and systems project as much as a tax one.",
    guide_t4_h: "Payroll and Social Security (NSSF)",
    guide_t4_p: "Employers must register staff with the National Social Security Fund and declare contributions against ceilings the authorities adjust over time. Getting the base and timing right, especially when salaries are partly in foreign currency, is where most payroll risk sits.",
    guide_t5_h: "Real Estate and Property",
    guide_t5_p: "Property remains a preferred store of value, but registration fees, built-property tax and the treatment of gains reward planning at acquisition rather than at sale, and contracts that state currency and payment method clearly.",
    guide_t6_h: "Financial Reporting and Audit (IFRS)",
    guide_t6_p: "Lebanese companies report under IFRS, and the framework is evolving: IFRS 18 reshapes how the income statement is presented, while IFRS 19 eases disclosure for eligible subsidiaries. Statutory audit requirements apply to many entities.",
    guide_t7_h: "Banking and Trapped Deposits",
    guide_t7_p: "The banking sector's constraints affect how companies hold cash, value legacy deposits and move money across borders. Trapped deposits in particular need a defensible accounting treatment under IFRS 9 rather than being carried at their old value.",
    guide_t8_h: "Staying Current with MoF Decrees",
    guide_t8_p: "Much of Lebanon's tax and compliance detail arrives through Ministry of Finance decrees, the kararat, issued through the year. We maintain a curated, viewable archive of the official decrees that matter to businesses.",
    guide_browse_decrees: "Browse the laws and decrees archive",
    guide_faq_q1: "Can a foreign investor own a business in Lebanon?",
    guide_faq_a1: "Lebanon generally allows foreign ownership across most sectors, with some activities subject to specific conditions or local-participation rules. The practical questions are usually which structure to use and how banking and residency requirements apply, not whether foreign ownership is permitted.",
    guide_faq_q2: "What business structures are available in Lebanon?",
    guide_faq_a2: "The most common are the SAL, a joint-stock company, the SARL, a limited-liability company, and holding or offshore companies for specific purposes. They differ in capital requirements, liability, governance and tax treatment, so the choice should follow your ownership, financing and market plans.",
    guide_faq_q3: "What taxes does a company operating in Lebanon pay?",
    guide_faq_a3: "The main ones are corporate income tax, Value Added Tax, payroll contributions to the National Social Security Fund, and various registration and stamp duties. The specific rates, brackets and thresholds are set by law and revised periodically, so confirm the current figures for your situation before planning around them.",
    guide_faq_q4: "Does a company in Lebanon need an external auditor?",
    guide_faq_a4: "Many Lebanese companies are required to appoint an independent auditor and report under IFRS, and lenders, investors and donors frequently require audited statements even where the law does not. In practice, credible audited accounts are what open financing and partnership doors.",
    guide_faq_q5: "How does the banking situation affect doing business in Lebanon?",
    guide_faq_a5: "The sector's constraints affect cash management, the value of legacy deposits and cross-border transfers, and they make banking access a real factor when choosing a corporate structure. Legacy trapped deposits also need a defensible accounting treatment rather than being carried at their original value.",
    guide_market_intel: "Market Intelligence",
    guide_seamlessly: "Seamlessly operate within local jurisdictions.",
    guide_p1: "Expanding or operating in Lebanon brings unique regulatory, tax, and financial nuances. Our advisory team leverages deep local roots combined with international IFRS expertise to help your enterprise succeed.",
    guide_p2: "Whether you require guidance on Ministry of Finance decrees, NSSF compliance, or cross-border structuring within the MENA region, ESO provides actionable intelligence to minimize liabilities and maximize operational efficiency.",
    guide_consult: "Consult an Expert",
    mof_page_title: "Laws and Decrees",
    mof_subtitle: "Official regulatory documents, instantly viewable.",
    mof_official_decrees: "Official Laws and Decrees",
    mof_vat_ext: "- VAT Deadline Extension",
    published_label: "Published:",
    mof_open_decree: "Open Decree",
    mof_corp_tax: "- Corporate Tax Bracket Updates",
    mof_nssf_caps: "- NSSF Contribution Caps",
    mof_built_prop: "- Built Property Tax Valuation",
    news_page_title: "Market Insights",
    news_subtitle: "The latest financial perspectives and regulatory studies from our team.",
    news_market_tech: "Market Insights & Technical Studies",
    news_indepth_reports: "In-depth reports and briefs on compliance, tax strategy, and audit standards.",
    read_full_study: "Read Full Study →",
    back_to_news: "← Back to News",
    exec_summary: "Executive Summary",
    key_adjustments: "Key Adjustments & Impact",
    eso_recs: "ESO Recommendations",
    source_ref: "Source & Reference:",
    study_19_bottom: "A mid-year review is cheaper than a year-end surprise. Running a documented H1 health check now, reconciling VAT positions, NSSF declarations and income tax instalments while there is still time to correct them, turns compliance from a December scramble into a routine. The firms that check at mid-year rarely restate at year-end.",
    study_19_fq1: "Why do a compliance review at mid-year rather than at year-end?",
    study_19_fa1: "Because at mid-year you can still fix what you find. A gap in VAT reconciliation or an NSSF declaration caught in July can be corrected over the remaining months; the same gap discovered in December becomes a rushed adjustment or a restatement. A mid-year checkpoint spreads the work and removes the year-end cliff.",
    study_19_fq2: "What should a half-year health check cover?",
    study_19_fa2: "At minimum, reconcile VAT input and output for the periods filed so far, confirm NSSF declarations match payroll, and check that income tax instalments are on track against expected results. The goal is to catch misalignments, unreconciled positions and missed filings while the remaining half-year still gives room to correct them.",
    study_20_bottom: "IFRS 19 is a chance to cut disclosure work without leaving the IFRS framework. Eligible subsidiaries, those without public accountability whose parent reports under IFRS, can apply reduced disclosures while keeping full IFRS recognition and measurement. Groups that map eligibility now can lighten every qualifying subsidiary's reporting at the next year-end.",
    study_20_fq1: "Which subsidiaries can use IFRS 19?",
    study_20_fa1: "A subsidiary is eligible if it has no public accountability, broadly, it is not listed and does not hold assets in a fiduciary capacity for outsiders as its main business, and its ultimate or intermediate parent produces consolidated IFRS financial statements available for public use. If both tests are met, the subsidiary can elect the reduced disclosures.",
    study_20_fq2: "Does IFRS 19 change how we measure our numbers?",
    study_20_fa2: "No. IFRS 19 reduces disclosure requirements only; recognition and measurement still follow the other IFRS standards in full. A qualifying subsidiary reports the same figures but with a slimmer set of notes, which cuts preparation effort without stepping outside IFRS.",
    study_21_bottom: "Trapped deposits sit awkwardly on a balance sheet: still recorded at their old value, but worth a fraction in practice. Under IFRS 9 the honest answer is a documented impairment, an expected-credit-loss view tied to whatever recovery framework is actually enacted, and clear disclosure of the assumptions. A defensible model beats both denial and guesswork.",
    study_21_fq1: "How should we account for deposits trapped in the banking sector?",
    study_21_fa1: "Under IFRS 9 these deposits are financial assets subject to expected credit loss assessment. In practice that means recognising an impairment that reflects the realistic recoverable amount, rather than carrying the deposit at its original balance, and disclosing the basis for your estimate. The exact figure depends on the recovery framework in force, so the model has to be revisited as that framework evolves.",
    study_21_fq2: "What should we document to support the impairment?",
    study_21_fa2: "The assumptions behind your estimate: the recovery framework or guidance you relied on, the scenarios and probabilities you weighed, the timing of expected recovery, and the discount applied. A defensible impairment is one an auditor can follow and challenge on its assumptions, not a single number with no workings behind it.",
    study_22_bottom: "E-invoicing is a data project wearing an invoice's clothes. The mandate is not about a new PDF; it is about structured, machine-readable invoices and clean master data that your systems can generate and report on demand. Businesses that clean their customer and tax data and test their ERP now will comply quietly; those that wait will scramble against a fixed deadline.",
    study_22_fq1: "What actually changes when e-invoicing becomes mandatory?",
    study_22_fa1: "The invoice becomes structured data, not just a document. Instead of a PDF or paper copy, you issue and store invoices in a defined machine-readable format that can be validated and reported, often to or through a tax platform. That changes your systems and processes far more than it changes what an invoice looks like to the customer.",
    study_22_fq2: "How should we prepare for it?",
    study_22_fa2: "Start with your data and systems. Audit whether your ERP or invoicing software can produce the required structured format, then clean your master data, customer tax identifiers, product codes and tax treatments, because e-invoicing validation exposes every inconsistency. Testing early, against your real data, is what separates a smooth transition from a deadline scramble.",
    study_13_bottom: "An audit opinion is only as reliable as the systems that produced the numbers. Firms that enforce role-based access, segregate duties in their accounting software, and keep tamper-evident logs give their auditor something to rely on; firms that let one person both post and approve entries are one incident away from unreliable financial statements.",
    study_13_fq1: "Why does an auditor care about our IT security?",
    study_13_fa1: "Because the financial statements are generated by IT systems, and under ISA 315 the auditor has to understand and assess the controls around them. If the systems that produce your ledgers can be altered without a trace, the numbers they output cannot be fully trusted, and the audit has to work harder or qualify what it can conclude.",
    study_13_fq2: "What is the single most important control to implement?",
    study_13_fa2: "Role-based access with proper segregation of duties. The person who can post a journal entry should not also be the person who approves it, and access should match each person's actual role. That one control blocks a large share of both fraud and accidental error, and it is the first thing a reviewer looks for.",
    study_14_bottom: "The Lebanon-versus-Cyprus decision is not settled by tax rate alone; it is settled by where your clients and banking are. Cyprus buys you EU access and treaty coverage at a higher running cost; a Lebanese offshore company is cheaper to run and simpler to form. Pick the structure your target market and your bank will actually accept.",
    study_14_fq1: "Should we incorporate offshore in Lebanon or Cyprus?",
    study_14_fa1: "It depends on your market. A Lebanese offshore company is straightforward to form and inexpensive to maintain, which suits regionally-focused service providers. Cyprus offers EU residency for the company and access to a wide treaty network, valuable if your clients or banking sit in Europe, but at higher setup and running costs. Match the jurisdiction to where your revenue and banking actually are.",
    study_14_fq2: "Does the cheapest jurisdiction usually win?",
    study_14_fa2: "Rarely, once banking is considered. The lowest nominal cost is often offset by harder banking access or weaker treaty coverage, which can cost far more in friction and withholding taxes than the incorporation saved. The right measure is total cost and acceptance in your target market, not the registration fee.",
    study_15_bottom: "For audit purposes, crypto is not cash; under current IFRS it is usually an intangible asset, and that classification drives how you measure it, when you recognise impairment, and what you must disclose. Treasuries that keep meticulous wallet and transaction records make the audit possible; those that cannot evidence ownership and history make it very hard to give an opinion.",
    study_15_fq1: "How are cryptocurrency holdings treated under IFRS?",
    study_15_fa1: "Cryptocurrencies are generally not cash or cash equivalents under IFRS. In most cases they are accounted for as intangible assets under IAS 38, following the IFRS Interpretations Committee's analysis, which affects measurement and impairment. If you hold crypto for trading as a broker-trader, different guidance can apply, so the specific facts matter.",
    study_15_fq2: "What records does an auditor need to verify crypto holdings?",
    study_15_fa2: "Evidence of ownership and a complete transaction history. That means maintained logs of wallet addresses, transaction hashes and reconciliations to your accounting records, plus a clear account of custody. Without a verifiable link between the blockchain and your books, an auditor cannot confirm that the assets exist and belong to you.",
    study_16_bottom: "Working capital is cash you already own but have tied up. A rolling short-term forecast, tighter inventory, and disciplined receivables management free that cash without new financing, but only if you avoid squeezing suppliers so hard that the supply chain breaks. The goal is liquidity, not a scorched-earth balance sheet.",
    study_16_fq1: "What is the fastest way to free up cash without borrowing?",
    study_16_fa1: "Attack the cash conversion cycle. Collect receivables faster, hold less idle inventory, and manage payables deliberately. Excess just-in-case stock and slow collections are usually where the most cash is trapped, and releasing it is cheaper and faster than arranging new financing.",
    study_16_fq2: "How do we manage payables without damaging supplier relationships?",
    study_16_fa2: "Extend terms by agreement, not by silence. Negotiate longer payment terms openly, pay reliably within the terms you agree, and prioritise the suppliers who are critical to your operations. Stretching payments unilaterally saves cash for a quarter and costs you the supply chain in the next one; a 13-week cash forecast lets you plan the trade-offs deliberately.",
    study_17_bottom: "The gap a growing SME feels is not more bookkeeping; it is the absence of someone translating the numbers into decisions. An outsourced CFO gives a mid-sized business forward-looking financial leadership, banking relationships, cash strategy and board-grade reporting, without the cost of a full-time hire. It is a bridge for the stage between a head accountant and a permanent CFO.",
    study_17_fq1: "What is the difference between an accountant and a CFO?",
    study_17_fa1: "An accountant looks backward to record and report what happened; a CFO looks forward to shape what happens next, cash strategy, financing, pricing, investment and risk. Both are essential, but as a business scales the absence of the forward-looking role is what starts to constrain it, and that is the gap an outsourced CFO fills.",
    study_17_fq2: "When should an SME consider a fractional or outsourced CFO?",
    study_17_fa2: "When decisions start outrunning the finance function, typically around succession planning, a fundraising round, bank negotiations, or rapid growth. At that point you need CFO-level judgement but rarely a full-time salary, so a fractional CFO gives you the strategic capability at a cost that matches the stage.",
    study_18_bottom: "For an NGO, governance is not bureaucracy; it is the price of the next grant. Donors release funds against evidence of independent oversight and clean, fund-specific accounting. NGOs that stand up an independent audit committee and enforce fund accounting early keep their funding pipeline open; those that treat it as an afterthought discover the requirement at the worst time, mid-application.",
    study_18_fq1: "What do international donors require before releasing funds?",
    study_18_fa1: "Evidence of transparency and control. Major development and government donors typically require audited financial statements, fund-specific accounting that shows their money was spent on the agreed purpose, and independent oversight of the organisation. The stronger your governance and reporting, the lower the perceived risk and the smoother the funding.",
    study_18_fq2: "What is fund accounting and why do donors insist on it?",
    study_18_fa2: "Fund accounting tracks each donor's contribution separately, so you can demonstrate that a specific grant was spent on its intended programme rather than pooled and used elsewhere. Donors insist on it because it is the mechanism that proves restricted funds were used as restricted, which is the core of grant compliance.",
    study_7_bottom: "A balance sheet cleanup only works if the numbers behind it hold up. The manufacturers that emerge from restructuring in good standing are those that valued the assets independently, documented the accounting for every swap, and modelled the tax consequences before signing, not after. Rushed restructurings tend to trade one problem for a bigger one.",
    study_7_fq1: "How is a debt-to-equity swap accounted for?",
    study_7_fa1: "The creditor exchanges debt for shares, so the liability is derecognised and equity is issued in its place. Under IFRS 9 the difference between the carrying amount of the debt extinguished and the fair value of the equity issued goes through profit or loss, which means the fair value of what you issue has to be defensible. Getting that valuation wrong distorts the whole restructuring.",
    study_7_fq2: "What should we do before negotiating with creditors?",
    study_7_fa2: "Commission an independent valuation of the assets and the business first. Entering negotiations without a defensible view of what you are worth cedes the initiative to creditors and invites terms you cannot support. A third-party valuation also gives the eventual accounting and any auditor a credible anchor.",
    study_8_bottom: "Recovering VAT on a bad debt is a documentation exercise as much as a tax one. The claims that succeed are backed by a clear paper trail: the original invoice, the VAT remitted, the collection attempts, and the evidence the debt is genuinely irrecoverable. Build that file as the debt ages, not once you decide to write it off.",
    study_8_fq1: "Can we reclaim VAT we already paid on an invoice the customer never settled?",
    study_8_fa1: "In principle Lebanese VAT rules allow recovery of VAT remitted on a debt that has become bad, but the evidentiary burden is high. You generally need to show the debt is genuinely irrecoverable and that you pursued collection, and satisfy the conditions and procedure the VAT authority sets. Because those conditions can change, confirm the current requirements before filing a claim.",
    study_8_fq2: "What is the best way to protect our right to recover?",
    study_8_fa2: "Run a disciplined delinquency process. Track ageing, document every collection attempt, and keep the original tax invoices and correspondence together, so that when a debt crosses the point of no return the evidence a claim requires already exists rather than having to be reconstructed.",
    study_9_bottom: "AI is moving auditing from sampling toward full-population testing, but it does not lower the bar for evidence, it raises it. The clients who benefit most are those whose systems are already digitised and API-ready, because the technology can only test data it can reach. Clean, structured data is now an audit asset in its own right.",
    study_9_fq1: "Does AI mean auditors no longer sample transactions?",
    study_9_fa1: "Increasingly, yes. Where auditors once tested a random sample of transactions, AI tools can now analyse the entire population and flag anomalies for a human to investigate. The auditor's judgement still decides what the anomalies mean, but the starting point shifts from a slice of the data to all of it.",
    study_9_fq2: "What do we need in place for an AI-assisted audit to work?",
    study_9_fa2: "Digitised, well-structured records and systems that can export or connect via API. AI cannot test data it cannot read, so the practical prerequisite is an ERP or accounting environment that holds clean, complete transaction data. Fragmented spreadsheets and manual adjustments are where the value of the technology stalls.",
    study_10_bottom: "There is no universally best holding jurisdiction; there is only the one that fits your portfolio and where your income actually arises. A UAE freezone can be efficient for qualifying regional income but demands real economic substance; a Lebanese SAL Holding can be the rational choice for a locally-anchored portfolio. Model both against your real facts before you incorporate.",
    study_10_fq1: "Is a UAE freezone always more tax-efficient than a Lebanese holding company?",
    study_10_fa1: "Not automatically. Freezones can offer favourable treatment on qualifying income, but the benefit depends on meeting economic substance requirements, actual operations, staff and premises, not just a registration. If your assets and income are anchored in Lebanon, a local SAL Holding may be simpler and more defensible. The right answer follows the facts, not the headline rate.",
    study_10_fq2: "What is economic substance and why does it matter?",
    study_10_fa2: "Economic substance means a company must have real activity, decision-making, people and premises, in the jurisdiction where it claims tax residence. Authorities and banks increasingly test for it, and a structure that exists only on paper risks losing its treatment and its banking access. Substance is now a design requirement, not an afterthought.",
    study_11_bottom: "Real estate stays a preferred store of value, but the tax treatment around it has become the part most likely to surprise a developer. The projects that stay out of trouble are those whose sale contracts state the payment method and currency unambiguously, and whose tax position is modelled at acquisition rather than discovered at registration.",
    study_11_fq1: "Why does the currency and payment method in a sale contract matter so much?",
    study_11_fa1: "Because it determines how the transaction is valued and taxed. When a contract is vague about the form of the funds and the currency of payment, it lets the value assessed for tax diverge from what the parties intended. A contract that states these terms clearly removes that ambiguity and the dispute that follows it.",
    study_11_fq2: "When should a developer bring in tax advice on a project?",
    study_11_fa2: "At acquisition, not at sale. Registration fees, built-property tax and the treatment of gains are far easier to plan for at the start of a project than to unwind at the end. Early modelling also lets you structure contracts and timing in a way the tax authority will accept rather than challenge.",
    study_12_bottom: "Most deals that collapse late do so over things that were knowable early: undocumented liabilities, related-party arrangements, and revenue that does not survive scrutiny. A startup that runs vendor due diligence on itself before going to market controls the narrative and closes faster. Surprises found by the buyer are far more expensive than the ones you find yourself.",
    study_12_fq1: "What most often derails a cross-border acquisition in the final stages?",
    study_12_fa1: "Undocumented, off-balance-sheet liabilities. Verbal agreements, unrecorded obligations, related-party terms and contingent liabilities that surface during diligence erode trust at exactly the wrong moment. The issue is rarely that the liability exists; it is that it was not disclosed, which makes a buyer wonder what else is hidden.",
    study_12_fq2: "What is vendor due diligence and why do it on ourselves?",
    study_12_fa2: "Vendor due diligence is an independent review a seller commissions on its own business before a sale. Done roughly a year ahead of an exit, it surfaces the issues a buyer would find, gives you time to fix or explain them, and lets you enter negotiations with credible, pre-vetted numbers rather than reacting to the buyer's findings.",
    study_bottom_label: "The Bottom Line",
    study_faq_label: "Frequently Asked Questions",
    study_1_bottom: "The practical takeaway is timing. Whatever the final brackets and VAT figures for 2026, the enterprises that fare best model their position early, document their assumptions, and file within the tighter windows rather than reacting at year-end.",
    study_1_fq1: "When do the 2026 corporate tax changes take effect?",
    study_1_fa1: "They apply to the fiscal year defined in the Ministry of Finance decrees that enact the budget. Because effective dates and transitional rules are set by those decrees and can differ by tax type, confirm the date that applies to your fiscal year with your advisor rather than assuming it matches the calendar year.",
    study_1_fq2: "How should we prepare for the revised VAT compliance timelines?",
    study_1_fa2: "Shorten your internal close. If filing windows tighten, the bottleneck is usually reconciliation, so move VAT input and output reconciliation to a monthly rhythm and keep supporting documentation ready. A mid-year dry run of the full filing process surfaces gaps while there is still time to fix them.",
    study_2_bottom: "IFRS 18 does not change the numbers in your accounts; it changes how they are presented and what you must defend. Groups that map their new operating, investing and financing split now, and formalise the governance around any management performance measures, will transition without a scramble.",
    study_2_fq1: "When is IFRS 18 effective?",
    study_2_fa1: "IFRS 18 applies to annual reporting periods beginning on or after 1 January 2027, with earlier application permitted. The comparative period in your first IFRS 18 statements must also be restated, so the real preparation window is earlier than the effective date suggests.",
    study_2_fq2: "Do we have to disclose our alternative performance measures now?",
    study_2_fa2: "If you use management performance measures, public subtotals not defined by IFRS that you use to communicate performance, IFRS 18 requires you to disclose them in a single note, reconcile them to the nearest IFRS subtotal, and explain them. In practice they become auditable, so the calculation and governance behind them must be robust.",
    study_3_bottom: "Valuation in a multi-rate environment is less about one correct number than a transparent, consistent method. Buyers and lenders accept a range when the assumptions behind it, which rate, which basis, which adjustments, are documented and applied consistently. Ambiguity, not the rate itself, kills deals.",
    study_3_fq1: "Which exchange rate should we use to value assets and liabilities?",
    study_3_fa1: "There is no single rate that fits every account; the defensible approach is to select a basis appropriate to each item, disclose it, and apply it consistently. What matters to an auditor or acquirer is that the choice is transparent and reproducible, not that it flatters the balance sheet.",
    study_3_fq2: "How far ahead of a sale or capital raise should we start valuation work?",
    study_3_fa2: "Ideally several months. A credible valuation depends on clean, reconciled records and a documented methodology, and assembling those under deal pressure is where mistakes happen. Starting early also lets you fix weaknesses a buyer's due diligence would otherwise find.",
    study_4_bottom: "The recurring NSSF risk is not the rate; it is the lag between when ceilings change and when payroll catches up. Clients who automate the update of contribution parameters and reconcile declarations monthly avoid the penalties and back-payments that catch out those still running last year's figures.",
    study_4_fq1: "How often do NSSF contribution ceilings change?",
    study_4_fa1: "They are adjusted by the authorities in response to economic conditions, and in a volatile environment those adjustments can be frequent and off any fixed schedule. Because the figures and effective dates are set by decree, verify payroll parameters against the current official values rather than assuming they are stable.",
    study_4_fq2: "What is the most common NSSF calculation error you see?",
    study_4_fa2: "Misapplying the ceiling when part of the salary is paid in foreign currency or in kind. The declaration must reflect the correct base at the correct rate, and manual handling of that split is where underdeclarations creep in. Integrated payroll software that locks in current parameters removes most of the risk.",
    study_5_bottom: "ESG reporting is shifting from a reputational nicety to a financing prerequisite. Firms that treat it as a data and governance exercise now, rather than a marketing one later, will meet lender and partner requirements without disruption and will have credible numbers when assurance over ESG data becomes routine.",
    study_5_fq1: "Is ESG reporting mandatory for Lebanese companies?",
    study_5_fa1: "There is no single blanket local mandate, but the requirement increasingly arrives through the market rather than the statute book: international lenders, development finance institutions and multinational partners now condition funding and contracts on ESG disclosure. For any company that touches that capital, it is effectively mandatory.",
    study_5_fq2: "What is the first practical step?",
    study_5_fa2: "Establish an internal ESG committee and baseline what you already measure. Most organisations hold more relevant data, on energy, workforce and governance, than they realise; the initial work is organising and validating it, not collecting everything from scratch.",
    study_6_bottom: "Transfer pricing enforcement rewards preparation and punishes improvisation. Groups with contemporaneous documentation and a defensible functional analysis handle a review as a formality; those that reconstruct their rationale after an assessment lands face adjustments and penalties. Build the file before the authority asks for it.",
    study_6_fq1: "What is the arm's length principle?",
    study_6_fa1: "It requires that transactions between related companies be priced as if they were between independent parties on market terms. If an intercompany price differs from what unrelated parties would agree, tax authorities can adjust it and tax the difference, which is why pricing needs an economic justification, not just an internal policy.",
    study_6_fq2: "What documentation defends our intercompany pricing?",
    study_6_fa2: "At a minimum, a functional and risk analysis showing which entity does what and bears which risks, a benchmarking rationale for the prices charged, and consistent intercompany agreements. The OECD guidelines frame the expectation; the practical goal is a file that lets a reviewer follow your logic without having to take it on trust.",
    study_1_cat: "Tax Advisory",
    study_1_by: "By the ESO Tax Advisory Practice",
    study_2_cat: "Audit & Assurance",
    study_2_by: "By the ESO Audit & Assurance Practice",
    study_3_cat: "Corporate Consulting",
    study_3_by: "By the ESO Corporate Consulting Practice",
    study_4_cat: "Accounting & Payroll",
    study_4_by: "By the ESO Accounting Practice",
    study_5_cat: "Audit & Assurance",
    study_5_by: "By the ESO Audit & Assurance Practice",
    study_6_cat: "Tax Advisory",
    study_6_by: "By the ESO Tax Advisory Practice",
    study_7_cat: "Corporate Consulting",
    study_7_by: "By the ESO Corporate Consulting Practice",
    study_8_cat: "Tax Advisory",
    study_8_by: "By the ESO Tax Advisory Practice",
    study_9_cat: "Audit & Assurance",
    study_9_by: "By the ESO Audit & Assurance Practice",
    study_10_cat: "Tax Advisory",
    study_10_by: "By the ESO Tax Advisory Practice",
    study_11_cat: "Tax Advisory",
    study_11_by: "By the ESO Tax Advisory Practice",
    study_12_cat: "Corporate Consulting",
    study_12_by: "By the ESO Corporate Consulting Practice",
    study_13_cat: "Audit & Assurance",
    study_13_by: "By the ESO Audit & Assurance Practice",
    study_14_cat: "Tax Advisory",
    study_14_by: "By the ESO Tax Advisory Practice",
    study_15_cat: "Audit & Assurance",
    study_15_by: "By the ESO Audit & Assurance Practice",
    study_16_cat: "Corporate Consulting",
    study_16_by: "By the ESO Corporate Consulting Practice",
    study_17_cat: "Corporate Consulting",
    study_17_by: "By the ESO Corporate Consulting Practice",
    study_18_cat: "Audit & Assurance",
    study_18_by: "By the ESO Audit & Assurance Practice",
    study_19_cat: "Tax Advisory",
    study_19_by: "By the ESO Tax Advisory Practice",
    study_20_cat: "Audit & Assurance",
    study_20_by: "By the ESO Audit & Assurance Practice",
    study_21_cat: "Audit & Assurance",
    study_21_by: "By the ESO Audit & Assurance Practice",
    study_22_cat: "Tax Advisory",
    study_22_by: "By the ESO Tax Advisory Practice",
    study_desc_budget: "A comprehensive study on the Ministry of Finance's latest fiscal decrees and strategic modeling for tax optimization.",
    study_title_budget_2026: "2026 Budget Analysis: Navigating New Corporate Tax Brackets",
    study_1_p1: "The 2026 fiscal budget introduced by the Ministry of Finance represents a significant shift in corporate taxation strategy for enterprises operating within the Lebanese jurisdiction. The primary objective of these amendments is to stabilize state revenue while attempting to adjust for the realities of multi-tiered currency valuations.",
    study_1_p2: "One of the most critical updates involves the recalibration of corporate income tax thresholds. The flat rate system has been heavily modified to account for \"fresh\" currency revenues versus local currency revenues. Enterprises that fail to properly segregate these revenue streams in their statutory accounting face substantial penalties under the new decree.",
    study_1_p3: "Furthermore, VAT implementation has seen stricter compliance timelines, reducing the grace period for quarterly filings. Companies must adopt highly agile financial software to ensure real-time ledger matching to avoid non-compliance fines.",
    study_1_p4: "We advise all our corporate partners to undergo an immediate mid-year tax health check. By proactively adjusting accounting methodologies now, firms can legally optimize their liabilities before the end-of-year audit crunch.",
    study_1_source: "Data and regulatory framework derived from the official decrees published by the Ministry of Finance (Lebanon), Official Gazette Publications (Q1 2026), and cross-referenced with the Deloitte Middle East Annual Tax Update (2026 Edition).",
    study_title_ifrs18: "The Transition to IFRS 18: What MENA Enterprises Need to Know",
    study_desc_ifrs: "An in-depth guide on presentation and disclosure changes required by IFRS 18, and how local auditors are adapting software.",
    study_2_h2_1: "The End of IAS 1",
    study_2_p1: "The International Accounting Standards Board (IASB) has officially rolled out IFRS 18, replacing the long-standing IAS 1 for Presentation and Disclosure in Financial Statements. For companies operating in the MENA region, this is not merely a formatting change; it is a fundamental shift in how financial performance is communicated to investors and stakeholders.",
    study_2_h2_2: "New P&L Categories",
    study_2_p2: "IFRS 18 mandates strict new categories in the statement of profit or loss: Operating, Investing, and Financing. The goal is to improve comparability across global markets. For Lebanese and regional enterprises, this means historical data must be re-categorized, which can severely impact previously reported operating margins.",
    study_2_h2_3: "Management Performance Measures (MPMs)",
    study_2_p3: "The most disruptive element of IFRS 18 is the requirement to officially disclose and audit Management Performance Measures (such as adjusted EBITDA) directly within the financial statements. Companies can no longer hide behind non-GAAP metrics without rigorous reconciliation.",
    study_2_source: "Framework analysis is directly based on the standards issued by the International Accounting Standards Board (IASB), specifically the IFRS 18 Implementation Guidelines, and insights drawn from the PwC Global IFRS Reporting Guide.",
    study_title_valuation: "Valuation Strategies Amidst Multi-Tiered Exchange Rates",
    study_desc_valuation: "Evaluating SME portfolios in Lebanon: How to properly bridge the gap between historical book value and hyper-inflationary realities.",
    study_3_h2_1: "The Valuation Crisis",
    study_3_p1: "Evaluating the true net worth and asset health of Small and Medium Enterprises (SMEs) in Lebanon remains one of the most complex auditing challenges in modern finance. The existence of official rates, BDL platform rates, and parallel market rates has rendered historical book value practically obsolete.",
    study_3_h2_2: "Bridging the Gap",
    study_3_p2: "Our study focuses on acceptable valuation methods under international auditing standards when operating in hyper-inflationary economies. Traditional DCF (Discounted Cash Flow) models must be heavily modified with hyper-inflation risk premiums, and tangible assets must undergo frequent, independent appraisals rather than relying on standard depreciation schedules.",
    study_3_h2_3: "Strategic Action",
    study_3_p3: "To attract foreign investment or prepare for M&A activity, local enterprises must maintain parallel ledgers. Demonstrating revenue and EBITDA solely in \"fresh\" USD equivalents, stripped of local currency distortion, is the only acceptable method for international due diligence.",
    study_3_source: "Economic context and valuation methodologies sourced from the World Bank Lebanon Economic Monitor (Fall/Winter updates) and cross-referenced with the Ernst & Young (EY) Global Guidelines on Financial Reporting in Hyperinflationary Economies (IAS 29 compliance).",
    study_title_nssf: "NSSF Compliance in a Hyper-Inflationary Economy",
    study_desc_nssf: "Strategies for managing payroll deductions and National Social Security Fund declarations amidst fluctuating official exchange rates.",
    study_4_p1: "As the National Social Security Fund (NSSF) in Lebanon adjusts contribution limits to reflect hyper-inflation, businesses are facing steep increases in payroll liabilities. This technical brief outlines the current compliance requirements for declaring salaries that span multiple currency exchange mechanisms.",
    study_4_p2: "The core challenge lies in calculating the NSSF thresholds when a portion of the employee's salary is paid in physical USD (\"fresh\") while another portion is paid via local bank transfers. The Ministry of Labor and the NSSF have issued conflicting guidelines over the past year, making payroll audits a high-risk area for SMEs.",
    study_4_p3: "We recommend all clients immediately adopt an integrated payroll software system that locks in the daily official exchange rate at the time of payroll processing, ensuring a clean audit trail for NSSF inspectors and preventing retrospective penalties.",
    study_4_source: "Adapted from decrees issued by the Lebanese Ministry of Labor and technical guidance provided by the Lebanese Association of Certified Public Accountants (LACPA).",
    study_title_esg: "ESG Reporting Frameworks for Lebanese Corporations",
    study_desc_esg: "Why Environmental, Social, and Governance (ESG) reporting is becoming mandatory for local firms seeking European capital.",
    study_5_p1: "Environmental, Social, and Governance (ESG) criteria are no longer optional for Lebanese enterprises looking to attract foreign direct investment, particularly from European capital markets. This study explores the immediate reporting frameworks local firms must adopt.",
    study_5_p2: "International lenders now require detailed carbon footprint analyses and labor equity disclosures before issuing lines of credit. For local manufacturers heavily reliant on private diesel generators due to the state electricity crisis, calculating the \"E\" in ESG has become an auditing hurdle requiring specialized metric conversions.",
    study_5_p3: "Enterprises should start by establishing an internal ESG committee to benchmark current operations against the Global Reporting Initiative (GRI) standards, ensuring they are prepared when international partners request ESG audits.",
    study_5_source: "Reporting guidelines from the Global Reporting Initiative (GRI) and insights from the International Finance Corporation (IFC) regional directives.",
    study_title_transfer: "Transfer Pricing Scrutiny in the MENA Region",
    study_desc_transfer: "An analysis of recent tax authority audits focusing on intercompany transactions between Lebanese parent companies and offshore subsidiaries.",
    study_6_p1: "Tax authorities across the MENA region are cracking down on profit shifting. This bulletin addresses how Lebanese parent companies interacting with UAE or Saudi offshore subsidiaries must handle intercompany transactions to pass strict transfer pricing audits.",
    study_6_p2: "The \"Arm's Length Principle\" is now being heavily enforced. Companies can no longer shift profits to lower-tax jurisdictions by inflating the cost of management fees or IP licensing between related entities. Tax authorities demand comprehensive master files and local files justifying every intercompany invoice.",
    study_6_p3: "Firms must urgently conduct a functional and risk analysis of their supply chains to ensure all intercompany pricing policies are documented and defended by robust, independent benchmarking studies.",
    study_6_source: "Framework derived from the OECD Transfer Pricing Guidelines for Multinational Enterprises and Tax Administrations.",
    study_title_distressed: "Restructuring Distressed Assets: A Legal and Financial Guide",
    study_desc_distressed: "Key accounting maneuvers and debt-to-equity swaps to rescue distressed manufacturing assets in the current economic climate.",
    study_7_p1: "In the wake of prolonged economic instability, many local manufacturing assets are heavily leveraged and distressed. This guide covers the accounting maneuvers required to successfully restructure corporate debt without triggering immediate bankruptcy.",
    study_7_p2: "Debt-to-equity swaps have emerged as a primary mechanism to clear balance sheets. However, under IFRS 9, derecognizing financial liabilities and recognizing new equity instruments requires complex fair value measurements that, if done incorrectly, can trigger massive taxable gains.",
    study_7_p3: "Before entering negotiations with creditors, management must engage a third-party valuation team to determine the exact impairment of tangible assets to structure the equity swap favorably.",
    study_7_source: "IFRS 9 (Financial Instruments) compliance guidelines and local Lebanese commercial law precedents regarding corporate insolvency.",
    study_title_vat_bad: "VAT Recovery on Bad Debts in Lebanon",
    study_desc_vat_bad: "A step-by-step technical bulletin on how to legally reclaim Value Added Tax remitted on invoices that were never collected.",
    study_8_p1: "As the liquidity crisis causes a spike in uncollected receivables, enterprises are paying Value Added Tax (VAT) on invoices they will never collect. This technical bulletin provides a roadmap to legally recover remitted VAT from the Ministry of Finance.",
    study_8_p2: "Lebanese tax law permits the recovery of VAT on bad debts, but the evidentiary burden is incredibly high. Companies must prove they have exhausted all legal avenues for collection, including documented court proceedings, before the tax authority will allow a deduction on future VAT filings.",
    study_8_p3: "We advise implementing a stringent 90-day delinquency protocol. Once an invoice crosses this threshold, legal notices should be automatically generated to begin building the paper trail required for a successful VAT recovery claim.",
    study_8_source: "Ministry of Finance (Lebanon) VAT Directorate guidelines and recent tribunal rulings on corporate bad debt recovery.",
    study_title_ai: "The Impact of AI on Automated Statutory Auditing",
    study_desc_ai: "How artificial intelligence is changing sample sizes, anomaly detection, and fraud prevention in modern assurance engagements.",
    study_9_p1: "Artificial Intelligence is rapidly transforming the assurance industry. This report examines how machine learning algorithms are moving the standard from sample-based auditing to full-population ledger testing.",
    study_9_p2: "Historically, auditors tested a randomized sample of invoices to identify fraud. Today, AI tools can ingest 100% of a company's financial transactions in minutes, instantly flagging anomalies based on vendor history, timestamp irregularities, and erratic pricing patterns. This greatly increases the detection of sophisticated corporate fraud.",
    study_9_p3: "Client finance departments must ensure their ERP systems are fully digitized and API-ready, as manual, paper-based ledgers severely hinder the deployment of modern, efficient AI audit tools and increase overall audit costs.",
    study_9_source: "Research compiled from the International Auditing and Assurance Standards Board (IAASB) Technology Working Group.",
    study_title_holding: "Holding Company Structures: Tax Optimization Strategies",
    study_desc_holding: "Evaluating the tax benefits of establishing an SAL Holding company in Lebanon versus a UAE Freezone entity.",
    study_10_p1: "For high-net-worth individuals and family offices in Lebanon, structuring investments through a holding company is vital. This analysis compares the tax benefits of a Lebanese SAL Holding versus a UAE Freezone entity.",
    study_10_p2: "While UAE Freezones offer 0% corporate tax on qualifying income, establishing economic substance requires significant capital. Conversely, a Lebanese SAL Holding enjoys specific exemptions from income tax on its capital gains and dividend distributions from subsidiaries, provided it strictly adheres to local object clauses.",
    study_10_p3: "If the primary portfolio consists of Lebanese real estate and local equities, an SAL Holding remains the most cost-effective vehicle. For international stock portfolios and MENA trading operations, a Dubai DIFC or ADGM structure should be modeled.",
    study_10_source: "Analysis based on the Lebanese Commercial Code (Decree Law No. 45) and UAE Corporate Tax Law (Federal Decree-Law No. 47).",
    study_title_real_estate: "Navigating the Real Estate Tax Landscape",
    study_desc_real_estate: "Essential tax planning for property developers dealing with built property tax, registration fees, and capital gains adjustments.",
    study_11_p1: "Real estate remains a primary store of value in Lebanon. This guide highlights the essential tax planning strategies for property developers dealing with fluctuating built property taxes and capital gains assessments.",
    study_11_p2: "Recent decrees have heavily modified how the Ministry of Finance assesses the value of property at the time of registration. Failing to declare the true \"fresh\" USD value of a transaction can lead to immediate tax evasion investigations and retroactive reassessments with heavy compounding fines.",
    study_11_p3: "Developers must ensure that all sales contracts clearly delineate the payment method and currency, and secure independent property appraisals at the exact time of transaction to defend against arbitrary state valuations.",
    study_11_source: "Official directives from the General Directorate of Land Registry and Cadastre (Lebanon).",
    study_title_dd: "Due Diligence Pitfalls in Cross-Border M&A",
    study_desc_dd: "Common financial blindspots discovered during the acquisition of local tech startups by international venture capital firms.",
    study_12_p1: "As international venture capital targets MENA tech startups, the financial due diligence process has revealed consistent operational blindspots. This study covers the most common deal-breakers encountered during M&A audits.",
    study_12_p2: "The primary reason acquisitions fall through in the final stages is undocumented off-balance-sheet liabilities, specifically, informal shareholder loans and unfiled NSSF declarations. International buyers require absolute certainty that they are not inheriting hidden regulatory fines.",
    study_12_p3: "Startups seeking exit opportunities should commission a \"Vendor Due Diligence\" audit 12 months prior to engaging buyers. This allows management to clean up ledgers and formalize all employment contracts before opening their data room.",
    study_12_source: "Data aggregated from ESO's Corporate Consulting M&A transactions and regional investment banking standards.",
    study_title_cyber: "Cybersecurity Risks in Financial Reporting",
    study_desc_cyber: "Auditing the IT environment: Why the integrity of financial statements relies heavily on testing a company's data security protocols.",
    study_13_p1: "An auditor's opinion is only as reliable as the IT systems generating the financial data. This brief outlines why assessing a company's cybersecurity protocol is now a mandatory phase of the statutory audit.",
    study_13_p2: "Ransomware attacks and unauthorized ledger modifications can destroy the integrity of financial statements. Under ISA 315, auditors must now deeply evaluate IT General Controls (ITGC). If an enterprise's server lacks basic access controls, the auditor cannot rely on the software's output, requiring massive increases in manual substantive testing.",
    study_13_p3: "Firms must implement strict role-based access in their accounting software, ensuring that the employee who creates a vendor cannot be the same employee who authorizes the payment (segregation of duties).",
    study_13_source: "Guidelines from the Information Systems Audit and Control Association (ISACA) and ISA 315 standards.",
    study_title_offshore: "Offshore Incorporation: Lebanon vs. Cyprus",
    study_desc_offshore: "A comparative study on corporate tax rates, maintenance costs, and banking compliance for offshore entities.",
    study_14_p1: "For service providers engaging with international clients, deciding where to incorporate is a critical strategic choice. We compare the corporate maintenance and banking compliance of a Lebanese Offshore entity versus a Cyprus Limited company.",
    study_14_p2: "While a Lebanese Offshore company benefits from a flat nominal tax rate and ease of formation, it suffers heavily from global banking de-risking, making it difficult to receive wire transfers from European clients. A Cyprus entity provides seamless access to EU banking, but comes with a 12.5% corporate tax rate and higher auditing costs.",
    study_14_p3: "The decision relies entirely on the client's target market. If revenues are generated in the GCC, a Lebanese Offshore may suffice. If the target market is the Eurozone, the banking access provided by Cyprus outweighs the tax burden.",
    study_14_source: "Cross-border taxation treaties and European Central Bank (ECB) anti-money laundering (AML) compliance directives.",
    study_title_crypto: "Cryptocurrency Asset Valuation for Statutory Audits",
    study_desc_crypto: "Determining fair value and recognizing impairment losses for corporate treasuries holding Bitcoin and stablecoins under IFRS.",
    study_15_p1: "With an increasing number of MENA enterprises holding stablecoins and Bitcoin on their balance sheets to hedge against local currency volatility, auditors are grappling with how to correctly value these digital assets under IFRS.",
    study_15_p2: "Currently, IFRS considers cryptocurrencies as \"intangible assets\" rather than cash equivalents. This means they must be measured at cost less impairment. If the value of Bitcoin drops below purchase price, the company must book an impairment loss on their P&L. If the value rises, the gain cannot be recognized until the asset is sold.",
    study_15_p3: "Corporate treasuries must maintain meticulous logs of cold wallet addresses and transaction hashes to satisfy auditor requirements regarding the \"existence\" and \"ownership\" of the digital assets.",
    study_15_source: "IFRIC Interpretation on Holdings of Cryptocurrencies and IAS 38 (Intangible Assets).",
    study_title_wc: "Optimizing Working Capital Amidst Supply Chain Shocks",
    study_desc_wc: "Cash flow modeling strategies to extend payables and accelerate receivables without damaging supplier relationships.",
    study_16_p1: "Global supply chain disruptions require robust cash flow modeling to ensure liquidity. This study explores techniques to stretch payables and accelerate receivables without fracturing critical supplier relationships.",
    study_16_p2: "Firms that hold excess \"just-in-case\" inventory are tying up vital cash that could be used for expansion. The working capital cycle must be actively managed by renegotiating credit terms and utilizing early payment discounts selectively when liquidity allows.",
    study_16_p3: "Implement a 13-week rolling cash flow forecast to proactively identify potential liquidity gaps before they occur, shifting from reactive borrowing to strategic capital deployment.",
    study_16_source: "ESO Corporate Consulting Financial Modeling whitepapers.",
    study_title_cfo: "The Role of the Outsourced CFO for Growing SMEs",
    study_desc_cfo: "Why mid-sized family businesses are shifting to fractional financial leadership to handle banking relations and capital raising.",
    study_17_p1: "As mid-sized family businesses scale, the gap between a head accountant and a strategic Chief Financial Officer becomes apparent. We analyze the rising trend of fractional financial leadership in the MENA region.",
    study_17_p2: "An accountant looks backward to record history; a CFO looks forward to project the future. Growing SMEs often lack the budget for a $150k/year executive, leading to poor banking relations and unstructured capital raising. An outsourced CFO provides high-level strategy at a fraction of the cost.",
    study_17_p3: "SMEs preparing for succession planning or seeking outside equity should engage an outsourced CFO to build institutional-grade financial dashboards and lead negotiations with commercial banks.",
    study_17_source: "Industry trends reported by the Institute of Management Accountants (IMA).",
    study_title_ngo: "Corporate Governance Requirements for NGOs",
    study_desc_ngo: "Ensuring transparency: Audit requirements for non-governmental organizations to secure funding from international donor agencies.",
    study_18_p1: "International donor agencies such as USAID and the EU demand absolute transparency before releasing grants. This brief details the audit and governance structures Non-Governmental Organizations (NGOs) must implement.",
    study_18_p2: "NGOs are subjected to fund-specific auditing. Donors require assurance that their specific capital injection was used exclusively for the designated project, without cross-subsidizing other operations. This requires strict cost-center accounting and procurement bidding documentation.",
    study_18_p3: "We advise NGO boards to establish an independent audit committee and implement a zero-tolerance procurement policy that requires three blind bids for any expenditure over a set threshold.",
    study_18_source: "Grant compliance guidelines from the United States Agency for International Development (USAID).",
    careers_title: "Build Your Career",
    careers_subtitle: "Join a team of driven professionals shaping the future of finance.",
    careers_why_choose: "Why Choose Us?",
    careers_culture: "A Culture of Excellence.",
    careers_p1: "At ESO, we invest heavily in our people. We believe that a diverse workforce, continuous education, and an inclusive culture are the bedrock of our success.",
    careers_p2: "Whether you are a seasoned auditor looking to lead global engagements, or a bright university student seeking a rigorous summer internship, ESO provides the platform, the mentorship, and the high-stakes environment to accelerate your professional growth.",
    careers_open_positions: "Open Positions",
    careers_current_opps: "Current Opportunities",
    careers_desc_senior: "Full-time role for experienced professionals with 3+ years in public accounting and assurance.",
    apply_below: "Apply Below",
    careers_desc_tax: "Entry to mid-level role helping clients navigate complex tax regulations and compliance.",
    careers_desc_intern: "A rigorous 3-month program for university students looking for hands-on corporate finance experience.",
    careers_submit_app: "Submit Your Application",
    careers_ready_step: "Ready to take the next step? Fill out the form to apply for an open position.",
    careers_ensure_cv: "Ensure your CV is up to date and in PDF format. Our Human Resources team reviews every application meticulously and typically responds within 3-5 business days.",
    placeholder_full_name: "Full Name",
    placeholder_email: "Email Address",
    opt_select_pos: "Select Position",
    opt_general_app: "General Application",
    opt_summer_intern: "Summer Internship",
    opt_senior_auditor: "Senior Auditor",
    opt_tax_associate: "Tax Associate",
    date_mar18: "March 18, 2026",
    date_feb28: "February 28, 2026",
    date_jan15: "January 15, 2026",
    date_dec10: "December 10, 2025",
    date_nov22: "November 22, 2025",
    date_oct05: "October 05, 2025",
    date_sep18: "September 18, 2025",
    date_aug30: "August 30, 2025",
    date_jul12: "July 12, 2025",
    date_jun25: "June 25, 2025",
    date_may14: "May 14, 2025",
    date_apr08: "April 08, 2025",
    date_mar20: "March 20, 2025",
    date_feb11: "February 11, 2025",
    date_jan29: "January 29, 2025",
    date_dec15: "December 15, 2024",
    date_nov03: "November 03, 2024",
    date_oct18: "October 18, 2024",
    upload_cv: "Upload CV/Resume (PDF/DOCX):",
    placeholder_cover_letter: "Cover letter or short bio (Optional)",
    submit_application: "Submit Application",
    portal_title: "Client Portal",
    portal_subtitle: "Start your strategic transformation today.",
    portal_reach_out: "Reach Out",
    portal_lets_discuss: "Let's discuss your financial future.",
    portal_desc: "We make success a reality by putting clients first, leading with exceptional ideas, and doing the right thing. Connect with our advisory team to learn how we can assist you.",
    portal_hq: "Headquarters",
    po_box: "P.O. Box:",
    portal_phone: "Phone",
    portal_email: "Email",
    portal_send_msg: "Send a Direct Message",
    placeholder_corp_email: "Corporate email",
    placeholder_subject: "Subject / Inquiry Type",
    placeholder_describe: "Describe your strategic challenge...",
    portal_submit_inquiry: "Submit Inquiry",
    footer_desc: "Intelligent choices, intelligent solutions. We put clients first and lead with exceptional ideas.",
    footer_nav_title: "Navigation",
    footer_connect_title: "Connect",
    footer_contact: "Contact",
    footer_rights: "All rights reserved.",
    trust_title: "A Firm You Can Build On",
    trust_sub: "A quarter-century of audit, tax, and advisory expertise, grounded in what we can prove.",
    trust_years_label: "Years Established",
    trust_years_desc: "Trusted counsel since 2001, through every market cycle Lebanon has seen.",
    trust_standards_label: "Global Standards",
    trust_standards_desc: "Audits under International Standards on Auditing; reporting under IFRS.",
    trust_sector_label: "Sector Depth",
    trust_sector_desc: "A recognised specialism in Food & Beverage, across 15+ industries served.",
    trust_lacpa_label: "Licensed & Registered",
    trust_lacpa_desc: "A member of the Lebanese Association of Certified Public Accountants (LACPA).",
    trust_footnote: "Partner-led engagements, with strict confidentiality and independence on every mandate.",
    date_jul10_26: "July 10, 2026",
    date_jun20_26: "June 20, 2026",
    date_may15_26: "May 15, 2026",
    date_apr08_26: "April 08, 2026",
    study_title_midyear: "Mid-Year 2026 Compliance Review: Tax & NSSF Checkpoints",
    study_desc_midyear: "A practical half-year checklist covering income tax instalments, VAT filing cycles, and NSSF declarations to avoid year-end penalties.",
    study_19_p1: "The first half of 2026 has brought tighter filing windows and revised NSSF ceilings. A structured mid-year review lets enterprises correct course before the year-end audit rush, instead of discovering exposures in December when they are most expensive to fix.",
    study_19_p2: "The gaps we most often find at mid-year are misaligned quarterly VAT positions, unreconciled NSSF declarations split across fresh-USD and local-currency payrolls, and corporate income tax instalments still calculated on outdated brackets. Each one quietly compounds into penalties if left to the fourth quarter.",
    study_19_p3: "We advise every client to run a documented H1 health check now: reconcile VAT input and output, confirm NSSF ceilings against the latest circulars, and re-model income tax instalments on the 2026 brackets. Correcting these in July costs a fraction of correcting them under audit.",
    study_19_source: "Based on the 2026 filing calendar of the Ministry of Finance (Lebanon) and current NSSF contribution circulars.",
    study_title_ifrs19: "IFRS 19: Simplified Disclosures for Eligible Subsidiaries",
    study_desc_ifrs19: "How subsidiaries without public accountability can cut disclosure volume under IFRS 19 while staying fully IFRS-compliant, ahead of the 2027 effective date.",
    study_20_p1: "Following IFRS 18, the IASB has issued IFRS 19, which lets eligible subsidiaries apply substantially reduced disclosure requirements while still using full IFRS recognition and measurement. For MENA groups with several local subsidiaries, this can materially cut reporting effort.",
    study_20_p2: "A subsidiary qualifies if it has no public accountability and its parent prepares consolidated IFRS financial statements. The relief is in the notes only, recognition and measurement are unchanged, so this is a disclosure simplification, not an accounting shortcut. The election is made entity by entity.",
    study_20_p3: "We recommend groups map which subsidiaries are eligible now and model the reduced disclosure set before the 2027 effective date, so adoption is a planned election rather than a year-end scramble. Early application is permitted and can streamline the 2026 close for qualifying entities.",
    study_20_source: "Based on IFRS 19 'Subsidiaries without Public Accountability: Disclosures', as issued by the International Accounting Standards Board (IASB).",
    study_title_gaplaw: "Accounting for Deposit Recovery Under the Financial Gap Law",
    study_desc_gaplaw: "Practical guidance on valuing, provisioning, and disclosing trapped bank deposits as recovery mechanisms take shape, and what it means for your balance sheet.",
    study_21_p1: "As the framework for addressing the banking sector's losses advances, enterprises holding trapped bank deposits face a pressing question: at what value should those deposits sit on the balance sheet? Carrying them at face value overstates assets that may only be partially recoverable.",
    study_21_p2: "Under IFRS 9, these deposits are financial assets subject to expected credit loss assessment. The emerging recovery mechanisms, staggered payouts, tiered treatment, and instrument conversions, change the timing and amount of expected cash flows, and therefore the impairment provision. Auditors will closely scrutinise the assumptions behind any recovery estimate.",
    study_21_p3: "We advise clients to document a defensible impairment model for trapped deposits, tied to the specific recovery terms as they are published, and to disclose the judgement and its sensitivity clearly in the notes. Transparency here protects both the audit opinion and management's credibility with lenders.",
    study_21_source: "Analysis under IFRS 9 (Financial Instruments) in the context of published guidance on Lebanon's banking-sector recovery framework.",
    study_title_einvoice: "The Shift to E-Invoicing: Preparing for Digital VAT",
    study_desc_einvoice: "Why mandatory electronic invoicing is coming to the region, and the system, data, and process changes to start now to stay compliant.",
    study_22_p1: "Electronic invoicing has moved from optional to mandatory across much of the MENA region, and the direction of travel for Lebanon is clear. Enterprises that treat e-invoicing as a last-minute IT task rather than a finance transformation will struggle with the transition.",
    study_22_p2: "E-invoicing changes far more than the invoice format: it requires structured, machine-readable data, near-real-time reporting to the authority, and tighter master-data discipline over tax IDs, product codes, and VAT treatment. Legacy or manual bookkeeping is the biggest obstacle, because it cannot produce compliant structured output.",
    study_22_p3: "We recommend businesses audit their current invoicing and ERP capability now, clean their master data, and pilot a compliant e-invoicing workflow ahead of any mandate. Firms that prepare early gain not only compliance but faster reconciliation and fewer VAT disputes.",
    study_22_source: "Framework informed by regional e-invoicing rollouts across the GCC and international standards for VAT digital reporting."
  },

  fr: {
    nav_home: "Accueil",
    nav_about: "À Propos",
    nav_services: "Nos Services",
    nav_clients: "Nos Clients",
    nav_lebanon_insights: "Perspectives Liban",
    nav_market_guide: "Guide du Marché",
    nav_mof_decrees: "Lois et Décrets",
    nav_news: "Actualités",
    nav_careers: "Carrières",
    nav_client_portal: "Portail Client",
    nav_study: "Étude",
    hero_eso_advisory: "ESO Conseil",
    hero_bridging: "Relier le présent à ce qui peut être fait.",
    hero_firm_expertise: "Expertise et Ressources",
    hero_audit_assurance: "Audit et Assurance",
    hero_tax_advisory: "Conseil Fiscal",
    hero_accounting: "Comptabilité",
    hero_consulting: "Conseil / Consulting",
    hero_fb_specialty: "Spécialité Restauration",
    hero_mof_decrees: "Lois et Décrets",
    hero_schedule_consultation: "PRENDRE RENDEZ-VOUS",
    hero_latest_insights: "Dernières Analyses",
    hero_recent_studies: "Études récentes et analyse du marché.",
    hero_market_intelligence: "Intelligence du Marché",
    hero_view_all_news: "VOIR TOUTES LES ACTUALITÉS",
    home_who_we_are: "Qui Sommes-Nous",
    home_integrity: "L'Intégrité dans les Moindres Détails",
    home_eso_full_service: "ESO est un cabinet complet au service de clients dans le monde entier. Nous allons au-delà des chiffres, déterminés à fournir des informations financières claires et exploitables.",
    home_discover_firm: "Découvrir Notre Cabinet",
    home_our_expertise: "Notre Expertise",
    home_big_4_standards: "Standards des Big 4. Agilité d'une Boutique.",
    home_from_rigorous: "De l'audit légal rigoureux à la structuration fiscale transfrontalière complexe, nous fournissons le spectre complet des services comptables et de conseil aux entreprises.",
    home_explore_services: "Explorer Nos Services",
    home_career_opportunities: "Opportunités de Carrière",
    home_build_career: "Construisez Votre Carrière avec ESO",
    home_believe_diverse: "Nous pensons qu'une main-d'œuvre diversifiée et une culture inclusive sont essentielles.",
    home_view_open_positions: "Voir les Postes Ouverts",
    about_title: "À Propos d'ESO",
    about_subtitle: "Assister les professionnels avec précision, clarté et des normes intransigeantes.",
    about_standard_subtitle: "Le Standard ESO",
    about_bridging: "Relier le présent à ce qui peut être fait.",
    about_full_service: "ESO est un cabinet à service complet servant des clients du monde entier.",
    about_whether_multinational: "Que vous soyez une multinationale ou une entreprise en pleine croissance, nos consultants experts agissent comme une extension de votre équipe.",
    about_our_people: "Notre Équipe",
    about_discover_team: "Découvrez Notre Équipe",
    about_behind_every: "Derrière chaque vision stratégique et chaque audit impeccable se trouve une équipe de professionnels dévoués.",
    about_meet_experts: "Rencontrer les Experts",
    adv_subtitle: "L'Avantage ESO",
    adv_why_choose: "Pourquoi Nos Partenaires Nous Choisissent",
    adv_proactive_title: "Stratégie Proactive",
    adv_proactive_desc: "Nous ne rapportons pas l'histoire ; nous construisons l'avenir.",
    adv_compliance_title: "Conformité Absolue",
    adv_compliance_desc: "Éliminez les angles morts réglementaires.",
    adv_local_title: "Maîtrise Locale",
    adv_local_desc: "Les normes mondiales rencontrent la connaissance locale.",
    clients_title: "Nos Clients",
    clients_subtitle: "Au service d'un large éventail d'industries et d'organisations.",
    clients_intro: "Nos clients figurent parmi les plus prestigieux au niveau local et international.",
    client_fb: "Alimentation et Restauration",
    client_manufacturing: "Industrie Manufacturière",
    client_contracting: "Construction et Développement Immobilier",
    client_transportation: "Transport (fret)",
    client_automotive: "Automobile, concessionnaires et location de voitures",
    client_media: "Médias et Gestion Publicitaire",
    client_hospitality: "Hôtellerie et Loisirs",
    client_printing: "Imprimerie",
    client_trading: "Commerce et Services",
    client_public_works: "Travaux Publics",
    client_commercial: "Représentation Commerciale",
    client_bottling: "Industrie de l'Embouteillage",
    client_healthcare: "Santé",
    client_oil: "Industrie Pétrolière",
    client_financial: "Services Financiers et Courtage",
    client_venture: "Fonds de Capital-Risque et de Capital-Investissement",
    client_hightech: "Startups High-Tech et Internet",
    client_ngo: "Organisations Internationales et Non-Gouvernementales (ONG)",
    fb_breadcrumb: "Alimentation et Restauration",
    fb_page_title: "Secteur de la Restauration",
    back_to_clients: "← Retour aux Clients",
    fb_core_specialty: "Spécialité du Cabinet",
    fb_financial_engine: "Le Moteur Financier de l'Hôtellerie",
    fb_lead_text: "Près de 70% de nos clients entreprises opèrent dans le secteur dynamique de la restauration.",
    fb_unforgiving: "L'industrie de la restauration est notoirement impitoyable.",
    fb_specialized_caps: "Nos Capacités F&B Spécialisées",
    fb_inventory_title: "Gestion des Stocks et Rendements",
    fb_inventory_desc: "Le coût alimentaire est le tueur silencieux de la rentabilité.",
    fb_pos_title: "Réconciliation des PDV et Agrégateurs",
    fb_pos_desc: "Les plateformes de livraison créent un chaos comptable.",
    fb_franchise_title: "Franchise & Audits Multi-Unités",
    fb_franchise_desc: "Nous menons des audits de conformité complets.",
    fb_labor_title: "Optimisation de la Main-d'œuvre et Fiscalité",
    fb_labor_desc: "Nous optimisons les structures de paie pour rester légalement conformes.",
    fb_ready_scale: "Prêt à développer votre concept ?",
    fb_stop_guessing: "Arrêtez de deviner vos coûts.",
    fb_consult_team: "Consultez notre Équipe Restauration",
    fb_why_title: "Pourquoi l'Hôtellerie Exige un Spécialiste",
    fb_why_p1: "Un restaurant n'est pas une entreprise ordinaire à laquelle on aurait ajouté une cuisine. Il repose sur des volumes de transactions élevés, des stocks périssables qui perdent de la valeur d'heure en heure, une manipulation importante d'espèces, une main-d'œuvre en horaires décalés et au pourboire, et des revenus répartis entre la salle, la vente à emporter, le traiteur et un ensemble changeant de plateformes de livraison. Un généraliste enregistre tout cela après coup ; un spécialiste pilote les leviers qui déterminent si le concept survivra à sa deuxième année.",
    fb_why_p2: "Notre pratique en restauration s'organise autour du coût primaire, la somme des coûts de nourriture, de boissons et de main-d'œuvre, car c'est le chiffre qui prédit le plus fidèlement la survie d'un établissement. Nous le suivons par rapport aux ventes selon un rythme hebdomadaire, plutôt que d'attendre la clôture annuelle, afin que les problèmes apparaissent tant qu'il est encore temps de les corriger.",
    fb_approach_title: "Comment Nous Accompagnons les Groupes de Restauration",
    fb_step1_t: "1. Diagnostic du Coût Primaire",
    fb_step1_d: "Nous établissons une base de référence de vos coûts de nourriture, de boissons et de main-d'œuvre par rapport au chiffre d'affaires, canal par canal, pour révéler précisément où la marge s'échappe.",
    fb_step2_t: "2. Intégration des Systèmes et du POS",
    fb_step2_d: "Nous relions votre point de vente, votre gestion des stocks et votre comptabilité afin que le chiffre d'affaires, les annulations et les remises se rapprochent automatiquement plutôt qu'à la main.",
    fb_step3_t: "3. Contrôles et Reporting",
    fb_step3_d: "Nous mettons en place des contrôles de caisse, d'achats et de stocks, puis livrons un reporting de gestion qu'un exploitant peut réellement exploiter.",
    fb_step4_t: "4. Préparation à l'Audit et à l'Expansion",
    fb_step4_d: "Nous préparons des états financiers prêts pour la franchise et pour les investisseurs, afin que vous puissiez ouvrir la prochaine succursale ou accueillir un partenaire avec des comptes sains.",
    fb_faq_title: "Restauration : Questions Fréquentes",
    fb_faq_q1: "En quoi la comptabilité d'un restaurant diffère-t-elle de celle d'une entreprise classique ?",
    fb_faq_a1: "La différence tient à la rapidité et au niveau de détail. Un restaurant écoule des stocks périssables chaque jour et génère des revenus sur plusieurs canaux à la fois ; les coûts doivent donc être mesurés chaque semaine par rapport aux ventes, et non résumés une fois par an. Le coût primaire, les contrôles de caisse et le rapprochement canal par canal comptent bien plus que dans un commerce ou une entreprise de services classique.",
    fb_faq_q2: "Comment rapprochez-vous les revenus des plateformes de livraison ?",
    fb_faq_a2: "Les plateformes de livraison versent un montant net de commission, de promotions et d'ajustements, souvent selon leur propre calendrier, qui correspond rarement à ce qu'a enregistré le POS. Nous rapprochons les rapports de versement de chaque plateforme des ventes du POS et des dépôts bancaires, afin que les commissions, les rétrofacturations et les règlements manquants soient identifiés plutôt que noyés dans les autres charges.",
    fb_faq_q3: "Pouvez-vous accompagner une franchise ou une expansion multi-établissements ?",
    fb_faq_a3: "Oui. Nous gérons la conformité des redevances et des frais de marketing, tant pour les franchiseurs que pour les franchisés, consolidons le reporting multi-établissements et normalisons le plan comptable entre les succursales afin que chaque site soit mesuré de la même manière. C'est cette cohérence qui rend une expansion finançable.",
    fb_faq_q4: "Gérez-vous la CNSS et la paie du personnel en horaires décalés ?",
    fb_faq_a4: "Oui. Nous structurons la paie du personnel variable, en horaires décalés et au pourboire pour rester conforme à la CNSS et au droit du travail aux taux légaux en vigueur, tout en gardant un traitement défendable en cas d'audit. Nous distinguons également le traitement de la TVA, qui diffère entre le service en salle et les produits vendus à emporter.",
    team_breadcrumb: "Notre Équipe",
    team_title: "Direction & Experts",
    team_subtitle: "Des décennies d'expertise financière mondiale et locale.",
    team_firm_leadership: "Direction du Cabinet",
    team_our_staff: "Notre Personnel",
    team_leadership_desc: "Avec plus d'un quart de siècle d'expérience dans le domaine de l'audit et du conseil depuis 2001, ESO continue d'exceller.",
    role_founder: "Fondateur & PDG",
    desc_founder: "Apporte 25 ans d'expérience inégalée en conseil et audit.",
    team_advisory_mgmt: "Conseil & Gestion",
    team_advisory_desc: "Piloter la stratégie et assurer une conformité absolue.",
    role_head_tax: "Directeur de la Fiscalité",
    desc_karim: "Spécialisé dans les décrets du Ministère des Finances libanais. 15 ans d'expérience.",
    role_dir_consulting: "Directrice du Consulting",
    desc_layla: "Experte en restructuration opérationnelle et valorisation d'entreprise.",
    role_tax_manager: "Responsable Fiscal",
    desc_jad: "Gère la conformité CNSS et la réconciliation des taux de change.",
    role_audit_manager: "Responsable d'Audit",
    desc_nour: "Spécialisée dans l'audit des soins de santé et des ONG.",
    team_senior_associates: "Auditeurs Seniors & Analystes",
    team_senior_desc: "Le moteur analytique de notre cabinet.",
    role_senior_auditor: "Auditeur Senior",
    desc_tarek: "Plus de 5 ans d'expérience. Dirige les équipes d'audit sur le terrain.",
    role_senior_auditor_2: "Auditeur Senior",
    desc_maya: "Professionnelle de l'assurance orientée vers les détails.",
    role_senior_fin_analyst: "Analyste Financier Senior",
    desc_omar: "Expert en modélisation DCF hyper-inflationniste.",
    role_tax_associate: "Consultante Fiscale",
    desc_zeina: "Prépare les déclarations fiscales et gère les communications quotidiennes.",
    team_associates_admin: "Associés & Administration",
    team_associates_desc: "Soutenir les opérations quotidiennes sans faille.",
    role_junior_auditor: "Auditeur Junior",
    desc_samer: "Jeune diplômé exécutant des procédures analytiques.",
    role_junior_auditor_2: "Auditeur Junior",
    desc_clara: "Aide à la rédaction des états financiers.",
    role_junior_consultant: "Consultant Junior",
    desc_rami: "Soutient l'équipe de conseil dans les études de marché.",
    role_office_admin: "Administratrice de Bureau",
    desc_yara: "Assure le bon déroulement des opérations quotidiennes.",
    services_title: "Expertise du Cabinet",
    services_subtitle: "Des solutions de calibre Big 4 adaptées aux entreprises modernes.",
    services_global_standards: "Standards Mondiaux",
    services_comprehensive: "Solutions Financières Complètes.",
    services_we_provide: "Nous fournissons le spectre complet des services comptables et de conseil.",
    services_select_service: "Sélectionnez un service ci-dessous pour découvrir comment nos équipes d'experts peuvent optimiser vos opérations.",
    services_4_pillars: "Nos 4 Piliers Fondamentaux",
    services_explore_services: "Explorer Nos Services",
    card_audit_title: "Audit & Assurance",
    card_audit_desc: "Audits statutaires indépendants et conformité IFRS.",
    card_tax_title: "Conseil Fiscal",
    card_tax_desc: "Planification fiscale stratégique, conformité TVA et défense lors des contrôles.",
    card_acc_title: "Comptabilité",
    card_acc_desc: "Tenue de livres complète, traitement de la paie et réconciliation multi-devises.",
    card_cons_title: "Consulting",
    card_cons_desc: "Due diligence rigoureuse en M&A, valorisations d'entreprises et restructuration.",
    audit_breadcrumb: "Audit & Assurance",
    audit_page_title: "Audit & Assurance",
    back_to_services: "← Retour aux Services",
    audit_unwavering: "Intégrité et Confiance Inébranlables",
    audit_intro: "Dans le paysage financier complexe d'aujourd'hui, les parties prenantes exigent de la transparence et une précision absolue.",
    audit_core_services: "Services d'Audit Principaux",
    audit_li1_strong: "Audits Légaux et Indépendants :",
    audit_li1_desc: "Audits complets des états financiers conformément aux Normes Internationales d'Audit (ISA).",
    audit_li2_strong: "Conformité et Transition IFRS :",
    audit_li2_desc: "Accompagnement expert sur l'adoption des Normes Internationales d'Information Financière.",
    audit_li3_strong: "Revue du Contrôle Interne :",
    audit_li3_desc: "Évaluation systématique des contrôles internes de votre entreprise.",
    audit_li4_strong: "Procédures Convenues :",
    audit_li4_desc: "Enquêtes ciblées sur des données financières spécifiques.",
    audit_conclusion: "Nous ne considérons pas un audit simplement comme un exercice de conformité.",
    ready_elevate: "Prêt à élever votre entreprise ?",
    contact_advisory: "Contactez notre équipe de conseil pour discuter de vos besoins spécifiques.",
    get_in_touch: "Prendre Contact",
    tax_breadcrumb: "Conseil Fiscal",
    tax_page_title: "Conseil Fiscal",
    tax_optimizing: "Optimiser les Passifs. Assurer la Conformité.",
    tax_intro: "Naviguer dans le paysage fiscal en évolution rapide nécessite une approche proactive.",
    tax_comprehensive: "Stratégies Fiscales Complètes",
    tax_li1_strong: "Planification Fiscale des Sociétés :",
    tax_li1_desc: "Modélisation stratégique pour optimiser votre taux d'imposition effectif.",
    tax_li2_strong: "Conformité TVA :",
    tax_li2_desc: "Calcul précis, dépôt ponctuel et restructuration stratégique de la TVA.",
    tax_li3_strong: "Consultation sur les Décrets du MdF :",
    tax_li3_desc: "Conseils en temps réel sur la mise en œuvre des derniers décrets fiscaux.",
    tax_li4_strong: "Défense lors de Contrôles Fiscaux :",
    tax_li4_desc: "Représentation solide lors des inspections officielles des autorités fiscales.",
    tax_conclusion: "Nos experts fiscaux vous apportent la clarté nécessaire.",
    acc_breadcrumb: "Comptabilité",
    acc_page_title: "Services Comptables",
    acc_precision: "La Précision dans Chaque Registre",
    acc_intro: "Une comptabilité irréprochable est la force vitale de toute entreprise prospère.",
    acc_capabilities: "Nos Capacités Comptables",
    acc_li1_strong: "Tenue de Livres Complète :",
    acc_li1_desc: "Enregistrement précis de toutes les transactions financières.",
    acc_li2_strong: "Gestion de la Paie et CNSS :",
    acc_li2_desc: "Traitement confidentiel et conforme de la paie, incluant les déclarations CNSS.",
    acc_li3_strong: "Réconciliation Multi-Devises :",
    acc_li3_desc: "Gestion experte des comptes opérant sur des taux de change multiples.",
    acc_li4_strong: "Reporting de Gestion :",
    acc_li4_desc: "Tableaux de bord financiers personnalisés.",
    acc_conclusion: "Nous modernisons l'ensemble de votre fonction financière.",
    cons_breadcrumb: "Consulting",
    cons_page_title: "Conseil aux Entreprises",
    cons_architecting: "Architecturer la Croissance Stratégique",
    cons_intro: "Lorsque les entreprises font face à des points d'inflexion critiques, l'équipe de conseil d'ESO fournit l'expertise spécialisée requise.",
    cons_solutions: "Solutions de Conseil Stratégique",
    cons_li1_strong: "Due Diligence M&A :",
    cons_li1_desc: "Audits financiers et fiscaux rigoureux pour identifier les passifs cachés.",
    cons_li2_strong: "Valorisation d'Entreprise :",
    cons_li2_desc: "Évaluations hautement techniques utilisant une modélisation DCF avancée.",
    cons_li3_strong: "Services de Directeur Financier Externalisés :",
    cons_li3_desc: "Leadership financier de haut niveau sur une base fractionnée.",
    cons_li4_strong: "Restructuration Opérationnelle :",
    cons_li4_desc: "Évaluation et refonte des flux de travail internes.",
    cons_conclusion: "Nos consultants ne font pas que conseiller ; ils exécutent avec vous.",
    guide_page_title: "Faire des Affaires au Liban",
    guide_subtitle: "Un guide pratique pour structurer, fiscaliser et gérer une entreprise au Liban, selon les standards mondiaux.",
    guide_areas_title: "Domaines Clés pour Opérer au Liban",
    guide_t1_h: "Choisir une Structure d'Entreprise",
    guide_t1_p: "Le Liban propose plusieurs véhicules, de la société anonyme SAL et de la société à responsabilité limitée SARL aux structures holding et offshore. Le bon choix dépend du lieu où naissent vos revenus, de l'identité de vos partenaires et de l'endroit où vous êtes bancarisé.",
    guide_t2_h: "Impôt sur les Sociétés et Budget Annuel",
    guide_t2_p: "L'impôt sur les sociétés, ses tranches et son calendrier de dépôt sont fixés par le ministère des Finances et révisés par le budget annuel et ses décrets. Comme les taux et les échéances changent, planifiez selon les règles en vigueur et déposez dans les délais, qui ont tendance à se resserrer.",
    guide_t3_h: "TVA et Passage à la Facturation Électronique",
    guide_t3_p: "La taxe sur la valeur ajoutée s'applique à la plupart des biens et services, avec des règles précises d'immatriculation, de dépôt et de récupération. La région évolue aussi vers une facturation électronique obligatoire, qui est autant un projet de données et de systèmes qu'un sujet fiscal.",
    guide_t4_h: "Paie et Sécurité Sociale (CNSS)",
    guide_t4_p: "Les employeurs doivent affilier leur personnel à la Caisse Nationale de Sécurité Sociale et déclarer les cotisations selon des plafonds que les autorités ajustent au fil du temps. Bien établir la base et le calendrier, surtout lorsque les salaires sont en partie en devises, est là où se concentre l'essentiel du risque de paie.",
    guide_t5_h: "Immobilier et Propriété",
    guide_t5_p: "La propriété demeure une réserve de valeur privilégiée, mais les droits d'enregistrement, la taxe sur la propriété bâtie et le traitement des plus-values récompensent une planification à l'acquisition plutôt qu'à la vente, et des contrats qui précisent clairement la devise et le mode de paiement.",
    guide_t6_h: "Information Financière et Audit (IFRS)",
    guide_t6_p: "Les entreprises libanaises publient selon les IFRS, et le référentiel évolue : IFRS 18 remodèle la présentation du compte de résultat, tandis qu'IFRS 19 allège les informations à fournir pour les filiales éligibles. Des obligations d'audit légal s'appliquent à de nombreuses entités.",
    guide_t7_h: "Banque et Dépôts Bloqués",
    guide_t7_p: "Les contraintes du secteur bancaire influent sur la façon dont les entreprises détiennent leur trésorerie, valorisent leurs anciens dépôts et transfèrent des fonds à l'étranger. Les dépôts bloqués en particulier exigent un traitement comptable défendable selon IFRS 9, plutôt que d'être maintenus à leur ancienne valeur.",
    guide_t8_h: "Se Tenir à Jour des Décrets du Ministère des Finances",
    guide_t8_p: "Une grande partie du détail fiscal et réglementaire libanais arrive par les décrets du ministère des Finances, les kararat, publiés tout au long de l'année. Nous tenons une archive organisée et consultable des décrets officiels qui comptent pour les entreprises.",
    guide_browse_decrees: "Consulter l'archive des lois et décrets",
    guide_faq_q1: "Un investisseur étranger peut-il détenir une entreprise au Liban ?",
    guide_faq_a1: "Le Liban autorise généralement la détention étrangère dans la plupart des secteurs, certaines activités étant soumises à des conditions particulières ou à des règles de participation locale. Les questions pratiques portent généralement sur la structure à utiliser et sur les exigences bancaires et de résidence, non sur le fait de savoir si la détention étrangère est permise.",
    guide_faq_q2: "Quelles structures d'entreprise existe-t-il au Liban ?",
    guide_faq_a2: "Les plus courantes sont la SAL, une société anonyme, la SARL, une société à responsabilité limitée, et les sociétés holding ou offshore pour des besoins particuliers. Elles diffèrent par le capital requis, la responsabilité, la gouvernance et le traitement fiscal ; le choix doit donc suivre vos plans d'actionnariat, de financement et de marché.",
    guide_faq_q3: "Quels impôts une entreprise opérant au Liban paie-t-elle ?",
    guide_faq_a3: "Les principaux sont l'impôt sur les sociétés, la taxe sur la valeur ajoutée, les cotisations de paie à la Caisse Nationale de Sécurité Sociale et divers droits d'enregistrement et de timbre. Les taux, tranches et seuils précis sont fixés par la loi et révisés périodiquement ; confirmez donc les chiffres en vigueur pour votre situation avant de bâtir votre planification.",
    guide_faq_q4: "Une entreprise au Liban a-t-elle besoin d'un auditeur externe ?",
    guide_faq_a4: "De nombreuses entreprises libanaises doivent nommer un auditeur indépendant et publier selon les IFRS, et prêteurs, investisseurs et bailleurs exigent fréquemment des états audités même lorsque la loi ne l'impose pas. En pratique, des comptes audités crédibles sont ce qui ouvre les portes du financement et du partenariat.",
    guide_faq_q5: "Comment la situation bancaire affecte-t-elle les affaires au Liban ?",
    guide_faq_a5: "Les contraintes du secteur influent sur la gestion de trésorerie, la valeur des anciens dépôts et les transferts transfrontaliers, et elles font de l'accès bancaire un facteur réel dans le choix d'une structure. Les anciens dépôts bloqués exigent aussi un traitement comptable défendable plutôt que d'être maintenus à leur valeur d'origine.",
    guide_market_intel: "Intelligence du Marché",
    guide_seamlessly: "Opérez de manière transparente dans les juridictions locales.",
    guide_p1: "Se développer ou opérer au Liban comporte des nuances réglementaires et fiscales uniques.",
    guide_p2: "Qu'il s'agisse des décrets du MdF, de la conformité CNSS ou d'une structuration transfrontalière, ESO fournit une intelligence exploitable.",
    guide_consult: "Consulter un Expert",
    mof_page_title: "Lois et Décrets",
    mof_subtitle: "Documents réglementaires officiels, consultables instantanément.",
    mof_official_decrees: "Lois et décrets officiels",
    mof_vat_ext: "- Extension du Délai de la TVA",
    published_label: "Publié :",
    mof_open_decree: "Ouvrir le Décret",
    mof_corp_tax: "- Mises à jour des Tranches d'Impôt",
    mof_nssf_caps: "- Plafonds de Contribution CNSS",
    mof_built_prop: "- Évaluation de la Taxe Foncière",
    news_page_title: "Analyses du Marché",
    news_subtitle: "Les dernières perspectives financières et études réglementaires de notre équipe.",
    news_market_tech: "Analyses et Études Techniques",
    news_indepth_reports: "Rapports détaillés sur la conformité, la stratégie fiscale et les normes d'audit.",
    read_full_study: "Lire l'Étude →",
    back_to_news: "← Retour aux Actualités",
    exec_summary: "Résumé Exécutif",
    key_adjustments: "Ajustements Clés et Impact",
    eso_recs: "Recommandations d'ESO",
    source_ref: "Source & Référence :",
    study_19_bottom: "Une revue de milieu d'année coûte moins cher qu'une mauvaise surprise en fin d'exercice. Réaliser dès maintenant un bilan documenté du premier semestre, en rapprochant les positions de TVA, les déclarations CNSS et les acomptes d'impôt sur le revenu tant qu'il est encore temps de les corriger, transforme la conformité d'une course de décembre en une routine. Les entreprises qui vérifient à mi-année retraitent rarement en fin d'exercice.",
    study_19_fq1: "Pourquoi réaliser une revue de conformité à mi-année plutôt qu'en fin d'exercice ?",
    study_19_fa1: "Parce qu'à mi-année, vous pouvez encore corriger ce que vous trouvez. Un écart de rapprochement de TVA ou une déclaration CNSS repéré en juillet peut être corrigé sur les mois restants ; le même écart découvert en décembre devient un ajustement précipité ou un retraitement. Un point de contrôle à mi-année étale le travail et supprime l'effet de falaise de fin d'exercice.",
    study_19_fq2: "Que doit couvrir un bilan de mi-année ?",
    study_19_fa2: "Au minimum, rapprocher la TVA collectée et déductible des périodes déjà déclarées, confirmer que les déclarations CNSS concordent avec la paie et vérifier que les acomptes d'impôt sur le revenu sont en ligne avec les résultats attendus. L'objectif est de repérer les décalages, les positions non rapprochées et les dépôts manqués tant que le semestre restant laisse la marge de les corriger.",
    study_20_bottom: "IFRS 19 est l'occasion d'alléger le travail d'information sans quitter le référentiel IFRS. Les filiales éligibles, celles sans responsabilité publique dont la société mère publie selon les IFRS, peuvent appliquer des informations réduites tout en conservant la comptabilisation et l'évaluation IFRS complètes. Les groupes qui cartographient l'éligibilité dès maintenant peuvent alléger le reporting de chaque filiale qualifiée à la prochaine clôture.",
    study_20_fq1: "Quelles filiales peuvent appliquer IFRS 19 ?",
    study_20_fa1: "Une filiale est éligible si elle n'a pas de responsabilité publique, en gros, elle n'est pas cotée et ne détient pas d'actifs à titre fiduciaire pour des tiers comme activité principale, et si sa société mère ultime ou intermédiaire publie des états financiers consolidés IFRS accessibles au public. Si les deux conditions sont réunies, la filiale peut opter pour les informations réduites.",
    study_20_fq2: "IFRS 19 change-t-elle la façon dont nous évaluons nos chiffres ?",
    study_20_fa2: "Non. IFRS 19 réduit uniquement les obligations d'information ; la comptabilisation et l'évaluation continuent de suivre intégralement les autres normes IFRS. Une filiale éligible présente les mêmes chiffres mais avec un jeu de notes allégé, ce qui réduit l'effort de préparation sans sortir du cadre IFRS.",
    study_21_bottom: "Les dépôts bloqués occupent une position inconfortable au bilan : toujours enregistrés à leur ancienne valeur, mais ne valant en pratique qu'une fraction. Selon IFRS 9, la réponse honnête est une dépréciation documentée, une approche par pertes de crédit attendues rattachée au cadre de recouvrement réellement adopté, et une information claire sur les hypothèses. Un modèle défendable vaut mieux que le déni comme que l'à-peu-près.",
    study_21_fq1: "Comment comptabiliser des dépôts bloqués dans le secteur bancaire ?",
    study_21_fa1: "Selon IFRS 9, ces dépôts sont des actifs financiers soumis à l'évaluation des pertes de crédit attendues. En pratique, cela signifie comptabiliser une dépréciation reflétant le montant réellement recouvrable, plutôt que de maintenir le dépôt à son solde d'origine, et indiquer la base de votre estimation. Le montant exact dépend du cadre de recouvrement en vigueur ; le modèle doit donc être réexaminé à mesure que ce cadre évolue.",
    study_21_fq2: "Que devons-nous documenter pour justifier la dépréciation ?",
    study_21_fa2: "Les hypothèses qui sous-tendent votre estimation : le cadre ou les orientations de recouvrement retenus, les scénarios et probabilités pondérés, le calendrier de recouvrement attendu et l'actualisation appliquée. Une dépréciation défendable est celle qu'un auditeur peut suivre et contester sur ses hypothèses, non un chiffre unique sans calculs à l'appui.",
    study_22_bottom: "La facturation électronique est un projet de données déguisé en facture. L'obligation ne porte pas sur un nouveau PDF ; elle porte sur des factures structurées et lisibles par machine et sur des données de référence propres que vos systèmes peuvent générer et déclarer à la demande. Les entreprises qui nettoient leurs données clients et fiscales et testent leur ERP dès maintenant se mettront en conformité sans bruit ; celles qui attendent courront après une échéance fixe.",
    study_22_fq1: "Qu'est-ce qui change réellement lorsque la facturation électronique devient obligatoire ?",
    study_22_fa1: "La facture devient une donnée structurée, et non un simple document. Au lieu d'un PDF ou d'un exemplaire papier, vous émettez et conservez les factures dans un format défini, lisible par machine, pouvant être validé et déclaré, souvent vers ou via une plateforme fiscale. Cela modifie vos systèmes et vos processus bien plus que l'apparence de la facture pour le client.",
    study_22_fq2: "Comment devons-nous nous y préparer ?",
    study_22_fa2: "Commencez par vos données et vos systèmes. Vérifiez si votre ERP ou votre logiciel de facturation peut produire le format structuré requis, puis nettoyez vos données de référence, identifiants fiscaux des clients, codes produits et traitements de TVA, car la validation de la facturation électronique met au jour la moindre incohérence. Tester tôt, sur vos données réelles, distingue une transition fluide d'une course à l'échéance.",
    study_13_bottom: "Une opinion d'audit ne vaut que ce que valent les systèmes qui ont produit les chiffres. Les entreprises qui imposent un accès fondé sur les rôles, séparent les tâches dans leur logiciel comptable et conservent des journaux inviolables donnent à leur auditeur un socle fiable ; celles qui laissent une même personne saisir et approuver les écritures ne sont qu'à un incident d'états financiers non fiables.",
    study_13_fq1: "Pourquoi un auditeur s'intéresse-t-il à notre sécurité informatique ?",
    study_13_fa1: "Parce que les états financiers sont générés par des systèmes informatiques et que, selon l'ISA 315, l'auditeur doit comprendre et évaluer les contrôles qui les entourent. Si les systèmes qui produisent vos grands livres peuvent être modifiés sans laisser de trace, les chiffres qu'ils produisent ne sont pas pleinement fiables, et l'audit doit intensifier ses travaux ou nuancer ses conclusions.",
    study_13_fq2: "Quel est le contrôle le plus important à mettre en place ?",
    study_13_fa2: "Un accès fondé sur les rôles avec une véritable séparation des tâches. La personne qui peut passer une écriture ne doit pas être aussi celle qui l'approuve, et les accès doivent correspondre au rôle réel de chacun. Ce seul contrôle bloque une grande part de la fraude comme de l'erreur accidentelle, et c'est la première chose que recherche un contrôleur.",
    study_14_bottom: "Le choix entre le Liban et Chypre ne se règle pas au seul taux d'imposition ; il se règle selon l'emplacement de vos clients et de votre banque. Chypre vous ouvre l'accès à l'UE et à un réseau de conventions moyennant un coût de fonctionnement plus élevé ; une société offshore libanaise est moins coûteuse à exploiter et plus simple à constituer. Choisissez la structure que votre marché cible et votre banque accepteront réellement.",
    study_14_fq1: "Devons-nous nous constituer en offshore au Liban ou à Chypre ?",
    study_14_fa1: "Cela dépend de votre marché. Une société offshore libanaise est simple à constituer et peu coûteuse à maintenir, ce qui convient aux prestataires de services à vocation régionale. Chypre offre à la société une résidence dans l'UE et l'accès à un vaste réseau de conventions, précieux si vos clients ou votre banque sont en Europe, mais à des coûts de constitution et de fonctionnement plus élevés. Adaptez la juridiction à l'emplacement réel de vos revenus et de votre banque.",
    study_14_fq2: "La juridiction la moins chère l'emporte-t-elle généralement ?",
    study_14_fa2: "Rarement, dès que l'on tient compte de la banque. Le coût nominal le plus bas est souvent annulé par un accès bancaire plus difficile ou une couverture conventionnelle plus faible, qui peuvent coûter bien plus, en frictions et en retenues à la source, que ce que la constitution a permis d'économiser. La bonne mesure est le coût total et l'acceptation sur votre marché cible, non les frais d'immatriculation.",
    study_15_bottom: "Pour les besoins de l'audit, la cryptomonnaie n'est pas de la trésorerie ; selon les IFRS actuelles, il s'agit généralement d'un actif incorporel, et cette classification détermine sa mesure, le moment de la dépréciation et les informations à fournir. Les trésoreries qui tiennent des registres méticuleux de portefeuilles et de transactions rendent l'audit possible ; celles qui ne peuvent prouver ni propriété ni historique le rendent très difficile.",
    study_15_fq1: "Comment les avoirs en cryptomonnaie sont-ils traités selon les IFRS ?",
    study_15_fa1: "Les cryptomonnaies ne constituent généralement ni de la trésorerie ni des équivalents de trésorerie selon les IFRS. Dans la plupart des cas, elles sont comptabilisées comme des actifs incorporels selon l'IAS 38, conformément à l'analyse du comité d'interprétation des IFRS, ce qui influe sur la mesure et la dépréciation. Si vous détenez des cryptos à des fins de négoce en tant que courtier-négociant, d'autres règles peuvent s'appliquer ; les faits précis comptent donc.",
    study_15_fq2: "Quels justificatifs un auditeur exige-t-il pour vérifier des avoirs en crypto ?",
    study_15_fa2: "Une preuve de propriété et un historique complet des transactions. Cela suppose des registres tenus des adresses de portefeuille, des empreintes de transactions et des rapprochements avec votre comptabilité, ainsi qu'une description claire de la conservation. Sans lien vérifiable entre la blockchain et vos comptes, un auditeur ne peut confirmer que les actifs existent et vous appartiennent.",
    study_16_bottom: "Le besoin en fonds de roulement, c'est de la trésorerie que vous possédez déjà mais que vous avez immobilisée. Une prévision glissante à court terme, des stocks resserrés et une gestion rigoureuse des créances libèrent cette trésorerie sans nouveau financement, à condition de ne pas comprimer les fournisseurs au point de rompre la chaîne d'approvisionnement. L'objectif est la liquidité, non un bilan de terre brûlée.",
    study_16_fq1: "Quel est le moyen le plus rapide de libérer de la trésorerie sans emprunter ?",
    study_16_fa1: "S'attaquer au cycle de conversion de la trésorerie. Encaissez les créances plus vite, détenez moins de stocks dormants et gérez les dettes fournisseurs de manière délibérée. Les stocks de précaution excédentaires et les encaissements lents sont généralement là où la trésorerie est le plus immobilisée, et la libérer coûte moins cher et va plus vite que d'obtenir un nouveau financement.",
    study_16_fq2: "Comment gérer les dettes fournisseurs sans nuire aux relations ?",
    study_16_fa2: "Allonger les délais par accord, non par silence. Négociez ouvertement des délais de paiement plus longs, payez de façon fiable dans les termes convenus et privilégiez les fournisseurs essentiels à vos opérations. Étirer unilatéralement les paiements économise de la trésorerie un trimestre et vous coûte la chaîne d'approvisionnement le suivant ; une prévision de trésorerie à 13 semaines permet d'arbitrer de façon délibérée.",
    study_17_bottom: "Le manque que ressent une PME en croissance n'est pas davantage de comptabilité ; c'est l'absence de quelqu'un qui traduit les chiffres en décisions. Un directeur financier externalisé apporte à une entreprise de taille moyenne un pilotage financier tourné vers l'avenir, des relations bancaires, une stratégie de trésorerie et un reporting de niveau conseil d'administration, sans le coût d'un recrutement à plein temps. C'est un pont pour l'étape entre un chef comptable et un directeur financier permanent.",
    study_17_fq1: "Quelle est la différence entre un comptable et un directeur financier ?",
    study_17_fa1: "Un comptable regarde en arrière pour enregistrer et restituer ce qui s'est passé ; un directeur financier regarde en avant pour façonner la suite, stratégie de trésorerie, financement, tarification, investissement et risque. Les deux sont essentiels, mais à mesure qu'une entreprise se développe, c'est l'absence du rôle prospectif qui commence à la freiner, et c'est ce vide que comble un directeur financier externalisé.",
    study_17_fq2: "Quand une PME doit-elle envisager un directeur financier externalisé ou à temps partagé ?",
    study_17_fa2: "Lorsque les décisions commencent à dépasser la fonction financière, généralement autour d'un plan de succession, d'une levée de fonds, de négociations bancaires ou d'une croissance rapide. À ce stade, vous avez besoin d'un jugement de niveau directeur financier mais rarement d'un salaire à plein temps ; un directeur financier à temps partagé vous apporte donc la capacité stratégique à un coût adapté à l'étape.",
    study_18_bottom: "Pour une ONG, la gouvernance n'est pas de la bureaucratie ; c'est le prix de la prochaine subvention. Les bailleurs débloquent des fonds sur preuve d'une supervision indépendante et d'une comptabilité propre et affectée par fonds. Les ONG qui mettent en place tôt un comité d'audit indépendant et appliquent la comptabilité par fonds gardent leur financement ouvert ; celles qui la négligent découvrent l'exigence au pire moment, en pleine demande.",
    study_18_fq1: "Qu'exigent les bailleurs internationaux avant de débloquer des fonds ?",
    study_18_fa1: "Des preuves de transparence et de contrôle. Les grandes agences de développement et les bailleurs publics exigent généralement des états financiers audités, une comptabilité par fonds montrant que leur argent a servi à l'objet convenu, et une supervision indépendante de l'organisation. Plus votre gouvernance et votre reporting sont solides, plus le risque perçu est faible et plus le financement est fluide.",
    study_18_fq2: "Qu'est-ce que la comptabilité par fonds et pourquoi les bailleurs l'exigent-ils ?",
    study_18_fa2: "La comptabilité par fonds suit séparément la contribution de chaque bailleur, afin de démontrer qu'une subvention précise a été dépensée pour son programme prévu plutôt que mutualisée et utilisée ailleurs. Les bailleurs l'exigent parce que c'est le mécanisme qui prouve que les fonds affectés ont bien été utilisés comme tels, ce qui est le cœur de la conformité aux subventions.",
    study_7_bottom: "Un assainissement du bilan ne fonctionne que si les chiffres qui le sous-tendent tiennent. Les industriels qui sortent d'une restructuration en bonne posture sont ceux qui ont fait évaluer les actifs de façon indépendante, documenté la comptabilisation de chaque conversion et modélisé les conséquences fiscales avant de signer, et non après. Les restructurations précipitées échangent souvent un problème contre un autre plus grand.",
    study_7_fq1: "Comment comptabilise-t-on une conversion de dette en capital ?",
    study_7_fa1: "Le créancier échange sa créance contre des actions ; le passif est donc décomptabilisé et remplacé par des capitaux propres. Selon IFRS 9, l'écart entre la valeur comptable de la dette éteinte et la juste valeur des actions émises passe par le résultat, ce qui impose que la juste valeur de ce que vous émettez soit défendable. Une évaluation erronée fausse toute la restructuration.",
    study_7_fq2: "Que faut-il faire avant de négocier avec les créanciers ?",
    study_7_fa2: "Faire réaliser d'abord une évaluation indépendante des actifs et de l'entreprise. Entamer des négociations sans une vision défendable de sa valeur laisse l'initiative aux créanciers et expose à des conditions intenables. Une évaluation par un tiers offre aussi un point d'ancrage crédible à la comptabilisation ultérieure et à l'auditeur.",
    study_8_bottom: "Récupérer la TVA sur une créance irrécouvrable est autant un travail de documentation qu'un sujet fiscal. Les demandes qui aboutissent s'appuient sur une piste écrite claire : la facture d'origine, la TVA reversée, les tentatives de recouvrement et la preuve que la créance est réellement irrécouvrable. Constituez ce dossier au fil du vieillissement de la créance, et non au moment de la passer en perte.",
    study_8_fq1: "Pouvons-nous récupérer la TVA déjà payée sur une facture jamais réglée par le client ?",
    study_8_fa1: "En principe, la réglementation libanaise de la TVA autorise la récupération de la TVA reversée sur une créance devenue irrécouvrable, mais la charge de la preuve est lourde. Vous devez généralement démontrer que la créance est réellement irrécouvrable et que vous en avez poursuivi le recouvrement, et remplir les conditions et la procédure fixées par l'administration de la TVA. Ces conditions pouvant évoluer, vérifiez les exigences en vigueur avant de déposer une demande.",
    study_8_fq2: "Quelle est la meilleure façon de protéger notre droit à récupération ?",
    study_8_fa2: "Mettre en place un processus rigoureux de suivi des impayés. Suivez l'ancienneté des créances, documentez chaque tentative de recouvrement et conservez ensemble les factures fiscales d'origine et la correspondance, afin que, lorsqu'une créance devient irrécupérable, la preuve exigée existe déjà au lieu de devoir être reconstituée.",
    study_9_bottom: "L'IA fait passer l'audit de l'échantillonnage vers un test de la population complète, mais elle n'abaisse pas le niveau d'exigence des preuves, elle l'élève. Les clients qui en profitent le plus sont ceux dont les systèmes sont déjà numérisés et accessibles par API, car la technologie ne peut tester que les données qu'elle atteint. Des données propres et structurées sont désormais un atout d'audit à part entière.",
    study_9_fq1: "L'IA signifie-t-elle que les auditeurs n'échantillonnent plus les transactions ?",
    study_9_fa1: "De plus en plus, oui. Là où les auditeurs testaient autrefois un échantillon aléatoire de transactions, les outils d'IA peuvent désormais analyser l'ensemble de la population et signaler les anomalies pour investigation humaine. Le jugement de l'auditeur décide toujours du sens des anomalies, mais le point de départ passe d'une fraction des données à leur totalité.",
    study_9_fq2: "De quoi avons-nous besoin pour qu'un audit assisté par IA fonctionne ?",
    study_9_fa2: "Des données numérisées et bien structurées et des systèmes capables d'exporter ou de se connecter par API. L'IA ne peut pas tester des données qu'elle ne peut pas lire ; le prérequis pratique est donc un ERP ou un environnement comptable contenant des données de transactions propres et complètes. Les tableurs éparpillés et les ajustements manuels sont là où la valeur de la technologie se bloque.",
    study_10_bottom: "Il n'existe pas de juridiction de holding universellement meilleure ; il n'y a que celle qui correspond à votre portefeuille et au lieu où vos revenus prennent réellement naissance. Une zone franche des EAU peut être efficace pour des revenus régionaux éligibles mais exige une substance économique réelle ; une holding SAL libanaise peut être le choix rationnel pour un portefeuille ancré localement. Modélisez les deux à partir de vos faits réels avant de constituer la société.",
    study_10_fq1: "Une zone franche des EAU est-elle toujours plus avantageuse fiscalement qu'une holding libanaise ?",
    study_10_fa1: "Pas automatiquement. Les zones franches peuvent offrir un traitement favorable sur les revenus éligibles, mais l'avantage dépend du respect des exigences de substance économique, activité réelle, personnel et locaux, et non d'une simple immatriculation. Si vos actifs et revenus sont ancrés au Liban, une holding SAL locale peut être plus simple et plus défendable. La bonne réponse suit les faits, non le taux affiché.",
    study_10_fq2: "Qu'est-ce que la substance économique et pourquoi est-elle importante ?",
    study_10_fa2: "La substance économique signifie qu'une société doit avoir une activité réelle, une prise de décision, des personnes et des locaux dans la juridiction où elle revendique sa résidence fiscale. Autorités et banques la vérifient de plus en plus, et une structure qui n'existe que sur le papier risque de perdre son traitement et son accès bancaire. La substance est désormais une exigence de conception, non une réflexion après coup.",
    study_11_bottom: "L'immobilier demeure une réserve de valeur privilégiée, mais la fiscalité qui l'entoure est devenue l'élément le plus susceptible de surprendre un promoteur. Les projets qui évitent les ennuis sont ceux dont les contrats de vente précisent sans ambiguïté le mode et la devise de paiement, et dont la situation fiscale est modélisée à l'acquisition plutôt que découverte à l'enregistrement.",
    study_11_fq1: "Pourquoi la devise et le mode de paiement d'un contrat de vente comptent-ils autant ?",
    study_11_fa1: "Parce qu'ils déterminent la façon dont la transaction est valorisée et imposée. Lorsqu'un contrat reste vague sur la nature des fonds et la devise du paiement, il laisse la valeur retenue pour l'impôt s'écarter de ce que les parties avaient prévu. Un contrat qui énonce clairement ces termes supprime cette ambiguïté et le litige qui s'ensuit.",
    study_11_fq2: "Quand un promoteur doit-il faire appel à un conseil fiscal sur un projet ?",
    study_11_fa2: "À l'acquisition, pas à la vente. Les droits d'enregistrement, la taxe sur la propriété bâtie et le traitement des plus-values sont bien plus faciles à anticiper au début d'un projet qu'à défaire à la fin. Une modélisation précoce permet aussi de structurer les contrats et le calendrier d'une manière que l'administration fiscale acceptera plutôt que de contester.",
    study_12_bottom: "La plupart des transactions qui échouent tardivement le font sur des éléments connaissables tôt : passifs non documentés, accords entre parties liées et revenus qui ne résistent pas à l'examen. Une startup qui réalise sa propre due diligence vendeur avant de se présenter au marché maîtrise le récit et conclut plus vite. Les surprises découvertes par l'acheteur coûtent bien plus cher que celles que vous trouvez vous-même.",
    study_12_fq1: "Qu'est-ce qui fait le plus souvent dérailler une acquisition transfrontalière dans les dernières étapes ?",
    study_12_fa1: "Les passifs hors bilan non documentés. Accords verbaux, obligations non enregistrées, conditions entre parties liées et passifs éventuels qui apparaissent pendant la due diligence érodent la confiance au pire moment. Le problème est rarement l'existence du passif ; c'est qu'il n'a pas été révélé, ce qui pousse l'acheteur à se demander ce qui est encore caché.",
    study_12_fq2: "Qu'est-ce que la due diligence vendeur et pourquoi la mener sur soi-même ?",
    study_12_fa2: "La due diligence vendeur est un examen indépendant qu'un vendeur commande sur sa propre entreprise avant une cession. Réalisée environ un an avant une sortie, elle fait remonter les points qu'un acheteur trouverait, vous laisse le temps de les corriger ou de les expliquer, et vous permet d'aborder les négociations avec des chiffres crédibles et pré-validés plutôt que de réagir aux conclusions de l'acheteur.",
    study_bottom_label: "L'Essentiel",
    study_faq_label: "Questions Fréquentes",
    study_1_bottom: "L'essentiel est une question de calendrier. Quels que soient les barèmes et les montants de TVA retenus pour 2026, les entreprises qui s'en sortent le mieux modélisent leur situation tôt, documentent leurs hypothèses et déposent leurs déclarations dans des délais resserrés plutôt que de réagir en fin d'exercice.",
    study_1_fq1: "Quand les changements de la fiscalité des entreprises pour 2026 entrent-ils en vigueur ?",
    study_1_fa1: "Ils s'appliquent à l'exercice fiscal défini par les décrets du ministère des Finances qui mettent en œuvre le budget. Comme les dates d'entrée en vigueur et les règles transitoires sont fixées par ces décrets et peuvent varier selon le type d'impôt, confirmez avec votre conseiller la date applicable à votre exercice plutôt que de supposer qu'elle coïncide avec l'année civile.",
    study_1_fq2: "Comment se préparer aux nouveaux délais de conformité à la TVA ?",
    study_1_fa2: "Raccourcissez votre clôture interne. Lorsque les délais de dépôt se resserrent, le goulot d'étranglement est généralement le rapprochement ; passez donc le rapprochement de la TVA collectée et déductible à un rythme mensuel et gardez les justificatifs prêts. Un test à blanc de tout le processus en milieu d'année révèle les lacunes tant qu'il est encore temps de les corriger.",
    study_2_bottom: "IFRS 18 ne modifie pas les montants de vos comptes ; elle change leur présentation et ce que vous devez justifier. Les groupes qui cartographient dès maintenant leur nouvelle répartition entre exploitation, investissement et financement, et qui formalisent la gouvernance de leurs mesures de performance de la direction, effectueront la transition sans précipitation.",
    study_2_fq1: "Quand IFRS 18 entre-t-elle en vigueur ?",
    study_2_fa1: "IFRS 18 s'applique aux exercices ouverts à compter du 1er janvier 2027, une application anticipée étant autorisée. La période comparative de vos premiers états établis selon IFRS 18 doit également être retraitée ; la fenêtre de préparation réelle est donc plus précoce que ne le laisse penser la date d'entrée en vigueur.",
    study_2_fq2: "Devons-nous désormais présenter nos indicateurs alternatifs de performance ?",
    study_2_fa2: "Si vous utilisez des mesures de performance de la direction, des sous-totaux publics non définis par les IFRS que vous employez pour communiquer sur la performance, IFRS 18 impose de les présenter dans une note unique, de les rapprocher du sous-total IFRS le plus proche et de les expliquer. En pratique, ils deviennent auditables ; le calcul et la gouvernance qui les sous-tendent doivent donc être solides.",
    study_3_bottom: "Dans un environnement à taux multiples, la valorisation tient moins à un chiffre exact qu'à une méthode transparente et cohérente. Acheteurs et prêteurs acceptent une fourchette lorsque les hypothèses qui la sous-tendent, quel taux, quelle base, quels ajustements, sont documentées et appliquées de façon constante. C'est l'ambiguïté, et non le taux lui-même, qui fait échouer les transactions.",
    study_3_fq1: "Quel taux de change utiliser pour valoriser les actifs et les passifs ?",
    study_3_fa1: "Aucun taux unique ne convient à tous les comptes ; l'approche défendable consiste à retenir une base adaptée à chaque élément, à la mentionner et à l'appliquer de manière cohérente. Ce qui compte pour un auditeur ou un acquéreur, c'est que le choix soit transparent et reproductible, non qu'il embellisse le bilan.",
    study_3_fq2: "Combien de temps avant une cession ou une levée de fonds faut-il lancer la valorisation ?",
    study_3_fa2: "Idéalement plusieurs mois à l'avance. Une valorisation crédible repose sur des comptes propres et rapprochés et sur une méthodologie documentée, et c'est en les réunissant sous la pression d'une transaction que surviennent les erreurs. Commencer tôt permet aussi de corriger les faiblesses que la due diligence d'un acheteur révélerait autrement.",
    study_4_bottom: "Le risque récurrent lié à la CNSS n'est pas le taux, mais le décalage entre le moment où les plafonds changent et celui où la paie s'ajuste. Les clients qui automatisent la mise à jour des paramètres de cotisation et rapprochent leurs déclarations chaque mois évitent les pénalités et les rappels qui frappent ceux qui appliquent encore les chiffres de l'an dernier.",
    study_4_fq1: "À quelle fréquence les plafonds de cotisation à la CNSS changent-ils ?",
    study_4_fa1: "Ils sont ajustés par les autorités en fonction de la conjoncture, et dans un environnement instable ces ajustements peuvent être fréquents et sans calendrier fixe. Comme les montants et les dates d'effet sont fixés par décret, vérifiez les paramètres de paie par rapport aux valeurs officielles en vigueur plutôt que de les supposer stables.",
    study_4_fq2: "Quelle est l'erreur de calcul CNSS la plus fréquente ?",
    study_4_fa2: "La mauvaise application du plafond lorsqu'une partie du salaire est versée en devises ou en nature. La déclaration doit refléter la bonne base au bon taux, et c'est dans le traitement manuel de cette répartition que se glissent les sous-déclarations. Un logiciel de paie intégré qui verrouille les paramètres en vigueur élimine l'essentiel du risque.",
    study_5_bottom: "Le reporting ESG passe d'un atout de réputation à une condition de financement. Les entreprises qui l'abordent dès maintenant comme un exercice de données et de gouvernance, plutôt que comme une opération de communication plus tard, satisferont les exigences des prêteurs et des partenaires sans heurts et disposeront de chiffres crédibles lorsque l'assurance des données ESG deviendra courante.",
    study_5_fq1: "Le reporting ESG est-il obligatoire pour les entreprises libanaises ?",
    study_5_fa1: "Il n'existe pas d'obligation locale générale unique, mais l'exigence provient de plus en plus du marché plutôt que de la loi : prêteurs internationaux, institutions de financement du développement et partenaires multinationaux conditionnent désormais financements et contrats à la publication d'informations ESG. Pour toute entreprise qui touche à ces capitaux, elle est de fait obligatoire.",
    study_5_fq2: "Quelle est la première étape concrète ?",
    study_5_fa2: "Créer un comité ESG interne et faire l'état des lieux de ce que vous mesurez déjà. La plupart des organisations disposent de plus de données pertinentes, sur l'énergie, les effectifs et la gouvernance, qu'elles ne le pensent ; le travail initial consiste à les organiser et à les valider, non à tout collecter de zéro.",
    study_6_bottom: "Le contrôle des prix de transfert récompense la préparation et sanctionne l'improvisation. Les groupes disposant d'une documentation établie en temps réel et d'une analyse fonctionnelle défendable traitent un contrôle comme une formalité ; ceux qui reconstruisent leur justification après un redressement s'exposent à des ajustements et à des pénalités. Constituez le dossier avant que l'administration ne le demande.",
    study_6_fq1: "Qu'est-ce que le principe de pleine concurrence ?",
    study_6_fa1: "Il exige que les transactions entre sociétés liées soient facturées comme si elles intervenaient entre parties indépendantes aux conditions du marché. Si un prix intragroupe diffère de ce qu'auraient convenu des parties non liées, l'administration peut le rectifier et imposer l'écart, d'où la nécessité d'une justification économique et pas seulement d'une politique interne.",
    study_6_fq2: "Quelle documentation justifie nos prix intragroupe ?",
    study_6_fa2: "Au minimum, une analyse fonctionnelle et des risques indiquant quelle entité fait quoi et supporte quels risques, une justification comparative des prix pratiqués et des accords intragroupe cohérents. Les principes de l'OCDE fixent le cadre ; l'objectif pratique est un dossier qui permet à un contrôleur de suivre votre raisonnement sans avoir à vous croire sur parole.",
    study_1_cat: "Conseil Fiscal",
    study_1_by: "Par le pôle Conseil Fiscal d'ESO",
    study_2_cat: "Audit et Certification",
    study_2_by: "Par le pôle Audit et Certification d'ESO",
    study_3_cat: "Conseil aux Entreprises",
    study_3_by: "Par le pôle Conseil aux Entreprises d'ESO",
    study_4_cat: "Comptabilité et Paie",
    study_4_by: "Par le pôle Comptabilité d'ESO",
    study_5_cat: "Audit et Certification",
    study_5_by: "Par le pôle Audit et Certification d'ESO",
    study_6_cat: "Conseil Fiscal",
    study_6_by: "Par le pôle Conseil Fiscal d'ESO",
    study_7_cat: "Conseil aux Entreprises",
    study_7_by: "Par le pôle Conseil aux Entreprises d'ESO",
    study_8_cat: "Conseil Fiscal",
    study_8_by: "Par le pôle Conseil Fiscal d'ESO",
    study_9_cat: "Audit et Certification",
    study_9_by: "Par le pôle Audit et Certification d'ESO",
    study_10_cat: "Conseil Fiscal",
    study_10_by: "Par le pôle Conseil Fiscal d'ESO",
    study_11_cat: "Conseil Fiscal",
    study_11_by: "Par le pôle Conseil Fiscal d'ESO",
    study_12_cat: "Conseil aux Entreprises",
    study_12_by: "Par le pôle Conseil aux Entreprises d'ESO",
    study_13_cat: "Audit et Certification",
    study_13_by: "Par le pôle Audit et Certification d'ESO",
    study_14_cat: "Conseil Fiscal",
    study_14_by: "Par le pôle Conseil Fiscal d'ESO",
    study_15_cat: "Audit et Certification",
    study_15_by: "Par le pôle Audit et Certification d'ESO",
    study_16_cat: "Conseil aux Entreprises",
    study_16_by: "Par le pôle Conseil aux Entreprises d'ESO",
    study_17_cat: "Conseil aux Entreprises",
    study_17_by: "Par le pôle Conseil aux Entreprises d'ESO",
    study_18_cat: "Audit et Certification",
    study_18_by: "Par le pôle Audit et Certification d'ESO",
    study_19_cat: "Conseil Fiscal",
    study_19_by: "Par le pôle Conseil Fiscal d'ESO",
    study_20_cat: "Audit et Certification",
    study_20_by: "Par le pôle Audit et Certification d'ESO",
    study_21_cat: "Audit et Certification",
    study_21_by: "Par le pôle Audit et Certification d'ESO",
    study_22_cat: "Conseil Fiscal",
    study_22_by: "Par le pôle Conseil Fiscal d'ESO",
    study_desc_budget: "Une étude complète sur les derniers décrets fiscaux pour l'optimisation des impôts.",
    study_title_budget_2026: "Analyse du Budget 2026 : Naviguer les Nouvelles Tranches d'Impôt",
    study_1_p1: "Le budget fiscal 2026 représente un changement significatif dans la stratégie d'imposition pour les entreprises au Liban.",
    study_1_p2: "L'une des mises à jour les plus critiques concerne le recalibrage des seuils d'imposition.",
    study_1_p3: "De plus, la mise en œuvre de la TVA a vu des délais de conformité plus stricts.",
    study_1_p4: "Nous conseillons à tous nos partenaires de procéder à un bilan de santé fiscal immédiat.",
    study_1_source: "Données dérivées des décrets officiels publiés par le Ministère des Finances.",
    study_title_ifrs18: "La Transition vers l'IFRS 18 : Ce Que les Entreprises MENA Doivent Savoir",
    study_desc_ifrs: "Un guide approfondi sur les changements de présentation et de divulgation requis par l'IFRS 18.",
    study_2_h2_1: "La Fin de l'IAS 1",
    study_2_p1: "L'IASB a officiellement déployé l'IFRS 18, remplaçant l'IAS 1.",
    study_2_h2_2: "Nouvelles Catégories de Compte de Résultat",
    study_2_p2: "L'IFRS 18 impose de nouvelles catégories strictes : Opérationnel, Investissement et Financement.",
    study_2_h2_3: "Mesures de Performance de la Direction",
    study_2_p3: "L'exigence de divulguer et d'auditer les Mesures de Performance est désormais obligatoire.",
    study_2_source: "Analyse basée sur les normes de l'International Accounting Standards Board (IASB).",
    study_title_valuation: "Stratégies de Valorisation face aux Taux de Change Multiples",
    study_desc_valuation: "Comment combler l'écart entre la valeur comptable historique et la réalité hyper-inflationniste.",
    study_3_h2_1: "La Crise de la Valorisation",
    study_3_p1: "L'évaluation de la véritable valeur nette des PME au Liban reste l'un des défis les plus complexes.",
    study_3_h2_2: "Combler l'Écart",
    study_3_p2: "Notre étude se concentre sur les méthodes de valorisation acceptables dans les économies hyper-inflationnistes.",
    study_3_h2_3: "Action Stratégique",
    study_3_p3: "Pour attirer les investissements étrangers, les entreprises locales doivent maintenir des registres parallèles en USD.",
    study_3_source: "Méthodologies d'évaluation sourcées de la Banque Mondiale et d'Ernst & Young.",
    study_title_nssf: "Conformité CNSS dans une Économie Hyper-Inflationniste",
    study_desc_nssf: "Stratégies de gestion des retenues salariales face à la fluctuation des taux de change.",
    study_4_p1: "Alors que la CNSS ajuste ses limites, les entreprises font face à des augmentations de charges.",
    study_4_p2: "Le défi principal réside dans le calcul des seuils CNSS sur des salaires multi-devises.",
    study_4_p3: "Nous recommandons d'adopter un système de paie intégré.",
    study_4_source: "Adapté des décrets du Ministère du Travail libanais.",
    study_title_esg: "Cadres de Reporting ESG pour les Entreprises Libanaises",
    study_desc_esg: "Pourquoi le reporting ESG devient obligatoire pour les entreprises locales.",
    study_5_p1: "Les critères ESG ne sont plus optionnels pour attirer les IDE.",
    study_5_p2: "Les prêteurs internationaux exigent désormais des analyses détaillées de l'empreinte carbone.",
    study_5_p3: "Les entreprises doivent établir un comité ESG interne.",
    study_5_source: "Directives de la Global Reporting Initiative (GRI).",
    study_title_transfer: "L'Examen des Prix de Transfert dans la Région MENA",
    study_desc_transfer: "Analyse des audits récents axés sur les transactions intersociétés.",
    study_6_p1: "Les autorités fiscales de la région MENA sévissent contre le transfert de bénéfices.",
    study_6_p2: "Le « principe de pleine concurrence » est désormais strictement appliqué.",
    study_6_p3: "Les entreprises doivent réaliser une analyse fonctionnelle et des risques.",
    study_6_source: "Cadre dérivé des principes de l'OCDE sur les prix de transfert.",
    study_title_distressed: "Restructuration d'Actifs en Difficulté",
    study_desc_distressed: "Manœuvres comptables pour sauver les actifs industriels.",
    study_7_p1: "Ce guide couvre les manœuvres nécessaires pour restructurer la dette.",
    study_7_p2: "Les échanges de dettes contre actions nécessitent des mesures complexes de juste valeur.",
    study_7_p3: "La direction doit engager une équipe d'évaluation tierce avant de négocier.",
    study_7_source: "Directives de conformité IFRS 9.",
    study_title_vat_bad: "Récupération de la TVA sur les Créances Douteuses au Liban",
    study_desc_vat_bad: "Comment récupérer légalement la TVA sur les factures impayées.",
    study_8_p1: "Les entreprises paient la TVA sur des factures qu'elles ne recouvreront jamais.",
    study_8_p2: "La loi fiscale libanaise permet la récupération, mais la charge de la preuve est élevée.",
    study_8_p3: "Nous conseillons de mettre en œuvre un protocole de délinquance strict à 90 jours.",
    study_8_source: "Directives de la Direction de la TVA du Ministère des Finances.",
    study_title_ai: "L'Impact de l'IA sur l'Audit Légal",
    study_desc_ai: "Comment l'intelligence artificielle modifie la détection des fraudes.",
    study_9_p1: "L'Intelligence Artificielle transforme rapidement le secteur de l'assurance.",
    study_9_p2: "Les outils d'IA peuvent ingérer 100% des transactions pour signaler instantanément les anomalies.",
    study_9_p3: "Les départements financiers doivent s'assurer que leurs systèmes ERP sont entièrement numérisés.",
    study_9_source: "Recherches du Groupe de Travail Technologique de l'IAASB.",
    study_title_holding: "Sociétés Holding : Stratégies d'Optimisation",
    study_desc_holding: "Évaluation des avantages fiscaux entre une Holding SAL libanaise et une entité Zone Franche aux EAU.",
    study_10_p1: "Pour les grandes fortunes familiales, structurer les investissements via une holding est vital.",
    study_10_p2: "Une SAL libanaise bénéficie d'exonérations spécifiques.",
    study_10_p3: "Le choix dépend du portefeuille principal.",
    study_10_source: "Analyse basée sur le Code de Commerce Libanais et la Loi Fiscale des EAU.",
    study_title_real_estate: "Naviguer dans le Paysage Fiscal Immobilier",
    study_desc_real_estate: "Planification fiscale pour les promoteurs concernant les impôts fonciers.",
    study_11_p1: "L'immobilier reste une valeur refuge.",
    study_11_p2: "Ne pas déclarer la véritable valeur en USD peut mener à des enquêtes pour évasion fiscale.",
    study_11_p3: "Les promoteurs doivent s'assurer que tous les contrats précisent clairement la devise.",
    study_11_source: "Directives officielles de la Direction Générale des Affaires Foncières.",
    study_title_dd: "Pièges de la Due Diligence dans les M&A Transfrontalières",
    study_desc_dd: "Les angles morts courants lors de l'acquisition de startups technologiques locales.",
    study_12_p1: "Le processus de due diligence financière a révélé des angles morts opérationnels constants.",
    study_12_p2: "La principale cause d'échec des acquisitions est la présence de passifs hors bilan non documentés.",
    study_12_p3: "Les startups doivent commander un audit de due diligence vendeur 12 mois avant l'opération.",
    study_12_source: "Données agrégées des transactions de conseil d'ESO.",
    study_title_cyber: "Risques de Cybersécurité dans l'Information Financière",
    study_desc_cyber: "L'intégrité des états financiers dépend de la sécurité des données.",
    study_13_p1: "L'évaluation du protocole de cybersécurité est désormais une phase obligatoire de l'audit.",
    study_13_p2: "Les attaques par ransomware peuvent détruire l'intégrité des états financiers.",
    study_13_p3: "Les entreprises doivent mettre en œuvre un accès strict basé sur les rôles.",
    study_13_source: "Directives de l'ISACA et normes ISA 315.",
    study_title_offshore: "Incorporation Offshore : Liban vs Chypre",
    study_desc_offshore: "Étude comparative sur les taux d'imposition et la conformité bancaire.",
    study_14_p1: "Décider où s'incorporer est un choix stratégique pour les prestataires de services.",
    study_14_p2: "Le Liban offre une facilité de formation, mais souffre des restrictions bancaires mondiales.",
    study_14_p3: "Si le marché cible est la zone euro, l'accès bancaire chypriote l'emporte.",
    study_14_source: "Traités de fiscalité transfrontalière et directives de conformité AML de la BCE.",
    study_title_crypto: "Valorisation des Cryptomonnaies pour les Audits",
    study_desc_crypto: "Comment évaluer correctement ces actifs numériques selon les normes IFRS.",
    study_15_p1: "Les auditeurs s'efforcent d'évaluer correctement les actifs numériques.",
    study_15_p2: "L'IFRS considère actuellement les cryptomonnaies comme des actifs incorporels.",
    study_15_p3: "Les trésoreries doivent conserver des journaux méticuleux des adresses de portefeuilles.",
    study_15_source: "Interprétation IFRIC sur les cryptomonnaies et IAS 38.",
    study_title_wc: "Optimisation du Fonds de Roulement",
    study_desc_wc: "Stratégies de modélisation des flux de trésorerie pour préserver la liquidité.",
    study_16_p1: "Les perturbations mondiales exigent une modélisation robuste des flux de trésorerie.",
    study_16_p2: "Le cycle du fonds de roulement doit être géré activement.",
    study_16_p3: "Mettre en œuvre une prévision des flux de trésorerie glissante sur 13 semaines.",
    study_16_source: "Livres blancs de modélisation financière d'ESO.",
    study_title_cfo: "Le Rôle du CFO Externalisé pour les PME en Croissance",
    study_desc_cfo: "Pourquoi les entreprises familiales se tournent vers un leadership financier fractionné.",
    study_17_p1: "Nous analysons la tendance croissante au leadership financier fractionné dans la région MENA.",
    study_17_p2: "Un CFO externalisé fournit une stratégie de haut niveau à une fraction du coût.",
    study_17_p3: "Les PME cherchant des capitaux externes devraient engager un CFO externalisé.",
    study_17_source: "Tendances de l'industrie rapportées par l'Institute of Management Accountants (IMA).",
    study_title_ngo: "Exigences de Gouvernance pour les ONG",
    study_desc_ngo: "Exigences d'audit pour sécuriser le financement des agences donatrices.",
    study_18_p1: "Les agences donatrices internationales exigent une transparence absolue.",
    study_18_p2: "Les donateurs exigent l'assurance que leur injection de capital a été utilisée exclusivement pour le projet.",
    study_18_p3: "Nous conseillons aux conseils d'administration des ONG d'établir un comité d'audit indépendant.",
    study_18_source: "Directives de conformité des subventions de l'USAID.",
    careers_title: "Construisez Votre Carrière",
    careers_subtitle: "Rejoignez une équipe de professionnels motivés.",
    careers_why_choose: "Pourquoi Nous Choisir ?",
    careers_culture: "Une Culture d'Excellence.",
    careers_p1: "Chez ESO, nous investissons massivement dans nos employés.",
    careers_p2: "Que vous soyez un auditeur chevronné ou un brillant étudiant universitaire, ESO vous fournit la plateforme idéale.",
    careers_open_positions: "Postes Ouverts",
    careers_current_opps: "Opportunités Actuelles",
    careers_desc_senior: "Rôle à temps plein pour les professionnels ayant plus de 3 ans d'expérience.",
    apply_below: "Postuler Ci-dessous",
    careers_desc_tax: "Rôle d'aide à la navigation dans les réglementations fiscales complexes.",
    careers_desc_intern: "Programme rigoureux de 3 mois pour les étudiants universitaires.",
    careers_submit_app: "Soumettre Votre Candidature",
    careers_ready_step: "Prêt à franchir la prochaine étape ? Remplissez le formulaire.",
    careers_ensure_cv: "Assurez-vous que votre CV est à jour au format PDF. Nous répondons généralement sous 3 à 5 jours.",
    placeholder_full_name: "Nom Complet",
    placeholder_email: "Adresse Email",
    opt_select_pos: "Sélectionnez le Poste",
    opt_general_app: "Candidature Spontanée",
    opt_summer_intern: "Stage d'été",
    opt_senior_auditor: "Auditeur Senior",
    opt_tax_associate: "Associé Fiscaliste",
    date_mar18: "18 Mars 2026",
    date_feb28: "28 Février 2026",
    date_jan15: "15 Janvier 2026",
    date_dec10: "10 Décembre 2025",
    date_nov22: "22 Novembre 2025",
    date_oct05: "05 Octobre 2025",
    date_sep18: "18 Septembre 2025",
    date_aug30: "30 Août 2025",
    date_jul12: "12 Juillet 2025",
    date_jun25: "25 Juin 2025",
    date_may14: "14 Mai 2025",
    date_apr08: "08 Avril 2025",
    date_mar20: "20 Mars 2025",
    date_feb11: "11 Février 2025",
    date_jan29: "29 Janvier 2025",
    date_dec15: "15 Décembre 2024",
    date_nov03: "03 Novembre 2024",
    date_oct18: "18 Octobre 2024",
    upload_cv: "Télécharger CV/Resume (PDF/DOCX):",
    placeholder_cover_letter: "Lettre de motivation (Optionnel)",
    submit_application: "Soumettre",
    portal_title: "Portail Client",
    portal_subtitle: "Commencez votre transformation stratégique aujourd'hui.",
    portal_reach_out: "Nous Contacter",
    portal_lets_discuss: "Discutons de votre avenir financier.",
    portal_desc: "Connectez-vous avec notre équipe de conseil pour découvrir comment nous pouvons vous aider.",
    portal_hq: "Siège Social",
    po_box: "B.P :",
    portal_phone: "Téléphone",
    portal_email: "Email",
    portal_send_msg: "Envoyer un Message",
    placeholder_corp_email: "Email professionnel",
    placeholder_subject: "Sujet / Type de demande",
    placeholder_describe: "Décrivez votre défi stratégique...",
    portal_submit_inquiry: "Soumettre la Demande",
    footer_desc: "Des choix intelligents, des solutions intelligentes.",
    footer_nav_title: "Navigation",
    footer_connect_title: "Connecter",
    footer_contact: "Contact",
    footer_rights: "Tous droits réservés.",
    trust_title: "Un cabinet sur lequel bâtir",
    trust_sub: "Un quart de siècle d'expertise en audit, fiscalité et conseil, fondé sur des faits, pas des adjectifs.",
    trust_years_label: "Ans d'existence",
    trust_years_desc: "Un conseil de confiance depuis 2001, à travers tous les cycles qu'a connus le Liban.",
    trust_standards_label: "Normes mondiales",
    trust_standards_desc: "Audits selon les Normes Internationales d'Audit (ISA) ; reporting selon les IFRS.",
    trust_sector_label: "Expertise sectorielle",
    trust_sector_desc: "Une spécialisation reconnue dans la restauration (F&B), parmi plus de 15 secteurs servis.",
    trust_lacpa_label: "Agréé et enregistré",
    trust_lacpa_desc: "Membre de l'Association Libanaise des Experts-Comptables (LACPA).",
    trust_footnote: "Des missions dirigées par les associés, avec une confidentialité et une indépendance strictes à chaque mandat.",
    date_jul10_26: "10 Juillet 2026",
    date_jun20_26: "20 Juin 2026",
    date_may15_26: "15 Mai 2026",
    date_apr08_26: "08 Avril 2026",
    study_title_midyear: "Revue de conformité mi-2026 : points de contrôle fiscaux et CNSS",
    study_desc_midyear: "Une check-list pratique de mi-année couvrant les acomptes d'impôt, les cycles de TVA et les déclarations CNSS pour éviter les pénalités de fin d'année.",
    study_19_p1: "Le premier semestre 2026 a apporté des délais de dépôt plus stricts et des plafonds CNSS révisés. Une revue structurée de mi-année permet de rectifier le tir avant la ruée des audits de fin d'année, plutôt que de découvrir des expositions en décembre.",
    study_19_p2: "Les écarts les plus fréquents à mi-année sont des positions de TVA trimestrielles mal alignées, des déclarations CNSS non rapprochées entre paies en USD « fresh » et en monnaie locale, et des acomptes d'impôt calculés sur d'anciennes tranches. Chacun se transforme en pénalités s'il est laissé au quatrième trimestre.",
    study_19_p3: "Nous conseillons à chaque client de réaliser dès maintenant un bilan documenté du premier semestre : rapprocher la TVA, confirmer les plafonds CNSS selon les dernières circulaires et recalculer les acomptes sur les tranches 2026. Corriger en juillet coûte une fraction du coût d'une correction sous audit.",
    study_19_source: "D'après le calendrier de dépôt 2026 du Ministère des Finances (Liban) et les circulaires de cotisation CNSS en vigueur.",
    study_title_ifrs19: "IFRS 19 : informations simplifiées pour les filiales éligibles",
    study_desc_ifrs19: "Comment les filiales sans obligation d'information du public peuvent réduire le volume d'informations selon l'IFRS 19 tout en restant conformes, avant l'entrée en vigueur en 2027.",
    study_20_p1: "Après l'IFRS 18, l'IASB a publié l'IFRS 19, qui permet aux filiales éligibles d'appliquer des obligations d'information nettement réduites tout en conservant la comptabilisation et l'évaluation IFRS. Pour les groupes MENA à plusieurs filiales, l'effort de reporting peut être sensiblement réduit.",
    study_20_p2: "Une filiale est éligible si elle n'a pas d'obligation d'information du public et si sa société mère prépare des états financiers consolidés IFRS. L'allègement porte uniquement sur les notes, la comptabilisation et l'évaluation restent inchangées. Le choix se fait entité par entité.",
    study_20_p3: "Nous recommandons aux groupes d'identifier dès maintenant les filiales éligibles et de modéliser l'ensemble réduit d'informations avant 2027, afin que l'adoption soit planifiée. L'application anticipée est permise et peut simplifier la clôture 2026 des entités éligibles.",
    study_20_source: "D'après l'IFRS 19 « Filiales sans obligation d'information du public : informations à fournir », publiée par l'International Accounting Standards Board (IASB).",
    study_title_gaplaw: "Comptabiliser la récupération des dépôts dans le cadre de la loi sur l'écart financier",
    study_desc_gaplaw: "Des conseils pratiques pour évaluer, provisionner et présenter les dépôts bancaires bloqués à mesure que les mécanismes de récupération se précisent.",
    study_21_p1: "À mesure que le cadre de traitement des pertes du secteur bancaire progresse, les entreprises détenant des dépôts bancaires bloqués font face à une question pressante : à quelle valeur inscrire ces dépôts au bilan ? Les maintenir à leur valeur nominale surévalue des actifs qui ne sont peut-être que partiellement récupérables.",
    study_21_p2: "Selon l'IFRS 9, ces dépôts sont des actifs financiers soumis à l'évaluation des pertes de crédit attendues. Les mécanismes de récupération émergents, paiements échelonnés, traitement par tranches et conversions d'instruments, modifient l'échéancier et le montant des flux attendus, et donc la provision pour dépréciation. Les auditeurs examineront de près les hypothèses retenues.",
    study_21_p3: "Nous conseillons de documenter un modèle de dépréciation défendable, lié aux modalités de récupération publiées, et de présenter clairement le jugement et sa sensibilité dans les notes. La transparence protège à la fois l'opinion d'audit et la crédibilité de la direction auprès des prêteurs.",
    study_21_source: "Analyse selon l'IFRS 9 (Instruments financiers) dans le contexte des orientations publiées sur le cadre de redressement du secteur bancaire libanais.",
    study_title_einvoice: "Le passage à la facturation électronique : se préparer à la TVA numérique",
    study_desc_einvoice: "Pourquoi la facturation électronique obligatoire arrive dans la région, et les changements de systèmes, de données et de processus à engager dès maintenant.",
    study_22_p1: "La facturation électronique est passée d'optionnelle à obligatoire dans une grande partie de la région MENA, et la tendance est claire pour le Liban. Les entreprises qui la traitent comme un projet informatique de dernière minute plutôt que comme une transformation financière auront du mal.",
    study_22_p2: "La facturation électronique change bien plus que le format : elle exige des données structurées et lisibles par machine, un reporting quasi en temps réel à l'administration, et une discipline accrue sur les données de référence (numéros fiscaux, codes produits, traitement TVA). Les systèmes manuels ou anciens sont le principal obstacle.",
    study_22_p3: "Nous recommandons d'auditer dès maintenant les capacités de facturation et d'ERP, de nettoyer les données de référence et de piloter un flux conforme avant toute obligation. Les entreprises qui se préparent tôt gagnent en conformité, en rapidité de rapprochement et en réduction des litiges de TVA.",
    study_22_source: "Cadre inspiré des déploiements régionaux de facturation électronique (CCG) et des normes internationales de déclaration numérique de la TVA."
  },

  ar: {
    nav_home: "الرئيسية",
    nav_about: "من نحن",
    nav_services: "خدماتنا",
    nav_clients: "عملاؤنا",
    nav_lebanon_insights: "رؤى السوق اللبناني",
    nav_market_guide: "دليل السوق",
    nav_mof_decrees: "القوانين والمراسيم",
    nav_news: "الأخبار",
    nav_careers: "الوظائف",
    nav_client_portal: "بوابة العملاء",
    nav_study: "دراسة",
    hero_eso_advisory: "إي إس أو للاستشارات",
    hero_bridging: "نربط الواقع بما يمكن تحقيقه.",
    hero_firm_expertise: "خبرات وموارد الشركة",
    hero_audit_assurance: "التدقيق والتأكيد",
    hero_tax_advisory: "الاستشارات الضريبية",
    hero_accounting: "المحاسبة",
    hero_consulting: "الاستشارات الإدارية",
    hero_fb_specialty: "تخصص قطاع المطاعم",
    hero_mof_decrees: "القوانين والمراسيم",
    hero_schedule_consultation: "احجز استشارة",
    hero_latest_insights: "أحدث الرؤى",
    hero_recent_studies: "أحدث الدراسات وتحليلات السوق.",
    hero_market_intelligence: "ذكاء السوق",
    hero_view_all_news: "عرض جميع الأخبار",
    home_who_we_are: "من نحن",
    home_integrity: "النزاهة في كل التفاصيل",
    home_eso_full_service: "شركة ESO هي شركة خدمات متكاملة تخدم العملاء عالمياً.",
    home_discover_firm: "اكتشف شركتنا",
    home_our_expertise: "خبرتنا",
    home_big_4_standards: "معايير الشركات الكبرى. مرونة استثنائية.",
    home_from_rigorous: "من التدقيق القانوني الصارم إلى الهيكلة الضريبية المعقدة، نقدم طيفاً كاملاً من الخدمات.",
    home_explore_services: "استكشف خدماتنا",
    home_career_opportunities: "فرص العمل",
    home_build_career: "ابنِ مسيرتك المهنية معنا",
    home_believe_diverse: "نحن نؤمن بأهمية تنوع بيئة العمل.",
    home_view_open_positions: "عرض الوظائف المتاحة",
    about_title: "عن شركة ESO",
    about_subtitle: "مساعدة المهنيين بدقة ووضوح ومعايير لا تقبل المساومة.",
    about_standard_subtitle: "معيار ESO",
    about_bridging: "نربط الواقع بما يمكن تحقيقه.",
    about_full_service: "نحن ملتزمون بتقديم إرشادات احترافية مخصصة.",
    about_whether_multinational: "سواء كنت شركة متعددة الجنسيات أو مؤسسة متنامية، فإن مستشارينا الخبراء يعملون كامتداد لفريقك.",
    about_our_people: "فريقنا",
    about_discover_team: "تعرف على خبرائنا",
    about_behind_every: "وراء كل رؤية استراتيجية وتدقيق خالٍ من الأخطاء فريق من المحترفين المتفانين.",
    about_meet_experts: "التقِ بالخبراء",
    adv_subtitle: "ميزة ESO",
    adv_why_choose: "لماذا يختارنا شركاؤنا",
    adv_proactive_title: "استراتيجية استباقية",
    adv_proactive_desc: "نحن لا نكتفي بالإبلاغ عن الماضي؛ نحن نصمم المستقبل.",
    adv_compliance_title: "الامتثال المطلق",
    adv_compliance_desc: "نقضي على النقاط العمياء التنظيمية.",
    adv_local_title: "خبرة محلية معمقة",
    adv_local_desc: "المعايير العالمية تلتقي بالرؤية المحلية.",
    clients_title: "عملاؤنا",
    clients_subtitle: "نخدم مجموعة متنوعة من الصناعات والمنظمات.",
    clients_intro: "يفخر عملاؤنا بأنهم من بين الأبرز محلياً ودولياً في مختلف القطاعات:",
    client_fb: "الأغذية والمشروبات",
    client_manufacturing: "الصناعات التحويلية",
    client_contracting: "المقاولات والتطوير العقاري",
    client_transportation: "النقل والشحن",
    client_automotive: "السيارات والوكالات وتأجير السيارات",
    client_media: "الإعلام والإعلان",
    client_hospitality: "الفنادق والضيافة",
    client_printing: "المطابع",
    client_trading: "التجارة والخدمات",
    client_public_works: "الأشغال العامة",
    client_commercial: "التمثيل التجاري",
    client_bottling: "صناعات التعبئة",
    client_healthcare: "الرعاية الصحية",
    client_oil: "صناعة النفط",
    client_financial: "الخدمات المالية والوساطة",
    client_venture: "صناديق الاستثمار الجريء",
    client_hightech: "الشركات التقنية الناشئة",
    client_ngo: "المنظمات غير الحكومية الدولية",
    fb_breadcrumb: "قطاع المطاعم",
    fb_page_title: "قطاع الأغذية والمشروبات",
    back_to_clients: "العودة للعملاء →",
    fb_core_specialty: "تخصصنا الأساسي",
    fb_financial_engine: "المحرك المالي لقطاع الضيافة",
    fb_lead_text: "ما يقرب من 70٪ من عملائنا يعملون في هذا القطاع الحيوي.",
    fb_unforgiving: "صناعة المطاعم لا ترحم؛ فالهوامش ضئيلة وتكاليف الإمداد متقلبة.",
    fb_specialized_caps: "قدراتنا المتخصصة في القطاع",
    fb_inventory_title: "إدارة المخزون والعوائد",
    fb_inventory_desc: "ننفذ أنظمة تتبع صارمة للمواد الغذائية.",
    fb_pos_title: "تسوية نقاط البيع وتطبيقات التوصيل",
    fb_pos_desc: "نقوم بدمج بيانات نقاط البيع مع سجلاتك النهائية.",
    fb_franchise_title: "تدقيق الامتيازات والفروع",
    fb_franchise_desc: "نجري عمليات تدقيق شاملة لضمان الالتزام.",
    fb_labor_title: "تحسين تكاليف العمالة والضرائب",
    fb_labor_desc: "نقوم بتحسين هياكل الرواتب لتظل متوافقة قانونياً.",
    fb_ready_scale: "هل أنت مستعد لتوسيع نطاق عملك؟",
    fb_stop_guessing: "توقف عن تخمين تكاليفك.",
    fb_consult_team: "استشر فريق المطاعم لدينا",
    fb_why_title: "لماذا يتطلب قطاع الضيافة خبيراً متخصصاً",
    fb_why_p1: "المطعم ليس مجرد عمل تجاري عادي أُضيف إليه مطبخ. فهو يقوم على أحجام معاملات كبيرة، ومخزون قابل للتلف يفقد قيمته ساعةً بعد ساعة، وتعامل واسع بالنقد، وعمالة متغيرة تعمل بنظام الورديات والإكراميات، وإيرادات موزّعة بين تناول الطعام في المكان والطلبات الخارجية وخدمات التموين ومجموعة متغيرة من منصات التوصيل. المحاسب العام يسجّل كل ذلك بعد وقوعه، أما المتخصص فيدير الروافع التي تحدد ما إذا كان المفهوم سيصمد في عامه الثاني.",
    fb_why_p2: "تتمحور ممارستنا في قطاع المطاعم حول التكلفة الأولية، أي مجموع تكاليف الطعام والمشروبات والعمالة، لأنها الرقم الأكثر موثوقية في التنبؤ ببقاء المنشأة. نتابعها مقابل المبيعات على أساس أسبوعي بدلاً من انتظار نهاية السنة، بحيث تظهر المشكلات بينما لا يزال هناك وقت لمعالجتها.",
    fb_approach_title: "كيف نعمل مع مجموعات المطاعم",
    fb_step1_t: "١. تشخيص التكلفة الأولية",
    fb_step1_d: "نضع خط أساس لتكاليف الطعام والمشروبات والعمالة مقابل الإيرادات، قناةً بقناة، لكشف المكان الذي تتسرّب منه الأرباح بدقة.",
    fb_step2_t: "٢. دمج الأنظمة ونقاط البيع",
    fb_step2_d: "نربط نظام نقاط البيع والمخزون والمحاسبة لديك بحيث تتم تسوية الإيرادات وعمليات الإلغاء والخصومات تلقائياً بدلاً من التسوية اليدوية.",
    fb_step3_t: "٣. الضوابط والتقارير",
    fb_step3_d: "نُرسي ضوابط للتعامل النقدي والمشتريات والمخزون، ثم نقدّم تقارير إدارية يستطيع المشغّل التصرّف بناءً عليها فعلياً.",
    fb_step4_t: "٤. الجاهزية للتدقيق والتوسّع",
    fb_step4_d: "نُعدّ قوائم مالية جاهزة للامتياز التجاري وللمستثمرين، حتى تتمكن من افتتاح الفرع التالي أو استقطاب شريك بسجلات نظيفة.",
    fb_faq_title: "قطاع المطاعم: الأسئلة الشائعة",
    fb_faq_q1: "كيف تختلف محاسبة المطاعم عن محاسبة الأعمال الاعتيادية؟",
    fb_faq_a1: "الفرق يكمن في السرعة والتفصيل. تُصرّف المطاعم مخزوناً قابلاً للتلف يومياً وتحقق إيرادات عبر عدة قنوات في آنٍ واحد، لذا يجب قياس التكاليف أسبوعياً مقابل المبيعات لا تلخيصها مرة واحدة في السنة. فالتكلفة الأولية وضوابط النقد والتسوية قناةً بقناة أهم بكثير مما هي عليه في تجارة التجزئة أو الأعمال الخدمية المعتادة.",
    fb_faq_q2: "كيف تُسوّون الإيرادات الواردة من منصات التوصيل؟",
    fb_faq_a2: "تدفع منصات التوصيل مبالغ صافية بعد خصم العمولة والعروض والتعديلات، وغالباً وفق جدولها الزمني الخاص الذي نادراً ما يطابق ما سجّلته نقاط البيع. نقوم بمطابقة تقارير مدفوعات كل منصة مع مبيعات نقاط البيع والإيداعات المصرفية، بحيث تُحدَّد العمولات وعمليات ردّ المبالغ والتسويات المفقودة بدلاً من ذوبانها ضمن تكاليف أخرى.",
    fb_faq_q3: "هل يمكنكم دعم امتياز تجاري أو توسّع متعدد الفروع؟",
    fb_faq_a3: "نعم. نتولّى الامتثال المتعلق بالإتاوات ورسوم التسويق لمانحي الامتياز والحاصلين عليه على حد سواء، ونوحّد تقارير الفروع المتعددة، ونوحّد دليل الحسابات بين الفروع بحيث يُقاس كل موقع بالطريقة نفسها. هذا الاتساق هو ما يجعل التوسّع قابلاً للتمويل.",
    fb_faq_q4: "هل تتولّون الضمان الاجتماعي والرواتب للعاملين بنظام الورديات في قطاع الضيافة؟",
    fb_faq_a4: "نعم. نصمّم الرواتب للعاملين المتغيرين وبنظام الورديات والإكراميات بما يحافظ على الامتثال للضمان الاجتماعي وقوانين العمل وفق المعدلات القانونية السارية، مع إبقاء المعالجة قابلة للدفاع عنها في التدقيق. كما نفصل معالجة ضريبة القيمة المضافة التي تختلف بين الخدمة داخل المكان والمنتجات المعبّأة.",
    team_breadcrumb: "فريقنا",
    team_title: "القيادة والخبراء",
    team_subtitle: "عقود من الخبرة المالية العالمية والمحلية.",
    team_firm_leadership: "قيادة الشركة",
    team_our_staff: "موظفونا",
    team_leadership_desc: "مع أكثر من ربع قرن من الخبرة في مجال التدقيق والاستشارات منذ عام 2001، لا تزال ESO مستمرة بقوة.",
    role_founder: "المؤسس والرئيس التنفيذي",
    desc_founder: "يتمتع بـ 25 عاماً من الخبرة غير المسبوقة في الاستشارات والتدقيق.",
    team_advisory_mgmt: "الإدارة والاستشارات",
    team_advisory_desc: "توجيه الاستراتيجية وضمان الامتثال المطلق.",
    role_head_tax: "رئيس الاستشارات الضريبية",
    desc_karim: "متخصص في قرارات وزارة المالية اللبنانية وهياكل ضريبة القيمة المضافة.",
    role_dir_consulting: "مديرة الاستشارات",
    desc_layla: "خبيرة في إعادة الهيكلة التشغيلية وتقييم الشركات.",
    role_tax_manager: "مدير الضرائب",
    desc_jad: "يدير الامتثال للضمان الاجتماعي وتسويات أسعار الصرف.",
    role_audit_manager: "مديرة التدقيق",
    desc_nour: "متخصصة في تدقيق قطاع الرعاية الصحية والمنظمات غير الحكومية.",
    team_senior_associates: "المدققون والمحللون الأوائل",
    team_senior_desc: "المحرك التحليلي لشركتنا.",
    role_senior_auditor: "مدقق أول",
    desc_tarek: "أكثر من 5 سنوات من الخبرة. يقود فرق التدقيق الميداني.",
    role_senior_auditor_2: "مدققة أولى",
    desc_maya: "متخصصة في تدقيق قطاع التجزئة ومحاسبة المخزون.",
    role_senior_fin_analyst: "محلل مالي أول",
    desc_omar: "خبير في بناء النماذج المالية في ظل التضخم المفرط.",
    role_tax_associate: "مستشارة ضريبية",
    desc_zeina: "تعد الإقرارات الضريبية وتتعامل مع اتصالات وزارة المالية.",
    team_associates_admin: "الموظفون والإدارة",
    team_associates_desc: "دعم العمليات اليومية السلسة.",
    role_junior_auditor: "مدقق مبتدئ",
    desc_samer: "خريج حديث يقوم بإجراءات تحليلية لعملاء التدقيق.",
    role_junior_auditor_2: "مدققة مبتدئة",
    desc_clara: "تساعد في صياغة البيانات المالية والتنفيذ الميداني.",
    role_junior_consultant: "مستشار مبتدئ",
    desc_rami: "يدعم الفريق في أبحاث السوق والعروض التقديمية.",
    role_office_admin: "مديرة المكتب",
    desc_yara: "تضمن سير العمليات اليومية بسلاسة.",
    services_title: "خبرات الشركة",
    services_subtitle: "حلول احترافية مصممة للشركات الحديثة.",
    services_global_standards: "معايير عالمية",
    services_comprehensive: "حلول مالية شاملة.",
    services_we_provide: "نقدم الطيف الكامل من خدمات المحاسبة والاستشارات.",
    services_select_service: "اختر خدمة أدناه لاكتشاف كيف يمكن لفرق الخبراء لدينا تحسين عملياتك.",
    services_4_pillars: "ركائزنا الأربع الأساسية",
    services_explore_services: "استكشف خدماتنا",
    card_audit_title: "التدقيق والتأكيد",
    card_audit_desc: "عمليات التدقيق القانونية لضمان النزاهة المطلقة.",
    card_tax_title: "الاستشارات الضريبية",
    card_tax_desc: "التخطيط الضريبي الاستراتيجي والامتثال والدفاع أثناء المراجعات.",
    card_acc_title: "المحاسبة",
    card_acc_desc: "مسك الدفاتر الشامل ومعالجة الرواتب وتسوية العملات.",
    card_cons_title: "الاستشارات",
    card_cons_desc: "عمليات الفحص النافي للجهالة وتقييم المؤسسات وإعادة الهيكلة.",
    audit_breadcrumb: "التدقيق والتأكيد",
    audit_page_title: "التدقيق والتأكيد",
    back_to_services: "العودة للخدمات →",
    audit_unwavering: "نزاهة وثقة لا تتزعزع",
    audit_intro: "يتطلب المشهد المالي المعقد شفافية مطلقة.",
    audit_core_services: "خدمات التدقيق الأساسية",
    audit_li1_strong: "التدقيق القانوني والمستقل:",
    audit_li1_desc: "تدقيق شامل للبيانات المالية وفقاً لمعايير التدقيق الدولية.",
    audit_li2_strong: "الامتثال لمعايير IFRS:",
    audit_li2_desc: "توجيه خبير حول اعتماد المعايير الدولية لإعداد التقارير المالية.",
    audit_li3_strong: "مراجعة الرقابة الداخلية:",
    audit_li3_desc: "تقييم منهجي للضوابط الداخلية لتحديد نقاط الضعف.",
    audit_li4_strong: "الإجراءات المتفق عليها:",
    audit_li4_desc: "تحقيقات مستهدفة في بيانات مالية محددة.",
    audit_conclusion: "نحن نستخدم عملية التدقيق للكشف عن أوجه القصور التشغيلية الخفية.",
    ready_elevate: "هل أنت مستعد للارتقاء بشركتك؟",
    contact_advisory: "اتصل بفريق الاستشارات لمناقشة كيفية مساعدتك.",
    get_in_touch: "تواصل معنا",
    tax_breadcrumb: "الاستشارات الضريبية",
    tax_page_title: "الاستشارات الضريبية",
    tax_optimizing: "تحسين الالتزامات. ضمان الامتثال.",
    tax_intro: "يتطلب المشهد الضريبي سريع التغير نهجاً استباقياً ومتخصصاً.",
    tax_comprehensive: "استراتيجيات ضريبية شاملة",
    tax_li1_strong: "التخطيط لضريبة الشركات:",
    tax_li1_desc: "نمذجة استراتيجية لتحسين معدل الضريبة الفعلي الخاص بك.",
    tax_li2_strong: "الامتثال لضريبة القيمة المضافة:",
    tax_li2_desc: "الحساب الدقيق وإعادة الهيكلة لمنع اختناقات التدفق النقدي.",
    tax_li3_strong: "استشارات قرارات وزارة المالية:",
    tax_li3_desc: "إرشادات في الوقت الفعلي حول تنفيذ أحدث المراسيم الضريبية.",
    tax_li4_strong: "الدفاع في التدقيق الضريبي:",
    tax_li4_desc: "تمثيل قوي ودفاع أثناء عمليات تفتيش السلطات الضريبية.",
    tax_conclusion: "سواء كنت شركة صغيرة أو متعددة الجنسيات، يقدم خبراؤنا الوضوح لحماية أرباحك.",
    acc_breadcrumb: "المحاسبة",
    acc_page_title: "خدمات المحاسبة",
    acc_precision: "دقة في كل سجل",
    acc_intro: "المحاسبة الخالية من العيوب هي شريان الحياة لأي مؤسسة.",
    acc_capabilities: "قدراتنا المحاسبية",
    acc_li1_strong: "مسك الدفاتر الشامل:",
    acc_li1_desc: "تسجيل دقيق ويومي لجميع المعاملات المالية.",
    acc_li2_strong: "إدارة الرواتب والضمان:",
    acc_li2_desc: "معالجة سرية ومتوافقة للرواتب والتصريحات.",
    acc_li3_strong: "تسوية العملات المتعددة:",
    acc_li3_desc: "إدارة متخصصة للحسابات العاملة بأسعار صرف متقلبة.",
    acc_li4_strong: "التقارير الإدارية:",
    acc_li4_desc: "لوحات معلومات مالية مخصصة توفر رؤى واضحة.",
    acc_conclusion: "نحن لا نحتفظ بدفاترك فحسب؛ بل نُحدث وظيفتك المالية بالكامل.",
    cons_breadcrumb: "الاستشارات",
    cons_page_title: "الاستشارات الإدارية",
    cons_architecting: "هندسة النمو الاستراتيجي",
    cons_intro: "عندما تواجه المؤسسات نقاط تحول حاسمة، يقدم فريق الاستشارات لدينا الخبرة المتخصصة المطلوبة.",
    cons_solutions: "حلول استشارية استراتيجية",
    cons_li1_strong: "الفحص النافي للجهالة:",
    cons_li1_desc: "تدقيق مالي وضريبي صارم لمعاملات الدمج والاستحواذ.",
    cons_li2_strong: "تقييم الشركات:",
    cons_li2_desc: "تقييمات موضوعية ومتقدمة باستخدام نماذج التدفقات النقدية المخصومة.",
    cons_li3_strong: "خدمات المدير المالي الخارجي:",
    cons_li3_desc: "قيادة مالية عالية المستوى على أساس جزئي.",
    cons_li4_strong: "إعادة الهيكلة التشغيلية:",
    cons_li4_desc: "تقييم وإعادة تصميم سير العمل الداخلي لزيادة الكفاءة.",
    cons_conclusion: "مستشارونا لا يقدمون النصيحة فحسب؛ بل ينفذونها معك.",
    guide_page_title: "ممارسة الأعمال في لبنان",
    guide_subtitle: "دليل عملي لهيكلة الأعمال في لبنان وإدارتها والامتثال الضريبي فيها، وفق المعايير العالمية.",
    guide_areas_title: "المجالات الرئيسية للعمل في لبنان",
    guide_t1_h: "اختيار هيكل الشركة",
    guide_t1_p: "يوفّر لبنان عدة أشكال قانونية، من الشركة المغفلة (ش.م.ل.) والشركة المحدودة المسؤولية (ش.م.م.) إلى الشركات القابضة والأوفشور. ويعتمد الخيار الصحيح على المكان الذي تنشأ فيه إيراداتك، وهوية شركائك، والمكان الذي تتعامل معه مصرفياً.",
    guide_t2_h: "ضريبة الشركات والموازنة السنوية",
    guide_t2_p: "تُحدَّد ضريبة دخل الشركات وشرائحها ورزنامة تقديمها من قبل وزارة المالية، وتُنقَّح عبر الموازنة السنوية ومراسيمها. ولأن المعدلات والمهل تتغيّر، خطّط وفق القواعد السارية وقدّم ضمن المهل التي تميل إلى الضيق.",
    guide_t3_h: "ضريبة القيمة المضافة والتحول إلى الفوترة الإلكترونية",
    guide_t3_p: "تنطبق ضريبة القيمة المضافة على معظم السلع والخدمات، مع قواعد محددة للتسجيل والتقديم والاسترداد. كما تتجه المنطقة نحو فوترة إلكترونية إلزامية، وهي مشروع بيانات وأنظمة بقدر ما هي مسألة ضريبية.",
    guide_t4_h: "الرواتب والضمان الاجتماعي",
    guide_t4_p: "على أصحاب العمل تسجيل موظفيهم لدى الصندوق الوطني للضمان الاجتماعي والتصريح عن الاشتراكات وفق سقوف تعدّلها السلطات مع الوقت. وضبط الأساس والتوقيت بدقة، خصوصاً حين تُدفع الرواتب جزئياً بالعملة الأجنبية، هو حيث يتركّز معظم خطر الرواتب.",
    guide_t5_h: "العقارات والملكية",
    guide_t5_p: "يبقى العقار مخزناً مفضّلاً للقيمة، لكن رسوم التسجيل وضريبة الأملاك المبنية ومعالجة الأرباح تكافئ التخطيط عند الاقتناء لا عند البيع، وعقوداً تنصّ بوضوح على العملة وطريقة الدفع.",
    guide_t6_h: "التقارير المالية والتدقيق (IFRS)",
    guide_t6_p: "تُعدّ الشركات اللبنانية تقاريرها وفق المعايير الدولية، والإطار يتطوّر: فمعيار IFRS 18 يعيد تشكيل عرض قائمة الدخل، بينما يخفّف معيار IFRS 19 الإفصاحات للشركات التابعة المؤهلة. وتنطبق متطلبات التدقيق القانوني على كثير من الكيانات.",
    guide_t7_h: "المصارف والودائع المحتجزة",
    guide_t7_p: "تؤثّر قيود القطاع المصرفي على كيفية احتفاظ الشركات بالنقد، وتقييم ودائعها القديمة، وتحويل الأموال عبر الحدود. والودائع المحتجزة تحديداً تحتاج إلى معالجة محاسبية قابلة للدفاع عنها وفق معيار IFRS 9 بدلاً من إبقائها بقيمتها القديمة.",
    guide_t8_h: "مواكبة مراسيم وزارة المالية",
    guide_t8_p: "يأتي كثير من التفاصيل الضريبية والامتثالية في لبنان عبر مراسيم وزارة المالية، أي القرارات، الصادرة على مدار السنة. ونحن نحتفظ بأرشيف منظّم وقابل للاطلاع للقرارات الرسمية التي تهمّ الأعمال.",
    guide_browse_decrees: "تصفّح أرشيف القوانين والمراسيم",
    guide_faq_q1: "هل يمكن لمستثمر أجنبي أن يملك عملاً في لبنان؟",
    guide_faq_a1: "يسمح لبنان عموماً بالملكية الأجنبية في معظم القطاعات، مع خضوع بعض الأنشطة لشروط خاصة أو لقواعد مشاركة محلية. والأسئلة العملية عادةً هي أي هيكل يُستخدم وكيف تنطبق متطلبات المصارف والإقامة، لا ما إذا كانت الملكية الأجنبية مسموحة.",
    guide_faq_q2: "ما هي هياكل الشركات المتاحة في لبنان؟",
    guide_faq_a2: "الأكثر شيوعاً هي الشركة المغفلة (ش.م.ل.)، والشركة المحدودة المسؤولية (ش.م.م.)، والشركات القابضة أو الأوفشور لأغراض محددة. وتختلف في رأس المال المطلوب والمسؤولية والحوكمة والمعالجة الضريبية، لذا ينبغي أن يتبع الخيار خطط ملكيتك وتمويلك وسوقك.",
    guide_faq_q3: "ما الضرائب التي تدفعها شركة تعمل في لبنان؟",
    guide_faq_a3: "أبرزها ضريبة دخل الشركات، وضريبة القيمة المضافة، واشتراكات الرواتب للصندوق الوطني للضمان الاجتماعي، ورسوم تسجيل وطوابع متنوعة. وتُحدَّد المعدلات والشرائح والحدود بدقة بموجب القانون وتُنقَّح دورياً، لذا تأكّد من الأرقام السارية لوضعك قبل بناء التخطيط عليها.",
    guide_faq_q4: "هل تحتاج الشركة في لبنان إلى مدقّق خارجي؟",
    guide_faq_a4: "يتعيّن على كثير من الشركات اللبنانية تعيين مدقّق مستقل والتقرير وفق المعايير الدولية، وكثيراً ما يشترط المقرضون والمستثمرون والجهات المانحة قوائم مدقّقة حتى حيث لا يفرض القانون ذلك. وعملياً، فإن الحسابات المدقّقة الموثوقة هي ما يفتح أبواب التمويل والشراكة.",
    guide_faq_q5: "كيف تؤثّر الأوضاع المصرفية على ممارسة الأعمال في لبنان؟",
    guide_faq_a5: "تؤثّر قيود القطاع على إدارة النقد، وقيمة الودائع القديمة، والتحويلات عبر الحدود، وتجعل الوصول المصرفي عاملاً حقيقياً عند اختيار الهيكل. كما تحتاج الودائع القديمة المحتجزة إلى معالجة محاسبية قابلة للدفاع عنها بدلاً من إبقائها بقيمتها الأصلية.",
    guide_market_intel: "ذكاء السوق",
    guide_seamlessly: "اعمل بسلاسة ضمن القوانين المحلية.",
    guide_p1: "التوسع أو العمل في لبنان يجلب تحديات تنظيمية وضريبية فريدة.",
    guide_p2: "سواء كنت بحاجة إلى إرشادات حول قرارات وزارة المالية أو الهيكلة عبر الحدود، نحن نوفر الحلول.",
    guide_consult: "استشر خبيراً",
    mof_page_title: "القوانين والمراسيم",
    mof_subtitle: "الوثائق التنظيمية الرسمية، متاحة للعرض الفوري.",
    mof_official_decrees: "القوانين والمراسيم الرسمية",
    mof_vat_ext: "- تمديد مهلة ضريبة القيمة المضافة",
    published_label: "نُشر في:",
    mof_open_decree: "افتح القرار",
    mof_corp_tax: "- تحديثات شرائح ضريبة الشركات",
    mof_nssf_caps: "- سقوف اشتراكات الضمان الاجتماعي",
    mof_built_prop: "- تقييم ضريبة الأملاك المبنية",
    news_page_title: "رؤى السوق",
    news_subtitle: "أحدث المنظورات المالية والدراسات التنظيمية من فريقنا.",
    news_market_tech: "رؤى السوق والدراسات الفنية",
    news_indepth_reports: "تقارير متعمقة حول الامتثال والاستراتيجية الضريبية ومعايير التدقيق.",
    read_full_study: "اقرأ الدراسة الكاملة →",
    back_to_news: "العودة للأخبار →",
    exec_summary: "ملخص تنفيذي",
    key_adjustments: "التعديلات الرئيسية والتأثير",
    eso_recs: "توصيات ESO",
    source_ref: "المصدر والمرجع:",
    study_19_bottom: "مراجعة منتصف السنة أرخص من مفاجأة نهاية السنة. فإجراء فحص موثّق للنصف الأول الآن، بتسوية أوضاع ضريبة القيمة المضافة وتصاريح الضمان الاجتماعي وأقساط ضريبة الدخل بينما لا يزال هناك وقت لتصحيحها، يحوّل الامتثال من سباق في كانون الأول إلى روتين. فالشركات التي تتحقّق في منتصف السنة نادراً ما تعيد عرض قوائمها في نهايتها.",
    study_19_fq1: "لماذا نُجري مراجعة امتثال في منتصف السنة بدلاً من نهايتها؟",
    study_19_fa1: "لأنك في منتصف السنة لا تزال تستطيع تصحيح ما تجده. فثغرة في تسوية ضريبة القيمة المضافة أو تصريح للضمان الاجتماعي يُكتشف في تموز يمكن تصحيحه على الأشهر المتبقية؛ أما الثغرة نفسها المكتشفة في كانون الأول فتصبح تعديلاً متسرّعاً أو إعادة عرض. ونقطة تحقّق في منتصف السنة توزّع العمل وتزيل منحدر نهاية السنة.",
    study_19_fq2: "ماذا ينبغي أن يشمل فحص منتصف السنة؟",
    study_19_fa2: "كحدّ أدنى، تسوية ضريبة القيمة المضافة المدخلة والمخرجة عن الفترات المقدَّمة حتى الآن، والتأكّد من تطابق تصاريح الضمان الاجتماعي مع الرواتب، والتحقّق من أن أقساط ضريبة الدخل متوافقة مع النتائج المتوقّعة. والهدف هو التقاط الاختلالات والأوضاع غير المسوّاة والإقرارات الفائتة بينما يتيح النصف المتبقي من السنة مجالاً لتصحيحها.",
    study_20_bottom: "معيار IFRS 19 فرصة لتقليص أعمال الإفصاح دون مغادرة إطار المعايير الدولية. فالشركات التابعة المؤهلة، أي التي لا تخضع للمساءلة العامة وتُعدّ شركتها الأمّ تقاريرها وفق المعايير الدولية، يمكنها تطبيق إفصاحات مخفّضة مع الإبقاء على الاعتراف والقياس الكاملين وفق المعايير الدولية. والمجموعات التي تحدّد الأهلية الآن يمكنها تخفيف تقارير كل شركة تابعة مؤهلة في نهاية السنة المقبلة.",
    study_20_fq1: "أي الشركات التابعة يمكنها استخدام معيار IFRS 19؟",
    study_20_fa1: "تكون الشركة التابعة مؤهلة إذا لم تكن خاضعة للمساءلة العامة، أي، بصورة عامة، غير مدرجة ولا تحتفظ بأصول بصفة ائتمانية لمصلحة الغير كنشاط رئيسي لها، وإذا كانت شركتها الأمّ النهائية أو الوسيطة تُعدّ قوائم مالية موحّدة وفق المعايير الدولية متاحة للاستخدام العام. فإذا استُوفي الشرطان، جاز للشركة التابعة اختيار الإفصاحات المخفّضة.",
    study_20_fq2: "هل يغيّر معيار IFRS 19 كيفية قياس أرقامنا؟",
    study_20_fa2: "لا. فمعيار IFRS 19 يخفّض متطلبات الإفصاح فقط؛ أما الاعتراف والقياس فيظلّان يتبعان سائر المعايير الدولية بالكامل. فالشركة التابعة المؤهلة تعرض الأرقام نفسها لكن بمجموعة إيضاحات أقلّ، ما يقلّل جهد الإعداد دون الخروج عن إطار المعايير الدولية.",
    study_21_bottom: "الودائع المحتجزة تحتلّ موقعاً حرجاً في الميزانية: لا تزال مسجّلة بقيمتها القديمة، لكنها لا تساوي عملياً سوى جزء منها. ووفق معيار IFRS 9، الجواب الصادق هو انخفاض قيمة موثّق، أي رؤية قائمة على الخسائر الائتمانية المتوقّعة مرتبطة بأي إطار استرداد يُقرّ فعلاً، مع إفصاح واضح عن الافتراضات. فالنموذج القابل للدفاع عنه أفضل من الإنكار ومن التخمين معاً.",
    study_21_fq1: "كيف ينبغي أن نُحاسب عن الودائع المحتجزة في القطاع المصرفي؟",
    study_21_fa1: "وفق معيار IFRS 9، هذه الودائع أصول مالية تخضع لتقييم الخسائر الائتمانية المتوقّعة. وعملياً يعني ذلك إثبات انخفاض في القيمة يعكس المبلغ القابل للاسترداد واقعياً، بدلاً من إبقاء الوديعة برصيدها الأصلي، والإفصاح عن أساس تقديرك. ويعتمد الرقم الدقيق على إطار الاسترداد النافذ، لذا يجب إعادة النظر في النموذج مع تطوّر ذلك الإطار.",
    study_21_fq2: "ماذا ينبغي أن نوثّق لدعم انخفاض القيمة؟",
    study_21_fa2: "الافتراضات الكامنة وراء تقديرك: إطار الاسترداد أو الإرشادات التي اعتمدت عليها، والسيناريوهات والاحتمالات التي رجّحتها، وتوقيت الاسترداد المتوقّع، والخصم المطبّق. فانخفاض القيمة القابل للدفاع عنه هو ما يستطيع المدقّق تتبّعه ومساءلته على افتراضاته، لا رقم واحد بلا حسابات وراءه.",
    study_22_bottom: "الفوترة الإلكترونية مشروع بيانات في ثوب فاتورة. فالإلزام لا يتعلق بملف PDF جديد؛ بل بفواتير مهيكلة قابلة للقراءة آلياً وبيانات مرجعية نظيفة تستطيع أنظمتك توليدها والإبلاغ عنها عند الطلب. فالشركات التي تنظّف بيانات عملائها وبياناتها الضريبية وتختبر نظام مواردها الآن ستمتثل بهدوء؛ أما التي تنتظر فستتسابق مع مهلة محدّدة.",
    study_22_fq1: "ما الذي يتغيّر فعلاً عندما تصبح الفوترة الإلكترونية إلزامية؟",
    study_22_fa1: "تصبح الفاتورة بياناً مهيكلاً لا مجرّد مستند. فبدلاً من ملف PDF أو نسخة ورقية، تُصدر الفواتير وتحفظها بصيغة محدّدة قابلة للقراءة آلياً يمكن التحقّق منها والإبلاغ عنها، غالباً إلى منصّة ضريبية أو عبرها. وهذا يغيّر أنظمتك وعملياتك أكثر بكثير مما يغيّر شكل الفاتورة بالنسبة إلى العميل.",
    study_22_fq2: "كيف ينبغي أن نستعدّ لها؟",
    study_22_fa2: "ابدأ ببياناتك وأنظمتك. تحقّق مما إذا كان نظام مواردك أو برنامج فوترتك قادراً على إنتاج الصيغة المهيكلة المطلوبة، ثم نظّف بياناتك المرجعية، أي المعرّفات الضريبية للعملاء ورموز المنتجات والمعالجات الضريبية، لأن التحقّق في الفوترة الإلكترونية يكشف كل تعارض. فالاختبار المبكر، على بياناتك الفعلية، هو ما يفصل الانتقال السلس عن التسابق مع المهلة.",
    study_13_bottom: "لا يساوي رأي التدقيق إلا بقدر ما تساويه الأنظمة التي أنتجت الأرقام. فالشركات التي تفرض وصولاً قائماً على الأدوار، وتفصل المهام في برامجها المحاسبية، وتحتفظ بسجلات تكشف أي عبث، تمنح مدقّقها أساساً يعتمد عليه؛ أما التي تسمح لشخص واحد بالقيد والموافقة معاً فهي على بُعد حادثة واحدة من قوائم مالية غير موثوقة.",
    study_13_fq1: "لماذا يهتمّ المدقّق بأمننا المعلوماتي؟",
    study_13_fa1: "لأن القوائم المالية تُنتَج بواسطة الأنظمة المعلوماتية، ووفق معيار ISA 315 يتعيّن على المدقّق فهم الضوابط المحيطة بها وتقييمها. فإذا كانت الأنظمة التي تنتج دفاترك قابلة للتعديل دون أثر، فإن الأرقام التي تُخرجها لا يمكن الوثوق بها كلياً، ويضطر التدقيق إلى مضاعفة عمله أو التحفّظ في استنتاجاته.",
    study_13_fq2: "ما هو أهمّ ضابط منفرد ينبغي تطبيقه؟",
    study_13_fa2: "الوصول القائم على الأدوار مع فصل سليم للمهام. فالشخص الذي يستطيع تسجيل قيد يجب ألا يكون هو نفسه من يوافق عليه، وينبغي أن يطابق الوصول الدور الفعلي لكل شخص. هذا الضابط وحده يحجب حصة كبيرة من الاحتيال والخطأ العرضي معاً، وهو أول ما يبحث عنه المراجع.",
    study_14_bottom: "لا يُحسم الخيار بين لبنان وقبرص بالنسبة الضريبية وحدها؛ بل يُحسم بمكان عملائك ومصرفك. فقبرص تمنحك النفاذ إلى الاتحاد الأوروبي وتغطية الاتفاقيات مقابل كلفة تشغيل أعلى؛ والشركة الأوفشور اللبنانية أقل كلفة في التشغيل وأبسط في التأسيس. اختر الهيكل الذي سيقبله فعلاً سوقك المستهدف ومصرفك.",
    study_14_fq1: "هل نؤسّس شركة أوفشور في لبنان أم في قبرص؟",
    study_14_fa1: "يعتمد ذلك على سوقك. فالشركة الأوفشور اللبنانية بسيطة التأسيس وزهيدة الصيانة، ما يناسب مقدّمي الخدمات ذوي التوجّه الإقليمي. أما قبرص فتمنح الشركة إقامة في الاتحاد الأوروبي ونفاذاً إلى شبكة واسعة من الاتفاقيات، وهو أمر ثمين إذا كان عملاؤك أو مصرفك في أوروبا، لكن بكلفة تأسيس وتشغيل أعلى. طابِق الولاية القضائية مع المكان الفعلي لإيراداتك ومصرفك.",
    study_14_fq2: "هل تفوز الولاية الأرخص عادةً؟",
    study_14_fa2: "نادراً، بمجرد أخذ الجانب المصرفي في الحسبان. فالكلفة الاسمية الأدنى كثيراً ما يقابلها وصول مصرفي أصعب أو تغطية اتفاقيات أضعف، وقد يكلّف ذلك أكثر بكثير، في الاحتكاك والضرائب المقتطعة، مما وفّره التأسيس. فالمقياس الصحيح هو الكلفة الإجمالية والقبول في سوقك المستهدف، لا رسم التسجيل.",
    study_15_bottom: "لأغراض التدقيق، العملة المشفّرة ليست نقداً؛ فوفق المعايير الدولية الحالية تُعدّ عادةً أصلاً غير ملموس، وهذا التصنيف يحكم كيفية قياسها وموعد إثبات انخفاض قيمتها وما يجب الإفصاح عنه. فالخزائن التي تحتفظ بسجلات دقيقة للمحافظ والمعاملات تجعل التدقيق ممكناً؛ أما التي لا تستطيع إثبات الملكية والتاريخ فتجعل إبداء الرأي صعباً جداً.",
    study_15_fq1: "كيف تُعالَج حيازات العملات المشفّرة وفق المعايير الدولية؟",
    study_15_fa1: "لا تُعدّ العملات المشفّرة عموماً نقداً ولا ما في حكم النقد وفق المعايير الدولية. وفي معظم الحالات تُحتسب كأصول غير ملموسة وفق معيار IAS 38، تماشياً مع تحليل لجنة تفسيرات المعايير الدولية، ما يؤثّر على القياس وانخفاض القيمة. وإذا كنت تحتفظ بالعملات المشفّرة بغرض المتاجرة كوسيط تاجر، فقد تنطبق إرشادات مختلفة، لذا فإن الوقائع المحدّدة تهمّ.",
    study_15_fq2: "ما السجلات التي يحتاجها المدقّق للتحقّق من حيازات العملات المشفّرة؟",
    study_15_fa2: "إثبات الملكية وتاريخ معاملات كامل. ويعني ذلك سجلات محفوظة لعناوين المحافظ وبصمات المعاملات والتسويات مع سجلاتك المحاسبية، إضافة إلى بيان واضح للحفظ. فمن دون رابط قابل للتحقّق بين سلسلة الكتل وسجلاتك، لا يستطيع المدقّق تأكيد وجود الأصول وعائديتها لك.",
    study_16_bottom: "رأس المال العامل هو نقد تملكه أصلاً لكنك جمّدته. فالتوقّع المتجدّد قصير الأجل، والمخزون الأكثر انضباطاً، والإدارة المنضبطة للذمم المدينة تحرّر هذا النقد دون تمويل جديد، لكن شرط ألا تضغط على المورّدين إلى حدّ يكسر سلسلة التوريد. فالهدف هو السيولة لا ميزانية الأرض المحروقة.",
    study_16_fq1: "ما أسرع طريقة لتحرير النقد دون اقتراض؟",
    study_16_fa1: "هاجِم دورة تحوّل النقد. حصّل الذمم المدينة أسرع، واحتفظ بمخزون خامل أقل، وأدِر الذمم الدائنة بتعمّد. فالمخزون الاحتياطي الفائض والتحصيل البطيء هما عادةً حيث يُحتجز أكبر قدر من النقد، وتحريره أرخص وأسرع من ترتيب تمويل جديد.",
    study_16_fq2: "كيف نُدير الذمم الدائنة دون الإضرار بعلاقات المورّدين؟",
    study_16_fa2: "مدّد المهل بالاتفاق لا بالصمت. تفاوض بصراحة على مهل سداد أطول، وادفع بموثوقية ضمن الشروط المتّفق عليها، وأعطِ الأولوية للمورّدين الأساسيين لعملياتك. فتمديد المدفوعات من طرف واحد يوفّر النقد لربع سنة ويكلّفك سلسلة التوريد في الربع التالي؛ وتوقّع النقد لثلاثة عشر أسبوعاً يتيح لك تخطيط المفاضلات بتعمّد.",
    study_17_bottom: "الفجوة التي تشعر بها المؤسسة الصغيرة والمتوسطة النامية ليست مزيداً من مسك الدفاتر؛ بل غياب من يترجم الأرقام إلى قرارات. فالمدير المالي الخارجي يمنح الشركة المتوسطة قيادة مالية استشرافية، وعلاقات مصرفية، واستراتيجية نقدية، وتقارير بمستوى مجلس الإدارة، دون كلفة توظيف بدوام كامل. إنه جسر للمرحلة الواقعة بين كبير المحاسبين والمدير المالي الدائم.",
    study_17_fq1: "ما الفرق بين المحاسب والمدير المالي؟",
    study_17_fa1: "المحاسب ينظر إلى الوراء ليسجّل ويعرض ما حدث؛ والمدير المالي ينظر إلى الأمام ليصوغ ما سيحدث، أي استراتيجية النقد والتمويل والتسعير والاستثمار والمخاطر. وكلاهما ضروري، لكن مع نمو الشركة يصبح غياب الدور الاستشرافي هو ما يبدأ بتقييدها، وهذه هي الفجوة التي يملؤها المدير المالي الخارجي.",
    study_17_fq2: "متى ينبغي للمؤسسة الصغيرة والمتوسطة التفكير في مدير مالي خارجي أو بدوام جزئي؟",
    study_17_fa2: "عندما تبدأ القرارات بتجاوز الوظيفة المالية، غالباً عند التخطيط للخلافة، أو جولة جمع تمويل، أو مفاوضات مصرفية، أو نمو سريع. عندها تحتاج إلى حُكم بمستوى مدير مالي لكن نادراً إلى راتب بدوام كامل، فيمنحك المدير المالي بدوام جزئي القدرة الاستراتيجية بكلفة تناسب المرحلة.",
    study_18_bottom: "بالنسبة إلى منظمة غير حكومية، الحوكمة ليست بيروقراطية؛ بل ثمن المنحة التالية. فالجهات المانحة تفرج عن الأموال مقابل إثبات رقابة مستقلة ومحاسبة نظيفة مخصّصة لكل صندوق. والمنظمات التي تُنشئ لجنة تدقيق مستقلة مبكراً وتطبّق محاسبة الصناديق تُبقي مسار تمويلها مفتوحاً؛ أما التي تعدّها فكرة لاحقة فتكتشف المتطلّب في أسوأ وقت، في خضمّ الطلب.",
    study_18_fq1: "ماذا تشترط الجهات المانحة الدولية قبل الإفراج عن الأموال؟",
    study_18_fa1: "إثبات الشفافية والرقابة. فكبرى وكالات التنمية والجهات المانحة الحكومية تشترط عادةً قوائم مالية مدقّقة، ومحاسبة مخصّصة لكل صندوق تُظهر أن أموالها أُنفقت على الغرض المتّفق عليه، ورقابة مستقلة على المنظمة. وكلما كانت حوكمتك وتقاريرك أقوى، انخفض الخطر المُتصوَّر وكان التمويل أكثر سلاسة.",
    study_18_fq2: "ما هي محاسبة الصناديق ولماذا تصرّ عليها الجهات المانحة؟",
    study_18_fa2: "تتتبّع محاسبة الصناديق مساهمة كل جهة مانحة على حدة، بحيث يمكنك إثبات أن منحة بعينها أُنفقت على برنامجها المقصود بدلاً من دمجها واستخدامها في مكان آخر. وتصرّ الجهات المانحة عليها لأنها الآلية التي تثبت أن الأموال المقيّدة استُخدمت وفق قيدها، وهو جوهر الامتثال للمِنَح.",
    study_7_bottom: "لا ينجح تنظيف الميزانية إلا إذا صمدت الأرقام الكامنة وراءه. فالمصنّعون الذين يخرجون من إعادة الهيكلة بوضع سليم هم من قيّموا الأصول بشكل مستقل، ووثّقوا المعالجة المحاسبية لكل عملية تحويل، ووضعوا نماذج للنتائج الضريبية قبل التوقيع لا بعده. أما عمليات إعادة الهيكلة المتسرّعة فغالباً ما تستبدل مشكلة بأخرى أكبر.",
    study_7_fq1: "كيف تُحتسب عملية تحويل الدين إلى حقوق ملكية؟",
    study_7_fa1: "يبادل الدائن دينه بأسهم، فيُلغى الالتزام ويحلّ محلّه حقوق ملكية. ووفق معيار IFRS 9، يمرّ الفرق بين القيمة الدفترية للدين المُطفأ والقيمة العادلة للأسهم المُصدَرة عبر قائمة الأرباح والخسائر، ما يعني أن القيمة العادلة لما تُصدره يجب أن تكون قابلة للدفاع عنها. والخطأ في هذا التقييم يشوّه إعادة الهيكلة بأكملها.",
    study_7_fq2: "ماذا ينبغي أن نفعل قبل التفاوض مع الدائنين؟",
    study_7_fa2: "اطلب أولاً تقييماً مستقلاً للأصول وللأعمال. فالدخول في مفاوضات دون رؤية قابلة للدفاع عنها لقيمتك يمنح الدائنين زمام المبادرة ويعرّضك لشروط لا تستطيع تحمّلها. كما يمنح التقييم من طرف ثالث مرتكزاً موثوقاً للمعالجة المحاسبية اللاحقة وللمدقّق.",
    study_8_bottom: "استرداد ضريبة القيمة المضافة عن دين معدوم هو عمل توثيقي بقدر ما هو مسألة ضريبية. فالمطالبات الناجحة مدعومة بسجل ورقي واضح: الفاتورة الأصلية، والضريبة المسدَّدة، ومحاولات التحصيل، وإثبات أن الدين غير قابل للتحصيل فعلاً. جهّز هذا الملف مع تقادم الدين، لا عند قرارك شطبه.",
    study_8_fq1: "هل يمكننا استرداد ضريبة القيمة المضافة التي سدّدناها على فاتورة لم يسدّدها العميل قط؟",
    study_8_fa1: "من حيث المبدأ، تسمح قواعد ضريبة القيمة المضافة اللبنانية باسترداد الضريبة المسدَّدة عن دين أصبح معدوماً، لكن عبء الإثبات كبير. فعليك عموماً أن تُثبت أن الدين غير قابل للتحصيل فعلاً وأنك سعيت إلى تحصيله، وأن تستوفي الشروط والإجراءات التي تحدّدها إدارة الضريبة. ولأن هذه الشروط قد تتغيّر، تأكّد من المتطلبات السارية قبل تقديم المطالبة.",
    study_8_fq2: "ما هي أفضل طريقة لحماية حقّنا في الاسترداد؟",
    study_8_fa2: "طبّق عملية منضبطة لمتابعة المتأخرات. تتبّع أعمار الديون، ووثّق كل محاولة تحصيل، واحتفظ بالفواتير الضريبية الأصلية والمراسلات معاً، بحيث تكون الأدلة التي تتطلّبها المطالبة موجودة سلفاً عندما يتجاوز الدين نقطة اللاعودة بدلاً من إعادة بنائها.",
    study_9_bottom: "ينقل الذكاء الاصطناعي التدقيق من أخذ العينات نحو اختبار المجتمع الكامل للبيانات، لكنه لا يخفض سقف الأدلة بل يرفعه. والعملاء الأكثر استفادة هم من رقمنوا أنظمتهم وجعلوها متاحة عبر واجهات برمجة التطبيقات، لأن التقنية لا تستطيع اختبار سوى البيانات التي تصل إليها. فالبيانات النظيفة والمنظّمة باتت أصلاً تدقيقياً قائماً بذاته.",
    study_9_fq1: "هل يعني الذكاء الاصطناعي أن المدقّقين لم يعودوا يأخذون عينات من المعاملات؟",
    study_9_fa1: "بصورة متزايدة، نعم. فحيث كان المدقّقون يختبرون سابقاً عيّنة عشوائية من المعاملات، تستطيع أدوات الذكاء الاصطناعي الآن تحليل المجتمع الكامل والإشارة إلى الحالات الشاذة ليحقّق فيها الإنسان. ويبقى حكم المدقّق هو الذي يقرّر معنى تلك الحالات، لكن نقطة الانطلاق تنتقل من شريحة من البيانات إلى كاملها.",
    study_9_fq2: "ما الذي نحتاج إلى توفيره كي ينجح تدقيق مدعوم بالذكاء الاصطناعي؟",
    study_9_fa2: "سجلات مرقمنة وجيّدة التنظيم وأنظمة قادرة على التصدير أو الاتصال عبر واجهات برمجة التطبيقات. فالذكاء الاصطناعي لا يستطيع اختبار بيانات لا يقرؤها، لذا فالشرط العملي هو نظام تخطيط موارد أو بيئة محاسبية تحتوي بيانات معاملات نظيفة وكاملة. أما الجداول المبعثرة والتعديلات اليدوية فهي حيث تتعثّر قيمة التقنية.",
    study_10_bottom: "لا توجد ولاية قضائية للشركات القابضة هي الأفضل عالمياً؛ بل توجد فقط تلك التي تناسب محفظتك والمكان الذي تنشأ فيه إيراداتك فعلاً. فالمنطقة الحرة في الإمارات قد تكون فعّالة للإيرادات الإقليمية المؤهلة لكنها تتطلّب جوهراً اقتصادياً حقيقياً؛ والشركة القابضة اللبنانية قد تكون الخيار العقلاني لمحفظة مرتكزة محلياً. ضع نموذجاً للخيارين استناداً إلى وقائعك الفعلية قبل التأسيس.",
    study_10_fq1: "هل المنطقة الحرة في الإمارات أكفأ ضريبياً دائماً من الشركة القابضة اللبنانية؟",
    study_10_fa1: "ليس تلقائياً. فقد تقدّم المناطق الحرة معاملة مؤاتية على الإيرادات المؤهلة، لكن الميزة تعتمد على استيفاء متطلبات الجوهر الاقتصادي، أي النشاط الفعلي والموظفين والمقرّ، لا مجرد التسجيل. وإذا كانت أصولك وإيراداتك مرتكزة في لبنان، فقد تكون الشركة القابضة المحلية أبسط وأقدر على الصمود. فالجواب الصحيح يتبع الوقائع لا النسبة المعلنة.",
    study_10_fq2: "ما هو الجوهر الاقتصادي ولماذا يهمّ؟",
    study_10_fa2: "يعني الجوهر الاقتصادي أن على الشركة أن تملك نشاطاً حقيقياً واتخاذ قرار وأشخاصاً ومقرّاً في الولاية التي تدّعي فيها الإقامة الضريبية. وتتحقّق السلطات والمصارف من ذلك بصورة متزايدة، والهيكل الذي لا يوجد إلا على الورق يخاطر بفقدان معاملته ووصوله المصرفي. فالجوهر بات متطلّب تصميم لا فكرة لاحقة.",
    study_11_bottom: "يبقى العقار مخزناً مفضّلاً للقيمة، لكن المعالجة الضريبية المحيطة به باتت الجزء الأكثر قابلية لمفاجأة المطوّر. فالمشاريع التي تتجنّب المشاكل هي التي تنصّ عقود بيعها على طريقة الدفع والعملة بوضوح لا لبس فيه، والتي يُوضع لوضعها الضريبي نموذج عند الاقتناء لا أن يُكتشف عند التسجيل.",
    study_11_fq1: "لماذا تهمّ العملة وطريقة الدفع في عقد البيع إلى هذا الحد؟",
    study_11_fa1: "لأنهما يحدّدان كيفية تقييم المعاملة وفرض الضريبة عليها. فعندما يكون العقد غامضاً بشأن طبيعة الأموال المدفوعة وعملتها، يفسح المجال لأن تنحرف القيمة المعتمدة ضريبياً عمّا قصده الطرفان. والعقد الذي يذكر هذه الشروط بوضوح يزيل هذا الغموض والنزاع الذي يتبعه.",
    study_11_fq2: "متى ينبغي للمطوّر أن يستعين بمشورة ضريبية بشأن مشروع؟",
    study_11_fa2: "عند الاقتناء لا عند البيع. فرسوم التسجيل وضريبة الأملاك المبنية ومعالجة الأرباح أسهل بكثير في التخطيط لها في بداية المشروع من تفكيكها في نهايته. كما تتيح النمذجة المبكرة هيكلة العقود والتوقيت بطريقة تقبلها السلطة الضريبية بدلاً من الاعتراض عليها.",
    study_12_bottom: "معظم الصفقات التي تنهار متأخراً تنهار بسبب أمور كان يمكن معرفتها مبكراً: التزامات غير موثّقة، وترتيبات مع أطراف ذات علاقة، وإيرادات لا تصمد أمام التدقيق. فالشركة الناشئة التي تُجري فحصاً نافياً للجهالة على نفسها قبل طرحها في السوق تتحكّم بالسردية وتُغلق الصفقة أسرع. فالمفاجآت التي يكتشفها المشتري أغلى بكثير من تلك التي تكتشفها بنفسك.",
    study_12_fq1: "ما الذي يُفشل غالباً عملية استحواذ عابرة للحدود في مراحلها الأخيرة؟",
    study_12_fa1: "الالتزامات غير الموثّقة خارج الميزانية. فالاتفاقات الشفهية والالتزامات غير المسجّلة وشروط الأطراف ذات العلاقة والالتزامات المحتملة التي تظهر أثناء الفحص تُضعف الثقة في أسوأ لحظة. والمشكلة نادراً ما تكون في وجود الالتزام؛ بل في أنه لم يُفصح عنه، ما يجعل المشتري يتساءل عمّا يُخفى غير ذلك.",
    study_12_fq2: "ما هو الفحص النافي للجهالة من جانب البائع ولماذا نُجريه على أنفسنا؟",
    study_12_fa2: "هو مراجعة مستقلة يطلبها البائع على أعماله قبل البيع. وحين يُجرى قبل نحو عام من الخروج، يكشف المسائل التي سيجدها المشتري، ويمنحك وقتاً لمعالجتها أو تفسيرها، ويتيح لك دخول المفاوضات بأرقام موثوقة ومدقّقة مسبقاً بدلاً من ردّ الفعل على ما يكتشفه المشتري.",
    study_bottom_label: "الخلاصة",
    study_faq_label: "الأسئلة الشائعة",
    study_1_bottom: "الخلاصة العملية تتعلق بالتوقيت. أياً كانت الشرائح ومبالغ ضريبة القيمة المضافة المعتمدة لعام 2026، فإن المؤسسات الأنجح هي التي تضع نماذج لوضعها مبكراً، وتوثّق افتراضاتها، وتقدّم إقراراتها ضمن المهل الأضيق بدلاً من ردّ الفعل في نهاية السنة.",
    study_1_fq1: "متى تدخل تغييرات ضريبة الشركات لعام 2026 حيّز التنفيذ؟",
    study_1_fa1: "تنطبق على السنة المالية المحددة في مراسيم وزارة المالية التي تُقرّ الموازنة. وبما أن تواريخ النفاذ والأحكام الانتقالية تُحدَّد بهذه المراسيم وقد تختلف باختلاف نوع الضريبة، تأكّد مع مستشارك من التاريخ المنطبق على سنتك المالية بدلاً من افتراض تطابقه مع السنة الميلادية.",
    study_1_fq2: "كيف نستعد للمهل المنقّحة للامتثال لضريبة القيمة المضافة؟",
    study_1_fa2: "قصّر فترة الإقفال الداخلي لديك. فعندما تضيق مهل التقديم، يكون الاختناق عادةً في التسوية؛ لذا انقل تسوية ضريبة القيمة المضافة المدخلة والمخرجة إلى إيقاع شهري وأبقِ المستندات المؤيّدة جاهزة. وإجراء تجربة كاملة لعملية التقديم في منتصف السنة يكشف الثغرات بينما لا يزال هناك وقت لمعالجتها.",
    study_2_bottom: "لا يغيّر معيار IFRS 18 الأرقام في حساباتك؛ بل يغيّر طريقة عرضها وما يتعيّن عليك تبريره. فالمجموعات التي تحدّد الآن تصنيفها الجديد بين التشغيل والاستثمار والتمويل، وتضفي طابعاً رسمياً على حوكمة مقاييس الأداء الإدارية لديها، ستنتقل دون ارتباك.",
    study_2_fq1: "متى يصبح معيار IFRS 18 نافذاً؟",
    study_2_fa1: "ينطبق معيار IFRS 18 على الفترات المالية السنوية التي تبدأ في أو بعد الأول من كانون الثاني 2027، مع السماح بالتطبيق المبكر. كما يجب إعادة عرض الفترة المقارنة في أول قوائم مالية تُعدّها وفق IFRS 18، لذا فإن نافذة التحضير الفعلية أبكر مما يوحي به تاريخ النفاذ.",
    study_2_fq2: "هل يتعيّن علينا الآن الإفصاح عن مقاييس الأداء البديلة لدينا؟",
    study_2_fa2: "إذا كنت تستخدم مقاييس أداء إدارية، أي مجاميع فرعية معلنة غير معرّفة في المعايير الدولية تستعملها للتعبير عن الأداء، فإن معيار IFRS 18 يُلزمك بالإفصاح عنها في إيضاح واحد، ومطابقتها مع أقرب مجموع فرعي وفق المعايير الدولية، وشرحها. وعملياً تصبح قابلة للتدقيق، لذا يجب أن يكون احتسابها والحوكمة القائمة عليها متينَين.",
    study_3_bottom: "التقييم في بيئة متعددة الأسعار لا يتعلق برقم واحد صحيح بقدر ما يتعلق بمنهجية شفافة ومتّسقة. فالمشترون والمقرضون يقبلون نطاقاً من القيم عندما تكون الافتراضات الكامنة وراءه، أي سعر الصرف والأساس والتعديلات، موثّقة ومطبّقة باتساق. فالغموض، لا سعر الصرف نفسه، هو ما يُفشل الصفقات.",
    study_3_fq1: "أيّ سعر صرف ينبغي أن نستخدمه لتقييم الأصول والالتزامات؟",
    study_3_fa1: "لا يوجد سعر واحد يناسب كل حساب؛ فالنهج القابل للدفاع عنه هو اختيار أساس مناسب لكل بند والإفصاح عنه وتطبيقه باتساق. وما يهمّ المدقّق أو المشتري هو أن يكون الاختيار شفافاً وقابلاً للتكرار، لا أن يُجمّل الميزانية.",
    study_3_fq2: "قبل كم من الوقت من عملية بيع أو جمع رأس مال ينبغي أن نبدأ أعمال التقييم؟",
    study_3_fa2: "من الأفضل أن يكون ذلك قبل أشهر عدة. فالتقييم الموثوق يعتمد على سجلات نظيفة ومسوّاة وعلى منهجية موثّقة، وتجميع هذه العناصر تحت ضغط الصفقة هو حيث تقع الأخطاء. كما أن البدء المبكر يتيح لك معالجة نقاط الضعف التي قد يكتشفها الفحص النافي للجهالة لدى المشتري.",
    study_4_bottom: "الخطر المتكرّر المرتبط بالضمان الاجتماعي ليس النسبة، بل الفجوة الزمنية بين تغيّر السقوف ولحاق نظام الرواتب بها. فالعملاء الذين يؤتمتون تحديث معاملات الاشتراك ويسوّون تصاريحهم شهرياً يتجنّبون الغرامات والمبالغ المستحقة بأثر رجعي التي تباغت من لا يزالون يطبّقون أرقام العام الماضي.",
    study_4_fq1: "كم مرّة تتغيّر سقوف الاشتراك في الضمان الاجتماعي؟",
    study_4_fa1: "تُعدَّل من قبل السلطات وفقاً للظروف الاقتصادية، وفي بيئة متقلّبة قد تكون هذه التعديلات متكرّرة وبلا جدول زمني ثابت. وبما أن المبالغ وتواريخ النفاذ تُحدَّد بمرسوم، تحقّق من معاملات الرواتب مقابل القيم الرسمية السارية بدلاً من افتراض ثباتها.",
    study_4_fq2: "ما هو خطأ احتساب الضمان الاجتماعي الأكثر شيوعاً الذي تصادفونه؟",
    study_4_fa2: "التطبيق الخاطئ للسقف عندما يُدفع جزء من الراتب بعملة أجنبية أو عيناً. فالتصريح يجب أن يعكس الأساس الصحيح بالسعر الصحيح، والمعالجة اليدوية لهذا التقسيم هي حيث تتسلّل النواقص في التصريح. وبرنامج الرواتب المتكامل الذي يثبّت المعاملات السارية يزيل معظم هذا الخطر.",
    study_5_bottom: "ينتقل إعداد تقارير الحوكمة البيئية والاجتماعية من كونه ميزة للسمعة إلى شرط للتمويل. فالشركات التي تتعامل معه الآن كعملية بيانات وحوكمة، لا كعملية تسويقية لاحقاً، ستلبّي متطلبات المقرضين والشركاء دون اضطراب، وستملك أرقاماً موثوقة عندما يصبح التحقّق من بيانات الحوكمة البيئية والاجتماعية أمراً معتاداً.",
    study_5_fq1: "هل إعداد تقارير الحوكمة البيئية والاجتماعية إلزامي للشركات اللبنانية؟",
    study_5_fa1: "لا يوجد إلزام محلي عام واحد، لكن المتطلّب يأتي بصورة متزايدة من السوق لا من النص القانوني: فالمقرضون الدوليون ومؤسسات تمويل التنمية والشركاء متعدّدو الجنسيات باتوا يشترطون الإفصاح عن الحوكمة البيئية والاجتماعية للتمويل والعقود. ولأي شركة تتعامل مع هذه الأموال، يكون ذلك إلزامياً فعلياً.",
    study_5_fq2: "ما هي الخطوة العملية الأولى؟",
    study_5_fa2: "إنشاء لجنة داخلية للحوكمة البيئية والاجتماعية ووضع خط أساس لما تقيسه أصلاً. فمعظم المؤسسات تملك بيانات ذات صلة، عن الطاقة والقوى العاملة والحوكمة، أكثر مما تدرك؛ والعمل الأولي هو تنظيمها والتحقّق منها، لا جمع كل شيء من الصفر.",
    study_6_bottom: "تُكافئ رقابة أسعار التحويل الاستعداد وتعاقب الارتجال. فالمجموعات التي تملك توثيقاً متزامناً وتحليلاً وظيفياً قابلاً للدفاع عنه تتعامل مع المراجعة كإجراء شكلي؛ أما التي تعيد بناء مبرّراتها بعد صدور التقدير الضريبي فتواجه تعديلات وغرامات. جهّز الملف قبل أن تطلبه السلطة.",
    study_6_fq1: "ما هو مبدأ السعر المحايد (مبدأ الاستقلالية)؟",
    study_6_fa1: "يقتضي أن تُسعَّر المعاملات بين الشركات المرتبطة كما لو كانت بين أطراف مستقلة وبشروط السوق. فإذا اختلف سعر داخلي بين شركات المجموعة عمّا كان سيتّفق عليه أطراف غير مرتبطين، جاز للسلطات الضريبية تعديله وفرض الضريبة على الفرق، ولهذا يحتاج التسعير إلى تبرير اقتصادي لا إلى سياسة داخلية فحسب.",
    study_6_fq2: "ما هو التوثيق الذي يدافع عن أسعارنا بين شركات المجموعة؟",
    study_6_fa2: "كحدّ أدنى، تحليل وظيفي وتحليل للمخاطر يبيّن أي كيان يقوم بأي دور ويتحمّل أي مخاطر، ومبرّر مقارن للأسعار المطبّقة، واتفاقيات متّسقة بين شركات المجموعة. وتضع إرشادات منظمة التعاون الاقتصادي والتنمية (OECD) الإطار؛ والهدف العملي هو ملف يتيح للمراجع تتبّع منطقك دون الاضطرار إلى تصديقه على عِلّاته.",
    study_1_cat: "الاستشارات الضريبية",
    study_1_by: "بقلم قسم الاستشارات الضريبية في ESO",
    study_2_cat: "التدقيق والضمان",
    study_2_by: "بقلم قسم التدقيق والضمان في ESO",
    study_3_cat: "الاستشارات المؤسسية",
    study_3_by: "بقلم قسم الاستشارات المؤسسية في ESO",
    study_4_cat: "المحاسبة والرواتب",
    study_4_by: "بقلم قسم المحاسبة في ESO",
    study_5_cat: "التدقيق والضمان",
    study_5_by: "بقلم قسم التدقيق والضمان في ESO",
    study_6_cat: "الاستشارات الضريبية",
    study_6_by: "بقلم قسم الاستشارات الضريبية في ESO",
    study_7_cat: "الاستشارات المؤسسية",
    study_7_by: "بقلم قسم الاستشارات المؤسسية في ESO",
    study_8_cat: "الاستشارات الضريبية",
    study_8_by: "بقلم قسم الاستشارات الضريبية في ESO",
    study_9_cat: "التدقيق والضمان",
    study_9_by: "بقلم قسم التدقيق والضمان في ESO",
    study_10_cat: "الاستشارات الضريبية",
    study_10_by: "بقلم قسم الاستشارات الضريبية في ESO",
    study_11_cat: "الاستشارات الضريبية",
    study_11_by: "بقلم قسم الاستشارات الضريبية في ESO",
    study_12_cat: "الاستشارات المؤسسية",
    study_12_by: "بقلم قسم الاستشارات المؤسسية في ESO",
    study_13_cat: "التدقيق والضمان",
    study_13_by: "بقلم قسم التدقيق والضمان في ESO",
    study_14_cat: "الاستشارات الضريبية",
    study_14_by: "بقلم قسم الاستشارات الضريبية في ESO",
    study_15_cat: "التدقيق والضمان",
    study_15_by: "بقلم قسم التدقيق والضمان في ESO",
    study_16_cat: "الاستشارات المؤسسية",
    study_16_by: "بقلم قسم الاستشارات المؤسسية في ESO",
    study_17_cat: "الاستشارات المؤسسية",
    study_17_by: "بقلم قسم الاستشارات المؤسسية في ESO",
    study_18_cat: "التدقيق والضمان",
    study_18_by: "بقلم قسم التدقيق والضمان في ESO",
    study_19_cat: "الاستشارات الضريبية",
    study_19_by: "بقلم قسم الاستشارات الضريبية في ESO",
    study_20_cat: "التدقيق والضمان",
    study_20_by: "بقلم قسم التدقيق والضمان في ESO",
    study_21_cat: "التدقيق والضمان",
    study_21_by: "بقلم قسم التدقيق والضمان في ESO",
    study_22_cat: "الاستشارات الضريبية",
    study_22_by: "بقلم قسم الاستشارات الضريبية في ESO",
    study_desc_budget: "دراسة شاملة للمراسيم المالية الأخيرة والنمذجة الاستراتيجية لتحسين الضرائب.",
    study_title_budget_2026: "تحليل موازنة 2026: التعامل مع شرائح ضريبة الشركات الجديدة",
    study_1_p1: "تمثل ميزانية 2026 تحولاً كبيراً في استراتيجية ضرائب الشركات.",
    study_1_p2: "أحد أهم التحديثات يتضمن إعادة معايرة عتبات ضريبة الدخل.",
    study_1_p3: "علاوة على ذلك، شهد تطبيق ضريبة القيمة المضافة جداول زمنية أكثر صرامة.",
    study_1_p4: "ننصح شركاءنا بإجراء فحص ضريبي شامل لتجنب الغرامات.",
    study_1_source: "البيانات مستمدة من المراسيم الرسمية الصادرة عن وزارة المالية (لبنان).",
    study_title_ifrs18: "التحول إلى المعيار الدولي IFRS 18: ما يجب أن تعرفه",
    study_desc_ifrs: "دليل متعمق حول تغييرات العرض والإفصاح التي يتطلبها IFRS 18.",
    study_2_h2_1: "نهاية معيار IAS 1",
    study_2_p1: "أصدر مجلس معايير المحاسبة الدولية رسمياً معيار IFRS 18.",
    study_2_h2_2: "فئات جديدة للأرباح والخسائر",
    study_2_p2: "يفرض المعيار الجديد فئات صارمة: تشغيلية، استثمارية، وتمويلية.",
    study_2_h2_3: "مقاييس أداء الإدارة",
    study_2_p3: "بات من الإلزامي الإفصاح عن مقاييس الأداء وتدقيقها.",
    study_2_source: "تستند التحليلات إلى معايير مجلس معايير المحاسبة الدولية (IASB).",
    study_title_valuation: "استراتيجيات التقييم وسط تعدد أسعار الصرف",
    study_desc_valuation: "تقييم الشركات الصغيرة في لبنان: سد الفجوة بين القيمة الدفترية وواقع التضخم المفرط.",
    study_3_h2_1: "أزمة التقييم",
    study_3_p1: "أصبح تقييم الشركات معقداً بسبب الأسعار الرسمية وأسعار السوق الموازية.",
    study_3_h2_2: "سد الفجوة",
    study_3_p2: "يجب تعديل نماذج التدفقات النقدية بعلاوات مخاطر التضخم المفرط.",
    study_3_h2_3: "العمل الاستراتيجي",
    study_3_p3: "يجب على الشركات الاحتفاظ بدفاتر مزدوجة بالدولار الفريش.",
    study_3_source: "منهجيات البنك الدولي للمناطق ذات التضخم المفرط.",
    study_title_nssf: "الامتثال للضمان الاجتماعي في اقتصاد التضخم المفرط",
    study_desc_nssf: "استراتيجيات إدارة استقطاعات الرواتب وتصريحات الضمان.",
    study_4_p1: "تواجه الشركات زيادات حادة في التزامات الرواتب مع تعديل حدود الضمان.",
    study_4_p2: "يكمن التحدي في حساب العتبات عندما يُدفع جزء من الراتب بالعملة الصعبة.",
    study_4_p3: "نوصي باعتماد نظام آلي يثبت سعر الصرف الرسمي اليومي.",
    study_4_source: "مقتبس من مراسيم وزارة العمل اللبنانية.",
    study_title_esg: "أطر إعداد تقارير الحوكمة البيئية والاجتماعية للشركات",
    study_desc_esg: "لماذا أصبح الإبلاغ الإلزامي ضرورياً للشركات التي تسعى للحصول على تمويل أوروبي.",
    study_5_p1: "معايير الحوكمة البيئية والاجتماعية لم تعد اختيارية لجذب الاستثمار.",
    study_5_p2: "يطلب المقرضون الآن تحليلات مفصلة للبصمة الكربونية.",
    study_5_p3: "يجب على الشركات إنشاء لجنة داخلية لتقييم عملياتها الحالية.",
    study_5_source: "إرشادات من مبادرة إعداد التقارير العالمية (GRI).",
    study_title_transfer: "التدقيق في أسعار التحويل في منطقة الشرق الأوسط",
    study_desc_transfer: "تحليل يركز على المعاملات بين الشركات الأم والفروع الخارجية.",
    study_6_p1: "تقوم السلطات الضريبية بتشديد الخناق على نقل الأرباح.",
    study_6_p2: "يتم تطبيق مبدأ المعاملة بالمثل بصرامة بالغة حالياً.",
    study_6_p3: "يجب توثيق سياسات التسعير المشتركة بدراسات مستقلة قوية.",
    study_6_source: "مستمد من إرشادات منظمة التعاون الاقتصادي والتنمية.",
    study_title_distressed: "إعادة هيكلة الأصول المتعثرة: دليل قانوني ومالي",
    study_desc_distressed: "المناورات المحاسبية لإنقاذ الأصول الصناعية في المناخ الحالي.",
    study_7_p1: "يغطي هذا الدليل المناورات اللازمة لإعادة هيكلة ديون الشركات.",
    study_7_p2: "تحويل الديون إلى أسهم يتطلب قياسات معقدة للقيمة العادلة.",
    study_7_p3: "يجب إشراك فريق تقييم خارجي قبل بدء المفاوضات مع الدائنين.",
    study_7_source: "إرشادات الامتثال للمعيار الدولي IFRS 9.",
    study_title_vat_bad: "استرداد ضريبة القيمة المضافة على الديون المعدومة",
    study_desc_vat_bad: "كيفية استرداد ضريبة القيمة المضافة قانونياً على الفواتير غير المحصلة.",
    study_8_p1: "تدفع الشركات ضرائب على فواتير لن تجمعها أبداً.",
    study_8_p2: "يسمح القانون بالاسترداد، لكن عبء الإثبات مرتفع جداً.",
    study_8_p3: "ننصح بتنفيذ بروتوكول صارم بعد 90 يوماً من التأخير في الدفع.",
    study_8_source: "إرشادات مديرية الضريبة على القيمة المضافة التابعة لوزارة المالية.",
    study_title_ai: "تأثير الذكاء الاصطناعي على التدقيق القانوني",
    study_desc_ai: "كيف يغير الذكاء الاصطناعي حجم العينات واكتشاف الاحتيال.",
    study_9_p1: "يعمل الذكاء الاصطناعي على تحويل صناعة التأكيد بسرعة.",
    study_9_p2: "يمكن لأدوات الذكاء الاصطناعي استيعاب 100٪ من المعاملات في دقائق.",
    study_9_p3: "يجب على أقسام المالية رقمنة أنظمتها بالكامل.",
    study_9_source: "أبحاث مجمعة من مجموعة عمل التكنولوجيا في IAASB.",
    study_title_holding: "هياكل الشركات القابضة: استراتيجيات تحسين الضرائب",
    study_desc_holding: "مقارنة الفوائد الضريبية لشركة قابضة لبنانية مقابل منطقة حرة في الإمارات.",
    study_10_p1: "تعد هيكلة الاستثمارات من خلال شركة قابضة أمراً حيوياً للمكاتب العائلية.",
    study_10_p2: "تستفيد الشركة القابضة اللبنانية من إعفاءات ضريبية محددة على أرباحها.",
    study_10_p3: "إذا كانت المحفظة تستهدف أوروبا أو دول الخليج، يجب نمذجة الهيكل بعناية.",
    study_10_source: "مستند إلى القانون التجاري اللبناني وقانون ضريبة الشركات الإماراتي.",
    study_title_real_estate: "التنقل في المشهد الضريبي العقاري",
    study_desc_real_estate: "التخطيط الضريبي الأساسي للمطورين العقاريين.",
    study_11_p1: "تسلط هذه الدراسة الضوء على التخطيط الضريبي للتعامل مع الضرائب العقارية المتقلبة.",
    study_11_p2: "قد يؤدي عدم التصريح بالقيمة الحقيقية للدولار إلى تحقيقات فورية.",
    study_11_p3: "يجب التأكد من أن جميع العقود تحدد بوضوح طريقة الدفع والعملة.",
    study_11_source: "التوجيهات الرسمية من المديرية العامة للشؤون العقارية.",
    study_title_dd: "مخاطر الفحص النافي للجهالة في الاستحواذات العابرة للحدود",
    study_desc_dd: "النقاط العمياء المكتشفة أثناء عمليات الاستحواذ على الشركات التقنية الناشئة.",
    study_12_p1: "كشف الفحص المالي للشركات الناشئة عن أخطاء تشغيلية مستمرة تعرقل الصفقات.",
    study_12_p2: "السبب الرئيسي لفشل الاستحواذات هو الالتزامات غير الموثقة في الميزانية العمومية.",
    study_12_p3: "يجب على الشركات إجراء تدقيق مبكر لتنظيم السجلات قبل دعوة المشترين.",
    study_12_source: "بيانات مجمعة من صفقات الاستشارات الخاصة بشركة ESO.",
    study_title_cyber: "مخاطر الأمن السيبراني في إعداد التقارير المالية",
    study_desc_cyber: "لماذا يعتمد التدقيق على اختبار بروتوكولات أمان البيانات في الشركة.",
    study_13_p1: "يعتبر تقييم بروتوكول الأمن السيبراني الآن مرحلة إلزامية في التدقيق القانوني.",
    study_13_p2: "الهجمات الإلكترونية يمكن أن تدمر سلامة البيانات المالية للشركة.",
    study_13_p3: "يجب تنفيذ وصول صارم قائم على الأدوار في برامج المحاسبة.",
    study_13_source: "إرشادات من جمعية تدقيق ورقابة نظم المعلومات (ISACA).",
    study_title_offshore: "تأسيس الشركات الأوفشور: لبنان مقابل قبرص",
    study_desc_offshore: "دراسة مقارنة حول معدلات ضرائب الشركات والامتثال المصرفي.",
    study_14_p1: "يعد تحديد مكان تأسيس الشركة خياراً استراتيجياً حاسماً.",
    study_14_p2: "تستفيد شركة الأوفشور اللبنانية من سهولة التأسيس لكنها تعاني من القيود المصرفية.",
    study_14_p3: "إذا كانت الإيرادات تأتي من دول الخليج، فقد يكون لبنان كافياً.",
    study_14_source: "المعاهدات الضريبية وتوجيهات الامتثال الخاصة بالبنك المركزي الأوروبي.",
    study_title_crypto: "تقييم الأصول المشفرة للتدقيق القانوني",
    study_desc_crypto: "كيفية تقييم الأصول الرقمية مثل البيتكوين وفقاً لمعايير IFRS.",
    study_15_p1: "يتصارع المدققون حول كيفية تقييم الأصول الرقمية بشكل صحيح.",
    study_15_p2: "تعتبر المعايير الحالية العملات المشفرة أصولاً غير ملموسة.",
    study_15_p3: "يجب الاحتفاظ بسجلات دقيقة لعناوين المحافظ الباردة.",
    study_15_source: "تفسير IFRIC حول حيازات العملات المشفرة ومعيار IAS 38.",
    study_title_wc: "تحسين رأس المال العامل في ظل صدمات سلاسل الإمداد",
    study_desc_wc: "استراتيجيات نمذجة التدفق النقدي لإطالة أمد الدائنين وتسريع المدينين.",
    study_16_p1: "تتطلب اضطرابات سلاسل التوريد نمذجة قوية للتدفق النقدي.",
    study_16_p2: "يجب إدارة دورة رأس المال العامل بنشاط.",
    study_16_p3: "تنفيذ توقعات تدفق نقدي متدحرجة لمدة 13 أسبوعاً.",
    study_16_source: "الأوراق البيضاء للنمذجة المالية لاستشارات شركة ESO.",
    study_title_cfo: "دور المدير المالي الخارجي للشركات الصغيرة والمتوسطة",
    study_desc_cfo: "لماذا تتجه الشركات العائلية إلى القيادة المالية الجزئية.",
    study_17_p1: "نحلل الاتجاه المتزايد للقيادة المالية الجزئية في منطقة الشرق الأوسط.",
    study_17_p2: "يوفر المدير المالي الخارجي استراتيجية رفيعة المستوى بجزء بسيط من التكلفة.",
    study_17_p3: "الشركات التي تستعد لخطط التعاقب يجب أن تتعاقد مع مدير مالي خارجي.",
    study_17_source: "اتجاهات الصناعة كما أوردها معهد المحاسبين الإداريين (IMA).",
    study_title_ngo: "متطلبات حوكمة الشركات للمنظمات غير الحكومية",
    study_desc_ngo: "ضمان الشفافية وتأمين التمويل من الوكالات المانحة الدولية.",
    study_18_p1: "تطالب وكالات التمويل الدولية بالشفافية المطلقة قبل صرف المنح.",
    study_18_p2: "تخضع المنظمات لتدقيق محدد لكل صندوق.",
    study_18_p3: "ننصح بتأسيس لجنة تدقيق مستقلة وتنفيذ سياسة مشتريات لا تتسامح مع الأخطاء.",
    study_18_source: "إرشادات الامتثال للمنح الصادرة عن الوكالة الأمريكية للتنمية الدولية (USAID).",
    careers_title: "ابنِ مسيرتك المهنية",
    careers_subtitle: "انضم إلى فريق من المحترفين الذين يشكلون مستقبل التمويل.",
    careers_why_choose: "لماذا تختارنا؟",
    careers_culture: "ثقافة التميز.",
    careers_p1: "نحن نستثمر بكثافة في موظفينا لبناء نجاح مشترك.",
    careers_p2: "سواء كنت مدققاً متمرساً أو طالباً جامعياً طموحاً، فنحن نوفر لك البيئة المثالية.",
    careers_open_positions: "الوظائف المتاحة",
    careers_current_opps: "الفرص الحالية",
    careers_desc_senior: "دور بدوام كامل للمهنيين ذوي الخبرة (أكثر من 3 سنوات).",
    apply_below: "قدم طلبك أدناه",
    careers_desc_tax: "دور لدعم العملاء في التنقل عبر اللوائح الضريبية المعقدة.",
    careers_desc_intern: "برنامج تدريبي صارم لمدة 3 أشهر لطلاب الجامعات.",
    careers_submit_app: "تقديم طلب التوظيف",
    careers_ready_step: "هل أنت مستعد لاتخاذ الخطوة التالية؟ املأ النموذج.",
    careers_ensure_cv: "تأكد من أن سيرتك الذاتية محدثة بصيغة PDF. نحن نرد عادة في غضون 3 إلى 5 أيام.",
    placeholder_full_name: "الاسم الكامل",
    placeholder_email: "البريد الإلكتروني",
    opt_select_pos: "اختر المنصب المتقدم إليه",
    opt_general_app: "طلب توظيف عام",
    opt_summer_intern: "تدريب صيفي",
    opt_senior_auditor: "مدقق أول",
    opt_tax_associate: "مساعد ضريبي",
    date_mar18: "18 مارس 2026",
    date_feb28: "28 فبراير 2026",
    date_jan15: "15 يناير 2026",
    date_dec10: "10 ديسمبر 2025",
    date_nov22: "22 نوفمبر 2025",
    date_oct05: "05 أكتوبر 2025",
    date_sep18: "18 سبتمبر 2025",
    date_aug30: "30 أغسطس 2025",
    date_jul12: "12 يوليو 2025",
    date_jun25: "25 يونيو 2025",
    date_may14: "14 مايو 2025",
    date_apr08: "08 أبريل 2025",
    date_mar20: "20 مارس 2025",
    date_feb11: "11 فبراير 2025",
    date_jan29: "29 يناير 2025",
    date_dec15: "15 ديسمبر 2024",
    date_nov03: "03 نوفمبر 2024",
    date_oct18: "18 أكتوبر 2024",
    upload_cv: "رفع السيرة الذاتية (PDF/DOCX):",
    placeholder_cover_letter: "رسالة تعريفية قصيرة (اختياري)",
    submit_application: "إرسال الطلب",
    portal_title: "بوابة العملاء",
    portal_subtitle: "ابدأ تحولك الاستراتيجي اليوم.",
    portal_reach_out: "تواصل معنا",
    portal_lets_discuss: "دعنا نناقش مستقبلك المالي.",
    portal_desc: "تواصل مع فريق الاستشارات لدينا لمعرفة كيف يمكننا مساعدتك.",
    portal_hq: "المقر الرئيسي",
    po_box: "صندوق بريد:",
    portal_phone: "الهاتف",
    portal_email: "البريد الإلكتروني",
    portal_send_msg: "إرسال رسالة مباشرة",
    placeholder_corp_email: "البريد الإلكتروني للشركة",
    placeholder_subject: "الموضوع / نوع الاستفسار",
    placeholder_describe: "صف التحدي الاستراتيجي الخاص بك...",
    portal_submit_inquiry: "إرسال الاستفسار",
    footer_desc: "خيارات ذكية، حلول ذكية. نحن نضع عملائنا في المقام الأول.",
    footer_nav_title: "التنقل",
    footer_connect_title: "تواصل معنا",
    footer_contact: "اتصل بنا",
    footer_rights: "جميع الحقوق محفوظة.",
    trust_title: "شركة يمكنك البناء عليها",
    trust_sub: "ربع قرن من الخبرة في التدقيق والضرائب والاستشارات، قائم على ما يمكن إثباته.",
    trust_years_label: "عاماً من الخبرة",
    trust_years_desc: "مشورة موثوقة منذ عام 2001، عبر كل الدورات التي شهدها لبنان.",
    trust_standards_label: "معايير عالمية",
    trust_standards_desc: "تدقيق وفق معايير التدقيق الدولية (ISA)؛ وإعداد التقارير وفق معايير IFRS.",
    trust_sector_label: "عمق قطاعي",
    trust_sector_desc: "تخصص معترف به في قطاع الأغذية والمشروبات، ضمن أكثر من 15 قطاعاً نخدمه.",
    trust_lacpa_label: "مرخّص ومسجّل",
    trust_lacpa_desc: "عضو في جمعية خبراء المحاسبة المجازين في لبنان (LACPA).",
    trust_footnote: "مهام بإشراف الشركاء، مع سرية تامة واستقلالية صارمة في كل تكليف.",
    date_jul10_26: "10 يوليو 2026",
    date_jun20_26: "20 يونيو 2026",
    date_may15_26: "15 مايو 2026",
    date_apr08_26: "08 أبريل 2026",
    study_title_midyear: "مراجعة الامتثال في منتصف 2026: نقاط تدقيق الضرائب والضمان",
    study_desc_midyear: "قائمة تحقق عملية لمنتصف العام تغطي أقساط ضريبة الدخل ودورات ضريبة القيمة المضافة وتصاريح الضمان لتجنب غرامات نهاية العام.",
    study_19_p1: "جلب النصف الأول من عام 2026 مواعيد تقديم أكثر صرامة وسقوفاً معدّلة للضمان الاجتماعي. تتيح المراجعة المنظمة في منتصف العام للشركات تصحيح المسار قبل زحمة تدقيق نهاية العام، بدلاً من اكتشاف المخاطر في كانون الأول.",
    study_19_p2: "أكثر الثغرات شيوعاً في منتصف العام هي مراكز ضريبة القيمة المضافة الفصلية غير المتوافقة، وتصاريح الضمان غير المسوّاة بين الرواتب بالدولار الفريش والعملة المحلية، وأقساط ضريبة الدخل المحتسبة على شرائح قديمة. وكلٌّ منها يتراكم إلى غرامات إن تُرك حتى الربع الأخير.",
    study_19_p3: "ننصح كل عميل بإجراء فحص موثّق للنصف الأول الآن: تسوية ضريبة القيمة المضافة، والتحقق من سقوف الضمان وفق أحدث التعاميم، وإعادة احتساب الأقساط على شرائح 2026. تصحيحها في تموز يكلّف جزءاً بسيطاً من تصحيحها أثناء التدقيق.",
    study_19_source: "استناداً إلى روزنامة التقديم لعام 2026 الصادرة عن وزارة المالية (لبنان) وتعاميم اشتراكات الضمان الاجتماعي النافذة.",
    study_title_ifrs19: "المعيار IFRS 19: إفصاحات مبسّطة للشركات التابعة المؤهلة",
    study_desc_ifrs19: "كيف يمكن للشركات التابعة غير الخاضعة للمساءلة العامة تقليص حجم الإفصاحات وفق IFRS 19 مع بقائها ممتثلة بالكامل، قبل موعد النفاذ في 2027.",
    study_20_p1: "بعد المعيار IFRS 18، أصدر مجلس المعايير الدولية المعيار IFRS 19 الذي يتيح للشركات التابعة المؤهلة تطبيق متطلبات إفصاح مخفّضة إلى حد كبير مع الاستمرار في اعتماد الاعتراف والقياس وفق IFRS. وهذا قد يقلّص جهد إعداد التقارير للمجموعات في المنطقة.",
    study_20_p2: "تكون الشركة التابعة مؤهلة إذا لم تكن خاضعة للمساءلة العامة وكانت شركتها الأم تُعدّ قوائم مالية موحّدة وفق IFRS. التخفيف يقتصر على الإيضاحات فقط، أما الاعتراف والقياس فيبقيان دون تغيير، أي أنه تبسيط للإفصاح لا اختصار محاسبي، ويُتَّخذ القرار لكل كيان على حدة.",
    study_20_p3: "نوصي المجموعات بتحديد الشركات التابعة المؤهلة الآن ونمذجة مجموعة الإفصاحات المخفّضة قبل موعد 2027، لتكون الاعتماد قراراً مخططاً لا اندفاعاً في اللحظة الأخيرة. ويُسمح بالتطبيق المبكر، وقد يبسّط إقفال 2026 للكيانات المؤهلة.",
    study_20_source: "استناداً إلى المعيار IFRS 19 «الشركات التابعة غير الخاضعة للمساءلة العامة: الإفصاحات» الصادر عن مجلس معايير المحاسبة الدولية (IASB).",
    study_title_gaplaw: "المحاسبة عن استرداد الودائع في إطار قانون الفجوة المالية",
    study_desc_gaplaw: "إرشادات عملية لتقييم الودائع المصرفية المحتجزة وتكوين مخصصاتها والإفصاح عنها مع تبلور آليات الاسترداد، وأثر ذلك على ميزانيتك.",
    study_21_p1: "مع تقدّم إطار معالجة خسائر القطاع المصرفي، تواجه الشركات التي تحتفظ بودائع مصرفية محتجزة سؤالاً ملحّاً: بأي قيمة تُدرَج هذه الودائع في الميزانية؟ إن إدراجها بالقيمة الاسمية يضخّم أصولاً قد لا تكون قابلة للاسترداد إلا جزئياً.",
    study_21_p2: "بموجب IFRS 9، تُعدّ هذه الودائع أصولاً مالية خاضعة لتقييم الخسائر الائتمانية المتوقعة. وآليات الاسترداد الناشئة، الدفعات المجزّأة والمعالجة على شرائح وتحويل الأدوات، تغيّر توقيت ومقدار التدفقات المتوقعة، وبالتالي مخصص التدني. وسيدقّق المدققون في الافتراضات وراء أي تقدير للاسترداد.",
    study_21_p3: "ننصح العملاء بتوثيق نموذج تدنٍّ قابل للدفاع عنه للودائع المحتجزة، مرتبط بشروط الاسترداد المعلنة، والإفصاح بوضوح عن الحكم وحساسيته في الإيضاحات. فالشفافية هنا تحمي رأي التدقيق ومصداقية الإدارة أمام المقرضين.",
    study_21_source: "تحليل بموجب IFRS 9 (الأدوات المالية) في سياق الإرشادات المنشورة حول إطار تعافي القطاع المصرفي في لبنان.",
    study_title_einvoice: "التحول إلى الفوترة الإلكترونية: الاستعداد لضريبة القيمة المضافة الرقمية",
    study_desc_einvoice: "لماذا تتجه المنطقة نحو الفوترة الإلكترونية الإلزامية، وما التغييرات في الأنظمة والبيانات والعمليات التي ينبغي البدء بها الآن.",
    study_22_p1: "انتقلت الفوترة الإلكترونية من اختيارية إلى إلزامية في معظم منطقة الشرق الأوسط، والاتجاه واضح بالنسبة إلى لبنان. والشركات التي تتعامل معها كمشروع تقني في اللحظة الأخيرة بدلاً من تحول مالي ستواجه صعوبة.",
    study_22_p2: "تغيّر الفوترة الإلكترونية أكثر من مجرد شكل الفاتورة: فهي تتطلب بيانات منظمة قابلة للقراءة آلياً، وإبلاغاً شبه فوري للسلطة، وانضباطاً أدق في البيانات المرجعية (الأرقام الضريبية ورموز المنتجات ومعالجة الضريبة). والأنظمة اليدوية أو القديمة هي العائق الأكبر لأنها لا تنتج مخرجات منظمة متوافقة.",
    study_22_p3: "نوصي الشركات بتدقيق قدرات الفوترة وأنظمة ERP الآن، وتنظيف بياناتها المرجعية، وتجربة سير عمل متوافق قبل أي إلزام. فالشركات التي تستعد مبكراً تكسب الامتثال وسرعة التسوية وتقليل نزاعات الضريبة.",
    study_22_source: "إطار مستوحى من عمليات تطبيق الفوترة الإلكترونية الإقليمية في دول الخليج والمعايير الدولية للإبلاغ الرقمي عن ضريبة القيمة المضافة."
  }
};

document.addEventListener("DOMContentLoaded", () => {

  // 1. Preloader Logic
  const counter = document.getElementById('preloader-counter');
  const preloader = document.getElementById('eso-preloader');
  let count = 0;

  const interval = setInterval(() => {
    count += Math.floor(Math.random() * 28) + 30;
    if (count > 100) count = 100;
    if (counter) counter.innerText = count + '%';
    if (count === 100) {
      clearInterval(interval);
      setTimeout(() => {
        if (preloader) preloader.classList.add('hidden');
        document.body.classList.remove('no-scroll');
        handleRouting();
      }, 200);
    }
  }, 55);

  // 2. Routing Logic (real URLs via the History API)
  const SITE_NAME = 'ESO | Auditors & Consultants';
  const DEFAULT_DESC = 'ESO Auditors & Consultants: Big 4 caliber audit, tax, accounting and advisory for enterprises in Lebanon and the MENA region. Trusted since 2001.';
  const META = {
    home: { t: 'ESO | Auditors & Consultants in Lebanon', d: DEFAULT_DESC },
    about: { t: 'About ESO | Audit & Advisory Firm in Lebanon', d: 'A quarter century of audit, tax and advisory expertise. The ESO standard: rigorous, independent, and rooted in local and international best practice.' },
    clients: { t: 'Our Clients | Industries ESO Serves in Lebanon', d: 'ESO serves 15+ sectors including food & beverage, manufacturing, real estate, healthcare, NGOs and financial services across Lebanon.' },
    'client-fb': { t: 'Food & Beverage Audit & Accounting | ESO Lebanon', d: 'Specialist F&B financial services: inventory and yield control, POS and aggregator reconciliation, franchise auditing, and NSSF and VAT optimization.' },
    team: { t: 'Leadership & Team | ESO Auditors & Consultants', d: 'Meet the ESO partners and professionals delivering audit, tax and advisory engagements across Lebanon and the region since 2001.' },
    services: { t: 'Services: Audit, Tax, Accounting & Consulting | ESO', d: 'The full spectrum of audit & assurance, tax advisory, accounting and corporate consulting, to Big 4 standards with boutique agility.' },
    'service-audit': { t: 'Audit & Assurance Services | ESO Lebanon', d: 'Independent statutory audits under ISA, IFRS compliance and transition, internal control reviews and agreed-upon procedures for enterprises in Lebanon.' },
    'service-tax': { t: 'Tax Advisory & VAT Compliance | ESO Lebanon', d: 'Corporate tax planning, VAT compliance, Ministry of Finance decree guidance and tax audit defense for businesses in Lebanon.' },
    'service-accounting': { t: 'Accounting & Payroll Services | ESO Lebanon', d: 'Outsourced bookkeeping, NSSF payroll, multi-currency reconciliation and management reporting for growing enterprises in Lebanon.' },
    'service-consulting': { t: 'Corporate Consulting & M&A Advisory | ESO Lebanon', d: 'M&A due diligence, enterprise valuation, outsourced CFO services and operational restructuring for enterprises in Lebanon and MENA.' },
    'lebanon-guide': { t: 'Doing Business in Lebanon: A 2026 Guide | ESO Auditors & Consultants', d: 'A practical guide to doing business in Lebanon: company structures, corporate tax, VAT and e-invoicing, NSSF payroll, IFRS reporting, banking and MoF decrees.' },
    'kararat-portal': { t: 'Laws and Decrees | ESO Lebanon', d: 'Official Lebanese laws, decrees and decisions, curated and instantly viewable by ESO Auditors & Consultants.' },
    news: { t: 'Insights & Technical Studies | ESO Lebanon', d: 'In-depth studies on IFRS, tax strategy, NSSF, valuation and audit standards for enterprises in Lebanon and the MENA region.' },
    careers: { t: 'Careers | Join ESO Auditors & Consultants', d: 'Build your career in audit, tax and consulting at ESO. Open roles for senior auditors, tax associates and summer interns in Lebanon.' },
    'client-portal': { t: 'Contact & Client Portal | ESO Lebanon', d: 'Contact ESO Auditors & Consultants in Jal El Dib, Lebanon. Schedule a consultation for audit, tax, accounting or advisory services.' }
  };

  // --- Pretty slugs + language-prefixed routes (en default, /ar, /fr) --------
  const SLUG = {
    home: '', about: 'about', services: 'services', team: 'team', careers: 'careers',
    'service-audit': 'services/audit-assurance',
    'service-tax': 'services/tax-advisory',
    'service-accounting': 'services/accounting-payroll',
    'service-consulting': 'services/corporate-consulting',
    clients: 'industries',
    'client-fb': 'industries/food-and-beverage',
    'lebanon-guide': 'lebanon-market-guide',
    'kararat-portal': 'ministry-of-finance-decrees',
    news: 'insights',
    'client-portal': 'contact',
    'study-1': 'insights/2026-budget-analysis',
    'study-2': 'insights/ifrs-18-transition',
    'study-3': 'insights/valuation-strategies',
    'study-4': 'insights/nssf-compliance',
    'study-5': 'insights/esg-reporting-frameworks',
    'study-6': 'insights/transfer-pricing-scrutiny',
    'study-7': 'insights/restructuring-distressed-assets',
    'study-8': 'insights/vat-recovery-bad-debts',
    'study-9': 'insights/ai-impact-on-auditing',
    'study-10': 'insights/holding-company-structures',
    'study-11': 'insights/real-estate-tax-landscape',
    'study-12': 'insights/ma-due-diligence-pitfalls',
    'study-13': 'insights/cybersecurity-financial-reporting',
    'study-14': 'insights/offshore-lebanon-vs-cyprus',
    'study-15': 'insights/cryptocurrency-asset-valuation',
    'study-16': 'insights/optimizing-working-capital',
    'study-17': 'insights/outsourced-cfo-role',
    'study-18': 'insights/ngo-corporate-governance',
    'study-19': 'insights/mid-year-2026-compliance-review',
    'study-20': 'insights/ifrs-19-simplified-disclosures',
    'study-21': 'insights/deposit-recovery-financial-gap-law',
    'study-22': 'insights/e-invoicing-shift'
  };
  const ID_BY_SLUG = {};
  Object.keys(SLUG).forEach((id) => { ID_BY_SLUG[SLUG[id]] = id; });
  const LANGS = ['ar', 'fr'];              // 'en' is the default and carries no prefix
  const OG_LOCALE = { en: 'en_US', ar: 'ar_LB', fr: 'fr_FR' };
  let currentLang = 'en';
  let booted = false;

  function pathForId(id, lang) {
    const slug = SLUG[id] || '';
    const prefix = (lang && lang !== 'en') ? '/' + lang : '';
    if (slug === '') return prefix || '/';
    return prefix + '/' + slug;
  }

  // Resolve any path (real URL or an English href in the markup) to a route.
  // Returns { lang, id, legacy } — legacy flags an old /id path to upgrade.
  function resolvePath(pathname) {
    let p = pathname || '/';
    try { p = decodeURIComponent(p); } catch (e) {}
    p = p.replace(/[?#].*$/, '').replace(/\/+$/, '');
    let lang = 'en';
    const segs = p.split('/').filter(Boolean);
    if (segs.length && LANGS.indexOf(segs[0]) !== -1) lang = segs.shift();
    const slug = segs.join('/');
    if (slug === '') return { lang: lang, id: 'home', legacy: false };
    if (Object.prototype.hasOwnProperty.call(ID_BY_SLUG, slug))
      return { lang: lang, id: ID_BY_SLUG[slug], legacy: false };
    const el = document.getElementById(slug);            // legacy /service-audit, /study-1
    if (el && el.classList.contains('page-view'))
      return { lang: lang, id: slug, legacy: true };
    return { lang: lang, id: 'home', legacy: false };
  }

  function setHeadTag(selector, attr, value) {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  function applyMeta(id) {
    let m = META[id];
    if (!m) {
      const el = document.getElementById(id);
      const h = el && el.querySelector('.page-title');
      const p = el && el.querySelector('.study-article p');
      m = {
        t: h ? h.textContent.trim() + ' | ESO Insights' : SITE_NAME,
        d: p ? p.textContent.trim().replace(/\s+/g, ' ').slice(0, 155) : DEFAULT_DESC
      };
    }
    const origin = location.origin;
    const url = origin + pathForId(id, currentLang);
    document.title = m.t;
    setHeadTag('meta[name="description"]', 'content', m.d);
    setHeadTag('meta[property="og:title"]', 'content', m.t);
    setHeadTag('meta[property="og:description"]', 'content', m.d);
    setHeadTag('meta[property="og:url"]', 'content', url);
    setHeadTag('meta[property="og:locale"]', 'content', OG_LOCALE[currentLang] || 'en_US');
    setHeadTag('meta[name="twitter:title"]', 'content', m.t);
    setHeadTag('meta[name="twitter:description"]', 'content', m.d);
    setHeadTag('link[rel="canonical"]', 'href', url);
    setHeadTag('link[rel="alternate"][hreflang="en"]', 'href', origin + pathForId(id, 'en'));
    setHeadTag('link[rel="alternate"][hreflang="ar"]', 'href', origin + pathForId(id, 'ar'));
    setHeadTag('link[rel="alternate"][hreflang="fr"]', 'href', origin + pathForId(id, 'fr'));
    setHeadTag('link[rel="alternate"][hreflang="x-default"]', 'href', origin + pathForId(id, 'en'));
    buildStudySchema(id, url);
  }

  // Inject Article + FAQPage JSON-LD for study pages, built from the rendered,
  // already-translated DOM so it matches the active language. Removed elsewhere.
  function buildStudySchema(id, url) {
    var prev = document.getElementById('study-schema');
    if (prev) prev.remove();
    if (id.indexOf('study-') !== 0 && id !== 'lebanon-guide') return;
    var sec = document.getElementById(id);
    if (!sec) return;
    var titleEl = sec.querySelector('.page-title');
    var byEl = sec.querySelector('[data-i18n$="_by"]');
    var title = titleEl ? titleEl.textContent.trim() : document.title;
    var faqs = [];
    sec.querySelectorAll('.study-faq > div').forEach(function (row) {
      var q = row.querySelector('h4'); var a = row.querySelector('p');
      if (q && a) faqs.push({
        '@type': 'Question',
        name: q.textContent.trim(),
        acceptedAnswer: { '@type': 'Answer', text: a.textContent.trim() }
      });
    });
    var graph = [{
      '@type': 'Article',
      headline: title,
      inLanguage: currentLang,
      author: { '@type': 'Organization', name: (byEl ? byEl.textContent.trim() : 'ESO Auditors & Consultants') },
      publisher: { '@type': 'Organization', name: 'ESO Auditors & Consultants' },
      mainEntityOfPage: url
    }];
    if (faqs.length) graph.push({ '@type': 'FAQPage', mainEntity: faqs });
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = 'study-schema';
    s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    document.head.appendChild(s);
  }

  let currentRouteId = 'home';
  function handleRouting() {
    const info = resolvePath(location.pathname);

    // On the very first load at the bare root, honor a returning visitor's
    // saved language by upgrading the URL (crawlers have no storage -> English).
    if (!booted && info.lang === 'en' && (SLUG[info.id] || '') === ''
        && location.pathname.replace(/\/+$/, '') === '') {
      let saved = null;
      try { saved = localStorage.getItem('eso_lang'); } catch (e) {}
      if (saved && LANGS.indexOf(saved) !== -1) {
        info.lang = saved;
        history.replaceState({}, '', pathForId(info.id, saved));
      }
    }
    booted = true;

    // Upgrade a legacy /id path to its pretty slug (no extra history entry).
    if (info.legacy) history.replaceState({}, '', pathForId(info.id, info.lang));

    currentRouteId = info.id;
    currentLang = info.lang;

    document.querySelectorAll('.page-view').forEach((page) => page.classList.remove('active'));
    const targetSection = document.getElementById(info.id);
    if (targetSection) {
      targetSection.classList.add('active');
      window.scrollTo(0, 0);
      triggerReveals();
    }

    // Apply the language this URL implies (translations + dir + meta).
    if (typeof window.setLanguage === 'function') window.setLanguage(currentLang);
    else applyMeta(info.id);

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) hamburger.classList.remove('active');
    if (navLinks) navLinks.classList.remove('active');
  }

  // Intercept internal link clicks; markup hrefs are English pretty paths, so
  // resolve to an id and navigate in the language the visitor is viewing.
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = e.target.closest('a.nav-router');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href[0] !== '/' || href[1] === '/') return;
    e.preventDefault();
    const target = pathForId(resolvePath(href).id, currentLang);
    if (target !== location.pathname) history.pushState({}, '', target);
    handleRouting();
  });

  window.addEventListener('popstate', handleRouting);

  // Language switch = navigate to this same page in the chosen language.
  window.switchLanguage = function (lang) {
    if (lang !== 'en' && LANGS.indexOf(lang) === -1) lang = 'en';
    const target = pathForId(currentRouteId, lang);
    if (target !== location.pathname) history.pushState({}, '', target);
    handleRouting();
  };

  // Let the language switcher refresh the current page's title/description.
  window.__esoApplyMeta = () => applyMeta(currentRouteId);

  handleRouting();

  // 3. Scroll Reveal Animation
  function triggerReveals() {
    const reveals = document.querySelectorAll('.page-view.active .reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 50;

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', triggerReveals);

  // 4. Hamburger Menu Logic
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Mobile Dropdown toggling
  const navDropdowns = document.querySelectorAll('.nav-dropdown');
  navDropdowns.forEach(dropdown => {
    const dropbtn = dropdown.querySelector('.nav-dropbtn');
    if (dropbtn) {
      dropbtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.stopPropagation();
          dropdown.classList.toggle('active');
        }
      });
    }
  });

  // Close mobile menu when a simple link is clicked
  const simpleNavLinks = document.querySelectorAll('.nav-links > li > a:not(.nav-dropbtn)');
  simpleNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        if (hamburger) hamburger.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
      }
    });
  });

  // 5. Careers Apply Button Logic
  const applyBtns = document.querySelectorAll('.apply-btn');
  const positionSelect = document.getElementById('position');

  applyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.getAttribute('data-role');
      if (positionSelect) positionSelect.value = role;
      const applyForm = document.getElementById('apply-form');
      if (applyForm) applyForm.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 6. PDF Modal Logic (event-delegated so live-loaded decrees work too)
  const modal = document.getElementById('pdf-modal');
  const closeBtn = document.querySelector('.close-modal');
  const iframeContainer = document.getElementById('iframe-container');
  const SAMPLE_PDF = 'http://www.pdf995.com/samples/pdf.pdf';

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-pdf-btn');
    if (!btn) return;
    e.preventDefault();
    // Real uploaded decrees carry data-pdf-url (loaded directly, the Blob store
    // serves them inline). The static fallback items open a sample via gview.
    const real = btn.getAttribute('data-pdf-url');
    const src = real
      ? real
      : `https://docs.google.com/gview?url=${encodeURIComponent(SAMPLE_PDF)}&embedded=true`;
    if (iframeContainer) {
      iframeContainer.innerHTML = `<iframe src="${src}" width="100%" height="100%" frameborder="0" style="border:0;"></iframe>`;
    }
    if (modal) modal.style.display = 'block';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
      if (iframeContainer) iframeContainer.innerHTML = '';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      if (iframeContainer) iframeContainer.innerHTML = '';
    }
  });

  // 7. i18n - language is driven by the URL now (/ar, /fr). handleRouting()
  //    applies the right language and honors a saved preference on the root.

  // 8. Load MoF decrees live from the PHP backend (if DECREES_API is configured)
  if (typeof window.loadDecrees === 'function') {
    window.loadDecrees();
  }

});

// Exposed globally for onclick handlers in HTML
window.setLanguage = function(lang) {
  document.documentElement.lang = lang;
  document.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const activeBtn = document.querySelector(`.lang-btn[data-lang="${lang}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === 'OPTION') {
        el.textContent = translations[lang][key];
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });

  // Keep live-loaded decrees in sync with the chosen language
  if (window.__esoDecrees && typeof window.renderDecrees === 'function') {
    window.renderDecrees();
  }

  // Refresh the current page's title/description in the chosen language
  if (typeof window.__esoApplyMeta === 'function') {
    window.__esoApplyMeta();
  }

  localStorage.setItem('eso_lang', lang);
};

// ============================================================================
//  MoF DECREES, live loading & rendering from the PHP backend
// ============================================================================
window.__esoDecrees = null;

window.loadDecrees = function () {
  if (!DECREES_API) return;                 // not configured → keep static fallback
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  fetch(DECREES_API, { signal: ctrl.signal })
    .then(r => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))
    .then(items => {
      clearTimeout(timer);
      if (Array.isArray(items)) {
        window.__esoDecrees = items;
        window.renderDecrees();
      }
    })
    .catch(() => { clearTimeout(timer); /* leave the static fallback in place */ });
};

window.renderDecrees = function () {
  const list = document.getElementById('decrees-list');
  if (!list || !Array.isArray(window.__esoDecrees)) return;

  const lang = document.documentElement.lang || localStorage.getItem('eso_lang') || 'en';
  const dict = translations[lang] || translations.en;
  const openLabel = dict.mof_open_decree || 'Open Decree';
  const pubLabel  = dict.published_label || 'Published:';
  const localeMap = { en: 'en-US', fr: 'fr-FR', ar: 'ar' };
  const emptyMsg  = { en: 'No decrees published yet.', fr: 'Aucun décret publié pour le moment.', ar: 'لا توجد قرارات منشورة بعد.' }[lang] || 'No decrees published yet.';

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const fmtDate = (d) => {
    if (!d) return '';
    const dt = new Date(d + 'T00:00:00');
    if (isNaN(dt.getTime())) return esc(d);
    try { return dt.toLocaleDateString(localeMap[lang] || 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }); }
    catch (e) { return esc(d); }
  };

  const items = window.__esoDecrees;
  if (!items.length) {
    list.innerHTML = `<p style="color: var(--eso-text-muted); padding: 20px 0; margin: 0;">${esc(emptyMsg)}</p>`;
    return;
  }

  list.innerHTML = items.map((it, i) => {
    const border  = i < items.length - 1 ? 'border-bottom: 1px solid #f1f5f9;' : '';
    // Format: "Type #number, description - origin"  (e.g. Decree #3402, VAT extension - M.O. Work)
    const numRaw  = String(it.number || '').replace(/^#\s*/, '');
    const label   = '<strong>' + esc(it.type || 'Decree') + (numRaw ? ' #' + esc(numRaw) : '') + '</strong>';
    const desc    = it.description != null ? esc(it.description) : esc(it.title);
    const orig    = it.origin ? ' <span style="color: var(--eso-text-muted);">- ' + esc(it.origin) + '</span>' : '';
    const heading = label + ', ' + desc + orig;
    const url     = esc(it.url || '');
    return `
      <div class="pdf-item" style="display: flex; justify-content: space-between; align-items: center; padding: 20px 0; ${border}">
        <div style="display: flex; align-items: center; gap: 20px;">
          <span style="font-size: 28px;">📄</span>
          <div>
            <h4 style="margin: 0 0 5px 0; color: var(--eso-navy); font-size: 1.15rem;">${heading}</h4>
            <span style="color: var(--eso-text-muted); font-size: 0.85rem;"><span data-i18n="published_label">${esc(pubLabel)}</span> ${fmtDate(it.date)}</span>
          </div>
        </div>
        <a href="javascript:void(0)" class="btn btn-outline-dark view-pdf-btn" data-pdf-url="${url}" style="padding: 10px 20px; font-size: 0.8rem; border-color: var(--eso-silver-dark);" data-i18n="mof_open_decree">${esc(openLabel)}</a>
      </div>`;
  }).join('');
};

// ============================================================================
//  Homepage hero: animated financial-data background (money / auditing theme)
//  A calm, low-opacity stream of figures and currency symbols on navy. Pauses
//  when the hero is off-screen; respects prefers-reduced-motion.
// ============================================================================
(function () {
  function initHeroCanvas() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // bias heavily toward digits, with currency symbols sprinkled in
    var chars = '0123456789 0123456789 $ 0123456789 % 0123456789 £ 0123456789 € 0123456789 ¥ 8,204 1,375.00'.replace(/ /g, '').split('');
    var money = ['$', '£', '€', '¥', '%'];
    var fontSize = 16, gap = fontSize * 1.5, columns = 0, drops = [], dpr = 1;

    function size() {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(w / gap);
      drops = [];
      for (var i = 0; i < columns; i++) drops[i] = Math.random() * -40;
    }
    size();

    function pick() {
      // ~1 in 9 glyphs is a currency/percent symbol, rest are digits
      return (Math.random() < 0.11) ? money[(Math.random() * money.length) | 0]
                                    : chars[(Math.random() * chars.length) | 0];
    }

    if (reduce) {
      // static, faint field of figures (no motion)
      ctx.font = fontSize + 'px "Courier New", monospace';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.10)';
      for (var y = fontSize; y < canvas.clientHeight; y += gap * 1.2)
        for (var x = 4; x < canvas.clientWidth; x += gap)
          ctx.fillText(pick(), x, y);
      return;
    }

    var last = 0, interval = 1000 / 20; // calm ~20fps
    function draw(t) {
      if (!canvas.isConnected) return;
      if (canvas.offsetParent === null || !columns) { requestAnimationFrame(draw); return; } // hidden route
      if (t - last < interval) { requestAnimationFrame(draw); return; }
      last = t;
      var w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.fillStyle = 'rgba(21, 24, 43, 0.16)';   // navy fade -> soft trails
      ctx.fillRect(0, 0, w, h);
      ctx.font = fontSize + 'px "Courier New", monospace';
      for (var i = 0; i < columns; i++) {
        var x = i * gap + 4, y = drops[i] * gap;
        ctx.fillStyle = 'rgba(56, 189, 248, 0.55)';   // leading glyph
        ctx.fillText(pick(), x, y);
        ctx.fillStyle = 'rgba(125, 211, 252, 0.14)';  // faint one above
        ctx.fillText(pick(), x, y - gap);
        if (y > h && Math.random() > 0.975) drops[i] = Math.random() * -18;
        drops[i] += 0.5;   // slow fall
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(size, 200); });
    window.addEventListener('load', size);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initHeroCanvas);
  else initHeroCanvas();
})();
