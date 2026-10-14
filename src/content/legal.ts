export type LegalPageContent = {
  title: string;
  intro: string;
  sections: readonly {
    title: string;
    body: readonly string[];
  }[];
};

export const privacyPolicyContent = {
  title: "Privacy Policy",
  intro:
    "This privacy policy explains how Signal House Studios handles personal information submitted through this website.",
  sections: [
    {
      title: "Information we collect",
      body: [
        "If you contact us through the website, we may collect your name, email address, phone number, project details and any other information you choose to include in your message.",
        "We may also receive basic technical information such as your IP address, browser type and device information through hosting or security tools.",
      ],
    },
    {
      title: "How we use information",
      body: [
        "We use the information you provide to reply to enquiries, discuss potential projects, manage bookings and provide studio services.",
      ],
    },
    {
      title: "Sharing information",
      body: [
        "We do not sell personal information. We may share information with trusted service providers where needed to operate the website, handle enquiries or deliver agreed work.",
        "If a project requires collaboration with other suppliers, we will only share relevant information where it is needed for that project.",
      ],
    },
    {
      title: "How long we keep information",
      body: [
        "We keep enquiry and project information for as long as needed to respond, manage the project, meet legal obligations and maintain business records.",
      ],
    },
    {
      title: "Your rights",
      body: [
        "You can ask to access, correct or delete personal information we hold about you, subject to any legal or business record requirements.",
        "To make a request, contact us using the details on the contact page.",
      ],
    },
  ],
} as const satisfies LegalPageContent;

export const cookiePolicyContent = {
  title: "Cookie Policy",
  intro:
    "This cookie policy explains how Signal House Studios uses cookies and similar technologies.",
  sections: [
    {
      title: "What cookies are",
      body: [
        "Cookies are small files placed on your device by websites. They can help a website work properly, remember choices or understand how visitors use the site.",
      ],
    },
    {
      title: "Essential cookies",
      body: [
        "The website uses essential cookies or similar storage where needed for core functionality, security, consent choices and technical operation.",
        "These cookies are necessary for the website to work properly and cannot usually be switched off through the site.",
      ],
    },
    {
      title: "Managing cookies",
      body: [
        "You can accept or reject non-essential cookies through the cookie consent banner. You can also control or delete cookies through your browser settings.",
      ],
    },
  ],
} as const satisfies LegalPageContent;
