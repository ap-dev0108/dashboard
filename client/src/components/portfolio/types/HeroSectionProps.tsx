import type { SocialLinks } from "./SocialLinks";

export interface HeroSectionProps {
  firstName?: string;
  lastName?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  profileImageUrl?: string;
  socialLinks?: SocialLinks[];
}
