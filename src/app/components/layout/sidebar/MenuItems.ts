export type MenuItem = GroupMenuItem | ChildMenuItem;

export interface GroupMenuItem {
  navlabel: boolean;
  subheader: string;
}

export interface ChildMenuItem {
  id: string;
  title: string;
  href: string;
  icon?: string;
  disabled?: boolean;
}

const Menuitems: MenuItem[] = [
  {
    id: "1",
    title: "게시판",
    href: "/dashboard",
    icon: "list",
  },
  {
    id: "2",
    title: "채팅방",
    href: "/chatroom",
    icon: "create",
  },
];

export default Menuitems;
