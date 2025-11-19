import type { SVGProps } from "react";

export const Icons = {
  Google: (props: SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" {...props}>
      <path fill="currentColor" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 64.5C308.6 102.3 280.9 92 248 92c-71 0-129.2 58.2-129.2 129.2s58.2 129.2 129.2 129.2c79.2 0 117.2-59.3 121.3-91.2H248v-69.1h239.2c1.2 12.8 1.8 26.1 1.8 39.9z"></path>
    </svg>
  ),
  Outlook: (props: SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="microsoft" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
      <path fill="currentColor" d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z"></path>
    </svg>
  ),
  spinner: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
};
