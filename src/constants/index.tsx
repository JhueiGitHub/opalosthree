import {
  Bell,
  CreditCard,
  FileDuoToneBlack,
  Home,
  Settings,
} from "@/components/icons";

export const MENU_ITEMS = (
  cosmosId: string
): { title: string; href: string; icon: React.ReactNode }[] => [
  { title: "Home", href: `/desktop/${cosmosId}/home`, icon: <Home /> },
  {
    title: "My Library",
    href: `/desktop/${cosmosId}`,
    icon: <FileDuoToneBlack />,
  },
  {
    title: "Notifications",
    href: `/desktop/${cosmosId}/notifications`,
    icon: <Bell />,
  },
  {
    title: "Billing",
    href: `/desktop/${cosmosId}/billing`,
    icon: <CreditCard />,
  },
  {
    title: "Settings",
    href: `/desktop/${cosmosId}/settings`,
    icon: <Settings />,
  },
];
