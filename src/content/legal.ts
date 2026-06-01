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
        "We may also receive basic technical information such as your IP address, browser type and device information through hosting, security or analytics tools.",
      ],
    },
    {
      title: "How we use information",
      body: [
        "We use the information you provide to reply to enquiries, discuss potential projects, manage bookings and provide studio services.",
        "We use Google Analytics to understand how visitors use the website, which pages are viewed and how the site can be improved.",
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
    "This cookie policy explains how Signal House Studios uses cookies and similar technologies, including Google Analytics and Google Maps.",
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
      title: "Google Analytics",
      body: [
        "We use Google Analytics to understand how people use the website, including which pages are visited, how visitors arrive at the site and how the site performs.",
        "Google Analytics may set cookies or use similar technologies to collect information such as device, browser, approximate location and interaction data.",
        "Analytics cookies are not essential, so they are only used where consent has been given.",
      ],
    },
    {
      title: "Google Maps",
      body: [
        "The website uses Google Maps to show the studio location. When a map is loaded, Google may set cookies or collect technical information such as your IP address, device information and map interaction data.",
        "Google Maps is provided by Google, so its use is also subject to Google's own terms and privacy information.",
        "Where consent controls are shown, the embedded map should only load after consent has been given. You can also choose to open the location directly in Google Maps instead.",
      ],
    },
    {
      title: "Managing cookies",
      body: [
        "You can accept or reject non-essential cookies through the cookie consent banner. You can also control or delete cookies through your browser settings.",
        "If you reject non-essential cookies, analytics will not be used and some third-party embedded features, such as Google Maps, may not load until you choose to allow them.",
      ],
    },
  ],
} as const satisfies LegalPageContent;
