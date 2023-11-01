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
    title: "친구 추가",
    href: "/friend",
    icon: "list",
  },
  {
    navlabel: true,
    subheader: "채팅방 목록",
  },
  {
    id: "2",
    title: "채팅방 목록",
    href: "/chatroom",
    icon: "create",
  },
];

export default Menuitems;
