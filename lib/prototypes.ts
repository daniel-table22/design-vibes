export type Prototype = {
  name: string;
  slug: string;
  description?: string;
};

export const prototypes: Prototype[] = [
  {
    name: "Hello World",
    slug: "hello-world",
    description: "Starter prototype to verify routing works",
  },
  {
    name: "Member Portal",
    slug: "member-portal",
    description: "Member home with a scenario panel to toggle club state",
  },
];
